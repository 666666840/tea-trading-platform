# 茶叶一点通 自动化部署脚本
param(
    [string]$ServerIP = "82.157.231.110"
)

Write-Host "🚀 茶叶一点通自动化部署开始..." -ForegroundColor Green
Write-Host "📍 目标服务器: $ServerIP" -ForegroundColor Yellow
Write-Host ""

# 检查必要文件
$requiredFiles = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
$missingFiles = @()

foreach ($file in $requiredFiles) {
    if (!(Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ 缺少以下文件:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "   - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "✅ 所有必要文件检查完成" -ForegroundColor Green

# 创建批量上传脚本
$uploadScript = @"
@echo off
echo 开始批量上传文件...
echo 请在每次提示时输入服务器密码

echo.
echo [1/5] 上传主API服务器 (server.py)
scp server.py root@${ServerIP}:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败: server.py
    pause
    exit /b 1
)

echo.
echo [2/5] 上传备用API服务器 (app.py)
scp app.py root@${ServerIP}:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败: app.py
    pause
    exit /b 1
)

echo.
echo [3/5] 上传依赖文件 (requirements.txt)
scp requirements.txt root@${ServerIP}:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败: requirements.txt
    pause
    exit /b 1
)

echo.
echo [4/5] 上传部署脚本 (deploy-simple.sh)
scp deploy-simple.sh root@${ServerIP}:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败: deploy-simple.sh
    pause
    exit /b 1
)

echo.
echo [5/5] 上传管理脚本 (server-manager.sh)
scp server-manager.sh root@${ServerIP}:/www/wwwroot/tea-api/
if %errorlevel% neq 0 (
    echo 上传失败: server-manager.sh
    pause
    exit /b 1
)

echo.
echo ✅ 所有文件上传完成!
echo.
echo 现在连接服务器执行部署...
echo 请输入服务器密码:

ssh root@${ServerIP} "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"

if %errorlevel% eq 0 (
    echo.
    echo ✅ 部署完成! 
    echo 🌐 API服务地址: http://${ServerIP}:3000
    echo 🔍 健康检查: curl http://${ServerIP}:3000/health
) else (
    echo.
    echo ❌ 部署过程中出现错误
)

pause
"@

$uploadScript | Out-File -FilePath "upload-deploy.bat" -Encoding ASCII

Write-Host "📄 已创建自动上传脚本: upload-deploy.bat" -ForegroundColor Green

# 创建PowerShell版本的上传脚本
$psUploadContent = @"
# PowerShell自动上传脚本
Write-Host "开始自动部署..." -ForegroundColor Green

`$files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
`$serverPath = "/www/wwwroot/tea-api/"
`$serverIP = "$ServerIP"

foreach (`$file in `$files) {
    Write-Host "上传: `$file" -ForegroundColor Yellow
    scp `$file "root@`$serverIP`:`$serverPath"
    if (`$LASTEXITCODE -ne 0) {
        Write-Host "上传失败: `$file" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ `$file 上传成功" -ForegroundColor Green
}

Write-Host "所有文件上传完成，开始部署..." -ForegroundColor Green
ssh "root@`$serverIP" "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"

if (`$LASTEXITCODE -eq 0) {
    Write-Host "🎉 部署成功完成!" -ForegroundColor Green
    Write-Host "API地址: http://`$serverIP`:3000" -ForegroundColor Cyan
} else {
    Write-Host "部署过程出现错误" -ForegroundColor Red
}
"@

$psUploadContent | Out-File -FilePath "upload-deploy.ps1" -Encoding UTF8

Write-Host "📄 已创建PowerShell上传脚本: upload-deploy.ps1" -ForegroundColor Green

# 显示操作选项
Write-Host ""
Write-Host "🎯 自动化部署选项:" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "选项1 - 批处理脚本 (推荐):" -ForegroundColor White
Write-Host "   .\upload-deploy.bat" -ForegroundColor Gray
Write-Host "   (会逐步提示输入密码，更清晰)" -ForegroundColor Gray
Write-Host ""
Write-Host "选项2 - PowerShell脚本:" -ForegroundColor White  
Write-Host "   .\upload-deploy.ps1" -ForegroundColor Gray
Write-Host "   (一次性执行，需要多次输入密码)" -ForegroundColor Gray
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan

$choice = Read-Host "请选择执行方式 (1/2)"

switch ($choice) {
    "1" {
        Write-Host "启动批处理脚本..." -ForegroundColor Yellow
        Start-Process -FilePath "upload-deploy.bat" -Wait
    }
    "2" {
        Write-Host "执行PowerShell脚本..." -ForegroundColor Yellow
        & ".\upload-deploy.ps1"
    }
    default {
        Write-Host "无效选择，请重新运行脚本" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 部署完成后，您可以测试API:" -ForegroundColor Green
Write-Host "curl http://$ServerIP:3000/health" -ForegroundColor White 