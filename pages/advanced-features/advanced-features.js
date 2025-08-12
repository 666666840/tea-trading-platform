const { Search } = require('../../utils/search-manager.js')
const { Payment } = require('../../utils/payment-manager.js')
const { Realtime } = require('../../utils/realtime-manager.js')
const { Performance } = require('../../utils/performance-monitor.js')
const { Gateway } = require('../../utils/api-gateway.js')

Page({
  data: {
    activeTab: 'search',
    tabs: [
      { id: 'search', name: '智能搜索', icon: '🔍' },
      { id: 'payment', name: '支付系统', icon: '💳' },
      { id: 'realtime', name: '实时通信', icon: '💬' },
      { id: 'performance', name: '性能监控', icon: '📊' },
      { id: 'security', name: '安全网关', icon: '🔒' }
    ],
    
    // 搜索功能演示
    searchDemoData: {
      keyword: '',
      searchResults: [],
      searchSuggestions: [],
      searchAnalytics: null,
      smartSuggestions: [],
      isSearching: false
    },
    
    // 支付功能演示
    paymentDemoData: {
      demoOrder: null,
      userWallet: null,
      paymentStats: null,
      paymentMethods: []
    },
    
    // 实时通信演示
    realtimeDemoData: {
      conversations: [],
      currentConversation: null,
      messages: [],
      connectionState: null,
      onlineUsers: [],
      realtimeStats: null
    },
    
    // 性能监控演示
    performanceDemoData: {
      performanceReport: null,
      optimizationSuggestions: [],
      monitoringStatus: null
    },
    
    // 安全网关演示
    securityDemoData: {
      securityReport: null,
      recentAlerts: [],
      rateLimitStatus: null
    }
  },

  onLoad() {
    console.log('🚀 高优先级功能演示页面加载')
    
    // 记录页面加载性能
    Performance.recordPageLoad('advanced-features', Date.now())
    
    // 初始化演示数据
    this.initializeDemoData()
  },

  onShow() {
    // 记录用户操作
    Performance.recordUserAction('page_view', 'advanced_features')
  },

  // 初始化演示数据
  async initializeDemoData() {
    try {
      wx.showLoading({ title: '初始化中...' })
      
      // 初始化搜索演示
      await this.initSearchDemo()
      
      // 初始化支付演示
      await this.initPaymentDemo()
      
      // 初始化实时通信演示
      await this.initRealtimeDemo()
      
      // 初始化性能监控演示
      await this.initPerformanceDemo()
      
      // 初始化安全网关演示
      await this.initSecurityDemo()
      
      wx.hideLoading()
      console.log('✅ 演示数据初始化完成')
      
    } catch (error) {
      wx.hideLoading()
      console.error('演示数据初始化失败:', error)
      Performance.recordError(error, { context: 'demo_initialization' })
    }
  },

  // 初始化搜索演示
  async initSearchDemo() {
    try {
      // 获取搜索分析
      const searchAnalytics = Search.getAnalytics()
      
      // 获取智能建议
      const smartSuggestions = Search.getSmartSuggestions({
        page: 'advanced_features',
        province: '广东'
      })
      
      this.setData({
        'searchDemoData.searchAnalytics': searchAnalytics,
        'searchDemoData.smartSuggestions': smartSuggestions
      })
      
    } catch (error) {
      console.error('搜索演示初始化失败:', error)
    }
  },

  // 初始化支付演示
  async initPaymentDemo() {
    try {
      // 获取用户钱包
      const userWallet = await Payment.getWallet()
      
      // 获取支付统计
      const paymentStats = Payment.getStats()
      
      // 支付方式列表
      const paymentMethods = [
        { id: Payment.PAYMENT_METHODS.WECHAT, name: '微信支付', icon: '💚' },
        { id: Payment.PAYMENT_METHODS.ALIPAY, name: '支付宝', icon: '💙' },
        { id: Payment.PAYMENT_METHODS.BALANCE, name: '余额支付', icon: '💰' },
        { id: Payment.PAYMENT_METHODS.BANK, name: '银行卡', icon: '💳' }
      ]
      
      this.setData({
        'paymentDemoData.userWallet': userWallet,
        'paymentDemoData.paymentStats': paymentStats,
        'paymentDemoData.paymentMethods': paymentMethods
      })
      
    } catch (error) {
      console.error('支付演示初始化失败:', error)
    }
  },

  // 初始化实时通信演示
  async initRealtimeDemo() {
    try {
      const userId = this.getCurrentUserId()
      
      // 获取会话列表
      const conversations = await Realtime.getConversations(userId)
      
      // 获取连接状态
      const connectionState = Realtime.getConnectionState()
      
      // 获取统计信息
      const realtimeStats = Realtime.getStats()
      
      this.setData({
        'realtimeDemoData.conversations': conversations,
        'realtimeDemoData.connectionState': connectionState,
        'realtimeDemoData.realtimeStats': realtimeStats
      })
      
      // 设置事件监听
      this.setupRealtimeListeners()
      
    } catch (error) {
      console.error('实时通信演示初始化失败:', error)
    }
  },

  // 初始化性能监控演示
  async initPerformanceDemo() {
    try {
      // 获取性能报告
      const performanceReport = Performance.getReport()
      
      // 获取优化建议
      const optimizationSuggestions = Performance.getSuggestions()
      
      // 获取监控状态
      const monitoringStatus = Performance.getStatus()
      
      this.setData({
        'performanceDemoData.performanceReport': performanceReport,
        'performanceDemoData.optimizationSuggestions': optimizationSuggestions,
        'performanceDemoData.monitoringStatus': monitoringStatus
      })
      
    } catch (error) {
      console.error('性能监控演示初始化失败:', error)
    }
  },

  // 初始化安全网关演示
  async initSecurityDemo() {
    try {
      // 获取安全报告
      const securityReport = Gateway.getSecurityReport()
      
      this.setData({
        'securityDemoData.securityReport': securityReport,
        'securityDemoData.recentAlerts': securityReport.recentAlerts || []
      })
      
    } catch (error) {
      console.error('安全网关演示初始化失败:', error)
    }
  },

  // 设置实时通信监听
  setupRealtimeListeners() {
    // 监听连接状态变化
    Realtime.on('connectionChange', (data) => {
      this.setData({
        'realtimeDemoData.connectionState': data
      })
    })
    
    // 监听新消息
    Realtime.on('message', (data) => {
      if (data.type === 'received') {
        wx.showToast({
          title: '收到新消息',
          icon: 'none'
        })
      }
    })
  },

  // 切换标签
  onTabChange(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({ activeTab: tab })
    
    // 记录用户操作
    Performance.recordUserAction('tab_switch', 'advanced_features', { tab })
  },

  // ==================== 搜索功能演示 ====================
  
  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      'searchDemoData.keyword': keyword
    })
    
    // 获取搜索建议
    if (keyword.trim()) {
      const suggestions = Search.getSuggestions(keyword)
      this.setData({
        'searchDemoData.searchSuggestions': suggestions
      })
    }
  },

  // 执行搜索
  async performAdvancedSearch() {
    const keyword = this.data.searchDemoData.keyword
    if (!keyword.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    
    try {
      this.setData({
        'searchDemoData.isSearching': true
      })
      
      // 执行高级搜索
      const searchResult = await Search.search(keyword, {
        type: 'all',
        page: 1,
        pageSize: 10
      })
      
      this.setData({
        'searchDemoData.searchResults': searchResult.results,
        'searchDemoData.isSearching': false
      })
      
      wx.showToast({
        title: `找到${searchResult.total}个结果`,
        icon: 'success'
      })
      
      // 记录搜索操作
      Performance.recordUserAction('search_performed', 'advanced_search', {
        keyword,
        resultCount: searchResult.total
      })
      
    } catch (error) {
      this.setData({
        'searchDemoData.isSearching': false
      })
      
      wx.showToast({
        title: '搜索失败',
        icon: 'error'
      })
      
      Performance.recordError(error, { context: 'advanced_search' })
    }
  },

  // 清除搜索历史
  async clearSearchHistory() {
    try {
      Search.clearHistory()
      
      // 重新获取搜索分析
      const searchAnalytics = Search.getAnalytics()
      this.setData({
        'searchDemoData.searchAnalytics': searchAnalytics
      })
      
      wx.showToast({
        title: '已清除搜索历史',
        icon: 'success'
      })
      
    } catch (error) {
      wx.showToast({
        title: '清除失败',
        icon: 'error'
      })
    }
  },

  // ==================== 支付功能演示 ====================
  
  // 创建演示订单
  async createDemoOrder() {
    try {
      const orderData = {
        userId: this.getCurrentUserId(),
        amount: 199.00,
        productId: 'demo_tea_001',
        productName: '演示茶叶商品',
        productType: Payment.PAYMENT_TYPES.PRODUCT_PURCHASE,
        description: '这是一个演示订单'
      }
      
      const result = await Payment.createOrder(orderData)
      
      this.setData({
        'paymentDemoData.demoOrder': result.order
      })
      
      wx.showToast({
        title: '订单创建成功',
        icon: 'success'
      })
      
    } catch (error) {
      wx.showToast({
        title: '订单创建失败',
        icon: 'error'
      })
      
      Performance.recordError(error, { context: 'demo_order_creation' })
    }
  },

  // 演示支付
  async demoPay(e) {
    const { method } = e.currentTarget.dataset
    const demoOrder = this.data.paymentDemoData.demoOrder
    
    if (!demoOrder) {
      wx.showToast({
        title: '请先创建订单',
        icon: 'none'
      })
      return
    }
    
    try {
      const paymentResult = await Payment.pay(demoOrder.id, method)
      
      if (paymentResult.success) {
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        })
        
        // 刷新支付数据
        await this.refreshPaymentData()
      }
      
    } catch (error) {
      wx.showToast({
        title: error.message || '支付失败',
        icon: 'error'
      })
    }
  },

  // 刷新支付数据
  async refreshPaymentData() {
    try {
      const userWallet = await Payment.getWallet()
      const paymentStats = Payment.getStats()
      
      this.setData({
        'paymentDemoData.userWallet': userWallet,
        'paymentDemoData.paymentStats': paymentStats,
        'paymentDemoData.demoOrder': null
      })
      
    } catch (error) {
      console.error('刷新支付数据失败:', error)
    }
  },

  // ==================== 实时通信演示 ====================
  
  // 发送演示消息
  async sendDemoMessage() {
    try {
      // 创建或获取演示会话
      let conversationId = this.data.realtimeDemoData.currentConversation
      
      if (!conversationId) {
        const conversation = await Realtime.createConversation([
          this.getCurrentUserId(),
          'demo_user'
        ])
        conversationId = conversation.id
        
        this.setData({
          'realtimeDemoData.currentConversation': conversationId
        })
      }
      
      // 发送消息
      const message = await Realtime.sendMessage(
        conversationId,
        '这是一条演示消息',
        'text'
      )
      
      wx.showToast({
        title: '消息发送成功',
        icon: 'success'
      })
      
      // 刷新消息列表
      await this.refreshMessages(conversationId)
      
    } catch (error) {
      wx.showToast({
        title: '发送失败',
        icon: 'error'
      })
      
      Performance.recordError(error, { context: 'demo_message_send' })
    }
  },

  // 刷新消息列表
  async refreshMessages(conversationId) {
    try {
      const messagesResult = await Realtime.getMessages(conversationId, 1, 10)
      
      this.setData({
        'realtimeDemoData.messages': messagesResult.messages
      })
      
    } catch (error) {
      console.error('刷新消息列表失败:', error)
    }
  },

  // 测试连接
  async testRealtimeConnection() {
    try {
      await Realtime.connect()
      
      wx.showToast({
        title: '连接测试成功',
        icon: 'success'
      })
      
      // 刷新连接状态
      const connectionState = Realtime.getConnectionState()
      this.setData({
        'realtimeDemoData.connectionState': connectionState
      })
      
    } catch (error) {
      wx.showToast({
        title: '连接测试失败',
        icon: 'error'
      })
    }
  },

  // ==================== 性能监控演示 ====================
  
  // 执行性能优化
  async performOptimization() {
    try {
      wx.showLoading({ title: '优化中...' })
      
      await Performance.optimize()
      
      // 刷新性能报告
      const performanceReport = Performance.getReport()
      const optimizationSuggestions = Performance.getSuggestions()
      
      this.setData({
        'performanceDemoData.performanceReport': performanceReport,
        'performanceDemoData.optimizationSuggestions': optimizationSuggestions
      })
      
      wx.hideLoading()
      wx.showToast({
        title: '优化完成',
        icon: 'success'
      })
      
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '优化失败',
        icon: 'error'
      })
      
      Performance.recordError(error, { context: 'performance_optimization' })
    }
  },

  // 模拟性能测试
  async simulatePerformanceTest() {
    try {
      // 模拟页面加载
      const loadTime = Math.random() * 2000 + 500
      Performance.recordPageLoad('demo_page', loadTime)
      
      // 模拟API调用
      const apiTime = Math.random() * 1000 + 200
      Performance.recordAPICall('demo_api', apiTime, Math.random() > 0.1)
      
      // 模拟用户操作
      Performance.recordUserAction('button_click', 'performance_demo')
      
      wx.showToast({
        title: '性能测试完成',
        icon: 'success'
      })
      
      // 刷新性能报告
      setTimeout(() => {
        const performanceReport = Performance.getReport()
        this.setData({
          'performanceDemoData.performanceReport': performanceReport
        })
      }, 1000)
      
    } catch (error) {
      wx.showToast({
        title: '测试失败',
        icon: 'error'
      })
    }
  },

  // ==================== 安全网关演示 ====================
  
  // 测试安全请求
  async testSecureRequest() {
    try {
      wx.showLoading({ title: '请求中...' })
      
      const response = await Gateway.request({
        url: 'https://api.tea-platform.com/secure/test',
        method: 'GET',
        securityLevel: Gateway.SECURITY_LEVELS.SECURE,
        cache: true
      })
      
      wx.hideLoading()
      wx.showToast({
        title: '安全请求成功',
        icon: 'success'
      })
      
      // 刷新安全报告
      const securityReport = Gateway.getSecurityReport()
      this.setData({
        'securityDemoData.securityReport': securityReport
      })
      
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
      
      console.error('安全请求失败:', error)
    }
  },

  // 模拟安全事件
  async simulateSecurityEvent() {
    try {
      // 添加测试IP到黑名单
      await Gateway.addToBlacklist('ip', 'test_ip_123', '演示黑名单功能')
      
      wx.showToast({
        title: '安全事件已模拟',
        icon: 'success'
      })
      
      // 刷新安全报告
      const securityReport = Gateway.getSecurityReport()
      this.setData({
        'securityDemoData.securityReport': securityReport,
        'securityDemoData.recentAlerts': securityReport.recentAlerts || []
      })
      
    } catch (error) {
      wx.showToast({
        title: '模拟失败',
        icon: 'error'
      })
    }
  },

  // ==================== 工具方法 ====================
  
  getCurrentUserId() {
    const app = getApp()
    return app.globalData.userInfo?.id || 'demo_user'
  },

  // 格式化数字
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  },

  // 格式化金额
  formatAmount(amount) {
    return `¥${amount.toFixed(2)}`
  },

  // 复制到剪贴板
  copyToClipboard(e) {
    const { text } = e.currentTarget.dataset
    
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  },

  // 查看详情
  viewDetails(e) {
    const { type, id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '功能演示',
      content: `这是${type}功能的详情页面演示\nID: ${id}`,
      showCancel: false
    })
    
    // 记录用户操作
    Performance.recordUserAction('view_details', 'advanced_features', { type, id })
  },

  onUnload() {
    // 移除事件监听
    Realtime.off('connectionChange')
    Realtime.off('message')
  }
}) 