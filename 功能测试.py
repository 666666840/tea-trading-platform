#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
import time
from datetime import datetime

class TeaPlatformTester:
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.test_results = []
        
    def log_test(self, test_name, status, message=""):
        """记录测试结果"""
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.test_results.append(result)
        
        # 打印结果
        status_icon = "✅" if status == "PASS" else "❌"
        print(f"{status_icon} {test_name}: {message}")
        
    def test_health_check(self):
        """测试健康检查接口"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=5)
            if response.status_code == 200:
                self.log_test("健康检查", "PASS", "服务器运行正常")
                return True
            else:
                self.log_test("健康检查", "FAIL", f"状态码: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("健康检查", "FAIL", f"连接失败: {str(e)}")
            return False
    
    def test_content_api(self):
        """测试内容API接口"""
        try:
            # 测试推荐内容
            response = requests.get(f"{self.base_url}/api/content?type=recommend", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    self.log_test("推荐内容API", "PASS", f"获取到{len(data)}条推荐内容")
                else:
                    self.log_test("推荐内容API", "FAIL", "数据格式错误或为空")
            else:
                self.log_test("推荐内容API", "FAIL", f"状态码: {response.status_code}")
                
            # 测试新闻内容
            response = requests.get(f"{self.base_url}/api/content?type=news", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("新闻内容API", "PASS", f"获取到{len(data)}条新闻")
                else:
                    self.log_test("新闻内容API", "FAIL", "数据格式错误")
            else:
                self.log_test("新闻内容API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("内容API", "FAIL", f"测试失败: {str(e)}")
    
    def test_market_api(self):
        """测试市场API接口"""
        try:
            # 测试省份列表
            response = requests.get(f"{self.base_url}/api/market/provinces", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    self.log_test("省份列表API", "PASS", f"获取到{len(data)}个省份")
                else:
                    self.log_test("省份列表API", "FAIL", "数据格式错误或为空")
            else:
                self.log_test("省份列表API", "FAIL", f"状态码: {response.status_code}")
                
            # 测试具体省份市场
            response = requests.get(f"{self.base_url}/api/market/1", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("省份市场API", "PASS", f"获取到{len(data)}个市场")
                else:
                    self.log_test("省份市场API", "FAIL", "数据格式错误")
            else:
                self.log_test("省份市场API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("市场API", "FAIL", f"测试失败: {str(e)}")
    
    def test_supply_api(self):
        """测试供求API接口"""
        try:
            # 测试供应信息
            response = requests.get(f"{self.base_url}/api/supply", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("供应信息API", "PASS", f"获取到{len(data)}条供应信息")
                else:
                    self.log_test("供应信息API", "FAIL", "数据格式错误")
            else:
                self.log_test("供应信息API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("供应API", "FAIL", f"测试失败: {str(e)}")
    
    def test_newarrival_api(self):
        """测试新品到货API接口"""
        try:
            response = requests.get(f"{self.base_url}/api/newarrival", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("新品到货API", "PASS", f"获取到{len(data)}条新品信息")
                else:
                    self.log_test("新品到货API", "FAIL", "数据格式错误")
            else:
                self.log_test("新品到货API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("新品到货API", "FAIL", f"测试失败: {str(e)}")
    
    def test_clearance_api(self):
        """测试特价尾货API接口"""
        try:
            response = requests.get(f"{self.base_url}/api/clearance", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("特价尾货API", "PASS", f"获取到{len(data)}条特价信息")
                else:
                    self.log_test("特价尾货API", "FAIL", "数据格式错误")
            else:
                self.log_test("特价尾货API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("特价尾货API", "FAIL", f"测试失败: {str(e)}")
    
    def test_inquiry_api(self):
        """测试询价API接口"""
        try:
            # 测试获取询价列表
            response = requests.get(f"{self.base_url}/api/inquiry", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("询价列表API", "PASS", f"获取到{len(data)}条询价信息")
                else:
                    self.log_test("询价列表API", "FAIL", "数据格式错误")
            else:
                self.log_test("询价列表API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("询价API", "FAIL", f"测试失败: {str(e)}")
    
    def test_brand_api(self):
        """测试品牌API接口"""
        try:
            response = requests.get(f"{self.base_url}/api/brand", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("品牌列表API", "PASS", f"获取到{len(data)}个品牌")
                else:
                    self.log_test("品牌列表API", "FAIL", "数据格式错误")
            else:
                self.log_test("品牌列表API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("品牌API", "FAIL", f"测试失败: {str(e)}")
    
    def test_garden_api(self):
        """测试茶园API接口"""
        try:
            response = requests.get(f"{self.base_url}/api/garden", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("茶园信息API", "PASS", f"获取到{len(data)}条茶园信息")
                else:
                    self.log_test("茶园信息API", "FAIL", "数据格式错误")
            else:
                self.log_test("茶园信息API", "FAIL", f"状态码: {response.status_code}")
                
        except Exception as e:
            self.log_test("茶园API", "FAIL", f"测试失败: {str(e)}")
    
    def run_all_tests(self):
        """运行所有测试"""
        print("🧪 开始功能测试...")
        print("=" * 50)
        
        # 基础测试
        if not self.test_health_check():
            print("❌ 服务器连接失败，停止测试")
            return
        
        # API功能测试
        self.test_content_api()
        self.test_market_api()
        self.test_supply_api()
        self.test_newarrival_api()
        self.test_clearance_api()
        self.test_inquiry_api()
        self.test_brand_api()
        self.test_garden_api()
        
        # 生成测试报告
        self.generate_report()
    
    def generate_report(self):
        """生成测试报告"""
        print("\n" + "=" * 50)
        print("📊 测试报告")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = total_tests - passed_tests
        
        print(f"总测试数: {total_tests}")
        print(f"通过: {passed_tests}")
        print(f"失败: {failed_tests}")
        print(f"成功率: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n❌ 失败的测试:")
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"  - {result['test']}: {result['message']}")
        
        # 保存测试报告
        report_file = f"测试报告_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(self.test_results, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 详细报告已保存到: {report_file}")
        
        if passed_tests == total_tests:
            print("\n🎉 所有测试通过！系统运行正常！")
        else:
            print(f"\n⚠️  有{failed_tests}个测试失败，需要检查相关功能")

if __name__ == "__main__":
    tester = TeaPlatformTester()
    tester.run_all_tests() 