#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查Flask路由注册情况
"""

import sys
import os

# 添加项目路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def check_routes():
    """检查路由注册情况"""
    print("🔍 检查Flask路由注册情况...")
    
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
        print("-" * 80)
        
        # 按路由类型分组显示
        api_routes = [r for r in routes if r['rule'].startswith('/api/')]
        page_routes = [r for r in routes if not r['rule'].startswith('/api/') and not r['rule'].startswith('/static/')]
        
        print(f"📄 页面路由 ({len(page_routes)}):")
        for route in sorted(page_routes, key=lambda x: x['rule']):
            print(f"  {route['rule']} -> {route['endpoint']}")
        
        print(f"\n🔌 API路由 ({len(api_routes)}):")
        for route in sorted(api_routes, key=lambda x: x['rule']):
            print(f"  {route['rule']} -> {route['endpoint']}")
        
        # 检查性能监控相关路由
        print(f"\n🔧 性能监控相关路由:")
        performance_routes = [r for r in routes if 'performance' in r['rule']]
        if performance_routes:
            for route in performance_routes:
                print(f"  ✅ {route['rule']} -> {route['endpoint']}")
        else:
            print("  ❌ 未找到性能监控相关路由")
        
        # 检查日志相关路由
        print(f"\n📝 日志相关路由:")
        log_routes = [r for r in routes if 'log' in r['rule']]
        if log_routes:
            for route in log_routes:
                print(f"  ✅ {route['rule']} -> {route['endpoint']}")
        else:
            print("  ❌ 未找到日志相关路由")
        
        return True
        
    except Exception as e:
        print(f"❌ 检查路由失败: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    check_routes() 