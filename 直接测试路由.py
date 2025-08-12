#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
直接测试Flask路由注册情况
"""

import sys
import os

# 添加项目路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_routes_directly():
    """直接测试路由注册"""
    print("🔍 直接测试Flask路由注册...")
    
    try:
        # 导入app
        from admin_backend.app import app
        
        print(f"✅ Flask应用加载成功")
        print(f"应用名称: {app.name}")
        
        # 获取所有路由
        routes = []
        for rule in app.url_map.iter_rules():
            routes.append({
                'endpoint': rule.endpoint,
                'methods': list(rule.methods),
                'rule': rule.rule
            })
        
        print(f"\n📋 总共注册了 {len(routes)} 个路由:")
        print("=" * 80)
        
        # 查找性能监控相关路由
        performance_routes = []
        for route in routes:
            if 'performance' in route['rule'] or 'performance' in route['endpoint']:
                performance_routes.append(route)
        
        print(f"\n🎯 性能监控相关路由 ({len(performance_routes)} 个):")
        print("-" * 60)
        for route in performance_routes:
            print(f"路由: {route['rule']}")
            print(f"端点: {route['endpoint']}")
            print(f"方法: {route['methods']}")
            print("-" * 30)
        
        if not performance_routes:
            print("❌ 未找到任何性能监控相关路由！")
        else:
            print("✅ 性能监控路由已注册")
            
        # 测试应用上下文
        print(f"\n🔧 测试应用上下文...")
        with app.app_context():
            print("✅ 应用上下文正常")
            
            # 测试路由解析
            for route in performance_routes:
                try:
                    # 尝试构建URL
                    url = app.url_map.bind('localhost').build(route['endpoint'])
                    print(f"✅ {route['endpoint']} -> {url}")
                except Exception as e:
                    print(f"❌ {route['endpoint']} 构建失败: {e}")
                    
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_routes_directly() 