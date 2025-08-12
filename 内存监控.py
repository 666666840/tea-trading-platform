#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
内存监控脚本
实时监控系统内存使用情况
"""

import psutil
import time
import os
from datetime import datetime

def monitor_memory():
    """监控内存使用"""
    print("🔍 开始内存监控...")
    print("按 Ctrl+C 停止监控")
    
    try:
        while True:
            memory = psutil.virtual_memory()
            cpu = psutil.cpu_percent(interval=1)
            
            # 清屏
            os.system('cls' if os.name == 'nt' else 'clear')
            
            print("=" * 50)
            print("🧠 系统资源监控")
            print("=" * 50)
            print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print()
            
            # CPU使用率
            print(f"CPU使用率: {cpu:.1f}%")
            if cpu > 90:
                print("⚠️  CPU使用率过高！")
            elif cpu > 70:
                print("⚠️  CPU使用率较高")
            else:
                print("✅ CPU使用率正常")
            
            print()
            
            # 内存使用率
            print(f"内存使用率: {memory.percent:.1f}%")
            print(f"已用内存: {memory.used // (1024**3):.1f}GB / {memory.total // (1024**3):.1f}GB")
            print(f"可用内存: {memory.available // (1024**3):.1f}GB")
            
            if memory.percent > 90:
                print("🚨 内存使用率过高！建议立即优化")
            elif memory.percent > 80:
                print("⚠️  内存使用率较高，建议优化")
            else:
                print("✅ 内存使用率正常")
            
            print()
            
            # 磁盘使用率
            disk = psutil.disk_usage('/')
            print(f"磁盘使用率: {disk.percent:.1f}%")
            print(f"已用空间: {disk.used // (1024**3):.1f}GB / {disk.total // (1024**3):.1f}GB")
            
            if disk.percent > 90:
                print("🚨 磁盘空间不足！")
            elif disk.percent > 80:
                print("⚠️  磁盘空间紧张")
            else:
                print("✅ 磁盘空间充足")
            
            print()
            print("=" * 50)
            print("监控中... 每5秒更新一次")
            
            time.sleep(5)
            
    except KeyboardInterrupt:
        print("

🛑 监控已停止")

if __name__ == "__main__":
    monitor_memory()
