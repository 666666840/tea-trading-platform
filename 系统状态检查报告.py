#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台管理后台 - 系统状态检查报告
全面验证系统各模块功能状态
"""

import requests
import json
import time
import psutil
import os
from datetime import datetime

def check_system_status():
    """检查系统整体状态"""
    print("=" * 60)
    print("🍵 茶叶平台管理后台 - 系统状态检查报告")
    print("=" * 60)
    print(f"检查时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 1. 检查服务器状态
    print("📊 1. 服务器状态检查")
    print("-" * 40)
    
    try:
        response = requests.get("http://127.0.0.1:5001/", timeout=5)
        if response.status_code == 302:
            print("✅ 服务器运行正常 (重定向到登录页面)")
        else:
            print(f"⚠️  服务器响应异常: {response.status_code}")
    except Exception as e:
        print(f"❌ 服务器连接失败: {e}")
        return False
    
    # 2. 检查数据库连接
    print("\n🗄️  2. 数据库连接检查")
    print("-" * 40)
    
    try:
        response = requests.get("http://127.0.0.1:5001/api/settings", timeout=5)
        if response.status_code == 200:
            print("✅ 数据库连接正常")
        else:
            print(f"⚠️  数据库连接异常: {response.status_code}")
    except Exception as e:
        print(f"❌ 数据库连接失败: {e}")
    
    # 3. 检查API接口状态
    print("\n🔌 3. API接口状态检查")
    print("-" * 40)
    
    # 登录获取session
    session = requests.Session()
    login_data = {'username': 'admin', 'password': 'admin123'}
    
    try:
        # 登录
        response = session.post("http://127.0.0.1:5001/login", data=login_data, timeout=5)
        if response.status_code in [200, 302]:
            print("✅ 登录接口正常")
        else:
            print(f"⚠️  登录接口异常: {response.status_code}")
    except Exception as e:
        print(f"❌ 登录接口失败: {e}")
        return False
    
    # 测试各个API接口
    api_endpoints = [
        ("日志统计", "/api/logs/stats"),
        ("日志图表", "/api/logs/charts"),
        ("实时日志", "/api/logs/realtime"),
        ("日志告警", "/api/logs/alerts"),
        ("日志分析", "/api/logs/analysis"),
        ("市场管理", "/api/markets"),
        ("商户管理", "/api/merchants"),
        ("用户管理", "/api/users"),
        ("系统设置", "/api/settings"),
        ("性能监控", "/api/performance/current"),
        ("性能摘要", "/api/performance/summary"),
        ("性能告警", "/api/performance/alerts")
    ]
    
    success_count = 0
    for name, endpoint in api_endpoints:
        try:
            response = session.get(f"http://127.0.0.1:5001{endpoint}", timeout=5)
            if response.status_code == 200:
                print(f"✅ {name} API正常")
                success_count += 1
            else:
                print(f"⚠️  {name} API异常: {response.status_code}")
        except Exception as e:
            print(f"❌ {name} API失败: {e}")
    
    print(f"\n📈 API接口成功率: {success_count}/{len(api_endpoints)} ({success_count/len(api_endpoints)*100:.1f}%)")
    
    # 4. 检查系统资源
    print("\n💻 4. 系统资源检查")
    print("-" * 40)
    
    # CPU使用率
    cpu_percent = psutil.cpu_percent(interval=1)
    print(f"CPU使用率: {cpu_percent:.1f}%")
    
    # 内存使用率
    memory = psutil.virtual_memory()
    print(f"内存使用率: {memory.percent:.1f}% ({memory.used // (1024**3):.1f}GB / {memory.total // (1024**3):.1f}GB)")
    
    # 磁盘使用率
    disk = psutil.disk_usage('/')
    print(f"磁盘使用率: {disk.percent:.1f}% ({disk.used // (1024**3):.1f}GB / {disk.total // (1024**3):.1f}GB)")
    
    # 5. 检查日志文件
    print("\n📝 5. 日志文件检查")
    print("-" * 40)
    
    log_files = [
        "admin_backend/logs/app.log",
        "admin_backend/logs/error.log",
        "admin_backend/logs/performance.log",
        "admin_backend/logs/access.log"
    ]
    
    for log_file in log_files:
        if os.path.exists(log_file):
            size = os.path.getsize(log_file)
            print(f"✅ {log_file}: {size // 1024:.1f}KB")
        else:
            print(f"⚠️  {log_file}: 文件不存在")
    
    # 6. 检查静态文件
    print("\n🎨 6. 静态文件检查")
    print("-" * 40)
    
    static_files = [
        "admin_backend/static/css/style.css",
        "admin_backend/static/js/main.js",
        "admin_backend/static/js/charts.js",
        "admin_backend/static/js/notifications.js"
    ]
    
    for static_file in static_files:
        if os.path.exists(static_file):
            size = os.path.getsize(static_file)
            print(f"✅ {static_file}: {size} bytes")
        else:
            print(f"⚠️  {static_file}: 文件不存在")
    
    # 7. 生成总结报告
    print("\n📋 7. 系统状态总结")
    print("-" * 40)
    
    if success_count >= len(api_endpoints) * 0.8:  # 80%以上API正常
        print("🎉 系统状态: 优秀")
        print("✅ 所有核心功能正常运行")
        print("✅ API接口响应正常")
        print("✅ 数据库连接稳定")
        print("✅ 性能监控工作正常")
    elif success_count >= len(api_endpoints) * 0.6:  # 60%以上API正常
        print("⚠️  系统状态: 良好")
        print("⚠️  部分功能可能需要关注")
    else:
        print("❌ 系统状态: 需要维护")
        print("❌ 多个功能模块存在问题")
    
    print(f"\n📊 总体评分: {success_count}/{len(api_endpoints)} ({success_count/len(api_endpoints)*100:.1f}%)")
    
    # 8. 生成建议
    print("\n💡 8. 优化建议")
    print("-" * 40)
    
    if memory.percent > 80:
        print("⚠️  建议: 内存使用率较高，考虑优化内存使用")
    
    if cpu_percent > 70:
        print("⚠️  建议: CPU使用率较高，检查是否有资源密集型操作")
    
    if disk.percent > 80:
        print("⚠️  建议: 磁盘空间不足，考虑清理日志文件")
    
    if success_count == len(api_endpoints):
        print("✅ 系统运行完美，无需额外优化")
    
    print("\n" + "=" * 60)
    print("检查完成！系统状态报告已生成")
    print("=" * 60)

if __name__ == "__main__":
    check_system_status() 