#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
真实数据状态检查工具
检查茶叶小程序中的真实数据状态和完整性
"""

import json
import os
import sqlite3
from datetime import datetime
import sys

def check_storage_data():
    """检查本地存储数据"""
    print("🔍 检查本地存储数据...")
    
    # 检查数据库文件
    db_files = [
        'content_management.db',
        'tea_platform.db',
        'user_data.db'
    ]
    
    for db_file in db_files:
        if os.path.exists(db_file):
            print(f"✅ 发现数据库文件: {db_file}")
            try:
                conn = sqlite3.connect(db_file)
                cursor = conn.cursor()
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
                tables = cursor.fetchall()
                print(f"   表数量: {len(tables)}")
                for table in tables:
                    cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
                    count = cursor.fetchone()[0]
                    print(f"   - {table[0]}: {count} 条记录")
                conn.close()
            except Exception as e:
                print(f"   ❌ 读取数据库失败: {e}")
        else:
            print(f"❌ 数据库文件不存在: {db_file}")

def check_json_data():
    """检查JSON数据文件"""
    print("\n📄 检查JSON数据文件...")
    
    json_files = [
        '简化功能测试报告.json',
        '系统检测报告.json',
        '系统优化总结报告.json'
    ]
    
    for json_file in json_files:
        if os.path.exists(json_file):
            print(f"✅ 发现JSON文件: {json_file}")
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                print(f"   数据大小: {len(str(data))} 字符")
                if isinstance(data, dict):
                    print(f"   键数量: {len(data.keys())}")
            except Exception as e:
                print(f"   ❌ 读取JSON失败: {e}")
        else:
            print(f"❌ JSON文件不存在: {json_file}")

def check_data_manager():
    """检查数据管理器状态"""
    print("\n🛠️ 检查数据管理器...")
    
    data_manager_file = 'utils/data-manager.js'
    if os.path.exists(data_manager_file):
        print(f"✅ 数据管理器文件存在: {data_manager_file}")
        try:
            with open(data_manager_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查关键方法
            methods = [
                'addMerchant',
                'getMerchants', 
                'updateMerchant',
                'approveMerchant',
                'deleteMerchant',
                'searchMerchants',
                'addProduct',
                'importData',
                'exportData',
                'backupData',
                'restoreData'
            ]
            
            for method in methods:
                if method in content:
                    print(f"   ✅ 方法存在: {method}")
                else:
                    print(f"   ❌ 方法缺失: {method}")
                    
        except Exception as e:
            print(f"   ❌ 读取文件失败: {e}")
    else:
        print(f"❌ 数据管理器文件不存在: {data_manager_file}")

def check_admin_pages():
    """检查管理页面状态"""
    print("\n👨‍💼 检查管理页面...")
    
    admin_pages = [
        'pages/data-admin/data-admin.js',
        'pages/data-admin/data-admin.wxml',
        'pages/data-admin/data-admin.wxss',
        'pages/merchant-register/merchant-register.js',
        'pages/merchant-status/merchant-status.js'
    ]
    
    for page in admin_pages:
        if os.path.exists(page):
            print(f"✅ 管理页面存在: {page}")
        else:
            print(f"❌ 管理页面缺失: {page}")

def check_real_data():
    """检查真实数据内容"""
    print("\n📊 检查真实数据内容...")
    
    # 检查是否有真实商户数据
    try:
        # 这里可以添加检查微信小程序本地存储的逻辑
        # 由于Python无法直接访问微信小程序的存储，我们检查相关文件
        print("   注意: 真实数据存储在微信小程序本地存储中")
        print("   建议在微信开发者工具中查看 Storage 面板")
        
        # 检查是否有示例数据清理的痕迹
        cleanup_files = [
            '立即清除.js',
            '一键清除.bat',
            '自动清理机制使用指南.md'
        ]
        
        for file in cleanup_files:
            if os.path.exists(file):
                print(f"   ✅ 清理工具存在: {file}")
            else:
                print(f"   ❌ 清理工具缺失: {file}")
                
    except Exception as e:
        print(f"   ❌ 检查真实数据失败: {e}")

def generate_report():
    """生成检查报告"""
    print("\n📋 生成检查报告...")
    
    report = {
        "检查时间": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "检查项目": [
            "本地存储数据",
            "JSON数据文件", 
            "数据管理器",
            "管理页面",
            "真实数据内容"
        ],
        "建议": [
            "在微信开发者工具中查看 Storage 面板确认真实数据状态",
            "检查商户入驻功能是否正常工作",
            "验证数据管理后台的权限控制",
            "测试数据导入导出功能",
            "确认自动清理机制是否正常运行"
        ]
    }
    
    # 保存报告
    report_file = f"数据状态检查报告_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    try:
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        print(f"✅ 检查报告已保存: {report_file}")
    except Exception as e:
        print(f"❌ 保存报告失败: {e}")

def main():
    """主函数"""
    print("=" * 60)
    print("🍵 茶叶批发小程序真实数据状态检查")
    print("=" * 60)
    
    try:
        check_storage_data()
        check_json_data()
        check_data_manager()
        check_admin_pages()
        check_real_data()
        generate_report()
        
        print("\n" + "=" * 60)
        print("✅ 检查完成！")
        print("💡 建议在微信开发者工具中进一步验证数据状态")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ 检查过程中出现错误: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
