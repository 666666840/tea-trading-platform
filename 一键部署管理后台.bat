@echo off
chcp 65001 >nul
title 茶叶平台独立管理后台部署工具

echo.
echo ========================================
echo 🍵 茶叶平台独立管理后台部署工具
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python未安装，请先安装Python 3.8+
    echo 下载地址：https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python已安装
python --version

:: 检查pip是否可用
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pip不可用，请检查Python安装
    pause
    exit /b 1
)

echo ✅ pip可用

:: 创建虚拟环境
echo.
echo 📦 创建Python虚拟环境...
python -m venv venv
if errorlevel 1 (
    echo ❌ 虚拟环境创建失败
    pause
    exit /b 1
)

echo ✅ 虚拟环境创建成功

:: 激活虚拟环境
echo.
echo 🔄 激活虚拟环境...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ 虚拟环境激活失败
    pause
    exit /b 1
)

echo ✅ 虚拟环境已激活

:: 升级pip
echo.
echo ⬆️ 升级pip...
python -m pip install --upgrade pip

:: 安装依赖
echo.
echo 📦 安装Python依赖...
pip install -r admin-backend\requirements.txt
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo ✅ 依赖安装完成

:: 创建环境配置文件
echo.
echo ⚙️ 创建环境配置文件...
if not exist "admin-backend\.env" (
    copy "admin-backend\env.example" "admin-backend\.env"
    echo ✅ 环境配置文件创建完成
    echo ⚠️ 请编辑 admin-backend\.env 文件配置数据库等信息
) else (
    echo ✅ 环境配置文件已存在
)

:: 创建必要目录
echo.
echo 📁 创建必要目录...
if not exist "admin-backend\uploads" mkdir "admin-backend\uploads"
if not exist "admin-backend\logs" mkdir "admin-backend\logs"
if not exist "admin-backend\static" mkdir "admin-backend\static"
echo ✅ 目录创建完成

:: 启动服务
echo.
echo 🚀 启动管理后台服务...
echo.
echo 📋 部署信息：
echo - 服务地址：http://localhost:8080
echo - 默认账号：admin
echo - 默认密码：admin123456
echo.
echo ⚠️ 重要提醒：
echo - 请立即修改默认密码
echo - 生产环境请配置SSL证书
echo - 定期备份数据
echo.

cd admin-backend
python app.py

pause 