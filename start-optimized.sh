#!/bin/bash

# 茶叶一点通 - 优化版启动脚本
# 适用于2核2G服务器配置

echo "=== 茶叶一点通 - 优化版启动脚本 ==="
echo "服务器配置: 2核2G"
echo "启动时间: $(date)"
echo ""

# 检查Node.js版本
NODE_VERSION=$(node --version)
echo "Node.js版本: $NODE_VERSION"

# 检查可用内存
TOTAL_MEM=$(free -m | awk 'NR==2{printf "%.0f", $2}')
USED_MEM=$(free -m | awk 'NR==2{printf "%.0f", $3}')
FREE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $4}')
MEM_USAGE=$((USED_MEM * 100 / TOTAL_MEM))

echo "内存使用情况:"
echo "  总内存: ${TOTAL_MEM}MB"
echo "  已使用: ${USED_MEM}MB"
echo "  可用内存: ${FREE_MEM}MB"
echo "  使用率: ${MEM_USAGE}%"
echo ""

# 内存使用率警告
if [ $MEM_USAGE -gt 80 ]; then
    echo "⚠️  警告: 内存使用率过高 (${MEM_USAGE}%)"
    echo "建议: 考虑升级服务器配置或优化应用程序"
    echo ""
fi

# 设置Node.js内存优化参数
export NODE_OPTIONS="--max-old-space-size=1024 --optimize-for-size"

# 设置垃圾回收参数
export NODE_OPTIONS="$NODE_OPTIONS --expose-gc"

# 设置其他优化参数
export NODE_OPTIONS="$NODE_OPTIONS --max-semi-space-size=64"

echo "Node.js优化参数: $NODE_OPTIONS"
echo ""

# 清理旧日志文件
echo "清理旧日志文件..."
find . -name "*.log" -size +10M -delete 2>/dev/null || true
find . -name "crawler.log" -size +5M -exec truncate -s 5M {} \; 2>/dev/null || true

# 检查端口占用
PORT_CHECK=$(netstat -tlnp 2>/dev/null | grep :80 || echo "端口80可用")
echo "端口检查: $PORT_CHECK"
echo ""

# 启动内存监控
echo "启动内存监控..."
node memory-monitor.js &
MONITOR_PID=$!

# 等待2秒让监控启动
sleep 2

# 启动优化版爬虫
echo "启动优化版茶叶内容采集服务..."
echo "使用优化配置:"
echo "  - 限制每类文章数量: 15篇"
echo "  - 分批处理: 5个源一批"
echo "  - 减少重试次数: 2次"
echo "  - 缩短超时时间: 5秒"
echo "  - 启用垃圾回收"
echo ""

# 启动爬虫服务
node smart-tea-crawler-optimized.js &
CRAWLER_PID=$!

echo "服务启动完成!"
echo "爬虫进程ID: $CRAWLER_PID"
echo "监控进程ID: $MONITOR_PID"
echo ""

# 显示进程状态
echo "进程状态:"
ps aux | grep -E "(smart-tea-crawler|memory-monitor)" | grep -v grep
echo ""

# 显示实时内存使用
echo "实时内存使用情况:"
free -h
echo ""

# 等待用户输入退出
echo "按 Ctrl+C 停止所有服务"
echo ""

# 捕获退出信号
trap 'echo ""; echo "正在停止服务..."; kill $CRAWLER_PID $MONITOR_PID 2>/dev/null; echo "服务已停止"; exit 0' INT TERM

# 保持脚本运行
while true; do
    sleep 10
    # 检查进程是否还在运行
    if ! kill -0 $CRAWLER_PID 2>/dev/null; then
        echo "⚠️  爬虫进程已停止，正在重启..."
        node smart-tea-crawler-optimized.js &
        CRAWLER_PID=$!
    fi
    
    if ! kill -0 $MONITOR_PID 2>/dev/null; then
        echo "⚠️  监控进程已停止，正在重启..."
        node memory-monitor.js &
        MONITOR_PID=$!
    fi
done 