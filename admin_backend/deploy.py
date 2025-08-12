#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台独立管理后台部署脚本
"""

import os
import sys
import subprocess
import shutil
import json
from pathlib import Path

def run_command(command, cwd=None):
    """执行命令"""
    print(f"执行命令: {command}")
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ 成功: {command}")
            return result.stdout
        else:
            print(f"❌ 失败: {command}")
            print(f"错误信息: {result.stderr}")
            return None
    except Exception as e:
        print(f"❌ 异常: {command}")
        print(f"异常信息: {e}")
        return None

def check_requirements():
    """检查系统要求"""
    print("🔍 检查系统要求...")
    
    # 检查Python版本
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("❌ Python版本过低，需要Python 3.8+")
        return False
    
    print(f"✅ Python版本: {python_version.major}.{python_version.minor}.{python_version.micro}")
    
    # 检查必要命令
    commands = ['pip', 'mysql', 'redis-server', 'nginx']
    for cmd in commands:
        if shutil.which(cmd):
            print(f"✅ {cmd} 已安装")
        else:
            print(f"⚠️ {cmd} 未安装，请先安装")
    
    return True

def create_directories():
    """创建必要目录"""
    print("📁 创建目录结构...")
    
    directories = [
        'uploads',
        'logs',
        'static',
        'templates'
    ]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
        print(f"✅ 创建目录: {directory}")

def install_dependencies():
    """安装Python依赖"""
    print("📦 安装Python依赖...")
    
    if not run_command("pip install -r requirements.txt"):
        print("❌ 依赖安装失败")
        return False
    
    print("✅ 依赖安装完成")
    return True

def setup_database():
    """设置数据库"""
    print("🗄️ 设置数据库...")
    
    # 检查MySQL服务
    if not run_command("systemctl is-active mysql"):
        print("⚠️ MySQL服务未运行，尝试启动...")
        run_command("sudo systemctl start mysql")
    
    # 创建数据库和用户
    db_commands = [
        "mysql -u root -e \"CREATE DATABASE IF NOT EXISTS tea_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\"",
        "mysql -u root -e \"CREATE USER IF NOT EXISTS 'tea_admin'@'localhost' IDENTIFIED BY 'tea_admin_123456';\"",
        "mysql -u root -e \"GRANT ALL PRIVILEGES ON tea_admin.* TO 'tea_admin'@'localhost';\"",
        "mysql -u root -e \"FLUSH PRIVILEGES;\""
    ]
    
    for cmd in db_commands:
        if not run_command(cmd):
            print(f"❌ 数据库设置失败: {cmd}")
            return False
    
    print("✅ 数据库设置完成")
    return True

def setup_redis():
    """设置Redis"""
    print("🔴 设置Redis...")
    
    # 检查Redis服务
    if not run_command("systemctl is-active redis-server"):
        print("⚠️ Redis服务未运行，尝试启动...")
        run_command("sudo systemctl start redis-server")
    
    # 测试Redis连接
    if run_command("redis-cli ping"):
        print("✅ Redis设置完成")
        return True
    else:
        print("❌ Redis设置失败")
        return False

def create_env_file():
    """创建环境配置文件"""
    print("⚙️ 创建环境配置...")
    
    env_content = """# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tea_admin
DB_USER=tea_admin
DB_PASSWORD=tea_admin_123456

# Redis配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# 应用配置
APP_SECRET=tea_admin_secret_key_change_this_in_production
APP_ENV=production
APP_DEBUG=false

# 管理后台配置
ADMIN_PORT=8080
ADMIN_HOST=0.0.0.0

# 安全配置
JWT_SECRET=tea_admin_jwt_secret_change_this_in_production
SESSION_SECRET=tea_admin_session_secret_change_this_in_production

# 邮件配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=REPLACE_WITH_YOUR_ACTUAL_EMAIL_PASSWORD

# 文件上传配置
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760
"""
    
    with open('.env', 'w', encoding='utf-8') as f:
        f.write(env_content)
    
    print("✅ 环境配置文件创建完成")
    print("⚠️ 请修改 .env 文件中的敏感信息")

def create_systemd_service():
    """创建系统服务"""
    print("🔧 创建系统服务...")
    
    service_content = """[Unit]
Description=Tea Admin Backend
After=network.target mysql.service redis-server.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory={}
Environment=PATH={}/venv/bin
ExecStart={}/venv/bin/python app.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
""".format(os.getcwd(), os.getcwd(), os.getcwd())
    
    service_file = '/etc/systemd/system/tea-admin.service'
    
    try:
        with open(service_file, 'w') as f:
            f.write(service_content)
        
        # 重新加载服务配置
        run_command("sudo systemctl daemon-reload")
        
        # 启用服务
        run_command("sudo systemctl enable tea-admin")
        
        print("✅ 系统服务创建完成")
        return True
    except Exception as e:
        print(f"❌ 系统服务创建失败: {e}")
        return False

def create_nginx_config():
    """创建Nginx配置"""
    print("🌐 创建Nginx配置...")
    
    nginx_config = """server {
    listen 80;
    server_name admin.tea-platform.com;
    
    # 重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name admin.tea-platform.com;
    
    # SSL证书配置（需要先配置SSL证书）
    # ssl_certificate /etc/letsencrypt/live/admin.tea-platform.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/admin.tea-platform.com/privkey.pem;
    
    # SSL安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # 静态文件
    location /static/ {
        alias {}/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 管理后台页面
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
""".format(os.getcwd())
    
    nginx_file = '/etc/nginx/sites-available/tea-admin'
    
    try:
        with open(nginx_file, 'w') as f:
            f.write(nginx_config)
        
        # 启用站点
        run_command("sudo ln -sf /etc/nginx/sites-available/tea-admin /etc/nginx/sites-enabled/")
        
        # 测试配置
        if run_command("sudo nginx -t"):
            run_command("sudo systemctl restart nginx")
            print("✅ Nginx配置创建完成")
            return True
        else:
            print("❌ Nginx配置测试失败")
            return False
    except Exception as e:
        print(f"❌ Nginx配置创建失败: {e}")
        return False

def setup_firewall():
    """设置防火墙"""
    print("🔥 设置防火墙...")
    
    firewall_commands = [
        "sudo ufw allow 80",
        "sudo ufw allow 443",
        "sudo ufw allow 8080"
    ]
    
    for cmd in firewall_commands:
        run_command(cmd)
    
    print("✅ 防火墙设置完成")

def create_backup_script():
    """创建备份脚本"""
    print("💾 创建备份脚本...")
    
    backup_script = """#!/bin/bash
# 茶叶管理后台备份脚本

BACKUP_DIR="/var/backups/tea-admin"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库
mysqldump -u tea_admin -ptea_admin_123456 tea_admin > $BACKUP_DIR/db_backup_$DATE.sql

# 备份文件
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz --exclude=venv --exclude=__pycache__ .

# 删除7天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: $BACKUP_DIR"
"""
    
    with open('backup.sh', 'w') as f:
        f.write(backup_script)
    
    run_command("chmod +x backup.sh")
    print("✅ 备份脚本创建完成")

def main():
    """主函数"""
    print("🚀 茶叶平台独立管理后台部署脚本")
    print("=" * 50)
    
    # 检查系统要求
    if not check_requirements():
        print("❌ 系统要求检查失败")
        return
    
    # 创建目录
    create_directories()
    
    # 安装依赖
    if not install_dependencies():
        print("❌ 依赖安装失败")
        return
    
    # 设置数据库
    if not setup_database():
        print("❌ 数据库设置失败")
        return
    
    # 设置Redis
    if not setup_redis():
        print("❌ Redis设置失败")
        return
    
    # 创建环境配置
    create_env_file()
    
    # 创建系统服务
    if not create_systemd_service():
        print("❌ 系统服务创建失败")
        return
    
    # 创建Nginx配置
    if not create_nginx_config():
        print("❌ Nginx配置创建失败")
        return
    
    # 设置防火墙
    setup_firewall()
    
    # 创建备份脚本
    create_backup_script()
    
    print("\n" + "=" * 50)
    print("🎉 部署完成！")
    print("\n📋 后续步骤：")
    print("1. 修改 .env 文件中的敏感信息")
    print("2. 配置SSL证书（可选）")
    print("3. 启动服务: sudo systemctl start tea-admin")
    print("4. 访问管理后台: http://localhost:8080")
    print("5. 默认账号: admin / admin123456")
    print("\n🔐 安全提醒：")
    print("- 请立即修改默认密码")
    print("- 配置防火墙规则")
    print("- 定期备份数据")
    print("- 监控系统日志")

if __name__ == '__main__':
    main() 