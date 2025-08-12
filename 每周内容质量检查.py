#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台每周内容质量检查工具
Author: 茶叶批发平台开发团队
"""

import json
import jieba
import requests
from datetime import datetime, timedelta
import os
import re

class WeeklyContentAnalyzer:
    def __init__(self):
        self.api_base = "http://localhost:3000"
        self.content_types = ['recommend', 'news', 'art', 'hot']
        
    def fetch_all_content(self):
        """获取所有内容数据"""
        all_content = {}
        for content_type in self.content_types:
            try:
                response = requests.get(f"{self.api_base}/api/content?type={content_type}")
                if response.status_code == 200:
                    all_content[content_type] = response.json()
                else:
                    print(f"❌ 无法获取{content_type}类型内容")
            except:
                print(f"❌ 连接API失败，请确保服务器运行")
                return None
        return all_content
    
    def analyze_content_quality(self, content_data):
        """分析内容质量"""
        quality_report = {
            'total_items': 0,
            'avg_title_length': 0,
            'avg_summary_length': 0,
            'keyword_diversity': 0,
            'content_freshness': 0,
            'recommendations': []
        }
        
        all_titles = []
        all_summaries = []
        all_keywords = []
        
        for category, items in content_data.items():
            if isinstance(items, list):
                quality_report['total_items'] += len(items)
                
                for item in items:
                    # 标题长度分析
                    title = item.get('title', '')
                    all_titles.append(title)
                    
                    # 摘要长度分析
                    summary = item.get('summary', '')
                    all_summaries.append(summary)
                    
                    # 关键词提取
                    keywords = jieba.analyse.extract_tags(title + summary, topK=5)
                    all_keywords.extend(keywords)
        
        # 计算平均长度
        if all_titles:
            quality_report['avg_title_length'] = sum(len(t) for t in all_titles) / len(all_titles)
        if all_summaries:
            quality_report['avg_summary_length'] = sum(len(s) for s in all_summaries) / len(all_summaries)
            
        # 关键词多样性
        unique_keywords = set(all_keywords)
        quality_report['keyword_diversity'] = len(unique_keywords)
        
        # 生成建议
        self._generate_recommendations(quality_report)
        
        return quality_report
    
    def _generate_recommendations(self, report):
        """生成优化建议"""
        recommendations = []
        
        if report['avg_title_length'] < 10:
            recommendations.append("📝 建议增加标题长度，提高吸引力")
        elif report['avg_title_length'] > 30:
            recommendations.append("✂️ 建议缩短标题长度，提高可读性")
            
        if report['avg_summary_length'] < 50:
            recommendations.append("📖 建议丰富摘要内容，提供更多信息")
        elif report['avg_summary_length'] > 200:
            recommendations.append("📋 建议精简摘要内容，突出重点")
            
        if report['keyword_diversity'] < 20:
            recommendations.append("🔍 建议增加关键词多样性，覆盖更多茶叶主题")
            
        if report['total_items'] < 8:
            recommendations.append("➕ 建议增加内容数量，丰富平台内容")
            
        # 茶叶行业特定建议
        recommendations.extend([
            "🌿 建议添加季节性茶叶内容（春茶、秋茶等）",
            "🏪 建议增加产地介绍和茶园风光内容",
            "👥 建议添加茶艺师专访和品茶心得",
            "📊 建议加入茶叶市场价格分析"
        ])
        
        report['recommendations'] = recommendations
    
    def generate_weekly_report(self):
        """生成每周报告"""
        print("🔍 开始每周内容质量检查...")
        
        # 获取内容数据
        content_data = self.fetch_all_content()
        if not content_data:
            return False
            
        # 分析质量
        quality_report = self.analyze_content_quality(content_data)
        
        # 生成报告
        report_date = datetime.now().strftime("%Y年%m月%d日")
        report_content = f"""
# 📊 茶叶平台每周内容质量报告
## 报告日期：{report_date}

## 📈 内容概况
- **总内容数量**: {quality_report['total_items']} 条
- **平均标题长度**: {quality_report['avg_title_length']:.1f} 字
- **平均摘要长度**: {quality_report['avg_summary_length']:.1f} 字
- **关键词多样性**: {quality_report['keyword_diversity']} 个不同关键词

## 📋 内容分布
"""
        
        # 添加各类型内容统计
        for content_type, items in content_data.items():
            type_names = {
                'recommend': '推荐内容',
                'news': '资讯内容', 
                'art': '茶艺内容',
                'hot': '热点内容'
            }
            if isinstance(items, list):
                report_content += f"- **{type_names.get(content_type, content_type)}**: {len(items)} 条\n"
        
        # 添加优化建议
        report_content += "\n## 🎯 优化建议\n"
        for i, rec in enumerate(quality_report['recommendations'][:6], 1):
            report_content += f"{i}. {rec}\n"
            
        # 添加质量评分
        score = self._calculate_quality_score(quality_report)
        report_content += f"\n## ⭐ 内容质量评分: {score}/100\n"
        
        if score >= 80:
            report_content += "🎉 内容质量优秀！继续保持！\n"
        elif score >= 60:
            report_content += "👍 内容质量良好，可进一步优化\n"
        else:
            report_content += "⚠️ 内容质量需要改进，建议重点关注\n"
            
        # 保存报告
        report_filename = f"weekly_content_report_{datetime.now().strftime('%Y%m%d')}.md"
        with open(report_filename, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        print(f"✅ 报告已生成：{report_filename}")
        print(f"📊 质量评分：{score}/100")
        
        return True
    
    def _calculate_quality_score(self, report):
        """计算质量评分"""
        score = 0
        
        # 内容数量评分 (20分)
        if report['total_items'] >= 10:
            score += 20
        elif report['total_items'] >= 8:
            score += 15
        elif report['total_items'] >= 5:
            score += 10
        else:
            score += 5
            
        # 标题长度评分 (20分)
        if 15 <= report['avg_title_length'] <= 25:
            score += 20
        elif 10 <= report['avg_title_length'] <= 30:
            score += 15
        else:
            score += 10
            
        # 摘要长度评分 (20分)
        if 80 <= report['avg_summary_length'] <= 150:
            score += 20
        elif 50 <= report['avg_summary_length'] <= 200:
            score += 15
        else:
            score += 10
            
        # 关键词多样性评分 (20分)
        if report['keyword_diversity'] >= 30:
            score += 20
        elif report['keyword_diversity'] >= 20:
            score += 15
        elif report['keyword_diversity'] >= 10:
            score += 10
        else:
            score += 5
            
        # 基础质量评分 (20分)
        score += 20  # 基础分
        
        return min(score, 100)

def main():
    print("📋 茶叶平台每周内容质量检查工具")
    print("=" * 50)
    
    analyzer = WeeklyContentAnalyzer()
    success = analyzer.generate_weekly_report()
    
    if success:
        print("\n🎯 下周优化建议：")
        print("1. 根据报告建议调整内容策略")
        print("2. 关注用户反馈，优化热门内容")
        print("3. 增加季节性和热点茶叶话题")
        print("4. 保持内容更新频率")
    else:
        print("❌ 质量检查失败，请检查服务器状态")

if __name__ == "__main__":
    main() 