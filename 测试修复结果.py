#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试修复结果
"""

import requests
import json
import time

def test_fixes():
    """测试所有修复"""
    base_url = "http://127.0.0.1:5001"
    session = requests.Session()
    
    print("=== 测试修复结果 ===")
    
    # 1. 测试登录页面
    print("\n1. 测试登录页面...")
    try:
        response = session.get(f"{base_url}/login")
        print(f"   状态码: {response.status_code}")
        if response.status_code == 200:
            print("   ✅ 登录页面正常")
        else:
            print("   ❌ 登录页面异常")
    except Exception as e:
        print(f"   ❌ 登录页面访问失败: {e}")
    
    # 2. 测试登录功能
    print("\n2. 测试登录功能...")
    try:
        login_data = {
            'username': 'admin',
            'password': 'admin123'
        }
        response = session.post(f"{base_url}/login", data=login_data)
        print(f"   登录状态码: {response.status_code}")
        
        if response.status_code == 302:
            print("   ✅ 登录成功，重定向到dashboard")
            
            # 3. 测试dashboard页面
            print("\n3. 测试dashboard页面...")
            response = session.get(f"{base_url}/dashboard")
            print(f"   Dashboard状态码: {response.status_code}")
            if response.status_code == 200:
                print("   ✅ Dashboard页面正常")
            else:
                print("   ❌ Dashboard页面异常")
                
            # 4. 测试性能监控API
            print("\n4. 测试性能监控API...")
            apis = [
                '/api/performance/current',
                '/api/performance/summary',
                '/api/performance/alerts',
                '/api/performance/history/cpu_usage?hours=1'
            ]
            
            for api in apis:
                try:
                    response = session.get(f"{base_url}{api}")
                    print(f"   {api}: {response.status_code}")
                    if response.status_code == 200:
                        print(f"   ✅ {api} 正常")
                    else:
                        print(f"   ❌ {api} 异常")
                except Exception as e:
                    print(f"   ❌ {api} 访问失败: {e}")
            
            # 5. 测试性能监控页面
            print("\n5. 测试性能监控页面...")
            try:
                response = session.get(f"{base_url}/performance")
                print(f"   性能监控页面状态码: {response.status_code}")
                if response.status_code == 200:
                    print("   ✅ 性能监控页面正常")
                else:
                    print("   ❌ 性能监控页面异常")
            except Exception as e:
                print(f"   ❌ 性能监控页面访问失败: {e}")
                
        else:
            print("   ❌ 登录失败")
            print(f"   响应内容: {response.text[:200]}")
            
    except Exception as e:
        print(f"   ❌ 登录测试失败: {e}")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    test_fixes() 