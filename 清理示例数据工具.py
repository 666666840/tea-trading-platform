#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
清理示例数据工具
删除所有示例数据，为输入真实信息做准备
"""

import json
import sqlite3
import os
from datetime import datetime

def clear_sample_data():
    """清理所有示例数据"""
    print("=" * 60)
    print("🗑️ 茶叶批发小程序示例数据清理工具")
    print("=" * 60)
    
    # 清理数据库中的示例数据
    clear_database_sample_data()
    
    # 清理小程序存储中的示例数据
    clear_miniprogram_sample_data()
    
    # 清理JSON文件中的示例数据
    clear_json_sample_data()
    
    # 生成清理报告
    generate_cleanup_report()
    
    print("\n" + "=" * 60)
    print("✅ 示例数据清理完成！")
    print("💡 现在可以开始输入真实信息了")
    print("=" * 60)

def clear_database_sample_data():
    """清理数据库中的示例数据"""
    print("\n🗄️ 清理数据库示例数据...")
    
    try:
        conn = sqlite3.connect('content_management.db')
        cursor = conn.cursor()
        
        # 清理商户表中的示例数据
        cursor.execute("DELETE FROM merchants WHERE name LIKE '%示例%' OR name LIKE '%测试%'")
        sample_merchants_deleted = cursor.rowcount
        
        cursor.execute("DELETE FROM merchants WHERE description LIKE '%示例%' OR description LIKE '%测试%'")
        sample_merchants_deleted += cursor.rowcount
        
        # 清理产品表中的示例数据
        cursor.execute("DELETE FROM products WHERE name LIKE '%示例%' OR name LIKE '%测试%'")
        sample_products_deleted = cursor.rowcount
        
        cursor.execute("DELETE FROM products WHERE description LIKE '%示例%' OR description LIKE '%测试%'")
        sample_products_deleted += cursor.rowcount
        
        # 清理其他可能的示例数据
        cursor.execute("DELETE FROM merchants WHERE phone LIKE '1380000%' OR phone LIKE '1390000%'")
        fake_merchants_deleted = cursor.rowcount
        
        cursor.execute("DELETE FROM products WHERE price < 10 OR price > 10000")
        fake_products_deleted = cursor.rowcount
        
        conn.commit()
        conn.close()
        
        print(f"✅ 数据库清理完成:")
        print(f"   🏪 删除示例商户: {sample_merchants_deleted} 个")
        print(f"   🍵 删除示例产品: {sample_products_deleted} 个")
        print(f"   🏪 删除虚假商户: {fake_merchants_deleted} 个")
        print(f"   🍵 删除虚假产品: {fake_products_deleted} 个")
        
    except Exception as e:
        print(f"❌ 数据库清理失败: {e}")

def clear_miniprogram_sample_data():
    """清理小程序存储中的示例数据"""
    print("\n📱 清理小程序存储示例数据...")
    
    # 创建清理脚本
    cleanup_script = '''
// 小程序存储清理脚本
function clearSampleData() {
  try {
    console.log('🗑️ 开始清理小程序存储中的示例数据...');
    
    // 清理示例商户数据
    const merchants = wx.getStorageSync('merchants') || [];
    const realMerchants = merchants.filter(m => 
      !m.name.includes('示例') && 
      !m.name.includes('测试') && 
      !m.description.includes('示例') &&
      !m.phone.startsWith('1380000') &&
      !m.phone.startsWith('1390000')
    );
    wx.setStorageSync('merchants', realMerchants);
    
    // 清理示例产品数据
    const products = wx.getStorageSync('products') || [];
    const realProducts = products.filter(p => 
      !p.name.includes('示例') && 
      !p.name.includes('测试') && 
      !p.description.includes('示例') &&
      p.price >= 10 && p.price <= 10000
    );
    wx.setStorageSync('products', realProducts);
    
    // 清理示例市场数据
    const markets = wx.getStorageSync('markets') || [];
    const realMarkets = markets.filter(m => 
      !m.name.includes('示例') && 
      !m.name.includes('测试')
    );
    wx.setStorageSync('markets', realMarkets);
    
    // 清理示例供应数据
    const supplies = wx.getStorageSync('supplies') || [];
    const realSupplies = supplies.filter(s => 
      !s.name.includes('示例') && 
      !s.name.includes('测试')
    );
    wx.setStorageSync('supplies', realSupplies);
    
    // 清理示例清仓数据
    const clearance = wx.getStorageSync('clearance') || [];
    const realClearance = clearance.filter(c => 
      !c.name.includes('示例') && 
      !c.name.includes('测试')
    );
    wx.setStorageSync('clearance', realClearance);
    
    // 清理示例新品数据
    const newarrivals = wx.getStorageSync('newarrivals') || [];
    const realNewarrivals = newarrivals.filter(n => 
      !n.name.includes('示例') && 
      !n.name.includes('测试')
    );
    wx.setStorageSync('newarrivals', realNewarrivals);
    
    // 清理示例茶园直采数据
    const gardenData = wx.getStorageSync('gardenData') || [];
    const realGardenData = gardenData.filter(g => 
      !g.name.includes('示例') && 
      !g.name.includes('测试')
    );
    wx.setStorageSync('gardenData', realGardenData);
    
    console.log('✅ 小程序存储示例数据清理完成！');
    console.log('📊 清理统计:');
    console.log('   🏪 商户:', merchants.length - realMerchants.length, '个');
    console.log('   🍵 产品:', products.length - realProducts.length, '个');
    console.log('   🏬 市场:', markets.length - realMarkets.length, '个');
    console.log('   📦 供应:', supplies.length - realSupplies.length, '个');
    console.log('   🎯 清仓:', clearance.length - realClearance.length, '个');
    console.log('   🆕 新品:', newarrivals.length - realNewarrivals.length, '个');
    console.log('   🌱 茶园:', gardenData.length - realGardenData.length, '个');
    
    return true;
  } catch (error) {
    console.error('❌ 小程序存储清理失败:', error);
    return false;
  }
}

// 导出函数
module.exports = {
  clearSampleData
};
'''
    
    # 保存清理脚本
    with open('clear_sample_data.js', 'w', encoding='utf-8') as f:
        f.write(cleanup_script)
    
    print(f"✅ 小程序存储清理脚本已生成: clear_sample_data.js")

def clear_json_sample_data():
    """清理JSON文件中的示例数据"""
    print("\n📄 清理JSON文件示例数据...")
    
    json_files = [
        'miniprogram_real_data.json',
        '简化功能测试报告.json',
        '系统检测报告.json',
        '系统优化总结报告.json'
    ]
    
    for json_file in json_files:
        if os.path.exists(json_file):
            try:
                # 备份原文件
                backup_file = f"{json_file}.backup"
                os.rename(json_file, backup_file)
                print(f"✅ 已备份: {json_file} -> {backup_file}")
            except Exception as e:
                print(f"❌ 备份失败 {json_file}: {e}")

def generate_cleanup_report():
    """生成清理报告"""
    print("\n📋 生成清理报告...")
    
    report = {
        "cleanupTime": datetime.now().isoformat(),
        "action": "清理示例数据",
        "purpose": "为输入真实信息做准备",
        "steps": [
            "清理数据库中的示例数据",
            "清理小程序存储中的示例数据", 
            "清理JSON文件中的示例数据",
            "生成清理脚本"
        ],
        "files": {
            "generated": [
                "clear_sample_data.js"
            ],
            "backup": [
                "miniprogram_real_data.json.backup",
                "简化功能测试报告.json.backup",
                "系统检测报告.json.backup",
                "系统优化总结报告.json.backup"
            ]
        },
        "nextSteps": [
            "运行 clear_sample_data.js 清理小程序存储",
            "使用真实数据录入工具导入真实信息",
            "测试数据导入是否成功",
            "验证功能是否正常"
        ]
    }
    
    # 保存报告
    report_file = f"示例数据清理报告_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 清理报告已保存: {report_file}")

def create_real_data_template():
    """创建真实数据模板"""
    print("\n📝 创建真实数据模板...")
    
    template = {
        "茶园直采模板": {
            "name": "茶园名称",
            "location": "茶园地址",
            "harvestPeriod": "采摘期",
            "teaTypes": ["茶叶品种"],
            "contact": "联系人",
            "phone": "联系电话",
            "description": "茶园描述",
            "images": ["茶园图片"],
            "rating": 0,
            "views": 0
        },
        "商户信息模板": {
            "name": "商户名称",
            "category": "经营类别",
            "contact": "联系人",
            "phone": "联系电话",
            "email": "邮箱地址",
            "province": "所在省份",
            "city": "城市",
            "address": "详细地址",
            "description": "商户简介",
            "businessLicense": "营业执照号",
            "businessScope": "经营范围",
            "establishYear": "成立年份"
        },
        "产品信息模板": {
            "name": "产品名称",
            "category": "产品类别",
            "price": 0.00,
            "merchantId": "所属商户ID",
            "description": "产品描述",
            "specification": "规格",
            "origin": "产地",
            "grade": "等级",
            "stock": 0,
            "images": ["产品图片"]
        }
    }
    
    # 保存模板
    template_file = "真实数据录入模板.json"
    with open(template_file, 'w', encoding='utf-8') as f:
        json.dump(template, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 真实数据模板已创建: {template_file}")

def main():
    """主函数"""
    try:
        # 清理示例数据
        clear_sample_data()
        
        # 创建真实数据模板
        create_real_data_template()
        
        print("\n🎯 下一步操作:")
        print("1. 在微信开发者工具中运行 clear_sample_data.js")
        print("2. 使用真实数据录入模板准备数据")
        print("3. 运行数据录入工具导入真实信息")
        print("4. 测试功能是否正常")
        
    except Exception as e:
        print(f"❌ 程序执行错误: {e}")

if __name__ == "__main__":
    main()
