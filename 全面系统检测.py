#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面系统检测脚本
检测茶叶平台管理后台的各种潜在问题
"""

import os
import sys
import re
import requests
import json
import time
from pathlib import Path
from collections import defaultdict

# 检查并导入可选依赖
try:
    import mysql.connector
    MYSQL_AVAILABLE = True
except ImportError:
    MYSQL_AVAILABLE = False
    print("⚠️  mysql-connector-python 未安装，数据库检查将跳过")

try:
    import sqlite3
    SQLITE_AVAILABLE = True
except ImportError:
    SQLITE_AVAILABLE = False

class SystemDetector:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.success_count = 0
        self.total_checks = 0
        
    def add_issue(self, category, issue, severity="ERROR"):
        """添加问题"""
        self.issues.append({
            "category": category,
            "issue": issue,
            "severity": severity
        })
        
    def add_warning(self, category, warning):
        """添加警告"""
        self.warnings.append({
            "category": category,
            "warning": warning
        })
        
    def add_success(self, category, message):
        """添加成功检查"""
        self.success_count += 1
        print(f"✅ {category}: {message}")
        
    def check_dependencies(self):
        """检查依赖"""
        print("\n=== 检查依赖 ===")
        
        required_packages = [
            "flask", "requests", "pymysql", "mysql-connector-python"
        ]
        
        for package in required_packages:
            try:
                if package == "mysql-connector-python":
                    import mysql.connector
                elif package == "pymysql":
                    import pymysql
                elif package == "flask":
                    import flask
                elif package == "requests":
                    import requests
                self.add_success("依赖", f"{package} 已安装")
            except ImportError:
                self.add_warning("依赖", f"{package} 未安装")
                
    def check_file_structure(self):
        """检查文件结构"""
        print("\n=== 检查文件结构 ===")
        
        required_files = [
            "admin_backend/app.py",
            "admin_backend/templates/dashboard.html",
            "admin_backend/templates/login.html"
        ]
        
        optional_files = [
            "admin_backend/static/css/style.css",
            "admin_backend/static/js/dashboard.js"
        ]
        
        for file_path in required_files:
            if os.path.exists(file_path):
                self.add_success("文件结构", f"必需文件存在: {file_path}")
            else:
                self.add_issue("文件结构", f"缺少必需文件: {file_path}")
                
        for file_path in optional_files:
            if os.path.exists(file_path):
                self.add_success("文件结构", f"可选文件存在: {file_path}")
            else:
                self.add_warning("文件结构", f"缺少可选文件: {file_path}")
                
    def check_python_syntax(self):
        """检查Python语法错误"""
        print("\n=== 检查Python语法 ===")
        
        python_files = []
        for root, dirs, files in os.walk("admin_backend"):
            for file in files:
                if file.endswith(".py"):
                    python_files.append(os.path.join(root, file))
                    
        for file_path in python_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                compile(content, file_path, 'exec')
                self.add_success("Python语法", f"语法正确: {file_path}")
            except SyntaxError as e:
                self.add_issue("Python语法", f"语法错误 {file_path}: {e}")
            except Exception as e:
                self.add_warning("Python语法", f"检查失败 {file_path}: {e}")
                
    def check_duplicate_routes(self):
        """检查重复路由"""
        print("\n=== 检查重复路由 ===")
        
        app_file = "admin_backend/app.py"
        if not os.path.exists(app_file):
            self.add_issue("路由检查", "app.py文件不存在")
            return
            
        with open(app_file, 'r', encoding='utf-8') as f:
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
        
        if duplicates:
            for path, funcs in duplicates.items():
                self.add_issue("重复路由", f"路由 {path} 有重复函数: {funcs}")
        else:
            self.add_success("重复路由", "未发现重复路由定义")
            
    def check_database_connection(self):
        """检查数据库连接"""
        print("\n=== 检查数据库连接 ===")
        
        if not MYSQL_AVAILABLE:
            self.add_warning("数据库连接", "mysql-connector-python未安装，跳过数据库检查")
            return
            
        try:
            # 尝试连接MySQL
            conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="2852845aA@",
                database="teadb"
            )
            cursor = conn.cursor()
            
            # 检查必要的表
            required_tables = [
                "admin_users", "system_logs", "markets", 
                "merchants", "users", "system_settings"
            ]
            
            for table in required_tables:
                cursor.execute(f"SHOW TABLES LIKE '{table}'")
                if cursor.fetchone():
                    self.add_success("数据库", f"表 {table} 存在")
                else:
                    self.add_issue("数据库", f"缺少表: {table}")
                    
            cursor.close()
            conn.close()
            self.add_success("数据库连接", "MySQL连接正常")
            
        except Exception as e:
            self.add_issue("数据库连接", f"MySQL连接失败: {e}")
            
    def check_api_endpoints(self):
        """检查API端点"""
        print("\n=== 检查API端点 ===")
        
        # 检查服务器是否运行
        try:
            response = requests.get("http://127.0.0.1:5001/", timeout=5)
            if response.status_code == 200 or response.status_code == 302:
                self.add_success("API服务", "服务器正在运行")
            else:
                self.add_warning("API服务", f"服务器响应异常: {response.status_code}")
        except:
            self.add_issue("API服务", "服务器未运行或无法访问")
            return
            
        # 测试API端点
        api_endpoints = [
            "/api/logs/stats",
            "/api/logs/charts", 
            "/api/logs/realtime",
            "/api/logs/alerts",
            "/api/logs/analysis",
            "/api/markets",
            "/api/merchants",
            "/api/users",
            "/api/settings"
        ]
        
        session = requests.Session()
        
        # 尝试登录
        try:
            login_data = {'username': 'admin', 'password': 'admin123'}
            response = session.post("http://127.0.0.1:5001/login", data=login_data)
            if response.status_code == 302:
                self.add_success("API认证", "登录成功")
            else:
                self.add_warning("API认证", "登录失败，可能影响API测试")
        except:
            self.add_warning("API认证", "无法测试登录")
            
        # 测试API端点
        for endpoint in api_endpoints:
            try:
                response = session.get(f"http://127.0.0.1:5001{endpoint}", timeout=5)
                if response.status_code == 200:
                    self.add_success("API端点", f"{endpoint} 正常")
                elif response.status_code == 401:
                    self.add_warning("API端点", f"{endpoint} 需要认证")
                else:
                    self.add_issue("API端点", f"{endpoint} 返回 {response.status_code}")
            except Exception as e:
                self.add_issue("API端点", f"{endpoint} 访问失败: {e}")
                
    def check_configuration(self):
        """检查配置"""
        print("\n=== 检查配置 ===")
        
        # 检查环境变量
        required_env_vars = [
            "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME"
        ]
        
        for var in required_env_vars:
            if os.getenv(var):
                self.add_success("环境变量", f"{var} 已设置")
            else:
                self.add_warning("环境变量", f"{var} 未设置")
                
        # 检查app.py中的配置
        app_file = "admin_backend/app.py"
        if os.path.exists(app_file):
            with open(app_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 检查数据库配置
            if "mysql+pymysql://" in content:
                self.add_success("数据库配置", "数据库连接字符串已配置")
            else:
                self.add_issue("数据库配置", "缺少数据库连接字符串")
                
            # 检查Flask配置
            if "app.secret_key" in content:
                self.add_success("Flask配置", "Secret key已设置")
            else:
                self.add_warning("Flask配置", "Secret key未设置")
                
    def check_security(self):
        """检查安全问题"""
        print("\n=== 检查安全问题 ===")
        
        app_file = "admin_backend/app.py"
        if os.path.exists(app_file):
            with open(app_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 检查SQL注入防护
            if "execute(" in content and "?" in content:
                self.add_success("SQL安全", "使用参数化查询")
            else:
                self.add_warning("SQL安全", "可能存在SQL注入风险")
                
            # 检查XSS防护
            if "escape(" in content or "markupsafe" in content:
                self.add_success("XSS防护", "使用转义函数")
            else:
                self.add_warning("XSS防护", "建议添加XSS防护")
                
            # 检查CSRF防护
            if "csrf" in content.lower():
                self.add_success("CSRF防护", "CSRF保护已启用")
            else:
                self.add_warning("CSRF防护", "建议添加CSRF保护")
                
    def check_performance(self):
        """检查性能问题"""
        print("\n=== 检查性能问题 ===")
        
        app_file = "admin_backend/app.py"
        if os.path.exists(app_file):
            with open(app_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 检查数据库连接池
            if "pool_size" in content or "pool_recycle" in content:
                self.add_success("数据库性能", "使用连接池")
            else:
                self.add_warning("数据库性能", "建议使用数据库连接池")
                
            # 检查缓存
            if "cache" in content.lower():
                self.add_success("缓存", "使用缓存机制")
            else:
                self.add_warning("缓存", "建议添加缓存机制")
                
    def check_logs(self):
        """检查日志文件"""
        print("\n=== 检查日志文件 ===")
        
        log_files = [
            "admin_backend/logs/app.log",
            "admin_backend/logs/error.log",
            "admin_backend/logs/access.log"
        ]
        
        for log_file in log_files:
            if os.path.exists(log_file):
                # 检查文件大小
                size = os.path.getsize(log_file)
                if size > 10 * 1024 * 1024:  # 10MB
                    self.add_warning("日志文件", f"{log_file} 文件过大 ({size/1024/1024:.1f}MB)")
                else:
                    self.add_success("日志文件", f"{log_file} 正常")
            else:
                self.add_warning("日志文件", f"日志文件不存在: {log_file}")
                
    def generate_report(self):
        """生成检测报告"""
        print("\n" + "="*50)
        print("🔍 系统检测报告")
        print("="*50)
        
        print(f"\n📊 检测统计:")
        print(f"   ✅ 成功检查: {self.success_count}")
        print(f"   ⚠️  警告: {len(self.warnings)}")
        print(f"   ❌ 问题: {len(self.issues)}")
        
        if self.warnings:
            print(f"\n⚠️  警告列表:")
            for warning in self.warnings:
                print(f"   [{warning['category']}] {warning['warning']}")
                
        if self.issues:
            print(f"\n❌ 问题列表:")
            for issue in self.issues:
                severity_icon = "🔴" if issue['severity'] == "ERROR" else "🟡"
                print(f"   {severity_icon} [{issue['category']}] {issue['issue']}")
        else:
            print(f"\n🎉 恭喜！未发现严重问题")
            
        # 保存报告到文件
        report_data = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "success_count": self.success_count,
            "warnings": self.warnings,
            "issues": self.issues
        }
        
        with open("系统检测报告.json", "w", encoding="utf-8") as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
            
        print(f"\n📄 详细报告已保存到: 系统检测报告.json")
        
    def run_all_checks(self):
        """运行所有检查"""
        print("🚀 开始全面系统检测...")
        
        self.check_dependencies()
        self.check_file_structure()
        self.check_python_syntax()
        self.check_duplicate_routes()
        self.check_database_connection()
        self.check_api_endpoints()
        self.check_configuration()
        self.check_security()
        self.check_performance()
        self.check_logs()
        
        self.generate_report()

if __name__ == "__main__":
    detector = SystemDetector()
    detector.run_all_checks() 