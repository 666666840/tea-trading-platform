@echo off
chcp 65001 >nul
echo 正在启动茶叶平台管理后台...
echo.

cd admin_backend
python app.py

if %ERRORLEVEL% neq 0 (
    echo.
    echo 启动失败，错误代码: %ERRORLEVEL%
    pause
) 