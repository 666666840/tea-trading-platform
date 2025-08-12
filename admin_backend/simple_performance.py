#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简化的性能监控模块
"""

import psutil
import time
from datetime import datetime

class SimplePerformanceMonitor:
    """简化的性能监控器"""
    
    def __init__(self):
        self.metrics = {}
        self.alerts = []
    
    def get_current_metrics(self):
        """获取当前性能指标"""
        try:
            # 系统指标
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            self.metrics = {
                'cpu_usage': cpu_percent,
                'memory_usage': memory.percent,
                'memory_available': memory.available,
                'disk_usage': disk.percent,
                'disk_free': disk.free,
                'db_connections': 5,  # 模拟数据库连接数
                'db_response_time': 50  # 模拟数据库响应时间(ms)
            }
            
            return self.metrics
        except Exception as e:
            print(f"获取性能指标失败: {e}")
            return {}
    
    def get_metrics_history(self, metric_name, hours=24):
        """获取历史性能指标"""
        # 简化版本，返回模拟数据
        return [
            {'timestamp': datetime.now().isoformat(), 'value': 50}
        ]
    
    def get_alerts(self, limit=50):
        """获取性能告警"""
        return self.alerts[-limit:] if limit else self.alerts
    
    def clear_alerts(self):
        """清除告警"""
        self.alerts.clear()
    
    def get_performance_summary(self):
        """获取性能摘要"""
        current = self.get_current_metrics()
        
        return {
            'current': current,
            'averages': current,  # 简化版本
            'alerts_count': len(self.alerts),
            'system_status': 'healthy'
        }

# 全局实例
simple_monitor = SimplePerformanceMonitor()

def get_simple_monitor():
    """获取简化监控器实例"""
    return simple_monitor 