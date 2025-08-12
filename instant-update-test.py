#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
立即测试内容更新功能
"""

import requests
import time
import json

def test_content_update():
    """测试内容更新功能"""
    base_url = "http://localhost:3000"
    
    print("🧪 开始测试内容自动更新功能...")
    
    # 1. 获取初始内容
    print("\n📋 获取初始推荐内容：")
    try:
        response = requests.get(f"{base_url}/api/content?type=recommend")
        if response.status_code == 200:
            data = response.json()
            initial_count = len(data.get('data', []))
            print(f"初始内容数量：{initial_count}")
            for item in data.get('data', []):
                print(f"  - {item.get('title', '未知')}")
        else:
            print(f"❌ 获取内容失败：{response.status_code}")
            return
    except Exception as e:
        print(f"❌ 连接服务器失败：{e}")
        return
    
    # 2. 等待一段时间让自动更新生效
    print(f"\n⏰ 等待自动更新生效（需要约10-15分钟）...")
    print("💡 自动更新机制每30秒检查一次，每20次检查（10分钟）会添加新内容")
    
    # 模拟多次检查
    for i in range(25):
        print(f"检查进度：{i+1}/25", end='\r')
        time.sleep(30)  # 等待30秒
        
        # 每5次检查一次内容
        if (i + 1) % 5 == 0:
            try:
                response = requests.get(f"{base_url}/api/content?type=recommend")
                if response.status_code == 200:
                    data = response.json()
                    current_count = len(data.get('data', []))
                    print(f"\n第{i+1}次检查 - 当前内容数量：{current_count}")
                    
                    if current_count > initial_count:
                        print("🎉 检测到新内容！")
                        for item in data.get('data', []):
                            print(f"  - {item.get('title', '未知')}")
                        break
                else:
                    print(f"\n❌ 检查失败：{response.status_code}")
            except Exception as e:
                print(f"\n❌ 检查过程出错：{e}")
    
    # 3. 最终检查结果
    print(f"\n📊 最终结果检查：")
    try:
        response = requests.get(f"{base_url}/api/content?type=recommend")
        if response.status_code == 200:
            data = response.json()
            final_count = len(data.get('data', []))
            print(f"最终内容数量：{final_count}")
            print("最终内容列表：")
            for item in data.get('data', []):
                print(f"  - {item.get('title', '未知')}")
            
            if final_count > initial_count:
                print("✅ 内容自动更新功能正常工作！")
            else:
                print("⚠️ 尚未检测到新内容，可能需要更长时间")
                
        # 检查热点内容
        print(f"\n🔥 检查热点内容：")
        response = requests.get(f"{base_url}/api/content?type=hot")
        if response.status_code == 200:
            data = response.json()
            print(f"热点内容数量：{len(data.get('data', []))}")
            for item in data.get('data', []):
                print(f"  - {item.get('title', '未知')}")
                
    except Exception as e:
        print(f"❌ 最终检查失败：{e}")

if __name__ == "__main__":
    test_content_update() 