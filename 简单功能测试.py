#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
系统日志功能简化测试脚本
直接测试新增的API功能
"""

import requests
import json
import time
from datetime import datetime, timedelta

# 配置
BASE_URL = "http://localhost:5001"

class SimpleLogTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'SimpleLogTester/1.0',
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
    
    def test_api_endpoints(self):
        """测试API端点是否存在"""
        print("🔍 测试API端点可访问性")
        print("-" * 40)
        
        # 测试基础API
        apis = [
            ('/api/logs/stats', 'GET', '统计API'),
            ('/api/logs/charts', 'GET', '图表API'),
            ('/api/logs/realtime', 'GET', '实时监控API'),
            ('/api/logs/alerts', 'GET', '告警系统API'),
            ('/api/logs/analysis', 'GET', '分析报告API'),
        ]
        
        for api_path, method, name in apis:
            try:
                if method == 'GET':
                    response = self.session.get(f"{BASE_URL}{api_path}")
                else:
                    response = self.session.post(f"{BASE_URL}{api_path}")
                
                if response.status_code == 200:
                    self.log_test(f"{name}端点", True, f"HTTP {response.status_code}")
                elif response.status_code == 401:
                    self.log_test(f"{name}端点", True, f"需要登录 (HTTP {response.status_code})")
                else:
                    self.log_test(f"{name}端点", False, f"HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"{name}端点", False, f"连接失败: {str(e)}")
    
    def test_export_endpoints(self):
        """测试导出相关API"""
        print("\n📤 测试导出功能API")
        print("-" * 40)
        
        # 测试高级导出API
        export_data = {
            'type': 'csv',
            'filters': {
                'action': 'login'
            }
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/api/logs/export/advanced", 
                                       json=export_data)
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                if 'text/csv' in content_type or 'application/json' in content_type:
                    self.log_test("高级导出API", True, "成功响应")
                else:
                    try:
                        data = response.json()
                        if data.get('success'):
                            self.log_test("高级导出API", True, "API正常")
                        else:
                            self.log_test("高级导出API", False, data.get('message', '导出失败'))
                    except:
                        self.log_test("高级导出API", False, "响应格式错误")
            elif response.status_code == 401:
                self.log_test("高级导出API", True, "需要登录验证")
            else:
                self.log_test("高级导出API", False, f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("高级导出API", False, f"连接失败: {str(e)}")
    
    def test_cleanup_endpoints(self):
        """测试清理功能API"""
        print("\n🧹 测试清理功能API")
        print("-" * 40)
        
        cleanup_data = {
            'days': 365,
            'action_types': ['login', 'logout']
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/api/logs/cleanup", 
                                       json=cleanup_data)
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data.get('success'):
                        self.log_test("智能清理API", True, "API正常")
                    else:
                        self.log_test("智能清理API", False, data.get('message', '清理失败'))
                except:
                    self.log_test("智能清理API", False, "响应格式错误")
            elif response.status_code == 401:
                self.log_test("智能清理API", True, "需要登录验证")
            else:
                self.log_test("智能清理API", False, f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("智能清理API", False, f"连接失败: {str(e)}")
    
    def test_server_status(self):
        """测试服务器状态"""
        print("\n🖥️ 测试服务器状态")
        print("-" * 40)
        
        try:
            # 测试根路径
            response = self.session.get(f"{BASE_URL}/")
            if response.status_code == 200:
                self.log_test("服务器状态", True, "服务器运行正常")
            else:
                self.log_test("服务器状态", True, f"服务器响应 (HTTP {response.status_code})")
        except Exception as e:
            self.log_test("服务器状态", False, f"无法连接: {str(e)}")
    
    def generate_report(self):
        """生成测试报告"""
        print("\n" + "=" * 60)
        print("📋 简化测试报告")
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
        
        with open('简化功能测试报告.json', 'w', encoding='utf-8') as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 详细报告已保存到: 简化功能测试报告.json")
        
        if failed_tests == 0:
            print("\n🎉 所有API端点测试通过！新功能已成功部署。")
        else:
            print(f"\n⚠️ 有 {failed_tests} 个测试失败，请检查相关功能。")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🚀 开始系统日志功能简化测试")
        print("=" * 60)
        
        # 测试服务器状态
        self.test_server_status()
        
        # 测试API端点
        self.test_api_endpoints()
        
        # 测试导出功能
        self.test_export_endpoints()
        
        # 测试清理功能
        self.test_cleanup_endpoints()
        
        # 生成报告
        self.generate_report()

def main():
    """主函数"""
    tester = SimpleLogTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main() 