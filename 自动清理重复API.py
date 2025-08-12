#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动清理重复API路由脚本 - 无需交互版本
解决Flask中重复路由定义的问题
"""

import re
import os
from collections import defaultdict

def clean_duplicate_routes(file_path):
    """清理重复的路由定义"""
    print(f"开始清理文件: {file_path}")
    
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找所有路由定义
    route_pattern = r'@app\.route\([\'"]([^\'"]+)[\'"][^)]*\)\s*\n@login_required\s*\ndef\s+(\w+)\s*\([^)]*\):'
    routes = re.findall(route_pattern, content)
    
    # 统计重复的路由
    route_counts = defaultdict(list)
    for route_path, func_name in routes:
        route_counts[route_path].append(func_name)
    
    # 找出重复的路由
    duplicates = {path: funcs for path, funcs in route_counts.items() if len(funcs) > 1}
    
    if not duplicates:
        print("未发现重复路由")
        return False
    
    print(f"发现 {len(duplicates)} 个重复路由:")
    for path, funcs in duplicates.items():
        print(f"  {path}: {funcs}")
    
    # 备份原文件
    backup_path = file_path + '.backup'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"已备份原文件到: {backup_path}")
    
    # 清理重复路由
    cleaned_content = content
    
    for path, funcs in duplicates.items():
        # 保留第一个函数定义，删除后续的重复定义
        keep_func = funcs[0]
        remove_funcs = funcs[1:]
        
        print(f"保留函数: {keep_func}, 删除函数: {remove_funcs}")
        
        for remove_func in remove_funcs:
            # 查找并删除重复的函数定义
            pattern = rf'@app\.route\([\'"]({re.escape(path)})[\'"][^)]*\)\s*\n@login_required\s*\ndef\s+{remove_func}\s*\([^)]*\):.*?(?=@app\.route|def\s+\w+\s*\(|$)'
            match = re.search(pattern, cleaned_content, re.DOTALL)
            if match:
                cleaned_content = cleaned_content.replace(match.group(0), '')
                print(f"已删除重复函数: {remove_func}")
    
    # 清理多余的空行
    cleaned_content = re.sub(r'\n\s*\n\s*\n', '\n\n', cleaned_content)
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"清理完成，已保存到: {file_path}")
    return True

def find_duplicate_functions(file_path):
    """查找重复的函数定义"""
    print(f"检查文件中的重复函数: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找所有函数定义
    func_pattern = r'def\s+(\w+)\s*\([^)]*\):'
    functions = re.findall(func_pattern, content)
    
    # 统计重复的函数
    func_counts = defaultdict(int)
    for func in functions:
        func_counts[func] += 1
    
    # 找出重复的函数
    duplicates = {func: count for func, count in func_counts.items() if count > 1}
    
    if duplicates:
        print("发现重复函数定义:")
        for func, count in duplicates.items():
            print(f"  {func}: {count} 次")
    else:
        print("未发现重复函数定义")
    
    return duplicates

def main():
    """主函数"""
    app_file = 'admin_backend/app.py'
    
    if not os.path.exists(app_file):
        print(f"文件不存在: {app_file}")
        return
    
    print("=== 茶叶平台管理后台 - 自动重复API清理工具 ===")
    print()
    
    # 查找重复函数
    duplicates = find_duplicate_functions(app_file)
    
    if duplicates:
        print()
        print("自动清理重复的路由定义...")
        cleaned = clean_duplicate_routes(app_file)
        
        if cleaned:
            print()
            print("清理完成！请重新启动服务器测试。")
            print("建议使用: python -m admin_backend.app")
        else:
            print("无需清理")
    else:
        print("文件状态正常，无需清理")

if __name__ == '__main__':
    main() 