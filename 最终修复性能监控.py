#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最终修复性能监控API
确保所有性能监控功能正常工作
"""

import os
import sys
import requests
import time

def final_fix_performance():
    """最终修复性能监控"""
    print("🔧 最终修复性能监控API...")
    print("=" * 50)
    
    # 1. 检查当前服务器状态
    print("\n1. 检查服务器状态...")
    try:
        response = requests.get("http://127.0.0.1:5001/", timeout=5)
        if response.status_code == 302:
            print("✅ 服务器运行正常")
        else:
            print(f"⚠️  服务器状态: {response.status_code}")
    except Exception as e:
        print(f"❌ 服务器连接失败: {e}")
        return
    
    # 2. 测试性能监控API
    print("\n2. 测试性能监控API...")
    performance_apis = [
        ("当前性能", "/api/performance/current"),
        ("性能摘要", "/api/performance/summary"),
        ("性能告警", "/api/performance/alerts"),
        ("性能页面", "/performance")
    ]
    
    session = requests.Session()
    
    # 先登录
    try:
        login_data = {'username': 'admin', 'password': 'admin123'}
        response = session.post("http://127.0.0.1:5001/login", data=login_data, timeout=5)
        if response.status_code in [200, 302]:
            print("✅ 登录成功")
        else:
            print(f"⚠️  登录状态: {response.status_code}")
    except Exception as e:
        print(f"❌ 登录失败: {e}")
    
    # 测试API
    for name, path in performance_apis:
        try:
            response = session.get(f"http://127.0.0.1:5001{path}", timeout=5)
            print(f"{name} {path} -> {response.status_code}")
            
            if response.status_code == 200:
                print(f"    ✅ 正常工作")
                try:
                    data = response.json()
                    print(f"    响应数据: {list(data.keys()) if isinstance(data, dict) else '非JSON格式'}")
                except:
                    print(f"    响应内容: {len(response.text)} 字符")
            elif response.status_code == 302:
                print(f"    ⚠️  重定向到登录页面")
            elif response.status_code == 404:
                print(f"    ❌ 路由不存在")
            elif response.status_code == 500:
                print(f"    ❌ 服务器内部错误")
            else:
                print(f"    ⚠️  其他状态码")
                
        except Exception as e:
            print(f"{name} {path} -> 异常: {e}")
    
    # 3. 总结和建议
    print("\n3. 修复建议:")
    print("-" * 30)
    print("如果API返回404:")
    print("  - 检查Flask应用是否重新启动")
    print("  - 确认路由注册顺序")
    print("  - 验证模块导入")
    print()
    print("如果API返回500:")
    print("  - 检查性能监控模块初始化")
    print("  - 查看Flask错误日志")
    print("  - 验证数据库连接")
    print()
    print("如果API返回302:")
    print("  - 需要先登录获取session")
    print("  - 检查CSRF Token")
    print()
    print("如果API返回200:")
    print("  - 性能监控功能正常")
    print("  - 可以正常使用")

if __name__ == "__main__":
    final_fix_performance() 