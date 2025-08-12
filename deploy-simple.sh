#!/bin/bash
# 茶叶一点通 API服务器部署脚本

echo "开始部署茶叶一点通API服务器..."

# 项目目录
PROJECT_DIR="/www/wwwroot/tea-api"

echo "创建项目目录: $PROJECT_DIR"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 检查Python
if ! command -v python3 &> /dev/null; then
    echo "安装Python3..."
    if [[ -f /etc/redhat-release ]]; then
        yum update -y
        yum install -y python3 python3-pip
    else
        apt update
        apt install -y python3 python3-pip
    fi
fi

# 安装依赖
echo "安装Python依赖..."
python3 -m pip install flask flask-cors requests

# 停止现有服务
echo "停止现有API服务..."
pkill -f "python.*server.py" 2>/dev/null || true
pkill -f "python.*app.py" 2>/dev/null || true

# 启动新服务
echo "启动API服务器..."
nohup python3 server.py > api.log 2>&1 &
sleep 3

# 检查服务状态
if pgrep -f "python.*server.py" > /dev/null; then
    echo "✅ API服务器启动成功"
    echo "🌐 服务地址: http://$(curl -s ifconfig.me):3000"
    echo "🔍 健康检查: curl http://localhost:3000/health"
    echo "📋 查看日志: tail -f $PROJECT_DIR/api.log"
else
    echo "❌ API服务器启动失败"
    echo "查看错误日志: cat $PROJECT_DIR/api.log"
fi

echo ""
echo "🔧 管理命令:"
echo "查看状态: ps aux | grep python.*server.py"
echo "查看端口: netstat -tlnp | grep :3000"
echo "重启服务: pkill -f python.*server.py && nohup python3 server.py > api.log 2>&1 &"
echo "查看日志: tail -f api.log" 