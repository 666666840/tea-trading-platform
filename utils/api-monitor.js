// API调用监控工具
const { performanceMonitor } = require('./performance-monitor')

class APIMonitor {
  constructor() {
    this.isEnabled = true
    this.requests = new Map()
  }

  // 监控API请求
  monitorRequest(options) {
    if (!this.isEnabled) {
      return wx.request(options)
    }

    const requestId = this.generateRequestId()
    const startTime = Date.now()
    
    // 记录请求开始
    this.requests.set(requestId, {
      url: options.url,
      method: options.method || 'GET',
      startTime: startTime,
      status: 'pending'
    })

    // 包装原始回调
    const originalSuccess = options.success
    const originalFail = options.fail
    const originalComplete = options.complete

    // 成功回调
    options.success = (res) => {
      this.recordRequest(requestId, {
        status: 'success',
        responseTime: Date.now() - startTime,
        statusCode: res.statusCode,
        data: res.data
      })
      
      if (originalSuccess) {
        originalSuccess(res)
      }
    }

    // 失败回调
    options.fail = (err) => {
      this.recordRequest(requestId, {
        status: 'fail',
        responseTime: Date.now() - startTime,
        error: err
      })
      
      if (originalFail) {
        originalFail(err)
      }
    }

    // 完成回调
    options.complete = (res) => {
      this.cleanupRequest(requestId)
      
      if (originalComplete) {
        originalComplete(res)
      }
    }

    // 发起请求
    return wx.request(options)
  }

  // 记录请求结果
  recordRequest(requestId, result) {
    const request = this.requests.get(requestId)
    if (!request) return

    const apiData = {
      ...request,
      ...result,
      timestamp: Date.now()
    }

    // 记录到性能监控
    performanceMonitor.recordAPICall(
      request.url,
      result.responseTime,
      result.status === 'success',
      {
        method: request.method,
        statusCode: result.statusCode,
        error: result.error
      }
    )

    // 检查是否为慢API
    if (result.responseTime > 2000) {
      this.recordSlowAPI(apiData)
    }

    // 检查是否为错误API
    if (result.status === 'fail' || (result.statusCode && result.statusCode >= 400)) {
      this.recordErrorAPI(apiData)
    }
  }

  // 记录慢API
  recordSlowAPI(apiData) {
    const slowAPIs = wx.getStorageSync('slowAPIs') || []
    slowAPIs.unshift({
      ...apiData,
      id: Date.now()
    })
    
    // 只保留最近50条
    if (slowAPIs.length > 50) {
      slowAPIs.splice(50)
    }
    
    wx.setStorageSync('slowAPIs', slowAPIs)
  }

  // 记录错误API
  recordErrorAPI(apiData) {
    const errorAPIs = wx.getStorageSync('errorAPIs') || []
    errorAPIs.unshift({
      ...apiData,
      id: Date.now()
    })
    
    // 只保留最近50条
    if (errorAPIs.length > 50) {
      errorAPIs.splice(50)
    }
    
    wx.setStorageSync('errorAPIs', errorAPIs)
  }

  // 清理请求记录
  cleanupRequest(requestId) {
    this.requests.delete(requestId)
  }

  // 生成请求ID
  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 获取慢API列表
  getSlowAPIs(limit = 10) {
    const slowAPIs = wx.getStorageSync('slowAPIs') || []
    return slowAPIs.slice(0, limit)
  }

  // 获取错误API列表
  getErrorAPIs(limit = 10) {
    const errorAPIs = wx.getStorageSync('errorAPIs') || []
    return errorAPIs.slice(0, limit)
  }

  // 获取API统计
  getAPIStats() {
    const slowAPIs = wx.getStorageSync('slowAPIs') || []
    const errorAPIs = wx.getStorageSync('errorAPIs') || []
    
    return {
      slowAPICount: slowAPIs.length,
      errorAPICount: errorAPIs.length,
      totalRequests: this.requests.size,
      pendingRequests: Array.from(this.requests.values()).filter(req => req.status === 'pending').length
    }
  }

  // 清理历史数据
  cleanupHistory() {
    wx.removeStorageSync('slowAPIs')
    wx.removeStorageSync('errorAPIs')
  }

  // 启用/禁用监控
  setEnabled(enabled) {
    this.isEnabled = enabled
  }
}

// 创建全局实例
const apiMonitor = new APIMonitor()

// 导出便捷方法
const monitoredRequest = (options) => {
  return apiMonitor.monitorRequest(options)
}

module.exports = {
  APIMonitor,
  apiMonitor,
  monitoredRequest
} 