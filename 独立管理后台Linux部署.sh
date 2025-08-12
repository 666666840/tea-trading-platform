#!/bin/bash

# 茶叶平台独立管理后台Linux部署脚本
# 适用于 Ubuntu 20.04+ 和 CentOS 8+

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "检测到root用户，建议使用普通用户运行此脚本"
        read -p "是否继续？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# 检查系统要求
check_system() {
    log_info "检查系统要求..."
    
    # 检查操作系统
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    else
        log_error "无法检测操作系统"
        exit 1
    fi
    
    log_info "操作系统: $OS $VER"
    
    # 检查Python版本
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        log_success "Python版本: $PYTHON_VERSION"
    else
        log_error "Python3未安装"
        exit 1
    fi
    
    # 检查必要命令
    COMMANDS=("pip3" "git" "curl" "wget")
    for cmd in "${COMMANDS[@]}"; do
        if command -v $cmd &> /dev/null; then
            log_success "$cmd 已安装"
        else
            log_warning "$cmd 未安装"
        fi
    done
}

# 安装系统依赖
install_system_deps() {
    log_info "安装系统依赖..."
    
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        sudo apt update
        sudo apt install -y python3-pip python3-venv mysql-server redis-server nginx git curl wget
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        sudo yum update -y
        sudo yum install -y python3-pip python3-venv mysql-server redis nginx git curl wget
    else
        log_error "不支持的操作系统: $OS"
        exit 1
    fi
    
    log_success "系统依赖安装完成"
}

# 创建项目目录
create_project_dir() {
    log_info "创建项目目录..."
    
    PROJECT_DIR="/var/www/tea-admin"
    sudo mkdir -p $PROJECT_DIR
    sudo chown $USER:$USER $PROJECT_DIR
    
    log_success "项目目录创建完成: $PROJECT_DIR"
}

# 复制管理后台文件
copy_admin_files() {
    log_info "复制管理后台文件..."
    
    # 获取脚本所在目录
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    ADMIN_BACKEND_DIR="$SCRIPT_DIR/admin_backend"
    
    if [[ -d "$ADMIN_BACKEND_DIR" ]]; then
        cp -r "$ADMIN_BACKEND_DIR"/* "$PROJECT_DIR/"
        log_success "管理后台文件复制完成"
    else
        log_error "未找到admin_backend目录: $ADMIN_BACKEND_DIR"
        exit 1
    fi
}

# 创建Python虚拟环境
create_venv() {
    log_info "创建Python虚拟环境..."
    
    cd $PROJECT_DIR
    python3 -m venv venv
    source venv/bin/activate
    
    # 升级pip
    pip install --upgrade pip
    
    log_success "虚拟环境创建完成"
}

# 安装Python依赖
install_python_deps() {
    log_info "安装Python依赖..."
    
    cd $PROJECT_DIR
    source venv/bin/activate
    
    # 安装依赖
    if [[ -f "requirements.txt" ]]; then
        pip install -r requirements.txt
        log_success "Python依赖安装完成"
    else
        log_error "requirements.txt文件不存在"
        exit 1
    fi
}

# 配置数据库
setup_database() {
    log_info "配置数据库..."
    
    # 启动MySQL服务
    sudo systemctl start mysql
    sudo systemctl enable mysql
    
    # 创建数据库和用户
    sudo mysql -e "CREATE DATABASE IF NOT EXISTS tea_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    sudo mysql -e "CREATE USER IF NOT EXISTS 'tea_admin'@'localhost' IDENTIFIED BY 'tea_admin_123456';"
    sudo mysql -e "GRANT ALL PRIVILEGES ON tea_admin.* TO 'tea_admin'@'localhost';"
    sudo mysql -e "FLUSH PRIVILEGES;"
    
    log_success "数据库配置完成"
}

# 配置Redis
setup_redis() {
    log_info "配置Redis..."
    
    # 启动Redis服务
    sudo systemctl start redis-server
    sudo systemctl enable redis-server
    
    # 测试Redis连接
    if redis-cli ping &> /dev/null; then
        log_success "Redis配置完成"
    else
        log_error "Redis配置失败"
        exit 1
    fi
}

# 创建环境配置文件
create_env_file() {
    log_info "创建环境配置文件..."
    
    cd $PROJECT_DIR
    
    cat > .env << EOF
# 数据库配置
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
UPLOAD_PATH=/var/www/tea-admin/uploads
MAX_FILE_SIZE=10485760
EOF
    
    log_success "环境配置文件创建完成"
    log_warning "请修改 .env 文件中的敏感信息"
}

# 创建系统服务
create_systemd_service() {
    log_info "创建系统服务..."
    
    sudo tee /etc/systemd/system/tea-admin.service > /dev/null << EOF
[Unit]
Description=Tea Admin Backend
After=network.target mysql.service redis-server.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$PROJECT_DIR
Environment=PATH=$PROJECT_DIR/venv/bin
ExecStart=$PROJECT_DIR/venv/bin/python app.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
    
    # 重新加载服务配置
    sudo systemctl daemon-reload
    
    # 启用服务
    sudo systemctl enable tea-admin
    
    log_success "系统服务创建完成"
}

# 配置Nginx
setup_nginx() {
    log_info "配置Nginx..."
    
    # 创建Nginx配置
    sudo tee /etc/nginx/sites-available/tea-admin > /dev/null << EOF
server {
    listen 80;
    server_name admin.tea-platform.com;
    
    # 重定向到HTTPS
    return 301 https://\$server_name\$request_uri;
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
        alias $PROJECT_DIR/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 管理后台页面
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    
    # 启用站点
    sudo ln -sf /etc/nginx/sites-available/tea-admin /etc/nginx/sites-enabled/
    
    # 测试配置
    if sudo nginx -t; then
        sudo systemctl restart nginx
        log_success "Nginx配置完成"
    else
        log_error "Nginx配置测试失败"
        exit 1
    fi
}

# 配置防火墙
setup_firewall() {
    log_info "配置防火墙..."
    
    if command -v ufw &> /dev/null; then
        sudo ufw allow 80
        sudo ufw allow 443
        sudo ufw allow 8080
        log_success "UFW防火墙配置完成"
    elif command -v firewall-cmd &> /dev/null; then
        sudo firewall-cmd --permanent --add-port=80/tcp
        sudo firewall-cmd --permanent --add-port=443/tcp
        sudo firewall-cmd --permanent --add-port=8080/tcp
        sudo firewall-cmd --reload
        log_success "firewalld防火墙配置完成"
    else
        log_warning "未检测到防火墙，请手动配置"
    fi
}

# 创建管理脚本
create_management_scripts() {
    log_info "创建管理脚本..."
    
    cd $PROJECT_DIR
    
    # 启动脚本
    cat > start_admin.sh << 'EOF'
#!/bin/bash
echo "正在启动茶叶管理后台..."
cd /var/www/tea-admin
source venv/bin/activate
python app.py
EOF
    
    # 停止脚本
    cat > stop_admin.sh << 'EOF'
#!/bin/bash
echo "正在停止茶叶管理后台..."
sudo systemctl stop tea-admin
echo "服务已停止"
EOF
    
    # 重启脚本
    cat > restart_admin.sh << 'EOF'
#!/bin/bash
echo "正在重启茶叶管理后台..."
sudo systemctl restart tea-admin
echo "服务已重启"
EOF
    
    # 状态查看脚本
    cat > status_admin.sh << 'EOF'
#!/bin/bash
echo "茶叶管理后台服务状态："
sudo systemctl status tea-admin
EOF
    
    # 日志查看脚本
    cat > logs_admin.sh << 'EOF'
#!/bin/bash
echo "茶叶管理后台日志："
sudo journalctl -u tea-admin -f
EOF
    
    # 数据库初始化脚本
    cat > init_db.sh << 'EOF'
#!/bin/bash
echo "正在初始化数据库..."
cd /var/www/tea-admin
source venv/bin/activate
python -c "from app import init_database; init_database()"
echo "数据库初始化完成"
EOF
    
    # 创建管理员脚本
    cat > create_admin.sh << 'EOF'
#!/bin/bash
echo "正在创建管理员账号..."
cd /var/www/tea-admin
source venv/bin/activate
python create_admin.py
echo "管理员账号创建完成"
EOF
    
    # 设置执行权限
    chmod +x *.sh
    
    log_success "管理脚本创建完成"
}

# 创建备份脚本
create_backup_script() {
    log_info "创建备份脚本..."
    
    cd $PROJECT_DIR
    
    cat > backup.sh << 'EOF'
#!/bin/bash
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
EOF
    
    chmod +x backup.sh
    log_success "备份脚本创建完成"
}

# 启动服务
start_services() {
    log_info "启动服务..."
    
    # 启动管理后台服务
    sudo systemctl start tea-admin
    
    # 检查服务状态
    if sudo systemctl is-active --quiet tea-admin; then
        log_success "管理后台服务启动成功"
    else
        log_error "管理后台服务启动失败"
        exit 1
    fi
}

# 显示部署信息
show_deployment_info() {
    echo
    echo "========================================"
    echo "🎉 茶叶平台独立管理后台部署完成！"
    echo "========================================"
    echo
    echo "📋 部署信息："
    echo "- 项目目录: $PROJECT_DIR"
    echo "- 服务地址: http://localhost:8080"
    echo "- 默认账号: admin"
    echo "- 默认密码: admin123456"
    echo
    echo "🔧 管理命令："
    echo "- 启动服务: sudo systemctl start tea-admin"
    echo "- 停止服务: sudo systemctl stop tea-admin"
    echo "- 重启服务: sudo systemctl restart tea-admin"
    echo "- 查看状态: sudo systemctl status tea-admin"
    echo "- 查看日志: sudo journalctl -u tea-admin -f"
    echo
    echo "📝 管理脚本："
    echo "- 启动: $PROJECT_DIR/start_admin.sh"
    echo "- 停止: $PROJECT_DIR/stop_admin.sh"
    echo "- 重启: $PROJECT_DIR/restart_admin.sh"
    echo "- 状态: $PROJECT_DIR/status_admin.sh"
    echo "- 日志: $PROJECT_DIR/logs_admin.sh"
    echo "- 初始化数据库: $PROJECT_DIR/init_db.sh"
    echo "- 创建管理员: $PROJECT_DIR/create_admin.sh"
    echo "- 备份: $PROJECT_DIR/backup.sh"
    echo
    echo "💾 备份命令："
    echo "- 手动备份: $PROJECT_DIR/backup.sh"
    echo "- 定时备份: crontab -e (添加: 0 2 * * * $PROJECT_DIR/backup.sh)"
    echo
    echo "🔐 安全提醒："
    echo "- 请立即修改默认密码"
    echo "- 配置SSL证书"
    echo "- 定期备份数据"
    echo "- 监控系统日志"
    echo
}

# 主函数
main() {
    echo "🚀 茶叶平台独立管理后台Linux部署脚本"
    echo "========================================"
    echo
    
    check_root
    check_system
    install_system_deps
    create_project_dir
    copy_admin_files
    create_venv
    install_python_deps
    setup_database
    setup_redis
    create_env_file
    create_systemd_service
    setup_nginx
    setup_firewall
    create_management_scripts
    create_backup_script
    start_services
    show_deployment_info
}

# 运行主函数
main "$@" 