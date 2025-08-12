#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查性能监控模块
"""

import sys
import os

# 添加项目路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_performance_module():
    """测试性能监控模块"""
    print("🔍 检查性能监控模块...")
    
    try:
        # 测试simple_performance模块
        print("1. 测试simple_performance模块...")
        from admin_backend.simple_performance import get_simple_monitor
        
        monitor = get_simple_monitor()
        print(f"✅ 获取监控器成功: {type(monitor)}")
        
        # 测试各个方法
        print("2. 测试监控器方法...")
        
        # 测试获取当前指标
        try:
            metrics = monitor.get_current_metrics()
            print(f"✅ get_current_metrics: {type(metrics)}")
            if metrics:
                print(f"   指标: {list(metrics.keys())}")
        except Exception as e:
            print(f"❌ get_current_metrics失败: {e}")
        
        # 测试获取摘要
        try:
            summary = monitor.get_performance_summary()
            print(f"✅ get_performance_summary: {type(summary)}")
        except Exception as e:
            print(f"❌ get_performance_summary失败: {e}")
        
        # 测试获取告警
        try:
            alerts = monitor.get_alerts()
            print(f"✅ get_alerts: {type(alerts)}")
        except Exception as e:
            print(f"❌ get_alerts失败: {e}")
        
        print("✅ 性能监控模块测试完成")
        
    except Exception as e:
        print(f"❌ 性能监控模块测试失败: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_performance_module() 