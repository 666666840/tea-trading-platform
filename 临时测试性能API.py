#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
临时测试性能监控API函数
直接调用函数，绕过Flask路由
"""

import sys
import os

# 添加项目路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_performance_functions():
    """直接测试性能监控函数"""
    print("🔍 直接测试性能监控函数...")
    
    try:
        # 导入app和性能监控函数
        from admin_backend.app import app, performance_monitor
        
        print(f"✅ 导入成功")
        print(f"performance_monitor类型: {type(performance_monitor)}")
        
        # 测试各个API函数
        with app.app_context():
            print("\n1. 测试api_performance_current...")
            try:
                from admin_backend.app import api_performance_current
                # 模拟请求上下文
                from flask import request
                with app.test_request_context('/api/performance/current'):
                    response = api_performance_current()
                    print(f"✅ api_performance_current: {response.status_code}")
            except Exception as e:
                print(f"❌ api_performance_current失败: {e}")
            
            print("\n2. 测试api_performance_summary...")
            try:
                from admin_backend.app import api_performance_summary
                with app.test_request_context('/api/performance/summary'):
                    response = api_performance_summary()
                    print(f"✅ api_performance_summary: {response.status_code}")
            except Exception as e:
                print(f"❌ api_performance_summary失败: {e}")
            
            print("\n3. 测试api_performance_alerts...")
            try:
                from admin_backend.app import api_performance_alerts
                with app.test_request_context('/api/performance/alerts'):
                    response = api_performance_alerts()
                    print(f"✅ api_performance_alerts: {response.status_code}")
            except Exception as e:
                print(f"❌ api_performance_alerts失败: {e}")
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_performance_functions() 