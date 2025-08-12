#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动内存优化脚本
当内存使用率过高时自动优化
"""

import psutil
import time
import os
import gc
from datetime import datetime

def auto_optimize():
    """自动内存优化"""
    print("🤖 自动内存优化已启动...")
    print("当内存使用率超过80%时自动优化")
    
    try:
        while True:
            memory = psutil.virtual_memory()
            
            if memory.percent > 80:
                print(f"\n🚨 内存使用率过高: {memory.percent:.1f}%")
                print("开始自动优化...")
                
                # 执行优化
                gc.collect()
                print("✅ 垃圾回收完成")
                
                # 等待优化生效
                time.sleep(5)
                
                memory_after = psutil.virtual_memory()
                print(f"优化后内存使用率: {memory_after.percent:.1f}%")
                
                if memory_after.percent < memory.percent:
                    print("✅ 优化成功！")
                else:
                    print("⚠️  优化效果不明显")
            
            # 每30秒检查一次
            time.sleep(30)
            
    except KeyboardInterrupt:
        print("\n🛑 自动优化已停止")

if __name__ == "__main__":
    auto_optimize()
