@echo off
chcp 65001 >nul
echo 🍃 茶叶一点通 - 快速Git上传
echo.

echo 📦 添加文件...
git add .

echo 💾 提交更改...
git commit -m "update: %date% %time% - 茶叶一点通功能更新"

echo 🚀 推送代码...
git push origin master

if %errorlevel% equ 0 (
    echo ✅ 上传成功！
) else (
    echo ❌ 上传失败，请检查网络和认证
)

echo.
pause 