#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
诊断性能监控API问题
"""

import requests
import json
import time

# 服务器配置
BASE_URL = "http://127.0.0.1:5001"

def test_unauthorized_access():
    """测试未授权访问"""
    print("=== 测试未授权访问 ===")
    
    # 测试性能监控API
    apis = [
        '/api/performance/current',
        '/api/performance/summary',
        '/api/performance/alerts',
        '/api/performance/history/cpu_usage?hours=1',
        '/performance'
    ]
    
    for api in apis:
        print(f"\n测试: {api}")
        try:
            response = requests.get(f"{BASE_URL}{api}", timeout=10)
            print(f"状态码: {response.status_code}")
            print(f"响应头: {dict(response.headers)}")
            
            if response.status_code == 302:
                location = response.headers.get('Location', '')
                print(f"重定向到: {location}")
                if 'login' in location:
                    print("✓ 正确重定向到登录页面")
                else:
                    print("⚠ 重定向到其他页面")
            elif response.status_code == 401:
                print("✓ 正确返回未授权")
            elif response.status_code == 200:
                print("✗ 意外返回200状态码")
                print(f"响应内容: {response.text[:200]}...")
            else:
                print(f"⚠ 其他状态码: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"✗ 请求异常: {e}")

def test_login_flow():
    """测试登录流程"""
    print("\n=== 测试登录流程 ===")
    
    session = requests.Session()
    
    # 1. 访问登录页面
    print("1. 访问登录页面...")
    login_page = session.get(f"{BASE_URL}/login")
    print(f"登录页面状态码: {login_page.status_code}")
    
    if login_page.status_code == 200:
        print("✓ 登录页面访问成功")
    else:
        print(f"✗ 登录页面访问失败: {login_page.status_code}")
        return None
    
    # 2. 执行登录
    print("2. 执行登录...")
    login_data = {
        'username': 'admin',
        'password': 'admin123'
    }
    
    login_response = session.post(f"{BASE_URL}/login", data=login_data, allow_redirects=False)
    print(f"登录响应状态码: {login_response.status_code}")
    
    if login_response.status_code == 302:
        print("✓ 登录成功，重定向到dashboard")
        location = login_response.headers.get('Location', '')
        print(f"重定向到: {location}")
        
        # 3. 跟随重定向
        print("3. 跟随重定向...")
        dashboard_response = session.get(f"{BASE_URL}{location}")
        print(f"Dashboard响应状态码: {dashboard_response.status_code}")
        
        if dashboard_response.status_code == 200:
            print("✓ Dashboard访问成功")
            return session
        else:
            print(f"✗ Dashboard访问失败: {dashboard_response.status_code}")
            return None
    else:
        print(f"✗ 登录失败: {login_response.status_code}")
        print(f"响应内容: {login_response.text[:200]}...")
        return None

def test_authenticated_access(session):
    """测试已认证访问"""
    print("\n=== 测试已认证访问 ===")
    
    apis = [
        '/api/performance/current',
        '/api/performance/summary',
        '/api/performance/alerts',
        '/api/performance/history/cpu_usage?hours=1',
        '/performance'
    ]
    
    for api in apis:
        print(f"\n测试: {api}")
        try:
            response = session.get(f"{BASE_URL}{api}", timeout=10)
            print(f"状态码: {response.status_code}")
            
            if response.status_code == 200:
                print("✓ API访问成功")
                try:
                    data = response.json()
                    print(f"响应数据: {json.dumps(data, indent=2, ensure_ascii=False)[:300]}...")
                except:
                    print("响应不是JSON格式")
                    print(f"响应内容: {response.text[:200]}...")
            elif response.status_code == 302:
                location = response.headers.get('Location', '')
                print(f"⚠ 重定向到: {location}")
            else:
                print(f"✗ 其他状态码: {response.status_code}")
                print(f"响应内容: {response.text[:200]}...")
                
        except requests.exceptions.RequestException as e:
            print(f"✗ 请求异常: {e}")

def test_session_cookies():
    """测试会话Cookie"""
    print("\n=== 测试会话Cookie ===")
    
    session = requests.Session()
    
    # 登录
    login_data = {
        'username': 'admin',
        'password': 'admin123'
    }
    
    login_response = session.post(f"{BASE_URL}/login", data=login_data, allow_redirects=True)
    print(f"登录后Cookie: {dict(session.cookies)}")
    
    # 测试API
    response = session.get(f"{BASE_URL}/api/performance/current")
    print(f"API响应状态码: {response.status_code}")
    
    if response.status_code == 200:
        print("✓ 使用Cookie访问API成功")
    else:
        print(f"✗ 使用Cookie访问API失败: {response.status_code}")

def main():
    """主函数"""
    print("开始诊断性能监控API问题...")
    
    # 测试未授权访问
    test_unauthorized_access()
    
    # 测试登录流程
    session = test_login_flow()
    
    if session:
        # 测试已认证访问
        test_authenticated_access(session)
        
        # 测试会话Cookie
        test_session_cookies()
    else:
        print("登录失败，无法继续测试")
    
    print("\n诊断完成！")

if __name__ == "__main__":
    main() 