#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
真实信息录入工具
专门用于输入茶叶批发小程序的真实信息
支持茶园直采、商户信息、产品信息等多种数据类型
"""

import json
import sqlite3
import os
from datetime import datetime

class RealDataInputTool:
    def __init__(self):
        self.db_path = 'content_management.db'
        self.conn = None
        self.cursor = None
        
    def connect_db(self):
        """连接数据库"""
        try:
            self.conn = sqlite3.connect(self.db_path)
            self.cursor = self.conn.cursor()
            self.create_tables()
            return True
        except Exception as e:
            print(f"❌ 数据库连接失败: {e}")
            return False
    
    def create_tables(self):
        """创建必要的数据表"""
        # 茶园直采表
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS garden_data (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                harvest_period TEXT,
                tea_types TEXT,
                contact TEXT NOT NULL,
                phone TEXT NOT NULL,
                description TEXT,
                images TEXT,
                rating REAL DEFAULT 0,
                views INTEGER DEFAULT 0,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 商户信息表
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS merchants (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                contact TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                province TEXT NOT NULL,
                city TEXT NOT NULL,
                address TEXT NOT NULL,
                description TEXT,
                business_license TEXT,
                business_scope TEXT,
                establish_year INTEGER,
                status TEXT DEFAULT 'pending',
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 产品信息表
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                merchant_id TEXT NOT NULL,
                description TEXT,
                specification TEXT,
                origin TEXT,
                grade TEXT,
                stock INTEGER DEFAULT 0,
                images TEXT,
                status TEXT DEFAULT 'active',
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (merchant_id) REFERENCES merchants (id)
            )
        ''')
        
        self.conn.commit()
    
    def generate_id(self, prefix):
        """生成唯一ID"""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        return f"{prefix}_{timestamp}"
    
    def input_garden_data(self):
        """输入茶园直采信息"""
        print("\n🌱 茶园直采信息录入")
        print("-" * 40)
        
        garden_data = {}
        
        # 基本信息
        garden_data['id'] = self.generate_id('garden')
        garden_data['name'] = input("茶园名称: ").strip()
        garden_data['location'] = input("茶园地址: ").strip()
        garden_data['harvest_period'] = input("采摘期 (如: 3-5月): ").strip()
        
        # 茶叶品种
        tea_types = input("茶叶品种 (多个用逗号分隔): ").strip()
        garden_data['tea_types'] = tea_types
        
        # 联系信息
        garden_data['contact'] = input("联系人: ").strip()
        garden_data['phone'] = input("联系电话: ").strip()
        
        # 描述信息
        garden_data['description'] = input("茶园描述: ").strip()
        
        # 图片信息
        images = input("茶园图片 (多个用逗号分隔): ").strip()
        garden_data['images'] = images
        
        # 保存到数据库
        try:
            self.cursor.execute('''
                INSERT INTO garden_data 
                (id, name, location, harvest_period, tea_types, contact, phone, description, images)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                garden_data['id'], garden_data['name'], garden_data['location'],
                garden_data['harvest_period'], garden_data['tea_types'],
                garden_data['contact'], garden_data['phone'],
                garden_data['description'], garden_data['images']
            ))
            self.conn.commit()
            print(f"✅ 茶园信息保存成功! ID: {garden_data['id']}")
            return garden_data
        except Exception as e:
            print(f"❌ 保存失败: {e}")
            return None
    
    def input_merchant_data(self):
        """输入商户信息"""
        print("\n🏪 商户信息录入")
        print("-" * 40)
        
        merchant_data = {}
        
        # 基本信息
        merchant_data['id'] = self.generate_id('merchant')
        merchant_data['name'] = input("商户名称: ").strip()
        
        # 经营类别选择
        print("\n经营类别选择:")
        print("1. 茶园/茶厂")
        print("2. 茶叶批发商")
        print("3. 茶叶零售商")
        print("4. 茶叶进出口商")
        print("5. 其他")
        
        category_choice = input("请选择类别 (1-5): ").strip()
        categories = {
            '1': '茶园/茶厂',
            '2': '茶叶批发商',
            '3': '茶叶零售商',
            '4': '茶叶进出口商',
            '5': '其他'
        }
        merchant_data['category'] = categories.get(category_choice, '其他')
        
        # 联系信息
        merchant_data['contact'] = input("联系人: ").strip()
        merchant_data['phone'] = input("联系电话: ").strip()
        merchant_data['email'] = input("邮箱地址: ").strip()
        
        # 地址信息
        merchant_data['province'] = input("所在省份: ").strip()
        merchant_data['city'] = input("城市: ").strip()
        merchant_data['address'] = input("详细地址: ").strip()
        
        # 其他信息
        merchant_data['description'] = input("商户简介: ").strip()
        merchant_data['business_license'] = input("营业执照号: ").strip()
        merchant_data['business_scope'] = input("经营范围: ").strip()
        
        establish_year = input("成立年份: ").strip()
        merchant_data['establish_year'] = int(establish_year) if establish_year.isdigit() else None
        
        # 保存到数据库
        try:
            self.cursor.execute('''
                INSERT INTO merchants 
                (id, name, category, contact, phone, email, province, city, address, 
                 description, business_license, business_scope, establish_year)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                merchant_data['id'], merchant_data['name'], merchant_data['category'],
                merchant_data['contact'], merchant_data['phone'], merchant_data['email'],
                merchant_data['province'], merchant_data['city'], merchant_data['address'],
                merchant_data['description'], merchant_data['business_license'],
                merchant_data['business_scope'], merchant_data['establish_year']
            ))
            self.conn.commit()
            print(f"✅ 商户信息保存成功! ID: {merchant_data['id']}")
            return merchant_data
        except Exception as e:
            print(f"❌ 保存失败: {e}")
            return None
    
    def input_product_data(self):
        """输入产品信息"""
        print("\n🍵 产品信息录入")
        print("-" * 40)
        
        product_data = {}
        
        # 基本信息
        product_data['id'] = self.generate_id('product')
        product_data['name'] = input("产品名称: ").strip()
        
        # 产品类别选择
        print("\n产品类别选择:")
        print("1. 绿茶")
        print("2. 红茶")
        print("3. 乌龙茶")
        print("4. 普洱茶")
        print("5. 黑茶")
        print("6. 白茶")
        print("7. 黄茶")
        print("8. 花茶")
        print("9. 其他")
        
        category_choice = input("请选择类别 (1-9): ").strip()
        categories = {
            '1': '绿茶', '2': '红茶', '3': '乌龙茶', '4': '普洱茶',
            '5': '黑茶', '6': '白茶', '7': '黄茶', '8': '花茶', '9': '其他'
        }
        product_data['category'] = categories.get(category_choice, '其他')
        
        # 价格信息
        price = input("产品价格 (元): ").strip()
        product_data['price'] = float(price) if price.replace('.', '').isdigit() else 0.0
        
        # 所属商户
        product_data['merchant_id'] = input("所属商户ID: ").strip()
        
        # 产品详情
        product_data['description'] = input("产品描述: ").strip()
        product_data['specification'] = input("规格 (如: 500g/盒): ").strip()
        product_data['origin'] = input("产地: ").strip()
        product_data['grade'] = input("等级 (如: 特级): ").strip()
        
        # 库存信息
        stock = input("库存数量: ").strip()
        product_data['stock'] = int(stock) if stock.isdigit() else 0
        
        # 图片信息
        images = input("产品图片 (多个用逗号分隔): ").strip()
        product_data['images'] = images
        
        # 保存到数据库
        try:
            self.cursor.execute('''
                INSERT INTO products 
                (id, name, category, price, merchant_id, description, specification, 
                 origin, grade, stock, images)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product_data['id'], product_data['name'], product_data['category'],
                product_data['price'], product_data['merchant_id'], product_data['description'],
                product_data['specification'], product_data['origin'], product_data['grade'],
                product_data['stock'], product_data['images']
            ))
            self.conn.commit()
            print(f"✅ 产品信息保存成功! ID: {product_data['id']}")
            return product_data
        except Exception as e:
            print(f"❌ 保存失败: {e}")
            return None
    
    def batch_input(self):
        """批量输入功能"""
        print("\n📝 批量输入模式")
        print("-" * 40)
        
        while True:
            print("\n请选择要输入的信息类型:")
            print("1. 茶园直采信息")
            print("2. 商户信息")
            print("3. 产品信息")
            print("4. 返回主菜单")
            
            choice = input("\n请选择 (1-4): ").strip()
            
            if choice == '1':
                self.input_garden_data()
            elif choice == '2':
                self.input_merchant_data()
            elif choice == '3':
                self.input_product_data()
            elif choice == '4':
                break
            else:
                print("❌ 无效选择，请重新输入")
            
            # 询问是否继续
            continue_input = input("\n是否继续输入? (y/n): ").strip().lower()
            if continue_input != 'y':
                break
    
    def view_data(self):
        """查看已输入的数据"""
        print("\n📊 数据查看")
        print("-" * 40)
        
        try:
            # 查看茶园数据
            self.cursor.execute("SELECT COUNT(*) FROM garden_data")
            garden_count = self.cursor.fetchone()[0]
            print(f"🌱 茶园直采: {garden_count} 条")
            
            # 查看商户数据
            self.cursor.execute("SELECT COUNT(*) FROM merchants")
            merchant_count = self.cursor.fetchone()[0]
            print(f"🏪 商户信息: {merchant_count} 条")
            
            # 查看产品数据
            self.cursor.execute("SELECT COUNT(*) FROM products")
            product_count = self.cursor.fetchone()[0]
            print(f"🍵 产品信息: {product_count} 条")
            
            # 显示详细信息
            show_detail = input("\n是否显示详细信息? (y/n): ").strip().lower()
            if show_detail == 'y':
                self.show_detailed_data()
                
        except Exception as e:
            print(f"❌ 查看数据失败: {e}")
    
    def show_detailed_data(self):
        """显示详细数据"""
        print("\n📋 详细数据")
        print("=" * 60)
        
        # 茶园数据
        print("\n🌱 茶园直采数据:")
        self.cursor.execute("SELECT id, name, location, contact, phone FROM garden_data")
        gardens = self.cursor.fetchall()
        for garden in gardens:
            print(f"  {garden[0]}: {garden[1]} - {garden[2]} - {garden[3]} ({garden[4]})")
        
        # 商户数据
        print("\n🏪 商户数据:")
        self.cursor.execute("SELECT id, name, category, contact, phone, province, city FROM merchants")
        merchants = self.cursor.fetchall()
        for merchant in merchants:
            print(f"  {merchant[0]}: {merchant[1]} - {merchant[2]} - {merchant[3]} ({merchant[4]}) - {merchant[5]}{merchant[6]}")
        
        # 产品数据
        print("\n🍵 产品数据:")
        self.cursor.execute("SELECT id, name, category, price, merchant_id, origin FROM products")
        products = self.cursor.fetchall()
        for product in products:
            print(f"  {product[0]}: {product[1]} - {product[2]} - ¥{product[3]} - {product[4]} - {product[5]}")
    
    def export_data(self):
        """导出数据"""
        print("\n📤 数据导出")
        print("-" * 40)
        
        try:
            # 导出茶园数据
            self.cursor.execute("SELECT * FROM garden_data")
            garden_data = self.cursor.fetchall()
            
            # 导出商户数据
            self.cursor.execute("SELECT * FROM merchants")
            merchant_data = self.cursor.fetchall()
            
            # 导出产品数据
            self.cursor.execute("SELECT * FROM products")
            product_data = self.cursor.fetchall()
            
            # 生成导出文件
            export_data = {
                "exportTime": datetime.now().isoformat(),
                "gardenData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in garden_data],
                "merchantData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in merchant_data],
                "productData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in product_data]
            }
            
            # 保存文件
            export_file = f"真实数据导出_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(export_file, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 数据导出成功: {export_file}")
            print(f"📊 导出统计:")
            print(f"   🌱 茶园: {len(garden_data)} 条")
            print(f"   🏪 商户: {len(merchant_data)} 条")
            print(f"   🍵 产品: {len(product_data)} 条")
            
        except Exception as e:
            print(f"❌ 数据导出失败: {e}")
    
    def main_menu(self):
        """主菜单"""
        while True:
            print("\n" + "=" * 60)
            print("📝 茶叶批发小程序真实信息录入工具")
            print("=" * 60)
            print("1. 🌱 输入茶园直采信息")
            print("2. 🏪 输入商户信息")
            print("3. 🍵 输入产品信息")
            print("4. 📝 批量输入模式")
            print("5. 📊 查看已输入数据")
            print("6. 📤 导出数据")
            print("7. 🚪 退出")
            print("-" * 60)
            
            choice = input("请选择功能 (1-7): ").strip()
            
            if choice == '1':
                self.input_garden_data()
            elif choice == '2':
                self.input_merchant_data()
            elif choice == '3':
                self.input_product_data()
            elif choice == '4':
                self.batch_input()
            elif choice == '5':
                self.view_data()
            elif choice == '6':
                self.export_data()
            elif choice == '7':
                print("👋 感谢使用真实信息录入工具！")
                break
            else:
                print("❌ 无效选择，请重新输入")
    
    def close(self):
        """关闭数据库连接"""
        if self.conn:
            self.conn.close()

def main():
    """主函数"""
    print("🚀 启动真实信息录入工具...")
    
    tool = RealDataInputTool()
    
    if tool.connect_db():
        print("✅ 数据库连接成功")
        tool.main_menu()
    else:
        print("❌ 数据库连接失败，程序退出")
    
    tool.close()

if __name__ == "__main__":
    main()
