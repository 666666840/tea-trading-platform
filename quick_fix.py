#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Quick fix for Python 3.13 compatibility
快速修复Python 3.13兼容性问题
"""

import subprocess
import sys

def main():
    print("Quick fix for Python 3.13 compatibility")
    print("=" * 40)
    
    try:
        # Uninstall old packages
        print("Uninstalling old packages...")
        subprocess.run([sys.executable, "-m", "pip", "uninstall", "Flask-SQLAlchemy", "SQLAlchemy", "Flask", "Werkzeug", "-y"], 
                      check=False, capture_output=True)
        
        # Install new packages
        print("Installing new packages...")
        subprocess.run([sys.executable, "-m", "pip", "install", "SQLAlchemy>=2.0.23"], check=True)
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask>=3.0.0"], check=True)
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask-SQLAlchemy>=3.1.1"], check=True)
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask-CORS>=4.0.0"], check=True)
        
        # Test import
        print("Testing import...")
        subprocess.run([sys.executable, "-c", "from flask_sqlalchemy import SQLAlchemy; print('Import successful')"], check=True)
        
        print("\nFix completed successfully!")
        print("You can now run: python server.py")
        
    except Exception as e:
        print(f"Error: {e}")
        print("Please try running the commands manually:")

if __name__ == "__main__":
    main() 