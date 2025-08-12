$response = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=recommend"
Write-Host "Recommend Count: $($response.data.Count)"
Write-Host "Titles:"
foreach ($item in $response.data) {
    Write-Host "- $($item.title)"
} 