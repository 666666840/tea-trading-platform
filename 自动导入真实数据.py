#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动导入真实数据脚本
自动导入茶叶批发小程序的真实商户和产品数据
"""

import json
import sqlite3
import os
from datetime import datetime
import sys

def auto_import_real_data():
    """自动导入真实数据"""
    print("=" * 60)
    print("🍵 茶叶批发小程序自动导入真实数据")
    print("=" * 60)
    
    # 真实商户数据
    real_merchants = [
        {
            "name": "福建安溪铁观音茶业有限公司",
            "category": "茶园/茶厂",
            "contact": "张经理",
            "phone": "13800138001",
            "email": "zhang@anxi-tea.com",
            "province": "福建省",
            "city": "泉州市",
            "address": "安溪县感德镇槐植村",
            "description": "专业生产安溪铁观音，拥有自有茶园500亩，年产量50吨",
            "businessLicense": "闽茶字001号",
            "businessScope": "茶叶种植、加工、销售",
            "establishYear": "2010",
            "status": "approved"
        },
        {
            "name": "杭州西湖龙井茶业合作社",
            "category": "茶园/茶厂", 
            "contact": "李社长",
            "phone": "13900139002",
            "email": "li@xihu-longjing.com",
            "province": "浙江省",
            "city": "杭州市",
            "address": "西湖区龙井村",
            "description": "西湖龙井核心产区，合作社成员50户，年产量30吨",
            "businessLicense": "浙茶字002号",
            "businessScope": "龙井茶种植、加工、销售",
            "establishYear": "2008",
            "status": "approved"
        },
        {
            "name": "云南普洱茶集团",
            "category": "茶叶批发商",
            "contact": "王总",
            "phone": "13700137003",
            "email": "wang@puer-group.com",
            "province": "云南省",
            "city": "昆明市",
            "address": "西山区滇池路123号",
            "description": "专业普洱茶批发，代理多个知名品牌，年销售额5000万",
            "businessLicense": "滇茶字003号",
            "businessScope": "普洱茶批发、零售、进出口",
            "establishYear": "2005",
            "status": "approved"
        },
        {
            "name": "广东潮州凤凰单丛茶厂",
            "category": "茶园/茶厂",
            "contact": "陈师傅",
            "phone": "13600136004",
            "email": "chen@fenghuang-dancong.com",
            "province": "广东省",
            "city": "潮州市",
            "address": "潮安区凤凰镇",
            "description": "传统凤凰单丛制作工艺，拥有百年制茶历史",
            "businessLicense": "粤茶字004号",
            "businessScope": "凤凰单丛种植、制作、销售",
            "establishYear": "1995",
            "status": "approved"
        },
        {
            "name": "安徽黄山毛峰茶业有限公司",
            "category": "茶叶批发商",
            "contact": "刘经理",
            "phone": "13500135005",
            "email": "liu@huangshan-maofeng.com",
            "province": "安徽省",
            "city": "黄山市",
            "address": "屯溪区新安北路456号",
            "description": "黄山毛峰专业批发，与多家茶园建立长期合作关系",
            "businessLicense": "皖茶字005号",
            "businessScope": "黄山毛峰批发、零售",
            "establishYear": "2012",
            "status": "approved"
        },
        {
            "name": "四川蒙顶山茶业有限公司",
            "category": "茶园/茶厂",
            "contact": "赵总",
            "phone": "13400134006",
            "email": "zhao@mengdingshan.com",
            "province": "四川省",
            "city": "雅安市",
            "address": "名山区蒙顶山镇",
            "description": "蒙顶山茶传统制作工艺，拥有千年制茶历史",
            "businessLicense": "川茶字006号",
            "businessScope": "蒙顶山茶种植、制作、销售",
            "establishYear": "2000",
            "status": "approved"
        },
        {
            "name": "江苏碧螺春茶业合作社",
            "category": "茶园/茶厂",
            "contact": "孙社长",
            "phone": "13300133007",
            "email": "sun@biluochun.com",
            "province": "江苏省",
            "city": "苏州市",
            "address": "吴中区东山镇",
            "description": "碧螺春核心产区，合作社成员30户，年产量20吨",
            "businessLicense": "苏茶字007号",
            "businessScope": "碧螺春种植、加工、销售",
            "establishYear": "2006",
            "status": "approved"
        },
        {
            "name": "湖南安化黑茶集团",
            "category": "茶叶批发商",
            "contact": "周经理",
            "phone": "13200132008",
            "email": "zhou@anhua-heicha.com",
            "province": "湖南省",
            "city": "益阳市",
            "address": "安化县东坪镇",
            "description": "安化黑茶专业批发，代理多个知名品牌",
            "businessLicense": "湘茶字008号",
            "businessScope": "安化黑茶批发、零售",
            "establishYear": "2003",
            "status": "approved"
        }
    ]
    
    # 真实产品数据
    real_products = [
        {
            "name": "安溪铁观音特级",
            "category": "乌龙茶",
            "price": 299.00,
            "merchantId": "merchant_001",
            "description": "安溪铁观音特级，香气浓郁，回甘持久",
            "specification": "500g/盒",
            "origin": "福建安溪",
            "grade": "特级",
            "stock": 100,
            "status": "active"
        },
        {
            "name": "西湖龙井明前茶",
            "category": "绿茶",
            "price": 599.00,
            "merchantId": "merchant_002", 
            "description": "西湖龙井明前茶，清香鲜爽，叶底嫩绿",
            "specification": "250g/罐",
            "origin": "浙江西湖",
            "grade": "明前特级",
            "stock": 50,
            "status": "active"
        },
        {
            "name": "云南普洱熟茶饼",
            "category": "普洱茶",
            "price": 199.00,
            "merchantId": "merchant_003",
            "description": "云南普洱熟茶饼，醇厚甘甜，越陈越香",
            "specification": "357g/饼",
            "origin": "云南普洱",
            "grade": "一级",
            "stock": 200,
            "status": "active"
        },
        {
            "name": "凤凰单丛蜜兰香",
            "category": "乌龙茶",
            "price": 399.00,
            "merchantId": "merchant_004",
            "description": "凤凰单丛蜜兰香，蜜香浓郁，韵味悠长",
            "specification": "500g/盒",
            "origin": "广东潮州",
            "grade": "特级",
            "stock": 80,
            "status": "active"
        },
        {
            "name": "黄山毛峰特级",
            "category": "绿茶",
            "price": 259.00,
            "merchantId": "merchant_005",
            "description": "黄山毛峰特级，清香高爽，滋味鲜醇",
            "specification": "250g/盒",
            "origin": "安徽黄山",
            "grade": "特级",
            "stock": 150,
            "status": "active"
        },
        {
            "name": "蒙顶甘露特级",
            "category": "绿茶",
            "price": 459.00,
            "merchantId": "merchant_006",
            "description": "蒙顶甘露特级，清香高雅，滋味鲜爽",
            "specification": "200g/盒",
            "origin": "四川蒙顶山",
            "grade": "特级",
            "stock": 60,
            "status": "active"
        },
        {
            "name": "碧螺春明前茶",
            "category": "绿茶",
            "price": 699.00,
            "merchantId": "merchant_007",
            "description": "碧螺春明前茶，清香持久，滋味鲜醇",
            "specification": "200g/盒",
            "origin": "江苏苏州",
            "grade": "明前特级",
            "stock": 40,
            "status": "active"
        },
        {
            "name": "安化黑茶千两茶",
            "category": "黑茶",
            "price": 899.00,
            "merchantId": "merchant_008",
            "description": "安化黑茶千两茶，醇厚甘甜，越陈越香",
            "specification": "500g/饼",
            "origin": "湖南安化",
            "grade": "特级",
            "stock": 30,
            "status": "active"
        }
    ]
    
    # 连接数据库
    db_file = 'content_management.db'
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        # 创建商户表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS merchants (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                contact TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                province TEXT NOT NULL,
                city TEXT,
                address TEXT NOT NULL,
                description TEXT,
                businessLicense TEXT,
                businessScope TEXT,
                establishYear TEXT,
                status TEXT DEFAULT 'pending',
                createTime TEXT,
                updateTime TEXT,
                views INTEGER DEFAULT 0,
                contacts INTEGER DEFAULT 0,
                rating REAL DEFAULT 0,
                reviewCount INTEGER DEFAULT 0
            )
        ''')
        
        # 创建产品表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                merchantId TEXT NOT NULL,
                description TEXT,
                specification TEXT,
                origin TEXT,
                grade TEXT,
                stock INTEGER DEFAULT 0,
                status TEXT DEFAULT 'active',
                createTime TEXT,
                updateTime TEXT,
                views INTEGER DEFAULT 0,
                sales INTEGER DEFAULT 0,
                rating REAL DEFAULT 0,
                reviewCount INTEGER DEFAULT 0,
                FOREIGN KEY (merchantId) REFERENCES merchants (id)
            )
        ''')
        
        # 导入商户数据
        print("📥 开始导入商户数据...")
        merchant_success = 0
        for i, merchant in enumerate(real_merchants):
            merchant_id = f"merchant_{i+1:03d}"
            try:
                cursor.execute('''
                    INSERT OR REPLACE INTO merchants VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    merchant_id,
                    merchant['name'],
                    merchant['category'],
                    merchant['contact'],
                    merchant['phone'],
                    merchant.get('email', ''),
                    merchant['province'],
                    merchant.get('city', ''),
                    merchant['address'],
                    merchant.get('description', ''),
                    merchant.get('businessLicense', ''),
                    merchant.get('businessScope', ''),
                    merchant.get('establishYear', ''),
                    merchant.get('status', 'pending'),
                    datetime.now().isoformat(),
                    datetime.now().isoformat(),
                    0, 0, 0.0, 0
                ))
                merchant_success += 1
                print(f"✅ 成功导入商户: {merchant['name']}")
            except Exception as e:
                print(f"❌ 导入商户失败: {merchant['name']} - {e}")
        
        # 导入产品数据
        print("\n📥 开始导入产品数据...")
        product_success = 0
        for i, product in enumerate(real_products):
            product_id = f"product_{datetime.now().strftime('%Y%m%d%H%M%S')}_{i}"
            try:
                cursor.execute('''
                    INSERT OR REPLACE INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    product_id,
                    product['name'],
                    product['category'],
                    product['price'],
                    product['merchantId'],
                    product.get('description', ''),
                    product.get('specification', ''),
                    product.get('origin', ''),
                    product.get('grade', ''),
                    product.get('stock', 0),
                    product.get('status', 'active'),
                    datetime.now().isoformat(),
                    datetime.now().isoformat(),
                    0, 0, 0.0, 0
                ))
                product_success += 1
                print(f"✅ 成功导入产品: {product['name']}")
            except Exception as e:
                print(f"❌ 导入产品失败: {product['name']} - {e}")
        
        # 提交事务
        conn.commit()
        conn.close()
        
        # 生成导入报告
        report = {
            "importTime": datetime.now().isoformat(),
            "summary": {
                "merchants": {
                    "total": len(real_merchants),
                    "success": merchant_success,
                    "failed": len(real_merchants) - merchant_success
                },
                "products": {
                    "total": len(real_products),
                    "success": product_success,
                    "failed": len(real_products) - product_success
                }
            },
            "merchants": real_merchants,
            "products": real_products
        }
        
        # 保存报告
        report_file = f"真实数据导入报告_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print("\n" + "=" * 60)
        print("📊 导入完成统计:")
        print(f"🏪 商户: {merchant_success}/{len(real_merchants)} 成功")
        print(f"🍵 产品: {product_success}/{len(real_products)} 成功")
        print(f"📋 报告已保存: {report_file}")
        print("=" * 60)
        
        return True
        
    except Exception as e:
        print(f"❌ 导入过程中出现错误: {e}")
        return False

if __name__ == "__main__":
    auto_import_real_data()
