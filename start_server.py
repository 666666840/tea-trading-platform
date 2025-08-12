#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶一点通API服务器启动脚本
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def check_python_version():
    """检查Python版本"""
    if sys.version_info < (3, 7):
        print("❌ 错误：需要Python 3.7或更高版本")
        print(f"当前版本：{sys.version}")
        return False
    print(f"✅ Python版本检查通过：{sys.version}")
    return True

def install_requirements():
    """安装依赖包"""
    print("📦 正在安装依赖包...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ 依赖包安装完成")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 依赖包安装失败：{e}")
        return False

def create_directories():
    """创建必要的目录"""
    directories = ['logs', 'uploads', 'static']
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
    print("✅ 目录结构创建完成")

def start_server():
    """启动服务器"""
    print("🚀 正在启动茶叶一点通API服务器...")
    print("📍 服务器地址：http://localhost:3000")
    print("📋 API文档：http://localhost:3000")
    print("🔧 管理后台：http://localhost:3000/admin")
    print("=" * 50)
    
    try:
        # 启动服务器
        subprocess.run([sys.executable, "server.py"])
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except Exception as e:
        print(f"❌ 服务器启动失败：{e}")

def main():
    """主函数"""
    print("🍵 茶叶一点通API服务器启动器")
    print("=" * 50)
    
    # 检查Python版本
    if not check_python_version():
        return
    
    # 创建目录
    create_directories()
    
    # 安装依赖
    if not install_requirements():
        return
    
    # 启动服务器
    start_server()

if __name__ == "__main__":
    main() 