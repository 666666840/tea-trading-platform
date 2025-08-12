// 埋点数据收集器
const fs = require('fs')
const path = require('path')

class AnalyticsTracker {
  constructor() {
    this.trackingData = {
      events: [],
      users: {},
      sessions: {},
      pages: {},
      features: {},
      errors: [],
      performance: {
        pageLoads: [],
        apiCalls: [],
        userActions: []
      }
    }
    
    this.config = {
      enabled: true,
      logToFile: true,
      maxRecords: 50000,
      sessionTimeout: 30 * 60 * 1000, // 30分钟
      dataFile: 'analytics-data.json',
      logFile: 'analytics.log'
    }
    
    this.init()
  }

  // 初始化
  init() {
    this.loadData()
    this.startCleanupTimer()
    console.log('📈 埋点数据收集器已启动')
  }

  // 追踪页面访问
  trackPageView(pageInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'page_view',
      timestamp: new Date().toISOString(),
      page: pageInfo.page,
      title: pageInfo.title || pageInfo.page,
      referrer: pageInfo.referrer || '',
      userAgent: pageInfo.userAgent || '',
      ip: pageInfo.ip || '',
      sessionId: pageInfo.sessionId || this.generateSessionId(),
      userId: pageInfo.userId || 'anonymous',
      loadTime: pageInfo.loadTime || 0,
      screenSize: pageInfo.screenSize || '',
      platform: pageInfo.platform || 'unknown'
    }
    
    this.recordEvent(event)
    this.updatePageStats(event)
    this.updateSessionStats(event)
  }

  // 追踪用户行为
  trackUserAction(actionInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'user_action',
      timestamp: new Date().toISOString(),
      action: actionInfo.action,
      element: actionInfo.element || '',
      page: actionInfo.page || '',
      value: actionInfo.value || '',
      sessionId: actionInfo.sessionId || '',
      userId: actionInfo.userId || 'anonymous',
      category: actionInfo.category || 'general',
      label: actionInfo.label || '',
      properties: actionInfo.properties || {}
    }
    
    this.recordEvent(event)
    this.updateFeatureStats(event)
  }

  // 追踪API调用
  trackAPICall(apiInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'api_call',
      timestamp: new Date().toISOString(),
      method: apiInfo.method,
      url: apiInfo.url,
      statusCode: apiInfo.statusCode,
      responseTime: apiInfo.responseTime,
      success: apiInfo.success,
      sessionId: apiInfo.sessionId || '',
      userId: apiInfo.userId || 'anonymous',
      page: apiInfo.page || '',
      error: apiInfo.error || null
    }
    
    this.recordEvent(event)
    this.updateAPIPerformance(event)
  }

  // 追踪错误
  trackError(errorInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'error',
      timestamp: new Date().toISOString(),
      error: errorInfo.error,
      message: errorInfo.message,
      stack: errorInfo.stack,
      page: errorInfo.page || '',
      sessionId: errorInfo.sessionId || '',
      userId: errorInfo.userId || 'anonymous',
      severity: errorInfo.severity || 'error',
      context: errorInfo.context || {}
    }
    
    this.recordEvent(event)
    this.recordError(event)
  }

  // 追踪业务事件
  trackBusinessEvent(eventInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'business_event',
      timestamp: new Date().toISOString(),
      event: eventInfo.event,
      category: eventInfo.category,
      value: eventInfo.value || 0,
      properties: eventInfo.properties || {},
      sessionId: eventInfo.sessionId || '',
      userId: eventInfo.userId || 'anonymous',
      page: eventInfo.page || ''
    }
    
    this.recordEvent(event)
    this.updateBusinessStats(event)
  }

  // 追踪性能指标
  trackPerformance(perfInfo) {
    if (!this.config.enabled) return
    
    const event = {
      type: 'performance',
      timestamp: new Date().toISOString(),
      metric: perfInfo.metric,
      value: perfInfo.value,
      unit: perfInfo.unit || 'ms',
      page: perfInfo.page || '',
      sessionId: perfInfo.sessionId || '',
      userId: perfInfo.userId || 'anonymous',
      context: perfInfo.context || {}
    }
    
    this.recordEvent(event)
    this.updatePerformanceStats(event)
  }

  // 记录事件
  recordEvent(event) {
    try {
      this.trackingData.events.push(event)
      
      // 限制记录数量
      if (this.trackingData.events.length > this.config.maxRecords) {
        this.trackingData.events.shift()
      }
      
      // 记录到文件
      if (this.config.logToFile) {
        this.logToFile(event)
      }
      
    } catch (error) {
      console.error('埋点事件记录失败:', error)
    }
  }

  // 更新页面统计
  updatePageStats(event) {
    const page = event.page
    if (!this.trackingData.pages[page]) {
      this.trackingData.pages[page] = {
        views: 0,
        uniqueUsers: new Set(),
        avgLoadTime: 0,
        lastViewed: null
      }
    }
    
    this.trackingData.pages[page].views++
    this.trackingData.pages[page].uniqueUsers.add(event.userId)
    this.trackingData.pages[page].lastViewed = event.timestamp
    
    // 更新平均加载时间
    const currentAvg = this.trackingData.pages[page].avgLoadTime
    const totalViews = this.trackingData.pages[page].views
    this.trackingData.pages[page].avgLoadTime = 
      (currentAvg * (totalViews - 1) + event.loadTime) / totalViews
  }

  // 更新会话统计
  updateSessionStats(event) {
    const sessionId = event.sessionId
    if (!this.trackingData.sessions[sessionId]) {
      this.trackingData.sessions[sessionId] = {
        userId: event.userId,
        startTime: event.timestamp,
        lastActivity: event.timestamp,
        pageViews: 0,
        actions: 0,
        apiCalls: 0,
        errors: 0
      }
    }
    
    this.trackingData.sessions[sessionId].lastActivity = event.timestamp
    this.trackingData.sessions[sessionId].pageViews++
  }

  // 更新功能统计
  updateFeatureStats(event) {
    const feature = event.action
    if (!this.trackingData.features[feature]) {
      this.trackingData.features[feature] = {
        uses: 0,
        uniqueUsers: new Set(),
        lastUsed: null,
        successRate: 100
      }
    }
    
    this.trackingData.features[feature].uses++
    this.trackingData.features[feature].uniqueUsers.add(event.userId)
    this.trackingData.features[feature].lastUsed = event.timestamp
  }

  // 更新API性能统计
  updateAPIPerformance(event) {
    this.trackingData.performance.apiCalls.push({
      url: event.url,
      method: event.method,
      responseTime: event.responseTime,
      success: event.success,
      timestamp: event.timestamp
    })
    
    // 限制记录数量
    if (this.trackingData.performance.apiCalls.length > 1000) {
      this.trackingData.performance.apiCalls.shift()
    }
  }

  // 记录错误
  recordError(event) {
    this.trackingData.errors.push(event)
    
    if (this.trackingData.errors.length > 1000) {
      this.trackingData.errors.shift()
    }
  }

  // 更新业务统计
  updateBusinessStats(event) {
    // 根据业务事件类型更新相应统计
    const eventType = event.event
    if (!this.trackingData.businessStats) {
      this.trackingData.businessStats = {}
    }
    
    if (!this.trackingData.businessStats[eventType]) {
      this.trackingData.businessStats[eventType] = {
        count: 0,
        totalValue: 0,
        uniqueUsers: new Set()
      }
    }
    
    this.trackingData.businessStats[eventType].count++
    this.trackingData.businessStats[eventType].totalValue += event.value
    this.trackingData.businessStats[eventType].uniqueUsers.add(event.userId)
  }

  // 更新性能统计
  updatePerformanceStats(event) {
    this.trackingData.performance[event.metric] = this.trackingData.performance[event.metric] || []
    this.trackingData.performance[event.metric].push({
      value: event.value,
      timestamp: event.timestamp,
      page: event.page
    })
    
    // 限制记录数量
    if (this.trackingData.performance[event.metric].length > 1000) {
      this.trackingData.performance[event.metric].shift()
    }
  }

  // 生成会话ID
  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // 记录到文件
  logToFile(event) {
    try {
      const logEntry = {
        timestamp: event.timestamp,
        type: event.type,
        ...event
      }
      
      const logLine = JSON.stringify(logEntry) + '\n'
      fs.appendFileSync(this.config.logFile, logLine)
    } catch (error) {
      console.error('写入埋点日志失败:', error)
    }
  }

  // 获取埋点数据
  getAnalyticsData() {
    return {
      ...this.trackingData,
      config: this.config,
      summary: this.generateSummary()
    }
  }

  // 生成摘要
  generateSummary() {
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000
    const oneDayAgo = now - 24 * 60 * 60 * 1000
    
    const hourlyEvents = this.trackingData.events.filter(
      event => event.timestamp > new Date(oneHourAgo).toISOString()
    ).length
    
    const dailyEvents = this.trackingData.events.filter(
      event => event.timestamp > new Date(oneDayAgo).toISOString()
    ).length
    
    const activeSessions = Object.values(this.trackingData.sessions).filter(
      session => session.lastActivity > new Date(now - this.config.sessionTimeout).toISOString()
    ).length
    
    const totalPages = Object.keys(this.trackingData.pages).length
    const totalFeatures = Object.keys(this.trackingData.features).length
    
    return {
      hourlyEvents,
      dailyEvents,
      activeSessions,
      totalPages,
      totalFeatures,
      totalErrors: this.trackingData.errors.length
    }
  }

  // 获取页面统计
  getPageStats() {
    const pageStats = {}
    Object.keys(this.trackingData.pages).forEach(page => {
      const stats = this.trackingData.pages[page]
      pageStats[page] = {
        views: stats.views,
        uniqueUsers: stats.uniqueUsers.size,
        avgLoadTime: Math.round(stats.avgLoadTime),
        lastViewed: stats.lastViewed
      }
    })
    return pageStats
  }

  // 获取功能统计
  getFeatureStats() {
    const featureStats = {}
    Object.keys(this.trackingData.features).forEach(feature => {
      const stats = this.trackingData.features[feature]
      featureStats[feature] = {
        uses: stats.uses,
        uniqueUsers: stats.uniqueUsers.size,
        lastUsed: stats.lastUsed,
        successRate: stats.successRate
      }
    })
    return featureStats
  }

  // 获取用户行为路径
  getUserJourney(userId) {
    return this.trackingData.events
      .filter(event => event.userId === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }

  // 获取热门页面
  getPopularPages(limit = 10) {
    const pages = Object.keys(this.trackingData.pages).map(page => ({
      page,
      views: this.trackingData.pages[page].views,
      uniqueUsers: this.trackingData.pages[page].uniqueUsers.size
    }))
    
    return pages
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
  }

  // 获取热门功能
  getPopularFeatures(limit = 10) {
    const features = Object.keys(this.trackingData.features).map(feature => ({
      feature,
      uses: this.trackingData.features[feature].uses,
      uniqueUsers: this.trackingData.features[feature].uniqueUsers.size
    }))
    
    return features
      .sort((a, b) => b.uses - a.uses)
      .slice(0, limit)
  }

  // 获取错误统计
  getErrorStats() {
    const errorStats = {}
    this.trackingData.errors.forEach(error => {
      const key = error.message || error.error
      if (!errorStats[key]) {
        errorStats[key] = {
          count: 0,
          pages: new Set(),
          users: new Set(),
          lastOccurred: null
        }
      }
      
      errorStats[key].count++
      errorStats[key].pages.add(error.page)
      errorStats[key].users.add(error.userId)
      errorStats[key].lastOccurred = error.timestamp
    })
    
    // 转换为可序列化格式
    Object.keys(errorStats).forEach(key => {
      errorStats[key].pages = Array.from(errorStats[key].pages)
      errorStats[key].users = Array.from(errorStats[key].users)
    })
    
    return errorStats
  }

  // 清理旧数据
  cleanup() {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    
    // 清理旧事件
    this.trackingData.events = this.trackingData.events.filter(
      event => event.timestamp > oneMonthAgo
    )
    
    // 清理旧错误
    this.trackingData.errors = this.trackingData.errors.filter(
      error => error.timestamp > oneMonthAgo
    )
    
    // 清理过期会话
    const now = Date.now()
    Object.keys(this.trackingData.sessions).forEach(sessionId => {
      const session = this.trackingData.sessions[sessionId]
      if (session.lastActivity < new Date(now - this.config.sessionTimeout).toISOString()) {
        delete this.trackingData.sessions[sessionId]
      }
    })
    
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
      // 转换Set为数组以便序列化
      const serializableData = JSON.parse(JSON.stringify(this.trackingData, (key, value) => {
        if (value instanceof Set) {
          return Array.from(value)
        }
        return value
      }))
      
      fs.writeFileSync(this.config.dataFile, JSON.stringify(serializableData, null, 2))
    } catch (error) {
      console.error('保存埋点数据失败:', error)
    }
  }

  // 加载数据
  loadData() {
    try {
      if (fs.existsSync(this.config.dataFile)) {
        const data = fs.readFileSync(this.config.dataFile, 'utf8')
        const parsedData = JSON.parse(data)
        
        // 转换数组回Set
        Object.keys(parsedData.pages || {}).forEach(page => {
          if (parsedData.pages[page].uniqueUsers) {
            parsedData.pages[page].uniqueUsers = new Set(parsedData.pages[page].uniqueUsers)
          }
        })
        
        Object.keys(parsedData.features || {}).forEach(feature => {
          if (parsedData.features[feature].uniqueUsers) {
            parsedData.features[feature].uniqueUsers = new Set(parsedData.features[feature].uniqueUsers)
          }
        })
        
        this.trackingData = parsedData
      }
    } catch (error) {
      console.error('加载埋点数据失败:', error)
    }
  }

  // 重置数据
  reset() {
    this.trackingData = {
      events: [],
      users: {},
      sessions: {},
      pages: {},
      features: {},
      errors: [],
      performance: {
        pageLoads: [],
        apiCalls: [],
        userActions: []
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
const analyticsTracker = new AnalyticsTracker()

module.exports = analyticsTracker 