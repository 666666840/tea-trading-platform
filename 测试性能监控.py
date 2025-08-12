#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试性能监控功能
验证新增的性能监控API是否正常工作
"""

import requests
import json
import time

def test_performance_monitoring():
    """测试性能监控功能"""
    base_url = "http://127.0.0.1:5001"
    
    print("=== 茶叶平台管理后台 - 性能监控测试 ===")
    print("等待服务器启动...")
    time.sleep(3)
    
    # 测试登录
    print("\n=== 测试登录 ===")
    login_data = {
        'username': 'admin',
        'password': 'admin123'
    }
    
    session = requests.Session()
    
    try:
        # 获取登录页面
        response = session.get(f"{base_url}/login")
        print(f"登录页面状态: {response.status_code}")
        
        # 执行登录
        response = session.post(f"{base_url}/login", data=login_data)
        print(f"登录状态: {response.status_code}")
        
        if response.status_code == 302 or "dashboard" in response.url:
            print("✅ 登录成功！")
        else:
            print("❌ 登录失败")
            return
            
    except Exception as e:
        print(f"❌ 登录异常: {e}")
        return
    
    # 测试性能监控API
    print("\n=== 测试性能监控API ===")
    
    # 1. 测试当前性能指标
    print("\n1. 测试当前性能指标...")
    try:
        response = session.get(f"{base_url}/api/performance/current")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                metrics = data.get('data', {})
                print(f"✅ CPU使用率: {metrics.get('cpu_usage', 'N/A')}%")
                print(f"✅ 内存使用率: {metrics.get('memory_usage', 'N/A')}%")
                print(f"✅ 磁盘使用率: {metrics.get('disk_usage', 'N/A')}%")
                print(f"✅ 数据库连接数: {metrics.get('db_connections', 'N/A')}")
            else:
                print(f"❌ API返回错误: {data.get('error', '未知错误')}")
        else:
            print(f"❌ 请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试异常: {e}")
    
    # 2. 测试性能摘要
    print("\n2. 测试性能摘要...")
    try:
        response = session.get(f"{base_url}/api/performance/summary")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                summary = data.get('data', {})
                print(f"✅ 系统状态: {summary.get('system_status', 'N/A')}")
                print(f"✅ 告警数量: {summary.get('alerts_count', 'N/A')}")
            else:
                print(f"❌ API返回错误: {data.get('error', '未知错误')}")
        else:
            print(f"❌ 请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试异常: {e}")
    
    # 3. 测试性能告警
    print("\n3. 测试性能告警...")
    try:
        response = session.get(f"{base_url}/api/performance/alerts")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                alerts = data.get('data', [])
                print(f"✅ 告警数量: {len(alerts)}")
                for alert in alerts[:3]:  # 显示前3个告警
                    print(f"   - {alert.get('type')}: {alert.get('message')}")
            else:
                print(f"❌ API返回错误: {data.get('error', '未知错误')}")
        else:
            print(f"❌ 请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试异常: {e}")
    
    # 4. 测试历史性能数据
    print("\n4. 测试历史性能数据...")
    try:
        response = session.get(f"{base_url}/api/performance/history/cpu_usage?hours=1")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                history = data.get('data', [])
                print(f"✅ CPU历史数据点: {len(history)}")
            else:
                print(f"❌ API返回错误: {data.get('error', '未知错误')}")
        else:
            print(f"❌ 请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试异常: {e}")
    
    # 5. 测试性能监控页面
    print("\n5. 测试性能监控页面...")
    try:
        response = session.get(f"{base_url}/performance")
        if response.status_code == 200:
            print("✅ 性能监控页面访问正常")
        else:
            print(f"❌ 页面访问失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试异常: {e}")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    test_performance_monitoring() 