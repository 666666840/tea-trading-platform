#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试新API服务器功能
"""

import requests
import json
import time

# 服务器配置
BASE_URL = 'http://localhost:3000'

def test_health():
    """测试健康检查"""
    print("🔍 测试健康检查...")
    try:
        response = requests.get(f'{BASE_URL}/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 健康检查通过: {data}")
            return True
        else:
            print(f"❌ 健康检查失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 健康检查异常: {e}")
        return False

def test_server_info():
    """测试服务器信息"""
    print("🔍 测试服务器信息...")
    try:
        response = requests.get(f'{BASE_URL}/', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 服务器信息: {data}")
            return True
        else:
            print(f"❌ 服务器信息获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 服务器信息异常: {e}")
        return False

def test_auth():
    """测试认证功能"""
    print("🔍 测试认证功能...")
    
    # 测试登录
    login_data = {
        'username': 'admin',
        'password': 'admin123'
    }
    
    try:
        response = requests.post(f'{BASE_URL}/api/auth/login', 
                               json=login_data, timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 登录成功: {data}")
            
            # 保存token用于后续测试
            if 'data' in data and 'user_id' in data['data']:
                return data['data']['user_id']
        else:
            print(f"❌ 登录失败: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ 登录异常: {e}")
        return None

def test_markets():
    """测试市场API"""
    print("🔍 测试市场API...")
    try:
        response = requests.get(f'{BASE_URL}/api/markets', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 市场数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 市场数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 市场API异常: {e}")
        return False

def test_newarrivals():
    """测试新品到货API"""
    print("🔍 测试新品到货API...")
    try:
        response = requests.get(f'{BASE_URL}/api/newarrivals', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 新品数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 新品数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 新品API异常: {e}")
        return False

def test_supplies():
    """测试供求信息API"""
    print("🔍 测试供求信息API...")
    try:
        response = requests.get(f'{BASE_URL}/api/supplies', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 供求数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 供求数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 供求API异常: {e}")
        return False

def test_clearance():
    """测试清仓特价API"""
    print("🔍 测试清仓特价API...")
    try:
        response = requests.get(f'{BASE_URL}/api/clearance', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 清仓数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 清仓数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 清仓API异常: {e}")
        return False

def test_content():
    """测试内容API"""
    print("🔍 测试内容API...")
    try:
        response = requests.get(f'{BASE_URL}/api/content?type=recommend', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 内容数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 内容数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 内容API异常: {e}")
        return False

def test_inquiry():
    """测试询价API"""
    print("🔍 测试询价API...")
    try:
        response = requests.get(f'{BASE_URL}/api/inquiry', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 询价数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 询价数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 询价API异常: {e}")
        return False

def test_brands():
    """测试品牌API"""
    print("🔍 测试品牌API...")
    try:
        response = requests.get(f'{BASE_URL}/api/brands', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 品牌数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 品牌数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 品牌API异常: {e}")
        return False

def test_gardens():
    """测试茶园API"""
    print("🔍 测试茶园API...")
    try:
        response = requests.get(f'{BASE_URL}/api/gardens', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 茶园数据获取成功: 共{len(data.get('data', []))}条记录")
            return True
        else:
            print(f"❌ 茶园数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 茶园API异常: {e}")
        return False

def test_stats():
    """测试统计API"""
    print("🔍 测试统计API...")
    try:
        response = requests.get(f'{BASE_URL}/api/stats', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 统计数据获取成功: {data}")
            return True
        else:
            print(f"❌ 统计数据获取失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 统计API异常: {e}")
        return False

def test_create_supply():
    """测试创建供求信息"""
    print("🔍 测试创建供求信息...")
    
    supply_data = {
        'type': 'supply',
        'title': '测试铁观音供应',
        'price': 150,
        'quantity': '100公斤',
        'contact': '13800138000',
        'description': '这是测试数据'
    }
    
    try:
        response = requests.post(f'{BASE_URL}/api/supplies', 
                               json=supply_data, timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ 供求信息创建成功: {data}")
            return True
        else:
            print(f"❌ 供求信息创建失败: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ 创建供求信息异常: {e}")
        return False

def main():
    """主测试函数"""
    print("🍵 茶叶一点通API服务器功能测试")
    print("=" * 50)
    
    # 测试结果统计
    test_results = []
    
    # 基础功能测试
    test_results.append(('健康检查', test_health()))
    test_results.append(('服务器信息', test_server_info()))
    
    # 认证测试
    user_id = test_auth()
    test_results.append(('认证功能', user_id is not None))
    
    # API功能测试
    test_results.append(('市场API', test_markets()))
    test_results.append(('新品到货API', test_newarrivals()))
    test_results.append(('供求信息API', test_supplies()))
    test_results.append(('清仓特价API', test_clearance()))
    test_results.append(('内容API', test_content()))
    test_results.append(('询价API', test_inquiry()))
    test_results.append(('品牌API', test_brands()))
    test_results.append(('茶园API', test_gardens()))
    test_results.append(('统计API', test_stats()))
    
    # 创建功能测试
    test_results.append(('创建供求信息', test_create_supply()))
    
    # 输出测试结果
    print("\n" + "=" * 50)
    print("📊 测试结果汇总")
    print("=" * 50)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ 通过" if result else "❌ 失败"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n总计: {passed}/{total} 项测试通过")
    
    if passed == total:
        print("🎉 所有测试通过！API服务器运行正常")
    else:
        print("⚠️ 部分测试失败，请检查服务器状态")
    
    return passed == total

if __name__ == "__main__":
    main() 