#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日茶叶内容自动更新器
丰富的内容来源 + 定时更新功能
"""

import json
import random
import schedule
import time
from datetime import datetime, timedelta
import requests
import os

class DailyContentUpdater:
    def __init__(self):
        # 🍃 茶叶品种数据库
        self.tea_varieties = {
            "绿茶": [
                {"name": "西湖龙井", "origin": "浙江杭州", "price": "280-680元/斤", "features": "香气清雅，滋味鲜醇"},
                {"name": "碧螺春", "origin": "江苏苏州", "price": "200-500元/斤", "features": "卷曲成螺，香气浓郁"},
                {"name": "黄山毛峰", "origin": "安徽黄山", "price": "180-450元/斤", "features": "形似雀舌，清香甘甜"},
                {"name": "信阳毛尖", "origin": "河南信阳", "price": "150-380元/斤", "features": "条索细圆，汤色清绿"},
                {"name": "六安瓜片", "origin": "安徽六安", "price": "220-580元/斤", "features": "叶片完整，香气持久"}
            ],
            "红茶": [
                {"name": "正山小种", "origin": "福建武夷山", "price": "300-800元/斤", "features": "松烟香浓，滋味醇厚"},
                {"name": "祁门红茶", "origin": "安徽祁门", "price": "250-600元/斤", "features": "蜜糖香甜，汤色红亮"},
                {"name": "金骏眉", "origin": "福建武夷山", "price": "800-2000元/斤", "features": "金黄毫尖，果香浓郁"},
                {"name": "滇红工夫", "origin": "云南凤庆", "price": "180-450元/斤", "features": "条索肥硕，香高味浓"}
            ],
            "乌龙茶": [
                {"name": "铁观音", "origin": "福建安溪", "price": "200-600元/斤", "features": "兰花香韵，回甘悠长"},
                {"name": "大红袍", "origin": "福建武夷山", "price": "500-1500元/斤", "features": "岩韵明显，层次丰富"},
                {"name": "单丛茶", "origin": "广东潮州", "price": "300-800元/斤", "features": "花香果味，山韵独特"},
                {"name": "冻顶乌龙", "origin": "台湾南投", "price": "400-1000元/斤", "features": "焙火香浓，甘醇回甜"}
            ],
            "白茶": [
                {"name": "白毫银针", "origin": "福建福鼎", "price": "600-1800元/斤", "features": "银毫满披，清香甘甜"},
                {"name": "白牡丹", "origin": "福建福鼎", "price": "300-800元/斤", "features": "叶态自然，毫香清鲜"},
                {"name": "寿眉", "origin": "福建福鼎", "price": "150-400元/斤", "features": "叶片粗老，甘醇耐泡"}
            ],
            "黑茶": [
                {"name": "安化黑茶", "origin": "湖南安化", "price": "200-500元/斤", "features": "陈香浓郁，汤色红褐"},
                {"name": "普洱熟茶", "origin": "云南普洱", "price": "180-600元/斤", "features": "陈香醇厚，温润如玉"},
                {"name": "六堡茶", "origin": "广西梧州", "price": "150-450元/斤", "features": "槟榔香韵，甘滑醇和"}
            ]
        }
        
        # 📰 热点话题数据库
        self.hot_topics = [
            {"title": "2025年春茶产销形势向好", "category": "市场动态", "heat": 95},
            {"title": "茶叶直播带货持续火爆", "category": "电商发展", "heat": 88},
            {"title": "有机茶认证标准再升级", "category": "政策法规", "heat": 82},
            {"title": "新式茶饮市场增长强劲", "category": "行业趋势", "heat": 90},
            {"title": "茶文化旅游成新热点", "category": "文化传播", "heat": 76},
            {"title": "智能制茶技术获突破", "category": "科技创新", "heat": 84},
            {"title": "茶叶出口贸易稳步增长", "category": "国际贸易", "heat": 78},
            {"title": "古树茶保护工作加强", "category": "生态保护", "heat": 80},
            {"title": "茶叶品牌化发展提速", "category": "品牌建设", "heat": 85},
            {"title": "年轻消费群体成茶叶市场主力", "category": "消费趋势", "heat": 92}
        ]
        
        # 🎨 茶艺文化内容
        self.tea_culture = [
            {"title": "夏季饮茶养生指南", "type": "养生知识"},
            {"title": "茶具选择与保养技巧", "type": "茶具知识"},
            {"title": "不同茶类的冲泡方法", "type": "冲泡技艺"},
            {"title": "茶叶储存的科学方法", "type": "储存技巧"},
            {"title": "茶道礼仪与文化内涵", "type": "茶道文化"},
            {"title": "品茶技巧与感官体验", "type": "品鉴技巧"}
        ]
        
        # 📅 季节性内容调整
        self.seasonal_content = self.get_seasonal_content()
    
    def get_seasonal_content(self):
        """根据当前季节调整内容"""
        month = datetime.now().month
        
        if month in [6, 7, 8]:  # 夏季
            return {
                "theme": "夏季清热",
                "recommend_teas": ["绿茶", "白茶"],
                "keywords": ["清热", "消暑", "降火", "生津", "解腻"],
                "health_tips": "夏季宜饮绿茶白茶，清热解暑，生津止渴"
            }
        elif month in [9, 10, 11]:  # 秋季
            return {
                "theme": "秋季养胃",
                "recommend_teas": ["乌龙茶", "红茶"],
                "keywords": ["温润", "养胃", "暖身", "醇厚", "回甘"],
                "health_tips": "秋季宜饮乌龙红茶，温润养胃，暖身健脾"
            }
        elif month in [12, 1, 2]:  # 冬季
            return {
                "theme": "冬季暖身",
                "recommend_teas": ["红茶", "黑茶"],
                "keywords": ["暖胃", "驱寒", "温补", "醇香", "陈香"],
                "health_tips": "冬季宜饮红茶黑茶，暖胃驱寒，温补养身"
            }
        else:  # 春季
            return {
                "theme": "春季养肝",
                "recommend_teas": ["绿茶", "白茶"],
                "keywords": ["清香", "鲜嫩", "养肝", "明目", "提神"],
                "health_tips": "春季宜饮绿茶新茶，清香鲜嫩，养肝明目"
            }
    
    def generate_daily_recommend(self):
        """生成每日推荐内容"""
        # 根据季节选择茶类
        season_teas = self.seasonal_content["recommend_teas"]
        tea_category = random.choice(season_teas)
        tea_info = random.choice(self.tea_varieties[tea_category])
        
        keywords = self.seasonal_content["keywords"]
        keyword = random.choice(keywords)
        
        return {
            "title": f"{keyword}{tea_info['name']}精品推荐",
            "summary": f"来自{tea_info['origin']}的优质{tea_info['name']}，{tea_info['features']}。{self.seasonal_content['health_tips']}。",
            "content": f"【每日推荐】{tea_info['name']}\\n\\n🏔️ 产地：{tea_info['origin']}\\n🍃 类别：{tea_category}\\n💰 价格：{tea_info['price']}\\n✨ 特色：{tea_info['features']}\\n\\n{self.seasonal_content['health_tips']}，这款{tea_info['name']}是您的理想选择。",
            "category": tea_category,
            "region": tea_info['origin'],
            "price": tea_info['price'],
            "seasonal_theme": self.seasonal_content["theme"]
        }
    
    def generate_daily_hot(self):
        """生成每日热点内容"""
        hot_topic = random.choice(self.hot_topics)
        
        return {
            "title": hot_topic["title"],
            "summary": f"关于{hot_topic['title']}的最新行业动态，热度指数{hot_topic['heat']}。",
            "content": f"🔥 行业热点：{hot_topic['title']}\\n\\n📊 热度指数：{hot_topic['heat']}/100\\n🏷️ 分类：{hot_topic['category']}\\n\\n这是当前茶叶行业的重要发展动态，值得业内人士关注。",
            "category": hot_topic["category"],
            "heat": hot_topic["heat"],
            "trend": "上升" if hot_topic["heat"] > 85 else "稳定"
        }
    
    def generate_daily_culture(self):
        """生成每日茶文化内容"""
        culture_item = random.choice(self.tea_culture)
        
        return {
            "title": culture_item["title"],
            "summary": f"茶文化知识分享：{culture_item['title']}，提升您的茶道修养。",
            "content": f"🎨 茶文化：{culture_item['title']}\\n\\n📚 类型：{culture_item['type']}\\n\\n中华茶文化博大精深，{culture_item['title']}是茶道修养的重要组成部分。通过学习和实践，可以提升我们的品茶境界。",
            "type": culture_item["type"],
            "cultural_value": "传统文化传承"
        }
    
    def generate_daily_news(self):
        """生成每日新闻内容"""
        news_topics = [
            "茶叶市场价格稳中有升",
            "新茶园建设项目启动", 
            "茶叶品质检测标准完善",
            "茶农专业培训活动举办",
            "茶叶包装环保化进程加快",
            "茶叶保险业务范围扩大"
        ]
        
        regions = ["福建", "浙江", "云南", "安徽", "河南", "湖南", "江苏", "广东"]
        
        topic = random.choice(news_topics)
        region = random.choice(regions)
        
        return {
            "title": f"{region}省{topic}",
            "summary": f"{region}省茶叶行业最新动态：{topic}，为产业发展注入新动力。",
            "content": f"📰 茶叶资讯：{region}省{topic}\\n\\n📍 地区：{region}省\\n📅 时间：{datetime.now().strftime('%Y年%m月%d日')}\\n\\n据了解，{region}省茶叶行业持续健康发展，{topic}为当地茶产业带来积极影响。",
            "region": region,
            "news_type": "行业动态"
        }
    
    def create_daily_update_file(self):
        """创建每日更新文件"""
        today = datetime.now().strftime("%Y%m%d")
        filename = f"daily_update_{today}.json"
        
        # 生成各类内容
        updates = [
            {
                "date": datetime.now().isoformat(),
                "type": "recommend",
                "content": self.generate_daily_recommend(),
                "action": "add"
            },
            {
                "date": datetime.now().isoformat(),
                "type": "hot",
                "content": self.generate_daily_hot(),
                "action": "add"
            },
            {
                "date": datetime.now().isoformat(),
                "type": "art",
                "content": self.generate_daily_culture(),
                "action": "add"
            },
            {
                "date": datetime.now().isoformat(),
                "type": "news",
                "content": self.generate_daily_news(),
                "action": "add"
            }
        ]
        
        # 保存更新文件
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(updates, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已生成每日更新文件：{filename}")
        print(f"📊 包含内容：推荐({updates[0]['content']['title']})、热点({updates[1]['content']['title']})、文化({updates[2]['content']['title']})、资讯({updates[3]['content']['title']})")
        
        return filename
    
    def schedule_daily_updates(self):
        """设置每日定时更新"""
        # 每天早上8点生成新内容
        schedule.every().day.at("08:00").do(self.create_daily_update_file)
        
        print("⏰ 已设置每日定时更新：每天8:00自动生成新内容")
        print("🔄 定时器启动中...")
        
        while True:
            schedule.run_pending()
            time.sleep(60)  # 每分钟检查一次
    
    def manual_update_now(self):
        """立即手动更新"""
        print("🚀 开始手动生成每日内容...")
        return self.create_daily_update_file()

if __name__ == "__main__":
    updater = DailyContentUpdater()
    
    print("🌟 茶叶每日内容更新器")
    print("=" * 40)
    print("1. 立即生成今日内容")
    print("2. 启动每日定时更新")
    print("=" * 40)
    
    choice = input("请选择操作 (1/2): ").strip()
    
    if choice == "1":
        updater.manual_update_now()
        print("\n✅ 手动更新完成！")
    elif choice == "2":
        updater.schedule_daily_updates()
    else:
        print("❌ 无效选择，退出程序") 