#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台内容更新工具
功能：批量生成新内容并更新到server.py
版权：完全原创，基于公开茶叶知识
"""

import json
import re
import random
from datetime import datetime

class SimpleContentGenerator:
    def __init__(self):
        # 茶叶基础数据（基于公开知识）
        self.tea_types = {
            '绿茶': ['龙井', '碧螺春', '毛峰', '绿牡丹', '雀舌', '竹叶青'],
            '红茶': ['正山小种', '金骏眉', '祁门红茶', '滇红', '英德红茶'],
            '乌龙茶': ['铁观音', '大红袍', '水仙', '肉桂', '单丛茶'],
            '白茶': ['白毫银针', '白牡丹', '寿眉', '贡眉'],
            '黄茶': ['君山银针', '蒙顶黄芽', '霍山黄芽'],
            '黑茶': ['普洱熟茶', '六堡茶', '安化黑茶', '藏茶']
        }
        
        self.regions = ['福建', '浙江', '江苏', '安徽', '湖南', '湖北', '云南', '四川', '广东', '江西']
        self.features = ['香气清雅', '滋味甘醇', '汤色明亮', '叶底匀整', '回甘持久', '口感醇厚']
        self.seasons = ['春茶', '夏茶', '秋茶', '冬茶']
        self.prices = ['经济实惠', '中等价位', '高端精品', '限量珍藏']
    
    def generate_recommendation(self):
        """生成推荐内容"""
        tea_category = random.choice(list(self.tea_types.keys()))
        tea_name = random.choice(self.tea_types[tea_category])
        region = random.choice(self.regions)
        feature = random.choice(self.features)
        season = random.choice(self.seasons)
        price_level = random.choice(self.prices)
        
        content = f"""【今日推荐】{tea_name}

产地：{region}地区优质茶园
类别：{tea_category}
特色：{feature}，适合品鉴
季节：{season}新品上市
价位：{price_level}
        
这款{tea_name}采用传统工艺制作，茶叶条索紧结，色泽自然。
冲泡后{feature}，是茶友们的理想选择。
无论是日常品饮还是待客使用，都是不错的选择。

💡 冲泡建议：85-90°C水温，3-5分钟浸泡
🏷️ 储存方式：密封、干燥、避光保存""".strip()
        
        return {
            'title': f'优质{tea_name}推荐',
            'content': content,
            'type': 'recommend',
            'category': tea_category,
            'region': region
        }
    
    def generate_news(self):
        """生成资讯内容"""
        region = random.choice(self.regions)
        tea_category = random.choice(list(self.tea_types.keys()))
        
        topics = [
            f'{region}地区{tea_category}产量稳步增长',
            f'{tea_category}加工技术持续创新',
            f'{region}茶园生态环境不断改善',
            f'{tea_category}市场需求呈现良好态势'
        ]
        
        topic = random.choice(topics)
        
        content = f"""{topic}

据了解，{region}地区{tea_category}产业发展态势良好，茶农收入稳步提升。
当地茶园采用生态种植模式，注重品质提升和可持续发展。

产业特点：
• 品质稳定：严格的质量控制体系
• 技术先进：现代化加工设备
• 生态友好：绿色种植理念
• 市场认可：消费者好评如潮

展望未来，{tea_category}产业将继续朝着高质量发展方向迈进，
为消费者提供更多优质茶叶产品。""".strip()
        
        return {
            'title': topic,
            'content': content,
            'type': 'news',
            'region': region,
            'category': tea_category
        }
    
    def generate_tea_art(self):
        """生成茶艺内容"""
        tea_category = random.choice(list(self.tea_types.keys()))
        tea_name = random.choice(self.tea_types[tea_category])
        
        content = f"""{tea_name}冲泡技艺分享

{tea_name}是{tea_category}中的经典品种，冲泡时需要掌握以下要点：

🫖 准备工作：
• 茶具清洁：用热水温润茶具
• 水质选择：优质矿泉水或纯净水
• 水温控制：根据茶类调节温度

☕ 冲泡步骤：
1. 投茶量：一般3-5克适中
2. 润茶：快速过水醒茶
3. 正式冲泡：缓慢注水
4. 出汤时间：根据个人口味调整

🎯 品鉴要点：
• 观汤色：清澈明亮为佳
• 闻香气：层次丰富自然
• 品滋味：甘醇回甜
• 看叶底：完整匀净

通过反复练习，您可以冲泡出一壶好茶，
享受茶艺带来的宁静与愉悦。""".strip()
        
        return {
            'title': f'{tea_name}冲泡技艺',
            'content': content,
            'type': 'art',
            'tea_name': tea_name,
            'category': tea_category
        }
    
    def generate_hot_topic(self):
        """生成热点内容"""
        topics = [
            '健康饮茶成为新时尚',
            '茶叶电商平台快速发展',
            '年轻人爱上传统茶文化',
            '茶旅融合成为新亮点',
            '有机茶园建设持续推进'
        ]
        
        topic = random.choice(topics)
        
        content = f"""🔥 行业热点：{topic}

近期，茶叶行业出现新的发展趋势，{topic.lower()}引起广泛关注。

发展现状：
• 消费升级：对品质要求越来越高
• 渠道多元：线上线下融合发展
• 文化传承：传统工艺得到保护
• 创新发展：新产品不断涌现

市场反响：
消费者对优质茶叶的需求持续增长，
茶企积极响应市场变化，推出更多符合现代消费习惯的产品。

未来展望：
随着人们生活水平的提高和健康意识的增强，
茶叶市场将迎来更大的发展空间。""".strip()
        
        return {
            'title': topic,
            'content': content,
            'type': 'hot',
            'trend': '增长'
        }

def generate_fresh_content():
    """生成全新的内容数据"""
    generator = SimpleContentGenerator()
    
    # 生成各类型内容
    content_data = {
        'recommend': [],
        'news': [],
        'art': [],
        'hot': []
    }
    
    print("🚀 开始生成新内容...")
    
    # 生成推荐内容 (8条)
    print("📋 生成推荐内容...")
    for i in range(8):
        content = generator.generate_recommendation()
        content_data['recommend'].append({
            'id': i + 1,
            'title': content['title'],
            'summary': content['content'][:50] + '...',
            'content': content['content'],
            'category': content['category'],
            'region': content['region'],
            'created_at': '2025-07-02'
        })
    
    # 生成资讯内容 (6条)
    print("📰 生成资讯内容...")
    for i in range(6):
        content = generator.generate_news()
        content_data['news'].append({
            'id': i + 1,
            'title': content['title'],
            'summary': content['content'][:50] + '...',
            'content': content['content'],
            'region': content['region'],
            'category': content['category'],
            'created_at': '2025-07-02'
        })
    
    # 生成茶艺内容 (5条)
    print("🫖 生成茶艺内容...")
    for i in range(5):
        content = generator.generate_tea_art()
        content_data['art'].append({
            'id': i + 1,
            'title': content['title'],
            'summary': content['content'][:50] + '...',
            'content': content['content'],
            'tea_name': content['tea_name'],
            'category': content['category'],
            'created_at': '2025-07-02'
        })
    
    # 生成热点内容 (4条)
    print("🔥 生成热点内容...")
    for i in range(4):
        content = generator.generate_hot_topic()
        content_data['hot'].append({
            'id': i + 1,
            'title': content['title'],
            'summary': content['content'][:50] + '...',
            'content': content['content'],
            'trend': content['trend'],
            'created_at': '2025-07-02'
        })
    
    return content_data

def update_server_content():
    """更新server.py中的内容数据"""
    
    # 生成新内容
    new_content = generate_fresh_content()
    
    print("\n📝 读取现有server.py文件...")
    
    # 读取现有的server.py文件
    with open('server.py', 'r', encoding='utf-8') as f:
        server_content = f.read()
    
    # 构建新的内容数据字符串
    content_data_str = "content_data = " + json.dumps(new_content, ensure_ascii=False, indent=4)
    
    # 查找并替换content_data部分
    pattern = r'content_data\s*=\s*\{.*?\n\}'
    
    if re.search(pattern, server_content, re.DOTALL):
        print("🔄 更新现有内容数据...")
        updated_content = re.sub(pattern, content_data_str, server_content, flags=re.DOTALL)
    else:
        print("➕ 添加新的内容数据...")
        # 如果没找到，在Flask app定义之前添加
        flask_pattern = r'(app\s*=\s*Flask\(__name__\))'
        if re.search(flask_pattern, server_content):
            updated_content = re.sub(flask_pattern, content_data_str + "\n\n" + r'\1', server_content)
        else:
            # 如果都没找到，在文件开头添加
            updated_content = content_data_str + "\n\n" + server_content
    
    # 写入更新后的文件
    with open('server.py', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("✅ server.py已成功更新！")
    
    # 显示统计信息
    print(f"\n📊 内容统计：")
    print(f"• 推荐内容：{len(new_content['recommend'])}条")
    print(f"• 资讯内容：{len(new_content['news'])}条")
    print(f"• 茶艺内容：{len(new_content['art'])}条")
    print(f"• 热点内容：{len(new_content['hot'])}条")
    print(f"• 总计：{sum(len(v) for v in new_content.values())}条全新内容")

def preview_content():
    """预览生成的内容"""
    generator = SimpleContentGenerator()
    
    print("=== 内容预览 ===\n")
    
    # 预览推荐内容
    recommend = generator.generate_recommendation()
    print("📋 推荐内容示例：")
    print(f"标题：{recommend['title']}")
    print(f"内容：{recommend['content'][:100]}...\n")
    
    # 预览资讯内容  
    news = generator.generate_news()
    print("📰 资讯内容示例：")
    print(f"标题：{news['title']}")
    print(f"内容：{news['content'][:100]}...\n")
    
    # 预览茶艺内容
    art = generator.generate_tea_art()
    print("🫖 茶艺内容示例：")
    print(f"标题：{art['title']}")
    print(f"内容：{art['content'][:100]}...\n")
    
    # 预览热点内容
    hot = generator.generate_hot_topic()
    print("🔥 热点内容示例：")
    print(f"标题：{hot['title']}")
    print(f"内容：{hot['content'][:100]}...\n")

if __name__ == "__main__":
    print("=== 茶叶平台内容更新工具 ===\n")
    
    try:
        # 预览内容
        preview_content()
        
        # 更新服务器内容
        update_server_content()
        
        print("\n🎉 内容更新完成！")
        print("💡 现在可以重启服务器查看新内容：")
        print('   & "C:\\Program Files\\Python311\\python.exe" server.py')
        
    except Exception as e:
        print(f"❌ 更新过程中出现错误：{str(e)}")
        print("请检查文件权限和路径是否正确") 