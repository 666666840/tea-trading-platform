#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台用户反馈和数据监控工具
Author: 茶叶批发平台开发团队
"""

import json
import sqlite3
import requests
from datetime import datetime, timedelta
import os
import re
import matplotlib.pyplot as plt
import pandas as pd
from collections import defaultdict, Counter

class UserFeedbackMonitor:
    def __init__(self):
        self.api_base = "http://localhost:3000"
        self.db_file = "feedback_monitor.db"
        self.init_database()
        
    def init_database(self):
        """初始化数据库"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        # 创建用户访问记录表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                page_path TEXT,
                user_id TEXT,
                session_id TEXT,
                user_agent TEXT,
                ip_address TEXT
            )
        ''')
        
        # 创建内容互动记录表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS content_interactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                interaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                content_type TEXT,
                content_id TEXT,
                action_type TEXT,  -- view, like, share, comment
                user_id TEXT,
                session_id TEXT
            )
        ''')
        
        # 创建用户反馈表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                feedback_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                feedback_type TEXT,  -- bug, suggestion, complaint, praise
                content TEXT,
                rating INTEGER,
                user_id TEXT,
                page_context TEXT,
                status TEXT DEFAULT 'pending'  -- pending, processing, resolved
            )
        ''')
        
        # 创建API性能监控表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS api_performance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                endpoint TEXT,
                response_time REAL,
                status_code INTEGER,
                error_message TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        
    def simulate_user_data(self):
        """模拟用户数据（用于演示）"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        # 模拟用户访问数据
        import random
        pages = ['/index', '/market', '/newarrival', '/supply', '/inquiry', '/content']
        users = [f'user_{i}' for i in range(1, 21)]
        
        # 生成近7天的模拟数据
        for i in range(200):
            visit_time = datetime.now() - timedelta(
                days=random.randint(0, 6),
                hours=random.randint(0, 23),
                minutes=random.randint(0, 59)
            )
            
            cursor.execute('''
                INSERT INTO user_visits (visit_time, page_path, user_id, session_id, ip_address)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                visit_time.strftime('%Y-%m-%d %H:%M:%S'),
                random.choice(pages),
                random.choice(users),
                f'session_{random.randint(1000, 9999)}',
                f'192.168.1.{random.randint(1, 255)}'
            ))
        
        # 模拟内容互动数据
        content_types = ['recommend', 'news', 'art', 'hot']
        actions = ['view', 'like', 'share']
        
        for i in range(150):
            interaction_time = datetime.now() - timedelta(
                days=random.randint(0, 6),
                hours=random.randint(0, 23)
            )
            
            cursor.execute('''
                INSERT INTO content_interactions (interaction_time, content_type, content_id, action_type, user_id)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                interaction_time.strftime('%Y-%m-%d %H:%M:%S'),
                random.choice(content_types),
                f'content_{random.randint(1, 20)}',
                random.choice(actions),
                random.choice(users)
            ))
        
        # 模拟用户反馈数据
        feedback_types = ['suggestion', 'bug', 'praise', 'complaint']
        feedback_contents = [
            "希望增加更多茶叶品种",
            "页面加载速度有点慢",
            "内容很丰富，很喜欢",
            "搜索功能不够精准",
            "建议增加价格筛选功能",
            "界面设计很美观",
            "希望有茶叶知识普及",
            "推荐功能很实用"
        ]
        
        for i in range(30):
            feedback_time = datetime.now() - timedelta(
                days=random.randint(0, 6),
                hours=random.randint(0, 23)
            )
            
            cursor.execute('''
                INSERT INTO user_feedback (feedback_time, feedback_type, content, rating, user_id)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                feedback_time.strftime('%Y-%m-%d %H:%M:%S'),
                random.choice(feedback_types),
                random.choice(feedback_contents),
                random.randint(1, 5),
                random.choice(users)
            ))
        
        conn.commit()
        conn.close()
        print("✅ 模拟数据生成完成")
    
    def analyze_user_behavior(self):
        """分析用户行为数据"""
        conn = sqlite3.connect(self.db_file)
        
        # 页面访问统计
        page_visits = pd.read_sql_query('''
            SELECT page_path, COUNT(*) as visit_count
            FROM user_visits 
            WHERE visit_time >= datetime('now', '-7 days')
            GROUP BY page_path
            ORDER BY visit_count DESC
        ''', conn)
        
        # 用户活跃度统计
        user_activity = pd.read_sql_query('''
            SELECT DATE(visit_time) as visit_date, COUNT(DISTINCT user_id) as active_users
            FROM user_visits 
            WHERE visit_time >= datetime('now', '-7 days')
            GROUP BY DATE(visit_time)
            ORDER BY visit_date
        ''', conn)
        
        # 内容互动统计
        content_interactions = pd.read_sql_query('''
            SELECT content_type, action_type, COUNT(*) as interaction_count
            FROM content_interactions 
            WHERE interaction_time >= datetime('now', '-7 days')
            GROUP BY content_type, action_type
            ORDER BY interaction_count DESC
        ''', conn)
        
        conn.close()
        
        return {
            'page_visits': page_visits,
            'user_activity': user_activity,
            'content_interactions': content_interactions
        }
    
    def analyze_user_feedback(self):
        """分析用户反馈"""
        conn = sqlite3.connect(self.db_file)
        
        # 反馈类型统计
        feedback_types = pd.read_sql_query('''
            SELECT feedback_type, COUNT(*) as count, AVG(rating) as avg_rating
            FROM user_feedback 
            WHERE feedback_time >= datetime('now', '-7 days')
            GROUP BY feedback_type
            ORDER BY count DESC
        ''', conn)
        
        # 评分分布
        rating_distribution = pd.read_sql_query('''
            SELECT rating, COUNT(*) as count
            FROM user_feedback 
            WHERE feedback_time >= datetime('now', '-7 days') AND rating IS NOT NULL
            GROUP BY rating
            ORDER BY rating
        ''', conn)
        
        # 最新反馈
        recent_feedback = pd.read_sql_query('''
            SELECT feedback_time, feedback_type, content, rating
            FROM user_feedback 
            WHERE feedback_time >= datetime('now', '-7 days')
            ORDER BY feedback_time DESC
            LIMIT 10
        ''', conn)
        
        conn.close()
        
        return {
            'feedback_types': feedback_types,
            'rating_distribution': rating_distribution,
            'recent_feedback': recent_feedback
        }
    
    def monitor_api_performance(self):
        """监控API性能"""
        endpoints = ['/health', '/api/content', '/api/markets', '/api/newarrivals', '/api/supplies']
        performance_data = []
        
        for endpoint in endpoints:
            try:
                start_time = datetime.now()
                response = requests.get(f"{self.api_base}{endpoint}", timeout=10)
                end_time = datetime.now()
                
                response_time = (end_time - start_time).total_seconds() * 1000  # 毫秒
                
                performance_data.append({
                    'endpoint': endpoint,
                    'response_time': response_time,
                    'status_code': response.status_code,
                    'error_message': None if response.status_code == 200 else f"HTTP {response.status_code}"
                })
                
                # 记录到数据库
                conn = sqlite3.connect(self.db_file)
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO api_performance (endpoint, response_time, status_code, error_message)
                    VALUES (?, ?, ?, ?)
                ''', (endpoint, response_time, response.status_code, 
                     None if response.status_code == 200 else f"HTTP {response.status_code}"))
                conn.commit()
                conn.close()
                
            except Exception as e:
                performance_data.append({
                    'endpoint': endpoint,
                    'response_time': None,
                    'status_code': None,
                    'error_message': str(e)
                })
        
        return performance_data
    
    def generate_monitoring_report(self):
        """生成监控报告"""
        print("📊 开始生成用户反馈和数据监控报告...")
        
        # 分析用户行为
        behavior_data = self.analyze_user_behavior()
        
        # 分析用户反馈
        feedback_data = self.analyze_user_feedback()
        
        # 监控API性能
        api_performance = self.monitor_api_performance()
        
        # 生成报告
        report_date = datetime.now().strftime("%Y年%m月%d日")
        report_content = f"""
# 📊 茶叶平台监控报告
## 报告日期：{report_date}

## 📈 用户行为分析

### 页面访问统计（近7天）
"""
        
        # 页面访问统计
        if not behavior_data['page_visits'].empty:
            report_content += "| 页面路径 | 访问次数 |\n|----------|----------|\n"
            for _, row in behavior_data['page_visits'].iterrows():
                page_name = {
                    '/index': '首页',
                    '/market': '全国市场',
                    '/newarrival': '最新到货',
                    '/supply': '供求信息',
                    '/inquiry': '采购询价',
                    '/content': '内容详情'
                }.get(row['page_path'], row['page_path'])
                report_content += f"| {page_name} | {row['visit_count']} |\n"
        
        # 用户活跃度
        if not behavior_data['user_activity'].empty:
            total_users = behavior_data['user_activity']['active_users'].sum()
            avg_daily_users = behavior_data['user_activity']['active_users'].mean()
            report_content += f"\n### 用户活跃度\n"
            report_content += f"- **7天总活跃用户**: {total_users} 人次\n"
            report_content += f"- **日均活跃用户**: {avg_daily_users:.1f} 人\n"
        
        # 内容互动统计
        if not behavior_data['content_interactions'].empty:
            report_content += "\n### 内容互动统计\n"
            report_content += "| 内容类型 | 操作类型 | 互动次数 |\n|----------|----------|----------|\n"
            for _, row in behavior_data['content_interactions'].iterrows():
                content_name = {
                    'recommend': '推荐内容',
                    'news': '资讯内容',
                    'art': '茶艺内容',
                    'hot': '热点内容'
                }.get(row['content_type'], row['content_type'])
                action_name = {
                    'view': '浏览',
                    'like': '点赞',
                    'share': '分享'
                }.get(row['action_type'], row['action_type'])
                report_content += f"| {content_name} | {action_name} | {row['interaction_count']} |\n"
        
        # 用户反馈分析
        report_content += "\n## 💬 用户反馈分析\n"
        
        if not feedback_data['feedback_types'].empty:
            report_content += "### 反馈类型统计\n"
            report_content += "| 反馈类型 | 数量 | 平均评分 |\n|----------|------|----------|\n"
            for _, row in feedback_data['feedback_types'].iterrows():
                feedback_name = {
                    'suggestion': '建议',
                    'bug': '问题反馈',
                    'praise': '表扬',
                    'complaint': '投诉'
                }.get(row['feedback_type'], row['feedback_type'])
                avg_rating = f"{row['avg_rating']:.1f}" if pd.notna(row['avg_rating']) else "无评分"
                report_content += f"| {feedback_name} | {row['count']} | {avg_rating} |\n"
        
        if not feedback_data['rating_distribution'].empty:
            total_ratings = feedback_data['rating_distribution']['count'].sum()
            avg_rating = (feedback_data['rating_distribution']['rating'] * 
                         feedback_data['rating_distribution']['count']).sum() / total_ratings
            report_content += f"\n### 用户满意度\n"
            report_content += f"- **平均评分**: {avg_rating:.1f}/5.0\n"
            report_content += f"- **总评价数**: {total_ratings} 条\n"
        
        # 最新反馈
        if not feedback_data['recent_feedback'].empty:
            report_content += "\n### 最新用户反馈\n"
            for _, row in feedback_data['recent_feedback'].iterrows()[:5]:
                feedback_time = row['feedback_time'][:10]  # 只显示日期
                content = row['content'][:50] + "..." if len(row['content']) > 50 else row['content']
                rating = f"⭐{row['rating']}" if pd.notna(row['rating']) else ""
                report_content += f"- **{feedback_time}**: {content} {rating}\n"
        
        # API性能监控
        report_content += "\n## ⚡ API性能监控\n"
        report_content += "| 接口 | 响应时间 | 状态 |\n|------|----------|------|\n"
        
        for api in api_performance:
            endpoint_name = {
                '/health': '健康检查',
                '/api/content': '内容接口',
                '/api/markets': '市场接口',
                '/api/newarrivals': '新品接口',
                '/api/supplies': '供求接口'
            }.get(api['endpoint'], api['endpoint'])
            
            if api['response_time'] is not None:
                response_time = f"{api['response_time']:.0f}ms"
                status = "✅ 正常" if api['status_code'] == 200 else f"❌ {api['error_message']}"
            else:
                response_time = "超时"
                status = f"❌ {api['error_message']}"
            
            report_content += f"| {endpoint_name} | {response_time} | {status} |\n"
        
        # 优化建议
        report_content += "\n## 🎯 优化建议\n"
        
        # 根据数据生成建议
        suggestions = []
        
        if not behavior_data['page_visits'].empty:
            most_visited = behavior_data['page_visits'].iloc[0]['page_path']
            least_visited = behavior_data['page_visits'].iloc[-1]['page_path']
            suggestions.append(f"📈 重点优化{most_visited}页面体验，该页面访问量最高")
            suggestions.append(f"📉 关注{least_visited}页面，考虑改进内容或增加入口")
        
        if not feedback_data['feedback_types'].empty:
            main_feedback = feedback_data['feedback_types'].iloc[0]['feedback_type']
            if main_feedback == 'bug':
                suggestions.append("🐛 优先解决用户反馈的技术问题")
            elif main_feedback == 'suggestion':
                suggestions.append("💡 重视用户建议，考虑功能改进")
        
        # API性能建议
        slow_apis = [api for api in api_performance if api['response_time'] and api['response_time'] > 1000]
        if slow_apis:
            suggestions.append("⚡ 优化响应较慢的API接口性能")
        
        # 通用建议
        suggestions.extend([
            "📱 继续优化移动端用户体验",
            "🔍 完善搜索和筛选功能",
            "📊 建立用户行为跟踪机制",
            "💬 增加用户反馈收集渠道"
        ])
        
        for i, suggestion in enumerate(suggestions[:6], 1):
            report_content += f"{i}. {suggestion}\n"
        
        # 保存报告
        report_filename = f"user_monitoring_report_{datetime.now().strftime('%Y%m%d')}.md"
        with open(report_filename, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        print(f"✅ 监控报告已生成：{report_filename}")
        
        return report_filename

def main():
    print("📊 茶叶平台用户反馈和数据监控工具")
    print("=" * 50)
    
    monitor = UserFeedbackMonitor()
    
    # 如果是首次运行，生成模拟数据
    if not os.path.exists(monitor.db_file):
        print("🎲 首次运行，生成模拟数据...")
        monitor.simulate_user_data()
    
    # 生成监控报告
    report_file = monitor.generate_monitoring_report()
    
    print("\n📈 监控功能：")
    print("1. 用户行为分析 - 页面访问、用户活跃度")
    print("2. 内容互动统计 - 浏览、点赞、分享数据")
    print("3. 用户反馈分析 - 建议、问题、满意度")
    print("4. API性能监控 - 响应时间、错误率")
    print("\n💡 建议每日运行，持续跟踪平台使用情况")

if __name__ == "__main__":
    main() 