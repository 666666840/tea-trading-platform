@echo off
chcp 65001 >nul
title 茶叶平台内容自动更新系统

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                🔄 茶叶平台内容自动更新系统 🔄              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 🎯 正在检查环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python 未安装，请先安装 Python
    echo 💡 可以运行 快速安装Python.bat 进行安装
    pause
    exit /b 1
)

echo ✅ Python 环境正常

echo.
echo 🔧 正在安装/更新依赖包...
pip install -r requirements.txt --quiet

echo.
echo 📋 选择运行模式：
echo.
echo [1] 🚀 启动定时器（后台自动更新）
echo [2] 🎯 立即执行一次更新  
echo [3] 📊 查看定时器状态
echo [4] 🔄 测试内容更新功能
echo [5] 📖 查看使用说明
echo [6] ❌ 退出
echo.

set /p choice=请选择 (1-6): 

if "%choice%"=="1" goto :start_daemon
if "%choice%"=="2" goto :run_once
if "%choice%"=="3" goto :show_status
if "%choice%"=="4" goto :test_update
if "%choice%"=="5" goto :show_help
if "%choice%"=="6" goto :exit
goto :invalid_choice

:start_daemon
echo.
echo 🚀 启动内容自动更新定时器...
echo 📅 定时任务：
echo    • 每日 09:00 - 内容更新
echo    • 每日 18:00 - 数据监控  
echo    • 每周一 10:00 - 质量检查
echo.
echo ⚠️  按 Ctrl+C 可停止定时器
echo.
python 自动内容更新定时器.py
goto :end

:run_once
echo.
echo 🎯 立即执行一次完整内容更新...
python 自动内容更新定时器.py --once
echo.
echo 📊 更新完成！查看 server.py 日志了解详情
pause
goto :menu

:show_status
echo.
echo 📊 查看定时器状态...
python 自动内容更新定时器.py --status
echo.
pause
goto :menu

:test_update
echo.
echo 🔄 测试内容更新功能...
echo.
echo 📝 运行每日内容更新机制...
python 每日内容更新机制.py
echo.
echo 📊 运行用户反馈数据监控...
python 用户反馈数据监控.py
echo.
echo ✅ 测试完成！
pause
goto :menu

:show_help
echo.
echo 📖 使用说明：
echo.
echo 🎯 功能介绍：
echo    本系统实现茶叶平台内容的自动更新功能，包括：
echo    • 每日自动生成新的推荐内容、资讯、茶艺知识等
echo    • 定期质量检查，确保内容品质
echo    • 用户反馈监控，持续优化内容
echo.
echo 🔧 操作步骤：
echo    1. 先启动服务器：python server.py
echo    2. 选择模式1启动定时器，实现自动更新
echo    3. 也可以选择模式2手动更新一次
echo.
echo 📂 生成文件：
echo    • daily_update_YYYYMMDD.json - 每日更新的内容文件
echo    • auto_scheduler.log - 定时器运行日志
echo    • content_management.log - 内容管理日志
echo.
echo 💡 提示：
echo    服务器会自动检测更新文件并应用到API中
echo    无需重启服务器，内容实时生效
echo.
pause
goto :menu

:invalid_choice
echo.
echo ❌ 无效选择，请重新输入
echo.
timeout /t 2 >nul
goto :menu

:menu
echo.
echo 🔄 返回主菜单...
echo.
goto :start

:start
cls
goto :main

:main
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                🔄 茶叶平台内容自动更新系统 🔄              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 📋 选择运行模式：
echo.
echo [1] 🚀 启动定时器（后台自动更新）
echo [2] 🎯 立即执行一次更新  
echo [3] 📊 查看定时器状态
echo [4] 🔄 测试内容更新功能
echo [5] 📖 查看使用说明
echo [6] ❌ 退出
echo.

set /p choice=请选择 (1-6): 

if "%choice%"=="1" goto :start_daemon
if "%choice%"=="2" goto :run_once
if "%choice%"=="3" goto :show_status
if "%choice%"=="4" goto :test_update
if "%choice%"=="5" goto :show_help
if "%choice%"=="6" goto :exit
goto :invalid_choice

:exit
echo.
echo 👋 感谢使用茶叶平台内容自动更新系统！
echo.
timeout /t 2 >nul

:end 