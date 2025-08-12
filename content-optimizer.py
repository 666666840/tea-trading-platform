#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台内容优化工具
功能：内容质量检查、SEO优化、数据统计
版权：完全原创，基于公开茶叶知识
"""

import json
import re
from datetime import datetime
import jieba
from collections import Counter

class ContentOptimizer:
    def __init__(self):
        self.tea_keywords = [
            '绿茶', '红茶', '乌龙茶', '白茶', '黄茶', '黑茶', '普洱',
            '龙井', '铁观音', '碧螺春', '毛峰', '大红袍', '正山小种',
            '茶叶', '茶园', '茶艺', '茶道', '茶文化', '品茶', '泡茶',
            '批发', '零售', '供应', '需求', '价格', '行情', '市场'
        ]
        
    def analyze_content_quality(self, content):
        """分析内容质量"""
        analysis = {
            'word_count': len(content),
            'keyword_density': self._calculate_keyword_density(content),
            'readability_score': self._calculate_readability(content),
            'seo_score': self._calculate_seo_score(content),
            'suggestions': []
        }
        
        # 生成改进建议
        if analysis['word_count'] < 100:
            analysis['suggestions'].append('内容长度较短，建议增加更多详细信息')
        
        if analysis['keyword_density'] < 0.02:
            analysis['suggestions'].append('茶叶相关关键词密度较低，建议增加行业术语')
            
        if analysis['seo_score'] < 70:
            analysis['suggestions'].append('SEO优化有待提升，建议优化标题和描述')
            
        return analysis
    
    def _calculate_keyword_density(self, content):
        """计算关键词密度"""
        words = jieba.lcut(content)
        total_words = len(words)
        keyword_count = sum(1 for word in words if word in self.tea_keywords)
        return keyword_count / total_words if total_words > 0 else 0
    
    def _calculate_readability(self, content):
        """计算可读性分数"""
        sentences = re.split(r'[。！？]', content)
        sentence_count = len([s for s in sentences if s.strip()])
        words = jieba.lcut(content)
        
        if sentence_count == 0:
            return 0
            
        avg_words_per_sentence = len(words) / sentence_count
        
        # 简单的可读性评分（句子越短越容易阅读）
        if avg_words_per_sentence <= 15:
            return 90
        elif avg_words_per_sentence <= 25:
            return 75
        elif avg_words_per_sentence <= 35:
            return 60
        else:
            return 40
    
    def _calculate_seo_score(self, content):
        """计算SEO分数"""
        score = 0
        
        # 检查是否包含茶叶相关关键词
        if any(keyword in content for keyword in self.tea_keywords[:10]):
            score += 30
            
        # 检查内容长度
        if 200 <= len(content) <= 1000:
            score += 25
        elif len(content) > 100:
            score += 15
            
        # 检查段落结构
        paragraphs = content.split('\n')
        if len(paragraphs) >= 3:
            score += 20
            
        # 检查是否有具体数据或案例
        if re.search(r'\d+', content):
            score += 15
            
        # 检查专业术语使用
        professional_terms = ['品质', '工艺', '产地', '特色', '香气', '口感']
        if any(term in content for term in professional_terms):
            score += 10
            
        return min(score, 100)
    
    def generate_content_suggestions(self, content_type):
        """生成内容建议"""
        suggestions = {
            'recommend': [
                '添加当季茶叶推荐理由',
                '包含品质特点和适用场景',
                '提供价格参考和购买建议',
                '增加用户评价和反馈'
            ],
            'news': [
                '关注茶叶行业最新动态',
                '分析市场趋势和价格变化',
                '报道茶园产区新闻',
                '介绍茶叶加工新技术'
            ],
            'art': [
                '详细介绍茶艺步骤',
                '解释不同茶类的冲泡方法',
                '分享品茶技巧和心得',
                '介绍茶具使用和保养'
            ],
            'hot': [
                '跟踪茶叶市场热点事件',
                '分析消费者关注焦点',
                '报道知名品牌动态',
                '关注健康饮茶话题'
            ]
        }
        
        return suggestions.get(content_type, [])
    
    def optimize_content_batch(self, content_list):
        """批量优化内容"""
        results = []
        
        for i, content in enumerate(content_list):
            analysis = self.analyze_content_quality(content)
            optimized = {
                'index': i,
                'original_content': content,
                'analysis': analysis,
                'optimized_suggestions': self._generate_optimization_suggestions(content, analysis)
            }
            results.append(optimized)
            
        return results
    
    def _generate_optimization_suggestions(self, content, analysis):
        """生成具体的优化建议"""
        suggestions = []
        
        # 基于分析结果生成建议
        if analysis['word_count'] < 150:
            suggestions.append({
                'type': '内容扩展',
                'suggestion': '建议增加茶叶产地、工艺特点、品尝方法等详细信息',
                'priority': 'high'
            })
            
        if analysis['keyword_density'] < 0.03:
            suggestions.append({
                'type': '关键词优化',
                'suggestion': '建议在内容中自然融入更多茶叶专业术语',
                'priority': 'medium'
            })
            
        if analysis['seo_score'] < 60:
            suggestions.append({
                'type': 'SEO优化',
                'suggestion': '建议优化内容结构，增加段落层次和数据支撑',
                'priority': 'medium'
            })
            
        return suggestions

def main():
    """主函数演示"""
    optimizer = ContentOptimizer()
    
    # 示例内容分析
    sample_content = """
    龙井茶是中国著名的绿茶品种，产于浙江杭州西湖地区。
    具有"色绿、香郁、味甘、形美"四大特点。
    优质龙井茶叶扁平光滑，色泽嫩绿，香气清高，滋味鲜醇。
    """
    
    print("=== 茶叶平台内容优化工具 ===\n")
    
    # 分析内容质量
    analysis = optimizer.analyze_content_quality(sample_content)
    print("内容质量分析：")
    print(f"字数统计：{analysis['word_count']}")
    print(f"关键词密度：{analysis['keyword_density']:.2%}")
    print(f"可读性分数：{analysis['readability_score']}")
    print(f"SEO分数：{analysis['seo_score']}")
    
    if analysis['suggestions']:
        print("\n改进建议：")
        for suggestion in analysis['suggestions']:
            print(f"• {suggestion}")
    
    # 生成内容建议
    print("\n=== 推荐内容优化建议 ===")
    suggestions = optimizer.generate_content_suggestions('recommend')
    for i, suggestion in enumerate(suggestions, 1):
        print(f"{i}. {suggestion}")
    
    print("\n✅ 内容优化分析完成！")

if __name__ == "__main__":
    try:
        import jieba
        main()
    except ImportError:
        print("请先安装jieba库：pip install jieba") 