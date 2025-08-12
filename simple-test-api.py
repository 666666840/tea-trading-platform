#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import requests
import json

print("🧪 简单API测试...")

try:
    # 测试推荐内容
    response = requests.get("http://127.0.0.1:3000/api/content?type=recommend", timeout=5)
    print(f"状态码：{response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"数据类型：{type(data)}")
        
        # 如果是字典，可能有recommend键
        if isinstance(data, dict):
            if 'recommend' in data:
                items = data['recommend']
            else:
                print("字典键：", list(data.keys()))
                items = list(data.values())[0] if data else []
        else:
            items = data
        
        print(f"✅ 推荐内容数量：{len(items)}")
        
        # 显示最后几个内容
        if items:
            for i, item in enumerate(items[-2:], 1):  # 显示最后2个
                print(f"\n📝 推荐 {len(items) - 2 + i}:")
                print(f"   标题：{item.get('title', '未知')}")
                print(f"   类别：{item.get('category', '未知')}")
                print(f"   价格：{item.get('price', '未知')}")
                if 'seasonal_theme' in item:
                    print(f"   季节主题：{item.get('seasonal_theme', '未知')}")
    
    print("\n🎯 测试完成！")
    
except Exception as e:
    print(f"❌ 错误：{e}")
    import traceback
    traceback.print_exc() 