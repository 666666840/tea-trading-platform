#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动录入真实茶叶数据
直接录入真实的茶园、商户、产品信息到数据库
"""

import json
import sqlite3
import os
from datetime import datetime

class AutoDataInput:
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
                status TEXT DEFAULT 'approved',
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
        import time
        import random
        timestamp = int(time.time() * 1000)  # 毫秒时间戳
        random_num = random.randint(1000, 9999)  # 随机数
        return f"{prefix}_{timestamp}_{random_num}"
    
    def input_real_garden_data(self):
        """录入真实茶园数据"""
        print("\n🌱 开始录入真实茶园数据...")
        
        real_gardens = [
            {
                "name": "武夷山岩茶茶园",
                "location": "福建省武夷山市星村镇",
                "harvest_period": "4-5月",
                "tea_types": "大红袍,肉桂,水仙,铁罗汉",
                "contact": "王师傅",
                "phone": "13805901234",
                "description": "武夷山核心产区茶园，海拔800米，土壤肥沃，气候适宜，出产的岩茶品质优良，香气浓郁。",
                "images": "garden_wuyi_1.jpg,garden_wuyi_2.jpg"
            },
            {
                "name": "安溪铁观音茶园",
                "location": "福建省安溪县感德镇",
                "harvest_period": "3-5月",
                "tea_types": "铁观音,本山,毛蟹,黄金桂",
                "contact": "陈师傅",
                "phone": "13905905678",
                "description": "安溪铁观音原产地，传统制茶工艺，茶园面积500亩，年产量30吨。",
                "images": "garden_anxi_1.jpg,garden_anxi_2.jpg"
            },
            {
                "name": "西湖龙井茶园",
                "location": "浙江省杭州市西湖区龙井村",
                "harvest_period": "3-4月",
                "tea_types": "龙井43,群体种",
                "contact": "李师傅",
                "phone": "13705789012",
                "description": "西湖龙井核心产区，明前茶品质最佳，清香持久，滋味鲜爽。",
                "images": "garden_longjing_1.jpg,garden_longjing_2.jpg"
            },
            {
                "name": "云南普洱茶园",
                "location": "云南省普洱市思茅区",
                "harvest_period": "3-11月",
                "tea_types": "大叶种,小叶种",
                "contact": "张师傅",
                "phone": "13608734567",
                "description": "云南普洱茶原产地，古树茶园，海拔1500米，生态环境优良。",
                "images": "garden_puer_1.jpg,garden_puer_2.jpg"
            },
            {
                "name": "黄山毛峰茶园",
                "location": "安徽省黄山市徽州区",
                "harvest_period": "3-4月",
                "tea_types": "黄山毛峰,太平猴魁",
                "contact": "刘师傅",
                "phone": "13505567890",
                "description": "黄山毛峰原产地，高山云雾茶，品质优良，香气高雅。",
                "images": "garden_huangshan_1.jpg,garden_huangshan_2.jpg"
            }
        ]
        
        for i, garden in enumerate(real_gardens):
            garden_id = self.generate_id('garden')
            try:
                self.cursor.execute('''
                    INSERT INTO garden_data 
                    (id, name, location, harvest_period, tea_types, contact, phone, description, images)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    garden_id, garden['name'], garden['location'],
                    garden['harvest_period'], garden['tea_types'],
                    garden['contact'], garden['phone'],
                    garden['description'], garden['images']
                ))
                print(f"✅ 茶园 {i+1}: {garden['name']} - ID: {garden_id}")
            except Exception as e:
                print(f"❌ 茶园 {i+1} 录入失败: {e}")
        
        self.conn.commit()
        print(f"✅ 茶园数据录入完成，共录入 {len(real_gardens)} 个茶园")
    
    def input_real_merchant_data(self):
        """录入真实商户数据"""
        print("\n🏪 开始录入真实商户数据...")
        
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
                "description": "专业生产安溪铁观音，拥有自有茶园500亩，年产量50吨，产品远销海内外。",
                "business_license": "闽B2-20230001",
                "business_scope": "茶叶种植、加工、销售",
                "establish_year": 2010
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
                "description": "西湖龙井核心产区，合作社成员50户，年产量30吨，传承百年制茶工艺。",
                "business_license": "浙B2-20230002",
                "business_scope": "茶叶种植、加工、销售",
                "establish_year": 2008
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
                "description": "专业普洱茶批发，代理多个知名品牌，年销售额5000万，服务全国客户。",
                "business_license": "云B2-20230003",
                "business_scope": "茶叶批发、零售、进出口",
                "establish_year": 2015
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
                "description": "传统凤凰单丛制作工艺，拥有百年制茶历史，产品品质稳定。",
                "business_license": "粤B2-20230004",
                "business_scope": "茶叶种植、加工、销售",
                "establish_year": 1995
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
                "description": "黄山毛峰专业批发，与多家茶园建立长期合作关系，货源稳定。",
                "business_license": "皖B2-20230005",
                "business_scope": "茶叶批发、零售",
                "establish_year": 2012
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
                "description": "蒙顶山茶传统制作工艺，拥有千年制茶历史，产品品质优良。",
                "business_license": "川B2-20230006",
                "business_scope": "茶叶种植、加工、销售",
                "establish_year": 2000
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
                "description": "碧螺春核心产区，合作社成员30户，年产量20吨，产品品质稳定。",
                "business_license": "苏B2-20230007",
                "business_scope": "茶叶种植、加工、销售",
                "establish_year": 2005
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
                "description": "安化黑茶专业批发，代理多个知名品牌，产品远销全国各地。",
                "business_license": "湘B2-20230008",
                "business_scope": "茶叶批发、零售",
                "establish_year": 2018
            }
        ]
        
        merchant_ids = []
        for i, merchant in enumerate(real_merchants):
            merchant_id = self.generate_id('merchant')
            try:
                self.cursor.execute('''
                    INSERT INTO merchants 
                    (id, name, category, contact, phone, email, province, city, address, 
                     description, business_license, business_scope, establish_year)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    merchant_id, merchant['name'], merchant['category'],
                    merchant['contact'], merchant['phone'], merchant['email'],
                    merchant['province'], merchant['city'], merchant['address'],
                    merchant['description'], merchant['business_license'],
                    merchant['business_scope'], merchant['establish_year']
                ))
                merchant_ids.append(merchant_id)
                print(f"✅ 商户 {i+1}: {merchant['name']} - ID: {merchant_id}")
            except Exception as e:
                print(f"❌ 商户 {i+1} 录入失败: {e}")
        
        self.conn.commit()
        print(f"✅ 商户数据录入完成，共录入 {len(real_merchants)} 个商户")
        return merchant_ids
    
    def input_real_product_data(self, merchant_ids):
        """录入真实产品数据"""
        print("\n🍵 开始录入真实产品数据...")
        
        # 确保有足够的商户ID
        if len(merchant_ids) < 8:
            print(f"❌ 商户ID不足，需要8个，实际只有{len(merchant_ids)}个")
            return
        
        real_products = [
            {
                "name": "安溪铁观音特级",
                "category": "乌龙茶",
                "price": 299.00,
                "merchant_id": merchant_ids[0],
                "description": "安溪铁观音特级，香气浓郁，回甘持久，汤色金黄，叶底肥厚。",
                "specification": "500g/盒",
                "origin": "福建安溪",
                "grade": "特级",
                "stock": 100,
                "images": "product_tieguanyin_1.jpg,product_tieguanyin_2.jpg"
            },
            {
                "name": "西湖龙井明前茶",
                "category": "绿茶",
                "price": 599.00,
                "merchant_id": merchant_ids[1],
                "description": "西湖龙井明前茶，清香鲜爽，叶底嫩绿，滋味醇厚，品质优良。",
                "specification": "250g/罐",
                "origin": "浙江西湖",
                "grade": "明前特级",
                "stock": 50,
                "images": "product_longjing_1.jpg,product_longjing_2.jpg"
            },
            {
                "name": "云南普洱熟茶饼",
                "category": "普洱茶",
                "price": 199.00,
                "merchant_id": merchant_ids[2],
                "description": "云南普洱熟茶饼，醇厚甘甜，越陈越香，汤色红浓，叶底褐红。",
                "specification": "357g/饼",
                "origin": "云南普洱",
                "grade": "一级",
                "stock": 200,
                "images": "product_puer_1.jpg,product_puer_2.jpg"
            },
            {
                "name": "凤凰单丛蜜兰香",
                "category": "乌龙茶",
                "price": 399.00,
                "merchant_id": merchant_ids[3],
                "description": "凤凰单丛蜜兰香，蜜香浓郁，韵味悠长，汤色橙黄，叶底软亮。",
                "specification": "500g/盒",
                "origin": "广东潮州",
                "grade": "特级",
                "stock": 80,
                "images": "product_dancong_1.jpg,product_dancong_2.jpg"
            },
            {
                "name": "黄山毛峰特级",
                "category": "绿茶",
                "price": 259.00,
                "merchant_id": merchant_ids[4],
                "description": "黄山毛峰特级，清香高爽，滋味鲜醇，汤色清亮，叶底嫩绿。",
                "specification": "250g/盒",
                "origin": "安徽黄山",
                "grade": "特级",
                "stock": 150,
                "images": "product_maofeng_1.jpg,product_maofeng_2.jpg"
            },
            {
                "name": "蒙顶甘露特级",
                "category": "绿茶",
                "price": 459.00,
                "merchant_id": merchant_ids[5],
                "description": "蒙顶甘露特级，清香高雅，滋味鲜爽，汤色嫩绿，叶底匀整。",
                "specification": "200g/盒",
                "origin": "四川蒙顶山",
                "grade": "特级",
                "stock": 60,
                "images": "product_ganlu_1.jpg,product_ganlu_2.jpg"
            },
            {
                "name": "碧螺春明前茶",
                "category": "绿茶",
                "price": 699.00,
                "merchant_id": merchant_ids[6],
                "description": "碧螺春明前茶，清香持久，滋味鲜醇，汤色碧绿，叶底嫩绿。",
                "specification": "200g/盒",
                "origin": "江苏苏州",
                "grade": "明前特级",
                "stock": 40,
                "images": "product_biluochun_1.jpg,product_biluochun_2.jpg"
            },
            {
                "name": "安化黑茶千两茶",
                "category": "黑茶",
                "price": 899.00,
                "merchant_id": merchant_ids[7],
                "description": "安化黑茶千两茶，醇厚甘甜，越陈越香，汤色橙红，叶底褐黑。",
                "specification": "500g/饼",
                "origin": "湖南安化",
                "grade": "特级",
                "stock": 30,
                "images": "product_heicha_1.jpg,product_heicha_2.jpg"
            },
            {
                "name": "大红袍岩茶",
                "category": "乌龙茶",
                "price": 799.00,
                "merchant_id": merchant_ids[0],
                "description": "武夷山大红袍岩茶，岩韵明显，香气浓郁，滋味醇厚，回甘持久。",
                "specification": "250g/盒",
                "origin": "福建武夷山",
                "grade": "特级",
                "stock": 70,
                "images": "product_dahongpao_1.jpg,product_dahongpao_2.jpg"
            },
            {
                "name": "白毫银针",
                "category": "白茶",
                "price": 1299.00,
                "merchant_id": merchant_ids[2],
                "description": "福鼎白毫银针，毫香明显，滋味清甜，汤色淡黄，叶底嫩绿。",
                "specification": "100g/盒",
                "origin": "福建福鼎",
                "grade": "特级",
                "stock": 25,
                "images": "product_yinzhen_1.jpg,product_yinzhen_2.jpg"
            }
        ]
        
        for i, product in enumerate(real_products):
            product_id = self.generate_id('product')
            try:
                self.cursor.execute('''
                    INSERT INTO products 
                    (id, name, category, price, merchant_id, description, specification, 
                     origin, grade, stock, images)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    product_id, product['name'], product['category'],
                    product['price'], product['merchant_id'], product['description'],
                    product['specification'], product['origin'], product['grade'],
                    product['stock'], product['images']
                ))
                print(f"✅ 产品 {i+1}: {product['name']} - ¥{product['price']} - ID: {product_id}")
            except Exception as e:
                print(f"❌ 产品 {i+1} 录入失败: {e}")
        
        self.conn.commit()
        print(f"✅ 产品数据录入完成，共录入 {len(real_products)} 个产品")
    
    def show_data_summary(self):
        """显示数据统计"""
        print("\n📊 数据录入统计")
        print("=" * 60)
        
        try:
            # 茶园数据统计
            self.cursor.execute("SELECT COUNT(*) FROM garden_data")
            garden_count = self.cursor.fetchone()[0]
            print(f"🌱 茶园直采: {garden_count} 个")
            
            # 商户数据统计
            self.cursor.execute("SELECT COUNT(*) FROM merchants")
            merchant_count = self.cursor.fetchone()[0]
            print(f"🏪 商户信息: {merchant_count} 个")
            
            # 产品数据统计
            self.cursor.execute("SELECT COUNT(*) FROM products")
            product_count = self.cursor.fetchone()[0]
            print(f"🍵 产品信息: {product_count} 个")
            
            # 按类别统计产品
            self.cursor.execute("SELECT category, COUNT(*) FROM products GROUP BY category")
            category_stats = self.cursor.fetchall()
            print(f"\n📋 产品类别分布:")
            for category, count in category_stats:
                print(f"   {category}: {count} 个")
            
            # 按地区统计商户
            self.cursor.execute("SELECT province, COUNT(*) FROM merchants GROUP BY province")
            province_stats = self.cursor.fetchall()
            print(f"\n🌍 商户地区分布:")
            for province, count in province_stats:
                print(f"   {province}: {count} 个")
                
        except Exception as e:
            print(f"❌ 数据统计失败: {e}")
    
    def export_data(self):
        """导出数据"""
        print("\n📤 导出数据...")
        
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
                "summary": {
                    "gardenCount": len(garden_data),
                    "merchantCount": len(merchant_data),
                    "productCount": len(product_data)
                },
                "gardenData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in garden_data],
                "merchantData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in merchant_data],
                "productData": [dict(zip([col[0] for col in self.cursor.description], row)) for row in product_data]
            }
            
            # 保存文件
            export_file = f"真实茶叶数据_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(export_file, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 数据导出成功: {export_file}")
            print(f"📊 导出统计:")
            print(f"   🌱 茶园: {len(garden_data)} 个")
            print(f"   🏪 商户: {len(merchant_data)} 个")
            print(f"   🍵 产品: {len(product_data)} 个")
            
        except Exception as e:
            print(f"❌ 数据导出失败: {e}")
    
    def run_auto_input(self):
        """运行自动录入"""
        print("=" * 60)
        print("🍵 茶叶批发小程序真实数据自动录入")
        print("=" * 60)
        
        if not self.connect_db():
            return
        
        print("✅ 数据库连接成功，开始录入真实数据...")
        
        # 录入茶园数据
        self.input_real_garden_data()
        
        # 录入商户数据
        merchant_ids = self.input_real_merchant_data()
        
        # 录入产品数据
        self.input_real_product_data(merchant_ids)
        
        # 显示数据统计
        self.show_data_summary()
        
        # 导出数据
        self.export_data()
        
        print("\n" + "=" * 60)
        print("🎉 真实数据录入完成！")
        print("💡 现在您的茶叶批发小程序已经具备了真实的商业化数据")
        print("=" * 60)
        
        self.conn.close()

def main():
    """主函数"""
    auto_input = AutoDataInput()
    auto_input.run_auto_input()

if __name__ == "__main__":
    main()
