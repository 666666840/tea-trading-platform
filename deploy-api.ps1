# 茶叶一点通 API部署脚本
# 用于部署最新的扩展API服务器

param(
    [string]$ServerIP = "82.157.231.110",
    [string]$Username = "root",
    [string]$ProjectPath = "/www/wwwroot/tea-api"
)

Write-Host "🚀 开始部署茶叶一点通API服务器..." -ForegroundColor Green
Write-Host "📍 目标服务器: $ServerIP" -ForegroundColor Yellow
Write-Host "📁 部署路径: $ProjectPath" -ForegroundColor Yellow
Write-Host ""

# 检查本地文件
$requiredFiles = @("server.py", "app.py")
foreach ($file in $requiredFiles) {
    if (!(Test-Path $file)) {
        Write-Host "❌ 缺少必要文件: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 本地文件检查完成" -ForegroundColor Green

# 创建requirements.txt
$requirementsContent = @"
Flask==2.3.3
Flask-CORS==4.0.0
requests==2.31.0
"@

$requirementsContent | Out-File -FilePath "requirements.txt" -Encoding utf8
Write-Host "📄 已创建 requirements.txt" -ForegroundColor Green

# 创建部署脚本内容
$deployScriptContent = @'
#!/bin/bash
# 茶叶一点通 API服务器部署脚本

echo "🚀 开始部署茶叶一点通API服务器..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 项目目录
PROJECT_DIR="/www/wwwroot/tea-api"

log_info "创建项目目录: $PROJECT_DIR"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 检查Python
if ! command -v python3 &> /dev/null; then
    log_info "安装Python3..."
    if [[ -f /etc/redhat-release ]]; then
        yum update -y
        yum install -y python3 python3-pip
    else
        apt update
        apt install -y python3 python3-pip
    fi
fi

# 安装依赖
log_info "安装Python依赖..."
pip3 install flask flask-cors requests

# 停止现有服务
log_info "停止现有API服务..."
pkill -f "python.*server.py" || true
pkill -f "python.*app.py" || true

# 启动新服务
log_info "启动API服务器..."
nohup python3 server.py > api.log 2>&1 &
sleep 2

# 检查服务状态
if pgrep -f "python.*server.py" > /dev/null; then
    log_info "✅ API服务器启动成功"
    echo "🌐 服务地址: http://$(curl -s ifconfig.me):3000"
    echo "🔍 健康检查: curl http://localhost:3000/health"
    echo "📋 查看日志: tail -f $PROJECT_DIR/api.log"
else
    log_error "❌ API服务器启动失败"
    echo "查看错误日志: cat $PROJECT_DIR/api.log"
fi

echo ""
echo "🔧 管理命令:"
echo "查看状态: ps aux | grep python.*server.py"
echo "查看端口: netstat -tlnp | grep :3000"
echo "重启服务: pkill -f python.*server.py && nohup python3 server.py > api.log 2>&1 &"
echo "查看日志: tail -f api.log"
'@

$deployScriptContent | Out-File -FilePath "deploy-server.sh" -Encoding utf8
Write-Host "📄 已创建 deploy-server.sh" -ForegroundColor Green

# 提示用户操作
Write-Host ""
Write-Host "📋 下一步操作指南:" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣ 上传文件到服务器:" -ForegroundColor White
Write-Host "   scp server.py root@${ServerIP}:${ProjectPath}/" -ForegroundColor Gray
Write-Host "   scp app.py root@${ServerIP}:${ProjectPath}/" -ForegroundColor Gray
Write-Host "   scp requirements.txt root@${ServerIP}:${ProjectPath}/" -ForegroundColor Gray
Write-Host "   scp deploy-server.sh root@${ServerIP}:${ProjectPath}/" -ForegroundColor Gray
Write-Host "   scp server-manager.sh root@${ServerIP}:${ProjectPath}/" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣ 连接服务器:" -ForegroundColor White
Write-Host "   ssh root@$ServerIP" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣ 执行部署:" -ForegroundColor White
Write-Host "   cd $ProjectPath" -ForegroundColor Gray
Write-Host "   chmod +x deploy-server.sh" -ForegroundColor Gray
Write-Host "   chmod +x server-manager.sh" -ForegroundColor Gray
Write-Host "   ./deploy-server.sh" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣ 测试服务:" -ForegroundColor White
Write-Host "   ./server-manager.sh test" -ForegroundColor Gray
Write-Host "   curl http://${ServerIP}:3000/health" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣ 管理服务:" -ForegroundColor White
Write-Host "   ./server-manager.sh status    # 查看状态" -ForegroundColor Gray
Write-Host "   ./server-manager.sh monitor   # 实时监控" -ForegroundColor Gray
Write-Host "   ./server-manager.sh logs      # 查看日志" -ForegroundColor Gray
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan

# 提供一键执行选项
Write-Host ""
$choice = Read-Host "是否现在执行自动上传? (y/N)"
if ($choice -eq 'y' -or $choice -eq 'Y') {
    Write-Host "🔄 开始上传文件..." -ForegroundColor Yellow
    
    try {
        # 上传文件
        scp server.py root@${ServerIP}:${ProjectPath}/
        scp app.py root@${ServerIP}:${ProjectPath}/
        scp requirements.txt root@${ServerIP}:${ProjectPath}/
        scp deploy-server.sh root@${ServerIP}:${ProjectPath}/
        scp server-manager.sh root@${ServerIP}:${ProjectPath}/
        
        Write-Host "✅ 文件上传完成!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📡 现在请连接服务器执行部署:" -ForegroundColor Cyan
        Write-Host "ssh root@$ServerIP" -ForegroundColor White
        Write-Host "cd $ProjectPath && chmod +x *.sh && ./deploy-server.sh" -ForegroundColor White
        Write-Host ""
        Write-Host "🔧 部署完成后可以使用管理工具:" -ForegroundColor Cyan
        Write-Host "./server-manager.sh status" -ForegroundColor White
        
    } catch {
        Write-Host "❌ 文件上传失败: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "请检查网络连接和服务器访问权限" -ForegroundColor Yellow
    }
} else {
    Write-Host "💡 请按照上面的步骤手动执行部署" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 部署脚本准备完成!" -ForegroundColor Green 