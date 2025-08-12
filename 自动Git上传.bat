@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🍃 茶叶一点通 - 自动Git上传
echo ========================================
echo.

echo 📁 检查Git状态...
git status
echo.

echo 🔍 检查当前分支...
git branch
echo.

echo 🔗 检查远程仓库配置...
git remote -v
echo.

echo 📦 添加所有文件到暂存区...
git add .
echo ✅ 文件添加完成
echo.

echo 💾 提交更改...
git commit -m "feat: 茶叶一点通功能更新 - %date% %time%

## 主要更新
- 实时功能模块完善 (realtime_modules.py)
- 数据统计和分析功能优化
- 内容管理系统增强
- 高级搜索功能完善
- 用户系统和管理后台优化
- 性能监控和内存优化

## 技术特性
- Flask API服务器 (server.py)
- 实时WebSocket功能
- 数据统计分析系统
- 内容管理系统
- 微信小程序完整UI (50+ 页面)
- 管理后台系统

## 文件结构
- pages/: 50+ 小程序页面
- utils/: 工具函数和配置
- ec-canvas/: ECharts图表组件
- admin_backend/: 管理后台系统
- 各种自动化脚本和文档"
echo ✅ 提交完成
echo.

echo 🚀 推送到远程仓库...
echo 当前分支: master
git push origin master
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 🎉 Git上传完成！
    echo.
    echo 📊 提交信息：
    echo    • 茶叶一点通功能更新
    echo    • 实时功能模块完善
    echo    • 数据统计和分析功能
    echo    • 内容管理系统
    echo    • 高级搜索功能
    echo    • 用户系统和管理后台
    echo.
    echo 🔗 相关链接：
    echo    • GitHub仓库: https://github.com/666666840/-tea-miniprogram
    echo    • 项目文档: README.md
    echo.
) else (
    echo ❌ 推送失败
    echo.
    echo 🔧 尝试解决方案：
    echo    1. 检查网络连接
    echo    2. 检查GitHub认证
    echo    3. 检查远程仓库配置
    echo.
    echo 💡 手动解决命令：
    echo    git remote -v
    echo    git push -u origin master
    echo.
)
echo.

echo 📝 提示：
echo    • 使用 'git log --oneline -5' 查看提交历史
echo    • 使用 'git status' 检查当前状态
echo    • 使用 'git branch' 查看分支信息
echo.

pause 