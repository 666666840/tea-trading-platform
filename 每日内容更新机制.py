#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台每日内容自动更新机制
Author: 茶叶批发平台开发团队
"""

import json
import random
import requests
from datetime import datetime, timedelta
import os
import re

class DailyContentUpdater:
    def __init__(self):
        self.api_base = "http://localhost:3000"
        self.content_pool = {
            'recommend': [],
            'news': [],
            'art': [],
            'hot': []
        }
        
    def get_daily_content_plan(self):
        """制定每日内容更新计划"""
        today = datetime.now()
        weekday = today.weekday()  # 0=Monday, 6=Sunday
        
        # 根据星期几制定不同的内容策略
        daily_plans = {
            0: {'recommend': 1, 'news': 1, 'art': 0, 'hot': 0},  # 周一：推荐+资讯
            1: {'recommend': 0, 'news': 0, 'art': 1, 'hot': 1},  # 周二：茶艺+热点
            2: {'recommend': 1, 'news': 0, 'art': 0, 'hot': 1},  # 周三：推荐+热点
            3: {'recommend': 0, 'news': 1, 'art': 1, 'hot': 0},  # 周四：资讯+茶艺
            4: {'recommend': 1, 'news': 1, 'art': 0, 'hot': 0},  # 周五：推荐+资讯
            5: {'recommend': 0, 'news': 0, 'art': 1, 'hot': 1},  # 周六：茶艺+热点
            6: {'recommend': 1, 'news': 0, 'art': 1, 'hot': 1},  # 周日：全面更新
        }
        
        return daily_plans.get(weekday, {'recommend': 1, 'news': 0, 'art': 0, 'hot': 1})
    
    def generate_seasonal_content(self, content_type):
        """生成季节性内容"""
        current_month = datetime.now().month
        season_keywords = {
            (3, 4, 5): ['春茶', '新茶', '嫩芽', '清香'],     # 春季
            (6, 7, 8): ['夏茶', '清热', '降火', '消暑'],     # 夏季
            (9, 10, 11): ['秋茶', '回甘', '浓香', '收获'],   # 秋季
            (12, 1, 2): ['冬茶', '温润', '陈茶', '养生']     # 冬季
        }
        
        season = None
        for months, keywords in season_keywords.items():
            if current_month in months:
                season = keywords
                break
                
        if season and content_type in self.content_pool:
            # 在现有内容基础上添加季节元素
            base_content = random.choice(self.content_pool[content_type])
            seasonal_content = base_content.copy()
            
            if content_type == 'recommend':
                seasonal_content['title'] = f"{random.choice(season)}{seasonal_content['title']}"
                seasonal_content['summary'] = f"时值{self.get_season_name()}，{seasonal_content['summary']}"
            
            return seasonal_content
        
        return random.choice(self.content_pool.get(content_type, []))
    
    def get_season_name(self):
        """获取当前季节名称"""
        month = datetime.now().month
        if month in [3, 4, 5]:
            return "春季"
        elif month in [6, 7, 8]:
            return "夏季"
        elif month in [9, 10, 11]:
            return "秋季"
        else:
            return "冬季"
    
    def update_content_to_server(self, content_type, new_content):
        """更新内容到服务器"""
        try:
            # 这里需要根据实际server.py的接口来实现
            # 暂时保存到本地文件，供server.py读取
            update_file = f"daily_update_{datetime.now().strftime('%Y%m%d')}.json"
            
            update_data = {
                'date': datetime.now().isoformat(),
                'type': content_type,
                'content': new_content,
                'action': 'add'
            }
            
            # 读取现有更新记录
            updates = []
            if os.path.exists(update_file):
                with open(update_file, 'r', encoding='utf-8') as f:
                    updates = json.load(f)
            
            updates.append(update_data)
            
            # 保存更新记录
            with open(update_file, 'w', encoding='utf-8') as f:
                json.dump(updates, f, ensure_ascii=False, indent=2)
                
            print(f"✅ {content_type}类型内容已添加到更新队列")
            return True
            
        except Exception as e:
            print(f"❌ 更新{content_type}内容失败：{e}")
            return False
    
    def run_daily_update(self):
        """执行每日内容更新"""
        print("🌅 开始每日内容更新...")
        print(f"📅 日期：{datetime.now().strftime('%Y年%m月%d日')}")
        
        # 获取今日更新计划
        daily_plan = self.get_daily_content_plan()
        print(f"📋 今日更新计划：{daily_plan}")
        
        success_count = 0
        total_count = sum(daily_plan.values())
        
        # 执行内容更新
        for content_type, count in daily_plan.items():
            if count > 0:
                print(f"\n🔄 更新{content_type}类型内容...")
                
                for i in range(count):
                    # 生成季节性内容
                    new_content = self.generate_seasonal_content(content_type)
                    
                    # 添加时间戳
                    new_content['updateTime'] = datetime.now().isoformat()
                    new_content['id'] = f"{content_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{i}"
                    
                    # 更新到服务器
                    if self.update_content_to_server(content_type, new_content):
                        success_count += 1
                        print(f"  📝 添加内容：{new_content.get('title', '新内容')}")
        
        # 生成更新报告
        self.generate_update_report(success_count, total_count, daily_plan)
        
        return success_count == total_count
    
    def generate_update_report(self, success_count, total_count, daily_plan):
        """生成更新报告"""
        report_date = datetime.now().strftime("%Y年%m月%d日")
        
        report_content = f"""
# 📅 每日内容更新报告
## 更新日期：{report_date}

## 📊 更新概况
- **计划更新**: {total_count} 条内容
- **成功更新**: {success_count} 条内容
- **更新成功率**: {(success_count/total_count*100):.1f}%

## 📋 更新详情
"""
        
        type_names = {
            'recommend': '推荐内容',
            'news': '资讯内容',
            'art': '茶艺内容',
            'hot': '热点内容'
        }
        
        for content_type, count in daily_plan.items():
            if count > 0:
                report_content += f"- **{type_names.get(content_type, content_type)}**: {count} 条\n"
        
        # 添加明日预告
        tomorrow = datetime.now() + timedelta(days=1)
        tomorrow_plan = self.get_daily_content_plan()
        
        report_content += f"\n## 📅 明日更新预告\n"
        report_content += f"**日期**: {tomorrow.strftime('%Y年%m月%d日')}\n"
        
        for content_type, count in tomorrow_plan.items():
            if count > 0:
                report_content += f"- **{type_names.get(content_type, content_type)}**: {count} 条\n"
        
        # 保存报告
        report_filename = f"daily_update_report_{datetime.now().strftime('%Y%m%d')}.md"
        with open(report_filename, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        print(f"\n📊 更新报告已生成：{report_filename}")
        print(f"✅ 成功更新 {success_count}/{total_count} 条内容")

def main():
    print("🔄 茶叶平台每日内容自动更新机制")
    print("=" * 50)
    
    updater = DailyContentUpdater()
    success = updater.run_daily_update()
    
    if success:
        print("\n🎉 每日内容更新完成！")
        print("💡 建议设置定时任务，每天自动运行此脚本")
        print("⏰ 推荐运行时间：每天早上8:00")
    else:
        print("\n⚠️ 部分内容更新失败，请检查日志")

if __name__ == "__main__":
    main() 