#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
高级搜索和筛选功能测试脚本
"""

import requests
import json
import time
from datetime import datetime

# 测试配置
BASE_URL = 'http://localhost:3000'
TIMEOUT = 10

class AdvancedSearchTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'AdvancedSearchTester/1.0'
        })
    
    def test_health(self):
        """测试服务器健康状态"""
        print("📡 [测试] 检查服务器连接...")
        try:
            response = self.session.get(f"{self.base_url}/health", timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                print(f"✅ 服务器连接正常: {data}")
                return True
            else:
                print(f"❌ 服务器连接失败: HTTP {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 服务器连接异常: {e}")
            return False
    
    def test_filter_options(self):
        """测试筛选选项获取"""
        print("\n🔧 [测试] 获取筛选选项...")
        try:
            response = self.session.get(f"{self.base_url}/api/filter-options?type=all", timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                print(f"✅ 筛选选项获取成功:")
                for key, value in data.get('data', {}).items():
                    print(f"   - {key}: {value}")
                return True
            else:
                print(f"❌ 筛选选项获取失败: HTTP {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ 筛选选项获取异常: {e}")
            return False
    
    def test_advanced_search_markets(self):
        """测试市场高级搜索"""
        print("\n🔍 [测试] 市场高级搜索...")
        test_cases = [
            {
                'name': '关键词搜索',
                'params': {'keyword': '茶叶'}
            },
            {
                'name': '省份筛选',
                'params': {'province': '福建省'}
            },
            {
                'name': '组合搜索',
                'params': {'keyword': '茶叶', 'province': '福建省'}
            },
            {
                'name': '分页测试',
                'params': {'page': 1, 'per_page': 5}
            }
        ]
        
        for test_case in test_cases:
            try:
                print(f"   - 测试: {test_case['name']}")
                response = self.session.get(
                    f"{self.base_url}/api/advanced-search/markets",
                    params=test_case['params'],
                    timeout=TIMEOUT
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('status') == 'success':
                        print(f"     ✅ 成功: {len(data['data'])} 条结果")
                        if data['data']:
                            print(f"     📋 示例: {data['data'][0].get('name', 'N/A')}")
                    else:
                        print(f"     ❌ 失败: {data.get('message', '未知错误')}")
                else:
                    print(f"     ❌ HTTP错误: {response.status_code}")
                    
            except Exception as e:
                print(f"     ❌ 异常: {e}")
    
    def test_advanced_search_newarrivals(self):
        """测试新品高级搜索"""
        print("\n🔍 [测试] 新品高级搜索...")
        test_cases = [
            {
                'name': '关键词搜索',
                'params': {'keyword': '龙井'}
            },
            {
                'name': '分类筛选',
                'params': {'category': '绿茶'}
            },
            {
                'name': '价格范围',
                'params': {'price_range': '100-500'}
            },
            {
                'name': '组合搜索',
                'params': {'keyword': '龙井', 'category': '绿茶', 'price_range': '100-500'}
            }
        ]
        
        for test_case in test_cases:
            try:
                print(f"   - 测试: {test_case['name']}")
                response = self.session.get(
                    f"{self.base_url}/api/advanced-search/newarrivals",
                    params=test_case['params'],
                    timeout=TIMEOUT
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('status') == 'success':
                        print(f"     ✅ 成功: {len(data['data'])} 条结果")
                        if data['data']:
                            print(f"     📋 示例: {data['data'][0].get('name', 'N/A')}")
                    else:
                        print(f"     ❌ 失败: {data.get('message', '未知错误')}")
                else:
                    print(f"     ❌ HTTP错误: {response.status_code}")
                    
            except Exception as e:
                print(f"     ❌ 异常: {e}")
    
    def test_advanced_search_supplies(self):
        """测试供求高级搜索"""
        print("\n🔍 [测试] 供求高级搜索...")
        test_cases = [
            {
                'name': '关键词搜索',
                'params': {'keyword': '铁观音'}
            },
            {
                'name': '类型筛选',
                'params': {'type': '供应'}
            },
            {
                'name': '状态筛选',
                'params': {'status': 'active'}
            },
            {
                'name': '组合搜索',
                'params': {'keyword': '铁观音', 'type': '供应', 'status': 'active'}
            }
        ]
        
        for test_case in test_cases:
            try:
                print(f"   - 测试: {test_case['name']}")
                response = self.session.get(
                    f"{self.base_url}/api/advanced-search/supplies",
                    params=test_case['params'],
                    timeout=TIMEOUT
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('status') == 'success':
                        print(f"     ✅ 成功: {len(data['data'])} 条结果")
                        if data['data']:
                            print(f"     📋 示例: {data['data'][0].get('title', 'N/A')}")
                    else:
                        print(f"     ❌ 失败: {data.get('message', '未知错误')}")
                else:
                    print(f"     ❌ HTTP错误: {response.status_code}")
                    
            except Exception as e:
                print(f"     ❌ 异常: {e}")
    
    def test_advanced_search_clearance(self):
        """测试清仓高级搜索"""
        print("\n🔍 [测试] 清仓高级搜索...")
        test_cases = [
            {
                'name': '关键词搜索',
                'params': {'keyword': '普洱'}
            },
            {
                'name': '分类筛选',
                'params': {'category': '普洱茶'}
            },
            {
                'name': '价格范围',
                'params': {'price_range': '50-300'}
            },
            {
                'name': '组合搜索',
                'params': {'keyword': '普洱', 'category': '普洱茶', 'price_range': '50-300'}
            }
        ]
        
        for test_case in test_cases:
            try:
                print(f"   - 测试: {test_case['name']}")
                response = self.session.get(
                    f"{self.base_url}/api/advanced-search/clearance",
                    params=test_case['params'],
                    timeout=TIMEOUT
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('status') == 'success':
                        print(f"     ✅ 成功: {len(data['data'])} 条结果")
                        if data['data']:
                            print(f"     📋 示例: {data['data'][0].get('name', 'N/A')}")
                    else:
                        print(f"     ❌ 失败: {data.get('message', '未知错误')}")
                else:
                    print(f"     ❌ HTTP错误: {response.status_code}")
                    
            except Exception as e:
                print(f"     ❌ 异常: {e}")
    
    def test_advanced_search_content(self):
        """测试内容高级搜索"""
        print("\n🔍 [测试] 内容高级搜索...")
        test_cases = [
            {
                'name': '关键词搜索',
                'params': {'keyword': '茶艺'}
            },
            {
                'name': '类型筛选',
                'params': {'type': 'art'}
            },
            {
                'name': '标签筛选',
                'params': {'tag': '冲泡技巧'}
            },
            {
                'name': '组合搜索',
                'params': {'keyword': '茶艺', 'type': 'art', 'tag': '冲泡技巧'}
            }
        ]
        
        for test_case in test_cases:
            try:
                print(f"   - 测试: {test_case['name']}")
                response = self.session.get(
                    f"{self.base_url}/api/advanced-search/content",
                    params=test_case['params'],
                    timeout=TIMEOUT
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('status') == 'success':
                        print(f"     ✅ 成功: {len(data['data'])} 条结果")
                        if data['data']:
                            print(f"     📋 示例: {data['data'][0].get('title', 'N/A')}")
                    else:
                        print(f"     ❌ 失败: {data.get('message', '未知错误')}")
                else:
                    print(f"     ❌ HTTP错误: {response.status_code}")
                    
            except Exception as e:
                print(f"     ❌ 异常: {e}")
    
    def test_edge_cases(self):
        """测试边界情况"""
        print("\n🔬 [测试] 边界情况测试...")
        
        # 空搜索
        try:
            print("   - 测试: 空搜索")
            response = self.session.get(f"{self.base_url}/api/advanced-search/markets", timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                print(f"     ✅ 空搜索正常: {len(data.get('data', []))} 条结果")
            else:
                print(f"     ❌ 空搜索失败: HTTP {response.status_code}")
        except Exception as e:
            print(f"     ❌ 空搜索异常: {e}")
        
        # 无效价格范围
        try:
            print("   - 测试: 无效价格范围")
            response = self.session.get(
                f"{self.base_url}/api/advanced-search/newarrivals",
                params={'price_range': 'invalid-price'},
                timeout=TIMEOUT
            )
            if response.status_code == 200:
                data = response.json()
                print(f"     ✅ 无效价格范围处理正常: {len(data.get('data', []))} 条结果")
            else:
                print(f"     ❌ 无效价格范围处理失败: HTTP {response.status_code}")
        except Exception as e:
            print(f"     ❌ 无效价格范围处理异常: {e}")
        
        # 无效日期范围
        try:
            print("   - 测试: 无效日期范围")
            response = self.session.get(
                f"{self.base_url}/api/advanced-search/supplies",
                params={'date_range': 'invalid-date'},
                timeout=TIMEOUT
            )
            if response.status_code == 200:
                data = response.json()
                print(f"     ✅ 无效日期范围处理正常: {len(data.get('data', []))} 条结果")
            else:
                print(f"     ❌ 无效日期范围处理失败: HTTP {response.status_code}")
        except Exception as e:
            print(f"     ❌ 无效日期范围处理异常: {e}")
    
    def test_performance(self):
        """性能测试"""
        print("\n⚡ [测试] 性能测试...")
        
        start_time = time.time()
        
        try:
            # 并发搜索测试
            import concurrent.futures
            
            def search_task(search_type, params):
                try:
                    response = self.session.get(
                        f"{self.base_url}/api/advanced-search/{search_type}",
                        params=params,
                        timeout=TIMEOUT
                    )
                    if response.status_code == 200:
                        data = response.json()
                        return f"{search_type}: {len(data.get('data', []))} 条结果"
                    else:
                        return f"{search_type}: HTTP {response.status_code}"
                except Exception as e:
                    return f"{search_type}: 异常 {e}"
            
            search_tasks = [
                ('markets', {'keyword': '茶'}),
                ('newarrivals', {'category': '绿茶'}),
                ('supplies', {'type': '供应'}),
                ('clearance', {'category': '普洱茶'}),
                ('content', {'type': 'recommend'})
            ]
            
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                futures = [executor.submit(search_task, search_type, params) 
                          for search_type, params in search_tasks]
                results = [future.result() for future in concurrent.futures.as_completed(futures)]
            
            end_time = time.time()
            duration = end_time - start_time
            
            print(f"✅ 并发搜索测试完成，耗时: {duration:.2f}秒")
            print(f"   - 平均响应时间: {duration/len(results):.2f}秒")
            
            for result in results:
                print(f"   - {result}")
                
        except Exception as e:
            print(f"❌ 性能测试失败: {e}")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🚀 [高级搜索测试] 开始全面测试...")
        print("=" * 50)
        
        try:
            # 基础功能测试
            if not self.test_health():
                print("❌ 服务器连接失败，停止测试")
                return
            
            self.test_filter_options()
            self.test_advanced_search_markets()
            self.test_advanced_search_newarrivals()
            self.test_advanced_search_supplies()
            self.test_advanced_search_clearance()
            self.test_advanced_search_content()
            
            # 边界情况测试
            self.test_edge_cases()
            
            # 性能测试
            self.test_performance()
            
            print("\n🎉 [测试完成] 所有测试通过!")
            print("=" * 50)
            
        except Exception as e:
            print(f"\n❌ [测试失败] 测试过程中出现错误: {e}")

def main():
    """主函数"""
    tester = AdvancedSearchTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main() 