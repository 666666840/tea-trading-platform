#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试登录修复
"""

import requests
import json
import time
import re

def test_login_fix():
    """测试登录修复"""
    base_url = "http://127.0.0.1:5001"
    session = requests.Session()
    
    try:
        # 1. 测试登录页面
        print("1. 测试登录页面...")
        login_page_response = session.get(f"{base_url}/login")
        print(f"   登录页面状态: {login_page_response.status_code}")
        
        if login_page_response.status_code != 200:
            print("   ❌ 无法访问登录页面")
            return False
        
        # 提取CSRF token
        csrf_token = None
        if 'csrf_token' in login_page_response.text:
            csrf_match = re.search(r'name="csrf_token" value="([^\"]+)"', login_page_response.text)
            if csrf_match:
                csrf_token = csrf_match.group(1)
                print(f"   找到CSRF token: {csrf_token[:20]}...")
        
        # 2. 测试登录
        print("2. 测试登录...")
        login_data = {
            'username': 'admin',
            'password': 'admin123'
        }
        
        # 如果有CSRF token，添加到登录数据中
        if csrf_token:
            login_data['csrf_token'] = csrf_token
        
        login_response = session.post(f"{base_url}/login", data=login_data)
        print(f"   登录状态: {login_response.status_code}")
        
        if login_response.status_code == 302:
            print("   ✅ 登录成功，重定向到dashboard")
        else:
            print(f"   ❌ 登录失败，状态码: {login_response.status_code}")
            print(f"   响应内容: {login_response.text[:200]}...")
            return False
        
        # 3. 测试dashboard访问
        print("3. 测试dashboard访问...")
        dashboard_response = session.get(f"{base_url}/dashboard")
        print(f"   Dashboard状态: {dashboard_response.status_code}")
        
        if dashboard_response.status_code == 200:
            print("   ✅ Dashboard访问成功")
        else:
            print(f"   ❌ Dashboard访问失败: {dashboard_response.text[:200]}...")
            return False
        
        # 4. 测试性能监控API
        print("4. 测试性能监控API...")
        apis = [
            '/api/performance/current',
            '/api/performance/summary',
            '/api/performance/alerts'
        ]
        
        for api in apis:
            response = session.get(f"{base_url}{api}")
            print(f"   {api}: {response.status_code}")
            if response.status_code == 200:
                print(f"   ✅ {api} 正常")
            else:
                print(f"   ❌ {api} 失败: {response.text[:100]}...")
        
        # 5. 测试性能监控页面
        print("5. 测试性能监控页面...")
        performance_response = session.get(f"{base_url}/performance")
        print(f"   性能监控页面状态: {performance_response.status_code}")
        
        if performance_response.status_code == 200:
            print("   ✅ 性能监控页面访问成功")
        else:
            print(f"   ❌ 性能监控页面访问失败: {performance_response.text[:100]}...")
        
        print("\n🎉 所有测试完成！")
        return True
        
    except Exception as e:
        print(f"❌ 测试过程中出现错误: {e}")
        return False

if __name__ == "__main__":
    print("开始测试登录修复...")
    test_login_fix() 