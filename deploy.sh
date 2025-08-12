#!/bin/bash

# 智能茶叶内容采集系统部署脚本
# 适用于CentOS/Ubuntu服务器

echo "=========================================="
echo "智能茶叶内容采集系统部署开始"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_info "检测到root权限"
    else
        log_warn "建议使用root权限运行此脚本"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# 检测操作系统
detect_os() {
    if [[ -f /etc/redhat-release ]]; then
        OS="centos"
        log_info "检测到CentOS系统"
    elif [[ -f /etc/debian_version ]]; then
        OS="ubuntu"
        log_info "检测到Ubuntu系统"
    else
        log_error "不支持的操作系统"
        exit 1
    fi
}

# 更新系统包
update_system() {
    log_info "更新系统包..."
    if [[ $OS == "centos" ]]; then
        yum update -y
    else
        apt update && apt upgrade -y
    fi
}

# 安装基础工具
install_basic_tools() {
    log_info "安装基础工具..."
    if [[ $OS == "centos" ]]; then
        yum install -y wget curl git vim unzip
    else
        apt install -y wget curl git vim unzip
    fi
}

# 安装Node.js
install_nodejs() {
    log_info "检查Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_info "Node.js已安装: $NODE_VERSION"
    else
        log_info "安装Node.js..."
        if [[ $OS == "centos" ]]; then
            # 安装NodeSource仓库
            curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
            yum install -y nodejs
        else
            # 安装NodeSource仓库
            curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
            apt install -y nodejs
        fi
    fi
    
    # 验证安装
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    log_info "Node.js版本: $NODE_VERSION"
    log_info "npm版本: $NPM_VERSION"
}

# 安装PM2
install_pm2() {
    log_info "检查PM2..."
    if command -v pm2 &> /dev/null; then
        log_info "PM2已安装"
    else
        log_info "安装PM2..."
        npm install -g pm2
    fi
}

# 创建项目目录
create_project_dir() {
    PROJECT_DIR="/home/tea-crawler"
    log_info "创建项目目录: $PROJECT_DIR"
    
    mkdir -p $PROJECT_DIR
    cd $PROJECT_DIR
    
    # 复制项目文件
    if [[ -f "smart-tea-crawler.js" ]]; then
        log_info "项目文件已存在"
    else
        log_warn "请确保项目文件已上传到 $PROJECT_DIR"
    fi
}

# 安装项目依赖
install_dependencies() {
    log_info "安装项目依赖..."
    cd /home/tea-crawler
    
    if [[ -f "package.json" ]]; then
        npm install
        log_info "依赖安装完成"
    else
        log_error "package.json文件不存在"
        exit 1
    fi
}

# 创建输出目录
create_output_dir() {
    OUTPUT_DIR="/usr/share/nginx/html"
    log_info "创建输出目录: $OUTPUT_DIR"
    
    mkdir -p $OUTPUT_DIR
    chmod 755 $OUTPUT_DIR
    
    # 创建测试文件
    echo '{"status": "ready", "timestamp": "'$(date -Iseconds)'"}' > $OUTPUT_DIR/content.json
    log_info "输出目录配置完成"
}

# 配置Nginx（可选）
configure_nginx() {
    log_info "检查Nginx..."
    if command -v nginx &> /dev/null; then
        log_info "Nginx已安装"
    else
        log_warn "Nginx未安装，是否安装? (y/N): "
        read -p "" -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if [[ $OS == "centos" ]]; then
                yum install -y nginx
                systemctl enable nginx
                systemctl start nginx
            else
                apt install -y nginx
                systemctl enable nginx
                systemctl start nginx
            fi
            log_info "Nginx安装完成"
        fi
    fi
}

# 启动采集服务
start_crawler_service() {
    log_info "启动采集服务..."
    cd /home/tea-crawler
    
    # 停止现有服务
    pm2 stop smart-tea-crawler 2>/dev/null || true
    pm2 delete smart-tea-crawler 2>/dev/null || true
    
    # 启动新服务
    pm2 start smart-tea-crawler.js --name smart-tea-crawler
    
    # 保存PM2配置
    pm2 save
    pm2 startup
    
    log_info "采集服务启动完成"
}

# 创建系统服务
create_system_service() {
    log_info "创建系统服务..."
    
    SERVICE_FILE="/etc/systemd/system/tea-crawler.service"
    
    cat > $SERVICE_FILE << EOF
[Unit]
Description=Smart Tea Content Crawler
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/tea-crawler
ExecStart=/usr/bin/node smart-tea-crawler.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

    # 重新加载systemd
    systemctl daemon-reload
    
    # 启用服务
    systemctl enable tea-crawler
    
    log_info "系统服务创建完成"
}

# 配置防火墙
configure_firewall() {
    log_info "配置防火墙..."
    
    if [[ $OS == "centos" ]]; then
        # CentOS 7+ 使用firewalld
        if command -v firewall-cmd &> /dev/null; then
            firewall-cmd --permanent --add-port=80/tcp
            firewall-cmd --permanent --add-port=443/tcp
            firewall-cmd --reload
            log_info "防火墙配置完成"
        fi
    else
        # Ubuntu使用ufw
        if command -v ufw &> /dev/null; then
            ufw allow 80/tcp
            ufw allow 443/tcp
            log_info "防火墙配置完成"
        fi
    fi
}

# 创建监控脚本
create_monitor_script() {
    log_info "创建监控脚本..."
    
    MONITOR_SCRIPT="/home/tea-crawler/monitor.sh"
    
    cat > $MONITOR_SCRIPT << 'EOF'
#!/bin/bash

# 监控脚本
LOG_FILE="/home/tea-crawler/crawler.log"
OUTPUT_FILE="/usr/share/nginx/html/content.json"

# 检查日志文件大小
if [[ -f $LOG_FILE ]]; then
    SIZE=$(du -m $LOG_FILE | cut -f1)
    if [[ $SIZE -gt 100 ]]; then
        echo "$(date): 日志文件过大，正在清理..." >> $LOG_FILE
        tail -n 1000 $LOG_FILE > $LOG_FILE.tmp && mv $LOG_FILE.tmp $LOG_FILE
    fi
fi

# 检查输出文件
if [[ ! -f $OUTPUT_FILE ]]; then
    echo "$(date): 输出文件不存在，重启服务..." >> $LOG_FILE
    pm2 restart smart-tea-crawler
fi

# 检查服务状态
if ! pm2 list | grep -q "smart-tea-crawler.*online"; then
    echo "$(date): 服务离线，正在重启..." >> $LOG_FILE
    pm2 restart smart-tea-crawler
fi
EOF

    chmod +x $MONITOR_SCRIPT
    
    # 添加到crontab
    (crontab -l 2>/dev/null; echo "*/5 * * * * $MONITOR_SCRIPT") | crontab -
    
    log_info "监控脚本创建完成"
}

# 显示部署信息
show_deployment_info() {
    echo ""
    echo "=========================================="
    echo "部署完成！"
    echo "=========================================="
    echo ""
    echo "项目目录: /home/tea-crawler"
    echo "输出目录: /usr/share/nginx/html"
    echo "日志文件: /home/tea-crawler/crawler.log"
    echo ""
    echo "服务管理命令:"
    echo "  查看状态: pm2 status"
    echo "  查看日志: pm2 logs smart-tea-crawler"
    echo "  重启服务: pm2 restart smart-tea-crawler"
    echo "  停止服务: pm2 stop smart-tea-crawler"
    echo ""
    echo "系统服务管理:"
    echo "  启动: systemctl start tea-crawler"
    echo "  停止: systemctl stop tea-crawler"
    echo "  状态: systemctl status tea-crawler"
    echo ""
    echo "内容访问地址:"
    echo "  http://你的服务器IP/content.json"
    echo ""
    echo "监控脚本: /home/tea-crawler/monitor.sh"
    echo "=========================================="
}

# 主函数
main() {
    check_root
    detect_os
    update_system
    install_basic_tools
    install_nodejs
    install_pm2
    create_project_dir
    install_dependencies
    create_output_dir
    configure_nginx
    start_crawler_service
    create_system_service
    configure_firewall
    create_monitor_script
    show_deployment_info
}

# 执行主函数
main "$@" 