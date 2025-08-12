#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import urllib.request
import json
from urllib.error import URLError, HTTPError

def test_api_endpoints():
    """测试所有API接口"""
    base_url = "http://82.157.231.110:3000"
    
    endpoints = [
        {"path": "/health", "name": "健康检查"},
        {"path": "/api/content?type=recommend", "name": "推荐内容"},
        {"path": "/api/content?type=news", "name": "茶叶新闻"},
        {"path": "/api/content?type=art", "name": "茶艺教程"},
        {"path": "/api/content?type=hot", "name": "热点话题"},
        {"path": "/api/market/provinces", "name": "省份市场"},
        {"path": "/api/inquiry", "name": "采购询价"},
        {"path": "/api/brand", "name": "知名品牌"},
        {"path": "/api/clearance", "name": "尾货清仓"},
        {"path": "/api/newarrival", "name": "新品到货"},
        {"path": "/api/garden", "name": "茶园直通"},
        {"path": "/api/supply", "name": "供求平台"}
    ]
    
    print("🔍 开始测试茶叶小程序API接口...")
    print("=" * 60)
    
    success_count = 0
    total_count = len(endpoints)
    
    for endpoint in endpoints:
        url = base_url + endpoint["path"]
        try:
            print(f"🌐 测试 {endpoint['name']}: {endpoint['path']}")
            
            with urllib.request.urlopen(url, timeout=10) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode('utf-8'))
                    print(f"   ✅ 成功 - 状态码: {response.status}")
                    
                    if 'status' in data:
                        print(f"   📊 响应状态: {data['status']}")
                    
                    if 'data' in data and isinstance(data['data'], list):
                        print(f"   📈 数据项数: {len(data['data'])}")
                    elif 'message' in data:
                        print(f"   💬 响应消息: {data['message']}")
                    
                    success_count += 1
                else:
                    print(f"   ❌ 失败 - 状态码: {response.status}")
                    
        except HTTPError as e:
            print(f"   ❌ HTTP错误 - 状态码: {e.code}")
        except URLError as e:
            print(f"   ❌ 连接错误: {e.reason}")
        except Exception as e:
            print(f"   ❌ 其他错误: {str(e)}")
        
        print("-" * 50)
    
    print(f"\n📋 测试结果统计:")
    print(f"   总接口数: {total_count}")
    print(f"   成功连接: {success_count}")
    print(f"   失败连接: {total_count - success_count}")
    print(f"   成功率: {(success_count/total_count)*100:.1f}%")
    
    if success_count == total_count:
        print("\n🎉 所有API接口连接正常！")
        print("如果小程序仍无法连接，请检查以下配置：")
        print("1. 微信开发者工具 -> 详情 -> 不校验合法域名")
        print("2. 项目设置 -> 服务器域名配置")
        print("3. 网络环境是否允许访问外部API")
    else:
        print(f"\n⚠️  {total_count - success_count} 个接口连接失败，请检查API服务")

if __name__ == "__main__":
    test_api_endpoints() 