@echo off
echo 茶叶一点通API自动部署
echo 服务器: 82.157.231.110
echo 密码: 58WZRpXt6sPJmsyR
echo.

echo [1/5] 上传 server.py...
echo 请输入密码: 58WZRpXt6sPJmsyR
scp server.py root@82.157.231.110:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败，请检查网络和密码
    pause
    exit /b 1
)
echo ✅ server.py 上传成功

echo.
echo [2/5] 上传 app.py...  
echo 请输入密码: 58WZRpXt6sPJmsyR
scp app.py root@82.157.231.110:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败
    pause
    exit /b 1
)
echo ✅ app.py 上传成功

echo.
echo [3/5] 上传 requirements.txt...
echo 请输入密码: 58WZRpXt6sPJmsyR
scp requirements.txt root@82.157.231.110:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败
    pause
    exit /b 1
)
echo ✅ requirements.txt 上传成功

echo.
echo [4/5] 上传 deploy-simple.sh...
echo 请输入密码: 58WZRpXt6sPJmsyR
scp deploy-simple.sh root@82.157.231.110:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败
    pause
    exit /b 1
)
echo ✅ deploy-simple.sh 上传成功

echo.
echo [5/5] 上传 server-manager.sh...
echo 请输入密码: 58WZRpXt6sPJmsyR
scp server-manager.sh root@82.157.231.110:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败
    pause
    exit /b 1
)
echo ✅ server-manager.sh 上传成功

echo.
echo 所有文件上传完成！
echo.
echo 开始执行服务器部署...
echo 请输入密码: 58WZRpXt6sPJmsyR
ssh root@82.157.231.110 "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"

if %errorlevel% eq 0 (
    echo.
    echo ========================================
    echo 🎉 部署成功完成！
    echo 🌐 API地址: http://82.157.231.110:3000
    echo 🔍 测试命令: curl http://82.157.231.110:3000/health
    echo ========================================
) else (
    echo.
    echo ❌ 部署失败，请检查错误信息
)

echo.
echo 按任意键退出...
pause > nul 