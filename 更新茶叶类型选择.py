#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新茶叶类型选择
支持7种茶叶类型：绿茶、白茶、黄茶、青茶(乌龙茶)、红茶、黑茶、花茶
支持多选功能
"""

import sqlite3
import json
from datetime import datetime

def update_tea_types():
    """更新茶叶类型选择"""
    print("🔄 更新茶叶类型选择...")
    
    # 定义标准茶叶类型
    tea_types = [
        "绿茶",
        "白茶", 
        "黄茶",
        "青茶(乌龙茶)",
        "红茶",
        "黑茶",
        "花茶"
    ]
    
    # 连接数据库
    conn = sqlite3.connect('content_management.db')
    cursor = conn.cursor()
    
    # 更新产品表中的茶叶类型
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    
    # 更新产品数据，使用标准茶叶类型
    updated_products = []
    for product in products:
        product_id, name, old_category, price, merchant_id = product
        
        # 根据产品名称映射到标准茶叶类型
        new_category = map_tea_category(name, old_category)
        updated_products.append((product_id, name, new_category, price, merchant_id))
    
    # 删除旧表并重新创建
    cursor.execute("DROP TABLE IF EXISTS products")
    cursor.execute('''
        CREATE TABLE products (
            id TEXT PRIMARY KEY,
            name TEXT,
            category TEXT,
            price REAL,
            merchant_id TEXT,
            tea_types TEXT DEFAULT ''  -- 新增多选茶叶类型字段
        )
    ''')
    
    # 插入更新后的产品数据
    for product in updated_products:
        product_id, name, category, price, merchant_id = product
        # 将单个类别转换为多选格式
        tea_types = category if category else "其他"
        cursor.execute(
            "INSERT INTO products (id, name, category, price, merchant_id, tea_types) VALUES (?, ?, ?, ?, ?, ?)",
            (product_id, name, category, price, merchant_id, tea_types)
        )
    
    # 添加更多产品数据，展示多选功能
    additional_products = [
        ("product_004", "碧螺春绿茶", "绿茶", 399.0, "merchant_002", "绿茶"),
        ("product_005", "大红袍岩茶", "青茶(乌龙茶)", 699.0, "merchant_001", "青茶(乌龙茶)"),
        ("product_006", "白毫银针", "白茶", 899.0, "merchant_003", "白茶"),
        ("product_007", "君山银针", "黄茶", 599.0, "merchant_001", "黄茶"),
        ("product_008", "正山小种", "红茶", 299.0, "merchant_002", "红茶"),
        ("product_009", "普洱茶饼", "黑茶", 199.0, "merchant_003", "黑茶"),
        ("product_010", "茉莉花茶", "花茶", 159.0, "merchant_001", "花茶"),
        ("product_011", "铁观音+大红袍", "青茶(乌龙茶)", 499.0, "merchant_001", "青茶(乌龙茶),绿茶"),
        ("product_012", "龙井+碧螺春", "绿茶", 459.0, "merchant_002", "绿茶,白茶")
    ]
    
    for product in additional_products:
        cursor.execute(
            "INSERT INTO products (id, name, category, price, merchant_id, tea_types) VALUES (?, ?, ?, ?, ?, ?)",
            product
        )
    
    conn.commit()
    conn.close()
    
    print("✅ 茶叶类型更新完成！")
    print(f"📋 支持的茶叶类型: {', '.join(tea_types)}")
    print(f"🍵 产品总数: {len(updated_products) + len(additional_products)} 个")
    
    # 导出更新后的数据
    export_updated_data()
    
    return tea_types

def map_tea_category(name, old_category):
    """映射茶叶类别到标准类型"""
    name_lower = name.lower()
    
    if "铁观音" in name or "乌龙" in name or "岩茶" in name:
        return "青茶(乌龙茶)"
    elif "龙井" in name or "碧螺春" in name or "绿茶" in name:
        return "绿茶"
    elif "普洱" in name or "黑茶" in name:
        return "黑茶"
    elif "红茶" in name or "小种" in name:
        return "红茶"
    elif "白茶" in name or "银针" in name:
        return "白茶"
    elif "黄茶" in name:
        return "黄茶"
    elif "花茶" in name or "茉莉" in name:
        return "花茶"
    else:
        return old_category if old_category else "其他"

def export_updated_data():
    """导出更新后的数据"""
    print("📤 导出更新后的数据...")
    
    conn = sqlite3.connect('content_management.db')
    cursor = conn.cursor()
    
    # 获取所有数据
    cursor.execute("SELECT * FROM garden_data")
    gardens = [{"id": row[0], "name": row[1], "location": row[2], "contact": row[3], "phone": row[4]} for row in cursor.fetchall()]
    
    cursor.execute("SELECT * FROM merchants")
    merchants = [{"id": row[0], "name": row[1], "category": row[2], "contact": row[3], "phone": row[4], "province": row[5]} for row in cursor.fetchall()]
    
    cursor.execute("SELECT * FROM products")
    products = [{"id": row[0], "name": row[1], "category": row[2], "price": row[3], "merchantId": row[4], "teaTypes": row[5]} for row in cursor.fetchall()]
    
    conn.close()
    
    # 生成导出数据
    export_data = {
        "version": "2.0",
        "updateTime": datetime.now().isoformat(),
        "teaTypes": ["绿茶", "白茶", "黄茶", "青茶(乌龙茶)", "红茶", "黑茶", "花茶"],
        "gardenData": gardens,
        "merchantData": merchants,
        "productData": products
    }
    
    # 保存文件
    with open("更新后的小程序数据.json", 'w', encoding='utf-8') as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2)
    
    print("✅ 数据导出完成: 更新后的小程序数据.json")
    print(f"📊 导出统计:")
    print(f"   🌱 茶园: {len(gardens)} 个")
    print(f"   🏪 商户: {len(merchants)} 个")
    print(f"   🍵 产品: {len(products)} 个")

def create_tea_type_selector():
    """创建茶叶类型选择器配置"""
    print("🎨 创建茶叶类型选择器配置...")
    
    tea_type_config = {
        "title": "求购品类 *",
        "required": True,
        "multiSelect": True,
        "options": [
            {"id": "green", "name": "绿茶", "selected": False},
            {"id": "white", "name": "白茶", "selected": False},
            {"id": "yellow", "name": "黄茶", "selected": False},
            {"id": "oolong", "name": "青茶(乌龙茶)", "selected": False},
            {"id": "black", "name": "红茶", "selected": False},
            {"id": "dark", "name": "黑茶", "selected": False},
            {"id": "flower", "name": "花茶", "selected": False}
        ]
    }
    
    # 保存配置
    with open("茶叶类型选择器配置.json", 'w', encoding='utf-8') as f:
        json.dump(tea_type_config, f, ensure_ascii=False, indent=2)
    
    print("✅ 茶叶类型选择器配置已创建: 茶叶类型选择器配置.json")

if __name__ == "__main__":
    # 更新茶叶类型
    tea_types = update_tea_types()
    
    # 创建选择器配置
    create_tea_type_selector()
    
    print("\n" + "=" * 60)
    print("🎉 茶叶类型更新完成！")
    print("=" * 60)
    print("✅ 支持7种标准茶叶类型")
    print("✅ 支持多选功能")
    print("✅ 数据已更新并导出")
    print("✅ 选择器配置已创建")
    print("=" * 60)
