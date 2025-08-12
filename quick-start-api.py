#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import subprocess
import os

def check_and_install_dependencies():
    """检查并安装依赖包"""
    print("🔍 检查依赖包...")
    
    dependencies = ['flask', 'flask-cors', 'requests']
    missing_deps = []
    
    for dep in dependencies:
        try:
            __import__(dep.replace('-', '_'))
            print(f"✅ {dep} 已安装")
        except ImportError:
            print(f"❌ {dep} 未安装")
            missing_deps.append(dep)
    
    if missing_deps:
        print("📦 正在安装缺失的依赖包...")
        for dep in missing_deps:
            try:
                subprocess.check_call([sys.executable, '-m', 'pip', 'install', dep])
                print(f"✅ {dep} 安装成功")
            except subprocess.CalledProcessError:
                print(f"❌ {dep} 安装失败")
                return False
    
    return True

def start_api_server():
    """启动API服务器"""
    print("🚀 启动API服务器...")
    
    # 检查server.py是否存在
    if not os.path.exists('server.py'):
        print("❌ server.py 文件不存在")
        return False
    
    try:
        # 导入并启动服务器
        sys.path.append(os.getcwd())
        
        from flask import Flask, request
        from flask_cors import CORS
        import json
        import random
        from datetime import datetime
        
        print("✅ 依赖包导入成功")
        
        # 创建简化的API服务器
        app = Flask(__name__)
        CORS(app)
        
        @app.route('/health')
        def health():
            return {"status": "ok", "message": "茶叶API服务运行正常"}
        
        @app.route('/api/content')
        def get_content():
            content_type = request.args.get('type', 'recommend')
            
            sample_data = {
                "recommend": [],
                "news": [],
                "art": [],
                "hot": []
            }
            
            return {"status": "success", "data": sample_data.get(content_type, [])}
        
        print("📡 启动API服务器在端口3000...")
        print("🌐 健康检查地址：http://127.0.0.1:3000/health")
        print("📋 API文档地址：http://127.0.0.1:3000/api/content")
        print("⚡ 服务器正在运行...")
        
        app.run(host='0.0.0.0', port=3000, debug=True)
        
    except Exception as e:
        print(f"❌ 启动API服务器失败：{e}")
        return False

def main():
    print("🔧 茶叶批发平台 API 启动工具")
    print("=" * 50)
    
    # 检查并安装依赖
    if not check_and_install_dependencies():
        print("❌ 依赖包安装失败，无法启动服务器")
        return
    
    # 启动服务器
    start_api_server()

if __name__ == "__main__":
    main() 