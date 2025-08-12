// API监控中间件
const fs = require('fs')
const path = require('path')

class APIMonitorMiddleware {
  constructor() {
    this.monitorData = {
      calls: [],
      errors: [],
      performance: {
        totalCalls: 0,
        totalErrors: 0,
        avgResponseTime: 0,
        slowAPIs: [],
        errorAPIs: []
      },
      realtime: {
        currentCalls: 0,
        activeConnections: 0,
        lastMinuteCalls: 0,
        lastHourCalls: 0
      }
    }
    
    this.config = {
      enabled: true,
      logToFile: true,
      logToConsole: false,
      maxRecords: 10000,
      slowThreshold: 2000, // 2秒
      errorThreshold: 500,  // 500ms
      logFile: 'api-monitor.log',
      dataFile: 'api-monitor-data.json'
    }
    
    this.init()
  }

  // 初始化监控
  init() {
    this.loadData()
    this.startCleanupTimer()
    console.log('📊 API监控中间件已启动')
  }

  // 监控中间件函数
  monitor() {
    return (req, res, next) => {
      if (!this.config.enabled) {
        return next()
      }

      const startTime = Date.now()
      const requestId = this.generateRequestId()
      const timestamp = new Date().toISOString()
      
      // 记录请求信息
      const requestInfo = {
        id: requestId,
        timestamp: timestamp,
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        headers: this.sanitizeHeaders(req.headers),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        body: this.sanitizeBody(req.body),
        startTime: startTime
      }

      // 拦截响应
      const originalSend = res.send
      const originalJson = res.json
      const originalEnd = res.end

      // 监控send方法
      res.send = function(data) {
        const responseTime = Date.now() - startTime
        const responseInfo = {
          ...requestInfo,
          responseTime: responseTime,
          statusCode: res.statusCode,
          responseSize: typeof data === 'string' ? data.length : JSON.stringify(data).length,
          success: res.statusCode < 400,
          endTime: Date.now()
        }

        this.recordAPICall(responseInfo)
        return originalSend.call(this, data)
      }.bind(this)

      // 监控json方法
      res.json = function(data) {
        const responseTime = Date.now() - startTime
        const responseInfo = {
          ...requestInfo,
          responseTime: responseTime,
          statusCode: res.statusCode,
          responseSize: JSON.stringify(data).length,
          success: res.statusCode < 400,
          endTime: Date.now()
        }

        this.recordAPICall(responseInfo)
        return originalJson.call(this, data)
      }.bind(this)

      // 监控end方法
      res.end = function(data) {
        const responseTime = Date.now() - startTime
        const responseInfo = {
          ...requestInfo,
          responseTime: responseTime,
          statusCode: res.statusCode,
          responseSize: data ? data.length : 0,
          success: res.statusCode < 400,
          endTime: Date.now()
        }

        this.recordAPICall(responseInfo)
        return originalEnd.call(this, data)
      }.bind(this)

      // 错误处理
      res.on('error', (error) => {
        const responseTime = Date.now() - startTime
        const errorInfo = {
          ...requestInfo,
          responseTime: responseTime,
          statusCode: 500,
          error: error.message,
          stack: error.stack,
          success: false,
          endTime: Date.now()
        }

        this.recordAPIError(errorInfo)
      })

      next()
    }
  }

  // 记录API调用
  recordAPICall(callInfo) {
    try {
      // 添加到调用记录
      this.monitorData.calls.push(callInfo)
      
      // 更新统计数据
      this.monitorData.performance.totalCalls++
      this.updatePerformanceStats(callInfo)
      this.updateRealtimeStats()
      
      // 检查慢API
      if (callInfo.responseTime > this.config.slowThreshold) {
        this.recordSlowAPI(callInfo)
      }
      
      // 检查错误API
      if (!callInfo.success) {
        this.recordErrorAPI(callInfo)
      }
      
      // 限制记录数量
      if (this.monitorData.calls.length > this.config.maxRecords) {
        this.monitorData.calls.shift()
      }
      
      // 记录到文件
      if (this.config.logToFile) {
        this.logToFile(callInfo)
      }
      
      // 控制台输出
      if (this.config.logToConsole) {
        this.logToConsole(callInfo)
      }
      
    } catch (error) {
      console.error('API监控记录失败:', error)
    }
  }

  // 记录API错误
  recordAPIError(errorInfo) {
    try {
      this.monitorData.errors.push(errorInfo)
      this.monitorData.performance.totalErrors++
      
      if (this.monitorData.errors.length > this.config.maxRecords) {
        this.monitorData.errors.shift()
      }
      
      if (this.config.logToFile) {
        this.logToFile(errorInfo, 'ERROR')
      }
      
    } catch (error) {
      console.error('API错误记录失败:', error)
    }
  }

  // 记录慢API
  recordSlowAPI(callInfo) {
    const slowAPI = {
      url: callInfo.url,
      method: callInfo.method,
      responseTime: callInfo.responseTime,
      timestamp: callInfo.timestamp,
      count: 1
    }
    
    const existingIndex = this.monitorData.performance.slowAPIs.findIndex(
      api => api.url === callInfo.url && api.method === callInfo.method
    )
    
    if (existingIndex >= 0) {
      this.monitorData.performance.slowAPIs[existingIndex].count++
      this.monitorData.performance.slowAPIs[existingIndex].responseTime = 
        Math.max(this.monitorData.performance.slowAPIs[existingIndex].responseTime, callInfo.responseTime)
    } else {
      this.monitorData.performance.slowAPIs.push(slowAPI)
    }
    
    // 按响应时间排序，保留Top10
    this.monitorData.performance.slowAPIs.sort((a, b) => b.responseTime - a.responseTime)
    this.monitorData.performance.slowAPIs = this.monitorData.performance.slowAPIs.slice(0, 10)
  }

  // 记录错误API
  recordErrorAPI(callInfo) {
    const errorAPI = {
      url: callInfo.url,
      method: callInfo.method,
      statusCode: callInfo.statusCode,
      timestamp: callInfo.timestamp,
      count: 1
    }
    
    const existingIndex = this.monitorData.performance.errorAPIs.findIndex(
      api => api.url === callInfo.url && api.method === callInfo.method
    )
    
    if (existingIndex >= 0) {
      this.monitorData.performance.errorAPIs[existingIndex].count++
    } else {
      this.monitorData.performance.errorAPIs.push(errorAPI)
    }
    
    // 按错误次数排序，保留Top10
    this.monitorData.performance.errorAPIs.sort((a, b) => b.count - a.count)
    this.monitorData.performance.errorAPIs = this.monitorData.performance.errorAPIs.slice(0, 10)
  }

  // 更新性能统计
  updatePerformanceStats(callInfo) {
    const totalCalls = this.monitorData.performance.totalCalls
    const currentAvg = this.monitorData.performance.avgResponseTime
    
    this.monitorData.performance.avgResponseTime = 
      (currentAvg * (totalCalls - 1) + callInfo.responseTime) / totalCalls
  }

  // 更新实时统计
  updateRealtimeStats() {
    const now = Date.now()
    const oneMinuteAgo = now - 60 * 1000
    const oneHourAgo = now - 60 * 60 * 1000
    
    this.monitorData.realtime.lastMinuteCalls = 
      this.monitorData.calls.filter(call => call.timestamp > new Date(oneMinuteAgo).toISOString()).length
    
    this.monitorData.realtime.lastHourCalls = 
      this.monitorData.calls.filter(call => call.timestamp > new Date(oneHourAgo).toISOString()).length
  }

  // 生成请求ID
  generateRequestId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // 清理敏感信息
  sanitizeHeaders(headers) {
    const sanitized = { ...headers }
    const sensitiveFields = ['authorization', 'cookie', 'x-api-key', 'token']
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***'
      }
    })
    
    return sanitized
  }

  // 清理请求体
  sanitizeBody(body) {
    if (!body) return null
    
    const sanitized = { ...body }
    const sensitiveFields = ['password', 'token', 'secret', 'key']
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***'
      }
    })
    
    return sanitized
  }

  // 记录到文件
  logToFile(callInfo, level = 'INFO') {
    try {
      const logEntry = {
        level: level,
        timestamp: callInfo.timestamp,
        method: callInfo.method,
        url: callInfo.url,
        statusCode: callInfo.statusCode,
        responseTime: callInfo.responseTime,
        success: callInfo.success
      }
      
      const logLine = JSON.stringify(logEntry) + '\n'
      fs.appendFileSync(this.config.logFile, logLine)
    } catch (error) {
      console.error('写入日志文件失败:', error)
    }
  }

  // 控制台输出
  logToConsole(callInfo) {
    const statusIcon = callInfo.success ? '✅' : '❌'
    const timeColor = callInfo.responseTime > this.config.slowThreshold ? '\x1b[31m' : '\x1b[32m'
    const resetColor = '\x1b[0m'
    
    console.log(
      `${statusIcon} ${callInfo.method} ${callInfo.url} - ${callInfo.statusCode} ` +
      `${timeColor}${callInfo.responseTime}ms${resetColor}`
    )
  }

  // 获取监控数据
  getMonitorData() {
    return {
      ...this.monitorData,
      config: this.config,
      summary: this.generateSummary()
    }
  }

  // 生成摘要
  generateSummary() {
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000
    const oneDayAgo = now - 24 * 60 * 60 * 1000
    
    const hourlyCalls = this.monitorData.calls.filter(
      call => call.timestamp > new Date(oneHourAgo).toISOString()
    ).length
    
    const dailyCalls = this.monitorData.calls.filter(
      call => call.timestamp > new Date(oneDayAgo).toISOString()
    ).length
    
    const errorRate = this.monitorData.performance.totalCalls > 0 
      ? (this.monitorData.performance.totalErrors / this.monitorData.performance.totalCalls * 100).toFixed(2)
      : 0
    
    return {
      hourlyCalls,
      dailyCalls,
      errorRate: `${errorRate}%`,
      avgResponseTime: Math.round(this.monitorData.performance.avgResponseTime),
      slowAPICount: this.monitorData.performance.slowAPIs.length,
      errorAPICount: this.monitorData.performance.errorAPIs.length
    }
  }

  // 获取API调用历史
  getAPICallHistory(limit = 100) {
    return this.monitorData.calls.slice(-limit).reverse()
  }

  // 获取错误历史
  getErrorHistory(limit = 100) {
    return this.monitorData.errors.slice(-limit).reverse()
  }

  // 获取慢API列表
  getSlowAPIs() {
    return this.monitorData.performance.slowAPIs
  }

  // 获取错误API列表
  getErrorAPIs() {
    return this.monitorData.performance.errorAPIs
  }

  // 获取实时统计
  getRealtimeStats() {
    return this.monitorData.realtime
  }

  // 清理旧数据
  cleanup() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
    this.monitorData.calls = this.monitorData.calls.filter(
      call => call.timestamp > oneWeekAgo
    )
    
    this.monitorData.errors = this.monitorData.errors.filter(
      error => error.timestamp > oneWeekAgo
    )
    
    this.saveData()
  }

  // 启动清理定时器
  startCleanupTimer() {
    setInterval(() => {
      this.cleanup()
    }, 24 * 60 * 60 * 1000) // 每天清理一次
  }

  // 保存数据
  saveData() {
    try {
      fs.writeFileSync(this.config.dataFile, JSON.stringify(this.monitorData, null, 2))
    } catch (error) {
      console.error('保存监控数据失败:', error)
    }
  }

  // 加载数据
  loadData() {
    try {
      if (fs.existsSync(this.config.dataFile)) {
        const data = fs.readFileSync(this.config.dataFile, 'utf8')
        this.monitorData = JSON.parse(data)
      }
    } catch (error) {
      console.error('加载监控数据失败:', error)
    }
  }

  // 重置数据
  reset() {
    this.monitorData = {
      calls: [],
      errors: [],
      performance: {
        totalCalls: 0,
        totalErrors: 0,
        avgResponseTime: 0,
        slowAPIs: [],
        errorAPIs: []
      },
      realtime: {
        currentCalls: 0,
        activeConnections: 0,
        lastMinuteCalls: 0,
        lastHourCalls: 0
      }
    }
    this.saveData()
  }

  // 更新配置
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    this.saveData()
  }
}

// 创建单例实例
const apiMonitor = new APIMonitorMiddleware()

module.exports = apiMonitor 