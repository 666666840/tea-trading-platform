Write-Host "茶叶一点通API快速部署开始" -ForegroundColor Green

# 使用echo自动输入密码的方法
$password = "58WZRpXt6sPJmsyR"

Write-Host "准备上传文件..." -ForegroundColor Yellow

# 创建临时expect脚本
$expectContent = @"
#!/usr/bin/expect -f
set timeout 30

# 上传 server.py
spawn scp server.py root@82.157.231.110:/www/wwwroot/tea-api/
expect "password:"
send "$password\r"
expect eof

# 上传 app.py
spawn scp app.py root@82.157.231.110:/www/wwwroot/tea-api/
expect "password:"
send "$password\r"
expect eof

# 上传 requirements.txt
spawn scp requirements.txt root@82.157.231.110:/www/wwwroot/tea-api/
expect "password:"
send "$password\r"
expect eof

# 上传 deploy-simple.sh
spawn scp deploy-simple.sh root@82.157.231.110:/www/wwwroot/tea-api/
expect "password:"
send "$password\r"
expect eof

# 上传 server-manager.sh
spawn scp server-manager.sh root@82.157.231.110:/www/wwwroot/tea-api/
expect "password:"
send "$password\r"
expect eof

# 执行部署
spawn ssh root@82.157.231.110 "cd /www/wwwroot/tea-api; chmod +x *.sh; ./deploy-simple.sh"
expect "password:"
send "$password\r"
expect eof

puts "部署完成！"
"@

# 保存expect脚本
$expectContent | Out-File -FilePath "upload.exp" -Encoding ASCII

# 检查是否有bash或wsl
if (Get-Command wsl -ErrorAction SilentlyContinue) {
    Write-Host "使用WSL执行自动化上传..." -ForegroundColor Cyan
    wsl bash -c "chmod +x upload.exp && expect upload.exp"
} elseif (Get-Command bash -ErrorAction SilentlyContinue) {
    Write-Host "使用bash执行自动化上传..." -ForegroundColor Cyan
    bash -c "chmod +x upload.exp && expect upload.exp"
} else {
    Write-Host "使用PowerShell方式..." -ForegroundColor Yellow
    
    # 简单逐个上传文件的方法
    $files = @("server.py", "app.py", "requirements.txt", "deploy-simple.sh", "server-manager.sh")
    
    foreach ($file in $files) {
        Write-Host "上传 $file..." -ForegroundColor Cyan
        
        # 使用echo方式传递密码
        $command = "echo $password | scp $file root@82.157.231.110:/www/wwwroot/tea-api/"
        Invoke-Expression $command
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "SUCCESS: $file" -ForegroundColor Green
        }
    }
    
    Write-Host "执行部署..." -ForegroundColor Yellow
    $deployCmd = "echo $password | ssh root@82.157.231.110 'cd /www/wwwroot/tea-api; chmod +x *.sh; ./deploy-simple.sh'"
    Invoke-Expression $deployCmd
}

# 清理临时文件
Remove-Item "upload.exp" -ErrorAction SilentlyContinue

Write-Host "部署完成！API地址: http://82.157.231.110:3000" -ForegroundColor Green 