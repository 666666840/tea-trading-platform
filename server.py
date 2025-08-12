#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶一点通 API 服务器
功能完整的后端服务，支持茶叶市场、供求信息、内容管理等
"""

from flask import Flask, jsonify, request, render_template, session, redirect, url_for, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import json
import os
import logging
import re
from logging.handlers import RotatingFileHandler
import io
import csv
from functools import wraps

# 创建Flask应用
app = Flask(__name__)
app.config['SECRET_KEY'] = 'tea_platform_secret_key_2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tea_platform.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化扩展
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# 导入数据分析模块
try:
    from data_analytics_api import analytics_bp
    app.register_blueprint(analytics_bp)
    print("数据分析API已注册")
except ImportError as e:
    print(f"数据分析API导入失败: {e}")

# 配置日志
if not os.path.exists('logs'):
    os.mkdir('logs')

file_handler = RotatingFileHandler('logs/tea_platform.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
app.logger.info('茶叶一点通API服务器启动')

# 数据模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='user')
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Market(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    province = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class NewArrival(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(100))
    description = db.Column(db.Text)
    merchant = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Supply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)  # supply/demand
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float)
    quantity = db.Column(db.String(100))
    contact = db.Column(db.String(100))
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Clearance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    original_price = db.Column(db.Float, nullable=False)
    sale_price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    stock = db.Column(db.Integer)
    description = db.Column(db.Text)
    merchant = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(20), nullable=False)  # recommend/news/art/hot
    author = db.Column(db.String(100))
    tag = db.Column(db.String(50))
    image = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    requirements = db.Column(db.String(200))
    user_name = db.Column(db.String(100))
    contact = db.Column(db.String(100))
    status = db.Column(db.String(20), default='active')
    quote_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slogan = db.Column(db.String(200))
    headquarters = db.Column(db.String(100))
    product_lines = db.Column(db.Text)  # JSON格式存储
    is_certified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Garden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(100))
    varieties = db.Column(db.Text)  # JSON格式存储
    contact = db.Column(db.String(100))
    certification = db.Column(db.String(100))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class SystemLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    action = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    ip_address = db.Column(db.String(50))
    user_agent = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# 用户系统增强相关模型
class UserProfile(db.Model):
    """用户资料表"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    nickname = db.Column(db.String(50))
    avatar = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    gender = db.Column(db.String(10))  # male/female/other
    birthday = db.Column(db.Date)
    location = db.Column(db.String(100))
    company = db.Column(db.String(100))
    position = db.Column(db.String(50))
    bio = db.Column(db.Text)
    preferences = db.Column(db.Text)  # JSON格式存储用户偏好
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class UserFavorite(db.Model):
    """用户收藏表"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_type = db.Column(db.String(20), nullable=False)  # market, newarrival, supply, clearance, content
    item_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 复合唯一索引，防止重复收藏
    __table_args__ = (db.UniqueConstraint('user_id', 'item_type', 'item_id', name='unique_user_favorite'),)

class UserHistory(db.Model):
    """用户浏览历史表"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_type = db.Column(db.String(20), nullable=False)  # market, newarrival, supply, clearance, content
    item_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    viewed_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 复合索引，用于快速查询用户历史
    __table_args__ = (db.Index('idx_user_history', 'user_id', 'viewed_at'),)

class UserNotification(db.Model):
    """用户消息通知表"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    type = db.Column(db.String(20), nullable=False)  # system, market, price, news, etc.
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String(10), default='normal')  # low, normal, high, urgent
    action_url = db.Column(db.String(200))  # 点击通知跳转的URL
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 索引，用于快速查询未读消息
    __table_args__ = (db.Index('idx_user_notification', 'user_id', 'is_read', 'created_at'),)

class UserFollow(db.Model):
    """用户关注表"""
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 关注者
    following_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 被关注者
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 复合唯一索引，防止重复关注
    __table_args__ = (db.UniqueConstraint('follower_id', 'following_id', name='unique_user_follow'),)

class UserMessage(db.Model):
    """用户私信表"""
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    message_type = db.Column(db.String(20), default='text')  # text, image, file
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 索引，用于快速查询对话
    __table_args__ = (db.Index('idx_user_message', 'sender_id', 'receiver_id', 'created_at'),)

class UserActivity(db.Model):
    """用户活动记录表"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    activity_type = db.Column(db.String(50), nullable=False)  # login, search, favorite, etc.
    description = db.Column(db.Text)
    activity_data = db.Column(db.Text)  # JSON格式存储额外信息
    ip_address = db.Column(db.String(50))
    user_agent = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # 索引，用于分析用户行为
    __table_args__ = (db.Index('idx_user_activity', 'user_id', 'activity_type', 'created_at'),)

# 认证装饰器
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'status': 'error', 'message': '请先登录'}), 401
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'status': 'error', 'message': '请先登录'}), 401
        user = User.query.get(session['user_id'])
        if not user or user.role != 'admin':
            return jsonify({'status': 'error', 'message': '权限不足'}), 403
        return f(*args, **kwargs)
    return decorated_function

# 工具函数
def log_action(action, description, user_id=None, ip_address=None):
    """记录系统操作日志"""
    log = SystemLog(
        user_id=user_id or session.get('user_id'),
        action=action,
        description=description,
        ip_address=ip_address or request.remote_addr,
        user_agent=request.headers.get('User-Agent', '')
    )
    db.session.add(log)
    db.session.commit()

def get_pagination_params():
    """获取分页参数"""
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    return page, per_page

def parse_price_range(price_range):
    """解析价格范围参数"""
    if not price_range:
        return None, None
    try:
        if '-' in price_range:
            min_price, max_price = price_range.split('-')
            return float(min_price) if min_price else None, float(max_price) if max_price else None
        else:
            price = float(price_range)
            return price, price
    except ValueError:
        return None, None

def parse_date_range(date_range):
    """解析日期范围参数"""
    if not date_range:
        return None, None
    try:
        if '-' in date_range:
            start_date, end_date = date_range.split('-')
            start = datetime.datetime.strptime(start_date, '%Y-%m-%d') if start_date else None
            end = datetime.datetime.strptime(end_date, '%Y-%m-%d') if end_date else None
            return start, end
        else:
            date = datetime.datetime.strptime(date_range, '%Y-%m-%d')
            return date, date
    except ValueError:
        return None, None

def build_advanced_query(model, filters):
    """构建高级查询"""
    query = model.query
    
    # 关键词搜索
    if filters.get('keyword'):
        keyword = filters['keyword']
        if model == Market:
            query = query.filter(
                db.or_(
                    Market.name.contains(keyword),
                    Market.city.contains(keyword),
                    Market.description.contains(keyword)
                )
            )
        elif model == NewArrival:
            query = query.filter(
                db.or_(
                    NewArrival.name.contains(keyword),
                    NewArrival.description.contains(keyword),
                    NewArrival.merchant.contains(keyword)
                )
            )
        elif model == Supply:
            query = query.filter(
                db.or_(
                    Supply.title.contains(keyword),
                    Supply.description.contains(keyword),
                    Supply.contact.contains(keyword)
                )
            )
        elif model == Clearance:
            query = query.filter(
                db.or_(
                    Clearance.name.contains(keyword),
                    Clearance.description.contains(keyword),
                    Clearance.merchant.contains(keyword)
                )
            )
        elif model == Content:
            query = query.filter(
                db.or_(
                    Content.title.contains(keyword),
                    Content.content.contains(keyword),
                    Content.author.contains(keyword)
                )
            )
    
    # 分类筛选
    if filters.get('category'):
        if hasattr(model, 'category'):
            query = query.filter(model.category == filters['category'])
    
    # 类型筛选
    if filters.get('type'):
        if hasattr(model, 'type'):
            query = query.filter(model.type == filters['type'])
    
    # 省份筛选
    if filters.get('province'):
        if hasattr(model, 'province'):
            query = query.filter(model.province == filters['province'])
    
    # 价格范围筛选
    if filters.get('price_range'):
        min_price, max_price = parse_price_range(filters['price_range'])
        if hasattr(model, 'price'):
            if min_price is not None:
                query = query.filter(model.price >= min_price)
            if max_price is not None:
                query = query.filter(model.price <= max_price)
    
    # 时间范围筛选
    if filters.get('date_range'):
        start_date, end_date = parse_date_range(filters['date_range'])
        if start_date:
            query = query.filter(model.created_at >= start_date)
        if end_date:
            query = query.filter(model.created_at <= end_date)
    
    # 标签筛选
    if filters.get('tag'):
        if hasattr(model, 'tag'):
            query = query.filter(model.tag == filters['tag'])
    
    # 状态筛选
    if filters.get('status'):
        if hasattr(model, 'status'):
            query = query.filter(model.status == filters['status'])
    
    return query

# 基础路由
@app.route('/')
def index():
    return jsonify({
        'status': 'success',
        'message': '茶叶一点通API服务器',
        'version': '2.0.0',
        'endpoints': {
            'health': '/health',
            'markets': '/api/markets',
            'newarrivals': '/api/newarrivals',
            'supplies': '/api/supplies',
            'clearance': '/api/clearance',
            'content': '/api/content',
            'inquiry': '/api/inquiry',
            'brands': '/api/brands',
            'gardens': '/api/gardens'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'ok',
        'message': '茶叶一点通API服务正常运行',
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '2.0.0'
    })

# 认证相关API
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'status': 'error', 'message': '用户名和密码不能为空'}), 400
    
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        session['username'] = user.username
        session['role'] = user.role
        
        log_action('login', f'用户 {username} 登录成功')
        
        return jsonify({
            'status': 'success',
            'message': '登录成功',
            'data': {
                'user_id': user.id,
                'username': user.username,
                'role': user.role
            }
        })
    
    return jsonify({'status': 'error', 'message': '用户名或密码错误'}), 401

@app.route('/api/auth/logout')
def logout():
    if 'username' in session:
        log_action('logout', f'用户 {session["username"]} 登出')
    
    session.clear()
    return jsonify({'status': 'success', 'message': '登出成功'})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'status': 'error', 'message': '用户名和密码不能为空'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'status': 'error', 'message': '用户名已存在'}), 400
    
    user = User(username=username, role='user')
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    log_action('register', f'新用户注册: {username}')
    
    return jsonify({'status': 'success', 'message': '注册成功'})

# 市场相关API
@app.route('/api/markets')
def get_markets():
    """获取市场数据"""
    try:
        page, per_page = get_pagination_params()
        province = request.args.get('province')
        search = request.args.get('search')
        
        query = Market.query
        
        if province:
            query = query.filter(Market.province == province)
        
        if search:
            query = query.filter(
                db.or_(
                    Market.name.contains(search),
                    Market.city.contains(search),
                    Market.description.contains(search)
                )
            )
        
        markets = query.paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': market.id,
            'name': market.name,
            'province': market.province,
            'city': market.city,
            'address': market.address,
            'phone': market.phone,
            'description': market.description,
            'created_at': market.created_at.isoformat()
        } for market in markets.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': markets.total,
                'pages': markets.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取市场数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取市场数据失败'}), 500

@app.route('/api/markets/provinces')
def get_provinces():
    """获取省份数据"""
    try:
        provinces = db.session.query(Market.province, db.func.count(Market.id).label('market_count'))\
            .group_by(Market.province)\
            .all()
        
        data = [{
            'id': i + 1,
            'name': province.province,
            'marketCount': province.market_count
        } for i, province in enumerate(provinces)]
        
        return jsonify({
            'status': 'success',
            'data': data
        })
    except Exception as e:
        app.logger.error(f'获取省份数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取省份数据失败'}), 500

@app.route('/api/markets/<int:market_id>')
def get_market_detail(market_id):
    """获取市场详情"""
    try:
        market = Market.query.get_or_404(market_id)
        return jsonify({
            'status': 'success',
            'data': {
                'id': market.id,
                'name': market.name,
                'province': market.province,
                'city': market.city,
                'address': market.address,
                'phone': market.phone,
                'description': market.description,
                'created_at': market.created_at.isoformat()
            }
        })
    except Exception as e:
        app.logger.error(f'获取市场详情失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取市场详情失败'}), 500

@app.route('/api/markets', methods=['POST'])
@admin_required
def create_market():
    data = request.get_json()
    
    market = Market(
        name=data['name'],
        province=data['province'],
        city=data['city'],
        address=data['address'],
        phone=data.get('phone'),
        description=data.get('description')
    )
    
    db.session.add(market)
    db.session.commit()
    
    log_action('create_market', f'创建市场: {market.name}')
    
    return jsonify({'status': 'success', 'message': '市场创建成功', 'data': {'id': market.id}})

# 新品到货API
@app.route('/api/newarrivals', methods=['GET', 'POST'])
def newarrivals():
    """新品到货API - 支持GET和POST"""
    if request.method == 'GET':
        """获取新品数据"""
        try:
            page, per_page = get_pagination_params()
            category = request.args.get('category')
            search = request.args.get('search')
            
            query = NewArrival.query
            
            if category:
                query = query.filter(NewArrival.category == category)
            
            if search:
                query = query.filter(
                    db.or_(
                        NewArrival.name.contains(search),
                        NewArrival.description.contains(search),
                        NewArrival.merchant.contains(search)
                    )
                )
            
            newarrivals = query.order_by(NewArrival.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
            
            data = [{
                'id': item.id,
                'name': item.name,
                'price': item.price,
                'category': item.category,
                'origin': item.origin,
                'description': item.description,
                'merchant': item.merchant,
                'created_at': item.created_at.isoformat()
            } for item in newarrivals.items]
            
            return jsonify({
                'status': 'success',
                'data': data,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': newarrivals.total,
                    'pages': newarrivals.pages
                }
            })
        except Exception as e:
            app.logger.error(f'获取新品数据失败: {str(e)}')
            return jsonify({'status': 'error', 'message': '获取新品数据失败'}), 500
    
    elif request.method == 'POST':
        """发布新品"""
        try:
            data = request.get_json()
            
            # 验证必填字段
            required_fields = ['name', 'category', 'priceRange']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'status': 'error', 'message': f'缺少必填字段: {field}'}), 400
            
            # 解析价格范围
            price_range = data.get('priceRange', '')
            price_match = re.search(r'(\d+)-(\d+)', price_range)
            if price_match:
                min_price = float(price_match.group(1))
                max_price = float(price_match.group(2))
                avg_price = (min_price + max_price) / 2
            else:
                avg_price = 0
            
            # 创建新品记录
            new_arrival = NewArrival(
                name=data['name'],
                price=avg_price,
                category=data['category'],
                origin=data.get('origin', ''),
                description=data.get('description', ''),
                merchant=data.get('merchant', '未知商户')
            )
            
            # 注意：NewArrival模型中没有stock字段，所以不需要处理库存数量
            
            db.session.add(new_arrival)
            db.session.commit()
            
            app.logger.info(f'新品发布成功: {data["name"]}')
            
            return jsonify({
                'status': 'success',
                'message': '新品发布成功',
                'data': {
                    'id': new_arrival.id,
                    'name': new_arrival.name,
                    'category': new_arrival.category
                }
            })
            
        except Exception as e:
            app.logger.error(f'发布新品失败: {str(e)}')
            db.session.rollback()
            return jsonify({'status': 'error', 'message': '发布新品失败'}), 500

@app.route('/api/newarrivals/<int:item_id>')
def get_newarrival_detail(item_id):
    item = NewArrival.query.get_or_404(item_id)
    return jsonify({
        'status': 'success',
        'data': {
            'id': item.id,
            'name': item.name,
            'price': item.price,
            'category': item.category,
            'origin': item.origin,
            'description': item.description,
            'merchant': item.merchant,
            'created_at': item.created_at.isoformat()
        }
    })

# 供求信息API
@app.route('/api/supplies')
def get_supplies():
    """获取供求数据"""
    try:
        page, per_page = get_pagination_params()
        supply_type = request.args.get('type')
        search = request.args.get('search')
        
        query = Supply.query
        
        if supply_type:
            query = query.filter(Supply.type == supply_type)
        
        if search:
            query = query.filter(
                db.or_(
                    Supply.title.contains(search),
                    Supply.description.contains(search),
                    Supply.contact.contains(search)
                )
            )
        
        supplies = query.order_by(Supply.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'type': item.type,
            'title': item.title,
            'price': item.price,
            'quantity': item.quantity,
            'contact': item.contact,
            'description': item.description,
            'status': item.status,
            'created_at': item.created_at.isoformat()
        } for item in supplies.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': supplies.total,
                'pages': supplies.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取供求数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取供求数据失败'}), 500

@app.route('/api/supplies', methods=['POST'])
@login_required
def create_supply():
    data = request.get_json()
    
    supply = Supply(
        type=data['type'],
        title=data['title'],
        price=data.get('price'),
        quantity=data.get('quantity'),
        contact=data.get('contact'),
        description=data.get('description')
    )
    
    db.session.add(supply)
    db.session.commit()
    
    log_action('create_supply', f'创建供求信息: {supply.title}')
    
    return jsonify({'status': 'success', 'message': '供求信息发布成功', 'data': {'id': supply.id}})

# 清仓特价API
@app.route('/api/clearance')
def get_clearance():
    """获取清仓数据"""
    try:
        page, per_page = get_pagination_params()
        category = request.args.get('category')
        search = request.args.get('search')
        
        query = Clearance.query
        
        if category:
            query = query.filter(Clearance.category == category)
        
        if search:
            query = query.filter(
                db.or_(
                    Clearance.name.contains(search),
                    Clearance.description.contains(search),
                    Clearance.merchant.contains(search)
                )
            )
        
        clearances = query.order_by(Clearance.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'name': item.name,
            'original_price': item.original_price,
            'sale_price': item.sale_price,
            'category': item.category,
            'stock': item.stock,
            'description': item.description,
            'merchant': item.merchant,
            'created_at': item.created_at.isoformat()
        } for item in clearances.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': clearances.total,
                'pages': clearances.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取清仓数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取清仓数据失败'}), 500

# 导入内容管理API
from content_management_api import content_api

# 注册内容管理API蓝图
app.register_blueprint(content_api)

# 保留原有的简单内容API作为兼容
@app.route('/api/content')
def get_content():
    """获取内容数据（兼容版本）"""
    try:
        page, per_page = get_pagination_params()
        content_type = request.args.get('type', 'recommend')
        search = request.args.get('search')
        
        query = Content.query.filter(Content.type == content_type)
        
        if search:
            query = query.filter(
                db.or_(
                    Content.title.contains(search),
                    Content.content.contains(search),
                    Content.author.contains(search)
                )
            )
        
        contents = query.order_by(Content.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'title': item.title,
            'content': item.content,
            'type': item.type,
            'author': item.author,
            'tag': item.tag,
            'image': item.image,
            'created_at': item.created_at.isoformat()
        } for item in contents.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': contents.total,
                'pages': contents.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取内容数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取内容数据失败'}), 500

@app.route('/api/content', methods=['POST'])
@admin_required
def create_content():
    """创建内容（兼容版本）"""
    data = request.get_json()
    
    content = Content(
        title=data['title'],
        content=data['content'],
        type=data['type'],
        author=data.get('author'),
        tag=data.get('tag'),
        image=data.get('image')
    )
    
    db.session.add(content)
    db.session.commit()
    
    log_action('create_content', f'创建内容: {content.title}')
    
    return jsonify({'status': 'success', 'message': '内容创建成功', 'data': {'id': content.id}})

# 采购询价API
@app.route('/api/inquiry')
def get_inquiry():
    page, per_page = get_pagination_params()
    
    inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'status': 'success',
        'data': [{
            'id': i.id,
            'title': i.title,
            'description': i.description,
            'requirements': i.requirements,
            'user_name': i.user_name,
            'contact': i.contact,
            'status': i.status,
            'quote_count': i.quote_count,
            'created_at': i.created_at.isoformat()
        } for i in inquiries.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': inquiries.total,
            'pages': inquiries.pages
        }
    })

@app.route('/api/inquiry', methods=['POST'])
@login_required
def create_inquiry():
    data = request.get_json()
    
    inquiry = Inquiry(
        title=data['title'],
        description=data.get('description'),
        requirements=data.get('requirements'),
        user_name=data.get('user_name'),
        contact=data.get('contact')
    )
    
    db.session.add(inquiry)
    db.session.commit()
    
    log_action('create_inquiry', f'创建询价: {inquiry.title}')
    
    return jsonify({'status': 'success', 'message': '询价发布成功', 'data': {'id': inquiry.id}})

# 品牌管理API
@app.route('/api/brands')
def get_brands():
    page, per_page = get_pagination_params()
    
    brands = Brand.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'status': 'success',
        'data': [{
            'id': b.id,
            'name': b.name,
            'slogan': b.slogan,
            'headquarters': b.headquarters,
            'product_lines': json.loads(b.product_lines) if b.product_lines else [],
            'is_certified': b.is_certified,
            'created_at': b.created_at.isoformat()
        } for b in brands.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': brands.total,
            'pages': brands.pages
        }
    })

# 茶园直通API
@app.route('/api/gardens')
def get_gardens():
    page, per_page = get_pagination_params()
    
    gardens = Garden.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'status': 'success',
        'data': [{
            'id': g.id,
            'title': g.title,
            'location': g.location,
            'varieties': json.loads(g.varieties) if g.varieties else [],
            'contact': g.contact,
            'certification': g.certification,
            'description': g.description,
            'created_at': g.created_at.isoformat()
        } for g in gardens.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': gardens.total,
            'pages': gardens.pages
        }
    })

# 品类行情API
@app.route('/api/market-price')
def get_market_price():
    """获取品类行情价格信息"""
    try:
        page, per_page = get_pagination_params()
        
        # 获取查询参数
        category = request.args.get('category')
        city = request.args.get('city')
        
        # 这里应该查询市场价格表，但暂时返回空数据
        # 因为我们已经清理了示例数据
        price_list = []
        
        return jsonify({
            'status': 'success',
            'data': price_list,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': 0,
                'pages': 0
            }
        })
        
    except Exception as e:
        app.logger.error(f'获取市场价格失败: {e}')
        return jsonify({
            'status': 'error',
            'message': '获取市场价格失败'
        }), 500

# 系统管理API
@app.route('/api/logs')
@admin_required
def get_logs():
    page, per_page = get_pagination_params()
    
    logs = SystemLog.query.order_by(SystemLog.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'status': 'success',
        'data': [{
            'id': l.id,
            'user_id': l.user_id,
            'action': l.action,
            'description': l.description,
            'ip_address': l.ip_address,
            'user_agent': l.user_agent,
            'created_at': l.created_at.isoformat()
        } for l in logs.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': logs.total,
            'pages': logs.pages
        }
    })

@app.route('/api/stats')
@admin_required
def get_stats():
    """获取系统统计信息"""
    stats = {
        'markets_count': Market.query.count(),
        'newarrivals_count': NewArrival.query.count(),
        'supplies_count': Supply.query.count(),
        'clearance_count': Clearance.query.count(),
        'content_count': Content.query.count(),
        'inquiry_count': Inquiry.query.count(),
        'brands_count': Brand.query.count(),
        'gardens_count': Garden.query.count(),
        'users_count': User.query.count(),
        'logs_count': SystemLog.query.count()
    }
    
    return jsonify({'status': 'success', 'data': stats})

# 数据导出API
@app.route('/api/export/<data_type>')
@admin_required
def export_data(data_type):
    """导出数据"""
    try:
        if data_type == 'markets':
            data = Market.query.all()
            filename = f'markets_{datetime.datetime.now().strftime("%Y%m%d")}.csv'
        elif data_type == 'supplies':
            data = Supply.query.all()
            filename = f'supplies_{datetime.datetime.now().strftime("%Y%m%d")}.csv'
        elif data_type == 'newarrivals':
            data = NewArrival.query.all()
            filename = f'newarrivals_{datetime.datetime.now().strftime("%Y%m%d")}.csv'
        else:
            return jsonify({'status': 'error', 'message': '不支持的数据类型'}), 400
        
        # 创建CSV数据
        output = io.StringIO()
        writer = csv.writer(output)
        
        # 写入表头
        if data_type == 'markets':
            writer.writerow(['ID', '名称', '省份', '城市', '地址', '电话', '描述', '创建时间'])
            for item in data:
                writer.writerow([item.id, item.name, item.province, item.city, item.address, item.phone, item.description, item.created_at])
        elif data_type == 'supplies':
            writer.writerow(['ID', '类型', '标题', '价格', '数量', '联系方式', '描述', '状态', '创建时间'])
            for item in data:
                writer.writerow([item.id, item.type, item.title, item.price, item.quantity, item.contact, item.description, item.status, item.created_at])
        elif data_type == 'newarrivals':
            writer.writerow(['ID', '名称', '价格', '分类', '产地', '描述', '商家', '创建时间'])
            for item in data:
                writer.writerow([item.id, item.name, item.price, item.category, item.origin, item.description, item.merchant, item.created_at])
        
        output.seek(0)
        
        log_action('export_data', f'导出{data_type}数据')
        
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        app.logger.error(f'导出数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '导出数据失败'}), 500

# 高级搜索和筛选API
@app.route('/api/advanced-search/markets')
def advanced_search_markets():
    """高级搜索市场数据"""
    try:
        page, per_page = get_pagination_params()
        filters = request.args.to_dict()
        
        query = build_advanced_query(Market, filters)
        markets = query.paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': market.id,
            'name': market.name,
            'province': market.province,
            'city': market.city,
            'address': market.address,
            'phone': market.phone,
            'description': market.description,
            'created_at': market.created_at.isoformat()
        } for market in markets.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': markets.total,
                'pages': markets.pages
            },
            'filters': filters
        })
    except Exception as e:
        app.logger.error(f'高级搜索市场数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '搜索失败'}), 500

@app.route('/api/advanced-search/newarrivals')
def advanced_search_newarrivals():
    """高级搜索新品数据"""
    try:
        page, per_page = get_pagination_params()
        filters = request.args.to_dict()
        
        query = build_advanced_query(NewArrival, filters)
        newarrivals = query.order_by(NewArrival.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'name': item.name,
            'price': item.price,
            'category': item.category,
            'origin': item.origin,
            'description': item.description,
            'merchant': item.merchant,
            'created_at': item.created_at.isoformat()
        } for item in newarrivals.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': newarrivals.total,
                'pages': newarrivals.pages
            },
            'filters': filters
        })
    except Exception as e:
        app.logger.error(f'高级搜索新品数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '搜索失败'}), 500

@app.route('/api/advanced-search/supplies')
def advanced_search_supplies():
    """高级搜索供求数据"""
    try:
        page, per_page = get_pagination_params()
        filters = request.args.to_dict()
        
        query = build_advanced_query(Supply, filters)
        supplies = query.order_by(Supply.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'type': item.type,
            'title': item.title,
            'price': item.price,
            'quantity': item.quantity,
            'contact': item.contact,
            'description': item.description,
            'status': item.status,
            'created_at': item.created_at.isoformat()
        } for item in supplies.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': supplies.total,
                'pages': supplies.pages
            },
            'filters': filters
        })
    except Exception as e:
        app.logger.error(f'高级搜索供求数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '搜索失败'}), 500

@app.route('/api/advanced-search/clearance')
def advanced_search_clearance():
    """高级搜索清仓数据"""
    try:
        page, per_page = get_pagination_params()
        filters = request.args.to_dict()
        
        query = build_advanced_query(Clearance, filters)
        clearances = query.order_by(Clearance.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'name': item.name,
            'original_price': item.original_price,
            'sale_price': item.sale_price,
            'category': item.category,
            'stock': item.stock,
            'description': item.description,
            'merchant': item.merchant,
            'created_at': item.created_at.isoformat()
        } for item in clearances.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': clearances.total,
                'pages': clearances.pages
            },
            'filters': filters
        })
    except Exception as e:
        app.logger.error(f'高级搜索清仓数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '搜索失败'}), 500

@app.route('/api/advanced-search/content')
def advanced_search_content():
    """高级搜索内容数据"""
    try:
        page, per_page = get_pagination_params()
        filters = request.args.to_dict()
        
        query = build_advanced_query(Content, filters)
        contents = query.order_by(Content.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
        data = [{
            'id': item.id,
            'title': item.title,
            'content': item.content,
            'type': item.type,
            'author': item.author,
            'tag': item.tag,
            'image': item.image,
            'created_at': item.created_at.isoformat()
        } for item in contents.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': contents.total,
                'pages': contents.pages
            },
            'filters': filters
        })
    except Exception as e:
        app.logger.error(f'高级搜索内容数据失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '搜索失败'}), 500

# 获取筛选选项API
@app.route('/api/filter-options')
def get_filter_options():
    """获取筛选选项"""
    try:
        data_type = request.args.get('type', 'all')
        
        options = {}
        
        if data_type in ['all', 'markets']:
            # 市场筛选选项
            provinces = db.session.query(Market.province).distinct().all()
            options['provinces'] = [p[0] for p in provinces if p[0]]
        
        if data_type in ['all', 'newarrivals', 'clearance']:
            # 分类筛选选项
            categories = []
            if data_type in ['all', 'newarrivals']:
                newarrival_categories = db.session.query(NewArrival.category).distinct().all()
                categories.extend([c[0] for c in newarrival_categories if c[0]])
            if data_type in ['all', 'clearance']:
                clearance_categories = db.session.query(Clearance.category).distinct().all()
                categories.extend([c[0] for c in clearance_categories if c[0]])
            options['categories'] = list(set(categories))
        
        if data_type in ['all', 'supplies']:
            # 供求类型选项
            supply_types = db.session.query(Supply.type).distinct().all()
            options['types'] = [t[0] for t in supply_types if t[0]]
        
        if data_type in ['all', 'content']:
            # 内容类型选项
            content_types = db.session.query(Content.type).distinct().all()
            options['content_types'] = [t[0] for t in content_types if t[0]]
            
            # 标签选项
            tags = db.session.query(Content.tag).distinct().all()
            options['tags'] = [t[0] for t in tags if t[0]]
        
        return jsonify({
            'status': 'success',
            'data': options
        })
    except Exception as e:
        app.logger.error(f'获取筛选选项失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取筛选选项失败'}), 500

# 用户系统增强API

# 用户资料管理
@app.route('/api/user/profile', methods=['GET'])
@login_required
def get_user_profile():
    """获取用户资料"""
    try:
        user_id = session['user_id']
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        
        if profile:
            data = {
                'id': profile.id,
                'user_id': profile.user_id,
                'nickname': profile.nickname,
                'avatar': profile.avatar,
                'phone': profile.phone,
                'email': profile.email,
                'gender': profile.gender,
                'birthday': profile.birthday.isoformat() if profile.birthday else None,
                'location': profile.location,
                'company': profile.company,
                'position': profile.position,
                'bio': profile.bio,
                'preferences': json.loads(profile.preferences) if profile.preferences else {},
                'created_at': profile.created_at.isoformat(),
                'updated_at': profile.updated_at.isoformat()
            }
        else:
            data = None
        
        return jsonify({
            'status': 'success',
            'data': data
        })
    except Exception as e:
        app.logger.error(f'获取用户资料失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户资料失败'}), 500

@app.route('/api/user/profile', methods=['PUT'])
@login_required
def update_user_profile():
    """更新用户资料"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = UserProfile(user_id=user_id)
            db.session.add(profile)
        
        # 更新字段
        if 'nickname' in data:
            profile.nickname = data['nickname']
        if 'avatar' in data:
            profile.avatar = data['avatar']
        if 'phone' in data:
            profile.phone = data['phone']
        if 'email' in data:
            profile.email = data['email']
        if 'gender' in data:
            profile.gender = data['gender']
        if 'birthday' in data and data['birthday']:
            profile.birthday = datetime.datetime.strptime(data['birthday'], '%Y-%m-%d').date()
        if 'location' in data:
            profile.location = data['location']
        if 'company' in data:
            profile.company = data['company']
        if 'position' in data:
            profile.position = data['position']
        if 'bio' in data:
            profile.bio = data['bio']
        if 'preferences' in data:
            profile.preferences = json.dumps(data['preferences'])
        
        db.session.commit()
        
        log_action('update_profile', f'用户{user_id}更新资料')
        
        return jsonify({
            'status': 'success',
            'message': '资料更新成功'
        })
    except Exception as e:
        app.logger.error(f'更新用户资料失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '更新用户资料失败'}), 500

# 用户收藏管理
@app.route('/api/user/favorites', methods=['GET'])
@login_required
def get_user_favorites():
    """获取用户收藏列表"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        item_type = request.args.get('type')
        
        query = UserFavorite.query.filter_by(user_id=user_id)
        if item_type:
            query = query.filter_by(item_type=item_type)
        
        favorites = query.order_by(UserFavorite.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        data = [{
            'id': fav.id,
            'item_type': fav.item_type,
            'item_id': fav.item_id,
            'title': fav.title,
            'description': fav.description,
            'created_at': fav.created_at.isoformat()
        } for fav in favorites.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': favorites.total,
                'pages': favorites.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户收藏失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户收藏失败'}), 500

@app.route('/api/user/favorites', methods=['POST'])
@login_required
def add_user_favorite():
    """添加收藏"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        # 检查是否已收藏
        existing = UserFavorite.query.filter_by(
            user_id=user_id,
            item_type=data['item_type'],
            item_id=data['item_id']
        ).first()
        
        if existing:
            return jsonify({'status': 'error', 'message': '已经收藏过了'}), 400
        
        # 创建收藏
        favorite = UserFavorite(
            user_id=user_id,
            item_type=data['item_type'],
            item_id=data['item_id'],
            title=data.get('title', ''),
            description=data.get('description', '')
        )
        
        db.session.add(favorite)
        db.session.commit()
        
        log_action('add_favorite', f'用户{user_id}收藏{item_type}:{item_id}')
        
        return jsonify({
            'status': 'success',
            'message': '收藏成功'
        })
    except Exception as e:
        app.logger.error(f'添加收藏失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '添加收藏失败'}), 500

@app.route('/api/user/favorites/<int:favorite_id>', methods=['DELETE'])
@login_required
def remove_user_favorite(favorite_id):
    """取消收藏"""
    try:
        user_id = session['user_id']
        
        favorite = UserFavorite.query.filter_by(id=favorite_id, user_id=user_id).first()
        if not favorite:
            return jsonify({'status': 'error', 'message': '收藏不存在'}), 404
        
        db.session.delete(favorite)
        db.session.commit()
        
        log_action('remove_favorite', f'用户{user_id}取消收藏{favorite.item_type}:{favorite.item_id}')
        
        return jsonify({
            'status': 'success',
            'message': '取消收藏成功'
        })
    except Exception as e:
        app.logger.error(f'取消收藏失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '取消收藏失败'}), 500

# 用户浏览历史
@app.route('/api/user/history', methods=['GET'])
@login_required
def get_user_history():
    """获取用户浏览历史"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        item_type = request.args.get('type')
        
        query = UserHistory.query.filter_by(user_id=user_id)
        if item_type:
            query = query.filter_by(item_type=item_type)
        
        history = query.order_by(UserHistory.viewed_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        data = [{
            'id': hist.id,
            'item_type': hist.item_type,
            'item_id': hist.item_id,
            'title': hist.title,
            'description': hist.description,
            'viewed_at': hist.viewed_at.isoformat()
        } for hist in history.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': history.total,
                'pages': history.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户历史失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户历史失败'}), 500

@app.route('/api/user/history', methods=['POST'])
@login_required
def add_user_history():
    """添加浏览历史"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        # 检查是否已有相同的历史记录
        existing = UserHistory.query.filter_by(
            user_id=user_id,
            item_type=data['item_type'],
            item_id=data['item_id']
        ).first()
        
        if existing:
            # 更新浏览时间
            existing.viewed_at = datetime.datetime.utcnow()
            existing.title = data.get('title', existing.title)
            existing.description = data.get('description', existing.description)
        else:
            # 创建新的历史记录
            history = UserHistory(
                user_id=user_id,
                item_type=data['item_type'],
                item_id=data['item_id'],
                title=data.get('title', ''),
                description=data.get('description', '')
            )
            db.session.add(history)
        
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': '历史记录已更新'
        })
    except Exception as e:
        app.logger.error(f'添加浏览历史失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '添加浏览历史失败'}), 500

@app.route('/api/user/history', methods=['DELETE'])
@login_required
def clear_user_history():
    """清空浏览历史"""
    try:
        user_id = session['user_id']
        item_type = request.args.get('type')
        
        query = UserHistory.query.filter_by(user_id=user_id)
        if item_type:
            query = query.filter_by(item_type=item_type)
        
        query.delete()
        db.session.commit()
        
        log_action('clear_history', f'用户{user_id}清空历史记录')
        
        return jsonify({
            'status': 'success',
            'message': '历史记录已清空'
        })
    except Exception as e:
        app.logger.error(f'清空浏览历史失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '清空浏览历史失败'}), 500

# 用户消息通知
@app.route('/api/user/notifications', methods=['GET'])
@login_required
def get_user_notifications():
    """获取用户消息通知"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        is_read = request.args.get('is_read')
        notification_type = request.args.get('type')
        
        query = UserNotification.query.filter_by(user_id=user_id)
        
        if is_read is not None:
            query = query.filter_by(is_read=is_read == 'true')
        
        if notification_type:
            query = query.filter_by(type=notification_type)
        
        notifications = query.order_by(UserNotification.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        data = [{
            'id': notif.id,
            'type': notif.type,
            'title': notif.title,
            'content': notif.content,
            'is_read': notif.is_read,
            'priority': notif.priority,
            'action_url': notif.action_url,
            'created_at': notif.created_at.isoformat()
        } for notif in notifications.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': notifications.total,
                'pages': notifications.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户通知失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户通知失败'}), 500

@app.route('/api/user/notifications/<int:notification_id>/read', methods=['PUT'])
@login_required
def mark_notification_read(notification_id):
    """标记通知为已读"""
    try:
        user_id = session['user_id']
        
        notification = UserNotification.query.filter_by(
            id=notification_id, user_id=user_id
        ).first()
        
        if not notification:
            return jsonify({'status': 'error', 'message': '通知不存在'}), 404
        
        notification.is_read = True
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': '已标记为已读'
        })
    except Exception as e:
        app.logger.error(f'标记通知已读失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '标记通知已读失败'}), 500

@app.route('/api/user/notifications/read-all', methods=['PUT'])
@login_required
def mark_all_notifications_read():
    """标记所有通知为已读"""
    try:
        user_id = session['user_id']
        
        UserNotification.query.filter_by(
            user_id=user_id, is_read=False
        ).update({'is_read': True})
        
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': '所有通知已标记为已读'
        })
    except Exception as e:
        app.logger.error(f'标记所有通知已读失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '标记所有通知已读失败'}), 500

# 用户关注管理
@app.route('/api/user/follows', methods=['GET'])
@login_required
def get_user_follows():
    """获取用户关注列表"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        
        follows = UserFollow.query.filter_by(follower_id=user_id).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        data = []
        for follow in follows.items:
            following_user = User.query.get(follow.following_id)
            if following_user:
                data.append({
                    'id': follow.id,
                    'following_id': follow.following_id,
                    'username': following_user.username,
                    'created_at': follow.created_at.isoformat()
                })
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': follows.total,
                'pages': follows.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户关注失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户关注失败'}), 500

@app.route('/api/user/follows', methods=['POST'])
@login_required
def add_user_follow():
    """关注用户"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        following_id = data['following_id']
        
        # 不能关注自己
        if user_id == following_id:
            return jsonify({'status': 'error', 'message': '不能关注自己'}), 400
        
        # 检查是否已关注
        existing = UserFollow.query.filter_by(
            follower_id=user_id, following_id=following_id
        ).first()
        
        if existing:
            return jsonify({'status': 'error', 'message': '已经关注过了'}), 400
        
        # 检查被关注用户是否存在
        following_user = User.query.get(following_id)
        if not following_user:
            return jsonify({'status': 'error', 'message': '用户不存在'}), 404
        
        # 创建关注关系
        follow = UserFollow(
            follower_id=user_id,
            following_id=following_id
        )
        
        db.session.add(follow)
        db.session.commit()
        
        log_action('add_follow', f'用户{user_id}关注用户{following_id}')
        
        return jsonify({
            'status': 'success',
            'message': '关注成功'
        })
    except Exception as e:
        app.logger.error(f'关注用户失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '关注用户失败'}), 500

@app.route('/api/user/follows/<int:following_id>', methods=['DELETE'])
@login_required
def remove_user_follow(following_id):
    """取消关注"""
    try:
        user_id = session['user_id']
        
        follow = UserFollow.query.filter_by(
            follower_id=user_id, following_id=following_id
        ).first()
        
        if not follow:
            return jsonify({'status': 'error', 'message': '关注关系不存在'}), 404
        
        db.session.delete(follow)
        db.session.commit()
        
        log_action('remove_follow', f'用户{user_id}取消关注用户{following_id}')
        
        return jsonify({
            'status': 'success',
            'message': '取消关注成功'
        })
    except Exception as e:
        app.logger.error(f'取消关注失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '取消关注失败'}), 500

# 用户私信管理
@app.route('/api/user/messages', methods=['GET'])
@login_required
def get_user_messages():
    """获取用户私信列表"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        other_user_id = request.args.get('user_id')
        
        if other_user_id:
            # 获取与特定用户的对话
            messages = UserMessage.query.filter(
                db.or_(
                    db.and_(UserMessage.sender_id == user_id, UserMessage.receiver_id == other_user_id),
                    db.and_(UserMessage.sender_id == other_user_id, UserMessage.receiver_id == user_id)
                )
            ).order_by(UserMessage.created_at.desc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
        else:
            # 获取所有对话列表
            # 这里需要更复杂的查询来获取对话列表，简化处理
            messages = UserMessage.query.filter(
                db.or_(
                    UserMessage.sender_id == user_id,
                    UserMessage.receiver_id == user_id
                )
            ).order_by(UserMessage.created_at.desc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
        
        data = [{
            'id': msg.id,
            'sender_id': msg.sender_id,
            'receiver_id': msg.receiver_id,
            'content': msg.content,
            'is_read': msg.is_read,
            'message_type': msg.message_type,
            'created_at': msg.created_at.isoformat()
        } for msg in messages.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': messages.total,
                'pages': messages.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户私信失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户私信失败'}), 500

@app.route('/api/user/messages', methods=['POST'])
@login_required
def send_user_message():
    """发送私信"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        message = UserMessage(
            sender_id=user_id,
            receiver_id=data['receiver_id'],
            content=data['content'],
            message_type=data.get('message_type', 'text')
        )
        
        db.session.add(message)
        db.session.commit()
        
        log_action('send_message', f'用户{user_id}发送私信给用户{data["receiver_id"]}')
        
        return jsonify({
            'status': 'success',
            'message': '发送成功'
        })
    except Exception as e:
        app.logger.error(f'发送私信失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '发送私信失败'}), 500

# 用户活动记录
@app.route('/api/user/activities', methods=['GET'])
@login_required
def get_user_activities():
    """获取用户活动记录"""
    try:
        user_id = session['user_id']
        page, per_page = get_pagination_params()
        activity_type = request.args.get('type')
        
        query = UserActivity.query.filter_by(user_id=user_id)
        if activity_type:
            query = query.filter_by(activity_type=activity_type)
        
        activities = query.order_by(UserActivity.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        data = [{
            'id': activity.id,
            'activity_type': activity.activity_type,
            'description': activity.description,
            'activity_data': json.loads(activity.activity_data) if activity.activity_data else {},
            'created_at': activity.created_at.isoformat()
        } for activity in activities.items]
        
        return jsonify({
            'status': 'success',
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': activities.total,
                'pages': activities.pages
            }
        })
    except Exception as e:
        app.logger.error(f'获取用户活动失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '获取用户活动失败'}), 500

@app.route('/api/user/activities', methods=['POST'])
@login_required
def add_user_activity():
    """添加用户活动记录"""
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        activity = UserActivity(
            user_id=user_id,
            activity_type=data['activity_type'],
            description=data.get('description', ''),
            activity_data=json.dumps(data.get('activity_data', {})),
            ip_address=request.remote_addr,
            user_agent=request.headers.get('User-Agent', '')
        )
        
        db.session.add(activity)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': '活动记录已添加'
        })
    except Exception as e:
        app.logger.error(f'添加用户活动失败: {str(e)}')
        return jsonify({'status': 'error', 'message': '添加用户活动失败'}), 500

# 初始化数据库
def init_db():
    """初始化数据库和默认数据"""
    with app.app_context():
        db.create_all()
        
        # 创建默认管理员账户
        if not User.query.filter_by(username='admin').first():
            admin = User(username='admin', role='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            
            # 创建默认数据管理员
            dataadmin = User(username='dataadmin', role='dataadmin')
            dataadmin.set_password('dataadmin123')
            db.session.add(dataadmin)
            
            # 创建默认审核员
            auditor = User(username='auditor', role='auditor')
            auditor.set_password('auditor123')
            db.session.add(auditor)
            
            db.session.commit()
            app.logger.info('默认用户账户已创建')
        
        # 添加示例市场数据
        if Market.query.count() == 0:
            sample_markets = [
                Market(name='北京马连道茶叶市场', province='北京', city='北京', 
                      address='马连道路11号', phone='010-63346677'),
                Market(name='上海天山茶城', province='上海', city='上海', 
                      address='中山西路520号', phone='021-62737000'),
                Market(name='广州芳村茶叶市场', province='广东', city='广州', 
                      address='芳村大道中508号', phone='020-81502688'),
                Market(name='杭州中国茶叶博物馆茶市', province='浙江', city='杭州', 
                      address='龙井路双峰村', phone='0571-87964221'),
                Market(name='福州五里亭茶叶批发市场', province='福建', city='福州', 
                      address='五里亭路18号', phone='0591-83611234')
            ]
            for market in sample_markets:
                db.session.add(market)
            
            db.session.commit()
            app.logger.info('示例市场数据已添加')
        
        # 不添加示例新品数据，等待真实数据
        app.logger.info('新品数据保持为空，等待真实数据导入')
        
        # 不添加示例内容数据，保持内容为空
        app.logger.info('内容数据保持为空')

# 错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'status': 'error', 'message': '接口不存在'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'status': 'error', 'message': '服务器内部错误'}), 500

if __name__ == '__main__':
    # 初始化数据库
    init_db()
    
    # 启动服务器
    app.run(
        host='0.0.0.0',
        port=3000,
        debug=True,
        threaded=True
    ) 