#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶一点通 - 内容管理后台
专门用于管理转载内容和用户输入的数据
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_cors import CORS
import sqlite3
import json
import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

# 创建Flask应用
app = Flask(__name__)
app.secret_key = 'tea_content_admin_secret_2024'
CORS(app)

# 数据库配置
DATABASE = 'content_management.db'

def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # 创建管理员表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 创建内容表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            type TEXT NOT NULL,
            author TEXT DEFAULT '转载内容',
            tag TEXT DEFAULT '转载',
            status TEXT DEFAULT 'published',
            priority TEXT DEFAULT 'normal',
            view_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 创建来源表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT,
            type TEXT NOT NULL,
            description TEXT,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 创建统计表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE NOT NULL,
            content_count INTEGER DEFAULT 0,
            view_count INTEGER DEFAULT 0,
            type TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 插入默认管理员
    admin_password = generate_password_hash('admin123')
    cursor.execute('''
        INSERT OR IGNORE INTO admins (username, password_hash, role)
        VALUES (?, ?, ?)
    ''', ('admin', admin_password, 'super_admin'))
    
    # 插入默认来源
    default_sources = [
        ('中茶官网', 'https://www.chinatea.com', 'recommend', '中国茶叶官网'),
        ('大益茶官网', 'https://www.dayitea.com', 'recommend', '大益茶业官网'),
        ('中国茶叶流通协会', 'http://www.ctma.com.cn', 'news', '茶叶行业协会'),
        ('茶艺师联盟', 'http://www.chayishilianmeng.com', 'art', '茶艺教学'),
        ('茶叶行业资讯', 'http://www.chaye.com', 'hot', '行业资讯')
    ]
    
    for source in default_sources:
        cursor.execute('''
            INSERT OR IGNORE INTO sources (name, url, type, description)
            VALUES (?, ?, ?, ?)
        ''', source)
    
    conn.commit()
    conn.close()
    print("✅ 数据库初始化完成")

def get_db():
    """获取数据库连接"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# 登录验证装饰器
def login_required(f):
    def decorated_function(*args, **kwargs):
        if 'admin_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

@app.route('/')
@login_required
def dashboard():
    """管理后台首页"""
    conn = get_db()
    cursor = conn.cursor()
    
    # 获取统计数据
    cursor.execute('''
        SELECT 
            COUNT(*) as total_contents,
            COUNT(CASE WHEN type = 'recommend' THEN 1 END) as recommend_count,
            COUNT(CASE WHEN type = 'news' THEN 1 END) as news_count,
            COUNT(CASE WHEN type = 'art' THEN 1 END) as art_count,
            COUNT(CASE WHEN type = 'hot' THEN 1 END) as hot_count
        FROM contents
    ''')
    stats = cursor.fetchone()
    
    # 获取最新内容
    cursor.execute('''
        SELECT * FROM contents 
        ORDER BY created_at DESC 
        LIMIT 10
    ''')
    recent_contents = cursor.fetchall()
    
    conn.close()
    
    return render_template('dashboard.html', 
                         stats=stats, 
                         recent_contents=recent_contents)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """管理员登录"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM admins WHERE username = ?', (username,))
        admin = cursor.fetchone()
        conn.close()
        
        if admin and check_password_hash(admin['password_hash'], password):
            session['admin_id'] = admin['id']
            session['admin_username'] = admin['username']
            session['admin_role'] = admin['role']
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='用户名或密码错误')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """退出登录"""
    session.clear()
    return redirect(url_for('login'))

@app.route('/content')
@login_required
def content_management():
    """内容管理页面"""
    conn = get_db()
    cursor = conn.cursor()
    
    # 获取筛选参数
    content_type = request.args.get('type', 'all')
    status = request.args.get('status', 'all')
    page = int(request.args.get('page', 1))
    per_page = 20
    
    # 构建查询
    query = 'SELECT * FROM contents WHERE 1=1'
    params = []
    
    if content_type != 'all':
        query += ' AND type = ?'
        params.append(content_type)
    
    if status != 'all':
        query += ' AND status = ?'
        params.append(status)
    
    # 获取总数
    count_query = query.replace('SELECT *', 'SELECT COUNT(*)')
    cursor.execute(count_query, params)
    total = cursor.fetchone()[0]
    
    # 分页
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.extend([per_page, (page - 1) * per_page])
    
    cursor.execute(query, params)
    contents = cursor.fetchall()
    
    conn.close()
    
    return render_template('content.html', 
                         contents=contents,
                         current_page=page,
                         total_pages=(total + per_page - 1) // per_page,
                         content_type=content_type,
                         status=status)

@app.route('/content/add', methods=['GET', 'POST'])
@login_required
def add_content():
    """添加内容"""
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        content_type = request.form['type']
        author = request.form['author']
        tag = request.form['tag']
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contents (title, content, type, author, tag)
            VALUES (?, ?, ?, ?, ?)
        ''', (title, content, content_type, author, tag))
        conn.commit()
        conn.close()
        
        return redirect(url_for('content_management'))
    
    return render_template('add_content.html')

@app.route('/content/edit/<int:content_id>', methods=['GET', 'POST'])
@login_required
def edit_content(content_id):
    """编辑内容"""
    conn = get_db()
    cursor = conn.cursor()
    
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        content_type = request.form['type']
        author = request.form['author']
        tag = request.form['tag']
        status = request.form['status']
        
        cursor.execute('''
            UPDATE contents 
            SET title = ?, content = ?, type = ?, author = ?, tag = ?, status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (title, content, content_type, author, tag, status, content_id))
        conn.commit()
        conn.close()
        
        return redirect(url_for('content_management'))
    
    cursor.execute('SELECT * FROM contents WHERE id = ?', (content_id,))
    content = cursor.fetchone()
    conn.close()
    
    if not content:
        return redirect(url_for('content_management'))
    
    return render_template('edit_content.html', content=content)

@app.route('/content/delete/<int:content_id>')
@login_required
def delete_content(content_id):
    """删除内容"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM contents WHERE id = ?', (content_id,))
    conn.commit()
    conn.close()
    
    return redirect(url_for('content_management'))

@app.route('/sources')
@login_required
def source_management():
    """来源管理"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM sources ORDER BY created_at DESC')
    sources = cursor.fetchall()
    conn.close()
    
    return render_template('sources.html', sources=sources)

@app.route('/sources/add', methods=['GET', 'POST'])
@login_required
def add_source():
    """添加来源"""
    if request.method == 'POST':
        name = request.form['name']
        url = request.form['url']
        source_type = request.form['type']
        description = request.form['description']
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO sources (name, url, type, description)
            VALUES (?, ?, ?, ?)
        ''', (name, url, source_type, description))
        conn.commit()
        conn.close()
        
        return redirect(url_for('source_management'))
    
    return render_template('add_source.html')

@app.route('/api/contents')
def api_get_contents():
    """API接口：获取内容"""
    content_type = request.args.get('type', 'all')
    
    conn = get_db()
    cursor = conn.cursor()
    
    if content_type == 'all':
        cursor.execute('SELECT * FROM contents WHERE status = "published" ORDER BY created_at DESC')
    else:
        cursor.execute('SELECT * FROM contents WHERE type = ? AND status = "published" ORDER BY created_at DESC', (content_type,))
    
    contents = cursor.fetchall()
    conn.close()
    
    # 转换为字典列表
    content_list = []
    for content in contents:
        content_dict = dict(content)
        content_dict['created_at'] = content['created_at']
        content_list.append(content_dict)
    
    return jsonify({
        'status': 'success',
        'data': content_list,
        'count': len(content_list)
    })

@app.route('/api/contents/<int:content_id>')
def api_get_content(content_id):
    """API接口：获取单个内容"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM contents WHERE id = ? AND status = "published"', (content_id,))
    content = cursor.fetchone()
    conn.close()
    
    if not content:
        return jsonify({'status': 'error', 'message': '内容不存在'}), 404
    
    return jsonify({
        'status': 'success',
        'data': dict(content)
    })

@app.route('/api/statistics')
@login_required
def api_statistics():
    """API接口：获取统计数据"""
    conn = get_db()
    cursor = conn.cursor()
    
    # 内容统计
    cursor.execute('''
        SELECT 
            COUNT(*) as total_contents,
            COUNT(CASE WHEN type = 'recommend' THEN 1 END) as recommend_count,
            COUNT(CASE WHEN type = 'news' THEN 1 END) as news_count,
            COUNT(CASE WHEN type = 'art' THEN 1 END) as art_count,
            COUNT(CASE WHEN type = 'hot' THEN 1 END) as hot_count
        FROM contents
    ''')
    content_stats = cursor.fetchone()
    
    # 来源统计
    cursor.execute('SELECT COUNT(*) as total_sources FROM sources WHERE is_active = 1')
    source_stats = cursor.fetchone()
    
    conn.close()
    
    return jsonify({
        'status': 'success',
        'data': {
            'content_stats': dict(content_stats),
            'source_stats': dict(source_stats)
        }
    })

if __name__ == '__main__':
    # 初始化数据库
    init_db()
    
    print("🚀 茶叶一点通内容管理后台启动")
    print("📊 管理后台地址: http://localhost:5000")
    print("🔑 默认管理员账号: admin")
    print("🔑 默认管理员密码: admin123")
    
    # 启动服务器
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
