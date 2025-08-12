# 服务器连接脚本
# 使用方法：.\connect-server.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [Parameter(Mandatory=$true)]
    [string]$Username = "root"
)

Write-Host "正在连接服务器: $ServerIP" -ForegroundColor Green

# 检查SSH客户端
if (Get-Command ssh -ErrorAction SilentlyContinue) {
    Write-Host "使用内置SSH客户端连接..." -ForegroundColor Yellow
    ssh $Username@$ServerIP
} else {
    Write-Host "未检测到SSH客户端，请安装OpenSSH或使用PuTTY" -ForegroundColor Red
    Write-Host "安装OpenSSH命令: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor Yellow
}

# 连接成功后的提示
Write-Host @"

连接成功后，请执行以下命令：

1. 更新系统：
   yum update -y

2. 安装基础工具：
   yum install -y wget curl git vim unzip

3. 上传项目文件：
   # 在本地执行
   scp smart-tea-crawler.js root@$ServerIP:/home/
   scp package.json root@$ServerIP:/home/
   scp deploy.sh root@$ServerIP:/home/

4. 运行部署脚本：
   chmod +x deploy.sh
   ./deploy.sh

"@ -ForegroundColor Cyan 