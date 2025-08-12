# 茶叶平台管理后台启动脚本
Write-Host "正在启动茶叶平台管理后台..." -ForegroundColor Green

# 切换到admin_backend目录
Set-Location admin_backend

# 启动Flask应用
Write-Host "启动Flask应用..." -ForegroundColor Yellow
python -m app

# 如果出错，显示错误信息
if ($LASTEXITCODE -ne 0) {
    Write-Host "启动失败，错误代码: $LASTEXITCODE" -ForegroundColor Red
    Read-Host "按任意键退出"
} 