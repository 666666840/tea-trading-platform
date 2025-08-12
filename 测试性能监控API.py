#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试性能监控API
"""

import requests
import json
import time
import re

def test_performance_apis():
    """测试性能监控API"""
    base_url = "http://127.0.0.1:5001"
    
    # 登录获取session
    session = requests.Session()
    
    try:
        # 先获取登录页面，获取CSRF token
        login_page_response = session.get(f"{base_url}/login")
        print(f"登录页面状态: {login_page_response.status_code}")
        
        if login_page_response.status_code != 200:
            print("无法访问登录页面")
            return
        
        # 提取CSRF token
        csrf_token = None
        if 'csrf_token' in login_page_response.text:
            csrf_match = re.search(r'name="csrf_token" value="([^"]+)"', login_page_response.text)
            if csrf_match:
                csrf_token = csrf_match.group(1)
                print(f"找到CSRF token: {csrf_token[:20]}...")
        
        # 登录数据
        login_data = {
            'username': 'admin',
            'password': 'admin123'
        }
        
        # 如果有CSRF token，添加到登录数据中
        if csrf_token:
            login_data['csrf_token'] = csrf_token
        
        # 登录
        login_response = session.post(f"{base_url}/login", data=login_data, allow_redirects=False)
        print(f"登录状态: {login_response.status_code}")
        
        if login_response.status_code == 302:
            print("登录成功，重定向到dashboard")
        else:
            print(f"登录失败: {login_response.text[:200]}...")
            return
        
        # 测试性能监控API
        apis = [
            '/api/performance/current',
            '/api/performance/summary',
            '/api/performance/alerts',
            '/api/performance/history/cpu_usage?hours=1'
        ]
        
        for api in apis:
            try:
                response = session.get(f"{base_url}{api}")
                print(f"\n测试API: {api}")
                print(f"状态码: {response.status_code}")
                
                if response.status_code == 200:
                    data = response.json()
                    print(f"响应数据: {json.dumps(data, indent=2, ensure_ascii=False)}")
                else:
                    print(f"错误响应: {response.text[:200]}...")
                    
            except Exception as e:
                print(f"请求失败: {e}")
            
            time.sleep(1)  # 避免请求过快
        
        # 测试性能监控页面
        try:
            response = session.get(f"{base_url}/performance")
            print(f"\n测试性能监控页面: {response.status_code}")
            if response.status_code == 200:
                print("性能监控页面访问成功")
            else:
                print(f"页面访问失败: {response.text[:200]}...")
        except Exception as e:
            print(f"页面访问失败: {e}")
            
    except Exception as e:
        print(f"测试过程中出现错误: {e}")

if __name__ == "__main__":
    print("开始测试性能监控API...")
    test_performance_apis()
    print("\n测试完成！") 