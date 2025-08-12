@echo off
chcp 65001 >nul
echo 🌟 茶叶平台每日内容更新系统
echo ================================

echo 📦 正在检查依赖包...
"C:\Program Files\Python311\python.exe" -m pip install -r requirements-daily.txt -q

echo 🚀 启动每日内容更新器...
"C:\Program Files\Python311\python.exe" daily-content-updater.py

pause 