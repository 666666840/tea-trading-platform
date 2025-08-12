#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据同步工具 - 简化版
将数据库中的真实数据转换为微信小程序可用的JSON格式
"""

import json
import sqlite3
from datetime import datetime

def sync_data_to_miniprogram():
    """将数据库数据同步为小程序格式"""
    print("🔄 开始数据同步...")
    
    try:
        # 连接数据库
        conn = sqlite3.connect('content_management.db')
        cursor = conn.cursor()
        
        # 获取商户数据
        cursor.execute("SELECT * FROM merchants WHERE status = 'approved'")
        merchants_data = []
        for row in cursor.fetchall():
            merchants_data.append({
                "id": row[0], "name": row[1], "category": row[2],
                "contact": row[3], "phone": row[4], "email": row[5],
                "province": row[6], "city": row[7], "address": row[8],
                "description": row[9], "status": row[13]
            })
        
        # 获取产品数据
        cursor.execute("SELECT * FROM products WHERE status = 'active'")
        products_data = []
        for row in cursor.fetchall():
            products_data.append({
                "id": row[0], "name": row[1], "category": row[2],
                "price": row[3], "merchantId": row[4], "description": row[5],
                "specification": row[6], "origin": row[7], "grade": row[8],
                "stock": row[9], "status": row[10]
            })
        
        conn.close()
        
        # 生成小程序数据
        miniprogram_data = {
            "version": "1.0",
            "syncTime": datetime.now().isoformat(),
            "realMerchants": merchants_data,
            "realProducts": products_data
        }
        
        # 保存数据文件
        with open("miniprogram_real_data.json", 'w', encoding='utf-8') as f:
            json.dump(miniprogram_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 数据同步完成!")
        print(f"📊 商户: {len(merchants_data)} 个")
        print(f"📊 产品: {len(products_data)} 个")
        
        return True
        
    except Exception as e:
        print(f"❌ 数据同步失败: {e}")
        return False

if __name__ == "__main__":
    sync_data_to_miniprogram()
