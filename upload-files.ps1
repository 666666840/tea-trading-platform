# 文件上传脚本
# 使用方法：.\upload-files.ps1 -ServerIP "您的服务器IP"

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [string]$Username = "root",
    [string]$LocalPath = ".",
    [string]$RemotePath = "/home/tea-crawler"
)

Write-Host "开始上传文件到服务器..." -ForegroundColor Green

# 检查文件是否存在
$files = @(
    "smart-tea-crawler.js",
    "package.json", 
    "deploy.sh"
)

foreach ($file in $files) {
    if (Test-Path "$LocalPath\$file") {
        Write-Host "上传 $file..." -ForegroundColor Yellow
        
        # 使用scp上传
        $scpCommand = "scp `"$LocalPath\$file`" $Username@$ServerIP`:$RemotePath/"
        
        try {
            Invoke-Expression $scpCommand
            Write-Host "✓ $file 上传成功" -ForegroundColor Green
        } catch {
            Write-Host "✗ $file 上传失败: $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ 文件不存在: $file" -ForegroundColor Red
    }
}

Write-Host @"

文件上传完成！

接下来请在服务器上执行：

1. 连接服务器：
   ssh $Username@$ServerIP

2. 创建目录并移动文件：
   mkdir -p $RemotePath
   mv /home/*.js $RemotePath/
   mv /home/*.json $RemotePath/
   mv /home/*.sh $RemotePath/

3. 运行部署脚本：
   cd $RemotePath
   chmod +x deploy.sh
   ./deploy.sh

"@ -ForegroundColor Cyan 