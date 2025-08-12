#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
清理数据库重新开始
删除所有数据表，重新创建干净的数据库
"""

import sqlite3
import os

def clean_database():
    """清理数据库"""
    print("🗑️ 清理数据库...")
    
    try:
        # 连接数据库
        conn = sqlite3.connect('content_management.db')
        cursor = conn.cursor()
        
        # 删除所有表
        tables = ['garden_data', 'merchants', 'products']
        for table in tables:
            cursor.execute(f"DROP TABLE IF EXISTS {table}")
            print(f"✅ 删除表: {table}")
        
        conn.commit()
        conn.close()
        
        print("✅ 数据库清理完成！")
        return True
        
    except Exception as e:
        print(f"❌ 数据库清理失败: {e}")
        return False

if __name__ == "__main__":
    clean_database()
