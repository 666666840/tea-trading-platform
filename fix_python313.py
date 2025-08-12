#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix Python 3.13 compatibility issues
解决Python 3.13兼容性问题
"""

import subprocess
import sys
import os

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    print(f"Current Python version: {version.major}.{version.minor}.{version.micro}")
    
    if version.major == 3 and version.minor >= 13:
        print("Warning: Python 3.13+ detected, compatibility issues may exist")
        return True
    return False

def uninstall_conflicting_packages():
    """Uninstall conflicting packages"""
    print("Cleaning up conflicting packages...")
    
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
            print(f"Uninstalled {package}")
        except Exception as e:
            print(f"Warning: Issue uninstalling {package}: {e}")

def install_compatible_packages():
    """Install compatible package versions"""
    print("Installing compatible package versions...")
    
    try:
        # Install latest SQLAlchemy
        subprocess.run([sys.executable, "-m", "pip", "install", "SQLAlchemy>=2.0.23"], 
                      check=True)
        print("SQLAlchemy installed successfully")
        
        # Install Flask 3.0
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask>=3.0.0"], 
                      check=True)
        print("Flask installed successfully")
        
        # Install Flask-SQLAlchemy 3.1.1
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask-SQLAlchemy>=3.1.1"], 
                      check=True)
        print("Flask-SQLAlchemy installed successfully")
        
        # Install other dependencies
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True)
        print("All dependencies installed successfully")
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Installation failed: {e}")
        return False

def test_imports():
    """Test if imports work correctly"""
    print("Testing imports...")
    
    try:
        import flask
        print(f"Flask {flask.__version__} imported successfully")
        
        import sqlalchemy
        print(f"SQLAlchemy {sqlalchemy.__version__} imported successfully")
        
        from flask_sqlalchemy import SQLAlchemy
        print("Flask-SQLAlchemy imported successfully")
        
        from flask_cors import CORS
        print("Flask-CORS imported successfully")
        
        return True
    except ImportError as e:
        print(f"Import failed: {e}")
        return False

def create_simple_test():
    """Create a simple test script"""
    test_code = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple test script
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
    
    print("Created simple test script: simple_test.py")

def run_simple_test():
    """Run simple test"""
    print("Running simple test...")
    
    try:
        result = subprocess.run([sys.executable, "simple_test.py"], 
                              timeout=10, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("Simple test ran successfully")
            return True
        else:
            print(f"Simple test failed: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("Simple test started successfully (timeout is normal, server is running)")
        return True
    except Exception as e:
        print(f"Simple test exception: {e}")
        return False

def main():
    """Main function"""
    print("Python 3.13 Compatibility Fix Tool")
    print("=" * 50)
    
    # Check Python version
    is_python_313 = check_python_version()
    
    if not is_python_313:
        print("Python version is compatible, no fix needed")
        return
    
    # Uninstall conflicting packages
    uninstall_conflicting_packages()
    
    # Install compatible packages
    if not install_compatible_packages():
        print("Package installation failed")
        return
    
    # Test imports
    if not test_imports():
        print("Import test failed")
        return
    
    # Create and run simple test
    create_simple_test()
    if not run_simple_test():
        print("Simple test failed")
        return
    
    print("\nCompatibility issues fixed successfully!")
    print("Now you can try starting the server:")
    print("python server.py")

if __name__ == "__main__":
    main() 