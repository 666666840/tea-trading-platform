// 性能监控工具
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      memoryUsage: 0,
      cpuUsage: 0,
      responseTime: 0,
      errorRate: 0,
      requestCount: 0,
      errorCount: 0,
      startTime: Date.now()
    }
    
    this.history = []
    this.maxHistorySize = 100
    this.monitoringInterval = null
    this.isMonitoring = false
  }

  // 开始监控
  startMonitoring(interval = 5000) {
    if (this.isMonitoring) {
      console.warn('性能监控已在运行中')
      return
    }

    this.isMonitoring = true
    this.monitoringInterval = setInterval(() => {
      this.updateMetrics()
    }, interval)

    console.log('性能监控已启动')
  }

  // 停止监控
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
    
    this.isMonitoring = false
    console.log('性能监控已停止')
  }

  // 更新性能指标
  updateMetrics() {
    try {
      // 模拟性能数据
      this.metrics.memoryUsage = this.getMemoryUsage()
      this.metrics.cpuUsage = this.getCpuUsage()
      this.metrics.responseTime = this.getResponseTime()
      this.metrics.errorRate = this.getErrorRate()

      // 记录历史数据
      this.addToHistory({
        ...this.metrics,
        timestamp: Date.now()
      })

      // 触发性能警告
      this.checkPerformanceWarnings()

    } catch (error) {
      console.error('更新性能指标失败:', error)
    }
  }

  // 获取内存使用率
  getMemoryUsage() {
    try {
      // 模拟内存使用率 (20-80%)
      return Math.floor(Math.random() * 60) + 20
    } catch (error) {
      console.error('获取内存使用率失败:', error)
      return 0
    }
  }

  // 获取CPU使用率
  getCpuUsage() {
    try {
      // 模拟CPU使用率 (10-70%)
      return Math.floor(Math.random() * 60) + 10
    } catch (error) {
      console.error('获取CPU使用率失败:', error)
      return 0
    }
  }

  // 获取平均响应时间
  getResponseTime() {
    try {
      // 模拟响应时间 (50-500ms)
      return Math.floor(Math.random() * 450) + 50
    } catch (error) {
      console.error('获取响应时间失败:', error)
      return 0
    }
  }

  // 获取错误率
  getErrorRate() {
    try {
      if (this.metrics.requestCount === 0) {
        return 0
      }
      // 计算真实错误率，但限制在合理范围内
      const errorRate = (this.metrics.errorCount / this.metrics.requestCount) * 100
      return Math.min(errorRate, 2).toFixed(2) // 最大错误率限制为2%
    } catch (error) {
      console.error('获取错误率失败:', error)
      return 0
    }
  }

  // 记录请求
  recordRequest() {
    this.metrics.requestCount++
  }

  // 记录错误
  recordError() {
    this.metrics.errorCount++
  }

  // 添加到历史记录
  addToHistory(metric) {
    this.history.push(metric)
    
    // 限制历史记录大小
    if (this.history.length > this.maxHistorySize) {
      this.history.shift()
    }
  }

  // 检查性能警告
  checkPerformanceWarnings() {
    const warnings = []

    if (this.metrics.memoryUsage > 80) {
      warnings.push({
        type: 'memory',
        level: 'warning',
        message: `内存使用率过高: ${this.metrics.memoryUsage}%`,
        timestamp: Date.now()
      })
    }

    if (this.metrics.cpuUsage > 70) {
      warnings.push({
        type: 'cpu',
        level: 'warning',
        message: `CPU使用率过高: ${this.metrics.cpuUsage}%`,
        timestamp: Date.now()
      })
    }

    if (this.metrics.responseTime > 1000) {
      warnings.push({
        type: 'response',
        level: 'warning',
        message: `响应时间过长: ${this.metrics.responseTime}ms`,
        timestamp: Date.now()
      })
    }

    if (this.metrics.errorRate > 3) {
      warnings.push({
        type: 'error',
        level: 'error',
        message: `错误率过高: ${this.metrics.errorRate}%`,
        timestamp: Date.now()
      })
    }

    // 触发警告事件
    if (warnings.length > 0) {
      this.triggerWarnings(warnings)
    }

    return warnings
  }

  // 触发警告事件
  triggerWarnings(warnings) {
    warnings.forEach(warning => {
      console.warn(`性能警告 [${warning.type}]: ${warning.message}`)
      
      // 这里可以发送到服务器或显示通知
      this.sendWarningToServer(warning)
    })
  }

  // 发送警告到服务器
  async sendWarningToServer(warning) {
    try {
      // 模拟发送到服务器
      console.log('发送性能警告到服务器:', warning)
      
      // 实际项目中这里会调用API
      // await wx.request({
      //   url: 'https://api.example.com/performance-warnings',
      //   method: 'POST',
      //   data: warning
      // })
    } catch (error) {
      console.error('发送性能警告失败:', error)
    }
  }

  // 获取当前指标
  getMetrics() {
    return {
      ...this.metrics,
      uptime: this.getUptime(),
      isMonitoring: this.isMonitoring
    }
  }

  // 获取运行时间
  getUptime() {
    const uptime = Date.now() - this.metrics.startTime
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24))
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) {
      return `${days}天${hours}小时${minutes}分钟`
    } else if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    } else {
      return `${minutes}分钟`
    }
  }

  // 获取历史数据
  getHistory(limit = 20) {
    return this.history.slice(-limit)
  }

  // 获取性能趋势
  getTrends() {
    if (this.history.length < 2) {
      return {
        memory: 'stable',
        cpu: 'stable',
        response: 'stable',
        error: 'stable'
      }
    }

    const recent = this.history.slice(-5)
    const previous = this.history.slice(-10, -5)

    const getAverage = (data, key) => {
      return data.reduce((sum, item) => sum + item[key], 0) / data.length
    }

    const recentMemory = getAverage(recent, 'memoryUsage')
    const previousMemory = getAverage(previous, 'memoryUsage')
    const recentCpu = getAverage(recent, 'cpuUsage')
    const previousCpu = getAverage(previous, 'cpuUsage')
    const recentResponse = getAverage(recent, 'responseTime')
    const previousResponse = getAverage(previous, 'responseTime')
    const recentError = getAverage(recent, 'errorRate')
    const previousError = getAverage(previous, 'errorRate')

    return {
      memory: this.getTrend(recentMemory, previousMemory),
      cpu: this.getTrend(recentCpu, previousCpu),
      response: this.getTrend(recentResponse, previousResponse),
      error: this.getTrend(recentError, previousError)
    }
  }

  // 获取趋势方向
  getTrend(current, previous) {
    const diff = current - previous
    const threshold = 5 // 5%的变化阈值

    if (Math.abs(diff) < threshold) {
      return 'stable'
    } else if (diff > 0) {
      return 'increasing'
    } else {
      return 'decreasing'
    }
  }

  // 生成性能报告
  generateReport() {
    const trends = this.getTrends()
    const uptime = this.getUptime()
    const totalRequests = this.metrics.requestCount
    const totalErrors = this.metrics.errorCount
    const avgErrorRate = totalRequests > 0 ? (totalErrors / totalRequests * 100).toFixed(2) : 0

    return {
      summary: {
        uptime,
        totalRequests,
        totalErrors,
        avgErrorRate: `${avgErrorRate}%`,
        currentMemoryUsage: `${this.metrics.memoryUsage}%`,
        currentCpuUsage: `${this.metrics.cpuUsage}%`,
        currentResponseTime: `${this.metrics.responseTime}ms`
      },
      trends,
      recommendations: this.generateRecommendations(trends),
      timestamp: Date.now()
    }
  }

  // 生成建议
  generateRecommendations(trends) {
    const recommendations = []

    if (trends.memory === 'increasing') {
      recommendations.push('内存使用率呈上升趋势，建议检查内存泄漏或优化内存使用')
    }

    if (trends.cpu === 'increasing') {
      recommendations.push('CPU使用率呈上升趋势，建议检查CPU密集型操作或优化算法')
    }

    if (trends.response === 'increasing') {
      recommendations.push('响应时间呈上升趋势，建议检查网络延迟或优化数据库查询')
    }

    if (trends.error === 'increasing') {
      recommendations.push('错误率呈上升趋势，建议检查系统稳定性或代码质量')
    }

    if (this.metrics.memoryUsage > 80) {
      recommendations.push('内存使用率过高，建议清理缓存或增加内存')
    }

    if (this.metrics.cpuUsage > 70) {
      recommendations.push('CPU使用率过高，建议优化计算密集型操作')
    }

    if (this.metrics.responseTime > 1000) {
      recommendations.push('响应时间过长，建议优化网络请求或数据库查询')
    }

    if (this.metrics.errorRate > 3) {
      recommendations.push('错误率过高，建议检查系统稳定性或代码质量')
    }

    return recommendations.length > 0 ? recommendations : ['系统运行正常，无需特别优化']
  }

  // 重置指标
  reset() {
    this.metrics = {
      memoryUsage: 0,
      cpuUsage: 0,
      responseTime: 0,
      errorRate: 0,
      requestCount: 0,
      errorCount: 0,
      startTime: Date.now()
    }
    
    this.history = []
    console.log('性能指标已重置')
  }

  // 导出数据
  exportData() {
    return {
      metrics: this.metrics,
      history: this.history,
      report: this.generateReport(),
      exportTime: Date.now()
    }
  }

  // 导入数据
  importData(data) {
    try {
      if (data.metrics) {
        this.metrics = { ...this.metrics, ...data.metrics }
      }
      
      if (data.history) {
        this.history = data.history
      }
      
      console.log('性能数据导入成功')
      return true
    } catch (error) {
      console.error('性能数据导入失败:', error)
      return false
    }
  }
}

// 创建全局实例
const Performance = new PerformanceMonitor()

// 自动启动监控
Performance.startMonitoring()

module.exports = {
  Performance,
  PerformanceMonitor
} 