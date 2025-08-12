#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
直接测试性能监控API
"""

import requests
import json

def test_performance_api():
    """直接测试性能监控API"""
    base_url = "http://127.0.0.1:5001"
    
    print("=== 直接测试性能监控API ===")
    
    # 测试登录
    session = requests.Session()
    login_data = {'username': 'admin', 'password': 'admin123'}
    
    try:
        response = session.post(f"{base_url}/login", data=login_data)
        print(f"登录状态: {response.status_code}")
        
        if response.status_code == 302:
            print("✅ 登录成功")
        else:
            print("❌ 登录失败")
            return
    except Exception as e:
        print(f"❌ 登录异常: {e}")
        return
    
    # 测试性能监控API
    apis = [
        '/api/performance/current',
        '/api/performance/summary',
        '/api/performance/alerts',
        '/performance'
    ]
    
    for api in apis:
        try:
            response = session.get(f"{base_url}{api}")
            print(f"{api}: {response.status_code}")
            
            if response.status_code == 200:
                print(f"✅ {api} 正常")
            else:
                print(f"❌ {api} 失败")
        except Exception as e:
            print(f"❌ {api} 异常: {e}")

if __name__ == "__main__":
    test_performance_api() 