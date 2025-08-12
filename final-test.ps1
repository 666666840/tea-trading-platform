# 最终API测试和小程序指导
Write-Host "=== 茶叶小程序API状态检查 ===" -ForegroundColor Green

# 测试API服务器
Write-Host "`n1. 测试API服务器连接..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://82.157.231.110:3000/health"
    Write-Host "✅ API服务器正常: $($health.message)" -ForegroundColor Green
    
    # 测试推荐内容
    $recommend = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=recommend"
    Write-Host "✅ 推荐内容: $($recommend.data.Count)条" -ForegroundColor Green
    
    # 测试其他内容
    $news = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=news"
    Write-Host "✅ 茶叶资讯: $($news.data.Count)条" -ForegroundColor Green
    
    $art = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=art"
    Write-Host "✅ 茶艺文化: $($art.data.Count)条" -ForegroundColor Green
    
    $hot = Invoke-RestMethod -Uri "http://82.157.231.110:3000/api/content?type=hot"
    Write-Host "✅ 热点话题: $($hot.data.Count)条" -ForegroundColor Green
    
    Write-Host "`n📱 API服务器工作正常！" -ForegroundColor Green
    
} catch {
    Write-Host "❌ API连接失败，将使用本地模式" -ForegroundColor Yellow
}

Write-Host "`n=== 小程序启动指南 ===" -ForegroundColor Cyan
Write-Host "1. 打开微信开发者工具" -ForegroundColor White
Write-Host "2. 导入项目，选择当前目录" -ForegroundColor White
Write-Host "3. 在开发工具中：详情 → 本地设置 → 勾选'不校验合法域名'" -ForegroundColor White
Write-Host "4. 编译运行小程序" -ForegroundColor White
Write-Host "5. 点击首页的'🔧 测试API连接'按钮进行测试" -ForegroundColor White

Write-Host "`n=== 功能说明 ===" -ForegroundColor Cyan
Write-Host "📚 推荐分栏：精选茶叶产品推荐" -ForegroundColor White
Write-Host "📰 茶讯分栏：茶叶行业资讯动态" -ForegroundColor White
Write-Host "🎨 茶艺分栏：茶艺文化和冲泡技巧" -ForegroundColor White
Write-Host "🔥 热点分栏：茶叶市场热点话题" -ForegroundColor White

Write-Host "`n✨ 小程序已完善，包含：" -ForegroundColor Green
Write-Host "• 四个内容分栏，每个都有丰富内容" -ForegroundColor Green
Write-Host "• 智能API连接和降级机制" -ForegroundColor Green
Write-Host "• 完整的内容详情页面" -ForegroundColor Green
Write-Host "• 在线/离线模式自动切换" -ForegroundColor Green
Write-Host "• 用户友好的错误处理" -ForegroundColor Green

Write-Host "`n🎉 现在可以开始使用您的茶叶批发小程序了！" -ForegroundColor Green 