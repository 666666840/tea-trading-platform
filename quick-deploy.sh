#!/bin/bash

# 快速部署脚本 - 一键部署茶叶内容采集系统
# 使用方法：chmod +x quick-deploy.sh && ./quick-deploy.sh

echo "=========================================="
echo "茶叶内容采集系统 - 快速部署"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

# 检查root权限
if [[ $EUID -ne 0 ]]; then
   log_error "请使用root权限运行此脚本"
   exit 1
fi

# 步骤1：系统更新
log_step "1. 更新系统包..."
yum update -y > /dev/null 2>&1
log_info "系统更新完成"

# 步骤2：安装基础工具
log_step "2. 安装基础工具..."
yum install -y wget curl git vim unzip > /dev/null 2>&1
log_info "基础工具安装完成"

# 步骤3：安装Node.js
log_step "3. 安装Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
    yum install -y nodejs > /dev/null 2>&1
    log_info "Node.js安装完成"
else
    log_info "Node.js已安装: $(node --version)"
fi

# 步骤4：安装PM2
log_step "4. 安装PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2 > /dev/null 2>&1
    log_info "PM2安装完成"
else
    log_info "PM2已安装"
fi

# 步骤5：创建项目目录
log_step "5. 创建项目目录..."
PROJECT_DIR="/home/tea-crawler"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR
log_info "项目目录创建完成: $PROJECT_DIR"

# 步骤6：检查项目文件
log_step "6. 检查项目文件..."
if [[ ! -f "smart-tea-crawler.js" ]]; then
    log_error "smart-tea-crawler.js 文件不存在"
    log_warn "请先上传项目文件到 $PROJECT_DIR"
    exit 1
fi

if [[ ! -f "package.json" ]]; then
    log_error "package.json 文件不存在"
    log_warn "请先上传项目文件到 $PROJECT_DIR"
    exit 1
fi

log_info "项目文件检查通过"

# 步骤7：安装依赖
log_step "7. 安装项目依赖..."
npm config set registry https://registry.npmmirror.com
npm install > /dev/null 2>&1
log_info "依赖安装完成"

# 步骤8：创建输出目录
log_step "8. 创建输出目录..."
OUTPUT_DIR="/usr/share/nginx/html"
mkdir -p $OUTPUT_DIR
chmod 755 $OUTPUT_DIR
echo '{"status": "ready", "timestamp": "'$(date -Iseconds)'"}' > $OUTPUT_DIR/content.json
log_info "输出目录配置完成"

# 步骤9：安装Nginx
log_step "9. 安装Nginx..."
if ! command -v nginx &> /dev/null; then
    yum install -y nginx > /dev/null 2>&1
    systemctl enable nginx > /dev/null 2>&1
    systemctl start nginx > /dev/null 2>&1
    log_info "Nginx安装完成"
else
    log_info "Nginx已安装"
fi

# 步骤10：配置防火墙
log_step "10. 配置防火墙..."
firewall-cmd --permanent --add-service=http > /dev/null 2>&1
firewall-cmd --permanent --add-service=https > /dev/null 2>&1
firewall-cmd --reload > /dev/null 2>&1
log_info "防火墙配置完成"

# 步骤11：启动采集服务
log_step "11. 启动采集服务..."
pm2 stop smart-tea-crawler 2>/dev/null || true
pm2 delete smart-tea-crawler 2>/dev/null || true
pm2 start smart-tea-crawler.js --name smart-tea-crawler > /dev/null 2>&1
pm2 save > /dev/null 2>&1
pm2 startup > /dev/null 2>&1
log_info "采集服务启动完成"

# 步骤12：创建监控脚本
log_step "12. 创建监控脚本..."
cat > /home/tea-crawler/monitor.sh << 'EOF'
#!/bin/bash
echo "=== 茶叶内容采集系统状态 ==="
echo "时间: $(date)"
echo ""
echo "PM2状态:"
pm2 status
echo ""
echo "系统资源:"
free -h
echo ""
echo "磁盘使用:"
df -h /
echo ""
echo "最新日志:"
pm2 logs smart-tea-crawler --lines 10
EOF

chmod +x /home/tea-crawler/monitor.sh
log_info "监控脚本创建完成"

# 步骤13：创建管理脚本
log_step "13. 创建管理脚本..."
cat > /home/tea-crawler/manage.sh << 'EOF'
#!/bin/bash
case "$1" in
    start)
        pm2 start smart-tea-crawler
        echo "服务已启动"
        ;;
    stop)
        pm2 stop smart-tea-crawler
        echo "服务已停止"
        ;;
    restart)
        pm2 restart smart-tea-crawler
        echo "服务已重启"
        ;;
    status)
        pm2 status
        ;;
    logs)
        pm2 logs smart-tea-crawler
        ;;
    monitor)
        ./monitor.sh
        ;;
    *)
        echo "用法: $0 {start|stop|restart|status|logs|monitor}"
        exit 1
        ;;
esac
EOF

chmod +x /home/tea-crawler/manage.sh
log_info "管理脚本创建完成"

# 部署完成
echo ""
echo "=========================================="
echo "🎉 部署完成！"
echo "=========================================="
echo ""
echo "📁 项目目录: $PROJECT_DIR"
echo "🌐 输出目录: $OUTPUT_DIR"
echo "📊 内容文件: http://$(curl -s ifconfig.me)/content.json"
echo ""
echo "🔧 管理命令:"
echo "  启动服务: ./manage.sh start"
echo "  停止服务: ./manage.sh stop"
echo "  重启服务: ./manage.sh restart"
echo "  查看状态: ./manage.sh status"
echo "  查看日志: ./manage.sh logs"
echo "  系统监控: ./manage.sh monitor"
echo ""
echo "📋 服务状态:"
pm2 status
echo ""
echo "✅ 部署成功！系统将在每天凌晨2点自动采集内容" 