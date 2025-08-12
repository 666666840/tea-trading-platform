@echo off
title 茶叶平台API服务器
echo ==============================
echo      茶叶平台API服务器
echo ==============================
echo.

echo 检查Python环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Python！
    echo 请先运行"快速安装Python.bat"进行安装
    echo.
    pause
    exit /b 1
)

echo Python环境检查通过！
echo.

echo 安装依赖包...
pip install Flask Flask-CORS requests

echo.
echo 启动服务器...
echo 服务器地址：http://localhost:3000
echo 按Ctrl+C停止服务器
echo.

python server.py 