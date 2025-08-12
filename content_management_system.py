#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台内容管理系统
提供完整的内容管理功能，包括内容CRUD、质量分析、审核、调度等
"""

import json
import re
import time
import threading
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional, Any
from enum import Enum
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ContentType(Enum):
    """内容类型枚举"""
    RECOMMEND = "recommend"  # 推荐内容
    NEWS = "news"           # 资讯内容
    ART = "art"             # 茶艺内容
    HOT = "hot"             # 热点内容
    GUIDE = "guide"         # 指南内容
    REVIEW = "review"       # 评测内容

class ContentStatus(Enum):
    """内容状态枚举"""
    DRAFT = "draft"         # 草稿
    PENDING = "pending"     # 待审核
    APPROVED = "approved"   # 已审核
    PUBLISHED = "published" # 已发布
    REJECTED = "rejected"   # 已拒绝
    ARCHIVED = "archived"   # 已归档

class ContentPriority(Enum):
    """内容优先级枚举"""
    LOW = "low"             # 低优先级
    NORMAL = "normal"       # 普通优先级
    HIGH = "high"           # 高优先级
    URGENT = "urgent"       # 紧急优先级

@dataclass
class ContentItem:
    """内容数据模型"""
    id: Optional[int] = None
    title: str = ""
    content: str = ""
    summary: str = ""
    type: str = ContentType.RECOMMEND.value
    status: str = ContentStatus.DRAFT.value
    priority: str = ContentPriority.NORMAL.value
    author: str = ""
    tags: List[str] = None
    category: str = ""
    image_url: str = ""
    video_url: str = ""
    seo_title: str = ""
    seo_description: str = ""
    seo_keywords: str = ""
    view_count: int = 0
    like_count: int = 0
    comment_count: int = 0
    share_count: int = 0
    quality_score: float = 0.0
    audit_score: float = 0.0
    is_featured: bool = False
    is_top: bool = False
    publish_time: Optional[datetime] = None
    expire_time: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    created_by: str = ""
    updated_by: str = ""
    audit_by: str = ""
    audit_time: Optional[datetime] = None
    audit_notes: str = ""
    metadata: Dict[str, Any] = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []
        if self.metadata is None:
            self.metadata = {}
        if self.created_at is None:
            self.created_at = datetime.now()
        if self.updated_at is None:
            self.updated_at = datetime.now()

class ContentQualityAnalyzer:
    """内容质量分析器"""
    
    def __init__(self):
        self.quality_weights = {
            'title_length': 0.15,
            'content_length': 0.20,
            'keyword_density': 0.15,
            'readability': 0.20,
            'uniqueness': 0.15,
            'completeness': 0.15
        }
    
    def analyze_content(self, content: ContentItem) -> Dict[str, Any]:
        """分析内容质量"""
        analysis = {
            'title_length_score': self._analyze_title_length(content.title),
            'content_length_score': self._analyze_content_length(content.content),
            'keyword_density_score': self._analyze_keyword_density(content.content, content.seo_keywords),
            'readability_score': self._analyze_readability(content.content),
            'uniqueness_score': self._analyze_uniqueness(content.title, content.content),
            'completeness_score': self._analyze_completeness(content)
        }
        
        # 计算综合质量分数
        total_score = sum(
            analysis[key] * self.quality_weights[key.replace('_score', '')]
            for key in analysis.keys()
        )
        
        analysis['total_score'] = round(total_score, 2)
        analysis['quality_level'] = self._get_quality_level(total_score)
        
        return analysis
    
    def _analyze_title_length(self, title: str) -> float:
        """分析标题长度"""
        length = len(title.strip())
        if 10 <= length <= 50:
            return 1.0
        elif 5 <= length < 10 or 50 < length <= 80:
            return 0.8
        elif 80 < length <= 120:
            return 0.6
        else:
            return 0.3
    
    def _analyze_content_length(self, content: str) -> float:
        """分析内容长度"""
        length = len(content.strip())
        if 200 <= length <= 2000:
            return 1.0
        elif 100 <= length < 200 or 2000 < length <= 5000:
            return 0.8
        elif 50 <= length < 100 or 5000 < length <= 10000:
            return 0.6
        else:
            return 0.3
    
    def _analyze_keyword_density(self, content: str, keywords: str) -> float:
        """分析关键词密度"""
        if not keywords:
            return 0.5
        
        keyword_list = [kw.strip() for kw in keywords.split(',') if kw.strip()]
        if not keyword_list:
            return 0.5
        
        content_lower = content.lower()
        total_density = 0
        
        for keyword in keyword_list:
            keyword_lower = keyword.lower()
            count = content_lower.count(keyword_lower)
            density = count / max(len(content_lower.split()), 1)
            total_density += min(density * 100, 5)  # 最大5%密度
        
        avg_density = total_density / len(keyword_list)
        if 1 <= avg_density <= 3:
            return 1.0
        elif 0.5 <= avg_density < 1 or 3 < avg_density <= 5:
            return 0.8
        else:
            return 0.4
    
    def _analyze_readability(self, content: str) -> float:
        """分析可读性"""
        sentences = re.split(r'[。！？.!?]', content)
        words = content.split()
        
        if not sentences or not words:
            return 0.5
        
        avg_sentence_length = len(words) / len(sentences)
        
        if 10 <= avg_sentence_length <= 25:
            return 1.0
        elif 5 <= avg_sentence_length < 10 or 25 < avg_sentence_length <= 35:
            return 0.8
        else:
            return 0.6
    
    def _analyze_uniqueness(self, title: str, content: str) -> float:
        """分析内容唯一性（简化版）"""
        # 这里可以接入更复杂的重复检测算法
        # 目前使用简单的长度和字符分布分析
        total_text = title + content
        unique_chars = len(set(total_text))
        total_chars = len(total_text)
        
        if total_chars == 0:
            return 0.5
        
        uniqueness_ratio = unique_chars / total_chars
        if uniqueness_ratio > 0.6:
            return 1.0
        elif uniqueness_ratio > 0.4:
            return 0.8
        else:
            return 0.6
    
    def _analyze_completeness(self, content: ContentItem) -> float:
        """分析内容完整性"""
        score = 0.0
        checks = 0
        
        # 检查必要字段
        if content.title.strip():
            score += 1.0
        checks += 1
        
        if content.content.strip():
            score += 1.0
        checks += 1
        
        if content.author.strip():
            score += 0.5
        checks += 1
        
        if content.tags:
            score += 0.5
        checks += 1
        
        if content.seo_title.strip():
            score += 0.5
        checks += 1
        
        if content.seo_description.strip():
            score += 0.5
        checks += 1
        
        return score / checks if checks > 0 else 0.0
    
    def _get_quality_level(self, score: float) -> str:
        """获取质量等级"""
        if score >= 0.8:
            return "优秀"
        elif score >= 0.6:
            return "良好"
        elif score >= 0.4:
            return "一般"
        else:
            return "较差"

class ContentAuditor:
    """内容审核器"""
    
    def __init__(self):
        self.sensitive_words = [
            '违法', '违规', '涉黄', '涉毒', '赌博', '诈骗', '传销',
            '政治敏感', '暴力', '恐怖', '歧视', '侮辱', '诽谤'
        ]
        
        self.spam_patterns = [
            r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
            r'\d{11}',  # 手机号
            r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',  # 邮箱
        ]
    
    def audit_content(self, content: ContentItem) -> Dict[str, Any]:
        """审核内容"""
        audit_result = {
            'passed': True,
            'issues': [],
            'suggestions': [],
            'audit_score': 100.0
        }
        
        # 敏感词检测
        sensitive_issues = self._check_sensitive_words(content.title + content.content)
        if sensitive_issues:
            audit_result['passed'] = False
            audit_result['issues'].extend(sensitive_issues)
            audit_result['audit_score'] -= 30
        
        # 垃圾信息检测
        spam_issues = self._check_spam(content.title + content.content)
        if spam_issues:
            audit_result['issues'].extend(spam_issues)
            audit_result['audit_score'] -= 20
        
        # 内容质量检查
        quality_issues = self._check_content_quality(content)
        if quality_issues:
            audit_result['issues'].extend(quality_issues)
            audit_result['audit_score'] -= 10
        
        # 生成建议
        audit_result['suggestions'] = self._generate_suggestions(content, audit_result['issues'])
        
        audit_result['audit_score'] = max(0, audit_result['audit_score'])
        
        return audit_result
    
    def _check_sensitive_words(self, text: str) -> List[str]:
        """检查敏感词"""
        issues = []
        text_lower = text.lower()
        
        for word in self.sensitive_words:
            if word in text_lower:
                issues.append(f"包含敏感词: {word}")
        
        return issues
    
    def _check_spam(self, text: str) -> List[str]:
        """检查垃圾信息"""
        issues = []
        
        for pattern in self.spam_patterns:
            matches = re.findall(pattern, text)
            if len(matches) > 3:  # 超过3个链接或联系方式
                issues.append(f"疑似垃圾信息: 包含过多链接或联系方式")
                break
        
        return issues
    
    def _check_content_quality(self, content: ContentItem) -> List[str]:
        """检查内容质量"""
        issues = []
        
        if len(content.title) < 5:
            issues.append("标题过短")
        
        if len(content.content) < 50:
            issues.append("内容过短")
        
        if not content.author:
            issues.append("缺少作者信息")
        
        return issues
    
    def _generate_suggestions(self, content: ContentItem, issues: List[str]) -> List[str]:
        """生成改进建议"""
        suggestions = []
        
        if "标题过短" in issues:
            suggestions.append("建议标题长度在10-50字符之间")
        
        if "内容过短" in issues:
            suggestions.append("建议内容长度不少于200字符")
        
        if "缺少作者信息" in issues:
            suggestions.append("建议添加作者信息")
        
        if not content.tags:
            suggestions.append("建议添加相关标签")
        
        if not content.seo_description:
            suggestions.append("建议添加SEO描述")
        
        return suggestions

class ContentScheduler:
    """内容调度器"""
    
    def __init__(self):
        self.scheduled_contents = []
    
    def schedule_content(self, content: ContentItem, publish_time: datetime) -> bool:
        """调度内容发布"""
        try:
            content.publish_time = publish_time
            content.status = ContentStatus.PENDING.value
            self.scheduled_contents.append(content)
            logger.info(f"内容已调度: {content.title} -> {publish_time}")
            return True
        except Exception as e:
            logger.error(f"调度内容失败: {e}")
            return False
    
    def get_scheduled_contents(self, start_time: datetime = None, end_time: datetime = None) -> List[ContentItem]:
        """获取调度内容"""
        if not start_time:
            start_time = datetime.now()
        if not end_time:
            end_time = start_time + timedelta(days=7)
        
        return [
            content for content in self.scheduled_contents
            if start_time <= content.publish_time <= end_time
        ]
    
    def cancel_schedule(self, content_id: int) -> bool:
        """取消调度"""
        try:
            self.scheduled_contents = [
                content for content in self.scheduled_contents
                if content.id != content_id
            ]
            return True
        except Exception as e:
            logger.error(f"取消调度失败: {e}")
            return False

class ContentManager:
    """内容管理器"""
    
    def __init__(self):
        self.contents: List[ContentItem] = []
        self.quality_analyzer = ContentQualityAnalyzer()
        self.auditor = ContentAuditor()
        self.scheduler = ContentScheduler()
        self.next_id = 1
    
    def create_content(self, content_data: Dict[str, Any]) -> ContentItem:
        """创建内容"""
        content = ContentItem(**content_data)
        content.id = self.next_id
        self.next_id += 1
        
        # 质量分析
        quality_result = self.quality_analyzer.analyze_content(content)
        content.quality_score = quality_result['total_score']
        
        # 内容审核
        audit_result = self.auditor.audit_content(content)
        content.audit_score = audit_result['audit_score']
        
        # 如果审核通过，设置为待审核状态
        if audit_result['passed']:
            content.status = ContentStatus.PENDING.value
        else:
            content.status = ContentStatus.REJECTED.value
        
        self.contents.append(content)
        logger.info(f"内容已创建: {content.title} (ID: {content.id})")
        
        return content
    
    def update_content(self, content_id: int, update_data: Dict[str, Any]) -> Optional[ContentItem]:
        """更新内容"""
        content = self.get_content_by_id(content_id)
        if not content:
            return None
        
        # 更新字段
        for key, value in update_data.items():
            if hasattr(content, key):
                setattr(content, key, value)
        
        content.updated_at = datetime.now()
        
        # 重新进行质量分析和审核
        quality_result = self.quality_analyzer.analyze_content(content)
        content.quality_score = quality_result['total_score']
        
        audit_result = self.auditor.audit_content(content)
        content.audit_score = audit_result['audit_score']
        
        logger.info(f"内容已更新: {content.title} (ID: {content.id})")
        return content
    
    def delete_content(self, content_id: int) -> bool:
        """删除内容"""
        content = self.get_content_by_id(content_id)
        if not content:
            return False
        
        self.contents = [c for c in self.contents if c.id != content_id]
        logger.info(f"内容已删除: {content.title} (ID: {content_id})")
        return True
    
    def get_content_by_id(self, content_id: int) -> Optional[ContentItem]:
        """根据ID获取内容"""
        for content in self.contents:
            if content.id == content_id:
                return content
        return None
    
    def get_contents(self, filters: Dict[str, Any] = None) -> List[ContentItem]:
        """获取内容列表"""
        if not filters:
            return self.contents
        
        filtered_contents = self.contents
        
        # 类型筛选
        if 'type' in filters and filters['type']:
            filtered_contents = [c for c in filtered_contents if c.type == filters['type']]
        
        # 状态筛选
        if 'status' in filters and filters['status']:
            filtered_contents = [c for c in filtered_contents if c.status == filters['status']]
        
        # 优先级筛选
        if 'priority' in filters and filters['priority']:
            filtered_contents = [c for c in filtered_contents if c.priority == filters['priority']]
        
        # 关键词搜索
        if 'keyword' in filters and filters['keyword']:
            keyword = filters['keyword'].lower()
            filtered_contents = [
                c for c in filtered_contents
                if keyword in c.title.lower() or keyword in c.content.lower()
            ]
        
        # 作者筛选
        if 'author' in filters and filters['author']:
            filtered_contents = [c for c in filtered_contents if c.author == filters['author']]
        
        return filtered_contents
    
    def publish_content(self, content_id: int) -> bool:
        """发布内容"""
        content = self.get_content_by_id(content_id)
        if not content:
            return False
        
        if content.status != ContentStatus.APPROVED.value:
            logger.warning(f"内容状态不允许发布: {content.title} (状态: {content.status})")
            return False
        
        content.status = ContentStatus.PUBLISHED.value
        content.publish_time = datetime.now()
        logger.info(f"内容已发布: {content.title} (ID: {content_id})")
        return True
    
    def approve_content(self, content_id: int, auditor: str, notes: str = "") -> bool:
        """审核通过内容"""
        content = self.get_content_by_id(content_id)
        if not content:
            return False
        
        content.status = ContentStatus.APPROVED.value
        content.audit_by = auditor
        content.audit_time = datetime.now()
        content.audit_notes = notes
        logger.info(f"内容已审核通过: {content.title} (审核人: {auditor})")
        return True
    
    def reject_content(self, content_id: int, auditor: str, notes: str = "") -> bool:
        """审核拒绝内容"""
        content = self.get_content_by_id(content_id)
        if not content:
            return False
        
        content.status = ContentStatus.REJECTED.value
        content.audit_by = auditor
        content.audit_time = datetime.now()
        content.audit_notes = notes
        logger.info(f"内容已审核拒绝: {content.title} (审核人: {auditor})")
        return True
    
    def get_content_statistics(self) -> Dict[str, Any]:
        """获取内容统计"""
        total_count = len(self.contents)
        published_count = len([c for c in self.contents if c.status == ContentStatus.PUBLISHED.value])
        pending_count = len([c for c in self.contents if c.status == ContentStatus.PENDING.value])
        rejected_count = len([c for c in self.contents if c.status == ContentStatus.REJECTED.value])
        
        type_stats = {}
        for content_type in ContentType:
            type_stats[content_type.value] = len([
                c for c in self.contents if c.type == content_type.value
            ])
        
        avg_quality_score = sum(c.quality_score for c in self.contents) / total_count if total_count > 0 else 0
        
        return {
            'total_count': total_count,
            'published_count': published_count,
            'pending_count': pending_count,
            'rejected_count': rejected_count,
            'type_statistics': type_stats,
            'average_quality_score': round(avg_quality_score, 2)
        }

class ContentAutoUpdater:
    """内容自动更新器"""
    
    def __init__(self, content_manager: ContentManager):
        self.content_manager = content_manager
        self.running = False
        self.update_thread = None
    
    def start_auto_update(self):
        """启动自动更新"""
        if self.running:
            return
        
        self.running = True
        self.update_thread = threading.Thread(target=self._auto_update_loop)
        self.update_thread.daemon = True
        self.update_thread.start()
        logger.info("内容自动更新已启动")
    
    def stop_auto_update(self):
        """停止自动更新"""
        self.running = False
        if self.update_thread:
            self.update_thread.join()
        logger.info("内容自动更新已停止")
    
    def _auto_update_loop(self):
        """自动更新循环"""
        while self.running:
            try:
                self._generate_daily_content()
                time.sleep(3600)  # 每小时检查一次
            except Exception as e:
                logger.error(f"自动更新出错: {e}")
                time.sleep(300)  # 出错后等待5分钟再试
    
    def _generate_daily_content(self):
        """生成每日内容"""
        now = datetime.now()
        
        # 根据星期几生成不同类型的内容
        weekday_content_types = {
            0: ContentType.NEWS.value,      # 周一：资讯
            1: ContentType.GUIDE.value,     # 周二：指南
            2: ContentType.ART.value,       # 周三：茶艺
            3: ContentType.REVIEW.value,    # 周四：评测
            4: ContentType.HOT.value,       # 周五：热点
            5: ContentType.RECOMMEND.value, # 周六：推荐
            6: ContentType.NEWS.value       # 周日：资讯
        }
        
        content_type = weekday_content_types.get(now.weekday(), ContentType.NEWS.value)
        
        # 生成内容数据
        content_data = self._generate_content_data(content_type, now)
        
        # 创建内容
        content = self.content_manager.create_content(content_data)
        
        # 自动审核通过并发布
        if content.audit_score >= 70:  # 质量分数达到70分以上自动通过
            self.content_manager.approve_content(content.id, "系统自动审核", "质量分数达标，自动通过")
            self.content_manager.publish_content(content.id)
            logger.info(f"自动生成并发布内容: {content.title}")
    
    def _generate_content_data(self, content_type: str, current_time: datetime) -> Dict[str, Any]:
        """生成内容数据"""
        # 根据内容类型生成不同的内容
        content_templates = {
            ContentType.NEWS.value: {
                'title': f"茶叶行业资讯 - {current_time.strftime('%Y年%m月%d日')}",
                'content': f"今日茶叶市场动态：\n\n1. 茶叶价格走势分析\n2. 新茶上市情况\n3. 行业政策解读\n4. 市场热点关注\n\n更多详细内容请关注我们的后续报道。",
                'summary': f"{current_time.strftime('%Y年%m月%d日')}茶叶行业最新资讯汇总",
                'tags': ['茶叶', '资讯', '市场动态'],
                'category': '行业资讯'
            },
            ContentType.GUIDE.value: {
                'title': f"茶叶选购指南 - {current_time.strftime('%m月')}",
                'content': f"如何选购优质茶叶：\n\n1. 观察茶叶外观\n2. 闻茶叶香气\n3. 品尝茶叶滋味\n4. 了解茶叶产地\n5. 查看生产日期\n\n选购茶叶时要注意以上几点，确保购买到优质茶叶。",
                'summary': f"{current_time.strftime('%m月')}茶叶选购指南，助您选购优质茶叶",
                'tags': ['茶叶', '选购', '指南'],
                'category': '购买指南'
            },
            ContentType.ART.value: {
                'title': f"茶艺技巧分享 - {current_time.strftime('%m月%d日')}",
                'content': f"今日茶艺技巧：\n\n1. 茶具的选择与保养\n2. 水温的控制技巧\n3. 茶叶的冲泡方法\n4. 茶艺表演要点\n\n掌握这些技巧，让您的茶艺更加精湛。",
                'summary': f"{current_time.strftime('%m月%d日')}茶艺技巧分享，提升茶艺水平",
                'tags': ['茶艺', '技巧', '冲泡'],
                'category': '茶艺文化'
            },
            ContentType.REVIEW.value: {
                'title': f"茶叶评测 - {current_time.strftime('%m月')}新品推荐",
                'content': f"本月茶叶新品评测：\n\n1. 产品基本信息\n2. 外观品质评价\n3. 口感体验分享\n4. 性价比分析\n5. 购买建议\n\n为您推荐本月值得购买的茶叶新品。",
                'summary': f"{current_time.strftime('%m月')}茶叶新品评测，为您推荐优质产品",
                'tags': ['茶叶', '评测', '新品'],
                'category': '产品评测'
            },
            ContentType.HOT.value: {
                'title': f"茶叶热点话题 - {current_time.strftime('%m月%d日')}",
                'content': f"今日茶叶热点：\n\n1. 茶叶直播带货趋势\n2. 新式茶饮发展\n3. 茶叶包装创新\n4. 年轻消费群体分析\n\n关注茶叶行业最新热点话题。",
                'summary': f"{current_time.strftime('%m月%d日')}茶叶行业热点话题汇总",
                'tags': ['茶叶', '热点', '趋势'],
                'category': '行业热点'
            },
            ContentType.RECOMMEND.value: {
                'title': f"周末茶叶推荐 - {current_time.strftime('%m月%d日')}",
                'content': f"本周末茶叶推荐：\n\n1. 适合周末品饮的茶叶\n2. 茶叶搭配建议\n3. 品茶环境营造\n4. 茶友聚会推荐\n\n让您的周末充满茶香。",
                'summary': f"{current_time.strftime('%m月%d日')}周末茶叶推荐，享受美好时光",
                'tags': ['茶叶', '推荐', '周末'],
                'category': '推荐内容'
            }
        }
        
        template = content_templates.get(content_type, content_templates[ContentType.NEWS.value])
        
        return {
            'title': template['title'],
            'content': template['content'],
            'summary': template['summary'],
            'type': content_type,
            'tags': template['tags'],
            'category': template['category'],
            'author': '系统自动生成',
            'created_by': 'system',
            'priority': ContentPriority.NORMAL.value,
            'seo_title': template['title'],
            'seo_description': template['summary'],
            'seo_keywords': ','.join(template['tags'])
        }

def main():
    """主函数 - 演示内容管理系统功能"""
    print("🍵 茶叶平台内容管理系统")
    print("=" * 50)
    
    # 创建内容管理器
    content_manager = ContentManager()
    
    # 创建自动更新器
    auto_updater = ContentAutoUpdater(content_manager)
    
    # 启动自动更新
    auto_updater.start_auto_update()
    
    # 演示创建内容
    print("\n📝 创建示例内容...")
    sample_content_data = {
        'title': '茶叶市场行情分析',
        'content': '近期茶叶市场价格走势分析，包括绿茶、红茶、乌龙茶等主要品种的价格变化情况。',
        'summary': '茶叶市场价格走势分析报告',
        'type': ContentType.NEWS.value,
        'author': '茶叶专家',
        'tags': ['茶叶', '市场', '价格', '分析'],
        'category': '市场分析',
        'priority': ContentPriority.HIGH.value,
        'seo_title': '茶叶市场行情分析 - 最新价格走势',
        'seo_description': '茶叶市场价格走势分析，了解最新行情',
        'seo_keywords': '茶叶,市场,价格,分析,行情',
        'created_by': 'admin'
    }
    
    content = content_manager.create_content(sample_content_data)
    print(f"✅ 内容已创建: {content.title} (质量分数: {content.quality_score})")
    
    # 演示内容审核
    print("\n🔍 进行内容审核...")
    if content.audit_score >= 70:
        content_manager.approve_content(content.id, "管理员", "内容质量良好，审核通过")
        content_manager.publish_content(content.id)
        print(f"✅ 内容已审核通过并发布")
    else:
        print(f"❌ 内容审核未通过 (审核分数: {content.audit_score})")
    
    # 演示获取统计信息
    print("\n📊 获取内容统计...")
    stats = content_manager.get_content_statistics()
    print(f"总内容数: {stats['total_count']}")
    print(f"已发布: {stats['published_count']}")
    print(f"待审核: {stats['pending_count']}")
    print(f"平均质量分数: {stats['average_quality_score']}")
    
    # 演示内容筛选
    print("\n🔍 筛选内容...")
    filters = {'type': ContentType.NEWS.value, 'status': ContentStatus.PUBLISHED.value}
    filtered_contents = content_manager.get_contents(filters)
    print(f"找到 {len(filtered_contents)} 条已发布的资讯内容")
    
    # 停止自动更新
    auto_updater.stop_auto_update()
    
    print("\n🎉 内容管理系统演示完成！")

if __name__ == "__main__":
    main() 