#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查Flask应用路由映射
"""

import requests
import json

# 配置
BASE_URL = "http://localhost:5001"

def check_routes():
    """检查Flask应用的路由"""
    print("🔍 检查Flask应用路由映射")
    print("=" * 50)
    
    try:
        # 获取Flask应用的路由映射
        response = requests.get(f"{BASE_URL}/")
        
        if response.status_code == 200:
            print("✅ 服务器连接正常")
            
            # 测试各个API端点
            test_routes = [
                '/api/logs/stats',
                '/api/logs/charts', 
                '/api/logs/realtime',
                '/api/logs/alerts',
                '/api/logs/analysis',
                '/api/logs/export/advanced',
                '/api/logs/cleanup'
            ]
            
            print("\n📋 测试API端点:")
            print("-" * 30)
            
            for route in test_routes:
                try:
                    if route.endswith('/advanced') or route.endswith('/cleanup'):
                        # POST请求
                        test_data = {'test': 'data'}
                        resp = requests.post(f"{BASE_URL}{route}", json=test_data, timeout=5)
                    else:
                        # GET请求
                        resp = requests.get(f"{BASE_URL}{route}", timeout=5)
                    
                    if resp.status_code == 401:
                        print(f"✅ {route}: 需要登录验证 (HTTP 401)")
                    elif resp.status_code == 404:
                        print(f"❌ {route}: 路由不存在 (HTTP 404)")
                    elif resp.status_code == 200:
                        print(f"✅ {route}: 路由正常 (HTTP 200)")
                    else:
                        print(f"⚠️ {route}: 其他状态 (HTTP {resp.status_code})")
                        
                except requests.exceptions.RequestException as e:
                    print(f"❌ {route}: 连接失败 - {str(e)}")
                    
        else:
            print(f"❌ 服务器响应异常: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ 无法连接到服务器: {str(e)}")

def test_basic_functionality():
    """测试基本功能"""
    print("\n🧪 测试基本功能")
    print("-" * 30)
    
    try:
        # 测试登录页面
        response = requests.get(f"{BASE_URL}/login")
        if response.status_code == 200:
            print("✅ 登录页面正常")
        else:
            print(f"❌ 登录页面异常: HTTP {response.status_code}")
            
        # 测试仪表板页面（需要登录）
        response = requests.get(f"{BASE_URL}/dashboard")
        if response.status_code == 302:  # 重定向到登录页
            print("✅ 仪表板页面重定向正常")
        else:
            print(f"⚠️ 仪表板页面状态: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ 基本功能测试失败: {str(e)}")

def main():
    """主函数"""
    print("🚀 开始检查Flask应用路由")
    print("=" * 50)
    
    check_routes()
    test_basic_functionality()
    
    print("\n" + "=" * 50)
    print("📋 检查完成")
    print("=" * 50)

if __name__ == "__main__":
    main() 