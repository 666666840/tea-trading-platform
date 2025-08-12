@echo off
echo 🚀 启动茶叶批发小程序本地开发环境...
echo.

echo 📦 检查Node.js环境...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js未安装，请先安装Node.js
    pause
    exit /b 1
)

echo.
echo 🔧 安装依赖包...
npm install

echo.
echo 🌐 启动本地服务器...
npm start

echo.
echo ✅ 本地开发环境启动完成！
echo 📱 请在微信开发者工具中打开项目
echo 🌐 服务器地址: http://localhost:3000
echo.
pause 