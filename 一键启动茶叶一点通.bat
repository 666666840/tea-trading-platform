@echo off
chcp 65001 >nul
title 茶叶一点通 - 一键启动

echo.
echo ========================================
echo           茶叶一点通一键启动
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到Python，请先安装Python 3.8+
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 检查是否在正确的目录
if not exist "server.py" (
    echo ❌ 错误: 请在茶叶一点通项目根目录下运行此脚本
    echo 当前目录: %CD%
    pause
    exit /b 1
)

echo ✅ Python环境检查通过
echo.

:: 检查并安装依赖
echo 🔧 检查Python依赖包...
pip install flask flask-sqlalchemy flask-migrate flask-cors >nul 2>&1
if errorlevel 1 (
    echo ⚠️  警告: 部分依赖包安装失败，尝试使用requirements.txt
    pip install -r requirements.txt >nul 2>&1
)

echo ✅ 依赖包检查完成
echo.

:: 启动后端服务器
echo 🚀 启动后端API服务器...
echo 服务器地址: http://localhost:3000
echo 健康检查: http://localhost:3000/health
echo.

:: 在新窗口中启动服务器
start "茶叶一点通API服务器" cmd /k "python server.py"

:: 等待服务器启动
echo ⏳ 等待服务器启动...
timeout /t 3 /nobreak >nul

:: 测试服务器连接
echo 🔍 测试服务器连接...
curl -s http://localhost:3000/health >nul 2>&1
if errorlevel 1 (
    echo ⚠️  警告: 服务器可能还在启动中，请稍等片刻
) else (
    echo ✅ 服务器连接成功！
)

echo.
echo ========================================
echo           启动完成！
echo ========================================
echo.
echo 📱 下一步操作:
echo 1. 打开微信开发者工具
echo 2. 导入项目: %CD%
echo 3. 在模拟器中体验小程序
echo.
echo 🔗 有用的链接:
echo - 服务器状态: http://localhost:3000/health
echo - API文档: http://localhost:3000/
echo - 测试脚本: 运行 测试API集成完整性.js
echo.
echo 💡 提示:
echo - 服务器运行在后台，关闭此窗口不会停止服务器
echo - 如需停止服务器，请关闭对应的命令行窗口
echo - 如遇问题，请查看控制台日志
echo.

:: 询问是否打开微信开发者工具
set /p choice="是否自动打开微信开发者工具？(y/n): "
if /i "%choice%"=="y" (
    echo 🔧 尝试打开微信开发者工具...
    start "" "C:\Program Files (x86)\Tencent\微信web开发者工具\微信web开发者工具.exe"
    if errorlevel 1 (
        echo ⚠️  未找到微信开发者工具，请手动打开
        echo 默认路径: C:\Program Files (x86)\Tencent\微信web开发者工具\
    ) else (
        echo ✅ 微信开发者工具已启动
    )
)

echo.
echo 🎉 茶叶一点通系统启动完成！
echo 按任意键退出...
pause >nul 