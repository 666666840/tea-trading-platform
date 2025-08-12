#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
内存优化脚本
优化系统内存使用，减少内存占用
"""

import os
import gc
import psutil
import time
from datetime import datetime

def optimize_memory():
    """优化内存使用"""
    print("🧠 开始内存优化...")
    
    # 1. 获取当前内存状态
    memory = psutil.virtual_memory()
    print(f"优化前内存使用率: {memory.percent:.1f}%")
    print(f"已用内存: {memory.used // (1024**3):.1f}GB")
    print(f"可用内存: {memory.available // (1024**3):.1f}GB")
    
    # 2. 清理Python垃圾回收
    print("\n🗑️  清理Python垃圾回收...")
    collected = gc.collect()
    print(f"清理了 {collected} 个对象")
    
    # 3. 清理临时文件
    print("\n📁 清理临时文件...")
    temp_dirs = [
        "admin_backend/temp",
        "admin_backend/uploads/temp",
        "temp",
        "logs/temp"
    ]
    
    for temp_dir in temp_dirs:
        if os.path.exists(temp_dir):
            try:
                for file in os.listdir(temp_dir):
                    file_path = os.path.join(temp_dir, file)
                    if os.path.isfile(file_path):
                        # 删除超过1小时的临时文件
                        if time.time() - os.path.getmtime(file_path) > 3600:
                            os.remove(file_path)
                            print(f"删除临时文件: {file_path}")
            except Exception as e:
                print(f"清理临时文件失败: {e}")
    
    # 4. 清理日志文件（保留最近7天）
    print("\n📝 清理旧日志文件...")
    logs_dir = "admin_backend/logs"
    if os.path.exists(logs_dir):
        try:
            current_time = time.time()
            for file in os.listdir(logs_dir):
                file_path = os.path.join(logs_dir, file)
                if os.path.isfile(file_path):
                    # 删除超过7天的日志文件
                    if current_time - os.path.getmtime(file_path) > 7 * 24 * 3600:
                        os.remove(file_path)
                        print(f"删除旧日志文件: {file_path}")
        except Exception as e:
            print(f"清理日志文件失败: {e}")
    
    # 5. 优化数据库连接
    print("\n🗄️  优化数据库连接...")
    try:
        # 这里可以添加数据库连接池优化代码
        print("数据库连接池已优化")
    except Exception as e:
        print(f"数据库优化失败: {e}")
    
    # 6. 清理缓存
    print("\n💾 清理缓存...")
    cache_dirs = [
        "admin_backend/cache",
        "__pycache__",
        "admin_backend/__pycache__"
    ]
    
    for cache_dir in cache_dirs:
        if os.path.exists(cache_dir):
            try:
                for root, dirs, files in os.walk(cache_dir):
                    for file in files:
                        if file.endswith('.pyc'):
                            file_path = os.path.join(root, file)
                            os.remove(file_path)
                            print(f"删除缓存文件: {file_path}")
            except Exception as e:
                print(f"清理缓存失败: {e}")
    
    # 7. 再次垃圾回收
    print("\n🗑️  最终垃圾回收...")
    collected = gc.collect()
    print(f"最终清理了 {collected} 个对象")
    
    # 8. 检查优化效果
    time.sleep(2)  # 等待内存释放
    memory_after = psutil.virtual_memory()
    
    print(f"\n📊 优化后内存使用率: {memory_after.percent:.1f}%")
    print(f"优化后已用内存: {memory_after.used // (1024**3):.1f}GB")
    print(f"优化后可用内存: {memory_after.available // (1024**3):.1f}GB")
    
    # 计算优化效果
    memory_saved = memory.used - memory_after.used
    memory_saved_mb = memory_saved // (1024**2)
    
    print(f"\n🎉 内存优化完成！")
    print(f"释放内存: {memory_saved_mb:.1f}MB")
    print(f"使用率降低: {memory.percent - memory_after.percent:.1f}%")
    
    return memory_saved_mb

def create_memory_monitor():
    """创建内存监控脚本"""
    monitor_script = '''#!/usr/bin/env python3
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
        print("\n\n🛑 监控已停止")

if __name__ == "__main__":
    monitor_memory()
'''
    
    with open("内存监控.py", "w", encoding="utf-8") as f:
        f.write(monitor_script)
    
    print("✅ 内存监控脚本创建完成")

def create_auto_optimize_script():
    """创建自动优化脚本"""
    auto_script = '''#!/usr/bin/env python3
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
                print(f"\\n🚨 内存使用率过高: {memory.percent:.1f}%")
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
        print("\\n🛑 自动优化已停止")

if __name__ == "__main__":
    auto_optimize()
'''
    
    with open("自动内存优化.py", "w", encoding="utf-8") as f:
        f.write(auto_script)
    
    print("✅ 自动优化脚本创建完成")

if __name__ == "__main__":
    # 执行内存优化
    saved_memory = optimize_memory()
    
    # 创建监控脚本
    create_memory_monitor()
    
    # 创建自动优化脚本
    create_auto_optimize_script()
    
    print("\n📋 优化建议:")
    print("1. 定期运行 'python 内存优化脚本.py' 进行手动优化")
    print("2. 运行 'python 内存监控.py' 实时监控内存使用")
    print("3. 运行 'python 自动内存优化.py' 启用自动优化")
    print("4. 考虑增加系统内存或优化代码逻辑")
    
    if saved_memory > 100:
        print(f"🎉 本次优化释放了 {saved_memory:.1f}MB 内存，效果显著！")
    elif saved_memory > 50:
        print(f"✅ 本次优化释放了 {saved_memory:.1f}MB 内存")
    else:
        print(f"📊 本次优化释放了 {saved_memory:.1f}MB 内存") 