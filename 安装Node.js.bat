@echo off
echo 🚀 自动安装Node.js开发环境...
echo.

echo 📦 检查是否已安装Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js已安装
    node --version
    goto :install_deps
)

echo ❌ Node.js未安装，开始自动安装...
echo.

echo 🔍 检查是否有Node.js安装包...
if exist "node-installer.exe" (
    echo 📦 找到本地安装包，开始安装...
    start /wait node-installer.exe /S
) else (
    echo 🌐 下载Node.js安装包...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi' -OutFile 'node-installer.msi'}"
    
    if exist "node-installer.msi" (
        echo 📦 安装Node.js...
        msiexec /i node-installer.msi /quiet /norestart
        timeout /t 30 /nobreak >nul
    ) else (
        echo ❌ 下载失败，请手动安装Node.js
        echo 🌐 下载地址: https://nodejs.org/
        pause
        exit /b 1
    )
)

echo.
echo 🔄 刷新环境变量...
call refreshenv.cmd >nul 2>&1

echo.
echo ✅ 验证安装...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js安装失败，请重启命令行或手动安装
    pause
    exit /b 1
)

echo.
echo ✅ Node.js安装成功！

:install_deps
echo.
echo 📦 安装项目依赖...
npm install

echo.
echo ✅ 开发环境安装完成！
echo 🚀 现在可以启动本地服务器了
echo.
pause 