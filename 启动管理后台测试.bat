@echo off
chcp 65001 >nul
echo.
echo 🍵 茶叶平台管理后台启动脚本
echo ================================
echo.

echo 📂 切换到项目目录...
cd /d "%~dp0"

echo 🔧 检查Python环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python未安装或未添加到PATH
    echo 💡 请先安装Python 3.7+
    pause
    exit /b 1
)

echo 📦 检查依赖包...
python -c "import flask, flask_sqlalchemy, flask_login, psutil" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  缺少依赖包，正在安装...
    pip install flask flask-sqlalchemy flask-login psutil python-dotenv
)

echo 🚀 启动管理后台服务器...
echo.
echo 📱 访问地址: http://localhost:8080
echo 👤 默认账号: admin
echo 🔑 默认密码: admin123456
echo.
echo ⚠️  请勿关闭此窗口，关闭窗口将停止服务器
echo 🔄 按 Ctrl+C 停止服务
echo.

python admin_backend/app_simple.py

echo.
echo 👋 管理后台服务器已停止
pause
