@echo off
chcp 65001 >nul
echo ========================================
echo 茶叶平台管理后台启动脚本
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到Python，请先安装Python 3.7+
    pause
    exit /b 1
)

:: 检查是否在正确的目录
if not exist "app.py" (
    echo 错误: 请在admin-backend目录下运行此脚本
    pause
    exit /b 1
)

:: 检查.env文件是否存在
if not exist ".env" (
    echo 警告: 未找到.env文件，将使用默认配置
    echo 建议创建.env文件并配置数据库连接信息
    echo.
)

:: 检查虚拟环境
if exist "venv\Scripts\activate.bat" (
    echo 激活虚拟环境...
    call venv\Scripts\activate.bat
) else (
    echo 未找到虚拟环境，使用系统Python
)

:: 安装依赖
echo 检查并安装依赖包...
pip install -r requirements.txt

:: 初始化数据库
echo.
echo 初始化数据库...
python create_admin.py

:: 启动服务器
echo.
echo 启动管理后台服务器...
echo 访问地址: http://127.0.0.1:3000
echo 默认管理员账户: admin / admin123
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python app.py

pause 