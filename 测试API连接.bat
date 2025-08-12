@echo off
chcp 65001 >nul
echo 🔍 茶叶批发平台 API 连接测试
echo ==============================

echo.
echo 📡 正在测试API连接...

:: 使用PowerShell测试API连接
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/health' -TimeoutSec 5; Write-Host '✅ API连接成功!' -ForegroundColor Green; Write-Host ('📊 状态: ' + $response.status) -ForegroundColor Yellow; Write-Host ('💬 消息: ' + $response.message) -ForegroundColor Cyan } catch { Write-Host '❌ API连接失败' -ForegroundColor Red; Write-Host '💡 提示：请先运行 启动API服务.bat' -ForegroundColor Yellow }"

echo.
echo 🛠️ API离线问题解决方案:
echo ============================
echo 1️⃣ 双击运行: 启动API服务.bat
echo 2️⃣ 在微信开发者工具中:
echo    详情 → 本地设置 → 勾选"不校验合法域名"
echo 3️⃣ 如果仍无法连接，检查防火墙设置
echo 4️⃣ 降级方案：小程序已内置离线数据

echo.
pause 