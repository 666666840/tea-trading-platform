@echo off
chcp 65001 >nul
title 茶叶一点通API服务器启动器

echo.
echo ========================================
echo           茶叶一点通API服务器
echo ========================================
echo.

echo 🍵 正在启动API服务器...
echo.

python start_server.py

echo.
echo 按任意键退出...
pause >nul 