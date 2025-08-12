@echo off
chcp 65001 >nul
title 茶叶平台独立管理后台一键部署

echo.
echo ========================================
echo 🚀 茶叶平台独立管理后台一键部署
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未检测到Python，请先安装Python 3.8+
    echo 正在打开Python下载页面...
    start https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 检查Git是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未检测到Git，请先安装Git
    echo 正在打开Git下载页面...
    start https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✅ 环境检查通过
echo.

:: 创建部署目录
set DEPLOY_DIR=C:\tea-admin
echo 📁 创建部署目录: %DEPLOY_DIR%

if not exist "%DEPLOY_DIR%" (
    mkdir "%DEPLOY_DIR%"
    echo ✅ 部署目录创建成功
) else (
    echo ⚠️  部署目录已存在，将使用现有目录
)

:: 复制管理后台文件
echo.
echo 📋 复制管理后台文件...
xcopy "admin_backend\*" "%DEPLOY_DIR%\" /E /Y /Q
echo ✅ 文件复制完成

:: 切换到部署目录
cd /d "%DEPLOY_DIR%"

:: 创建虚拟环境
echo.
echo 🐍 创建Python虚拟环境...
python -m venv venv
if errorlevel 1 (
    echo ❌ 虚拟环境创建失败
    pause
    exit /b 1
)
echo ✅ 虚拟环境创建成功

:: 激活虚拟环境并安装依赖
echo.
echo 📦 安装Python依赖...
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

:: 创建环境配置文件
echo.
echo ⚙️  创建环境配置文件...
if not exist ".env" (
    copy "env.example" ".env"
    echo ✅ 环境配置文件创建完成
    echo ⚠️  请编辑 .env 文件配置数据库等信息
) else (
    echo ⚠️  环境配置文件已存在
)

:: 创建启动脚本
echo.
echo 🚀 创建启动脚本...
(
echo @echo off
echo chcp 65001 ^>nul
echo title 茶叶平台管理后台
echo.
echo echo 正在启动管理后台...
echo echo 访问地址: http://localhost:8080
echo echo 默认账号: admin
echo echo 默认密码: admin123456
echo echo.
echo echo 按 Ctrl+C 停止服务
echo echo.
echo cd /d "%DEPLOY_DIR%"
echo call venv\Scripts\activate.bat
echo python app.py
) > "%DEPLOY_DIR%\start_admin.bat"

:: 创建停止脚本
(
echo @echo off
echo echo 正在停止管理后台服务...
echo taskkill /f /im python.exe 2^>nul
echo echo 服务已停止
echo pause
) > "%DEPLOY_DIR%\stop_admin.bat"

:: 创建数据库初始化脚本
echo.
echo 🗄️  创建数据库初始化脚本...
(
echo @echo off
echo chcp 65001 ^>nul
echo title 数据库初始化
echo.
echo echo 正在初始化数据库...
echo cd /d "%DEPLOY_DIR%"
echo call venv\Scripts\activate.bat
echo python -c "from app import init_database; init_database()"
echo echo.
echo echo 数据库初始化完成
echo pause
) > "%DEPLOY_DIR%\init_db.bat"

:: 创建管理员账号创建脚本
echo.
echo 👤 创建管理员账号脚本...
(
echo @echo off
echo chcp 65001 ^>nul
echo title 创建管理员账号
echo.
echo echo 正在创建管理员账号...
echo cd /d "%DEPLOY_DIR%"
echo call venv\Scripts\activate.bat
echo python create_admin.py
echo echo.
echo echo 管理员账号创建完成
echo pause
) > "%DEPLOY_DIR%\create_admin.bat"

:: 创建桌面快捷方式
echo.
echo 🔗 创建桌面快捷方式...
set DESKTOP=%USERPROFILE%\Desktop
(
echo @echo off
echo cd /d "%DEPLOY_DIR%"
echo start_admin.bat
) > "%DESKTOP%\茶叶管理后台.bat"

echo ✅ 桌面快捷方式创建完成

:: 显示部署完成信息
echo.
echo ========================================
echo 🎉 茶叶平台独立管理后台部署完成！
echo ========================================
echo.
echo 📋 部署信息：
echo - 部署目录: %DEPLOY_DIR%
echo - 访问地址: http://localhost:8080
echo - 默认账号: admin
echo - 默认密码: admin123456
echo.
echo 🔧 管理命令：
echo - 启动服务: %DEPLOY_DIR%\start_admin.bat
echo - 停止服务: %DEPLOY_DIR%\stop_admin.bat
echo - 初始化数据库: %DEPLOY_DIR%\init_db.bat
echo - 创建管理员: %DEPLOY_DIR%\create_admin.bat
echo.
echo 📝 下一步操作：
echo 1. 编辑 %DEPLOY_DIR%\.env 文件配置数据库
echo 2. 运行 init_db.bat 初始化数据库
echo 3. 运行 create_admin.bat 创建管理员账号
echo 4. 运行 start_admin.bat 启动服务
echo.
echo 🔐 安全提醒：
echo - 请立即修改默认密码
echo - 定期备份数据
echo - 监控系统日志
echo.

:: 询问是否立即启动
set /p START_NOW="是否立即启动管理后台？(y/N): "
if /i "%START_NOW%"=="y" (
    echo.
    echo 🚀 正在启动管理后台...
    start_admin.bat
) else (
    echo.
    echo 💡 您可以稍后通过桌面快捷方式或运行 start_admin.bat 启动服务
)

echo.
echo 部署完成！按任意键退出...
pause >nul 