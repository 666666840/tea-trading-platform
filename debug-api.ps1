# Debug API Script
Write-Host "=== Testing All Content Types ===" -ForegroundColor Green

$types = @("recommend", "news", "art", "hot")

foreach ($type in $types) {
    Write-Host "`nTesting type: $type" -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=$type"
        Write-Host "Count: $($response.data.Count)" -ForegroundColor Cyan
        Write-Host "First title: $($response.data[0].title)" -ForegroundColor Cyan
        if ($response.data.Count -gt 1) {
            Write-Host "Second title: $($response.data[1].title)" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== Testing Process Info ===" -ForegroundColor Green
netstat -ano | findstr :3000 