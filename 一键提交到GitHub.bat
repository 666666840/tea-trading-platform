@echo off
chcp 65001 >nul
echo ========================================
echo 🍃 一键提交并推送到GitHub
set /p msg="请输入本次提交说明: "
echo.
git add .
git commit -m "%msg%"
git push origin master
echo.
echo ✅ 已全部推送到GitHub！
pause 