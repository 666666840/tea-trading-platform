const fs = require('fs');
const os = require('os');

class MemoryMonitor {
  constructor() {
    this.logFile = './memory.log';
    this.alertThreshold = 80; // 内存使用率超过80%时报警
  }

  // 获取内存使用情况
  getMemoryInfo() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usagePercent = (usedMem / totalMem) * 100;

    return {
      total: this.formatBytes(totalMem),
      used: this.formatBytes(usedMem),
      free: this.formatBytes(freeMem),
      usagePercent: usagePercent.toFixed(2)
    };
  }

  // 格式化字节数
  formatBytes(bytes) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }

  // 记录内存使用情况
  logMemoryUsage() {
    const memoryInfo = this.getMemoryInfo();
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] 内存使用: ${memoryInfo.used}/${memoryInfo.total} (${memoryInfo.usagePercent}%)\n`;
    
    console.log(logMessage);
    
    try {
      // 限制日志文件大小
      const logStats = fs.statSync(this.logFile);
      if (logStats.size > 1024 * 512) { // 512KB限制
        fs.writeFileSync(this.logFile, logMessage);
      } else {
        fs.appendFileSync(this.logFile, logMessage);
      }
    } catch (error) {
      fs.writeFileSync(this.logFile, logMessage);
    }

    // 检查是否需要报警
    if (parseFloat(memoryInfo.usagePercent) > this.alertThreshold) {
      this.alertHighMemory(memoryInfo);
    }
  }

  // 内存使用过高报警
  alertHighMemory(memoryInfo) {
    const alertMessage = `⚠️ 内存使用过高: ${memoryInfo.usagePercent}% (${memoryInfo.used}/${memoryInfo.total})\n`;
    console.error(alertMessage);
    
    // 记录报警信息
    try {
      fs.appendFileSync('./memory-alerts.log', `[${new Date().toLocaleString()}] ${alertMessage}`);
    } catch (error) {
      console.error('无法写入报警日志:', error);
    }
  }

  // 获取系统负载
  getLoadAverage() {
    const loadAvg = os.loadavg();
    return {
      '1分钟': loadAvg[0].toFixed(2),
      '5分钟': loadAvg[1].toFixed(2),
      '15分钟': loadAvg[2].toFixed(2)
    };
  }

  // 获取CPU信息
  getCpuInfo() {
    const cpus = os.cpus();
    return {
      model: cpus[0].model,
      cores: cpus.length,
      speed: `${cpus[0].speed} MHz`
    };
  }

  // 获取系统信息
  getSystemInfo() {
    return {
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      uptime: this.formatUptime(os.uptime())
    };
  }

  // 格式化运行时间
  formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}天 ${hours}小时 ${minutes}分钟`;
    } else if (hours > 0) {
      return `${hours}小时 ${minutes}分钟`;
    } else {
      return `${minutes}分钟`;
    }
  }

  // 生成系统报告
  generateReport() {
    const memoryInfo = this.getMemoryInfo();
    const loadAvg = this.getLoadAverage();
    const cpuInfo = this.getCpuInfo();
    const systemInfo = this.getSystemInfo();

    const report = `
=== 系统资源监控报告 ===
时间: ${new Date().toLocaleString()}

内存使用情况:
  总内存: ${memoryInfo.total}
  已使用: ${memoryInfo.used}
  可用内存: ${memoryInfo.free}
  使用率: ${memoryInfo.usagePercent}%

系统负载:
  1分钟: ${loadAvg['1分钟']}
  5分钟: ${loadAvg['5分钟']}
  15分钟: ${loadAvg['15分钟']}

CPU信息:
  型号: ${cpuInfo.model}
  核心数: ${cpuInfo.cores}
  频率: ${cpuInfo.speed}

系统信息:
  平台: ${systemInfo.platform}
  架构: ${systemInfo.arch}
  版本: ${systemInfo.release}
  运行时间: ${systemInfo.uptime}
`;

    console.log(report);
    return report;
  }

  // 启动监控
  startMonitoring(interval = 60000) { // 默认每分钟监控一次
    console.log(`内存监控已启动，监控间隔: ${interval / 1000}秒`);
    
    // 立即执行一次
    this.logMemoryUsage();
    
    // 设置定时监控
    setInterval(() => {
      this.logMemoryUsage();
    }, interval);
  }

  // 生成优化建议
  generateOptimizationTips() {
    const memoryInfo = this.getMemoryInfo();
    const usagePercent = parseFloat(memoryInfo.usagePercent);
    
    let tips = [];
    
    if (usagePercent > 90) {
      tips.push('🔴 内存使用率过高，建议立即升级服务器配置');
    } else if (usagePercent > 80) {
      tips.push('🟡 内存使用率较高，建议优化应用程序');
    } else if (usagePercent > 70) {
      tips.push('🟢 内存使用率正常，但建议监控');
    } else {
      tips.push('🟢 内存使用率良好');
    }

    tips.push('💡 优化建议:');
    tips.push('  1. 减少并发连接数');
    tips.push('  2. 优化数据库查询');
    tips.push('  3. 使用缓存机制');
    tips.push('  4. 定期清理日志文件');
    tips.push('  5. 考虑使用CDN加速');

    return tips.join('\n');
  }
}

// 创建监控实例
const monitor = new MemoryMonitor();

// 如果直接运行此脚本
if (require.main === module) {
  // 生成完整报告
  monitor.generateReport();
  
  // 显示优化建议
  console.log('\n' + monitor.generateOptimizationTips());
  
  // 启动持续监控
  monitor.startMonitoring();
}

module.exports = MemoryMonitor; 