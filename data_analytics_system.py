"""
茶叶平台数据统计和分析系统
提供全面的数据分析和统计功能
"""

import json
import logging
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Any, Tuple
from collections import defaultdict, Counter
import statistics
import math

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class AnalyticsEvent:
    """分析事件数据模型"""
    event_id: str
    event_type: str  # view, click, search, purchase, share, like, comment
    user_id: Optional[str]
    session_id: str
    timestamp: datetime
    page: str
    item_type: Optional[str]  # market, newarrival, supply, content, etc.
    item_id: Optional[str]
    item_title: Optional[str]
    search_keyword: Optional[str]
    category: Optional[str]
    province: Optional[str]
    price_range: Optional[str]
    duration: Optional[int]  # 停留时间（秒）
    referrer: Optional[str]
    user_agent: Optional[str]
    ip_address: Optional[str]
    device_type: Optional[str]  # mobile, desktop, tablet
    location: Optional[str]
    metadata: Dict[str, Any]

@dataclass
class UserBehavior:
    """用户行为分析数据"""
    user_id: str
    total_sessions: int
    total_events: int
    first_visit: datetime
    last_visit: datetime
    favorite_items: List[str]
    search_history: List[str]
    viewed_items: List[str]
    avg_session_duration: float
    bounce_rate: float
    conversion_rate: float
    user_segment: str  # new, active, loyal, churned

@dataclass
class ContentPerformance:
    """内容表现分析数据"""
    content_id: str
    content_type: str
    title: str
    total_views: int
    unique_views: int
    avg_view_duration: float
    bounce_rate: float
    engagement_rate: float
    share_count: int
    like_count: int
    comment_count: int
    conversion_rate: float
    quality_score: float
    performance_score: float

@dataclass
class MarketTrend:
    """市场趋势分析数据"""
    date: datetime
    total_markets: int
    active_markets: int
    new_markets: int
    avg_price: float
    price_trend: str  # rising, falling, stable
    popular_categories: List[str]
    popular_provinces: List[str]
    search_trends: List[str]

@dataclass
class SearchAnalytics:
    """搜索分析数据"""
    keyword: str
    search_count: int
    unique_searchers: int
    avg_results: float
    click_through_rate: float
    conversion_rate: float
    related_keywords: List[str]
    search_intent: str  # informational, navigational, transactional

class DataAnalyticsSystem:
    """数据统计和分析系统"""
    
    def __init__(self):
        self.events: List[AnalyticsEvent] = []
        self.user_behaviors: Dict[str, UserBehavior] = {}
        self.content_performances: Dict[str, ContentPerformance] = {}
        self.market_trends: List[MarketTrend] = []
        self.search_analytics: Dict[str, SearchAnalytics] = {}
        
        # 缓存和性能优化
        self.cache = {}
        self.cache_expire_time = 300  # 5分钟缓存
        
    def track_event(self, event_data: Dict[str, Any]) -> str:
        """追踪用户事件"""
        try:
            event = AnalyticsEvent(
                event_id=event_data.get('event_id', f"evt_{datetime.now().timestamp()}"),
                event_type=event_data['event_type'],
                user_id=event_data.get('user_id'),
                session_id=event_data['session_id'],
                timestamp=datetime.fromisoformat(event_data['timestamp']) if isinstance(event_data['timestamp'], str) else event_data['timestamp'],
                page=event_data['page'],
                item_type=event_data.get('item_type'),
                item_id=event_data.get('item_id'),
                item_title=event_data.get('item_title'),
                search_keyword=event_data.get('search_keyword'),
                category=event_data.get('category'),
                province=event_data.get('province'),
                price_range=event_data.get('price_range'),
                duration=event_data.get('duration'),
                referrer=event_data.get('referrer'),
                user_agent=event_data.get('user_agent'),
                ip_address=event_data.get('ip_address'),
                device_type=event_data.get('device_type'),
                location=event_data.get('location'),
                metadata=event_data.get('metadata', {})
            )
            
            self.events.append(event)
            logger.info(f"事件已追踪: {event.event_type} - {event.page}")
            
            # 实时更新分析数据
            self._update_user_behavior(event)
            self._update_content_performance(event)
            self._update_search_analytics(event)
            
            return event.event_id
            
        except Exception as e:
            logger.error(f"事件追踪失败: {e}")
            return None
    
    def _update_user_behavior(self, event: AnalyticsEvent):
        """更新用户行为分析"""
        if not event.user_id:
            return
            
        if event.user_id not in self.user_behaviors:
            self.user_behaviors[event.user_id] = UserBehavior(
                user_id=event.user_id,
                total_sessions=1,
                total_events=0,
                first_visit=event.timestamp,
                last_visit=event.timestamp,
                favorite_items=[],
                search_history=[],
                viewed_items=[],
                avg_session_duration=0,
                bounce_rate=0,
                conversion_rate=0,
                user_segment='new'
            )
        
        behavior = self.user_behaviors[event.user_id]
        behavior.total_events += 1
        behavior.last_visit = event.timestamp
        
        # 更新会话信息
        if event.session_id not in [s for s in behavior.__dict__.values() if isinstance(s, str)]:
            behavior.total_sessions += 1
        
        # 更新项目信息
        if event.item_id:
            if event.event_type == 'view':
                if event.item_id not in behavior.viewed_items:
                    behavior.viewed_items.append(event.item_id)
            elif event.event_type == 'like':
                if event.item_id not in behavior.favorite_items:
                    behavior.favorite_items.append(event.item_id)
        
        # 更新搜索历史
        if event.search_keyword:
            behavior.search_history.append(event.search_keyword)
        
        # 计算用户分段
        behavior.user_segment = self._calculate_user_segment(behavior)
    
    def _update_content_performance(self, event: AnalyticsEvent):
        """更新内容表现分析"""
        if not event.item_id:
            return
            
        if event.item_id not in self.content_performances:
            self.content_performances[event.item_id] = ContentPerformance(
                content_id=event.item_id,
                content_type=event.item_type or 'unknown',
                title=event.item_title or 'Unknown',
                total_views=0,
                unique_views=0,
                avg_view_duration=0,
                bounce_rate=0,
                engagement_rate=0,
                share_count=0,
                like_count=0,
                comment_count=0,
                conversion_rate=0,
                quality_score=0,
                performance_score=0
            )
        
        performance = self.content_performances[event.item_id]
        
        if event.event_type == 'view':
            performance.total_views += 1
            if event.duration:
                # 更新平均观看时长
                current_total = performance.avg_view_duration * (performance.total_views - 1)
                performance.avg_view_duration = (current_total + event.duration) / performance.total_views
        
        elif event.event_type == 'share':
            performance.share_count += 1
        elif event.event_type == 'like':
            performance.like_count += 1
        elif event.event_type == 'comment':
            performance.comment_count += 1
        
        # 计算参与度
        performance.engagement_rate = self._calculate_engagement_rate(performance)
        performance.performance_score = self._calculate_performance_score(performance)
    
    def _update_search_analytics(self, event: AnalyticsEvent):
        """更新搜索分析"""
        if not event.search_keyword:
            return
            
        keyword = event.search_keyword.lower()
        if keyword not in self.search_analytics:
            self.search_analytics[keyword] = SearchAnalytics(
                keyword=keyword,
                search_count=0,
                unique_searchers=0,
                avg_results=0,
                click_through_rate=0,
                conversion_rate=0,
                related_keywords=[],
                search_intent='informational'
            )
        
        analytics = self.search_analytics[keyword]
        analytics.search_count += 1
        
        # 更新唯一搜索者
        if event.user_id:
            # 这里简化处理，实际应该维护唯一用户列表
            analytics.unique_searchers = min(analytics.search_count, analytics.unique_searchers + 1)
    
    def _calculate_user_segment(self, behavior: UserBehavior) -> str:
        """计算用户分段"""
        days_since_first = (datetime.now() - behavior.first_visit).days
        avg_events_per_session = behavior.total_events / behavior.total_sessions if behavior.total_sessions > 0 else 0
        
        if days_since_first <= 7:
            return 'new'
        elif avg_events_per_session >= 10 and behavior.total_sessions >= 5:
            return 'loyal'
        elif avg_events_per_session >= 5:
            return 'active'
        else:
            return 'churned'
    
    def _calculate_engagement_rate(self, performance: ContentPerformance) -> float:
        """计算内容参与度"""
        if performance.total_views == 0:
            return 0
        
        engagement_actions = performance.like_count + performance.share_count + performance.comment_count
        return (engagement_actions / performance.total_views) * 100
    
    def _calculate_performance_score(self, performance: ContentPerformance) -> float:
        """计算内容表现分数"""
        # 综合多个指标计算表现分数
        view_score = min(performance.total_views / 100, 1.0) * 30
        engagement_score = min(performance.engagement_rate / 10, 1.0) * 30
        quality_score = performance.quality_score * 20
        conversion_score = min(performance.conversion_rate / 5, 1.0) * 20
        
        return view_score + engagement_score + quality_score + conversion_score

class AnalyticsReporter:
    """分析报告生成器"""
    
    def __init__(self, analytics_system: DataAnalyticsSystem):
        self.analytics = analytics_system
    
    def generate_daily_report(self, date: datetime = None) -> Dict[str, Any]:
        """生成每日报告"""
        if date is None:
            date = datetime.now()
        
        start_date = date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = start_date + timedelta(days=1)
        
        # 过滤当日事件
        daily_events = [
            event for event in self.analytics.events
            if start_date <= event.timestamp < end_date
        ]
        
        report = {
            'date': start_date.isoformat(),
            'summary': self._generate_summary(daily_events),
            'user_behavior': self._analyze_user_behavior(daily_events),
            'content_performance': self._analyze_content_performance(daily_events),
            'search_analytics': self._analyze_search_trends(daily_events),
            'market_trends': self._analyze_market_trends(daily_events),
            'recommendations': self._generate_recommendations(daily_events)
        }
        
        return report
    
    def generate_weekly_report(self, end_date: datetime = None) -> Dict[str, Any]:
        """生成每周报告"""
        if end_date is None:
            end_date = datetime.now()
        
        start_date = end_date - timedelta(days=7)
        
        # 过滤一周内事件
        weekly_events = [
            event for event in self.analytics.events
            if start_date <= event.timestamp <= end_date
        ]
        
        report = {
            'period': {
                'start': start_date.isoformat(),
                'end': end_date.isoformat()
            },
            'summary': self._generate_summary(weekly_events),
            'trends': self._analyze_weekly_trends(weekly_events),
            'user_segments': self._analyze_user_segments(weekly_events),
            'top_content': self._get_top_content(weekly_events),
            'search_insights': self._get_search_insights(weekly_events),
            'recommendations': self._generate_weekly_recommendations(weekly_events)
        }
        
        return report
    
    def _generate_summary(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """生成摘要统计"""
        if not events:
            return {'total_events': 0, 'unique_users': 0, 'unique_sessions': 0}
        
        unique_users = len(set(event.user_id for event in events if event.user_id))
        unique_sessions = len(set(event.session_id for event in events))
        
        event_types = Counter(event.event_type for event in events)
        pages = Counter(event.page for event in events)
        
        return {
            'total_events': len(events),
            'unique_users': unique_users,
            'unique_sessions': unique_sessions,
            'event_types': dict(event_types),
            'top_pages': dict(pages.most_common(10)),
            'avg_session_duration': self._calculate_avg_session_duration(events)
        }
    
    def _analyze_user_behavior(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析用户行为"""
        if not events:
            return {}
        
        # 用户分段分布
        user_segments = Counter()
        for user_id, behavior in self.analytics.user_behaviors.items():
            user_segments[behavior.user_segment] += 1
        
        # 设备类型分布
        device_types = Counter(event.device_type for event in events if event.device_type)
        
        # 地理位置分布
        locations = Counter(event.location for event in events if event.location)
        
        return {
            'user_segments': dict(user_segments),
            'device_types': dict(device_types),
            'top_locations': dict(locations.most_common(10)),
            'bounce_rate': self._calculate_bounce_rate(events),
            'conversion_rate': self._calculate_conversion_rate(events)
        }
    
    def _analyze_content_performance(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析内容表现"""
        if not events:
            return {}
        
        # 获取表现最好的内容
        top_content = sorted(
            self.analytics.content_performances.values(),
            key=lambda x: x.performance_score,
            reverse=True
        )[:10]
        
        # 内容类型表现
        content_type_performance = defaultdict(list)
        for performance in self.analytics.content_performances.values():
            content_type_performance[performance.content_type].append(performance.performance_score)
        
        avg_performance_by_type = {
            content_type: statistics.mean(scores) if scores else 0
            for content_type, scores in content_type_performance.items()
        }
        
        return {
            'top_content': [asdict(content) for content in top_content],
            'avg_performance_by_type': avg_performance_by_type,
            'total_content_views': sum(p.total_views for p in self.analytics.content_performances.values()),
            'avg_engagement_rate': statistics.mean([p.engagement_rate for p in self.analytics.content_performances.values() if p.total_views > 0])
        }
    
    def _analyze_search_trends(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析搜索趋势"""
        if not events:
            return {}
        
        # 热门搜索关键词
        search_events = [event for event in events if event.search_keyword]
        search_keywords = Counter(event.search_keyword.lower() for event in search_events)
        
        # 搜索转化率
        search_conversions = 0
        total_searches = len(search_events)
        
        for event in events:
            if event.event_type in ['click', 'purchase'] and event.referrer and 'search' in event.referrer:
                search_conversions += 1
        
        conversion_rate = (search_conversions / total_searches * 100) if total_searches > 0 else 0
        
        return {
            'top_search_keywords': dict(search_keywords.most_common(20)),
            'total_searches': total_searches,
            'search_conversion_rate': conversion_rate,
            'avg_search_results': self._calculate_avg_search_results(events)
        }
    
    def _analyze_market_trends(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析市场趋势"""
        if not events:
            return {}
        
        # 热门分类
        categories = Counter(event.category for event in events if event.category)
        
        # 热门省份
        provinces = Counter(event.province for event in events if event.province)
        
        # 价格区间偏好
        price_ranges = Counter(event.price_range for event in events if event.price_range)
        
        return {
            'popular_categories': dict(categories.most_common(10)),
            'popular_provinces': dict(provinces.most_common(10)),
            'price_range_preferences': dict(price_ranges),
            'market_activity': len([event for event in events if event.item_type == 'market'])
        }
    
    def _generate_recommendations(self, events: List[AnalyticsEvent]) -> List[str]:
        """生成建议"""
        recommendations = []
        
        if not events:
            recommendations.append("暂无数据，建议增加数据收集")
            return recommendations
        
        # 基于用户行为的建议
        bounce_rate = self._calculate_bounce_rate(events)
        if bounce_rate > 70:
            recommendations.append("跳出率较高，建议优化页面内容和用户体验")
        
        conversion_rate = self._calculate_conversion_rate(events)
        if conversion_rate < 2:
            recommendations.append("转化率较低，建议优化转化漏斗和用户引导")
        
        # 基于内容表现的建议
        avg_engagement = statistics.mean([p.engagement_rate for p in self.analytics.content_performances.values() if p.total_views > 0])
        if avg_engagement < 5:
            recommendations.append("内容参与度较低，建议增加互动元素和优质内容")
        
        # 基于搜索的建议
        search_events = [event for event in events if event.search_keyword]
        if len(search_events) > 0:
            no_result_searches = len([event for event in search_events if event.metadata.get('no_results', False)])
            if no_result_searches / len(search_events) > 0.3:
                recommendations.append("无结果搜索较多，建议优化搜索算法和内容覆盖")
        
        return recommendations
    
    def _calculate_avg_session_duration(self, events: List[AnalyticsEvent]) -> float:
        """计算平均会话时长"""
        session_durations = defaultdict(list)
        
        for event in events:
            if event.duration:
                session_durations[event.session_id].append(event.duration)
        
        if not session_durations:
            return 0
        
        avg_durations = [sum(durations) for durations in session_durations.values()]
        return statistics.mean(avg_durations)
    
    def _calculate_bounce_rate(self, events: List[AnalyticsEvent]) -> float:
        """计算跳出率"""
        session_events = defaultdict(list)
        
        for event in events:
            session_events[event.session_id].append(event)
        
        bounce_sessions = 0
        total_sessions = len(session_events)
        
        for session_events_list in session_events.values():
            if len(session_events_list) == 1:
                bounce_sessions += 1
        
        return (bounce_sessions / total_sessions * 100) if total_sessions > 0 else 0
    
    def _calculate_conversion_rate(self, events: List[AnalyticsEvent]) -> float:
        """计算转化率"""
        conversion_events = [event for event in events if event.event_type in ['purchase', 'inquiry', 'contact']]
        total_sessions = len(set(event.session_id for event in events))
        
        return (len(conversion_events) / total_sessions * 100) if total_sessions > 0 else 0
    
    def _calculate_avg_search_results(self, events: List[AnalyticsEvent]) -> float:
        """计算平均搜索结果数"""
        search_results = [event.metadata.get('results_count', 0) for event in events if event.search_keyword]
        return statistics.mean(search_results) if search_results else 0
    
    def _analyze_weekly_trends(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析周趋势"""
        # 按天分组事件
        daily_events = defaultdict(list)
        for event in events:
            day = event.timestamp.date()
            daily_events[day].append(event)
        
        # 计算每日指标
        daily_metrics = {}
        for day, day_events in daily_events.items():
            daily_metrics[day.isoformat()] = {
                'total_events': len(day_events),
                'unique_users': len(set(event.user_id for event in day_events if event.user_id)),
                'unique_sessions': len(set(event.session_id for event in day_events))
            }
        
        return {
            'daily_metrics': daily_metrics,
            'trend_direction': self._calculate_trend_direction(daily_metrics)
        }
    
    def _analyze_user_segments(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """分析用户分段"""
        segment_events = defaultdict(list)
        
        for event in events:
            if event.user_id and event.user_id in self.analytics.user_behaviors:
                segment = self.analytics.user_behaviors[event.user_id].user_segment
                segment_events[segment].append(event)
        
        segment_analysis = {}
        for segment, segment_events_list in segment_events.items():
            segment_analysis[segment] = {
                'total_events': len(segment_events_list),
                'unique_users': len(set(event.user_id for event in segment_events_list)),
                'avg_session_duration': self._calculate_avg_session_duration(segment_events_list),
                'conversion_rate': self._calculate_conversion_rate(segment_events_list)
            }
        
        return segment_analysis
    
    def _get_top_content(self, events: List[AnalyticsEvent]) -> List[Dict[str, Any]]:
        """获取热门内容"""
        content_views = Counter()
        for event in events:
            if event.item_id and event.event_type == 'view':
                content_views[event.item_id] += 1
        
        top_content = []
        for content_id, views in content_views.most_common(10):
            if content_id in self.analytics.content_performances:
                content = self.analytics.content_performances[content_id]
                top_content.append({
                    'content_id': content_id,
                    'title': content.title,
                    'views': views,
                    'performance_score': content.performance_score
                })
        
        return top_content
    
    def _get_search_insights(self, events: List[AnalyticsEvent]) -> Dict[str, Any]:
        """获取搜索洞察"""
        search_events = [event for event in events if event.search_keyword]
        
        if not search_events:
            return {}
        
        # 搜索关键词分析
        keywords = Counter(event.search_keyword.lower() for event in search_events)
        
        # 长尾关键词
        long_tail_keywords = [keyword for keyword, count in keywords.items() if count == 1]
        
        # 搜索意图分析
        search_intents = self._analyze_search_intents(search_events)
        
        return {
            'total_searches': len(search_events),
            'unique_keywords': len(keywords),
            'long_tail_keywords': len(long_tail_keywords),
            'search_intents': search_intents,
            'top_keywords': dict(keywords.most_common(20))
        }
    
    def _analyze_search_intents(self, search_events: List[AnalyticsEvent]) -> Dict[str, int]:
        """分析搜索意图"""
        intents = Counter()
        
        for event in search_events:
            keyword = event.search_keyword.lower()
            
            # 简单的意图分类规则
            if any(word in keyword for word in ['价格', '多少钱', '报价']):
                intents['transactional'] += 1
            elif any(word in keyword for word in ['怎么', '如何', '方法', '技巧']):
                intents['informational'] += 1
            elif any(word in keyword for word in ['地址', '电话', '联系']):
                intents['navigational'] += 1
            else:
                intents['informational'] += 1
        
        return dict(intents)
    
    def _calculate_trend_direction(self, daily_metrics: Dict[str, Dict[str, int]]) -> str:
        """计算趋势方向"""
        if len(daily_metrics) < 2:
            return 'stable'
        
        # 计算事件总数的趋势
        event_counts = [metrics['total_events'] for metrics in daily_metrics.values()]
        
        if len(event_counts) < 2:
            return 'stable'
        
        # 简单的趋势判断
        first_half = statistics.mean(event_counts[:len(event_counts)//2])
        second_half = statistics.mean(event_counts[len(event_counts)//2:])
        
        if second_half > first_half * 1.1:
            return 'rising'
        elif second_half < first_half * 0.9:
            return 'falling'
        else:
            return 'stable'
    
    def _generate_weekly_recommendations(self, events: List[AnalyticsEvent]) -> List[str]:
        """生成周报告建议"""
        recommendations = []
        
        if not events:
            recommendations.append("本周数据不足，建议增加数据收集和用户引导")
            return recommendations
        
        # 基于趋势的建议
        trend_direction = self._calculate_trend_direction(
            {day: {'total_events': len(day_events)} 
             for day, day_events in self._group_events_by_day(events).items()}
        )
        
        if trend_direction == 'falling':
            recommendations.append("用户活跃度呈下降趋势，建议增加营销活动和内容更新")
        elif trend_direction == 'rising':
            recommendations.append("用户活跃度呈上升趋势，建议保持当前策略并优化用户体验")
        
        # 基于用户分段的建议
        segment_analysis = self._analyze_user_segments(events)
        if 'churned' in segment_analysis and segment_analysis['churned']['unique_users'] > 0:
            recommendations.append("存在流失用户，建议实施用户挽回策略")
        
        # 基于内容表现的建议
        top_content = self._get_top_content(events)
        if top_content:
            avg_performance = statistics.mean([content['performance_score'] for content in top_content])
            if avg_performance < 50:
                recommendations.append("热门内容表现一般，建议优化内容质量和用户体验")
        
        return recommendations
    
    def _group_events_by_day(self, events: List[AnalyticsEvent]) -> Dict[datetime.date, List[AnalyticsEvent]]:
        """按天分组事件"""
        daily_events = defaultdict(list)
        for event in events:
            day = event.timestamp.date()
            daily_events[day].append(event)
        return daily_events

# 使用示例
if __name__ == "__main__":
    # 创建分析系统
    analytics_system = DataAnalyticsSystem()
    reporter = AnalyticsReporter(analytics_system)
    
    # 模拟一些事件数据
    sample_events = [
        {
            'event_id': 'evt_001',
            'event_type': 'view',
            'user_id': 'user_001',
            'session_id': 'session_001',
            'timestamp': datetime.now(),
            'page': '/pages/markets/markets',
            'item_type': 'market',
            'item_id': 'market_001',
            'item_title': '福建茶叶市场',
            'duration': 120,
            'device_type': 'mobile',
            'location': '福建省',
            'metadata': {}
        },
        {
            'event_id': 'evt_002',
            'event_type': 'search',
            'user_id': 'user_001',
            'session_id': 'session_001',
            'timestamp': datetime.now(),
            'page': '/pages/search/search',
            'search_keyword': '铁观音',
            'device_type': 'mobile',
            'metadata': {'results_count': 15}
        }
    ]
    
    # 追踪事件
    for event_data in sample_events:
        analytics_system.track_event(event_data)
    
    # 生成报告
    daily_report = reporter.generate_daily_report()
    print("每日报告:")
    print(json.dumps(daily_report, indent=2, ensure_ascii=False, default=str))
    
    weekly_report = reporter.generate_weekly_report()
    print("\n周报告:")
    print(json.dumps(weekly_report, indent=2, ensure_ascii=False, default=str)) 