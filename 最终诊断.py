#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最终诊断脚本
全面检查Flask应用状态
"""

import sys
import os
import requests
import time

# 添加项目路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def final_diagnosis():
    """最终诊断"""
    print("🔍 最终诊断 - 茶叶平台管理后台")
    print("=" * 60)
    
    # 1. 检查Flask应用状态
    print("\n1. 检查Flask应用状态...")
    try:
        from admin_backend.app import app, performance_monitor
        
        print(f"✅ Flask应用加载成功")
        print(f"✅ 性能监控器: {type(performance_monitor)}")
        
        # 检查路由
        routes = []
        for rule in app.url_map.iter_rules():
            if 'performance' in rule.rule:
                routes.append(rule.rule)
        
        print(f"✅ 性能监控路由数量: {len(routes)}")
        for route in routes:
            print(f"   - {route}")
            
    except Exception as e:
        print(f"❌ Flask应用加载失败: {e}")
        return
    
    # 2. 测试网络连接
    print("\n2. 测试网络连接...")
    base_url = "http://127.0.0.1:5001"
    
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"✅ 网络连接: {response.status_code}")
    except Exception as e:
        print(f"❌ 网络连接失败: {e}")
        return
    
    # 3. 测试基础API
    print("\n3. 测试基础API...")
    basic_apis = [
        ("首页", "/"),
        ("登录页", "/login"),
        ("仪表板", "/dashboard")
    ]
    
    for name, path in basic_apis:
        try:
            response = requests.get(f"{base_url}{path}", timeout=5, allow_redirects=False)
            print(f"{name} {path} -> {response.status_code}")
        except Exception as e:
            print(f"{name} {path} -> 异常: {e}")
    
    # 4. 测试性能监控API
    print("\n4. 测试性能监控API...")
    performance_apis = [
        ("当前性能", "/api/performance/current"),
        ("性能摘要", "/api/performance/summary"),
        ("性能告警", "/api/performance/alerts"),
        ("性能页面", "/performance")
    ]
    
    for name, path in performance_apis:
        try:
            response = requests.get(f"{base_url}{path}", timeout=5, allow_redirects=False)
            print(f"{name} {path} -> {response.status_code}")
            
            if response.status_code == 302:
                print(f"    ✅ 重定向到登录（正常）")
            elif response.status_code == 404:
                print(f"    ❌ 路由不存在")
            elif response.status_code == 500:
                print(f"    ❌ 服务器错误")
            elif response.status_code == 200:
                print(f"    ✅ 正常响应")
                
        except Exception as e:
            print(f"{name} {path} -> 异常: {e}")
    
    # 5. 总结
    print("\n5. 诊断总结:")
    print("-" * 40)
    print("如果所有API都返回500，说明服务器内部错误")
    print("如果返回302，说明需要登录认证")
    print("如果返回404，说明路由未注册")
    print("如果返回200，说明API正常工作")
    
    print("\n🎯 建议:")
    print("1. 检查Flask应用日志")
    print("2. 确认所有依赖模块正常")
    print("3. 验证数据库连接")
    print("4. 检查应用配置")

if __name__ == "__main__":
    final_diagnosis() 