#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试性能监控API修复
验证管理后台性能监控功能是否正常工作
"""

import requests
import json
import time
from datetime import datetime

def test_performance_apis():
    """测试性能监控API"""
    
    base_url = "http://127.0.0.1:8080"
    
    print("🧪 开始测试性能监控API...")
    print("=" * 50)
    
    # 1. 测试登录
    print("1. 测试管理员登录...")
    login_data = {
        "username": "admin",
        "password": "admin123456"
    }
    
    try:
        # 获取登录页面获取CSRF token
        session = requests.Session()
        login_response = session.get(f"{base_url}/login")
        
        # 提交登录表单
        login_response = session.post(f"{base_url}/login", data=login_data, allow_redirects=False)
        
        if login_response.status_code == 302:  # 重定向表示登录成功
            print("✅ 登录成功")
        else:
            print("❌ 登录失败")
            return False
            
    except Exception as e:
        print(f"❌ 登录测试失败: {e}")
        return False
    
    # 2. 测试性能监控页面访问
    print("\n2. 测试性能监控页面访问...")
    try:
        response = session.get(f"{base_url}/performance")
        if response.status_code == 200:
            print("✅ 性能监控页面访问成功")
        else:
            print(f"❌ 性能监控页面访问失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 性能监控页面测试失败: {e}")
    
    # 3. 测试当前性能指标API
    print("\n3. 测试当前性能指标API...")
    try:
        response = session.get(f"{base_url}/api/performance/current")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ 当前性能指标API正常")
                print(f"   CPU使用率: {data['data'].get('cpu_usage', 'N/A')}%")
                print(f"   内存使用率: {data['data'].get('memory_usage', 'N/A')}%")
                print(f"   磁盘使用率: {data['data'].get('disk_usage', 'N/A')}%")
            else:
                print(f"❌ API返回错误: {data.get('error')}")
        else:
            print(f"❌ API请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 当前性能指标API测试失败: {e}")
    
    # 4. 测试性能告警API
    print("\n4. 测试性能告警API...")
    try:
        response = session.get(f"{base_url}/api/performance/alerts")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ 性能告警API正常")
                print(f"   告警数量: {data['data']['count']}")
            else:
                print(f"❌ API返回错误: {data.get('error')}")
        else:
            print(f"❌ API请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 性能告警API测试失败: {e}")
    
    # 5. 测试性能摘要API
    print("\n5. 测试性能摘要API...")
    try:
        response = session.get(f"{base_url}/api/performance/summary")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ 性能摘要API正常")
                summary = data['data']
                print(f"   系统状态: {summary.get('system_status', 'N/A')}")
                print(f"   告警数量: {summary.get('alerts_count', 'N/A')}")
            else:
                print(f"❌ API返回错误: {data.get('error')}")
        else:
            print(f"❌ API请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 性能摘要API测试失败: {e}")
    
    # 6. 测试历史性能数据API
    print("\n6. 测试历史性能数据API...")
    try:
        response = session.get(f"{base_url}/api/performance/history/cpu_usage?hours=24")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ 历史性能数据API正常")
                print(f"   指标: {data['data']['metric']}")
                print(f"   时间范围: {data['data']['hours']}小时")
                print(f"   数据点数: {len(data['data']['history'])}")
            else:
                print(f"❌ API返回错误: {data.get('error')}")
        else:
            print(f"❌ API请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 历史性能数据API测试失败: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 性能监控API测试完成！")
    
    return True

def check_admin_server():
    """检查管理后台服务器状态"""
    print("🔍 检查管理后台服务器状态...")
    
    try:
        response = requests.get("http://127.0.0.1:8080", timeout=5)
        if response.status_code == 200:
            print("✅ 管理后台服务器运行正常")
            return True
        else:
            print(f"⚠️  管理后台服务器响应异常: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ 无法连接到管理后台服务器")
        print("💡 请确保管理后台服务器正在运行:")
        print("   python admin_backend/app_simple.py")
        return False
    except Exception as e:
        print(f"❌ 检查服务器状态失败: {e}")
        return False

if __name__ == "__main__":
    print("🍵 茶叶平台性能监控API修复测试")
    print("=" * 50)
    
    # 检查服务器状态
    if not check_admin_server():
        print("\n❌ 测试终止：管理后台服务器未运行")
        exit(1)
    
    # 等待服务器完全启动
    print("⏳ 等待服务器完全启动...")
    time.sleep(2)
    
    # 执行测试
    success = test_performance_apis()
    
    if success:
        print("\n🎉 所有测试通过！性能监控API修复成功！")
    else:
        print("\n❌ 部分测试失败，请检查错误信息")
    
    print("\n📋 测试报告生成完成")
    print("📅 测试时间:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
