@echo off
chcp 65001 >nul
echo 🔧 茶叶批发平台 API 启动工具
echo ================================

echo.
echo 📦 正在检查Python环境...
python --version
if errorlevel 1 (
    echo ❌ Python未安装或未添加到PATH
    echo 💡 请先安装Python
    pause
    exit /b 1
)

echo.
echo 📦 正在安装依赖包...
python -m pip install flask flask-cors requests --quiet

echo.
echo 🚀 正在启动API服务器...
echo 📡 服务器地址: http://127.0.0.1:3000
echo 🌐 健康检查: http://127.0.0.1:3000/health
echo.
echo ⚠️  提示：保持此窗口打开，关闭窗口将停止API服务
echo.

python server.py

echo.
echo ⚠️  API服务器已停止
pause 