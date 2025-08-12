@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🍃 茶叶批发平台 - 一键Git提交
echo ========================================
echo.

echo 📁 正在检查Git状态...
git status
echo.

echo 📝 正在创建.gitignore文件...
(
echo # 微信小程序相关
echo node_modules/
echo miniprogram_npm/
echo .idea/
echo .vscode/
echo.
echo # 日志文件
echo *.log
echo auto_scheduler.log
echo content_management.log
echo.
echo # 数据库文件
echo *.db
echo feedback_monitor.db
echo.
echo # 测试报告
echo 测试报告_*.json
echo.
echo # 临时文件
echo *.tmp
echo *.temp
echo .DS_Store
echo Thumbs.db
echo.
echo # Python相关
echo __pycache__/
echo *.pyc
echo *.pyo
echo *.pyd
echo .Python
echo env/
echo venv/
echo .venv/
echo.
echo # 可执行文件
echo *.exe
echo python-installer.exe
echo.
echo # 大文件
echo *.zip
echo *.rar
echo *.7z
) > .gitignore
echo ✅ .gitignore文件创建完成
echo.

echo 📦 正在添加文件到Git暂存区...
git add .
echo ✅ 文件添加完成
echo.

echo 💾 正在提交更改...
git commit -m "feat: 茶叶批发平台完整功能实现

## 主要更新
- 实现完整的茶叶批发平台功能
- 添加API服务器和内容自动更新系统
- 完善微信小程序所有页面功能
- 添加性能监控和数据分析功能
- 实现商户入驻和品牌管理功能
- 添加全国市场数据和品类行情功能

## 技术特性
- Flask API服务器 (server.py)
- 内容自动更新机制
- 微信小程序完整UI
- 数据库监控系统
- 自动化部署脚本

## 文件结构
- pages/: 小程序页面
- utils/: 工具函数
- ec-canvas/: ECharts组件
- 各种自动化脚本和配置文件"
echo ✅ 提交完成
echo.

echo 🚀 正在推送到远程仓库...
git push origin main
echo ✅ 推送完成
echo.

echo 🎉 Git提交成功！
echo.
echo �� 提交信息：
echo    • 茶叶批发平台完整功能实现
echo    • 包含API服务器和内容自动更新
echo    • 微信小程序所有页面功能
echo    • 性能监控和数据分析功能
echo    • 商户入驻和品牌管理功能
echo    • 全国市场数据和品类行情功能
echo.

echo �� 提示：
echo    • 如果推送失败，请检查远程仓库配置
echo    • 可以使用 'git log --oneline -5' 查看提交历史
echo    • 可以使用 'git status' 检查当前状态
echo.

pause