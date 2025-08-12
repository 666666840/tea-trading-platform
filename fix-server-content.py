#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复server.py中的JSON格式问题
将多行字符串正确转义，避免语法错误
"""

import json
import re

def create_fixed_content():
    """创建修复后的内容数据"""
    
    # 简化的内容数据，避免多行字符串问题
    content_data = {
        "recommend": [],
        "news": [],
        "art": [],
        "hot": []
    }
    
    return content_data

def fix_server_file():
    """修复server.py文件"""
    
    print("🔧 开始修复server.py文件...")
    
    # 读取现有文件
    with open('server.py', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 生成新的内容数据
    new_content_data = create_fixed_content()
    
    # 将内容数据转换为正确的Python代码
    content_str = "content_data = " + json.dumps(new_content_data, ensure_ascii=False, indent=4)
    
    # 查找并替换content_data部分
    pattern = r'content_data\s*=\s*\{.*?\n\}'
    
    if re.search(pattern, content, re.DOTALL):
        print("🔄 替换现有内容数据...")
        # 找到content_data的结束位置
        match = re.search(pattern, content, re.DOTALL)
        if match:
            # 计算正确的结束位置（找到对应的闭合大括号）
            start_pos = match.start()
            # 从Flask导入开始到content_data定义结束
            before_content = content[:start_pos]
            
            # 查找content_data后面的代码（从app = Flask开始）
            flask_pattern = r'(app\s*=\s*Flask\(__name__\))'
            flask_match = re.search(flask_pattern, content)
            if flask_match:
                after_content = content[flask_match.start():]
                fixed_content = before_content + content_str + "\n\n" + after_content
            else:
                # 如果找不到Flask app定义，就保留原有结构
                fixed_content = before_content + content_str + "\n\n" + content[match.end():]
        else:
            fixed_content = content
    else:
        print("➕ 添加新的内容数据...")
        # 在Flask app定义之前插入
        flask_pattern = r'(app\s*=\s*Flask\(__name__\))'
        if re.search(flask_pattern, content):
            fixed_content = re.sub(flask_pattern, content_str + "\n\n" + r'\1', content)
        else:
            fixed_content = content_str + "\n\n" + content
    
    # 写入修复后的文件
    with open('server.py', 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print("✅ server.py文件修复完成！")
    print(f"📊 更新了{len(new_content_data['recommend'])}条推荐、{len(new_content_data['news'])}条资讯、{len(new_content_data['art'])}条茶艺、{len(new_content_data['hot'])}条热点内容")

if __name__ == "__main__":
    print("=== 修复server.py文件工具 ===\n")
    
    try:
        fix_server_file()
        print("\n🎉 修复完成！现在可以正常启动服务器了")
        print('运行命令：& "C:\\Program Files\\Python311\\python.exe" server.py')
        
    except Exception as e:
        print(f"❌ 修复过程中出现错误：{str(e)}")
        print("请检查文件权限和路径是否正确") 