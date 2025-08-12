#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用户系统功能测试脚本
测试用户资料、收藏、历史、通知、关注、私信等功能
"""

import requests
import json
import time
from datetime import datetime

# 配置
BASE_URL = 'http://localhost:3000'
TEST_USERNAME = 'testuser'
TEST_PASSWORD = 'testpass123'

class UserSystemTester:
    def __init__(self):
        self.session = requests.Session()
        self.user_token = None
        self.user_id = None
        
    def log(self, message):
        """日志输出"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] {message}')
    
    def test_connection(self):
        """测试连接"""
        try:
            response = self.session.get(f'{BASE_URL}/health')
            if response.status_code == 200:
                self.log('✅ 服务器连接正常')
                return True
            else:
                self.log('❌ 服务器连接失败')
                return False
        except Exception as e:
            self.log(f'❌ 连接错误: {e}')
            return False
    
    def login(self):
        """用户登录"""
        try:
            login_data = {
                'username': TEST_USERNAME,
                'password': TEST_PASSWORD
            }
            response = self.session.post(f'{BASE_URL}/api/auth/login', json=login_data)
            
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.user_token = result['data']['token']
                    self.user_id = result['data']['user_id']
                    self.log('✅ 用户登录成功')
                    return True
                else:
                    self.log(f'❌ 登录失败: {result["message"]}')
                    return False
            else:
                self.log(f'❌ 登录请求失败: {response.status_code}')
                return False
        except Exception as e:
            self.log(f'❌ 登录错误: {e}')
            return False
    
    def test_user_profile(self):
        """测试用户资料功能"""
        self.log('\n=== 测试用户资料功能 ===')
        
        # 获取用户资料
        try:
            response = self.session.get(f'{BASE_URL}/api/user/profile')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取用户资料成功')
                    profile = result['data']
                    if profile:
                        self.log(f'   用户昵称: {profile.get("nickname", "未设置")}')
                        self.log(f'   用户邮箱: {profile.get("email", "未设置")}')
                    else:
                        self.log('   用户资料为空')
                else:
                    self.log(f'❌ 获取用户资料失败: {result["message"]}')
            else:
                self.log(f'❌ 获取用户资料请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取用户资料错误: {e}')
        
        # 更新用户资料
        try:
            profile_data = {
                'nickname': '测试用户',
                'email': 'test@example.com',
                'phone': '13800138000',
                'gender': 'male',
                'location': '北京市',
                'company': '测试公司',
                'position': '测试职位',
                'bio': '这是一个测试用户资料'
            }
            response = self.session.put(f'{BASE_URL}/api/user/profile', json=profile_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 更新用户资料成功')
                else:
                    self.log(f'❌ 更新用户资料失败: {result["message"]}')
            else:
                self.log(f'❌ 更新用户资料请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 更新用户资料错误: {e}')
    
    def test_user_favorites(self):
        """测试用户收藏功能"""
        self.log('\n=== 测试用户收藏功能 ===')
        
        # 获取收藏列表
        try:
            response = self.session.get(f'{BASE_URL}/api/user/favorites')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取收藏列表成功')
                    favorites = result['data']
                    self.log(f'   收藏数量: {len(favorites)}')
                else:
                    self.log(f'❌ 获取收藏列表失败: {result["message"]}')
            else:
                self.log(f'❌ 获取收藏列表请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取收藏列表错误: {e}')
        
        # 添加收藏
        try:
            favorite_data = {
                'item_type': 'market',
                'item_id': 1,
                'title': '测试市场',
                'description': '这是一个测试市场收藏'
            }
            response = self.session.post(f'{BASE_URL}/api/user/favorites', json=favorite_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 添加收藏成功')
                else:
                    self.log(f'❌ 添加收藏失败: {result["message"]}')
            else:
                self.log(f'❌ 添加收藏请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 添加收藏错误: {e}')
        
        # 再次获取收藏列表
        try:
            response = self.session.get(f'{BASE_URL}/api/user/favorites')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    favorites = result['data']
                    self.log(f'   更新后收藏数量: {len(favorites)}')
                    
                    # 取消收藏
                    if favorites:
                        favorite_id = favorites[0]['id']
                        response = self.session.delete(f'{BASE_URL}/api/user/favorites/{favorite_id}')
                        if response.status_code == 200:
                            result = response.json()
                            if result['status'] == 'success':
                                self.log('✅ 取消收藏成功')
                            else:
                                self.log(f'❌ 取消收藏失败: {result["message"]}')
                        else:
                            self.log(f'❌ 取消收藏请求失败: {response.status_code}')
                else:
                    self.log(f'❌ 获取收藏列表失败: {result["message"]}')
            else:
                self.log(f'❌ 获取收藏列表请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取收藏列表错误: {e}')
    
    def test_user_history(self):
        """测试用户浏览历史功能"""
        self.log('\n=== 测试用户浏览历史功能 ===')
        
        # 获取浏览历史
        try:
            response = self.session.get(f'{BASE_URL}/api/user/history')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取浏览历史成功')
                    history = result['data']
                    self.log(f'   历史记录数量: {len(history)}')
                else:
                    self.log(f'❌ 获取浏览历史失败: {result["message"]}')
            else:
                self.log(f'❌ 获取浏览历史请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取浏览历史错误: {e}')
        
        # 添加浏览历史
        try:
            history_data = {
                'item_type': 'newarrival',
                'item_id': 1,
                'title': '测试新品',
                'description': '这是一个测试新品浏览记录'
            }
            response = self.session.post(f'{BASE_URL}/api/user/history', json=history_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 添加浏览历史成功')
                else:
                    self.log(f'❌ 添加浏览历史失败: {result["message"]}')
            else:
                self.log(f'❌ 添加浏览历史请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 添加浏览历史错误: {e}')
        
        # 清空浏览历史
        try:
            response = self.session.delete(f'{BASE_URL}/api/user/history')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 清空浏览历史成功')
                else:
                    self.log(f'❌ 清空浏览历史失败: {result["message"]}')
            else:
                self.log(f'❌ 清空浏览历史请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 清空浏览历史错误: {e}')
    
    def test_user_notifications(self):
        """测试用户通知功能"""
        self.log('\n=== 测试用户通知功能 ===')
        
        # 获取通知列表
        try:
            response = self.session.get(f'{BASE_URL}/api/user/notifications')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取通知列表成功')
                    notifications = result['data']
                    self.log(f'   通知数量: {len(notifications)}')
                    
                    # 统计未读通知
                    unread_count = sum(1 for n in notifications if not n['is_read'])
                    self.log(f'   未读通知数量: {unread_count}')
                else:
                    self.log(f'❌ 获取通知列表失败: {result["message"]}')
            else:
                self.log(f'❌ 获取通知列表请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取通知列表错误: {e}')
        
        # 标记所有通知为已读
        try:
            response = self.session.put(f'{BASE_URL}/api/user/notifications/read-all')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 标记所有通知为已读成功')
                else:
                    self.log(f'❌ 标记所有通知为已读失败: {result["message"]}')
            else:
                self.log(f'❌ 标记所有通知为已读请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 标记所有通知为已读错误: {e}')
    
    def test_user_follows(self):
        """测试用户关注功能"""
        self.log('\n=== 测试用户关注功能 ===')
        
        # 获取关注列表
        try:
            response = self.session.get(f'{BASE_URL}/api/user/follows')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取关注列表成功')
                    follows = result['data']
                    self.log(f'   关注数量: {len(follows)}')
                else:
                    self.log(f'❌ 获取关注列表失败: {result["message"]}')
            else:
                self.log(f'❌ 获取关注列表请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取关注列表错误: {e}')
        
        # 尝试关注用户（这里假设用户ID为2存在）
        try:
            follow_data = {
                'following_id': 2
            }
            response = self.session.post(f'{BASE_URL}/api/user/follows', json=follow_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 关注用户成功')
                else:
                    self.log(f'❌ 关注用户失败: {result["message"]}')
            else:
                self.log(f'❌ 关注用户请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 关注用户错误: {e}')
    
    def test_user_messages(self):
        """测试用户私信功能"""
        self.log('\n=== 测试用户私信功能 ===')
        
        # 获取私信列表
        try:
            response = self.session.get(f'{BASE_URL}/api/user/messages')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取私信列表成功')
                    messages = result['data']
                    self.log(f'   私信数量: {len(messages)}')
                else:
                    self.log(f'❌ 获取私信列表失败: {result["message"]}')
            else:
                self.log(f'❌ 获取私信列表请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取私信列表错误: {e}')
        
        # 发送私信
        try:
            message_data = {
                'receiver_id': 2,
                'content': '这是一条测试私信',
                'message_type': 'text'
            }
            response = self.session.post(f'{BASE_URL}/api/user/messages', json=message_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 发送私信成功')
                else:
                    self.log(f'❌ 发送私信失败: {result["message"]}')
            else:
                self.log(f'❌ 发送私信请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 发送私信错误: {e}')
    
    def test_user_activities(self):
        """测试用户活动记录功能"""
        self.log('\n=== 测试用户活动记录功能 ===')
        
        # 获取活动记录
        try:
            response = self.session.get(f'{BASE_URL}/api/user/activities')
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 获取活动记录成功')
                    activities = result['data']
                    self.log(f'   活动记录数量: {len(activities)}')
                else:
                    self.log(f'❌ 获取活动记录失败: {result["message"]}')
            else:
                self.log(f'❌ 获取活动记录请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 获取活动记录错误: {e}')
        
        # 添加活动记录
        try:
            activity_data = {
                'activity_type': 'test_activity',
                'description': '这是一条测试活动记录',
                'activity_data': {
                    'test_key': 'test_value',
                    'timestamp': datetime.now().isoformat()
                }
            }
            response = self.session.post(f'{BASE_URL}/api/user/activities', json=activity_data)
            if response.status_code == 200:
                result = response.json()
                if result['status'] == 'success':
                    self.log('✅ 添加活动记录成功')
                else:
                    self.log(f'❌ 添加活动记录失败: {result["message"]}')
            else:
                self.log(f'❌ 添加活动记录请求失败: {response.status_code}')
        except Exception as e:
            self.log(f'❌ 添加活动记录错误: {e}')
    
    def run_all_tests(self):
        """运行所有测试"""
        self.log('🚀 开始用户系统功能测试')
        
        # 检查连接
        if not self.test_connection():
            return False
        
        # 用户登录
        if not self.login():
            self.log('❌ 用户登录失败，无法继续测试')
            return False
        
        # 运行各项功能测试
        self.test_user_profile()
        self.test_user_favorites()
        self.test_user_history()
        self.test_user_notifications()
        self.test_user_follows()
        self.test_user_messages()
        self.test_user_activities()
        
        self.log('\n✅ 用户系统功能测试完成')
        return True

def main():
    """主函数"""
    tester = UserSystemTester()
    tester.run_all_tests()

if __name__ == '__main__':
    main() 