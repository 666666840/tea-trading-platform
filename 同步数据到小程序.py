#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
同步数据到小程序
将数据库中的真实数据转换为小程序可用的JSON格式
"""

import json
import sqlite3
from datetime import datetime

def sync_to_miniprogram():
    """同步数据到小程序格式"""
    print("🔄 同步数据到小程序...")
    
    # 连接数据库
    conn = sqlite3.connect('content_management.db')
    cursor = conn.cursor()
    
    # 获取茶园数据
    cursor.execute("SELECT * FROM garden_data")
    gardens = []
    for row in cursor.fetchall():
        gardens.append({
            "id": row[0],
            "name": row[1],
            "location": row[2],
            "contact": row[3],
            "phone": row[4]
        })
    
    # 获取商户数据
    cursor.execute("SELECT * FROM merchants")
    merchants = []
    for row in cursor.fetchall():
        merchants.append({
            "id": row[0],
            "name": row[1],
            "category": row[2],
            "contact": row[3],
            "phone": row[4],
            "province": row[5]
        })
    
    # 获取产品数据
    cursor.execute("SELECT * FROM products")
    products = []
    for row in cursor.fetchall():
        products.append({
            "id": row[0],
            "name": row[1],
            "category": row[2],
            "price": row[3],
            "merchantId": row[4]
        })
    
    conn.close()
    
    # 生成小程序数据
    miniprogram_data = {
        "version": "1.0",
        "syncTime": datetime.now().isoformat(),
        "gardenData": gardens,
        "merchantData": merchants,
        "productData": products
    }
    
    # 保存数据文件
    with open("miniprogram_data.json", 'w', encoding='utf-8') as f:
        json.dump(miniprogram_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 数据同步完成!")
    print(f"📊 同步统计:")
    print(f"   🌱 茶园: {len(gardens)} 个")
    print(f"   🏪 商户: {len(merchants)} 个")
    print(f"   🍵 产品: {len(products)} 个")
    print(f"📁 数据文件: miniprogram_data.json")
    
    return True

if __name__ == "__main__":
    sync_to_miniprogram()
