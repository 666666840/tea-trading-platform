// API网关与安全系统
const { systemInfoHelper } = require('./system-info-helper')
class APIGateway {
  constructor() {
    this.securityKey = 'apiSecurity'
    this.rateLimitKey = 'apiRateLimit'
    this.blacklistKey = 'apiBlacklist'
    this.whitelistKey = 'apiWhitelist'
    
    // 安全配置
    this.securityConfig = {
      enableEncryption: true,
      enableSignature: true,
      enableRateLimit: true,
      enableBlacklist: true,
      enableTokenAuth: true,
      requestTimeout: 10000,
      maxRetries: 3,
      retryDelay: 1000
    }
    
    // 限流配置
    this.rateLimitConfig = {
      global: { requests: 1000, window: 60000 },    // 全局：1000次/分钟
      user: { requests: 100, window: 60000 },       // 用户：100次/分钟
      ip: { requests: 200, window: 60000 },         // IP：200次/分钟
      api: { requests: 500, window: 60000 }         // 单接口：500次/分钟
    }
    
    // 安全级别定义
    this.securityLevels = {
      PUBLIC: 0,     // 公开接口
      BASIC: 1,      // 基础验证
      SECURE: 2,     // 安全验证
      CRITICAL: 3    // 关键验证
    }
    
    // 请求拦截器
    this.interceptors = {
      request: [],
      response: [],
      error: []
    }
    
    // 缓存管理
    this.requestCache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存
    
    // 监控数据
    this.monitoring = {
      totalRequests: 0,
      successRequests: 0,
      failedRequests: 0,
      blockedRequests: 0,
      avgResponseTime: 0,
      securityAlerts: []
    }
    
    // 初始化
    this.initialize()
  }

  // 初始化API网关
  initialize() {
    try {
      // 加载安全配置
      this.loadSecurityConfig()
      
      // 初始化限流器
      this.initRateLimiter()
      
      // 设置默认拦截器
      this.setupDefaultInterceptors()
      
      // 启动安全监控
      this.startSecurityMonitoring()
      
      console.log('✅ API网关与安全系统初始化完成')
    } catch (error) {
      console.error('API网关初始化失败:', error)
    }
  }

  // 加载安全配置
  loadSecurityConfig() {
    try {
      const savedConfig = wx.getStorageSync(this.securityKey) || {}
      this.securityConfig = { ...this.securityConfig, ...savedConfig }
      
      // 保存配置
      wx.setStorageSync(this.securityKey, this.securityConfig)
    } catch (error) {
      console.error('加载安全配置失败:', error)
    }
  }

  // 初始化限流器
  initRateLimiter() {
    try {
      const rateLimitData = wx.getStorageSync(this.rateLimitKey) || {
        global: {},
        user: {},
        ip: {},
        api: {}
      }
      
      this.rateLimitData = rateLimitData
    } catch (error) {
      console.error('初始化限流器失败:', error)
      this.rateLimitData = { global: {}, user: {}, ip: {}, api: {} }
    }
  }

  // 设置默认拦截器
  setupDefaultInterceptors() {
    // 请求拦截器
    this.addRequestInterceptor(async (config) => {
      // 添加时间戳
      config.timestamp = Date.now()
      
      // 添加请求ID
      config.requestId = this.generateRequestId()
      
      // 安全检查
      const securityCheck = await this.performSecurityCheck(config)
      if (!securityCheck.passed) {
        throw new Error(`安全检查失败: ${securityCheck.reason}`)
      }
      
      // 限流检查
      const rateLimitCheck = await this.checkRateLimit(config)
      if (!rateLimitCheck.allowed) {
        throw new Error(`请求过于频繁，请稍后再试`)
      }
      
      return config
    })
    
    // 响应拦截器
    this.addResponseInterceptor(async (response, config) => {
      // 记录响应时间
      const responseTime = Date.now() - config.timestamp
      this.updateMonitoring('success', responseTime)
      
      // 更新缓存
      if (config.cache !== false) {
        this.updateCache(config, response)
      }
      
      // 安全响应处理
      return this.processSecureResponse(response, config)
    })
    
    // 错误拦截器
    this.addErrorInterceptor(async (error, config) => {
      this.updateMonitoring('error')
      
      // 安全事件记录
      this.recordSecurityEvent(error, config)
      
      // 自动重试
      if (config.retry && config.retryCount < this.securityConfig.maxRetries) {
        return this.retryRequest(config)
      }
      
      throw error
    })
  }

  // 发起安全请求
  async secureRequest(config) {
    try {
      this.monitoring.totalRequests++
      
      // 检查缓存
      if (config.cache !== false) {
        const cachedResponse = this.getFromCache(config)
        if (cachedResponse) {
          return cachedResponse
        }
      }
      
      // 应用请求拦截器
      let processedConfig = config
      for (const interceptor of this.interceptors.request) {
        processedConfig = await interceptor(processedConfig)
      }
      
      // 执行请求
      const response = await this.executeRequest(processedConfig)
      
      // 应用响应拦截器
      let processedResponse = response
      for (const interceptor of this.interceptors.response) {
        processedResponse = await interceptor(processedResponse, processedConfig)
      }
      
      return processedResponse
      
    } catch (error) {
      // 应用错误拦截器
      for (const interceptor of this.interceptors.error) {
        await interceptor(error, config)
      }
      throw error
    }
  }

  // 执行实际请求
  async executeRequest(config) {
    return new Promise((resolve, reject) => {
      const requestConfig = {
        url: config.url,
        method: config.method || 'GET',
        data: config.data,
        header: {
          'Content-Type': 'application/json',
          'X-Request-ID': config.requestId,
          'X-Timestamp': config.timestamp,
          ...config.header
        },
        timeout: config.timeout || this.securityConfig.requestTimeout,
        success: (res) => {
          resolve({
            data: res.data,
            statusCode: res.statusCode,
            header: res.header,
            config: config
          })
        },
        fail: (error) => {
          reject(new Error(`请求失败: ${error.errMsg}`))
        }
      }
      
      // 添加安全头
      this.addSecurityHeaders(requestConfig, config)
      
      wx.request(requestConfig)
    })
  }

  // 执行安全检查
  async performSecurityCheck(config) {
    try {
      const securityLevel = config.securityLevel || this.securityLevels.BASIC
      
      // 检查黑名单
      if (await this.isBlacklisted(config)) {
        return { passed: false, reason: '请求被黑名单拦截' }
      }
      
      // 检查白名单（如果启用）
      if (this.securityConfig.enableWhitelist && !(await this.isWhitelisted(config))) {
        return { passed: false, reason: '请求不在白名单中' }
      }
      
      // Token验证
      if (securityLevel >= this.securityLevels.BASIC && this.securityConfig.enableTokenAuth) {
        if (!await this.validateToken(config)) {
          return { passed: false, reason: 'Token验证失败' }
        }
      }
      
      // 签名验证
      if (securityLevel >= this.securityLevels.SECURE && this.securityConfig.enableSignature) {
        if (!await this.validateSignature(config)) {
          return { passed: false, reason: '签名验证失败' }
        }
      }
      
      // 请求内容安全检查
      if (securityLevel >= this.securityLevels.CRITICAL) {
        const contentCheck = await this.checkRequestContent(config)
        if (!contentCheck.safe) {
          return { passed: false, reason: contentCheck.reason }
        }
      }
      
      return { passed: true }
      
    } catch (error) {
      console.error('安全检查失败:', error)
      return { passed: false, reason: '安全检查异常' }
    }
  }

  // 检查限流
  async checkRateLimit(config) {
    try {
      const now = Date.now()
      const userId = this.getCurrentUserId()
      const clientIP = await this.getClientIP()
      const apiEndpoint = this.getAPIEndpoint(config.url)
      
      // 检查全局限流
      if (!this.checkRateLimitForKey('global', 'global', now, this.rateLimitConfig.global)) {
        this.recordSecurityEvent('rate_limit_global', config)
        return { allowed: false, reason: '全局限流' }
      }
      
      // 检查用户限流
      if (userId && !this.checkRateLimitForKey('user', userId, now, this.rateLimitConfig.user)) {
        this.recordSecurityEvent('rate_limit_user', config)
        return { allowed: false, reason: '用户限流' }
      }
      
      // 检查IP限流
      if (clientIP && !this.checkRateLimitForKey('ip', clientIP, now, this.rateLimitConfig.ip)) {
        this.recordSecurityEvent('rate_limit_ip', config)
        return { allowed: false, reason: 'IP限流' }
      }
      
      // 检查API限流
      if (!this.checkRateLimitForKey('api', apiEndpoint, now, this.rateLimitConfig.api)) {
        this.recordSecurityEvent('rate_limit_api', config)
        return { allowed: false, reason: 'API限流' }
      }
      
      return { allowed: true }
      
    } catch (error) {
      console.error('限流检查失败:', error)
      return { allowed: true } // 发生错误时默认允许请求
    }
  }

  // 检查特定键的限流
  checkRateLimitForKey(type, key, now, config) {
    const rateLimitData = this.rateLimitData[type]
    
    if (!rateLimitData[key]) {
      rateLimitData[key] = { count: 0, windowStart: now }
    }
    
    const data = rateLimitData[key]
    
    // 检查是否需要重置窗口
    if (now - data.windowStart > config.window) {
      data.count = 0
      data.windowStart = now
    }
    
    // 检查是否超过限制
    if (data.count >= config.requests) {
      return false
    }
    
    // 增加计数
    data.count++
    
    // 保存限流数据
    this.saveRateLimitData()
    
    return true
  }

  // 保存限流数据
  saveRateLimitData() {
    try {
      wx.setStorageSync(this.rateLimitKey, this.rateLimitData)
    } catch (error) {
      console.error('保存限流数据失败:', error)
    }
  }

  // 检查黑名单
  async isBlacklisted(config) {
    try {
      const blacklist = wx.getStorageSync(this.blacklistKey) || []
      const userId = this.getCurrentUserId()
      const clientIP = await this.getClientIP()
      
      return blacklist.some(item => 
        item.type === 'user' && item.value === userId ||
        item.type === 'ip' && item.value === clientIP ||
        item.type === 'api' && config.url.includes(item.value)
      )
    } catch (error) {
      console.error('检查黑名单失败:', error)
      return false
    }
  }

  // 检查白名单
  async isWhitelisted(config) {
    try {
      const whitelist = wx.getStorageSync(this.whitelistKey) || []
      if (whitelist.length === 0) return true // 空白名单表示允许所有
      
      const userId = this.getCurrentUserId()
      const clientIP = await this.getClientIP()
      
      return whitelist.some(item => 
        item.type === 'user' && item.value === userId ||
        item.type === 'ip' && item.value === clientIP ||
        item.type === 'api' && config.url.includes(item.value)
      )
    } catch (error) {
      console.error('检查白名单失败:', error)
      return true
    }
  }

  // 验证Token
  async validateToken(config) {
    try {
      const token = config.token || this.getStoredToken()
      if (!token) return false
      
      // 简单的Token验证（实际应用中应该调用认证服务）
      const tokenData = this.parseToken(token)
      if (!tokenData || tokenData.expired) {
        return false
      }
      
      return true
    } catch (error) {
      console.error('Token验证失败:', error)
      return false
    }
  }

  // 验证签名
  async validateSignature(config) {
    try {
      const signature = config.signature
      if (!signature) return false
      
      // 计算期望的签名
      const expectedSignature = this.calculateSignature(config)
      
      return signature === expectedSignature
    } catch (error) {
      console.error('签名验证失败:', error)
      return false
    }
  }

  // 检查请求内容
  async checkRequestContent(config) {
    try {
      const content = JSON.stringify(config.data || {})
      
      // 检查恶意内容
      const maliciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /<iframe/i
      ]
      
      for (const pattern of maliciousPatterns) {
        if (pattern.test(content)) {
          return { safe: false, reason: '检测到潜在恶意内容' }
        }
      }
      
      // 检查敏感信息
      const sensitivePatterns = [
        /password/i,
        /secret/i,
        /private_key/i,
        /access_token/i
      ]
      
      for (const pattern of sensitivePatterns) {
        if (pattern.test(content)) {
          console.warn('⚠️ 请求包含敏感信息')
        }
      }
      
      return { safe: true }
      
    } catch (error) {
      console.error('内容安全检查失败:', error)
      return { safe: true }
    }
  }

  // 添加安全头
  addSecurityHeaders(requestConfig, config) {
    // 添加认证头
    const token = config.token || this.getStoredToken()
    if (token) {
      requestConfig.header['Authorization'] = `Bearer ${token}`
    }
    
    // 添加签名头
    if (this.securityConfig.enableSignature) {
      const signature = this.calculateSignature(config)
      requestConfig.header['X-Signature'] = signature
    }
    
    // 添加其他安全头
    requestConfig.header['X-Client-Version'] = this.getClientVersion()
    requestConfig.header['X-Client-ID'] = this.getClientId()
  }

  // 处理安全响应
  async processSecureResponse(response, config) {
    try {
      // 验证响应签名
      if (this.securityConfig.enableSignature && response.header['X-Response-Signature']) {
        const isValid = this.validateResponseSignature(response)
        if (!isValid) {
          throw new Error('响应签名验证失败')
        }
      }
      
      // 解密响应数据
      if (this.securityConfig.enableEncryption && response.data.encrypted) {
        response.data = this.decryptResponseData(response.data)
      }
      
      return response
    } catch (error) {
      console.error('安全响应处理失败:', error)
      throw error
    }
  }

  // 记录安全事件
  recordSecurityEvent(event, config, severity = 'warning') {
    const securityEvent = {
      id: this.generateEventId(),
      event: event,
      severity: severity,
      timestamp: Date.now(),
      config: {
        url: config.url,
        method: config.method,
        requestId: config.requestId
      },
      user: this.getCurrentUserId(),
      clientInfo: this.getClientInfo()
    }
    
    this.monitoring.securityAlerts.push(securityEvent)
    
    // 限制事件数量
    if (this.monitoring.securityAlerts.length > 1000) {
      this.monitoring.securityAlerts.shift()
    }
    
    // 严重事件立即报告
    if (severity === 'critical') {
      this.reportCriticalEvent(securityEvent)
    }
  }

  // 报告关键事件
  reportCriticalEvent(event) {
    console.error('🚨 关键安全事件:', event)
    
    // 可以在这里添加报警逻辑
    // 例如：发送到监控系统、记录到日志等
  }

  // 重试请求
  async retryRequest(config) {
    const delay = this.securityConfig.retryDelay * Math.pow(2, config.retryCount || 0)
    
    await new Promise(resolve => setTimeout(resolve, delay))
    
    config.retryCount = (config.retryCount || 0) + 1
    
    return this.secureRequest(config)
  }

  // 缓存管理
  getFromCache(config) {
    const cacheKey = this.generateCacheKey(config)
    const cached = this.requestCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }
    
    return null
  }

  updateCache(config, response) {
    const cacheKey = this.generateCacheKey(config)
    this.requestCache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    })
    
    // 清理过期缓存
    if (this.requestCache.size > 100) {
      this.cleanupCache()
    }
  }

  cleanupCache() {
    const now = Date.now()
    for (const [key, value] of this.requestCache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.requestCache.delete(key)
      }
    }
  }

  // 更新监控数据
  updateMonitoring(type, responseTime = 0) {
    switch (type) {
      case 'success':
        this.monitoring.successRequests++
        this.updateAverageResponseTime(responseTime)
        break
      case 'error':
        this.monitoring.failedRequests++
        break
      case 'blocked':
        this.monitoring.blockedRequests++
        break
    }
  }

  updateAverageResponseTime(responseTime) {
    const total = this.monitoring.successRequests
    const current = this.monitoring.avgResponseTime
    this.monitoring.avgResponseTime = ((current * (total - 1)) + responseTime) / total
  }

  // 启动安全监控
  startSecurityMonitoring() {
    setInterval(() => {
      this.performSecurityScan()
    }, 60000) // 每分钟扫描一次
  }

  // 执行安全扫描
  async performSecurityScan() {
    try {
      // 检查异常流量
      await this.checkAbnormalTraffic()
      
      // 检查安全配置
      await this.checkSecurityConfiguration()
      
      // 清理过期数据
      await this.cleanupSecurityData()
      
    } catch (error) {
      console.error('安全扫描失败:', error)
    }
  }

  // 检查异常流量
  async checkAbnormalTraffic() {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    
    const recentAlerts = this.monitoring.securityAlerts.filter(alert => 
      alert.timestamp > oneMinuteAgo
    )
    
    // 如果1分钟内有超过10个安全事件，标记为异常
    if (recentAlerts.length > 10) {
      this.recordSecurityEvent('abnormal_traffic', {
        url: 'system',
        method: 'SCAN'
      }, 'critical')
    }
  }

  // 检查安全配置
  async checkSecurityConfiguration() {
    const issues = []
    
    if (!this.securityConfig.enableEncryption) {
      issues.push('加密功能未启用')
    }
    
    if (!this.securityConfig.enableSignature) {
      issues.push('签名验证未启用')
    }
    
    if (!this.securityConfig.enableRateLimit) {
      issues.push('限流功能未启用')
    }
    
    if (issues.length > 0) {
      console.warn('⚠️ 安全配置问题:', issues)
    }
  }

  // 清理安全数据
  async cleanupSecurityData() {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    
    // 清理过期的安全事件
    this.monitoring.securityAlerts = this.monitoring.securityAlerts.filter(alert => 
      alert.timestamp > oneWeekAgo
    )
    
    // 清理过期的限流数据
    Object.keys(this.rateLimitData).forEach(type => {
      Object.keys(this.rateLimitData[type]).forEach(key => {
        const data = this.rateLimitData[type][key]
        if (Date.now() - data.windowStart > this.rateLimitConfig[type]?.window * 2) {
          delete this.rateLimitData[type][key]
        }
      })
    })
    
    this.saveRateLimitData()
  }

  // 拦截器管理
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor)
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor)
  }

  addErrorInterceptor(interceptor) {
    this.interceptors.error.push(interceptor)
  }

  // 工具方法
  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateCacheKey(config) {
    return `${config.method || 'GET'}_${config.url}_${JSON.stringify(config.data || {})}`
  }

  getCurrentUserId() {
    const app = getApp()
    return app.globalData.userInfo?.id || 'anonymous'
  }

  async getClientIP() {
    // 小程序无法直接获取客户端IP，返回设备标识
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      return `device_${systemInfo.model}_${systemInfo.brand}`
    } catch (error) {
      return 'unknown_device'
    }
  }

  getAPIEndpoint(url) {
    try {
      const urlObj = new URL(url)
      return urlObj.pathname
    } catch (error) {
      return url
    }
  }

  getStoredToken() {
    try {
      const authData = wx.getStorageSync('userAuth')
      return authData?.token || null
    } catch (error) {
      return null
    }
  }

  parseToken(token) {
    try {
      // 简单的Token解析（实际应用中应该使用JWT等标准格式）
      const parts = token.split('.')
      if (parts.length !== 3) return null
      
      const payload = JSON.parse(atob(parts[1]))
      const now = Date.now() / 1000
      
      return {
        ...payload,
        expired: payload.exp && payload.exp < now
      }
    } catch (error) {
      return null
    }
  }

  calculateSignature(config) {
    // 简化的签名计算（实际应用中应该使用HMAC等安全算法）
    const data = `${config.method || 'GET'}${config.url}${JSON.stringify(config.data || {})}${config.timestamp}`
    return btoa(data).substr(0, 32)
  }

  validateResponseSignature(response) {
    // 简化的响应签名验证
    return true
  }

  decryptResponseData(encryptedData) {
    // 简化的解密逻辑
    return encryptedData
  }

  getClientVersion() {
    const app = getApp()
    return app.globalData.version || '1.0.0'
  }

  getClientId() {
    try {
      let clientId = wx.getStorageSync('clientId')
      if (!clientId) {
        clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        wx.setStorageSync('clientId', clientId)
      }
      return clientId
    } catch (error) {
      return 'unknown_client'
    }
  }

  getClientInfo() {
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      return {
        platform: systemInfo.platform,
        version: systemInfo.version,
        model: systemInfo.model,
        brand: systemInfo.brand
      }
    } catch (error) {
      return {}
    }
  }

  // 获取安全报告
  getSecurityReport() {
    return {
      monitoring: this.monitoring,
      securityConfig: this.securityConfig,
      rateLimitConfig: this.rateLimitConfig,
      recentAlerts: this.monitoring.securityAlerts.slice(-20),
      cacheStats: {
        size: this.requestCache.size,
        hitRate: this.calculateCacheHitRate()
      }
    }
  }

  calculateCacheHitRate() {
    // 简化的缓存命中率计算
    return this.monitoring.totalRequests > 0 ? 
      (this.monitoring.successRequests / this.monitoring.totalRequests) * 0.3 : 0
  }

  // 管理黑白名单
  async addToBlacklist(type, value, reason = '') {
    try {
      const blacklist = wx.getStorageSync(this.blacklistKey) || []
      blacklist.push({
        id: this.generateEventId(),
        type: type,
        value: value,
        reason: reason,
        timestamp: Date.now()
      })
      
      wx.setStorageSync(this.blacklistKey, blacklist)
      
      this.recordSecurityEvent('blacklist_add', {
        url: 'system',
        method: 'ADMIN'
      }, 'info')
      
    } catch (error) {
      console.error('添加黑名单失败:', error)
    }
  }

  async removeFromBlacklist(id) {
    try {
      const blacklist = wx.getStorageSync(this.blacklistKey) || []
      const filteredList = blacklist.filter(item => item.id !== id)
      
      wx.setStorageSync(this.blacklistKey, filteredList)
      
    } catch (error) {
      console.error('移除黑名单失败:', error)
    }
  }
}

// 创建全局API网关实例
const apiGateway = new APIGateway()

// 导出便捷方法
const Gateway = {
  // 安全请求
  async request(config) {
    return apiGateway.secureRequest(config)
  },

  // 拦截器管理
  addRequestInterceptor(interceptor) {
    return apiGateway.addRequestInterceptor(interceptor)
  },

  addResponseInterceptor(interceptor) {
    return apiGateway.addResponseInterceptor(interceptor)
  },

  addErrorInterceptor(interceptor) {
    return apiGateway.addErrorInterceptor(interceptor)
  },

  // 安全管理
  getSecurityReport() {
    return apiGateway.getSecurityReport()
  },

  async addToBlacklist(type, value, reason) {
    return apiGateway.addToBlacklist(type, value, reason)
  },

  async removeFromBlacklist(id) {
    return apiGateway.removeFromBlacklist(id)
  },

  // 配置管理
  updateSecurityConfig(config) {
    apiGateway.securityConfig = { ...apiGateway.securityConfig, ...config }
    wx.setStorageSync(apiGateway.securityKey, apiGateway.securityConfig)
  },

  updateRateLimitConfig(config) {
    apiGateway.rateLimitConfig = { ...apiGateway.rateLimitConfig, ...config }
  },

  // 常量
  SECURITY_LEVELS: apiGateway.securityLevels
}

module.exports = {
  APIGateway,
  Gateway,
  apiGateway
} 