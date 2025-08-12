#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简化测试性能监控API
直接测试核心功能
"""

import requests
import time

def test_simple_performance():
    """简化测试性能监控"""
    print("🔧 简化测试性能监控API...")
    base_url = "http://127.0.0.1:5001"
    
    # 等待服务启动
    print("⏳ 等待服务启动...")
    time.sleep(3)
    
    # 测试基础连接
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"✅ 服务连接: {response.status_code}")
    except Exception as e:
        print(f"❌ 服务连接失败: {e}")
        return
    
    # 测试登录页面
    try:
        response = requests.get(f"{base_url}/login", timeout=5)
        print(f"✅ 登录页面: {response.status_code}")
        if response.status_code == 200:
            print("   页面内容长度:", len(response.text))
    except Exception as e:
        print(f"❌ 登录页面失败: {e}")
    
    # 测试性能监控API（预期302重定向到登录）
    performance_apis = [
        ("当前性能", "/api/performance/current"),
        ("性能摘要", "/api/performance/summary"),
        ("性能告警", "/api/performance/alerts"),
        ("性能页面", "/performance")
    ]
    
    print(f"\n🎯 测试性能监控API:")
    print("-" * 50)
    
    for name, path in performance_apis:
        try:
            response = requests.get(f"{base_url}{path}", timeout=5, allow_redirects=False)
            print(f"{name} {path} -> {response.status_code}")
            
            if response.status_code == 302:
                print(f"    ✅ 重定向到登录页面（正常）")
                print(f"    Location: {response.headers.get('Location', 'N/A')}")
            elif response.status_code == 200:
                print(f"    ✅ 正常响应")
            elif response.status_code == 404:
                print(f"    ❌ 路由不存在")
            elif response.status_code == 500:
                print(f"    ❌ 服务器内部错误")
            else:
                print(f"    ⚠️  其他状态码")
                
        except Exception as e:
            print(f"{name} {path} -> 异常: {e}")
    
    print(f"\n📊 总结:")
    print("如果返回302，说明路由存在但需要登录")
    print("如果返回404，说明路由不存在")
    print("如果返回500，说明服务器内部错误")
    print("如果返回200，说明API正常工作")

if __name__ == "__main__":
    test_simple_performance() 