#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试API修复结果
"""

import requests
import json

def test_api():
    base_url = "http://127.0.0.1:5001"
    
    print("=== 测试API修复结果 ===")
    
    # 测试登录页面
    try:
        response = requests.get(f"{base_url}/login")
        print(f"✅ 登录页面: {response.status_code}")
    except Exception as e:
        print(f"❌ 登录页面: {e}")
    
    # 测试性能监控API
    try:
        response = requests.get(f"{base_url}/api/performance/current")
        print(f"✅ 性能监控API: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   数据: {data}")
    except Exception as e:
        print(f"❌ 性能监控API: {e}")
    
    # 测试性能监控页面
    try:
        response = requests.get(f"{base_url}/performance")
        print(f"✅ 性能监控页面: {response.status_code}")
    except Exception as e:
        print(f"❌ 性能监控页面: {e}")
    
    # 测试日志API
    try:
        response = requests.get(f"{base_url}/api/logs/stats")
        print(f"✅ 日志统计API: {response.status_code}")
    except Exception as e:
        print(f"❌ 日志统计API: {e}")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    test_api() 