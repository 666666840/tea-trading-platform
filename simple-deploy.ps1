# 茶叶一点通 简单部署脚本

param(
    [string]$ServerIP = "82.157.231.110"
)

Write-Host "部署茶叶一点通API服务器到: $ServerIP" -ForegroundColor Green

# 检查必要文件
$files = @("server.py", "app.py")
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        Write-Host "错误: 缺少文件 $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "文件检查完成" -ForegroundColor Green

# 创建requirements.txt
"Flask==2.3.3`nFlask-CORS==4.0.0`nrequests==2.31.0" | Out-File -FilePath "requirements.txt" -Encoding ASCII

# 创建简单的部署脚本
$bashScript = @'
#!/bin/bash
echo "开始部署API服务器..."

# 创建目录
mkdir -p /www/wwwroot/tea-api
cd /www/wwwroot/tea-api

# 安装Python依赖
python3 -m pip install flask flask-cors requests

# 停止现有服务
pkill -f "python.*server.py" 2>/dev/null || true

# 启动服务
nohup python3 server.py > api.log 2>&1 &
sleep 3

# 检查服务
if pgrep -f "python.*server.py" > /dev/null; then
    echo "API服务器启动成功"
    echo "服务地址: http://$(curl -s ifconfig.me):3000"
else
    echo "启动失败，查看日志:"
    cat api.log
fi
'@

$bashScript | Out-File -FilePath "deploy.sh" -Encoding ASCII

Write-Host "脚本文件已创建" -ForegroundColor Green

# 显示手动部署步骤
Write-Host ""
Write-Host "=== 部署步骤 ===" -ForegroundColor Cyan
Write-Host "1. 上传文件:" -ForegroundColor Yellow
Write-Host "   scp server.py root@${ServerIP}:/www/wwwroot/tea-api/"
Write-Host "   scp app.py root@${ServerIP}:/www/wwwroot/tea-api/"
Write-Host "   scp requirements.txt root@${ServerIP}:/www/wwwroot/tea-api/"
Write-Host "   scp deploy.sh root@${ServerIP}:/www/wwwroot/tea-api/"
Write-Host ""
Write-Host "2. 连接服务器:" -ForegroundColor Yellow
Write-Host "   ssh root@$ServerIP"
Write-Host ""
Write-Host "3. 执行部署:" -ForegroundColor Yellow
Write-Host "   cd /www/wwwroot/tea-api"
Write-Host "   chmod +x deploy.sh"
Write-Host "   ./deploy.sh"
Write-Host ""
Write-Host "4. 测试服务:" -ForegroundColor Yellow
Write-Host "   curl http://localhost:3000/health"
Write-Host ""

$choice = Read-Host "是否自动上传文件? (y/N)"
if ($choice -eq 'y') {
    Write-Host "开始上传..." -ForegroundColor Yellow
    
    scp server.py "root@${ServerIP}:/www/wwwroot/tea-api/"
    scp app.py "root@${ServerIP}:/www/wwwroot/tea-api/"
    scp requirements.txt "root@${ServerIP}:/www/wwwroot/tea-api/"
    scp deploy.sh "root@${ServerIP}:/www/wwwroot/tea-api/"
    
    Write-Host "上传完成! 现在请连接服务器执行部署" -ForegroundColor Green
    Write-Host "ssh root@$ServerIP" -ForegroundColor White
}

Write-Host "部署准备完成!" -ForegroundColor Green 