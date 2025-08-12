# 茶叶一点通简化自动部署脚本
param(
    [string]$ServerIP = "82.157.231.110",
    [string]$Password = "58WZRpXt6sPJmsyR"
)

Write-Host "🚀 开始茶叶一点通API自动部署..." -ForegroundColor Green
Write-Host "📍 服务器: $ServerIP" -ForegroundColor Yellow
Write-Host ""

# 检查必要文件
$requiredFiles = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
Write-Host "📋 检查必要文件..." -ForegroundColor Cyan

foreach ($file in $requiredFiles) {
    if (!(Test-Path $file)) {
        Write-Host "❌ 缺少文件: $file" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✅ $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📤 开始上传文件到服务器..." -ForegroundColor Yellow

# 使用sshpass或者expect脚本（如果可用）
$expectAvailable = $false
try {
    $null = Get-Command wsl -ErrorAction Stop
    $expectAvailable = $true
    Write-Host "✅ 检测到WSL，将使用Linux工具进行自动化部署" -ForegroundColor Green
} catch {
    Write-Host "⚠️ 未检测到WSL，将使用手动密码输入方式" -ForegroundColor Yellow
}

if ($expectAvailable) {
    # 使用WSL中的expect进行自动化
    Write-Host "🔧 准备WSL自动化脚本..." -ForegroundColor Cyan
    
    # 创建expect脚本
    $expectScript = @"
#!/usr/bin/expect -f
set timeout 30
set password "$Password"

# 上传所有文件
foreach file {server.py app.py requirements.txt deploy-simple.sh server-manager.sh} {
    puts "上传文件: `$file"
         spawn scp `$file root@${ServerIP}:/www/wwwroot/tea-api/
    expect {
        "password:" {
            send "`$password\r"
            exp_continue
        }
        "yes/no" {
            send "yes\r"
            exp_continue
        }
        eof
    }
    puts "✅ `$file 上传完成"
}

# 执行部署
puts "开始执行服务器部署..."
spawn ssh root@${ServerIP} "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"
expect {
    "password:" {
        send "`$password\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}

puts "🎉 部署完成！"
"@

    $expectScript | Out-File -FilePath "deploy.exp" -Encoding ASCII
    
    # 通过WSL运行expect脚本
    Write-Host "🚀 启动自动化部署..." -ForegroundColor Green
    wsl bash -c "chmod +x deploy.exp && expect deploy.exp"
    
    # 清理临时文件
    Remove-Item "deploy.exp" -ErrorAction SilentlyContinue
    
} else {
    # 手动方式，提供清晰的指引
    Write-Host "📋 手动部署模式 - 请按提示输入密码" -ForegroundColor Yellow
    Write-Host "🔐 服务器密码: $Password" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $requiredFiles) {
        Write-Host "上传 $file (输入密码: $Password)..." -ForegroundColor Yellow
        scp $file "root@${ServerIP}:/www/wwwroot/tea-api/"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $file 上传成功" -ForegroundColor Green
        } else {
            Write-Host "❌ $file 上传失败" -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host ""
    Write-Host "🚀 执行服务器部署 (输入密码: $Password)..." -ForegroundColor Yellow
    ssh "root@$ServerIP" "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 部署成功完成！" -ForegroundColor Green
    Write-Host "===========================================" -ForegroundColor Cyan
    Write-Host "🌐 API服务地址: http://$ServerIP:3000" -ForegroundColor White
    Write-Host "🔍 健康检查: curl http://$ServerIP:3000/health" -ForegroundColor White  
    Write-Host "📊 服务状态: curl http://$ServerIP:3000/status" -ForegroundColor White
    Write-Host "===========================================" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ 部署失败，请检查网络连接和服务器状态" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 部署脚本执行完成！" -ForegroundColor Green 