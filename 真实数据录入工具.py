#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
真实数据录入工具
帮助录入和管理茶叶批发小程序的真实商户数据
"""

import json
import sqlite3
import os
from datetime import datetime
import sys

class RealDataManager:
    def __init__(self):
        self.db_file = 'content_management.db'
        self.merchants_data = []
        self.products_data = []
        
    def connect_db(self):
        """连接数据库"""
        try:
            conn = sqlite3.connect(self.db_file)
            return conn
        except Exception as e:
            print(f"❌ 连接数据库失败: {e}")
            return None
    
    def load_sample_merchants(self):
        """加载示例商户数据"""
        sample_merchants = [
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
            }
        ]
        
        self.merchants_data = sample_merchants
        return sample_merchants
    
    def load_sample_products(self):
        """加载示例产品数据"""
        sample_products = [
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
            }
        ]
        
        self.products_data = sample_products
        return sample_products
    
    def generate_merchant_id(self, index):
        """生成商户ID"""
        return f"merchant_{index:03d}"
    
    def add_merchant_to_db(self, merchant_data, merchant_id):
        """添加商户到数据库"""
        conn = self.connect_db()
        if not conn:
            return False
            
        try:
            cursor = conn.cursor()
            
            # 创建商户表（如果不存在）
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
            
            # 插入商户数据
            cursor.execute('''
                INSERT OR REPLACE INTO merchants VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                merchant_id,
                merchant_data['name'],
                merchant_data['category'],
                merchant_data['contact'],
                merchant_data['phone'],
                merchant_data.get('email', ''),
                merchant_data['province'],
                merchant_data.get('city', ''),
                merchant_data['address'],
                merchant_data.get('description', ''),
                merchant_data.get('businessLicense', ''),
                merchant_data.get('businessScope', ''),
                merchant_data.get('establishYear', ''),
                merchant_data.get('status', 'pending'),
                datetime.now().isoformat(),
                datetime.now().isoformat(),
                0, 0, 0.0, 0
            ))
            
            conn.commit()
            conn.close()
            return True
            
        except Exception as e:
            print(f"❌ 添加商户到数据库失败: {e}")
            conn.close()
            return False
    
    def add_product_to_db(self, product_data):
        """添加产品到数据库"""
        conn = self.connect_db()
        if not conn:
            return False
            
        try:
            cursor = conn.cursor()
            
            # 创建产品表（如果不存在）
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
            
            # 生成产品ID
            product_id = f"product_{datetime.now().strftime('%Y%m%d%H%M%S')}"
            
            # 插入产品数据
            cursor.execute('''
                INSERT OR REPLACE INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product_id,
                product_data['name'],
                product_data['category'],
                product_data['price'],
                product_data['merchantId'],
                product_data.get('description', ''),
                product_data.get('specification', ''),
                product_data.get('origin', ''),
                product_data.get('grade', ''),
                product_data.get('stock', 0),
                product_data.get('status', 'active'),
                datetime.now().isoformat(),
                datetime.now().isoformat(),
                0, 0, 0.0, 0
            ))
            
            conn.commit()
            conn.close()
            return True
            
        except Exception as e:
            print(f"❌ 添加产品到数据库失败: {e}")
            conn.close()
            return False
    
    def import_sample_data(self):
        """导入示例数据"""
        print("📥 开始导入示例数据...")
        
        # 导入商户数据
        merchants = self.load_sample_merchants()
        success_count = 0
        
        for i, merchant in enumerate(merchants):
            merchant_id = self.generate_merchant_id(i + 1)
            if self.add_merchant_to_db(merchant, merchant_id):
                success_count += 1
                print(f"✅ 成功导入商户: {merchant['name']}")
            else:
                print(f"❌ 导入商户失败: {merchant['name']}")
        
        print(f"📊 商户数据导入完成: {success_count}/{len(merchants)}")
        
        # 导入产品数据
        products = self.load_sample_products()
        success_count = 0
        
        for product in products:
            if self.add_product_to_db(product):
                success_count += 1
                print(f"✅ 成功导入产品: {product['name']}")
            else:
                print(f"❌ 导入产品失败: {product['name']}")
        
        print(f"📊 产品数据导入完成: {success_count}/{len(products)}")
        
        return True
    
    def export_data_to_json(self):
        """导出数据到JSON文件"""
        print("📤 导出数据到JSON文件...")
        
        conn = self.connect_db()
        if not conn:
            return False
            
        try:
            cursor = conn.cursor()
            
            # 导出商户数据
            cursor.execute("SELECT * FROM merchants")
            merchants = []
            for row in cursor.fetchall():
                merchants.append({
                    "id": row[0],
                    "name": row[1],
                    "category": row[2],
                    "contact": row[3],
                    "phone": row[4],
                    "email": row[5],
                    "province": row[6],
                    "city": row[7],
                    "address": row[8],
                    "description": row[9],
                    "businessLicense": row[10],
                    "businessScope": row[11],
                    "establishYear": row[12],
                    "status": row[13],
                    "createTime": row[14],
                    "updateTime": row[15],
                    "views": row[16],
                    "contacts": row[17],
                    "rating": row[18],
                    "reviewCount": row[19]
                })
            
            # 导出产品数据
            cursor.execute("SELECT * FROM products")
            products = []
            for row in cursor.fetchall():
                products.append({
                    "id": row[0],
                    "name": row[1],
                    "category": row[2],
                    "price": row[3],
                    "merchantId": row[4],
                    "description": row[5],
                    "specification": row[6],
                    "origin": row[7],
                    "grade": row[8],
                    "stock": row[9],
                    "status": row[10],
                    "createTime": row[11],
                    "updateTime": row[12],
                    "views": row[13],
                    "sales": row[14],
                    "rating": row[15],
                    "reviewCount": row[16]
                })
            
            # 保存到JSON文件
            export_data = {
                "exportTime": datetime.now().isoformat(),
                "merchants": merchants,
                "products": products,
                "summary": {
                    "merchantCount": len(merchants),
                    "productCount": len(products)
                }
            }
            
            filename = f"真实数据导出_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 数据已导出到: {filename}")
            print(f"📊 导出统计: 商户 {len(merchants)} 个, 产品 {len(products)} 个")
            
            conn.close()
            return True
            
        except Exception as e:
            print(f"❌ 导出数据失败: {e}")
            conn.close()
            return False
    
    def show_data_summary(self):
        """显示数据摘要"""
        print("\n📊 数据摘要:")
        
        conn = self.connect_db()
        if not conn:
            return
            
        try:
            cursor = conn.cursor()
            
            # 商户统计
            cursor.execute("SELECT COUNT(*) FROM merchants")
            merchant_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM merchants WHERE status = 'approved'")
            approved_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM merchants WHERE status = 'pending'")
            pending_count = cursor.fetchone()[0]
            
            # 产品统计
            cursor.execute("SELECT COUNT(*) FROM products")
            product_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM products WHERE status = 'active'")
            active_count = cursor.fetchone()[0]
            
            print(f"🏪 商户总数: {merchant_count}")
            print(f"   ✅ 已审核: {approved_count}")
            print(f"   ⏳ 待审核: {pending_count}")
            print(f"🍵 产品总数: {product_count}")
            print(f"   ✅ 在售: {active_count}")
            
            conn.close()
            
        except Exception as e:
            print(f"❌ 获取数据摘要失败: {e}")
            conn.close()

def main():
    """主函数"""
    print("=" * 60)
    print("🍵 茶叶批发小程序真实数据录入工具")
    print("=" * 60)
    
    manager = RealDataManager()
    
    while True:
        print("\n请选择操作:")
        print("1. 导入示例数据")
        print("2. 导出数据到JSON")
        print("3. 查看数据摘要")
        print("4. 退出")
        
        choice = input("\n请输入选择 (1-4): ").strip()
        
        if choice == '1':
            manager.import_sample_data()
        elif choice == '2':
            manager.export_data_to_json()
        elif choice == '3':
            manager.show_data_summary()
        elif choice == '4':
            print("👋 感谢使用！")
            break
        else:
            print("❌ 无效选择，请重新输入")

if __name__ == "__main__":
    main()
