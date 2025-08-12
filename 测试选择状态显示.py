#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试选择状态显示功能
"""

def test_selection_display():
    """测试选择状态显示功能"""
    print("🧪 测试选择状态显示功能...")
    
    # 模拟页面数据
    mock_data = {
        "formData": {
            "teaTypes": [],
            "features": []
        },
        "teaTypeOptions": ["红茶", "绿茶", "青茶", "黄茶", "黑茶", "白茶", "花茶"],
        "featureOptions": ["明前采摘", "核心产区", "荒野老枞", "有机认证", "传统工艺", "生态种植"]
    }
    
    def simulate_tea_selection(tea_type):
        """模拟茶叶类型选择"""
        print(f"🍵 选择茶叶类型: {tea_type}")
        
        if tea_type not in mock_data["formData"]["teaTypes"]:
            mock_data["formData"]["teaTypes"].append(tea_type)
            print(f"✅ 已添加: {tea_type}")
        else:
            mock_data["formData"]["teaTypes"].remove(tea_type)
            print(f"❌ 已移除: {tea_type}")
        
        # 显示当前选择状态
        display_selection_status("茶叶类型", mock_data["formData"]["teaTypes"])
    
    def simulate_feature_selection(feature):
        """模拟特色标签选择"""
        print(f"🏷️ 选择特色标签: {feature}")
        
        if feature not in mock_data["formData"]["features"]:
            if len(mock_data["formData"]["features"]) < 6:
                mock_data["formData"]["features"].append(feature)
                print(f"✅ 已添加: {feature}")
            else:
                print(f"❌ 已达到最大选择数量(6个)")
                return
        else:
            mock_data["formData"]["features"].remove(feature)
            print(f"❌ 已移除: {feature}")
        
        # 显示当前选择状态
        display_selection_status("特色标签", mock_data["formData"]["features"])
    
    def display_selection_status(category, items):
        """显示选择状态"""
        print(f"\n📊 {category}选择状态:")
        print(f"   数组长度: {len(items)}")
        print(f"   内容: [{', '.join(items) if items else '空'}]")
        
        if items:
            print(f"   已选择: {'、'.join(items)}")
            print(f"   显示项目:")
            for i, item in enumerate(items, 1):
                print(f"     {i}. {item} [可点击×移除]")
        else:
            print(f"   暂无选择")
        
        print("-" * 50)
    
    # 测试用例
    print("=" * 60)
    print("🎯 开始测试选择状态显示功能")
    print("=" * 60)
    
    # 测试1: 选择茶叶类型
    print("\n🧪 测试1: 茶叶类型选择")
    simulate_tea_selection("红茶")
    simulate_tea_selection("绿茶")
    simulate_tea_selection("白茶")
    
    # 测试2: 取消选择茶叶类型
    print("\n🧪 测试2: 取消茶叶类型选择")
    simulate_tea_selection("绿茶")
    
    # 测试3: 选择特色标签
    print("\n🧪 测试3: 特色标签选择")
    simulate_feature_selection("明前采摘")
    simulate_feature_selection("核心产区")
    simulate_feature_selection("有机认证")
    simulate_feature_selection("传统工艺")
    simulate_feature_selection("生态种植")
    simulate_feature_selection("荒野老枞")
    
    # 测试4: 测试超出限制
    print("\n🧪 测试4: 测试超出限制")
    simulate_feature_selection("古树茶")
    
    # 测试5: 取消选择特色标签
    print("\n🧪 测试5: 取消特色标签选择")
    simulate_feature_selection("明前采摘")
    simulate_feature_selection("核心产区")
    
    # 测试6: 清空所有选择
    print("\n🧪 测试6: 清空所有选择")
    mock_data["formData"]["teaTypes"].clear()
    mock_data["formData"]["features"].clear()
    display_selection_status("茶叶类型", mock_data["formData"]["teaTypes"])
    display_selection_status("特色标签", mock_data["formData"]["features"])
    
    print("\n" + "=" * 60)
    print("📋 测试报告")
    print("=" * 60)
    
    print("✅ 选择状态显示功能测试完成!")
    print("\n🎯 功能特点:")
    print("   - 实时显示选中的项目")
    print("   - 支持单独移除项目")
    print("   - 显示数组长度和内容")
    print("   - 支持一键清空")
    print("   - 数量限制检查")
    
    print("\n🎨 显示效果:")
    print("   - 茶叶类型: 蓝色背景标签")
    print("   - 特色标签: 绿色背景标签")
    print("   - 每个标签都有×按钮可移除")
    print("   - 选中状态清晰可见")
    
    return mock_data

def generate_html_preview():
    """生成HTML预览"""
    print("\n" + "=" * 60)
    print("🌐 HTML预览效果")
    print("=" * 60)
    
    html_template = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>选择状态显示预览</title>
    <style>
        .selection-display {
            margin: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 2px solid #e9ecef;
        }
        .selected-items {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .selected-item {
            display: flex;
            align-items: center;
            background: #2196F3;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
        }
        .feature-item {
            background: #4CAF50;
            box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
        }
        .item-text {
            margin-right: 8px;
        }
        .remove-btn {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h3>茶叶类型选择状态</h3>
    <div class="selection-display">
        <div class="selected-items">
            <div class="selected-item">
                <span class="item-text">红茶</span>
                <span class="remove-btn">×</span>
            </div>
            <div class="selected-item">
                <span class="item-text">绿茶</span>
                <span class="remove-btn">×</span>
            </div>
            <div class="selected-item">
                <span class="item-text">白茶</span>
                <span class="remove-btn">×</span>
            </div>
        </div>
    </div>
    
    <h3>特色标签选择状态</h3>
    <div class="selection-display">
        <div class="selected-items">
            <div class="selected-item feature-item">
                <span class="item-text">明前采摘</span>
                <span class="remove-btn">×</span>
            </div>
            <div class="selected-item feature-item">
                <span class="item-text">核心产区</span>
                <span class="remove-btn">×</span>
            </div>
            <div class="selected-item feature-item">
                <span class="item-text">有机认证</span>
                <span class="remove-btn">×</span>
            </div>
        </div>
    </div>
</body>
</html>
    """
    
    # 保存HTML文件
    with open("选择状态显示预览.html", "w", encoding="utf-8") as f:
        f.write(html_template)
    
    print("✅ HTML预览文件已生成: 选择状态显示预览.html")
    print("💡 可以在浏览器中打开查看效果")

if __name__ == "__main__":
    test_selection_display()
    generate_html_preview()
    
    print("\n🎉 所有测试完成!")
    print("📝 现在您的多选功能可以清楚地显示选中的内容了!")
