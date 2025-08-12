@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🍃 茶叶批发平台 - GitHub仓库配置
echo ========================================
echo.

echo 📋 当前项目信息：
echo    • 小程序AppID: wx61ef1f011815b7da
echo    • 项目名称: 茶叶一点通
echo    • 页面数量: 50+ 页面
echo.

echo 📁 检查Git状态...
git status
echo.

echo 🔗 检查远程仓库配置...
git remote -v
echo.

echo 📝 请选择配置方案：
echo    1. 使用现有GitHub仓库（推荐）
echo    2. 创建新的GitHub仓库
echo.

set /p choice="请输入选择 (1 或 2): "

if "%choice%"=="1" goto :existing_repo
if "%choice%"=="2" goto :new_repo
echo ❌ 无效选择，请重新运行脚本
pause
exit /b 1

:existing_repo
echo.
echo 🎯 方案一：使用现有GitHub仓库
echo.
set /p repo_url="请输入现有仓库的URL (例如: https://github.com/用户名/tea-miniprogram.git): "

echo.
echo 🔗 配置远程仓库...
git remote remove origin 2>nul
git remote add origin %repo_url%
echo ✅ 远程仓库配置完成
echo.

echo 📦 添加所有文件...
git add .
echo ✅ 文件添加完成
echo.

echo 💾 提交更改...
git commit -m "feat: 茶叶批发平台小程序 - 重新配置项目

## 主要更新
- 重新配置微信小程序项目
- 更新项目配置和依赖
- 完善小程序功能模块
- 优化代码结构和性能

## 技术特性
- 微信小程序原生开发
- 完整的茶叶批发平台功能
- 响应式UI设计
- 模块化代码结构

## 文件结构
- pages/: 50+ 小程序页面
- utils/: 工具函数和配置
- ec-canvas/: ECharts图表组件
- 各种自动化脚本和文档"
echo ✅ 提交完成
echo.

echo 🚀 推送到GitHub...
git push -u origin main
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 🎉 GitHub仓库配置成功！
    echo 📍 请访问您的GitHub仓库查看最新代码
) else (
    echo ❌ 推送失败
    echo 💡 请检查：
    echo    • GitHub远程仓库地址是否正确
    echo    • 网络连接是否正常
    echo    • GitHub认证是否有效
)
echo.
pause
exit /b 0

:new_repo
echo.
echo 🎯 方案二：创建新的GitHub仓库
echo.
echo 📝 请先在GitHub上创建新仓库：
echo 📍 访问：https://github.com/new
echo 💡 建议仓库名称：tea-miniprogram-v2 或 tea-platform-new
echo.

set /p repo_url="请输入新仓库的URL: "

echo.
echo 🔗 配置新的远程仓库...
git remote remove origin 2>nul
git remote add origin %repo_url%
echo ✅ 新远程仓库配置完成
echo.

echo 📦 添加所有文件...
git add .
echo ✅ 文件添加完成
echo.

echo 💾 提交更改...
git commit -m "feat: 茶叶批发平台小程序 v2.0

## 项目概述
- 全新的茶叶批发平台微信小程序
- 基于微信小程序原生开发框架
- 完整的茶叶交易功能模块

## 主要功能
- 全国茶叶市场信息
- 采购询价系统
- 品类行情展示
- 品牌货管理
- 尾货清仓功能
- 最新到货信息
- 茶园直通服务
- 出租转让平台
- 供求信息发布
- 智慧茶业服务

## 技术特性
- 微信小程序原生开发
- 响应式UI设计
- 模块化代码结构
- 完整的页面路由
- 底部导航栏
- 统一的样式主题

## 文件结构
- pages/: 50+ 小程序页面
- utils/: 工具函数和配置
- ec-canvas/: ECharts图表组件
- 各种自动化脚本和文档"
echo ✅ 提交完成
echo.

echo 🚀 推送到新GitHub仓库...
git push -u origin main
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 🎉 新GitHub仓库配置成功！
    echo 📍 请访问您的新GitHub仓库查看代码
) else (
    echo ❌ 推送失败
    echo 💡 请检查：
    echo    • 新仓库是否已创建
    echo    • 仓库URL是否正确
    echo    • GitHub认证是否有效
)
echo.
pause
exit /b 0 