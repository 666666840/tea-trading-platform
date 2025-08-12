@echo off
chcp 65001 >nul
echo.
echo ==========================================
echo      🎯 茶叶平台内容管理自动化体验
echo ==========================================
echo.

echo 🎉 欢迎体验茶叶平台三大内容管理功能：
echo    1️⃣ 定期优化：每周使用优化工具检查内容质量
echo    2️⃣ 持续更新：建立每日内容更新机制
echo    3️⃣ 监控效果：跟踪用户反馈和使用数据
echo.

echo 🚀 正在启动内容管理自动化中心...
echo.

python 内容管理自动化中心.py --manual

echo.
echo ==========================================
echo 📊 体验完成！查看生成的报告文件：
echo    → weekly_content_report_*.md (质量检查报告)
echo    → daily_update_report_*.md (更新报告)  
echo    → user_monitoring_report_*.md (监控报告)
echo    → content_management.log (执行日志)
echo ==========================================
echo.

echo 💡 想要了解更多功能？运行：
echo    python 内容管理自动化中心.py --summary
echo.

pause 