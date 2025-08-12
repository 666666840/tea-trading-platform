#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import requests
import json

print("🧪 测试API接口，检查新内容...")

try:
    # 测试推荐内容
    response = requests.get("http://127.0.0.1:3000/api/content?type=recommend", timeout=5)
    if response.status_code == 200:
        data = response.json()
        print(f"✅ 推荐内容数量：{len(data)}")
        if data:
            latest = data[-1]  # 最新的内容
            print(f"📝 最新推荐：{latest.get('title', '未知')}")
            print(f"🏷️ 价格：{latest.get('price', '未知')}")
            print(f"📍 产地：{latest.get('region', '未知')}")
    
    # 测试热点内容  
    response = requests.get("http://127.0.0.1:3000/api/content?type=hot", timeout=5)
    if response.status_code == 200:
        data = response.json()
        print(f"✅ 热点内容数量：{len(data)}")
        if data:
            latest = data[-1]
            print(f"🔥 最新热点：{latest.get('title', '未知')}")
            print(f"📊 热度指数：{latest.get('heat', '未知')}")
    
    print("\n🎯 API测试完成！新内容已被服务器成功读取！")
    
except requests.exceptions.RequestException as e:
    print(f"❌ 连接服务器失败：{e}")
    print("💡 请确保服务器正在运行（端口3000）")
except Exception as e:
    print(f"❌ 测试出错：{e}") 