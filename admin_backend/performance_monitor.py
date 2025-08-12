#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台管理后台 - 性能监控模块
实时监控系统性能，提供告警和分析功能
"""

import os
import time
import psutil
import threading
from datetime import datetime, timedelta
from collections import defaultdict, deque
import json
import logging
from flask import current_app
from sqlalchemy import text

class PerformanceMonitor:
    """性能监控器"""
    
    def __init__(self, app=None):
        self.app = app
        self.metrics = defaultdict(deque)
        self.alerts = []
        self.monitoring = False
        self.thread = None
        
        # 性能阈值
        self.thresholds = {
            'cpu_usage': 80.0,  # CPU使用率阈值
            'memory_usage': 85.0,  # 内存使用率阈值
            'disk_usage': 90.0,  # 磁盘使用率阈值
            'response_time': 2000,  # 响应时间阈值(ms)
            'error_rate': 5.0,  # 错误率阈值(%)
            'database_connections': 80  # 数据库连接数阈值
        }
        
        if app:
            self.init_app(app)
    
    def init_app(self, app):
        """初始化应用"""
        self.app = app
        
        # 设置日志
        log_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'logs')
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
            
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(os.path.join(log_dir, 'performance.log')),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger('performance_monitor')
        
        # 启动监控
        self.start_monitoring()
    
    def start_monitoring(self):
        """启动性能监控"""
        if not self.monitoring:
            self.monitoring = True
            self.thread = threading.Thread(target=self._monitor_loop, daemon=True)
            self.thread.start()
            self.logger.info("性能监控已启动")
    
    def stop_monitoring(self):
        """停止性能监控"""
        self.monitoring = False
        if self.thread:
            self.thread.join()
        self.logger.info("性能监控已停止")
    
    def _monitor_loop(self):
        """监控循环"""
        while self.monitoring:
            try:
                self._collect_metrics()
                self._check_alerts()
                time.sleep(60)  # 每分钟收集一次
            except Exception as e:
                self.logger.error(f"监控循环错误: {e}")
                time.sleep(60)
    
    def _collect_metrics(self):
        """收集性能指标"""
        timestamp = datetime.now()
        
        # 系统指标
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        
        # 磁盘使用率 - 使用系统根目录或当前目录
        try:
            disk = psutil.disk_usage('/')
        except:
            try:
                disk = psutil.disk_usage('C:\\')
            except:
                disk = psutil.disk_usage('.')
        
        # 存储指标
        metrics_data = {
            'timestamp': timestamp.isoformat(),
            'cpu_usage': cpu_percent,
            'memory_usage': memory.percent,
            'memory_available': memory.available,
            'disk_usage': disk.percent,
            'disk_free': disk.free,
            'db_connections': 5,  # 模拟数据库连接数
            'db_response_time': 50  # 模拟数据库响应时间(ms)
        }
        
        # 添加到历史记录
        for key, value in metrics_data.items():
            if key != 'timestamp':
                self.metrics[key].append((timestamp, value))
                # 保留最近24小时的数据
                cutoff = timestamp - timedelta(hours=24)
                self.metrics[key] = deque(
                    [(t, v) for t, v in self.metrics[key] if t > cutoff],
                    maxlen=1440  # 24小时 * 60分钟
                )
    

    
    def _check_alerts(self):
        """检查告警条件"""
        current_metrics = {}
        for key in self.metrics:
            if self.metrics[key]:
                current_metrics[key] = self.metrics[key][-1][1]
        
        # 检查CPU使用率
        if current_metrics.get('cpu_usage', 0) > self.thresholds['cpu_usage']:
            self._create_alert('high_cpu', f"CPU使用率过高: {current_metrics['cpu_usage']:.1f}%")
        
        # 检查内存使用率
        if current_metrics.get('memory_usage', 0) > self.thresholds['memory_usage']:
            self._create_alert('high_memory', f"内存使用率过高: {current_metrics['memory_usage']:.1f}%")
        
        # 检查磁盘使用率
        if current_metrics.get('disk_usage', 0) > self.thresholds['disk_usage']:
            self._create_alert('high_disk', f"磁盘使用率过高: {current_metrics['disk_usage']:.1f}%")
        
        # 检查数据库连接数
        if current_metrics.get('db_connections', 0) > self.thresholds['database_connections']:
            self._create_alert('high_db_connections', f"数据库连接数过多: {current_metrics['db_connections']}")
        
        # 检查数据库响应时间
        if current_metrics.get('db_response_time', 0) > self.thresholds['response_time']:
            self._create_alert('slow_db', f"数据库响应时间过长: {current_metrics['db_response_time']:.1f}ms")
    
    def _create_alert(self, alert_type, message):
        """创建告警"""
        alert = {
            'id': len(self.alerts) + 1,
            'type': alert_type,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'severity': 'high' if alert_type in ['high_cpu', 'high_memory'] else 'medium'
        }
        
        self.alerts.append(alert)
        self.logger.warning(f"性能告警: {message}")
        
        # 保留最近100条告警
        if len(self.alerts) > 100:
            self.alerts = self.alerts[-100:]
    
    def get_current_metrics(self):
        """获取当前性能指标"""
        current = {}
        for key in self.metrics:
            if self.metrics[key]:
                current[key] = self.metrics[key][-1][1]
        return current
    
    def get_metrics_history(self, metric_name, hours=24):
        """获取历史性能指标"""
        if metric_name not in self.metrics:
            return []
        
        cutoff = datetime.now() - timedelta(hours=hours)
        return [
            {'timestamp': t.isoformat(), 'value': v}
            for t, v in self.metrics[metric_name]
            if t > cutoff
        ]
    
    def get_alerts(self, limit=50):
        """获取告警列表"""
        return self.alerts[-limit:] if limit else self.alerts
    
    def clear_alerts(self):
        """清除告警"""
        self.alerts.clear()
    
    def get_performance_summary(self):
        """获取性能摘要"""
        current = self.get_current_metrics()
        
        # 计算平均值
        averages = {}
        for key in self.metrics:
            if self.metrics[key]:
                values = [v for _, v in self.metrics[key]]
                averages[key] = sum(values) / len(values)
        
        return {
            'current': current,
            'averages': averages,
            'alerts_count': len(self.alerts),
            'system_status': self._get_system_status(current)
        }
    
    def _get_system_status(self, current_metrics):
        """获取系统状态"""
        status = 'healthy'
        
        for metric, value in current_metrics.items():
            threshold = self.thresholds.get(metric)
            if threshold and value > threshold:
                status = 'warning' if status == 'healthy' else 'critical'
        
        return status

# 全局监控实例
monitor = PerformanceMonitor()

def init_performance_monitor(app):
    """初始化性能监控"""
    monitor.init_app(app)
    return monitor 