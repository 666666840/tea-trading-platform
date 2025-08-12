# 茶叶一点通即时部署脚本
Write-Host "🚀 茶叶一点通API即时部署启动！" -ForegroundColor Green
Write-Host "📍 目标服务器: 82.157.231.110" -ForegroundColor Yellow
Write-Host "🔐 密码: 58WZRpXt6sPJmsyR" -ForegroundColor Cyan
Write-Host ""

# 检查必要文件
$files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
Write-Host "📋 检查文件..." -ForegroundColor Cyan

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ 缺少 $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📤 开始上传文件 (请在提示时输入密码: 58WZRpXt6sPJmsyR)" -ForegroundColor Yellow
Write-Host ""

# 上传文件
$index = 1
foreach ($file in $files) {
    Write-Host "[$index/5] 正在上传 $file..." -ForegroundColor Cyan
    Write-Host "💡 提示: 请输入密码 58WZRpXt6sPJmsyR" -ForegroundColor Yellow
    
    scp $file "root@82.157.231.110:/www/wwwroot/tea-api/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $file 上传成功" -ForegroundColor Green
    } else {
        Write-Host "❌ $file 上传失败" -ForegroundColor Red
        Write-Host "🔄 请重试..." -ForegroundColor Yellow
        exit 1
    }
    $index++
    Write-Host ""
}

Write-Host "🚀 所有文件上传完成！现在执行服务器部署..." -ForegroundColor Green
Write-Host "💡 提示: 请再次输入密码 58WZRpXt6sPJmsyR" -ForegroundColor Yellow
Write-Host ""

# 执行远程部署
ssh "root@82.157.231.110" "cd /www/wwwroot/tea-api; chmod +x *.sh; ./deploy-simple.sh"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉🎉🎉 部署成功完成！🎉🎉🎉" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🌐 API服务地址: http://82.157.231.110:3000" -ForegroundColor White
    Write-Host "🔍 健康检查: curl http://82.157.231.110:3000/health" -ForegroundColor White
    Write-Host "📊 服务状态: curl http://82.157.231.110:3000/status" -ForegroundColor White
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📱 可以开始测试小程序API连接了！" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ 部署失败，请检查服务器连接" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 部署完成！" -ForegroundColor Green 