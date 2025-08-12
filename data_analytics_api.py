"""
茶叶平台数据分析API
提供数据统计和分析的RESTful接口
"""

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from typing import Dict, Any, List
import json
import logging
from data_analytics_system import DataAnalyticsSystem, AnalyticsReporter

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 创建蓝图
analytics_bp = Blueprint('analytics', __name__, url_prefix='/api/analytics')

# 创建分析系统实例
analytics_system = DataAnalyticsSystem()
reporter = AnalyticsReporter(analytics_system)

# 权限装饰器（简化版）
def require_auth(f):
    def decorated_function(*args, **kwargs):
        # 这里可以添加实际的权限验证逻辑
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

@analytics_bp.route('/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({
        'status': 'success',
        'message': '数据分析系统运行正常',
        'data': {
            'system_status': 'healthy',
            'total_events': len(analytics_system.events),
            'total_users': len(analytics_system.user_behaviors),
            'total_content': len(analytics_system.content_performances),
            'timestamp': datetime.now().isoformat()
        }
    })

@analytics_bp.route('/events', methods=['POST'])
@require_auth
def track_event():
    """追踪用户事件"""
    try:
        data = request.get_json()
        
        # 验证必需字段
        required_fields = ['event_type', 'session_id', 'page']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'status': 'error',
                    'message': f'缺少必需字段: {field}'
                }), 400
        
        # 添加时间戳
        if 'timestamp' not in data:
            data['timestamp'] = datetime.now().isoformat()
        
        # 追踪事件
        event_id = analytics_system.track_event(data)
        
        if event_id:
            return jsonify({
                'status': 'success',
                'message': '事件追踪成功',
                'data': {
                    'event_id': event_id
                }
            }), 201
        else:
            return jsonify({
                'status': 'error',
                'message': '事件追踪失败'
            }), 500
            
    except Exception as e:
        logger.error(f"事件追踪失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '事件追踪失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/events', methods=['GET'])
@require_auth
def get_events():
    """获取事件列表"""
    try:
        # 获取查询参数
        event_type = request.args.get('event_type')
        user_id = request.args.get('user_id')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        # 过滤事件
        filtered_events = analytics_system.events
        
        if event_type:
            filtered_events = [e for e in filtered_events if e.event_type == event_type]
        
        if user_id:
            filtered_events = [e for e in filtered_events if e.user_id == user_id]
        
        if start_date:
            start_dt = datetime.fromisoformat(start_date)
            filtered_events = [e for e in filtered_events if e.timestamp >= start_dt]
        
        if end_date:
            end_dt = datetime.fromisoformat(end_date)
            filtered_events = [e for e in filtered_events if e.timestamp <= end_dt]
        
        # 分页
        total = len(filtered_events)
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        paginated_events = filtered_events[start_idx:end_idx]
        
        # 转换为字典
        events_data = []
        for event in paginated_events:
            event_dict = {
                'event_id': event.event_id,
                'event_type': event.event_type,
                'user_id': event.user_id,
                'session_id': event.session_id,
                'timestamp': event.timestamp.isoformat(),
                'page': event.page,
                'item_type': event.item_type,
                'item_id': event.item_id,
                'item_title': event.item_title,
                'search_keyword': event.search_keyword,
                'category': event.category,
                'province': event.province,
                'price_range': event.price_range,
                'duration': event.duration,
                'device_type': event.device_type,
                'location': event.location,
                'metadata': event.metadata
            }
            events_data.append(event_dict)
        
        return jsonify({
            'status': 'success',
            'data': events_data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
        
    except Exception as e:
        logger.error(f"获取事件列表失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '获取事件列表失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/reports/daily', methods=['GET'])
@require_auth
def get_daily_report():
    """获取每日报告"""
    try:
        date_str = request.args.get('date')
        date = None
        
        if date_str:
            date = datetime.fromisoformat(date_str)
        
        report = reporter.generate_daily_report(date)
        
        return jsonify({
            'status': 'success',
            'data': report
        })
        
    except Exception as e:
        logger.error(f"生成每日报告失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '生成每日报告失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/reports/weekly', methods=['GET'])
@require_auth
def get_weekly_report():
    """获取每周报告"""
    try:
        end_date_str = request.args.get('end_date')
        end_date = None
        
        if end_date_str:
            end_date = datetime.fromisoformat(end_date_str)
        
        report = reporter.generate_weekly_report(end_date)
        
        return jsonify({
            'status': 'success',
            'data': report
        })
        
    except Exception as e:
        logger.error(f"生成每周报告失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '生成每周报告失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/users/behavior', methods=['GET'])
@require_auth
def get_user_behavior():
    """获取用户行为分析"""
    try:
        user_id = request.args.get('user_id')
        
        if user_id:
            if user_id not in analytics_system.user_behaviors:
                return jsonify({
                    'status': 'error',
                    'message': '用户不存在'
                }), 404
            
            behavior = analytics_system.user_behaviors[user_id]
            behavior_data = {
                'user_id': behavior.user_id,
                'total_sessions': behavior.total_sessions,
                'total_events': behavior.total_events,
                'first_visit': behavior.first_visit.isoformat(),
                'last_visit': behavior.last_visit.isoformat(),
                'favorite_items': behavior.favorite_items,
                'search_history': behavior.search_history,
                'viewed_items': behavior.viewed_items,
                'avg_session_duration': behavior.avg_session_duration,
                'bounce_rate': behavior.bounce_rate,
                'conversion_rate': behavior.conversion_rate,
                'user_segment': behavior.user_segment
            }
            
            return jsonify({
                'status': 'success',
                'data': behavior_data
            })
        else:
            # 返回所有用户行为摘要
            behaviors_summary = []
            for behavior in analytics_system.user_behaviors.values():
                behaviors_summary.append({
                    'user_id': behavior.user_id,
                    'total_sessions': behavior.total_sessions,
                    'total_events': behavior.total_events,
                    'last_visit': behavior.last_visit.isoformat(),
                    'user_segment': behavior.user_segment
                })
            
            return jsonify({
                'status': 'success',
                'data': behaviors_summary
            })
        
    except Exception as e:
        logger.error(f"获取用户行为分析失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '获取用户行为分析失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/content/performance', methods=['GET'])
@require_auth
def get_content_performance():
    """获取内容表现分析"""
    try:
        content_id = request.args.get('content_id')
        
        if content_id:
            if content_id not in analytics_system.content_performances:
                return jsonify({
                    'status': 'error',
                    'message': '内容不存在'
                }), 404
            
            performance = analytics_system.content_performances[content_id]
            performance_data = {
                'content_id': performance.content_id,
                'content_type': performance.content_type,
                'title': performance.title,
                'total_views': performance.total_views,
                'unique_views': performance.unique_views,
                'avg_view_duration': performance.avg_view_duration,
                'bounce_rate': performance.bounce_rate,
                'engagement_rate': performance.engagement_rate,
                'share_count': performance.share_count,
                'like_count': performance.like_count,
                'comment_count': performance.comment_count,
                'conversion_rate': performance.conversion_rate,
                'quality_score': performance.quality_score,
                'performance_score': performance.performance_score
            }
            
            return jsonify({
                'status': 'success',
                'data': performance_data
            })
        else:
            # 返回所有内容表现摘要
            performances_summary = []
            for performance in analytics_system.content_performances.values():
                performances_summary.append({
                    'content_id': performance.content_id,
                    'title': performance.title,
                    'content_type': performance.content_type,
                    'views': performance.total_views,
                    'engagement_rate': performance.engagement_rate,
                    'performance_score': performance.performance_score
                })
            
            # 按表现分数排序
            performances_summary.sort(key=lambda x: x['performance_score'], reverse=True)
            
            # 按内容类型分组统计
            content_types = {}
            for performance in analytics_system.content_performances.values():
                content_type = performance.content_type
                if content_type not in content_types:
                    content_types[content_type] = 0
                content_types[content_type] += 1
            
            return jsonify({
                'status': 'success',
                'data': {
                    'top_content': performances_summary[:10],  # 前10个内容
                    'content_types': content_types
                }
            })
        
    except Exception as e:
        logger.error(f"获取内容表现分析失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '获取内容表现分析失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/search/analytics', methods=['GET'])
@require_auth
def get_search_analytics():
    """获取搜索分析"""
    try:
        keyword = request.args.get('keyword')
        
        if keyword:
            keyword = keyword.lower()
            if keyword not in analytics_system.search_analytics:
                return jsonify({
                    'status': 'error',
                    'message': '搜索关键词不存在'
                }), 404
            
            analytics = analytics_system.search_analytics[keyword]
            analytics_data = {
                'keyword': analytics.keyword,
                'search_count': analytics.search_count,
                'unique_searchers': analytics.unique_searchers,
                'avg_results': analytics.avg_results,
                'click_through_rate': analytics.click_through_rate,
                'conversion_rate': analytics.conversion_rate,
                'related_keywords': analytics.related_keywords,
                'search_intent': analytics.search_intent
            }
            
            return jsonify({
                'status': 'success',
                'data': analytics_data
            })
        else:
            # 返回热门搜索关键词
            top_keywords = sorted(
                analytics_system.search_analytics.values(),
                key=lambda x: x.search_count,
                reverse=True
            )[:20]
            
            keywords_data = []
            for analytics in top_keywords:
                keywords_data.append({
                    'keyword': analytics.keyword,
                    'search_count': analytics.search_count,
                    'unique_searchers': analytics.unique_searchers,
                    'search_intent': analytics.search_intent
                })
            
            return jsonify({
                'status': 'success',
                'data': keywords_data
            })
        
    except Exception as e:
        logger.error(f"获取搜索分析失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '获取搜索分析失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/dashboard', methods=['GET'])
@require_auth
def get_dashboard():
    """获取仪表板数据"""
    try:
        # 获取时间范围
        days = int(request.args.get('days', 7))
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        # 过滤时间范围内的事件
        filtered_events = [
            event for event in analytics_system.events
            if start_date <= event.timestamp <= end_date
        ]
        
        # 生成仪表板数据
        dashboard_data = {
            'period': {
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'days': days
            },
            'overview': {
                'total_events': len(filtered_events),
                'unique_users': len(set(event.user_id for event in filtered_events if event.user_id)),
                'unique_sessions': len(set(event.session_id for event in filtered_events)),
                'total_content_views': len([e for e in filtered_events if e.event_type == 'view' and e.item_type == 'content']),
                'total_searches': len([e for e in filtered_events if e.event_type == 'search'])
            },
            'user_behavior': {
                'user_segments': {},
                'device_types': {},
                'top_pages': {}
            },
            'content_performance': {
                'top_content': [],
                'content_types': {}
            },
            'search_insights': {
                'top_keywords': [],
                'search_intents': {}
            },
            'trends': {
                'daily_events': {},
                'trend_direction': 'stable'
            }
        }
        
        # 用户分段分布
        user_segments = {}
        for user_id, behavior in analytics_system.user_behaviors.items():
            user_events = [e for e in filtered_events if e.user_id == user_id]
            if user_events:
                user_segments[behavior.user_segment] = user_segments.get(behavior.user_segment, 0) + 1
        
        dashboard_data['user_behavior']['user_segments'] = user_segments
        
        # 设备类型分布
        device_types = {}
        for event in filtered_events:
            if event.device_type:
                device_types[event.device_type] = device_types.get(event.device_type, 0) + 1
        
        dashboard_data['user_behavior']['device_types'] = device_types
        
        # 热门页面
        pages = {}
        for event in filtered_events:
            pages[event.page] = pages.get(event.page, 0) + 1
        
        dashboard_data['user_behavior']['top_pages'] = dict(sorted(pages.items(), key=lambda x: x[1], reverse=True)[:10])
        
        # 热门内容
        content_views = {}
        for event in filtered_events:
            if event.event_type == 'view' and event.item_id:
                content_views[event.item_id] = content_views.get(event.item_id, 0) + 1
        
        top_content = []
        for content_id, views in sorted(content_views.items(), key=lambda x: x[1], reverse=True)[:10]:
            if content_id in analytics_system.content_performances:
                content = analytics_system.content_performances[content_id]
                top_content.append({
                    'content_id': content_id,
                    'title': content.title,
                    'views': views,
                    'performance_score': content.performance_score
                })
        
        dashboard_data['content_performance']['top_content'] = top_content
        
        # 内容类型分布
        content_types = {}
        for event in filtered_events:
            if event.item_type:
                content_types[event.item_type] = content_types.get(event.item_type, 0) + 1
        
        dashboard_data['content_performance']['content_types'] = content_types
        
        # 热门搜索关键词
        search_keywords = {}
        for event in filtered_events:
            if event.search_keyword:
                keyword = event.search_keyword.lower()
                search_keywords[keyword] = search_keywords.get(keyword, 0) + 1
        
        dashboard_data['search_insights']['top_keywords'] = [
            {'keyword': keyword, 'count': count}
            for keyword, count in sorted(search_keywords.items(), key=lambda x: x[1], reverse=True)[:10]
        ]
        
        # 搜索意图分布
        search_intents = {}
        for event in filtered_events:
            if event.search_keyword:
                keyword = event.search_keyword.lower()
                if any(word in keyword for word in ['价格', '多少钱', '报价']):
                    search_intents['transactional'] = search_intents.get('transactional', 0) + 1
                elif any(word in keyword for word in ['怎么', '如何', '方法', '技巧']):
                    search_intents['informational'] = search_intents.get('informational', 0) + 1
                elif any(word in keyword for word in ['地址', '电话', '联系']):
                    search_intents['navigational'] = search_intents.get('navigational', 0) + 1
                else:
                    search_intents['informational'] = search_intents.get('informational', 0) + 1
        
        dashboard_data['search_insights']['search_intents'] = search_intents
        
        # 每日事件趋势
        daily_events = {}
        for event in filtered_events:
            date_str = event.timestamp.date().isoformat()
            daily_events[date_str] = daily_events.get(date_str, 0) + 1
        
        dashboard_data['trends']['daily_events'] = daily_events
        
        return jsonify({
            'status': 'success',
            'data': dashboard_data
        })
        
    except Exception as e:
        logger.error(f"获取仪表板数据失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '获取仪表板数据失败',
            'error': str(e)
        }), 500

@analytics_bp.route('/export', methods=['GET'])
@require_auth
def export_data():
    """导出分析数据"""
    try:
        export_type = request.args.get('type', 'all')
        format_type = request.args.get('format', 'json')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # 过滤时间范围
        filtered_events = analytics_system.events
        if start_date:
            start_dt = datetime.fromisoformat(start_date)
            filtered_events = [e for e in filtered_events if e.timestamp >= start_dt]
        
        if end_date:
            end_dt = datetime.fromisoformat(end_date)
            filtered_events = [e for e in filtered_events if e.timestamp <= end_dt]
        
        # 根据类型导出数据
        if export_type == 'events':
            export_data = [
                {
                    'event_id': event.event_id,
                    'event_type': event.event_type,
                    'user_id': event.user_id,
                    'session_id': event.session_id,
                    'timestamp': event.timestamp.isoformat(),
                    'page': event.page,
                    'item_type': event.item_type,
                    'item_id': event.item_id,
                    'search_keyword': event.search_keyword,
                    'device_type': event.device_type,
                    'location': event.location
                }
                for event in filtered_events
            ]
        elif export_type == 'users':
            export_data = [
                {
                    'user_id': behavior.user_id,
                    'total_sessions': behavior.total_sessions,
                    'total_events': behavior.total_events,
                    'first_visit': behavior.first_visit.isoformat(),
                    'last_visit': behavior.last_visit.isoformat(),
                    'user_segment': behavior.user_segment
                }
                for behavior in analytics_system.user_behaviors.values()
            ]
        elif export_type == 'content':
            export_data = [
                {
                    'content_id': performance.content_id,
                    'title': performance.title,
                    'content_type': performance.content_type,
                    'total_views': performance.total_views,
                    'engagement_rate': performance.engagement_rate,
                    'performance_score': performance.performance_score
                }
                for performance in analytics_system.content_performances.values()
            ]
        else:  # all
            export_data = {
                'events': len(filtered_events),
                'users': len(analytics_system.user_behaviors),
                'content': len(analytics_system.content_performances),
                'search_keywords': len(analytics_system.search_analytics)
            }
        
        if format_type == 'json':
            return jsonify({
                'status': 'success',
                'data': export_data,
                'export_type': export_type,
                'format': format_type
            })
        else:
            return jsonify({
                'status': 'error',
                'message': '不支持的导出格式'
            }), 400
        
    except Exception as e:
        logger.error(f"导出数据失败: {e}")
        return jsonify({
            'status': 'error',
            'message': '导出数据失败',
            'error': str(e)
        }), 500

# 错误处理
@analytics_bp.errorhandler(404)
def not_found(error):
    return jsonify({
        'status': 'error',
        'message': '接口不存在'
    }), 404

@analytics_bp.errorhandler(500)
def internal_error(error):
    return jsonify({
        'status': 'error',
        'message': '服务器内部错误'
    }), 500 