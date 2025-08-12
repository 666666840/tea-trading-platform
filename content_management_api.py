#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台内容管理API
提供完整的内容管理REST API接口
"""

from flask import Blueprint, request, jsonify
from functools import wraps
import json
from datetime import datetime
from content_management_system import (
    ContentManager, ContentItem, ContentType, ContentStatus, ContentPriority,
    ContentQualityAnalyzer, ContentAuditor
)

# 创建Blueprint
content_api = Blueprint('content_api', __name__, url_prefix='/api/content-management')

# 初始化内容管理器
content_manager = ContentManager()

def admin_required(f):
    """管理员权限装饰器"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # 这里可以添加实际的权限验证逻辑
        # 目前简化处理，直接返回True
        return f(*args, **kwargs)
    return decorated_function

def editor_required(f):
    """编辑权限装饰器"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # 这里可以添加实际的权限验证逻辑
        # 目前简化处理，直接返回True
        return f(*args, **kwargs)
    return decorated_function

# ==================== 内容CRUD API ====================

@content_api.route('/contents', methods=['GET'])
def get_contents():
    """获取内容列表"""
    try:
        # 获取查询参数
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        content_type = request.args.get('type')
        status = request.args.get('status')
        priority = request.args.get('priority')
        keyword = request.args.get('keyword')
        author = request.args.get('author')
        
        # 构建筛选条件
        filters = {}
        if content_type:
            filters['type'] = content_type
        if status:
            filters['status'] = status
        if priority:
            filters['priority'] = priority
        if keyword:
            filters['keyword'] = keyword
        if author:
            filters['author'] = author
        
        # 获取内容列表
        contents = content_manager.get_contents(filters)
        
        # 分页处理
        total = len(contents)
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        paginated_contents = contents[start_idx:end_idx]
        
        # 转换为字典格式
        data = []
        for content in paginated_contents:
            content_dict = {
                'id': content.id,
                'title': content.title,
                'summary': content.summary,
                'type': content.type,
                'status': content.status,
                'priority': content.priority,
                'author': content.author,
                'tags': content.tags,
                'category': content.category,
                'image_url': content.image_url,
                'view_count': content.view_count,
                'like_count': content.like_count,
                'comment_count': content.comment_count,
                'share_count': content.share_count,
                'quality_score': content.quality_score,
                'audit_score': content.audit_score,
                'is_featured': content.is_featured,
                'is_top': content.is_top,
                'publish_time': content.publish_time.isoformat() if content.publish_time else None,
                'created_at': content.created_at.isoformat() if content.created_at else None,
                'updated_at': content.updated_at.isoformat() if content.updated_at else None
            }
            data.append(content_dict)
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取内容列表失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>', methods=['GET'])
def get_content_detail(content_id):
    """获取内容详情"""
    try:
        content = content_manager.get_content_by_id(content_id)
        if not content:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        content_dict = {
            'id': content.id,
            'title': content.title,
            'content': content.content,
            'summary': content.summary,
            'type': content.type,
            'status': content.status,
            'priority': content.priority,
            'author': content.author,
            'tags': content.tags,
            'category': content.category,
            'image_url': content.image_url,
            'video_url': content.video_url,
            'seo_title': content.seo_title,
            'seo_description': content.seo_description,
            'seo_keywords': content.seo_keywords,
            'view_count': content.view_count,
            'like_count': content.like_count,
            'comment_count': content.comment_count,
            'share_count': content.share_count,
            'quality_score': content.quality_score,
            'audit_score': content.audit_score,
            'is_featured': content.is_featured,
            'is_top': content.is_top,
            'publish_time': content.publish_time.isoformat() if content.publish_time else None,
            'expire_time': content.expire_time.isoformat() if content.expire_time else None,
            'created_at': content.created_at.isoformat() if content.created_at else None,
            'updated_at': content.updated_at.isoformat() if content.updated_at else None,
            'created_by': content.created_by,
            'updated_by': content.updated_by,
            'audit_by': content.audit_by,
            'audit_time': content.audit_time.isoformat() if content.audit_time else None,
            'audit_notes': content.audit_notes,
            'metadata': content.metadata
        }
        
        return jsonify({
            'status': 'success',
            'data': content_dict
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取内容详情失败: {str(e)}'
        }), 500

@content_api.route('/contents', methods=['POST'])
@editor_required
def create_content():
    """创建内容"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'status': 'error',
                'message': '请求数据不能为空'
            }), 400
        
        # 验证必填字段
        required_fields = ['title', 'content', 'type']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'status': 'error',
                    'message': f'字段 {field} 不能为空'
                }), 400
        
        # 创建内容
        content = content_manager.create_content(data)
        
        return jsonify({
            'status': 'success',
            'message': '内容创建成功',
            'data': {
                'id': content.id,
                'title': content.title,
                'quality_score': content.quality_score,
                'audit_score': content.audit_score,
                'status': content.status
            }
        }), 201
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'创建内容失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>', methods=['PUT'])
@editor_required
def update_content(content_id):
    """更新内容"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'status': 'error',
                'message': '请求数据不能为空'
            }), 400
        
        # 更新内容
        content = content_manager.update_content(content_id, data)
        if not content:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        return jsonify({
            'status': 'success',
            'message': '内容更新成功',
            'data': {
                'id': content.id,
                'title': content.title,
                'quality_score': content.quality_score,
                'audit_score': content.audit_score,
                'status': content.status
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'更新内容失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>', methods=['DELETE'])
@admin_required
def delete_content(content_id):
    """删除内容"""
    try:
        success = content_manager.delete_content(content_id)
        if not success:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        return jsonify({
            'status': 'success',
            'message': '内容删除成功'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'删除内容失败: {str(e)}'
        }), 500

# ==================== 内容操作 API ====================

@content_api.route('/contents/<int:content_id>/publish', methods=['POST'])
@admin_required
def publish_content(content_id):
    """发布内容"""
    try:
        success = content_manager.publish_content(content_id)
        if not success:
            return jsonify({
                'status': 'error',
                'message': '发布失败，内容可能不存在或状态不允许发布'
            }), 400
        
        return jsonify({
            'status': 'success',
            'message': '内容发布成功'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'发布内容失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>/approve', methods=['POST'])
@admin_required
def approve_content(content_id):
    """审核通过内容"""
    try:
        data = request.get_json() or {}
        auditor = data.get('auditor', 'admin')
        notes = data.get('notes', '')
        
        success = content_manager.approve_content(content_id, auditor, notes)
        if not success:
            return jsonify({
                'status': 'error',
                'message': '审核失败，内容可能不存在'
            }), 400
        
        return jsonify({
            'status': 'success',
            'message': '内容审核通过'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'审核内容失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>/reject', methods=['POST'])
@admin_required
def reject_content(content_id):
    """审核拒绝内容"""
    try:
        data = request.get_json() or {}
        auditor = data.get('auditor', 'admin')
        notes = data.get('notes', '')
        
        success = content_manager.reject_content(content_id, auditor, notes)
        if not success:
            return jsonify({
                'status': 'error',
                'message': '审核失败，内容可能不存在'
            }), 400
        
        return jsonify({
            'status': 'success',
            'message': '内容审核拒绝'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'审核内容失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>/toggle-featured', methods=['POST'])
@admin_required
def toggle_featured(content_id):
    """切换推荐状态"""
    try:
        content = content_manager.get_content_by_id(content_id)
        if not content:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        content.is_featured = not content.is_featured
        content.updated_at = datetime.now()
        
        return jsonify({
            'status': 'success',
            'message': f'内容已{"设为推荐" if content.is_featured else "取消推荐"}',
            'data': {
                'is_featured': content.is_featured
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'切换推荐状态失败: {str(e)}'
        }), 500

@content_api.route('/contents/<int:content_id>/toggle-top', methods=['POST'])
@admin_required
def toggle_top(content_id):
    """切换置顶状态"""
    try:
        content = content_manager.get_content_by_id(content_id)
        if not content:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        content.is_top = not content.is_top
        content.updated_at = datetime.now()
        
        return jsonify({
            'status': 'success',
            'message': f'内容已{"设为置顶" if content.is_top else "取消置顶"}',
            'data': {
                'is_top': content.is_top
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'切换置顶状态失败: {str(e)}'
        }), 500

# ==================== 批量操作 API ====================

@content_api.route('/contents/batch-publish', methods=['POST'])
@admin_required
def batch_publish():
    """批量发布内容"""
    try:
        data = request.get_json()
        content_ids = data.get('content_ids', [])
        
        if not content_ids:
            return jsonify({
                'status': 'error',
                'message': '请选择要发布的内容'
            }), 400
        
        success_count = 0
        failed_count = 0
        results = []
        
        for content_id in content_ids:
            try:
                success = content_manager.publish_content(content_id)
                if success:
                    success_count += 1
                    results.append({'id': content_id, 'status': 'success'})
                else:
                    failed_count += 1
                    results.append({'id': content_id, 'status': 'failed', 'message': '发布失败'})
            except Exception as e:
                failed_count += 1
                results.append({'id': content_id, 'status': 'failed', 'message': str(e)})
        
        return jsonify({
            'status': 'success',
            'message': f'批量发布完成，成功: {success_count}，失败: {failed_count}',
            'data': {
                'success_count': success_count,
                'failed_count': failed_count,
                'results': results
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'批量发布失败: {str(e)}'
        }), 500

@content_api.route('/contents/batch-delete', methods=['POST'])
@admin_required
def batch_delete():
    """批量删除内容"""
    try:
        data = request.get_json()
        content_ids = data.get('content_ids', [])
        
        if not content_ids:
            return jsonify({
                'status': 'error',
                'message': '请选择要删除的内容'
            }), 400
        
        success_count = 0
        failed_count = 0
        results = []
        
        for content_id in content_ids:
            try:
                success = content_manager.delete_content(content_id)
                if success:
                    success_count += 1
                    results.append({'id': content_id, 'status': 'success'})
                else:
                    failed_count += 1
                    results.append({'id': content_id, 'status': 'failed', 'message': '删除失败'})
            except Exception as e:
                failed_count += 1
                results.append({'id': content_id, 'status': 'failed', 'message': str(e)})
        
        return jsonify({
            'status': 'success',
            'message': f'批量删除完成，成功: {success_count}，失败: {failed_count}',
            'data': {
                'success_count': success_count,
                'failed_count': failed_count,
                'results': results
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'批量删除失败: {str(e)}'
        }), 500

# ==================== 内容分析 API ====================

@content_api.route('/contents/<int:content_id>/analyze', methods=['GET'])
def analyze_content(content_id):
    """分析内容质量"""
    try:
        content = content_manager.get_content_by_id(content_id)
        if not content:
            return jsonify({
                'status': 'error',
                'message': '内容不存在'
            }), 404
        
        # 质量分析
        analyzer = ContentQualityAnalyzer()
        quality_result = analyzer.analyze_content(content)
        
        # 内容审核
        auditor = ContentAuditor()
        audit_result = auditor.audit_content(content)
        
        return jsonify({
            'status': 'success',
            'data': {
                'quality_analysis': quality_result,
                'audit_result': audit_result
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'分析内容失败: {str(e)}'
        }), 500

# ==================== 统计信息 API ====================

@content_api.route('/statistics', methods=['GET'])
def get_statistics():
    """获取内容统计信息"""
    try:
        stats = content_manager.get_content_statistics()
        
        return jsonify({
            'status': 'success',
            'data': stats
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取统计信息失败: {str(e)}'
        }), 500

# ==================== 枚举值 API ====================

@content_api.route('/enums/content-types', methods=['GET'])
def get_content_types():
    """获取内容类型枚举"""
    try:
        types = [{'value': t.value, 'label': t.name} for t in ContentType]
        return jsonify({
            'status': 'success',
            'data': types
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取内容类型失败: {str(e)}'
        }), 500

@content_api.route('/enums/content-statuses', methods=['GET'])
def get_content_statuses():
    """获取内容状态枚举"""
    try:
        statuses = [{'value': s.value, 'label': s.name} for s in ContentStatus]
        return jsonify({
            'status': 'success',
            'data': statuses
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取内容状态失败: {str(e)}'
        }), 500

@content_api.route('/enums/content-priorities', methods=['GET'])
def get_content_priorities():
    """获取内容优先级枚举"""
    try:
        priorities = [{'value': p.value, 'label': p.name} for p in ContentPriority]
        return jsonify({
            'status': 'success',
            'data': priorities
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'获取内容优先级失败: {str(e)}'
        }), 500

# ==================== 系统健康检查 API ====================

@content_api.route('/health', methods=['GET'])
def health_check():
    """系统健康检查"""
    try:
        # 检查内容管理器状态
        stats = content_manager.get_content_statistics()
        
        return jsonify({
            'status': 'success',
            'message': '内容管理系统运行正常',
            'data': {
                'total_contents': stats['total_count'],
                'system_status': 'healthy',
                'timestamp': datetime.now().isoformat()
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'系统异常: {str(e)}',
            'data': {
                'system_status': 'unhealthy',
                'timestamp': datetime.now().isoformat()
            }
        }), 500

# ==================== 错误处理 ====================

@content_api.errorhandler(404)
def not_found(error):
    return jsonify({
        'status': 'error',
        'message': '接口不存在'
    }), 404

@content_api.errorhandler(500)
def internal_error(error):
    return jsonify({
        'status': 'error',
        'message': '服务器内部错误'
    }), 500

# 导出Blueprint
__all__ = ['content_api'] 