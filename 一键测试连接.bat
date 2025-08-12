@echo off
chcp 65001 >nul
echo.
echo ==========================================
echo          🧪 API连接测试工具
echo ==========================================
echo.

echo 📡 正在测试本地API连接...
echo.

echo 🔍 测试健康检查接口...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/health' -UseBasicParsing -TimeoutSec 5; Write-Host '✅ 健康检查: 成功 (' $response.StatusCode ')' -ForegroundColor Green } catch { Write-Host '❌ 健康检查: 失败' -ForegroundColor Red; Write-Host $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo 🔍 测试内容接口...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/content?type=recommend' -UseBasicParsing -TimeoutSec 5; Write-Host '✅ 内容接口: 成功 (' $response.StatusCode ')' -ForegroundColor Green } catch { Write-Host '❌ 内容接口: 失败' -ForegroundColor Red; Write-Host $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo 🔍 测试市场接口...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/markets' -UseBasicParsing -TimeoutSec 5; Write-Host '✅ 市场接口: 成功 (' $response.StatusCode ')' -ForegroundColor Green } catch { Write-Host '❌ 市场接口: 失败' -ForegroundColor Red; Write-Host $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo 🔍 测试新品接口...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/newarrivals' -UseBasicParsing -TimeoutSec 5; Write-Host '✅ 新品接口: 成功 (' $response.StatusCode ')' -ForegroundColor Green } catch { Write-Host '❌ 新品接口: 失败' -ForegroundColor Red; Write-Host $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo 🔍 测试供求接口...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/supplies' -UseBasicParsing -TimeoutSec 5; Write-Host '✅ 供求接口: 成功 (' $response.StatusCode ')' -ForegroundColor Green } catch { Write-Host '❌ 供求接口: 失败' -ForegroundColor Red; Write-Host $_.Exception.Message -ForegroundColor Yellow }"

echo.
echo ==========================================
echo 💡 如果所有接口都显示 "✅ 成功"，说明：
echo    1. 本地服务器运行正常
echo    2. API接口配置正确
echo    3. 可以正常使用小程序
echo.
echo 📱 接下来请在微信开发者工具中：
echo    → 详情 → 本地设置 → 勾选"不校验合法域名"
echo    → 点击"编译"重新编译小程序
echo ==========================================
echo.
pause 