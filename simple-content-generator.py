#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简化版内容自动生成器
直接生成可靠的内容更新
"""

import json
import random
from datetime import datetime
import time

class SimpleContentGenerator:
    def __init__(self):
        self.tea_varieties = [
            {"name": "夏季清香绿茶", "category": "绿茶", "price": "128-188元/斤"},
            {"name": "消暑福鼎白茶", "category": "白茶", "price": "380-580元/斤"},
            {"name": "降火安化黑茶", "category": "黑茶", "price": "168-268元/斤"},
            {"name": "清热普洱生茶", "category": "普洱茶", "price": "220-320元/斤"},
            {"name": "消暑铁观音", "category": "乌龙茶", "price": "288-388元/斤"}
        ]
        
        self.hot_topics = [
            "茶叶直播带货兴起，传统产业焕发新活力",
            "夏季饮茶养生成为时尚，白茶销量大增",
            "有机茶园认证标准提升，品质茶叶更受欢迎",
            "茶文化旅游持续升温，茶园游成热门",
            "新式茶饮市场持续增长，年轻消费群体成主力"
        ]
    
    def generate_recommend_content(self):
        """生成推荐内容"""
        tea = random.choice(self.tea_varieties)
        return {
            "title": tea["name"],
            "summary": f"时值夏季，{tea['name']}，采用优质茶青制作，口感清香甘甜。具有清热降火、生津解渴等功效，是夏季理想饮品。",
            "content": f"【今日推荐】{tea['name']}\\n\\n产地：优质茶区\\n类别：{tea['category']}\\n价格：{tea['price']}\\n\\n这款茶叶采用传统工艺制作，品质上乘。适合夏季饮用，有清热解毒的功效。",
            "category": tea["category"],
            "price": tea["price"],
            "image": "/images/tea/default.jpg",
            "created_at": datetime.now().strftime("%Y-%m-%d")
        }
    
    def generate_hot_content(self):
        """生成热点内容"""
        topic = random.choice(self.hot_topics)
        return {
            "title": topic,
            "summary": f"关于{topic}的最新资讯和市场动态，值得关注。",
            "content": f"🔥 行业热点：{topic}\\n\\n这是当前茶叶行业的重要发展趋势，对整个产业具有重要影响。",
            "trend": "增长",
            "created_at": datetime.now().strftime("%Y-%m-%d")
        }
    
    def update_server_content(self):
        """直接更新server.py的内容数据"""
        # 生成新内容
        new_recommend = self.generate_recommend_content()
        new_hot = self.generate_hot_content()
        
        # 创建更新数据
        updates = [
            {
                "date": datetime.now().isoformat(),
                "type": "recommend",
                "content": new_recommend,
                "action": "add"
            },
            {
                "date": datetime.now().isoformat(),
                "type": "hot", 
                "content": new_hot,
                "action": "add"
            }
        ]
        
        # 保存到简单的JSON文件
        filename = f"simple_update_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(updates, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已生成内容更新文件：{filename}")
        print(f"📝 推荐内容：{new_recommend['title']}")
        print(f"🔥 热点内容：{new_hot['title']}")
        
        return filename

if __name__ == "__main__":
    generator = SimpleContentGenerator()
    
    # 立即生成一次内容
    print("🚀 启动简化内容生成器...")
    generator.update_server_content()
    
    print("\n✅ 内容更新完成！")
    print("💡 提示：您可以重启服务器来加载新内容") 