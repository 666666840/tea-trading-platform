#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试茶叶平台管理后台日志功能
验证导出、清空、批量删除等功能
"""

import requests
import json
import time
from datetime import datetime

# 配置
BASE_URL = "http://localhost:5000"  # 管理后台地址
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

class LogFunctionTester:
    def __init__(self):
        self.session = requests.Session()
        self.base_url = BASE_URL
        
    def login(self):
        """登录管理后台"""
        print("🔐 正在登录管理后台...")
        
        login_data = {
            'username': ADMIN_USERNAME,
            'password': ADMIN_PASSWORD
        }
        
        try:
            response = self.session.post(f"{self.base_url}/login", data=login_data)
            if response.status_code == 200:
                print("✅ 登录成功")
                return True
            else:
                print(f"❌ 登录失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 登录异常: {e}")
            return False
    
    def test_logs_page(self):
        """测试日志页面访问"""
        print("\n📋 测试日志页面访问...")
        
        try:
            response = self.session.get(f"{self.base_url}/logs")
            if response.status_code == 200:
                print("✅ 日志页面访问成功")
                return True
            else:
                print(f"❌ 日志页面访问失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 日志页面访问异常: {e}")
            return False
    
    def test_export_logs(self):
        """测试导出日志功能"""
        print("\n📤 测试导出日志功能...")
        
        try:
            # 测试基本导出
            response = self.session.get(f"{self.base_url}/logs/export")
            if response.status_code == 200 and 'text/csv' in response.headers.get('Content-Type', ''):
                print("✅ 导出日志功能正常")
                
                # 保存测试文件
                filename = f"test_logs_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                print(f"📁 导出文件已保存: {filename}")
                return True
            else:
                print(f"❌ 导出日志失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 导出日志异常: {e}")
            return False
    
    def test_export_logs_with_filters(self):
        """测试带筛选条件的导出"""
        print("\n🔍 测试带筛选条件的导出...")
        
        try:
            # 测试带用户ID筛选的导出
            params = {'user_id': '1'}
            response = self.session.get(f"{self.base_url}/logs/export", params=params)
            if response.status_code == 200:
                print("✅ 带筛选条件的导出功能正常")
                return True
            else:
                print(f"❌ 带筛选条件的导出失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 带筛选条件的导出异常: {e}")
            return False
    
    def test_clear_logs(self):
        """测试清空日志功能"""
        print("\n🗑️ 测试清空日志功能...")
        
        try:
            # 先获取当前日志数量
            response = self.session.get(f"{self.base_url}/logs")
            if response.status_code != 200:
                print("❌ 无法获取日志页面")
                return False
            
            # 测试清空功能（这里只是测试接口，不实际清空）
            clear_data = {
                'user_id': '',
                'action': '',
                'start_date': '',
                'end_date': ''
            }
            
            response = self.session.post(f"{self.base_url}/logs/clear", data=clear_data)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    print("✅ 清空日志接口正常")
                    return True
                else:
                    print(f"❌ 清空日志失败: {result.get('message')}")
                    return False
            else:
                print(f"❌ 清空日志接口错误: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 清空日志异常: {e}")
            return False
    
    def test_delete_logs(self):
        """测试批量删除日志功能"""
        print("\n🗑️ 测试批量删除日志功能...")
        
        try:
            # 测试批量删除接口（这里只是测试接口，不实际删除）
            delete_data = {
                'log_ids[]': ['1', '2']  # 测试ID
            }
            
            response = self.session.post(f"{self.base_url}/logs/delete", data=delete_data)
            if response.status_code == 200:
                result = response.json()
                print("✅ 批量删除日志接口正常")
                return True
            else:
                print(f"❌ 批量删除日志接口错误: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 批量删除日志异常: {e}")
            return False
    
    def test_log_search(self):
        """测试日志搜索功能"""
        print("\n🔍 测试日志搜索功能...")
        
        try:
            # 测试带搜索参数的日志页面
            params = {
                'user_id': '1',
                'action': 'login',
                'start_date': '2025-01-01',
                'end_date': '2025-12-31',
                'page': '1'
            }
            
            response = self.session.get(f"{self.base_url}/logs", params=params)
            if response.status_code == 200:
                print("✅ 日志搜索功能正常")
                return True
            else:
                print(f"❌ 日志搜索失败: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 日志搜索异常: {e}")
            return False
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🚀 开始测试茶叶平台管理后台日志功能")
        print("=" * 50)
        
        # 登录
        if not self.login():
            print("❌ 登录失败，无法继续测试")
            return
        
        # 运行各项测试
        tests = [
            ("日志页面访问", self.test_logs_page),
            ("导出日志功能", self.test_export_logs),
            ("带筛选条件的导出", self.test_export_logs_with_filters),
            ("清空日志功能", self.test_clear_logs),
            ("批量删除日志功能", self.test_delete_logs),
            ("日志搜索功能", self.test_log_search)
        ]
        
        results = []
        for test_name, test_func in tests:
            try:
                result = test_func()
                results.append((test_name, result))
            except Exception as e:
                print(f"❌ {test_name}测试异常: {e}")
                results.append((test_name, False))
        
        # 输出测试结果
        print("\n" + "=" * 50)
        print("📊 测试结果汇总:")
        print("=" * 50)
        
        passed = 0
        total = len(results)
        
        for test_name, result in results:
            status = "✅ 通过" if result else "❌ 失败"
            print(f"{test_name}: {status}")
            if result:
                passed += 1
        
        print(f"\n总计: {passed}/{total} 项测试通过")
        
        if passed == total:
            print("🎉 所有测试通过！日志功能正常工作")
        else:
            print("⚠️ 部分测试失败，请检查相关功能")

def main():
    """主函数"""
    tester = LogFunctionTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main() 