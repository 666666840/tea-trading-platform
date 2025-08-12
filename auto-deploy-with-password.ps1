# 茶叶一点通自动部署脚本（含密码）
param(
    [string]$ServerIP = "82.157.231.110",
    [string]$Password = "58WZRpXt6sPJmsyR"
)

Write-Host "🚀 开始自动部署（免交互模式）..." -ForegroundColor Green
Write-Host "📍 服务器: $ServerIP" -ForegroundColor Yellow

# 检查文件
$files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        Write-Host "❌ 文件不存在: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 文件检查完成" -ForegroundColor Green

# 创建临时期望脚本用于自动输入密码
$expectScript = @"
#!/usr/bin/expect -f
set timeout 30
set password "$Password"

# 上传文件
foreach file {server.py app.py requirements.txt deploy-simple.sh server-manager.sh} {
    puts "Uploading `$file..."
    spawn scp `$file root@$ServerIP:/www/wwwroot/tea-api/
    expect "password:"
    send "`$password\r"
    expect eof
    puts "✅ `$file uploaded"
}

# 执行部署
puts "Starting deployment..."
spawn ssh root@$ServerIP "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"
expect "password:"
send "`$password\r"
expect eof

puts "🎉 Deployment completed!"
"@

$expectScript | Out-File -FilePath "auto-deploy.exp" -Encoding UTF8

# 检查是否有expect命令
if (Get-Command expect -ErrorAction SilentlyContinue) {
    Write-Host "使用expect脚本自动部署..." -ForegroundColor Yellow
    bash auto-deploy.exp
} else {
    # 使用PowerShell的另一种方法
    Write-Host "使用PowerShell自动部署..." -ForegroundColor Yellow
    
    # 创建安全字符串
    $secPassword = ConvertTo-SecureString $Password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ("root", $secPassword)
    
    # 尝试使用plink（如果可用）
    if (Get-Command plink -ErrorAction SilentlyContinue) {
        Write-Host "使用plink进行文件传输..." -ForegroundColor Cyan
        
        foreach ($file in $files) {
            Write-Host "上传 $file..." -ForegroundColor Yellow
            $command = "echo y | plink -ssh -pw $Password root@$ServerIP exit"
            Invoke-Expression $command
            
            $scpCommand = "pscp -pw $Password $file root@${ServerIP}:/www/wwwroot/tea-api/"
            Invoke-Expression $scpCommand
            Write-Host "✅ $file 上传完成" -ForegroundColor Green
        }
        
        # 执行部署
        Write-Host "执行远程部署..." -ForegroundColor Yellow
        $deployCmd = "plink -ssh -pw $Password root@$ServerIP `"cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh`""
        Invoke-Expression $deployCmd
        
    } else {
        # 回退到手动方法
        Write-Host "⚠️ 未找到自动化工具，请手动执行以下操作：" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. 在密码提示时输入: $Password" -ForegroundColor Cyan
        Write-Host "2. 或者安装PuTTY工具包以支持自动化" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "现在启动手动上传..." -ForegroundColor Yellow
        
        foreach ($file in $files) {
            Write-Host "上传 $file (密码: $Password)..." -ForegroundColor Cyan
            scp $file "root@${ServerIP}:/www/wwwroot/tea-api/"
        }
        
        Write-Host "执行部署 (密码: $Password)..." -ForegroundColor Cyan
        ssh "root@$ServerIP" "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 部署成功完成！" -ForegroundColor Green
    Write-Host "🌐 API地址: http://$ServerIP:3000" -ForegroundColor Cyan
    Write-Host "🔍 测试命令: curl http://$ServerIP:3000/health" -ForegroundColor Cyan
} else {
    Write-Host "❌ 部署过程出现错误" -ForegroundColor Red
}

# 清理临时文件
Remove-Item "auto-deploy.exp" -ErrorAction SilentlyContinue

Write-Host "🎯 脚本执行完成！" -ForegroundColor Green 