# 重启茶叶API服务脚本
Write-Host "正在连接服务器并重启API服务..."

# SSH连接并重启服务
$commands = @(
    "cd /www/wwwroot/tea-api",
    "pkill -f 'python app.py'",
    "nohup python app.py > server.log 2>&1 &",
    "sleep 2",
    "ps aux | grep 'python app.py' | grep -v grep"
)

foreach ($cmd in $commands) {
    Write-Host "执行: $cmd"
    ssh root@82.157.231.110 $cmd
}

Write-Host "等待5秒后测试服务..."
Start-Sleep -Seconds 5

# 测试服务
Write-Host "测试API健康检查..."
try {
    $response = Invoke-WebRequest -Uri "http://82.157.231.110:3000/health" -TimeoutSec 10
    Write-Host "✅ 服务启动成功！状态码: $($response.StatusCode)"
    Write-Host "响应内容: $($response.Content)"
} catch {
    Write-Host "❌ 服务启动失败: $($_.Exception.Message)"
} 