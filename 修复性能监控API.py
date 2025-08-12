#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复性能监控API 404问题
确保所有性能监控相关的API正常工作
"""

import os
import shutil

def fix_performance_apis():
    """修复性能监控API问题"""
    print("🔧 开始修复性能监控API...")
    
    # 1. 检查app.py中的性能监控路由
    app_file = "admin_backend/app.py"
    
    if os.path.exists(app_file):
        with open(app_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否包含性能监控路由
        performance_routes = [
            '/api/performance/current',
            '/api/performance/summary', 
            '/api/performance/alerts',
            '/performance'
        ]
        
        missing_routes = []
        for route in performance_routes:
            if route not in content:
                missing_routes.append(route)
        
        if missing_routes:
            print(f"⚠️  发现缺失的性能监控路由: {missing_routes}")
            
            # 添加缺失的路由
            print("📝 正在添加缺失的性能监控路由...")
            
            # 在文件末尾添加性能监控路由
            performance_routes_code = '''
# 性能监控API路由
@app.route('/api/performance/current')
@login_required
def api_performance_current():
    """获取当前性能数据"""
    try:
        import psutil
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return jsonify({
            'success': True,
            'data': {
                'cpu_usage': cpu_percent,
                'memory_usage': memory.percent,
                'memory_used': memory.used // (1024**3),
                'memory_total': memory.total // (1024**3),
                'disk_usage': disk.percent,
                'disk_used': disk.used // (1024**3),
                'disk_total': disk.total // (1024**3),
                'timestamp': datetime.now().isoformat()
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/performance/summary')
@login_required
def api_performance_summary():
    """获取性能摘要"""
    try:
        import psutil
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        # 获取网络统计
        network = psutil.net_io_counters()
        
        return jsonify({
            'success': True,
            'data': {
                'cpu': {
                    'current': cpu_percent,
                    'status': 'normal' if cpu_percent < 70 else 'warning' if cpu_percent < 90 else 'critical'
                },
                'memory': {
                    'current': memory.percent,
                    'used_gb': memory.used // (1024**3),
                    'total_gb': memory.total // (1024**3),
                    'status': 'normal' if memory.percent < 80 else 'warning' if memory.percent < 90 else 'critical'
                },
                'disk': {
                    'current': disk.percent,
                    'used_gb': disk.used // (1024**3),
                    'total_gb': disk.total // (1024**3),
                    'status': 'normal' if disk.percent < 80 else 'warning' if disk.percent < 90 else 'critical'
                },
                'network': {
                    'bytes_sent': network.bytes_sent,
                    'bytes_recv': network.bytes_recv
                }
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/performance/alerts')
@login_required
def api_performance_alerts():
    """获取性能告警"""
    try:
        import psutil
        alerts = []
        
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        if cpu_percent > 90:
            alerts.append({
                'type': 'critical',
                'message': f'CPU使用率过高: {cpu_percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        elif cpu_percent > 70:
            alerts.append({
                'type': 'warning',
                'message': f'CPU使用率较高: {cpu_percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        
        if memory.percent > 90:
            alerts.append({
                'type': 'critical',
                'message': f'内存使用率过高: {memory.percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        elif memory.percent > 80:
            alerts.append({
                'type': 'warning',
                'message': f'内存使用率较高: {memory.percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        
        if disk.percent > 90:
            alerts.append({
                'type': 'critical',
                'message': f'磁盘使用率过高: {disk.percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        elif disk.percent > 80:
            alerts.append({
                'type': 'warning',
                'message': f'磁盘使用率较高: {disk.percent:.1f}%',
                'timestamp': datetime.now().isoformat()
            })
        
        return jsonify({
            'success': True,
            'data': {
                'alerts': alerts,
                'count': len(alerts)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/performance')
@login_required
def performance_dashboard():
    """性能监控仪表板"""
    return render_template('performance.html')
'''
            
            # 在文件末尾添加代码
            with open(app_file, 'a', encoding='utf-8') as f:
                f.write(performance_routes_code)
            
            print("✅ 性能监控路由添加完成")
        else:
            print("✅ 所有性能监控路由已存在")
    else:
        print("❌ app.py文件不存在")
    
    # 2. 创建性能监控页面模板
    performance_template = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>性能监控 - 茶叶平台管理后台</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🍵 性能监控仪表板</h1>
            <nav class="nav">
                <a href="/dashboard" class="nav-link">返回仪表板</a>
            </nav>
        </header>
        
        <div class="performance-grid">
            <!-- CPU使用率 -->
            <div class="metric-card">
                <h3>CPU使用率</h3>
                <div class="metric-value" id="cpu-usage">--</div>
                <div class="metric-chart">
                    <canvas id="cpu-chart"></canvas>
                </div>
            </div>
            
            <!-- 内存使用率 -->
            <div class="metric-card">
                <h3>内存使用率</h3>
                <div class="metric-value" id="memory-usage">--</div>
                <div class="metric-chart">
                    <canvas id="memory-chart"></canvas>
                </div>
            </div>
            
            <!-- 磁盘使用率 -->
            <div class="metric-card">
                <h3>磁盘使用率</h3>
                <div class="metric-value" id="disk-usage">--</div>
                <div class="metric-chart">
                    <canvas id="disk-chart"></canvas>
                </div>
            </div>
            
            <!-- 网络流量 -->
            <div class="metric-card">
                <h3>网络流量</h3>
                <div class="metric-value" id="network-usage">--</div>
                <div class="metric-chart">
                    <canvas id="network-chart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- 告警面板 -->
        <div class="alerts-panel">
            <h3>系统告警</h3>
            <div id="alerts-list"></div>
        </div>
    </div>
    
    <script>
        // 性能监控JavaScript
        let cpuChart, memoryChart, diskChart, networkChart;
        
        function initCharts() {
            // CPU图表
            const cpuCtx = document.getElementById('cpu-chart').getContext('2d');
            cpuChart = new Chart(cpuCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'CPU使用率',
                        data: [],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
            
            // 内存图表
            const memoryCtx = document.getElementById('memory-chart').getContext('2d');
            memoryChart = new Chart(memoryCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '内存使用率',
                        data: [],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
            
            // 磁盘图表
            const diskCtx = document.getElementById('disk-chart').getContext('2d');
            diskChart = new Chart(diskCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '磁盘使用率',
                        data: [],
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
        
        function updatePerformanceData() {
            // 获取当前性能数据
            fetch('/api/performance/current')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const perf = data.data;
                        
                        // 更新显示值
                        document.getElementById('cpu-usage').textContent = perf.cpu_usage.toFixed(1) + '%';
                        document.getElementById('memory-usage').textContent = perf.memory_usage.toFixed(1) + '%';
                        document.getElementById('disk-usage').textContent = perf.disk_usage.toFixed(1) + '%';
                        
                        // 更新图表
                        const now = new Date().toLocaleTimeString();
                        updateChart(cpuChart, now, perf.cpu_usage);
                        updateChart(memoryChart, now, perf.memory_usage);
                        updateChart(diskChart, now, perf.disk_usage);
                    }
                })
                .catch(error => console.error('获取性能数据失败:', error));
            
            // 获取告警信息
            fetch('/api/performance/alerts')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        updateAlerts(data.data.alerts);
                    }
                })
                .catch(error => console.error('获取告警失败:', error));
        }
        
        function updateChart(chart, label, value) {
            chart.data.labels.push(label);
            chart.data.datasets[0].data.push(value);
            
            // 保持最近20个数据点
            if (chart.data.labels.length > 20) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
            
            chart.update();
        }
        
        function updateAlerts(alerts) {
            const alertsList = document.getElementById('alerts-list');
            alertsList.innerHTML = '';
            
            if (alerts.length === 0) {
                alertsList.innerHTML = '<div class="alert alert-success">暂无告警</div>';
                return;
            }
            
            alerts.forEach(alert => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${alert.type}`;
                alertDiv.innerHTML = `
                    <strong>${alert.type.toUpperCase()}:</strong> ${alert.message}
                    <small>${new Date(alert.timestamp).toLocaleString()}</small>
                `;
                alertsList.appendChild(alertDiv);
            });
        }
        
        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
            updatePerformanceData();
            
            // 每5秒更新一次数据
            setInterval(updatePerformanceData, 5000);
        });
    </script>
</body>
</html>'''
    
    # 创建性能监控模板文件
    templates_dir = "admin_backend/templates"
    if not os.path.exists(templates_dir):
        os.makedirs(templates_dir)
    
    performance_template_path = os.path.join(templates_dir, "performance.html")
    with open(performance_template_path, 'w', encoding='utf-8') as f:
        f.write(performance_template)
    
    print("✅ 性能监控页面模板创建完成")
    
    # 3. 创建缺失的日志文件
    logs_dir = "admin_backend/logs"
    if not os.path.exists(logs_dir):
        os.makedirs(logs_dir)
    
    log_files = [
        "app.log",
        "error.log", 
        "access.log"
    ]
    
    for log_file in log_files:
        log_path = os.path.join(logs_dir, log_file)
        if not os.path.exists(log_path):
            with open(log_path, 'w', encoding='utf-8') as f:
                f.write(f"# {log_file} - 创建时间: {datetime.now().isoformat()}\n")
            print(f"✅ 创建日志文件: {log_file}")
    
    print("🎉 性能监控API修复完成！")

if __name__ == "__main__":
    from datetime import datetime
    fix_performance_apis() 