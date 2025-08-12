#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建超级管理员账户和初始化系统设置
"""

import os
import sys
from datetime import datetime
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from urllib.parse import quote_plus

# 添加当前目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 加载环境变量
load_dotenv()

# 导入Flask应用和数据库模型
from app import app, db, AdminUser, SystemSetting

def create_super_admin():
    """创建超级管理员账户"""
    with app.app_context():
        # 检查是否已存在超级管理员
        existing_admin = AdminUser.query.filter_by(role='super_admin').first()
        if existing_admin:
            print(f"超级管理员已存在: {existing_admin.username}")
            return existing_admin
        
        # 创建超级管理员
        admin = AdminUser(
            username='admin',
            email='admin@tea-platform.com',
            role='super_admin',
            real_name='系统管理员',
            phone='13800138000',
            department='技术部',
            position='系统管理员',
            bio='茶叶平台超级管理员',
            is_active=True
        )
        admin.set_password('admin123')
        
        try:
            db.session.add(admin)
            db.session.commit()
            print(f"超级管理员创建成功: {admin.username}")
            print(f"用户名: {admin.username}")
            print(f"密码: admin123")
            print("请及时修改默认密码！")
            return admin
        except Exception as e:
            db.session.rollback()
            print(f"创建超级管理员失败: {e}")
            return None

def init_default_settings():
    """初始化默认系统设置"""
    with app.app_context():
        default_settings = [
            # 基本设置
            {'key': 'site_name', 'value': '茶叶平台管理后台', 'description': '网站名称', 'category': 'general'},
            {'key': 'site_description', 'value': '专业的茶叶行业管理平台', 'description': '网站描述', 'category': 'general'},
            {'key': 'contact_email', 'value': 'admin@tea-platform.com', 'description': '联系邮箱', 'category': 'general'},
            {'key': 'contact_phone', 'value': '400-123-4567', 'description': '联系电话', 'category': 'general'},
            {'key': 'company_address', 'value': '北京市朝阳区茶叶大厦', 'description': '公司地址', 'category': 'general'},
            {'key': 'icp_number', 'value': '京ICP备12345678号', 'description': 'ICP备案号', 'category': 'general'},
            
            # 安全设置
            {'key': 'enable_registration', 'value': 'false', 'description': '启用用户注册', 'category': 'security'},
            {'key': 'enable_captcha', 'value': 'true', 'description': '启用验证码', 'category': 'security'},
            {'key': 'password_min_length', 'value': '8', 'description': '密码最小长度', 'category': 'security'},
            {'key': 'password_require_special', 'value': 'true', 'description': '密码必须包含特殊字符', 'category': 'security'},
            {'key': 'session_timeout', 'value': '3600', 'description': '会话超时时间(秒)', 'category': 'security'},
            {'key': 'max_login_attempts', 'value': '5', 'description': '最大登录尝试次数', 'category': 'security'},
            {'key': 'lockout_duration', 'value': '1800', 'description': '账户锁定时间(秒)', 'category': 'security'},
            {'key': 'enable_two_factor', 'value': 'false', 'description': '启用双因素认证', 'category': 'security'},
            
            # 通知设置
            {'key': 'email_notifications', 'value': 'true', 'description': '启用邮件通知', 'category': 'notification'},
            {'key': 'smtp_host', 'value': 'smtp.qq.com', 'description': 'SMTP服务器', 'category': 'notification'},
            {'key': 'smtp_port', 'value': '587', 'description': 'SMTP端口', 'category': 'notification'},
            {'key': 'smtp_username', 'value': '', 'description': 'SMTP用户名', 'category': 'notification'},
            {'key': 'smtp_password', 'value': '', 'description': 'SMTP密码', 'category': 'notification'},
            {'key': 'notification_email', 'value': 'notifications@tea-platform.com', 'description': '通知邮箱', 'category': 'notification'},
            {'key': 'enable_sms_notifications', 'value': 'false', 'description': '启用短信通知', 'category': 'notification'},
            {'key': 'sms_api_key', 'value': '', 'description': '短信API密钥', 'category': 'notification'},
            
            # 系统设置
            {'key': 'system_maintenance', 'value': 'false', 'description': '系统维护模式', 'category': 'system'},
            {'key': 'maintenance_message', 'value': '系统正在维护中，请稍后再试', 'description': '维护模式消息', 'category': 'system'},
            {'key': 'backup_frequency', 'value': 'daily', 'description': '数据备份频率', 'category': 'system'},
            {'key': 'backup_retention_days', 'value': '30', 'description': '备份保留天数', 'category': 'system'},
            {'key': 'log_retention_days', 'value': '90', 'description': '日志保留天数', 'category': 'system'},
            {'key': 'max_file_size', 'value': '10485760', 'description': '最大文件上传大小(字节)', 'category': 'system'},
            {'key': 'allowed_file_types', 'value': 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx', 'description': '允许的文件类型', 'category': 'system'},
            {'key': 'enable_auto_cleanup', 'value': 'true', 'description': '启用自动清理', 'category': 'system'},
            
            # 业务设置
            {'key': 'default_tea_categories', 'value': '绿茶,红茶,乌龙茶,白茶,黄茶,黑茶', 'description': '默认茶叶分类', 'category': 'business'},
            {'key': 'market_approval_required', 'value': 'true', 'description': '市场信息需要审核', 'category': 'business'},
            {'key': 'merchant_approval_required', 'value': 'true', 'description': '商户信息需要审核', 'category': 'business'},
            {'key': 'enable_price_alerts', 'value': 'true', 'description': '启用价格提醒', 'category': 'business'},
            {'key': 'price_change_threshold', 'value': '0.1', 'description': '价格变化阈值', 'category': 'business'},
            {'key': 'enable_market_analytics', 'value': 'true', 'description': '启用市场分析', 'category': 'business'},
            
            # 界面设置
            {'key': 'theme_color', 'value': '#28a745', 'description': '主题颜色', 'category': 'ui'},
            {'key': 'enable_dark_mode', 'value': 'false', 'description': '启用深色模式', 'category': 'ui'},
            {'key': 'items_per_page', 'value': '20', 'description': '每页显示条数', 'category': 'ui'},
            {'key': 'enable_animations', 'value': 'true', 'description': '启用动画效果', 'category': 'ui'},
            {'key': 'show_breadcrumbs', 'value': 'true', 'description': '显示面包屑导航', 'category': 'ui'},
            {'key': 'enable_tooltips', 'value': 'true', 'description': '启用工具提示', 'category': 'ui'}
        ]
        
        created_count = 0
        for setting_data in default_settings:
            existing = SystemSetting.query.filter_by(key=setting_data['key']).first()
            if not existing:
                setting = SystemSetting(
                    key=setting_data['key'],
                    value=setting_data['value'],
                    description=setting_data['description'],
                    category=setting_data['category']
                )
                db.session.add(setting)
                created_count += 1
                print(f"创建设置: {setting_data['key']}")
        
        try:
            db.session.commit()
            print(f"成功创建 {created_count} 个默认设置")
        except Exception as e:
            db.session.rollback()
            print(f"创建默认设置失败: {e}")

def init_database():
    """初始化数据库"""
    with app.app_context():
        try:
            # 创建所有表
            db.create_all()
            print("数据库表创建成功")
            
            # 创建超级管理员
            create_super_admin()
            
            # 初始化默认设置
            init_default_settings()
            
            print("数据库初始化完成！")
            
        except Exception as e:
            print(f"数据库初始化失败: {e}")

if __name__ == '__main__':
    print("开始初始化茶叶平台管理后台...")
    init_database()
    print("初始化完成！")