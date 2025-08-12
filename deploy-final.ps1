Write-Host "茶叶一点通API部署开始" -ForegroundColor Green
Write-Host "服务器: 82.157.231.110" -ForegroundColor Yellow
Write-Host "密码: 58WZRpXt6sPJmsyR" -ForegroundColor Cyan
Write-Host ""

$files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")

Write-Host "检查文件..." -ForegroundColor Cyan
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "OK: $file" -ForegroundColor Green
    } else {
        Write-Host "ERROR: $file 不存在" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "开始上传文件 (密码: 58WZRpXt6sPJmsyR)" -ForegroundColor Yellow

$index = 1
foreach ($file in $files) {
    Write-Host "[$index/5] 上传 $file..." -ForegroundColor Cyan
    scp $file "root@82.157.231.110:/www/wwwroot/tea-api/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: $file" -ForegroundColor Green
    } else {
        Write-Host "FAILED: $file" -ForegroundColor Red
        exit 1
    }
    $index++
}

Write-Host ""
Write-Host "执行服务器部署 (密码: 58WZRpXt6sPJmsyR)..." -ForegroundColor Yellow

ssh "root@82.157.231.110" "cd /www/wwwroot/tea-api; chmod +x *.sh; ./deploy-simple.sh"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "部署成功!" -ForegroundColor Green
    Write-Host "API地址: http://82.157.231.110:3000" -ForegroundColor Cyan
    Write-Host "测试: curl http://82.157.231.110:3000/health" -ForegroundColor Cyan
} else {
    Write-Host "部署失败" -ForegroundColor Red
}

Write-Host "完成!" -ForegroundColor Green 