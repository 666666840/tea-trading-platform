#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查服务器状态
"""

import requests
import time

def check_server():
    """检查服务器状态"""
    base_url = "http://127.0.0.1:5001"
    
    print("=== 检查服务器状态 ===")
    
    # 测试基础页面
    try:
        response = requests.get(f"{base_url}/")
        print(f"首页状态: {response.status_code}")
    except Exception as e:
        print(f"首页访问失败: {e}")
    
    # 测试登录页面
    try:
        response = requests.get(f"{base_url}/login")
        print(f"登录页面状态: {response.status_code}")
    except Exception as e:
        print(f"登录页面访问失败: {e}")
    
    # 测试仪表板页面
    try:
        response = requests.get(f"{base_url}/dashboard")
        print(f"仪表板页面状态: {response.status_code}")
    except Exception as e:
        print(f"仪表板页面访问失败: {e}")
    
    # 测试性能监控页面
    try:
        response = requests.get(f"{base_url}/performance")
        print(f"性能监控页面状态: {response.status_code}")
    except Exception as e:
        print(f"性能监控页面访问失败: {e}")
    
    # 测试已知的API
    try:
        response = requests.get(f"{base_url}/api/logs/stats")
        print(f"日志统计API状态: {response.status_code}")
    except Exception as e:
        print(f"日志统计API访问失败: {e}")
    
    # 测试性能监控API
    try:
        response = requests.get(f"{base_url}/api/performance/current")
        print(f"性能监控API状态: {response.status_code}")
    except Exception as e:
        print(f"性能监控API访问失败: {e}")

if __name__ == "__main__":
    check_server() 