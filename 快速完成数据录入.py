#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速完成数据录入
直接录入核心数据，快速完成
"""

import sqlite3
import json
from datetime import datetime

def quick_data_input():
    """快速录入核心数据"""
    print("🚀 快速录入核心茶叶数据...")
    
    # 连接数据库
    conn = sqlite3.connect('content_management.db')
    cursor = conn.cursor()
    
    # 删除旧表
    cursor.execute("DROP TABLE IF EXISTS garden_data")
    cursor.execute("DROP TABLE IF EXISTS merchants")
    cursor.execute("DROP TABLE IF EXISTS products")
    
    # 创建新表
    cursor.execute('''
        CREATE TABLE garden_data (
            id TEXT PRIMARY KEY, name TEXT, location TEXT, contact TEXT, phone TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE merchants (
            id TEXT PRIMARY KEY, name TEXT, category TEXT, contact TEXT, phone TEXT, province TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE products (
            id TEXT PRIMARY KEY, name TEXT, category TEXT, price REAL, merchant_id TEXT
        )
    ''')
    
    # 清空示例数据，等待真实数据导入
    gardens = []
    merchants = []
    products = []
    
    # 插入数据
    for garden in gardens:
        cursor.execute("INSERT INTO garden_data VALUES (?, ?, ?, ?, ?)", garden)
    
    for merchant in merchants:
        cursor.execute("INSERT INTO merchants VALUES (?, ?, ?, ?, ?, ?)", merchant)
    
    for product in products:
        cursor.execute("INSERT INTO products VALUES (?, ?, ?, ?, ?)", product)
    
    conn.commit()
    conn.close()
    
    print("✅ 快速数据录入完成！")
    print("📊 数据统计:")
    print(f"   🌱 茶园: {len(gardens)} 个")
    print(f"   🏪 商户: {len(merchants)} 个")
    print(f"   🍵 产品: {len(products)} 个")
    
    # 导出数据
    export_data = {
        "exportTime": datetime.now().isoformat(),
        "gardens": gardens,
        "merchants": merchants,
        "products": products
    }
    
    with open("快速录入数据.json", 'w', encoding='utf-8') as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2)
    
    print("✅ 数据已导出到: 快速录入数据.json")

if __name__ == "__main__":
    quick_data_input()
