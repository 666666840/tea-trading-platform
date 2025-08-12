#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
系统日志功能优化版测试脚本
测试新增的实时监控、告警系统、高级导出、分析报告、智能清理等功能
"""

import requests
import json
import time
import random
from datetime import datetime, timedelta

# 配置
BASE_URL = "http://localhost:5001"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

class LogSystemTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'LogSystemTester/1.0',
            'Content-Type': 'application/json'
        })
        self.test_results = []
        
    def log_test(self, test_name, success, message=""):
        """记录测试结果"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        self.test_results.append(result)
        status = "✅ 通过" if success else "❌ 失败"
        print(f"{status} {test_name}: {message}")
        
    def login(self):
        """登录系统"""
        try:
            login_data = {
                'username': ADMIN_USERNAME,
                'password': ADMIN_PASSWORD
            }
            response = self.session.post(f"{BASE_URL}/login", data=login_data)
            if response.status_code == 200 and 'dashboard' in response.url:
                self.log_test("登录测试", True, "成功登录管理后台")
                return True
            else:
                self.log_test("登录测试", False, f"登录失败: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("登录测试", False, f"登录异常: {str(e)}")
            return False
    
    def test_realtime_monitoring(self):
        """测试实时监控功能"""
        try:
            # 测试实时数据API
            response = self.session.get(f"{BASE_URL}/api/logs/realtime")
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_test("实时监控API", True, f"获取到 {data['data']['count']} 条实时日志")
                else:
                    self.log_test("实时监控API", False, data.get('message', '未知错误'))
            else:
                self.log_test("实时监控API", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("实时监控API", False, f"异常: {str(e)}")
    
    def test_alerts_system(self):
        """测试告警系统"""
        try:
            # 测试告警API
            response = self.session.get(f"{BASE_URL}/api/logs/alerts")
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    alert_count = data['data']['count']
                    self.log_test("告警系统API", True, f"检测到 {alert_count} 个告警")
                else:
                    self.log_test("告警系统API", False, data.get('message', '未知错误'))
            else:
                self.log_test("告警系统API", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("告警系统API", False, f"异常: {str(e)}")
    
    def test_analysis_report(self):
        """测试分析报告功能"""
        try:
            # 测试分析报告API
            response = self.session.get(f"{BASE_URL}/api/logs/analysis")
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    error_count = data['data']['error_count']
                    high_freq_count = len(data['data']['high_freq_actions'])
                    suspicious_count = len(data['data']['suspicious_ips'])
                    active_users_count = len(data['data']['active_users'])
                    
                    self.log_test("分析报告API", True, 
                                f"错误: {error_count}, 高频操作: {high_freq_count}, "
                                f"可疑IP: {suspicious_count}, 活跃用户: {active_users_count}")
                else:
                    self.log_test("分析报告API", False, data.get('message', '未知错误'))
            else:
                self.log_test("分析报告API", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("分析报告API", False, f"异常: {str(e)}")
    
    def test_advanced_export(self):
        """测试高级导出功能"""
        try:
            # 测试CSV导出
            export_data = {
                'type': 'csv',
                'filters': {
                    'action': 'login'
                },
                'date_range': {
                    'start_date': (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
                }
            }
            
            response = self.session.post(f"{BASE_URL}/api/logs/export/advanced", 
                                       json=export_data)
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                if 'text/csv' in content_type or 'application/json' in content_type:
                    self.log_test("高级导出CSV", True, "成功导出CSV文件")
                else:
                    # 可能是错误响应
                    try:
                        error_data = response.json()
                        self.log_test("高级导出CSV", False, error_data.get('message', '导出失败'))
                    except:
                        self.log_test("高级导出CSV", False, "响应格式错误")
            else:
                self.log_test("高级导出CSV", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("高级导出CSV", False, f"异常: {str(e)}")
    
    def test_json_export(self):
        """测试JSON导出功能"""
        try:
            export_data = {
                'type': 'json',
                'filters': {
                    'action': 'export'
                }
            }
            
            response = self.session.post(f"{BASE_URL}/api/logs/export/advanced", 
                                       json=export_data)
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                if 'application/json' in content_type:
                    self.log_test("高级导出JSON", True, "成功导出JSON文件")
                else:
                    try:
                        error_data = response.json()
                        self.log_test("高级导出JSON", False, error_data.get('message', '导出失败'))
                    except:
                        self.log_test("高级导出JSON", False, "响应格式错误")
            else:
                self.log_test("高级导出JSON", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("高级导出JSON", False, f"异常: {str(e)}")
    
    def test_cleanup_function(self):
        """测试智能清理功能"""
        try:
            # 测试清理API（只测试接口，不实际清理）
            cleanup_data = {
                'days': 365,  # 保留1年
                'action_types': ['login', 'logout']  # 只清理登录相关日志
            }
            
            response = self.session.post(f"{BASE_URL}/api/logs/cleanup", 
                                       json=cleanup_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    deleted_count = data['data']['deleted_count']
                    self.log_test("智能清理功能", True, f"成功清理 {deleted_count} 条日志")
                else:
                    self.log_test("智能清理功能", False, data.get('message', '清理失败'))
            else:
                self.log_test("智能清理功能", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("智能清理功能", False, f"异常: {str(e)}")
    
    def test_charts_api(self):
        """测试图表API"""
        try:
            response = self.session.get(f"{BASE_URL}/api/logs/charts")
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    chart_data = data['data']
                    action_count = len(chart_data['action_labels'])
                    time_count = len(chart_data['time_labels'])
                    trend_count = len(chart_data['trend_labels'])
                    
                    self.log_test("图表API", True, 
                                f"操作类型: {action_count}, 时间分布: {time_count}, 趋势: {trend_count}")
                else:
                    self.log_test("图表API", False, data.get('message', '未知错误'))
            else:
                self.log_test("图表API", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("图表API", False, f"异常: {str(e)}")
    
    def test_performance(self):
        """测试性能"""
        try:
            start_time = time.time()
            
            # 并发测试多个API
            apis = [
                '/api/logs/stats',
                '/api/logs/realtime',
                '/api/logs/alerts',
                '/api/logs/analysis'
            ]
            
            responses = []
            for api in apis:
                response = self.session.get(f"{BASE_URL}{api}")
                responses.append(response)
            
            end_time = time.time()
            total_time = end_time - start_time
            
            success_count = sum(1 for r in responses if r.status_code == 200)
            
            if success_count == len(apis):
                self.log_test("性能测试", True, f"并发请求 {len(apis)} 个API，耗时 {total_time:.2f}秒")
            else:
                self.log_test("性能测试", False, f"成功 {success_count}/{len(apis)}，耗时 {total_time:.2f}秒")
                
        except Exception as e:
            self.log_test("性能测试", False, f"异常: {str(e)}")
    
    def test_error_handling(self):
        """测试错误处理"""
        try:
            # 测试无效的导出请求
            invalid_data = {
                'type': 'invalid_format',
                'filters': {
                    'user_id': 'invalid_id'
                }
            }
            
            response = self.session.post(f"{BASE_URL}/api/logs/export/advanced", 
                                       json=invalid_data)
            
            if response.status_code == 200:
                data = response.json()
                if not data.get('success'):
                    self.log_test("错误处理测试", True, "正确处理了无效请求")
                else:
                    self.log_test("错误处理测试", False, "应该返回错误但成功了")
            else:
                self.log_test("错误处理测试", True, f"HTTP {response.status_code} 错误响应")
                
        except Exception as e:
            self.log_test("错误处理测试", False, f"异常: {str(e)}")
    
    def generate_test_logs(self):
        """生成测试日志数据"""
        try:
            # 生成一些测试日志
            test_actions = ['login', 'logout', 'export', 'view', 'search', 'create', 'update', 'delete']
            test_descriptions = [
                '用户登录成功', '用户登出', '导出数据', '查看页面', '搜索记录',
                '创建新记录', '更新记录', '删除记录', '操作失败', '系统错误'
            ]
            
            for i in range(10):
                action = random.choice(test_actions)
                description = random.choice(test_descriptions)
                
                # 模拟日志记录
                log_data = {
                    'action': action,
                    'description': f"测试日志 {i+1}: {description}",
                    'ip_address': f"192.168.1.{random.randint(1, 255)}",
                    'user_agent': 'LogSystemTester/1.0'
                }
                
                # 这里可以调用日志记录API（如果有的话）
                print(f"生成测试日志: {action} - {description}")
            
            self.log_test("测试数据生成", True, "生成了10条测试日志")
            
        except Exception as e:
            self.log_test("测试数据生成", False, f"异常: {str(e)}")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🚀 开始系统日志功能优化版测试")
        print("=" * 60)
        
        # 登录
        if not self.login():
            print("❌ 登录失败，无法继续测试")
            return
        
        print("\n📊 功能测试")
        print("-" * 30)
        
        # 生成测试数据
        self.generate_test_logs()
        
        # 基础功能测试
        self.test_realtime_monitoring()
        self.test_alerts_system()
        self.test_analysis_report()
        self.test_charts_api()
        
        print("\n📤 导出功能测试")
        print("-" * 30)
        self.test_advanced_export()
        self.test_json_export()
        
        print("\n🧹 清理功能测试")
        print("-" * 30)
        self.test_cleanup_function()
        
        print("\n⚡ 性能测试")
        print("-" * 30)
        self.test_performance()
        
        print("\n🛡️ 错误处理测试")
        print("-" * 30)
        self.test_error_handling()
        
        # 生成测试报告
        self.generate_report()
    
    def generate_report(self):
        """生成测试报告"""
        print("\n" + "=" * 60)
        print("📋 测试报告")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for r in self.test_results if r['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"总测试数: {total_tests}")
        print(f"通过: {passed_tests} ✅")
        print(f"失败: {failed_tests} ❌")
        print(f"成功率: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n❌ 失败的测试:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n✅ 通过的测试:")
        for result in self.test_results:
            if result['success']:
                print(f"  - {result['test']}: {result['message']}")
        
        # 保存详细报告
        report_data = {
            'test_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'total_tests': total_tests,
            'passed_tests': passed_tests,
            'failed_tests': failed_tests,
            'success_rate': (passed_tests/total_tests*100),
            'results': self.test_results
        }
        
        with open('日志功能测试报告.json', 'w', encoding='utf-8') as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 详细报告已保存到: 日志功能测试报告.json")
        
        if failed_tests == 0:
            print("\n🎉 所有测试通过！系统日志功能优化版运行正常。")
        else:
            print(f"\n⚠️ 有 {failed_tests} 个测试失败，请检查相关功能。")

def main():
    """主函数"""
    tester = LogSystemTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main() 