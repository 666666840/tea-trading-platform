#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json

def test_local_api():
    """测试本地API"""
    print("🔍 正在测试本地API连接...")
    
    try:
        # 测试健康检查接口
        response = requests.get('http://127.0.0.1:3000/health', timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API连接成功！")
            print(f"📊 响应状态: {data.get('status', 'unknown')}")
            print(f"💬 服务器消息: {data.get('message', 'N/A')}")
            
            # 测试内容接口
            print("\n🔍 测试内容接口...")
            content_response = requests.get('http://127.0.0.1:3000/api/content?type=recommend', timeout=5)
            
            if content_response.status_code == 200:
                content_data = content_response.json()
                print("✅ 内容接口工作正常！")
                print(f"📈 返回数据数量: {len(content_data.get('data', []))}")
                return True
            else:
                print(f"❌ 内容接口失败，状态码: {content_response.status_code}")
                return False
                
        else:
            print(f"❌ API连接失败，状态码: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ 无法连接到API服务器")
        print("💡 提示：API服务器可能没有启动")
        return False
    except requests.exceptions.Timeout:
        print("❌ API请求超时")
        return False
    except Exception as e:
        print(f"❌ 测试失败: {str(e)}")
        return False

def provide_solution():
    """提供解决方案"""
    print("\n🛠️ API离线问题解决方案:")
    print("=" * 40)
    
    print("1️⃣ 启动API服务器:")
    print("   运行: python quick-start-api.py")
    
    print("\n2️⃣ 或者使用原版服务器:")
    print("   运行: python server.py")
    
    print("\n3️⃣ 微信小程序配置:")
    print("   在微信开发者工具中:")
    print("   详情 → 本地设置 → 勾选'不校验合法域名'")
    
    print("\n4️⃣ 如果仍然无法连接:")
    print("   检查防火墙设置")
    print("   确保端口3000没有被占用")
    
    print("\n5️⃣ 降级方案:")
    print("   小程序已内置离线数据")
    print("   即使API离线也能正常使用")

if __name__ == "__main__":
    print("🔧 茶叶批发平台 API 状态检查")
    print("=" * 40)
    
    if test_local_api():
        print("\n🎉 API服务运行正常！")
        print("💡 你的小程序可以正常连接API了")
    else:
        provide_solution() 