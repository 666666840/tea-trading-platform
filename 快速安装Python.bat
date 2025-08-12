@echo off
echo ==============================
echo      茶叶平台Python环境安装
echo ==============================
echo.

echo 正在下载Python 3.11...
curl -o python-installer.exe https://www.python.org/ftp/python/3.11.7/python-3.11.7-amd64.exe

echo.
echo 开始安装Python（请在安装程序中勾选"Add to PATH"）...
python-installer.exe /quiet InstallAllUsers=1 PrependPath=1

echo.
echo 等待安装完成...
timeout /t 30

echo.
echo 刷新环境变量...
call refreshenv

echo.
echo 安装Flask依赖...
pip install Flask==2.3.3
pip install Flask-CORS==4.0.0
pip install requests==2.31.0

echo.
echo 清理安装文件...
del python-installer.exe

echo.
echo ==============================
echo      安装完成！
echo ==============================
echo 现在可以运行: python server.py
echo.
pause 