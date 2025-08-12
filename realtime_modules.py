#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
茶叶一点通实时功能模块
包含WebSocket、推送通知、实时数据同步等功能
"""

import json
import time
import threading
from datetime import datetime, timedelta
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import request, session
import sqlite3
import queue

class RealtimeManager:
    """实时功能管理器"""
    
    def __init__(self, app, db):
        self.app = app
        self.db = db
        self.socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
        self.connected_clients = {}  # {client_id: {'user_id': xxx, 'rooms': []}}
        self.notification_queue = queue.Queue()
        self.price_alerts = {}  # {user_id: [alert_configs]}
        self.stock_alerts = {}  # {user_id: [alert_configs]}
        
        # 启动后台任务
        self.start_background_tasks()
        
        # 注册WebSocket事件
        self.register_socket_events()
    
    def start_background_tasks(self):
        """启动后台任务"""
        # 通知推送任务
        threading.Thread(target=self.notification_worker, daemon=True).start()
        # 价格监控任务
        threading.Thread(target=self.price_monitor_worker, daemon=True).start()
        # 库存监控任务
        threading.Thread(target=self.stock_monitor_worker, daemon=True).start()
        # 数据同步任务
        threading.Thread(target=self.data_sync_worker, daemon=True).start()
    
    def register_socket_events(self):
        """注册WebSocket事件"""
        
        @self.socketio.on('connect')
        def handle_connect():
            """客户端连接"""
            client_id = request.sid
            self.connected_clients[client_id] = {
                'user_id': None,
                'rooms': [],
                'connected_at': datetime.now()
            }
            print(f"🔗 客户端连接: {client_id}")
            emit('connected', {'client_id': client_id, 'timestamp': datetime.now().isoformat()})
        
        @self.socketio.on('disconnect')
        def handle_disconnect():
            """客户端断开连接"""
            client_id = request.sid
            if client_id in self.connected_clients:
                user_id = self.connected_clients[client_id].get('user_id')
                if user_id:
                    self.remove_user_alerts(user_id)
                del self.connected_clients[client_id]
            print(f"🔌 客户端断开: {client_id}")
        
        @self.socketio.on('authenticate')
        def handle_authenticate(data):
            """用户认证"""
            client_id = request.sid
            user_id = data.get('user_id')
            token = data.get('token')
            
            # 验证用户token（简化版）
            if self.verify_user_token(user_id, token):
                self.connected_clients[client_id]['user_id'] = user_id
                join_room(f"user_{user_id}")
                emit('authenticated', {'user_id': user_id, 'status': 'success'})
                print(f"✅ 用户认证成功: {user_id}")
            else:
                emit('authenticated', {'status': 'failed', 'message': '认证失败'})
        
        @self.socketio.on('join_room')
        def handle_join_room(data):
            """加入房间"""
            room = data.get('room')
            if room:
                join_room(room)
                if request.sid in self.connected_clients:
                    self.connected_clients[request.sid]['rooms'].append(room)
                emit('room_joined', {'room': room})
        
        @self.socketio.on('leave_room')
        def handle_leave_room(data):
            """离开房间"""
            room = data.get('room')
            if room:
                leave_room(room)
                if request.sid in self.connected_clients:
                    rooms = self.connected_clients[request.sid]['rooms']
                    if room in rooms:
                        rooms.remove(room)
                emit('room_left', {'room': room})
        
        @self.socketio.on('set_price_alert')
        def handle_set_price_alert(data):
            """设置价格提醒"""
            client_id = request.sid
            if client_id not in self.connected_clients:
                emit('error', {'message': '请先认证'})
                return
            
            user_id = self.connected_clients[client_id]['user_id']
            if not user_id:
                emit('error', {'message': '请先认证'})
                return
            
            alert_config = {
                'item_type': data.get('item_type'),  # newarrival, clearance
                'item_id': data.get('item_id'),
                'target_price': data.get('target_price'),
                'condition': data.get('condition', 'below'),  # below, above
                'created_at': datetime.now()
            }
            
            if user_id not in self.price_alerts:
                self.price_alerts[user_id] = []
            self.price_alerts[user_id].append(alert_config)
            
            emit('price_alert_set', {'config': alert_config})
            print(f"💰 设置价格提醒: 用户{user_id} - {alert_config}")
        
        @self.socketio.on('set_stock_alert')
        def handle_set_stock_alert(data):
            """设置库存提醒"""
            client_id = request.sid
            if client_id not in self.connected_clients:
                emit('error', {'message': '请先认证'})
                return
            
            user_id = self.connected_clients[client_id]['user_id']
            if not user_id:
                emit('error', {'message': '请先认证'})
                return
            
            alert_config = {
                'item_type': data.get('item_type'),
                'item_id': data.get('item_id'),
                'min_stock': data.get('min_stock'),
                'created_at': datetime.now()
            }
            
            if user_id not in self.stock_alerts:
                self.stock_alerts[user_id] = []
            self.stock_alerts[user_id].append(alert_config)
            
            emit('stock_alert_set', {'config': alert_config})
            print(f"📦 设置库存提醒: 用户{user_id} - {alert_config}")
        
        @self.socketio.on('subscribe_market_updates')
        def handle_subscribe_market_updates(data):
            """订阅市场更新"""
            market_id = data.get('market_id')
            if market_id:
                room = f"market_{market_id}"
                join_room(room)
                if request.sid in self.connected_clients:
                    self.connected_clients[request.sid]['rooms'].append(room)
                emit('subscribed', {'type': 'market_updates', 'market_id': market_id})
        
        @self.socketio.on('subscribe_price_updates')
        def handle_subscribe_price_updates(data):
            """订阅价格更新"""
            category = data.get('category')
            if category:
                room = f"price_{category}"
                join_room(room)
                if request.sid in self.connected_clients:
                    self.connected_clients[request.sid]['rooms'].append(room)
                emit('subscribed', {'type': 'price_updates', 'category': category})
    
    def verify_user_token(self, user_id, token):
        """验证用户token（简化版）"""
        # 这里应该实现真实的token验证逻辑
        return True
    
    def send_notification(self, user_id, notification_type, title, content, data=None):
        """发送通知"""
        notification = {
            'type': notification_type,
            'title': title,
            'content': content,
            'data': data or {},
            'timestamp': datetime.now().isoformat()
        }
        
        # 发送到WebSocket
        self.socketio.emit('notification', notification, room=f"user_{user_id}")
        
        # 保存到数据库
        self.save_notification_to_db(user_id, notification)
        
        print(f"📢 发送通知: 用户{user_id} - {title}")
    
    def broadcast_market_update(self, market_id, update_type, data):
        """广播市场更新"""
        message = {
            'type': 'market_update',
            'market_id': market_id,
            'update_type': update_type,
            'data': data,
            'timestamp': datetime.now().isoformat()
        }
        
        self.socketio.emit('market_update', message, room=f"market_{market_id}")
        print(f"🏪 广播市场更新: 市场{market_id} - {update_type}")
    
    def broadcast_price_update(self, category, price_data):
        """广播价格更新"""
        message = {
            'type': 'price_update',
            'category': category,
            'price_data': price_data,
            'timestamp': datetime.now().isoformat()
        }
        
        self.socketio.emit('price_update', message, room=f"price_{category}")
        print(f"💰 广播价格更新: {category}")
    
    def broadcast_new_arrival(self, item_data):
        """广播新品到货"""
        message = {
            'type': 'new_arrival',
            'data': item_data,
            'timestamp': datetime.now().isoformat()
        }
        
        self.socketio.emit('new_arrival', message)
        print(f"🆕 广播新品到货: {item_data.get('name', '')}")
    
    def broadcast_clearance_alert(self, item_data):
        """广播清仓提醒"""
        message = {
            'type': 'clearance_alert',
            'data': item_data,
            'timestamp': datetime.now().isoformat()
        }
        
        self.socketio.emit('clearance_alert', message)
        print(f"🔥 广播清仓提醒: {item_data.get('name', '')}")
    
    def notification_worker(self):
        """通知推送工作线程"""
        while True:
            try:
                notification = self.notification_queue.get(timeout=1)
                user_id = notification['user_id']
                self.send_notification(
                    user_id,
                    notification['type'],
                    notification['title'],
                    notification['content'],
                    notification.get('data')
                )
            except queue.Empty:
                continue
            except Exception as e:
                print(f"❌ 通知推送错误: {e}")
    
    def price_monitor_worker(self):
        """价格监控工作线程"""
        while True:
            try:
                time.sleep(30)  # 每30秒检查一次
                self.check_price_alerts()
            except Exception as e:
                print(f"❌ 价格监控错误: {e}")
    
    def stock_monitor_worker(self):
        """库存监控工作线程"""
        while True:
            try:
                time.sleep(60)  # 每60秒检查一次
                self.check_stock_alerts()
            except Exception as e:
                print(f"❌ 库存监控错误: {e}")
    
    def data_sync_worker(self):
        """数据同步工作线程"""
        while True:
            try:
                time.sleep(300)  # 每5分钟同步一次
                self.sync_data_updates()
            except Exception as e:
                print(f"❌ 数据同步错误: {e}")
    
    def check_price_alerts(self):
        """检查价格提醒"""
        for user_id, alerts in self.price_alerts.items():
            for alert in alerts[:]:  # 复制列表避免修改时出错
                try:
                    current_price = self.get_current_price(alert['item_type'], alert['item_id'])
                    if current_price is None:
                        continue
                    
                    should_alert = False
                    if alert['condition'] == 'below' and current_price <= alert['target_price']:
                        should_alert = True
                    elif alert['condition'] == 'above' and current_price >= alert['target_price']:
                        should_alert = True
                    
                    if should_alert:
                        self.send_notification(
                            user_id,
                            'price_alert',
                            '价格提醒',
                            f"商品价格已达到您的目标价格 ¥{current_price}",
                            {'alert': alert, 'current_price': current_price}
                        )
                        # 移除已触发的提醒
                        alerts.remove(alert)
                        
                except Exception as e:
                    print(f"❌ 检查价格提醒错误: {e}")
    
    def check_stock_alerts(self):
        """检查库存提醒"""
        for user_id, alerts in self.stock_alerts.items():
            for alert in alerts[:]:
                try:
                    current_stock = self.get_current_stock(alert['item_type'], alert['item_id'])
                    if current_stock is None:
                        continue
                    
                    if current_stock <= alert['min_stock']:
                        self.send_notification(
                            user_id,
                            'stock_alert',
                            '库存提醒',
                            f"商品库存不足，当前库存: {current_stock}",
                            {'alert': alert, 'current_stock': current_stock}
                        )
                        alerts.remove(alert)
                        
                except Exception as e:
                    print(f"❌ 检查库存提醒错误: {e}")
    
    def sync_data_updates(self):
        """同步数据更新"""
        try:
            # 检查新品数据
            new_items = self.get_new_items()
            for item in new_items:
                self.broadcast_new_arrival(item)
            
            # 检查清仓数据
            clearance_items = self.get_clearance_items()
            for item in clearance_items:
                self.broadcast_clearance_alert(item)
                
        except Exception as e:
            print(f"❌ 数据同步错误: {e}")
    
    def get_current_price(self, item_type, item_id):
        """获取当前价格"""
        try:
            with self.app.app_context():
                if item_type == 'newarrival':
                    from server import NewArrival
                    item = NewArrival.query.get(item_id)
                    return item.price if item else None
                elif item_type == 'clearance':
                    from server import Clearance
                    item = Clearance.query.get(item_id)
                    return item.sale_price if item else None
        except Exception as e:
            print(f"❌ 获取价格错误: {e}")
        return None
    
    def get_current_stock(self, item_type, item_id):
        """获取当前库存"""
        try:
            with self.app.app_context():
                if item_type == 'clearance':
                    from server import Clearance
                    item = Clearance.query.get(item_id)
                    return item.stock if item else None
        except Exception as e:
            print(f"❌ 获取库存错误: {e}")
        return None
    
    def get_new_items(self):
        """获取新品数据"""
        try:
            with self.app.app_context():
                from server import NewArrival
                # 获取最近1小时的新品
                recent_time = datetime.now() - timedelta(hours=1)
                items = NewArrival.query.filter(NewArrival.created_at >= recent_time).all()
                return [{'id': item.id, 'name': item.name, 'price': item.price, 'category': item.category} for item in items]
        except Exception as e:
            print(f"❌ 获取新品错误: {e}")
        return []
    
    def get_clearance_items(self):
        """获取清仓数据"""
        try:
            with self.app.app_context():
                from server import Clearance
                # 获取最近1小时的清仓
                recent_time = datetime.now() - timedelta(hours=1)
                items = Clearance.query.filter(Clearance.created_at >= recent_time).all()
                return [{'id': item.id, 'name': item.name, 'sale_price': item.sale_price, 'stock': item.stock} for item in items]
        except Exception as e:
            print(f"❌ 获取清仓错误: {e}")
        return []
    
    def save_notification_to_db(self, user_id, notification):
        """保存通知到数据库"""
        try:
            with self.app.app_context():
                from server import UserNotification, db
                db_notification = UserNotification(
                    user_id=user_id,
                    type=notification['type'],
                    title=notification['title'],
                    content=notification['content'],
                    is_read=False
                )
                db.session.add(db_notification)
                db.session.commit()
        except Exception as e:
            print(f"❌ 保存通知错误: {e}")
    
    def remove_user_alerts(self, user_id):
        """移除用户提醒"""
        if user_id in self.price_alerts:
            del self.price_alerts[user_id]
        if user_id in self.stock_alerts:
            del self.stock_alerts[user_id]
    
    def get_connected_users_count(self):
        """获取在线用户数"""
        return len([c for c in self.connected_clients.values() if c['user_id']])
    
    def get_socketio(self):
        """获取SocketIO实例"""
        return self.socketio

# 实时功能API路由
def register_realtime_routes(app, realtime_manager):
    """注册实时功能API路由"""
    
    @app.route('/api/realtime/status')
    def get_realtime_status():
        """获取实时功能状态"""
        return {
            'status': 'success',
            'data': {
                'connected_users': realtime_manager.get_connected_users_count(),
                'price_alerts': len(realtime_manager.price_alerts),
                'stock_alerts': len(realtime_manager.stock_alerts),
                'server_time': datetime.now().isoformat()
            }
        }
    
    @app.route('/api/realtime/test_notification', methods=['POST'])
    def test_notification():
        """测试通知功能"""
        data = request.get_json()
        user_id = data.get('user_id')
        if user_id:
            realtime_manager.send_notification(
                user_id,
                'test',
                '测试通知',
                '这是一条测试通知消息',
                {'test': True}
            )
            return {'status': 'success', 'message': '测试通知已发送'}
        return {'status': 'error', 'message': '缺少用户ID'}
    
    @app.route('/api/realtime/broadcast', methods=['POST'])
    def broadcast_message():
        """广播消息"""
        data = request.get_json()
        message_type = data.get('type')
        message_data = data.get('data', {})
        
        if message_type == 'market_update':
            market_id = message_data.get('market_id')
            update_type = message_data.get('update_type')
            realtime_manager.broadcast_market_update(market_id, update_type, message_data)
        elif message_type == 'price_update':
            category = message_data.get('category')
            realtime_manager.broadcast_price_update(category, message_data)
        elif message_type == 'new_arrival':
            realtime_manager.broadcast_new_arrival(message_data)
        elif message_type == 'clearance_alert':
            realtime_manager.broadcast_clearance_alert(message_data)
        
        return {'status': 'success', 'message': '广播消息已发送'} 