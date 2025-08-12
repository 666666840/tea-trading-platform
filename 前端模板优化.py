#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
前端模板优化脚本
自动为HTML模板添加CSRF令牌、XSS防护和现代化UI元素
"""

import os
import re
from pathlib import Path

def optimize_template(file_path):
    """优化单个模板文件"""
    print(f"优化模板: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. 添加CSRF令牌到表单
    content = add_csrf_tokens(content)
    
    # 2. 添加XSS防护（确保变量输出使用|e过滤器）
    content = add_xss_protection(content)
    
    # 3. 添加现代化CSS和JS引用
    content = add_modern_assets(content)
    
    # 4. 添加响应式设计类
    content = add_responsive_classes(content)
    
    # 5. 添加加载动画和交互效果
    content = add_interactive_elements(content)
    
    # 6. 添加错误处理和用户反馈
    content = add_error_handling(content)
    
    # 如果内容有变化，保存文件
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 已优化: {file_path}")
        return True
    else:
        print(f"⏭️  无需优化: {file_path}")
        return False

def add_csrf_tokens(content):
    """添加CSRF令牌到表单"""
    # 查找所有表单标签
    form_pattern = r'<form([^>]*)>'
    
    def add_csrf_to_form(match):
        form_attrs = match.group(1)
        # 如果已经有CSRF令牌，跳过
        if 'csrf_token' in form_attrs:
            return match.group(0)
        
        # 添加CSRF令牌
        csrf_token = '{{ csrf_token() }}'
        return f'<form{form_attrs}>\n    <input type="hidden" name="csrf_token" value="{csrf_token}">'
    
    content = re.sub(form_pattern, add_csrf_to_form, content)
    return content

def add_xss_protection(content):
    """添加XSS防护"""
    # 查找所有变量输出，确保使用|e过滤器
    variable_pattern = r'\{\{\s*([^|}]+)\s*\}\}'
    
    def add_escape_filter(match):
        variable = match.group(1).strip()
        # 如果已经有|e过滤器，跳过
        if '|e' in variable:
            return match.group(0)
        
        # 添加|e过滤器
        return f'{{{{ {variable}|e }}}}'
    
    content = re.sub(variable_pattern, add_escape_filter, content)
    return content

def add_modern_assets(content):
    """添加现代化CSS和JS引用"""
    # 检查是否已有现代化资源
    if 'style.css' in content and 'dashboard.js' in content:
        return content
    
    # 在head标签中添加CSS
    if '<head>' in content and 'style.css' not in content:
        css_link = '''
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">'''
        content = content.replace('<head>', f'<head>{css_link}')
    
    # 在body结束前添加JS
    if '</body>' in content and 'dashboard.js' not in content:
        js_scripts = '''
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ url_for('static', filename='js/dashboard.js') }}"></script>'''
        content = content.replace('</body>', f'{js_scripts}\n</body>')
    
    return content

def add_responsive_classes(content):
    """添加响应式设计类"""
    # 为表格添加响应式类
    if '<table' in content and 'table-responsive' not in content:
        content = content.replace('<table', '<div class="table-responsive"><table')
        content = content.replace('</table>', '</table></div>')
    
    # 为按钮组添加响应式类
    if 'btn-group' in content and 'btn-group-sm' not in content:
        content = content.replace('btn-group', 'btn-group btn-group-sm')
    
    return content

def add_interactive_elements(content):
    """添加交互元素"""
    # 为按钮添加加载状态
    button_pattern = r'<button([^>]*class="[^"]*btn[^"]*"[^>]*)>'
    
    def add_loading_state(match):
        button_attrs = match.group(1)
        if 'data-loading' in button_attrs:
            return match.group(0)
        
        return f'<button{button_attrs} data-loading-text="处理中...">'
    
    content = re.sub(button_pattern, add_loading_state, content)
    
    # 为表单添加验证
    form_pattern = r'<form([^>]*method="post"[^>]*)>'
    
    def add_form_validation(match):
        form_attrs = match.group(1)
        if 'data-validate' in form_attrs:
            return match.group(0)
        
        return f'<form{form_attrs} data-validate="true">'
    
    content = re.sub(form_pattern, add_form_validation, content)
    
    return content

def add_error_handling(content):
    """添加错误处理"""
    # 添加错误消息显示区域
    if 'error' in content and 'alert' not in content:
        error_pattern = r'{%\s*if\s+error\s*%}(.*?){%\s*endif\s*%}'
        
        def add_error_alert(match):
            error_content = match.group(1)
            return f'''{match.group(0)}
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <i class="fas fa-exclamation-triangle"></i> {error_content}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>'''
        
        content = re.sub(error_pattern, add_error_alert, content, flags=re.DOTALL)
    
    # 添加成功消息显示区域
    if 'flash' in content and 'alert-success' not in content:
        flash_pattern = r'{%\s*with\s+messages\s*=\s*get_flashed_messages\(\)\s*%}(.*?){%\s*endwith\s*%}'
        
        def add_success_alert(match):
            flash_content = match.group(1)
            return f'''{match.group(0)}
{% if messages %}
    {% for message in messages %}
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="fas fa-check-circle"></i> {{ message|e }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    {% endfor %}
{% endif %}'''
        
        content = re.sub(flash_pattern, add_success_alert, content, flags=re.DOTALL)
    
    return content

def optimize_all_templates():
    """优化所有模板文件"""
    templates_dir = Path('admin_backend/templates')
    
    if not templates_dir.exists():
        print("❌ 模板目录不存在")
        return
    
    html_files = list(templates_dir.glob('*.html'))
    
    if not html_files:
        print("❌ 未找到HTML模板文件")
        return
    
    print(f"🔍 找到 {len(html_files)} 个模板文件")
    
    optimized_count = 0
    for html_file in html_files:
        if optimize_template(html_file):
            optimized_count += 1
    
    print(f"\n📊 优化完成:")
    print(f"   ✅ 已优化: {optimized_count} 个文件")
    print(f"   ⏭️  无需优化: {len(html_files) - optimized_count} 个文件")

def create_modern_base_template():
    """创建现代化的基础模板"""
    base_template = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}茶叶平台管理后台{% endblock %}</title>
    
    <!-- 现代化CSS资源 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    
    <!-- 安全头部 -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;">
    
    {% block extra_css %}{% endblock %}
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container">
            <a class="navbar-brand" href="{{ url_for('dashboard') }}">
                <i class="fas fa-leaf"></i> 茶叶平台管理后台
            </a>
            
            {% if current_user.is_authenticated %}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('dashboard') }}">
                            <i class="fas fa-tachometer-alt"></i> 仪表板
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('markets') }}">
                            <i class="fas fa-store"></i> 市场管理
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('merchants') }}">
                            <i class="fas fa-users"></i> 商户管理
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('users') }}">
                            <i class="fas fa-user-cog"></i> 用户管理
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('logs') }}">
                            <i class="fas fa-list-alt"></i> 系统日志
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url_for('settings') }}">
                            <i class="fas fa-cog"></i> 系统设置
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user-circle"></i> {{ current_user.username|e }}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ url_for('profile') }}">
                                <i class="fas fa-user"></i> 个人资料
                            </a></li>
                            <li><a class="dropdown-item" href="{{ url_for('change_password') }}">
                                <i class="fas fa-key"></i> 修改密码
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="{{ url_for('logout') }}">
                                <i class="fas fa-sign-out-alt"></i> 退出登录
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            {% endif %}
        </div>
    </nav>

    <!-- 主内容区域 -->
    <div class="main-container">
        <!-- 错误消息 -->
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% if messages %}
                {% for category, message in messages %}
                <div class="alert alert-{{ 'danger' if category == 'error' else category }} alert-dismissible fade show" role="alert">
                    <i class="fas fa-{{ 'exclamation-triangle' if category == 'error' else 'check-circle' }}"></i> {{ message|e }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
                {% endfor %}
            {% endif %}
        {% endwith %}

        <!-- 页面内容 -->
        {% block content %}{% endblock %}
    </div>

    <!-- 现代化JS资源 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ url_for('static', filename='js/dashboard.js') }}"></script>
    
    {% block extra_js %}{% endblock %}
</body>
</html>'''
    
    base_template_path = Path('admin_backend/templates/base.html')
    with open(base_template_path, 'w', encoding='utf-8') as f:
        f.write(base_template)
    
    print(f"✅ 已创建现代化基础模板: {base_template_path}")

if __name__ == "__main__":
    print("🚀 开始前端模板优化...")
    
    # 创建现代化基础模板
    create_modern_base_template()
    
    # 优化所有模板
    optimize_all_templates()
    
    print("\n🎉 前端模板优化完成！")
    print("\n📋 优化内容包括:")
    print("   ✅ CSRF令牌自动添加")
    print("   ✅ XSS防护（变量转义）")
    print("   ✅ 现代化CSS和JS资源")
    print("   ✅ 响应式设计类")
    print("   ✅ 交互元素和加载状态")
    print("   ✅ 错误处理和用户反馈")
    print("   ✅ 安全头部配置") 