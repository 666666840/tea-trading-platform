#!/bin/bash
# 茶叶一点通 API服务器管理脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/www/wwwroot/tea-api"
SERVICE_NAME="tea-api-server"

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示帮助信息
show_help() {
    echo -e "${BLUE}茶叶一点通 API服务器管理工具${NC}"
    echo "============================================"
    echo "用法: $0 [命令]"
    echo ""
    echo "可用命令:"
    echo "  status    - 查看服务状态"
    echo "  start     - 启动服务"
    echo "  stop      - 停止服务"
    echo "  restart   - 重启服务"
    echo "  logs      - 查看日志"
    echo "  monitor   - 实时监控"
    echo "  test      - 测试API接口"
    echo "  update    - 更新服务"
    echo "  help      - 显示帮助"
    echo ""
}

# 检查服务状态
check_status() {
    if pgrep -f "python.*server.py" > /dev/null; then
        PID=$(pgrep -f "python.*server.py")
        log_info "✅ API服务器正在运行 (PID: $PID)"
        
        # 检查端口
        if netstat -tlnp | grep -q ":3000"; then
            log_info "✅ 端口3000正在监听"
        else
            log_warn "⚠️ 端口3000未监听"
        fi
        
        return 0
    else
        log_error "❌ API服务器未运行"
        return 1
    fi
}

# 启动服务
start_service() {
    log_info "启动API服务器..."
    cd $PROJECT_DIR
    
    if check_status > /dev/null 2>&1; then
        log_warn "服务已在运行中"
        return 0
    fi
    
    nohup python3 server.py > api.log 2>&1 &
    sleep 3
    
    if check_status > /dev/null 2>&1; then
        log_info "✅ API服务器启动成功"
    else
        log_error "❌ API服务器启动失败"
        echo "错误日志:"
        tail -10 $PROJECT_DIR/api.log
    fi
}

# 停止服务
stop_service() {
    log_info "停止API服务器..."
    
    if ! check_status > /dev/null 2>&1; then
        log_warn "服务未运行"
        return 0
    fi
    
    pkill -f "python.*server.py"
    sleep 2
    
    if ! check_status > /dev/null 2>&1; then
        log_info "✅ API服务器已停止"
    else
        log_error "❌ 停止服务失败，尝试强制终止"
        pkill -9 -f "python.*server.py"
    fi
}

# 重启服务
restart_service() {
    log_info "重启API服务器..."
    stop_service
    sleep 1
    start_service
}

# 查看日志
show_logs() {
    log_info "显示API服务器日志..."
    cd $PROJECT_DIR
    
    if [[ -f "api.log" ]]; then
        tail -50 api.log
    else
        log_error "日志文件不存在"
    fi
}

# 实时监控
monitor_service() {
    log_info "开始实时监控..."
    echo "按 Ctrl+C 停止监控"
    echo ""
    
    while true; do
        clear
        echo -e "${BLUE}茶叶一点通 API服务器监控${NC}"
        echo "========================================"
        echo "时间: $(date)"
        echo ""
        
        # 服务状态
        echo -e "${YELLOW}服务状态:${NC}"
        check_status
        echo ""
        
        # 系统资源
        echo -e "${YELLOW}系统资源:${NC}"
        echo "CPU使用率: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
        echo "内存使用: $(free -h | grep Mem | awk '{printf "%.1f%%\n", $3/$2*100}')"
        echo "磁盘使用: $(df -h / | tail -1 | awk '{print $5}')"
        echo ""
        
        # API响应测试
        echo -e "${YELLOW}API响应测试:${NC}"
        if curl -s --max-time 5 http://localhost:3000/health > /dev/null; then
            echo -e "${GREEN}✅ API响应正常${NC}"
        else
            echo -e "${RED}❌ API响应异常${NC}"
        fi
        echo ""
        
        # 最新日志
        echo -e "${YELLOW}最新日志 (最近10行):${NC}"
        if [[ -f "$PROJECT_DIR/api.log" ]]; then
            tail -10 $PROJECT_DIR/api.log
        else
            echo "暂无日志"
        fi
        
        sleep 5
    done
}

# 测试API接口
test_api() {
    log_info "测试API接口..."
    cd $PROJECT_DIR
    
    # 获取服务器IP
    SERVER_IP=$(curl -s ifconfig.me)
    
    echo "测试目标: http://$SERVER_IP:3000"
    echo ""
    
    # 测试健康检查
    echo "1. 健康检查 (/health):"
    if curl -s --max-time 10 http://localhost:3000/health; then
        echo -e "\n${GREEN}✅ 健康检查通过${NC}\n"
    else
        echo -e "\n${RED}❌ 健康检查失败${NC}\n"
    fi
    
    # 测试内容API
    echo "2. 内容API (/api/content):"
    if curl -s --max-time 10 "http://localhost:3000/api/content?type=recommend"; then
        echo -e "\n${GREEN}✅ 内容API正常${NC}\n"
    else
        echo -e "\n${RED}❌ 内容API异常${NC}\n"
    fi
    
    # 测试市场API
    echo "3. 市场API (/api/market/provinces):"
    if curl -s --max-time 10 http://localhost:3000/api/market/provinces; then
        echo -e "\n${GREEN}✅ 市场API正常${NC}\n"
    else
        echo -e "\n${RED}❌ 市场API异常${NC}\n"
    fi
    
    echo "外部访问地址: http://$SERVER_IP:3000"
}

# 更新服务
update_service() {
    log_info "更新API服务器..."
    cd $PROJECT_DIR
    
    # 备份当前文件
    if [[ -f "server.py" ]]; then
        cp server.py server.py.backup.$(date +%Y%m%d_%H%M%S)
        log_info "已备份当前文件"
    fi
    
    # 重启服务以应用更新
    restart_service
    
    # 测试更新后的服务
    sleep 3
    test_api
}

# 主程序
case "$1" in
    status)
        check_status
        ;;
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        restart_service
        ;;
    logs)
        show_logs
        ;;
    monitor)
        monitor_service
        ;;
    test)
        test_api
        ;;
    update)
        update_service
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_error "未知命令: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 