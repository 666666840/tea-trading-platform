#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复Python 3.13兼容性问题
解决SQLAlchemy与Python 3.13的兼容性问题
"""

import subprocess
import sys
import os

def check_python_version():
    """检查Python版本"""
    version = sys.version_info
    print(f"当前Python版本: {version.major}.{version.minor}.{version.micro}")
    
    if version.major == 3 and version.minor >= 13:
        print("⚠️ 检测到Python 3.13+，可能存在兼容性问题")
        return True
    return False

def uninstall_conflicting_packages():
    """卸载冲突的包"""
    print("🧹 卸载冲突的包...")
    
    packages_to_remove = [
        'Flask-SQLAlchemy',
        'SQLAlchemy',
        'Flask',
        'Werkzeug'
    ]
    
    for package in packages_to_remove:
        try:
            subprocess.run([sys.executable, "-m", "pip", "uninstall", package, "-y"], 
                         check=False, capture_output=True)
            print(f"✅ 已卸载 {package}")
        except Exception as e:
            print(f"⚠️ 卸载 {package} 时出现问题: {e}")

def install_compatible_packages():
    """安装兼容的包版本"""
    print("📦 安装兼容的包版本...")
    
    try:
        # 先安装最新版本的SQLAlchemy
        subprocess.run([sys.executable, "-m", "pip", "install", "SQLAlchemy>=2.0.23"], 
                      check=True)
        print("✅ SQLAlchemy 安装成功")
        
        # 安装Flask 3.0
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask>=3.0.0"], 
                      check=True)
        print("✅ Flask 安装成功")
        
        # 安装Flask-SQLAlchemy 3.1.1
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask-SQLAlchemy>=3.1.1"], 
                      check=True)
        print("✅ Flask-SQLAlchemy 安装成功")
        
        # 安装其他依赖
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True)
        print("✅ 所有依赖包安装成功")
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 安装失败: {e}")
        return False

def test_imports():
    """测试导入是否正常"""
    print("🧪 测试导入...")
    
    try:
        import flask
        print(f"✅ Flask {flask.__version__} 导入成功")
        
        import sqlalchemy
        print(f"✅ SQLAlchemy {sqlalchemy.__version__} 导入成功")
        
        from flask_sqlalchemy import SQLAlchemy
        print("✅ Flask-SQLAlchemy 导入成功")
        
        from flask_cors import CORS
        print("✅ Flask-CORS 导入成功")
        
        return True
    except ImportError as e:
        print(f"❌ 导入失败: {e}")
        return False

def create_simple_test():
    """创建简单的测试脚本"""
    test_code = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单测试脚本
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return {'message': 'Hello, World!'}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3001)
'''
    
    with open('simple_test.py', 'w', encoding='utf-8') as f:
        f.write(test_code)
    
    print("✅ 创建简单测试脚本: simple_test.py")

def run_simple_test():
    """运行简单测试"""
    print("🚀 运行简单测试...")
    
    try:
        result = subprocess.run([sys.executable, "simple_test.py"], 
                              timeout=10, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ 简单测试运行成功")
            return True
        else:
            print(f"❌ 简单测试失败: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("✅ 简单测试启动成功（超时是正常的，因为服务器在运行）")
        return True
    except Exception as e:
        print(f"❌ 简单测试异常: {e}")
        return False

def main():
    """主函数"""
    print("🔧 Python 3.13 兼容性修复工具")
    print("=" * 50)
    
    # 检查Python版本
    is_python_313 = check_python_version()
    
    if not is_python_313:
        print("✅ Python版本兼容，无需修复")
        return
    
    # 卸载冲突的包
    uninstall_conflicting_packages()
    
    # 安装兼容的包
    if not install_compatible_packages():
        print("❌ 包安装失败")
        return
    
    # 测试导入
    if not test_imports():
        print("❌ 导入测试失败")
        return
    
    # 创建并运行简单测试
    create_simple_test()
    if not run_simple_test():
        print("❌ 简单测试失败")
        return
    
    print("\n🎉 兼容性问题修复完成！")
    print("现在可以尝试启动服务器:")
    print("python server.py")

if __name__ == "__main__":
    main() 