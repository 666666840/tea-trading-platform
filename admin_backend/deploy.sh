#!/bin/bash
set -e

# 1. 安装依赖
pip3 install -r requirements.txt

# 2. 启动Flask服务（使用gunicorn）
nohup gunicorn -w 4 -b 0.0.0.0:5000 app:app > backend.log 2>&1 &

echo "后端已启动，监听5000端口" 