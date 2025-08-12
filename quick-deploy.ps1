# 茶叶一点通快速部署脚本
param(
    [string]$ServerIP = "82.157.231.110"
)

Write-Host "🚀 开始快速部署茶叶一点通API..." -ForegroundColor Green
Write-Host "📍 服务器: $ServerIP" -ForegroundColor Yellow
Write-Host ""

# 检查文件
$files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        Write-Host "❌ 文件不存在: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 文件检查完成" -ForegroundColor Green
Write-Host ""

Write-Host "📤 开始上传文件 (需要输入服务器密码)..." -ForegroundColor Yellow

# 逐个上传文件
$index = 1
foreach ($file in $files) {
    Write-Host "[$index/$($files.Count)] 上传 $file..." -ForegroundColor Cyan
    $result = scp $file "root@${ServerIP}:/www/wwwroot/tea-api/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $file 上传成功" -ForegroundColor Green
    } else {
        Write-Host "❌ $file 上传失败" -ForegroundColor Red
        exit 1
    }
    $index++
}

Write-Host ""
Write-Host "🚀 开始服务器部署..." -ForegroundColor Yellow

# 执行远程部署命令
$deployCommand = "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"
ssh "root@$ServerIP" $deployCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 部署成功完成!" -ForegroundColor Green
    Write-Host "🌐 API服务地址: http://$ServerIP:3000" -ForegroundColor Cyan
    Write-Host "🔍 健康检查: curl http://$ServerIP:3000/health" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 管理命令 (在服务器上执行):" -ForegroundColor Yellow
    Write-Host "   ./server-manager.sh status   # 查看状态"
    Write-Host "   ./server-manager.sh logs     # 查看日志"
    Write-Host "   ./server-manager.sh monitor  # 实时监控"
} else {
    Write-Host ""
    Write-Host "❌ 部署过程出现错误" -ForegroundColor Red
    Write-Host "请检查服务器连接和权限设置" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 部署脚本执行完成!" -ForegroundColor Green 