#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台自动内容更新定时器
定时执行内容更新任务，确保平台内容持续更新
Author: 茶叶批发平台开发团队
"""

import schedule
import time
import subprocess
import sys
import os
from datetime import datetime
import logging

class AutoContentScheduler:
    def __init__(self):
        self.setup_logging()
        self.scripts = {
            'daily_update': '每日内容更新机制.py',
            'weekly_quality': '每周内容质量检查.py',
            'monitoring': '用户反馈数据监控.py'
        }
        
    def setup_logging(self):
        """设置日志记录"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('auto_scheduler.log', encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def run_script(self, script_name, description):
        """运行指定脚本"""
        script_path = self.scripts.get(script_name)
        if not script_path or not os.path.exists(script_path):
            self.logger.error(f"脚本不存在：{script_path}")
            return False
            
        try:
            self.logger.info(f"⏰ 定时执行：{description}")
            result = subprocess.run([sys.executable, script_path], 
                                  capture_output=True, text=True, encoding='utf-8')
            
            if result.returncode == 0:
                self.logger.info(f"✅ {description}执行成功")
                return True
            else:
                self.logger.error(f"❌ {description}执行失败：{result.stderr}")
                return False
                
        except Exception as e:
            self.logger.error(f"❌ 执行{description}时出错：{e}")
            return False
    
    def daily_update_task(self):
        """每日内容更新任务"""
        self.logger.info("🌅 开始执行每日内容更新任务")
        success = self.run_script('daily_update', '每日内容更新')
        
        if success:
            self.logger.info("📊 每日内容更新任务完成")
        else:
            self.logger.error("⚠️ 每日内容更新任务失败")
    
    def weekly_quality_task(self):
        """每周质量检查任务"""
        self.logger.info("🔍 开始执行每周质量检查任务")
        success = self.run_script('weekly_quality', '每周内容质量检查')
        
        if success:
            self.logger.info("📋 每周质量检查任务完成")
        else:
            self.logger.error("⚠️ 每周质量检查任务失败")
    
    def monitoring_task(self):
        """监控任务"""
        self.logger.info("📊 开始执行监控任务")
        success = self.run_script('monitoring', '用户反馈数据监控')
        
        if success:
            self.logger.info("📈 监控任务完成")
        else:
            self.logger.error("⚠️ 监控任务失败")
    
    def setup_schedule(self):
        """设置定时任务"""
        # 每天上午9点执行内容更新
        schedule.every().day.at("09:00").do(self.daily_update_task)
        
        # 每天下午6点执行监控任务
        schedule.every().day.at("18:00").do(self.monitoring_task)
        
        # 每周一上午10点执行质量检查
        schedule.every().monday.at("10:00").do(self.weekly_quality_task)
        
        self.logger.info("⏰ 定时任务已设置:")
        self.logger.info("📅 每日 09:00 - 内容更新")
        self.logger.info("📅 每日 18:00 - 数据监控")
        self.logger.info("📅 每周一 10:00 - 质量检查")
    
    def run_scheduler(self):
        """运行定时器"""
        self.setup_schedule()
        
        self.logger.info("🚀 内容自动更新定时器启动")
        self.logger.info("🔄 等待定时任务执行...")
        
        # 立即执行一次内容更新
        self.logger.info("🎯 启动时立即执行一次内容更新")
        self.daily_update_task()
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # 每分钟检查一次
        except KeyboardInterrupt:
            self.logger.info("⏹️ 定时器已停止")
    
    def run_once(self):
        """手动执行一次完整更新"""
        self.logger.info("🎯 手动执行完整内容更新")
        
        tasks = [
            ('daily_update', '每日内容更新'),
            ('monitoring', '用户反馈数据监控'),
            ('weekly_quality', '每周内容质量检查')
        ]
        
        success_count = 0
        for script_name, description in tasks:
            if self.run_script(script_name, description):
                success_count += 1
            time.sleep(2)  # 任务间隔
        
        self.logger.info(f"📊 手动更新完成：{success_count}/{len(tasks)} 个任务成功")
        return success_count == len(tasks)

def main():
    import argparse
    parser = argparse.ArgumentParser(description='茶叶平台自动内容更新定时器')
    parser.add_argument('--daemon', action='store_true', help='后台运行定时器')
    parser.add_argument('--once', action='store_true', help='手动执行一次完整更新')
    parser.add_argument('--status', action='store_true', help='显示定时器状态')
    
    args = parser.parse_args()
    
    scheduler = AutoContentScheduler()
    
    if args.once:
        # 手动执行一次
        success = scheduler.run_once()
        print("✅ 手动更新完成" if success else "❌ 手动更新失败")
    elif args.status:
        # 显示状态
        print("📊 自动内容更新定时器状态:")
        print(f"📅 每日 09:00 - 内容更新")
        print(f"📅 每日 18:00 - 数据监控") 
        print(f"📅 每周一 10:00 - 质量检查")
        
        # 检查脚本文件是否存在
        for name, script in scheduler.scripts.items():
            status = "✅ 就绪" if os.path.exists(script) else "❌ 缺失"
            print(f"📄 {script}: {status}")
    else:
        # 启动定时器
        if args.daemon:
            print("🚀 以后台模式启动定时器...")
        scheduler.run_scheduler()

if __name__ == "__main__":
    main() 