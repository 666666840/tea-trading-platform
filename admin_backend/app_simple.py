#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶平台独立管理后台 - 简化版
使用SQLite数据库，无需安装MySQL
"""

import os
import sys
import json
import logging
from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('admin.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 创建Flask应用
app = Flask(__name__)
from config import get_config

# 获取配置
config = get_config()
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tea_admin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_PATH', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_FILE_SIZE', 10485760))

# 初始化数据库
db = SQLAlchemy(app)

# 初始化登录管理器
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# 数据模型
class AdminUser(UserMixin, db.Model):
    """管理员用户模型"""
    __tablename__ = 'admin_users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='admin')  # super_admin, admin, data_admin
    is_active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class SystemLog(db.Model):
    """系统日志模型"""
    __tablename__ = 'system_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('admin_users.id'))
    action = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TeaMarket(db.Model):
    """茶叶市场数据模型"""
    __tablename__ = 'tea_markets'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    province = db.Column(db.String(50))
    city = db.Column(db.String(50))
    district = db.Column(db.String(50))
    address = db.Column(db.String(200))
    description = db.Column(db.Text)
    contact_phone = db.Column(db.String(20))
    business_hours = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class TeaMerchant(db.Model):
    """茶叶商户数据模型"""
    __tablename__ = 'tea_merchants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    market_id = db.Column(db.Integer, db.ForeignKey('tea_markets.id'))
    contact_person = db.Column(db.String(50))
    contact_phone = db.Column(db.String(20))
    business_scope = db.Column(db.String(200))
    description = db.Column(db.Text)
    is_verified = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return AdminUser.query.get(int(user_id))

# 路由定义
@app.route('/')
def index():
    """管理后台首页"""
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """管理员登录"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = AdminUser.query.filter_by(username=username).first()
        
        if user and user.check_password(password) and user.is_active:
            login_user(user)
            user.last_login = datetime.now(timezone.utc)
            db.session.commit()
            
            # 记录登录日志
            log = SystemLog(
                user_id=user.id,
                action='login',
                description=f'用户 {username} 登录成功',
                ip_address=request.remote_addr,
                user_agent=request.headers.get('User-Agent', '')
            )
            db.session.add(log)
            db.session.commit()
            
            flash('登录成功！', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('用户名或密码错误', 'error')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    """管理员登出"""
    # 记录登出日志
    log = SystemLog(
        user_id=current_user.id,
        action='logout',
        description=f'用户 {current_user.username} 登出',
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent', '')
    )
    db.session.add(log)
    db.session.commit()
    
    logout_user()
    flash('已退出登录', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    """管理后台仪表板"""
    # 获取统计数据
    stats = {
        'total_markets': TeaMarket.query.filter_by(is_active=True).count(),
        'total_merchants': TeaMerchant.query.filter_by(is_active=True).count(),
        'verified_merchants': TeaMerchant.query.filter_by(is_verified=True, is_active=True).count(),
        'total_users': AdminUser.query.filter_by(is_active=True).count(),
        'recent_logs': SystemLog.query.order_by(SystemLog.created_at.desc()).limit(10).all()
    }
    
    return render_template('dashboard.html', stats=stats)

@app.route('/api/stats')
@login_required
def api_stats():
    """获取统计数据API"""
    stats = {
        'markets': TeaMarket.query.filter_by(is_active=True).count(),
        'merchants': TeaMerchant.query.filter_by(is_active=True).count(),
        'verified_merchants': TeaMerchant.query.filter_by(is_verified=True, is_active=True).count(),
        'users': AdminUser.query.filter_by(is_active=True).count(),
        'system_uptime': get_system_uptime()
    }
    return jsonify(stats)

@app.route('/markets')
@login_required
def markets():
    """市场管理页面"""
    markets = TeaMarket.query.filter_by(is_active=True).order_by(TeaMarket.created_at.desc()).all()
    return render_template('markets.html', markets=markets)

@app.route('/merchants')
@login_required
def merchants():
    """商户管理页面"""
    merchants = TeaMerchant.query.filter_by(is_active=True).order_by(TeaMerchant.created_at.desc()).all()
    return render_template('merchants.html', merchants=merchants)

@app.route('/users')
@login_required
def users():
    """用户管理页面"""
    if current_user.role != 'super_admin':
        flash('权限不足', 'error')
        return redirect(url_for('dashboard'))
    
    users = AdminUser.query.filter_by(is_active=True).order_by(AdminUser.created_at.desc()).all()
    return render_template('users.html', users=users)

@app.route('/logs')
@login_required
def logs():
    """系统日志页面"""
    page = request.args.get('page', 1, type=int)
    logs = SystemLog.query.order_by(SystemLog.created_at.desc()).paginate(
        page=page, per_page=50, error_out=False
    )
    return render_template('logs.html', logs=logs)

@app.route('/settings')
@login_required
def settings():
    """系统设置页面"""
    if current_user.role != 'super_admin':
        flash('权限不足', 'error')
        return redirect(url_for('dashboard'))
    
    return render_template('settings.html')

# API接口
@app.route('/api/markets', methods=['GET', 'POST'])
@login_required
def api_markets():
    """市场数据API"""
    if request.method == 'GET':
        markets = TeaMarket.query.filter_by(is_active=True).all()
        return jsonify([{
            'id': m.id,
            'name': m.name,
            'province': m.province,
            'city': m.city,
            'district': m.district,
            'address': m.address,
            'contact_phone': m.contact_phone,
            'created_at': m.created_at.isoformat()
        } for m in markets])
    
    elif request.method == 'POST':
        data = request.get_json()
        
        market = TeaMarket(
            name=data['name'],
            province=data.get('province'),
            city=data.get('city'),
            district=data.get('district'),
            address=data.get('address'),
            description=data.get('description'),
            contact_phone=data.get('contact_phone'),
            business_hours=data.get('business_hours')
        )
        
        db.session.add(market)
        db.session.commit()
        
        # 记录操作日志
        log = SystemLog(
            user_id=current_user.id,
            action='create_market',
            description=f'创建市场: {market.name}',
            ip_address=request.remote_addr
        )
        db.session.add(log)
        db.session.commit()
        
        flash(f'市场 {market.name} 创建成功', 'success')
        return jsonify({'success': True, 'id': market.id})

@app.route('/api/merchants', methods=['GET', 'POST'])
@login_required
def api_merchants():
    """商户数据API"""
    if request.method == 'GET':
        merchants = TeaMerchant.query.filter_by(is_active=True).all()
        return jsonify([{
            'id': m.id,
            'name': m.name,
            'market_id': m.market_id,
            'contact_person': m.contact_person,
            'contact_phone': m.contact_phone,
            'business_scope': m.business_scope,
            'is_verified': m.is_verified,
            'created_at': m.created_at.isoformat()
        } for m in merchants])
    
    elif request.method == 'POST':
        data = request.get_json()
        
        merchant = TeaMerchant(
            name=data['name'],
            market_id=data.get('market_id'),
            contact_person=data.get('contact_person'),
            contact_phone=data.get('contact_phone'),
            business_scope=data.get('business_scope'),
            description=data.get('description')
        )
        
        db.session.add(merchant)
        db.session.commit()
        
        # 记录操作日志
        log = SystemLog(
            user_id=current_user.id,
            action='create_merchant',
            description=f'创建商户: {merchant.name}',
            ip_address=request.remote_addr
        )
        db.session.add(log)
        db.session.commit()
        
        flash(f'商户 {merchant.name} 创建成功', 'success')
        return jsonify({'success': True, 'id': merchant.id})

# 工具函数
def get_system_uptime():
    """获取系统运行时间"""
    try:
        import psutil
        boot_time = datetime.fromtimestamp(psutil.boot_time())
        uptime = datetime.now() - boot_time
        return str(uptime).split('.')[0]  # 移除微秒
    except:
        return "未知"

# 性能监控API路由
@app.route('/performance')
@login_required
def performance_dashboard():
    """性能监控页面"""
    return render_template('performance.html')

@app.route('/api/performance/current')
@login_required
def api_performance_current():
    """获取当前性能指标"""
    try:
        from simple_performance import get_simple_monitor
        monitor = get_simple_monitor()
        metrics = monitor.get_current_metrics()
        
        return jsonify({
            'success': True,
            'data': metrics,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f'获取性能指标失败: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/performance/alerts')
@login_required
def api_performance_alerts():
    """获取性能告警"""
    try:
        from simple_performance import get_simple_monitor
        monitor = get_simple_monitor()
        alerts = monitor.get_alerts()
        
        return jsonify({
            'success': True,
            'data': {
                'alerts': alerts,
                'count': len(alerts)
            }
        })
    except Exception as e:
        logger.error(f'获取性能告警失败: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/performance/summary')
@login_required
def api_performance_summary():
    """获取性能摘要"""
    try:
        from simple_performance import get_simple_monitor
        monitor = get_simple_monitor()
        summary = monitor.get_performance_summary()
        
        return jsonify({
            'success': True,
            'data': summary
        })
    except Exception as e:
        logger.error(f'获取性能摘要失败: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/performance/history/<metric_name>')
@login_required
def api_performance_history(metric_name):
    """获取历史性能数据"""
    try:
        from simple_performance import get_simple_monitor
        monitor = get_simple_monitor()
        hours = request.args.get('hours', 24, type=int)
        history = monitor.get_metrics_history(metric_name, hours)
        
        return jsonify({
            'success': True,
            'data': {
                'metric': metric_name,
                'history': history,
                'hours': hours
            }
        })
    except Exception as e:
        logger.error(f'获取历史性能数据失败: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def init_database():
    """初始化数据库"""
    with app.app_context():
        db.create_all()
        
        # 创建默认超级管理员
        if not AdminUser.query.filter_by(username='admin').first():
            admin = AdminUser(
                username='admin',
                email='admin@tea-platform.com',
                role='super_admin'
            )
            admin.set_password(config.ADMIN_PASSWORD)
            db.session.add(admin)
            db.session.commit()
            logger.info('创建默认超级管理员账号')

def create_upload_folder():
    """创建上传文件夹"""
    upload_path = app.config['UPLOAD_FOLDER']
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)
        logger.info(f'创建上传文件夹: {upload_path}')

if __name__ == '__main__':
    # 初始化数据库
    init_database()
    
    # 创建上传文件夹
    create_upload_folder()
    
    # 启动应用
    port = int(os.getenv('ADMIN_PORT', 8080))
    host = os.getenv('ADMIN_HOST', '0.0.0.0')
    debug = os.getenv('APP_DEBUG', 'true').lower() == 'true'
    
    logger.info(f'启动管理后台服务: {host}:{port}')
    print(f"🍵 茶叶平台管理后台启动成功！")
    print(f"📱 访问地址: http://localhost:{port}")
    print(f"👤 默认账号: admin")
    print(f"🔑 默认密码: {config.ADMIN_PASSWORD}")
    print(f"⚠️  请立即修改默认密码！")
    print(f"🔄 按 Ctrl+C 停止服务")
    
    app.run(host=host, port=port, debug=debug) 