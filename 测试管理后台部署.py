#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台独立管理后台部署测试脚本
用于验证部署是否成功
"""

import os
import sys
import requests
import subprocess
import time
import json
from datetime import datetime

def print_status(message, status="INFO"):
    """打印状态信息"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    if status == "SUCCESS":
        print(f"[{timestamp}] ✅ {message}")
    elif status == "ERROR":
        print(f"[{timestamp}] ❌ {message}")
    elif status == "WARNING":
        print(f"[{timestamp}] ⚠️  {message}")
    else:
        print(f"[{timestamp}] ℹ️  {message}")

def check_python_environment():
    """检查Python环境"""
    print_status("检查Python环境...")
    
    try:
        # 检查Python版本
        version = sys.version_info
        if version.major >= 3 and version.minor >= 8:
            print_status(f"Python版本: {version.major}.{version.minor}.{version.micro}", "SUCCESS")
        else:
            print_status(f"Python版本过低: {version.major}.{version.minor}.{version.micro}", "ERROR")
            return False
        
        # 检查必要模块
        required_modules = ['flask', 'sqlalchemy', 'redis', 'pymysql']
        missing_modules = []
        
        for module in required_modules:
            try:
                __import__(module)
                print_status(f"模块 {module} 已安装", "SUCCESS")
            except ImportError:
                missing_modules.append(module)
                print_status(f"模块 {module} 未安装", "ERROR")
        
        if missing_modules:
            print_status(f"缺少模块: {', '.join(missing_modules)}", "ERROR")
            return False
        
        return True
        
    except Exception as e:
        print_status(f"检查Python环境失败: {e}", "ERROR")
        return False

def check_database_connection():
    """检查数据库连接"""
    print_status("检查数据库连接...")
    
    try:
        import pymysql
        from dotenv import load_dotenv
        
        # 加载环境变量
        load_dotenv()
        
        # 获取数据库配置
        db_host = os.getenv('DB_HOST', 'localhost')
        db_port = int(os.getenv('DB_PORT', 3306))
        db_name = os.getenv('DB_NAME', 'tea_admin')
        db_user = os.getenv('DB_USER', 'tea_admin')
        db_password = os.getenv('DB_PASSWORD', 'tea_admin_123456')
        
        # 连接数据库
        connection = pymysql.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database=db_name,
            charset='utf8mb4'
        )
        
        # 测试查询
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            if result and result[0] == 1:
                print_status("数据库连接成功", "SUCCESS")
                connection.close()
                return True
            else:
                print_status("数据库查询测试失败", "ERROR")
                connection.close()
                return False
                
    except Exception as e:
        print_status(f"数据库连接失败: {e}", "ERROR")
        return False

def check_redis_connection():
    """检查Redis连接"""
    print_status("检查Redis连接...")
    
    try:
        import redis
        from dotenv import load_dotenv
        
        # 加载环境变量
        load_dotenv()
        
        # 获取Redis配置
        redis_host = os.getenv('REDIS_HOST', 'localhost')
        redis_port = int(os.getenv('REDIS_PORT', 6379))
        redis_password = os.getenv('REDIS_PASSWORD', None)
        
        # 连接Redis
        r = redis.Redis(
            host=redis_host,
            port=redis_port,
            password=redis_password,
            decode_responses=True
        )
        
        # 测试连接
        response = r.ping()
        if response:
            print_status("Redis连接成功", "SUCCESS")
            return True
        else:
            print_status("Redis连接测试失败", "ERROR")
            return False
            
    except Exception as e:
        print_status(f"Redis连接失败: {e}", "ERROR")
        return False

def check_admin_service():
    """检查管理后台服务"""
    print_status("检查管理后台服务...")
    
    try:
        # 检查端口是否被占用
        import socket
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('localhost', 8080))
        sock.close()
        
        if result == 0:
            print_status("端口8080已被占用", "WARNING")
            
            # 尝试访问管理后台
            try:
                response = requests.get('http://localhost:8080', timeout=5)
                if response.status_code == 200:
                    print_status("管理后台服务运行正常", "SUCCESS")
                    return True
                else:
                    print_status(f"管理后台响应异常: {response.status_code}", "WARNING")
                    return False
            except requests.exceptions.RequestException as e:
                print_status(f"无法访问管理后台: {e}", "ERROR")
                return False
        else:
            print_status("端口8080未被占用，服务可能未启动", "WARNING")
            return False
            
    except Exception as e:
        print_status(f"检查管理后台服务失败: {e}", "ERROR")
        return False

def check_file_structure():
    """检查文件结构"""
    print_status("检查文件结构...")
    
    # 检查关键文件
    required_files = [
        'app.py',
        'requirements.txt',
        'create_admin.py',
        '.env'
    ]
    
    required_dirs = [
        'templates',
        'static',
        'uploads',
        'logs'
    ]
    
    missing_files = []
    missing_dirs = []
    
    for file in required_files:
        if os.path.exists(file):
            print_status(f"文件 {file} 存在", "SUCCESS")
        else:
            missing_files.append(file)
            print_status(f"文件 {file} 不存在", "ERROR")
    
    for dir_name in required_dirs:
        if os.path.exists(dir_name) and os.path.isdir(dir_name):
            print_status(f"目录 {dir_name} 存在", "SUCCESS")
        else:
            missing_dirs.append(dir_name)
            print_status(f"目录 {dir_name} 不存在", "ERROR")
    
    if missing_files or missing_dirs:
        print_status(f"缺少文件: {missing_files}", "ERROR")
        print_status(f"缺少目录: {missing_dirs}", "ERROR")
        return False
    
    return True

def check_admin_user():
    """检查管理员用户"""
    print_status("检查管理员用户...")
    
    try:
        from dotenv import load_dotenv
        import pymysql
        
        # 加载环境变量
        load_dotenv()
        
        # 获取数据库配置
        db_host = os.getenv('DB_HOST', 'localhost')
        db_port = int(os.getenv('DB_PORT', 3306))
        db_name = os.getenv('DB_NAME', 'tea_admin')
        db_user = os.getenv('DB_USER', 'tea_admin')
        db_password = os.getenv('DB_PASSWORD', 'tea_admin_123456')
        
        # 连接数据库
        connection = pymysql.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database=db_name,
            charset='utf8mb4'
        )
        
        # 检查管理员用户
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM admin_users WHERE username = 'admin'")
            result = cursor.fetchone()
            
            if result and result[0] > 0:
                print_status("管理员用户存在", "SUCCESS")
                connection.close()
                return True
            else:
                print_status("管理员用户不存在", "WARNING")
                connection.close()
                return False
                
    except Exception as e:
        print_status(f"检查管理员用户失败: {e}", "ERROR")
        return False

def run_comprehensive_test():
    """运行综合测试"""
    print("=" * 60)
    print("🚀 茶叶平台独立管理后台部署测试")
    print("=" * 60)
    print()
    
    tests = [
        ("Python环境检查", check_python_environment),
        ("文件结构检查", check_file_structure),
        ("数据库连接检查", check_database_connection),
        ("Redis连接检查", check_redis_connection),
        ("管理员用户检查", check_admin_user),
        ("管理后台服务检查", check_admin_service)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"📋 {test_name}")
        print("-" * 40)
        
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print_status(f"测试执行失败: {e}", "ERROR")
            results.append((test_name, False))
        
        print()
    
    # 显示测试结果
    print("=" * 60)
    print("📊 测试结果汇总")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ 通过" if result else "❌ 失败"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print()
    print(f"总计: {passed}/{total} 项测试通过")
    
    if passed == total:
        print_status("🎉 所有测试通过！部署成功！", "SUCCESS")
        print()
        print("📋 访问信息：")
        print("- 管理后台地址: http://localhost:8080")
        print("- 默认账号: admin")
        print("- 默认密码: admin123456")
        print()
        print("🔧 管理命令：")
        print("- 启动服务: python app.py")
        print("- 创建管理员: python create_admin.py")
        print("- 初始化数据库: python -c 'from app import init_database; init_database()'")
    else:
        print_status("⚠️  部分测试失败，请检查部署配置", "WARNING")
        print()
        print("🔧 建议操作：")
        print("1. 检查环境配置文件 .env")
        print("2. 确保数据库和Redis服务正在运行")
        print("3. 运行数据库初始化: python -c 'from app import init_database; init_database()'")
        print("4. 创建管理员账号: python create_admin.py")
        print("5. 启动管理后台: python app.py")

if __name__ == "__main__":
    # 检查是否在正确的目录
    if not os.path.exists('app.py'):
        print_status("请在管理后台目录下运行此脚本", "ERROR")
        print_status("当前目录:", "INFO")
        print(f"  {os.getcwd()}")
        print_status("请切换到包含 app.py 的目录", "INFO")
        sys.exit(1)
    
    run_comprehensive_test() 