# Simple API Test Script
Write-Host "Testing Tea API Service..." -ForegroundColor Green

# Test health check
Write-Host "`n1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://82.157.231.110:3000/health"
    Write-Host "Health check success: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test recommend content
Write-Host "`n2. Testing recommend content..." -ForegroundColor Yellow
try {
    $recommend = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=recommend"
    Write-Host "Recommend content success, count: $($recommend.data.Count)" -ForegroundColor Green
    Write-Host "First title: $($recommend.data[0].title)" -ForegroundColor Cyan
} catch {
    Write-Host "Recommend content failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test news content
Write-Host "`n3. Testing news content..." -ForegroundColor Yellow
try {
    $news = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=news"
    Write-Host "News content success, count: $($news.data.Count)" -ForegroundColor Green
    Write-Host "First title: $($news.data[0].title)" -ForegroundColor Cyan
} catch {
    Write-Host "News content failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test art content
Write-Host "`n4. Testing art content..." -ForegroundColor Yellow
try {
    $art = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=art"
    Write-Host "Art content success, count: $($art.data.Count)" -ForegroundColor Green
    Write-Host "First title: $($art.data[0].title)" -ForegroundColor Cyan
} catch {
    Write-Host "Art content failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test hot content
Write-Host "`n5. Testing hot content..." -ForegroundColor Yellow
try {
    $hot = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=hot"
    Write-Host "Hot content success, count: $($hot.data.Count)" -ForegroundColor Green
    Write-Host "First title: $($hot.data[0].title)" -ForegroundColor Cyan
} catch {
    Write-Host "Hot content failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Test Complete!" -ForegroundColor Green
Write-Host "You can now run your mini-program in WeChat Developer Tools!" -ForegroundColor Yellow 