@echo off
echo 🚀 启动茶叶批发小程序Python服务器...
echo.

echo 📦 检查Python环境...
python --version
if %errorlevel% neq 0 (
    echo ❌ Python未安装，请先安装Python
    pause
    exit /b 1
)

echo.
echo 🔧 检查依赖包...
python -c "import flask" 2>nul
if %errorlevel% neq 0 (
    echo 📦 安装Flask依赖...
    pip install flask flask-cors
)

echo.
echo 🌐 启动服务器...
echo 📱 服务器地址: http://localhost:3000
echo 🔍 健康检查: http://localhost:3000/health
echo 📊 API文档: http://localhost:3000/api/content
echo.
echo ⚠️  按 Ctrl+C 停止服务器
echo.

python server.py

echo.
echo ✅ 服务器已停止
pause 