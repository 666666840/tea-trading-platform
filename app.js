// 引入工具模块
const { API } = require('./utils/api-manager.js')
const { Favorite } = require('./utils/favorite-manager.js')
const { initThemeManager } = require('./utils/theme-manager')
const { initI18nManager } = require('./utils/i18n-manager')
const { initAnimationManager } = require('./utils/animation-manager')
const { notificationManager } = require('./utils/notification-manager')
const { feedbackManager } = require('./utils/feedback-manager')
const { cacheManager } = require('./utils/cache-manager')

// 引入高优先级功能模块
const { searchManager } = require('./utils/search-manager')
const { paymentManager } = require('./utils/payment-manager')
const { realtimeManager } = require('./utils/realtime-manager')
const { performanceMonitor } = require('./utils/performance-monitor')
const { apiGateway } = require('./utils/api-gateway')
const { systemInfoHelper } = require('./utils/system-info-helper')

// 引入自动清理管理器
const { autoCleanupManager } = require('./utils/auto-cleanup-manager')

App({
  globalData: {
    marketsData: [],
    newarrivalsData: [],
    suppliesData: [],
    userInfo: null,
    hasUserInfo: false,
    isLoggedIn: false,
    systemInfo: null,
    apiReady: false,
    apiBaseUrl: 'http://localhost:3000',
    version: '7.0',
    
    // API连接状态
    apiConnected: false,
    apiMode: 'auto', // auto, online, fallback
    
    // 新增：环境配置 - 使用微信官方环境检测
    environment: {
      miniProgram: 'develop', // develop, trial, release
      envVersion: 'develop',  // 当前版本类型
      isDevelopment: false,   // 是否为开发环境
      isProduction: true,     // 是否为生产环境  
      isTrial: false,         // 是否为体验版
      debugMode: false,       // 调试模式
      showTestData: false,    // 是否显示测试数据
      allowDataManagement: false,  // 是否允许数据管理功能
      canSwitchEnv: false,    // 是否允许切换环境
      accountInfo: null       // 账号信息
    },
    
    // 新增：数据管理配置
    dataConfig: {
      maxMerchants: 1000,        // 最大商户数量
      maxProducts: 5000,         // 最大产品数量
      maxImageSize: 2 * 1024 * 1024,  // 最大图片大小 2MB
      supportedImageTypes: ['jpg', 'jpeg', 'png', 'webp'],
      
      // 管理员配置 - 更严格的权限控制
      adminConfig: {
        // 超级管理员（拥有所有权限）
        superAdmins: ['tea-platform-admin', 'system-admin'],
        // 数据管理员（只能管理数据）
        dataAdmins: ['data-manager', '数据管理员'],
        // 商户审核员（只能审核商户）
        merchantReviewers: ['merchant-reviewer', '商户审核员'],
        // 开发人员（开发调试权限）
        developers: ['developer', '开发人员', 'tea-dev'],
        // 测试用户（可以切换环境）
        testUsers: ['测试用户', 'test-user', 'tester', '测试员']
      },
      
      // 商户类别配置
      merchantCategories: [
        '茶叶批发商', '茶叶零售商', '茶园/茶厂', '品牌代理商',
        '茶具经销商', '包装材料商', '物流服务商', '其他'
      ],
      
      // 茶叶分类配置
      teaCategories: [
        '绿茶', '红茶', '乌龙茶', '白茶', '黄茶', '黑茶', 
        '普洱茶', '花茶', '茶具', '包装', '其他'
      ]
    }
  },

  // 应用启动 - 优化版静默离线模式
  onLaunch: function (options) {
    console.log('茶叶批发小程序启动 - v' + this.globalData.version)
    
    // 🗑️ 立即清除 paymentSettings（优先执行）
    this.clearPaymentSettingsNow()
    
    // 🧹 执行自动清理（在初始化之前）
    this.performAutoCleanup()
    
    // 🗑️ 简单清除 paymentSettings（如果不需要支付功能）
    this.simpleCleanup()
    
    // 🚀 直接启用静默离线模式（无弹窗）
    this.initSilentOfflineMode()
    
    // 初始化微信官方环境检测
    this.initWechatEnvironment()
    
    // 初始化环境模式
    this.initEnvironmentMode()
    
    // 初始化新功能管理器
    this.initNewFeatureManagers()
    
    // 检查小程序更新
    this.checkForUpdate()
    
    // 初始化数据管理
    this.initDataManager()
    
    // 检查存储空间
    this.checkStorageSpace()
    
    // 初始化系统信息
    this.initSystemInfo()
    
    // 预加载关键数据
    this.preloadData()
    
    // 初始化本地数据
    this.initLocalData()
  },

  // 🚀 静默离线模式初始化（无弹窗，直接可用）
  async initSilentOfflineMode() {
    try {
      console.log('🚀 [静默模式] 启动超快离线体验...')
      
      // 直接设置为离线模式，不检测API
      this.globalData.apiConnected = false
      this.globalData.apiMode = 'fallback'
      
      // 静默预加载数据（无提示）
      await API.preload()
      console.log('✅ [静默模式] 离线数据加载完成')
      
      // 设置准备就绪状态
      this.globalData.apiReady = true
      
    } catch (error) {
      console.error('❌ [静默模式] 初始化出错:', error)
      // 确保降级模式可用
      this.globalData.apiMode = 'fallback'
    }
  },

  // 初始化新功能管理器
  initNewFeatureManagers() {
    try {
      console.log('🎨 初始化新功能管理器...')
      
      // 初始化主题管理器
      initThemeManager(this)
      
      // 初始化国际化管理器
      initI18nManager(this)
      
      // 初始化动画管理器
      initAnimationManager()
      
      // 初始化通知管理器
      notificationManager.checkNotificationPermission()
      
      // 模拟首次使用通知
      setTimeout(() => {
        notificationManager.createSystemNotification(
          '欢迎使用',
          '感谢使用茶叶批发小程序，祝您使用愉快！'
        )
      }, 3000)
      
      console.log('✅ 新功能管理器初始化完成')
      
      // ==================== 高优先级功能初始化 ====================
      this.initHighPriorityFeatures()
      
    } catch (error) {
      console.error('❌ 新功能管理器初始化失败:', error)
    }
  },

  // 初始化高优先级功能
  initHighPriorityFeatures() {
    try {
      console.log('🚀 初始化高优先级功能系统...')
      
      // 1. 初始化性能监控 (最优先，用于监控其他功能)
      this.initPerformanceMonitoring()
      
      // 2. 初始化API网关与安全系统
      this.initAPIGateway()
      
      // 3. 初始化智能搜索系统
      this.initSearchSystem()
      
      // 4. 初始化支付订单管理系统
      this.initPaymentSystem()
      
      // 5. 初始化实时通信系统
      this.initRealtimeSystem()
      
      console.log('✅ 高优先级功能系统初始化完成')
      
      // 记录初始化完成事件
      this.trackUserAction('high_priority_features_initialized', {
        timestamp: Date.now(),
        version: this.globalData.version
      })
      
    } catch (error) {
      console.error('❌ 高优先级功能初始化失败:', error)
      
      // 记录错误到性能监控
      if (performanceMonitor) {
        performanceMonitor.recordError(error, { context: 'high_priority_features_init' })
      }
    }
  },

  // 初始化性能监控系统
  initPerformanceMonitoring() {
    try {
      console.log('📊 初始化性能监控系统...')
      
      // 性能监控系统已经在加载时自动初始化
      // 这里进行额外配置
      performanceMonitor.updateThresholds({
        memoryUsage: 0.85,     // 内存使用率阈值调整为85%
        loadTime: 2500,        // 页面加载时间阈值2.5秒
        apiResponseTime: 1500, // API响应时间阈值1.5秒
        errorRate: 0.03        // 错误率阈值3%
      })
      
      // 记录应用启动性能
      performanceMonitor.recordPageLoad('app_launch', Date.now())
      
      console.log('✅ 性能监控系统初始化完成')
      
    } catch (error) {
      console.error('❌ 性能监控系统初始化失败:', error)
    }
  },

  // 初始化API网关与安全系统
  initAPIGateway() {
    try {
      console.log('🔒 初始化API网关与安全系统...')
      
      // 配置安全等级
      apiGateway.updateSecurityConfig({
        enableEncryption: this.globalData.environment.isProduction,
        enableSignature: true,
        enableRateLimit: true,
        enableTokenAuth: true,
        requestTimeout: 8000
      })
      
      // 配置限流规则
      apiGateway.updateRateLimitConfig({
        global: { requests: 1200, window: 60000 },  // 全局限流提升
        user: { requests: 120, window: 60000 },     // 用户限流提升
        ip: { requests: 300, window: 60000 },       // IP限流提升
        api: { requests: 600, window: 60000 }       // API限流提升
      })
      
      console.log('✅ API网关与安全系统初始化完成')
      
    } catch (error) {
      console.error('❌ API网关初始化失败:', error)
    }
  },

  // 初始化智能搜索系统
  initSearchSystem() {
    try {
      console.log('🔍 初始化智能搜索系统...')
      
      // 搜索系统已经在加载时自动初始化
      // 这里可以进行个性化配置
      searchManager.updateConfig({
        maxHistoryCount: 60,        // 增加历史记录数量
        maxSuggestionCount: 25,     // 增加建议数量
        enableSemanticSearch: true,  // 启用语义搜索
        enablePinyinSearch: true,    // 启用拼音搜索
        enableFuzzySearch: true      // 启用模糊搜索
      })
      
      console.log('✅ 智能搜索系统初始化完成')
      
    } catch (error) {
      console.error('❌ 智能搜索系统初始化失败:', error)
    }
  },

  // 初始化支付订单管理系统
  initPaymentSystem() {
    try {
      console.log('💳 初始化支付订单管理系统...')
      
      // 配置支付系统
      paymentManager.updateConfig({
        defaultPaymentMethod: 'wechat',
        enabledMethods: ['wechat', 'alipay', 'balance'],
        maxSinglePayment: this.globalData.environment.isProduction ? 100000 : 1000,
        enablePaymentProtection: true,
        autoConfirmDelivery: true,
        confirmDeliveryDays: 7
      })
      
      // 初始化用户钱包（如果还没有）
      paymentManager.initUserWallet()
      
      console.log('✅ 支付订单管理系统初始化完成')
      
    } catch (error) {
      console.error('❌ 支付系统初始化失败:', error)
    }
  },

  // 初始化实时通信系统
  initRealtimeSystem() {
    try {
      console.log('💬 初始化实时通信系统...')
      
      // 配置实时通信
      realtimeManager.updateConfig({
        autoConnect: true,           // 自动连接
        maxReconnectAttempts: 8,     // 增加重连次数
        heartbeatInterval: 25000,    // 心跳间隔25秒
        messageQueueSize: 150        // 增加消息队列大小
      })
      
      // 延迟连接以避免启动时网络竞争
      setTimeout(() => {
        realtimeManager.connect()
      }, 2000)
      
      console.log('✅ 实时通信系统初始化完成')
      
    } catch (error) {
      console.error('❌ 实时通信系统初始化失败:', error)
    }
  },



  // 新增：初始化微信官方环境检测
  initWechatEnvironment() {
    try {
      // 使用微信官方API检测环境
      const accountInfo = wx.getAccountInfoSync()
      console.log('微信小程序账号信息:', accountInfo)
      
      const envVersion = accountInfo.miniProgram.envVersion
      
      // 根据微信官方环境标识设置环境
      this.globalData.environment.accountInfo = accountInfo
      this.globalData.environment.envVersion = envVersion
      this.globalData.environment.miniProgram = envVersion
      
      // 设置环境标识
      switch (envVersion) {
        case 'develop':  // 开发版
          this.globalData.environment.isDevelopment = true
          this.globalData.environment.isProduction = false
          this.globalData.environment.isTrial = false
          this.globalData.environment.canSwitchEnv = true  // 开发版允许切换
          break
        case 'trial':    // 体验版  
          this.globalData.environment.isDevelopment = false
          this.globalData.environment.isProduction = false
          this.globalData.environment.isTrial = true
          this.globalData.environment.canSwitchEnv = true  // 体验版允许切换
          break
        case 'release':  // 正式版
        default:
          this.globalData.environment.isDevelopment = false
          this.globalData.environment.isProduction = true
          this.globalData.environment.isTrial = false
          this.globalData.environment.canSwitchEnv = false // 正式版不允许切换
          break
      }
      
      console.log('微信环境检测完成:', {
        envVersion: envVersion,
        isDevelopment: this.globalData.environment.isDevelopment,
        isProduction: this.globalData.environment.isProduction,
        isTrial: this.globalData.environment.isTrial,
        canSwitchEnv: this.globalData.environment.canSwitchEnv
      })
      
    } catch (error) {
      console.error('微信环境检测失败:', error)
      // 失败时默认为生产环境
      this.globalData.environment.envVersion = 'release'
      this.globalData.environment.isProduction = true
      this.globalData.environment.canSwitchEnv = false
    }
  },

  // 新增：初始化环境模式
  initEnvironmentMode() {
    try {
      const env = this.globalData.environment
      
      // 如果是正式版，不允许切换环境，强制使用生产模式
      if (env.envVersion === 'release') {
        this.setEnvironmentMode('production', true) // 强制设置
        console.log('正式版环境，强制使用生产模式')
        return
      }
      
      // 开发版和体验版可以切换环境
      let targetMode = 'development' // 开发版默认开发模式
      
      if (env.envVersion === 'trial') {
        targetMode = 'staging' // 体验版默认预发布模式
      }
      
      // 检查是否有用户自定义设置
      const savedMode = wx.getStorageSync('environment_mode')
      if (savedMode && env.canSwitchEnv) {
        targetMode = savedMode
        console.log(`使用用户自定义环境模式: ${savedMode}`)
      }
      
      // 应用环境设置
      this.setEnvironmentMode(targetMode, false)
      
      console.log('环境模式初始化完成:', {
        wechatEnv: env.envVersion,
        appMode: targetMode,
        canSwitch: env.canSwitchEnv
      })
      
    } catch (error) {
      console.error('环境模式初始化失败:', error)
      // 失败时使用默认生产环境
      this.setEnvironmentMode('production', true)
    }
  },

  // 初始化系统信息
  initSystemInfo() {
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      this.globalData.systemInfo = systemInfo
      console.log('系统信息:', systemInfo)
    } catch (error) {
      console.error('获取系统信息失败:', error)
    }
  },

  // 预加载关键数据
  async preloadData() {
    console.log('开始预加载数据...')
    
    try {
      // 显示全局加载状态
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      
      // 预加载API数据
      await API.preload()
      
      // 加载市场数据
      const marketsResult = await API.getMarkets()
      if (marketsResult && marketsResult.data) {
        this.globalData.marketsData = marketsResult.data
        console.log(`市场数据加载完成: ${marketsResult.data.length}个市场`)
      }
      
      // 加载新品数据
      const newarrivalsResult = await API.getNewarrivals()
      if (newarrivalsResult && newarrivalsResult.data) {
        this.globalData.newarrivalsData = newarrivalsResult.data
        console.log(`新品数据加载完成: ${newarrivalsResult.data.length}个产品`)
      }
      
      // 加载供求数据
      const suppliesResult = await API.getSupplies()
      if (suppliesResult && suppliesResult.data) {
        this.globalData.suppliesData = suppliesResult.data
        console.log(`供求数据加载完成: ${suppliesResult.data.length}条信息`)
      }
      
      this.globalData.apiReady = true
      console.log('✅ 所有数据预加载完成')
      
    } catch (error) {
      console.error('数据预加载失败:', error)
      // 加载本地备用数据
      this.loadFallbackData()
    } finally {
      wx.hideLoading()
    }
  },

  // 加载降级数据
  loadFallbackData() {
    console.log('使用本地降级数据')
    
    // 从本地存储或静态文件加载数据
    try {
      const localMarkets = require('./utils/national-tea-markets-complete.js')
      if (localMarkets && localMarkets.markets) {
        this.globalData.marketsData = localMarkets.markets
        console.log(`本地市场数据: ${localMarkets.markets.length}个市场`)
      }
    } catch (error) {
      console.error('加载本地市场数据失败:', error)
    }
    
    // 清空示例数据，等待真实数据
    this.globalData.newarrivalsData = []
    this.globalData.suppliesData = []
    
    this.globalData.apiReady = true
  },

  // 初始化本地数据
  initLocalData() {
    try {
      // 初始化收藏数据结构
      const favorites = Favorite.getStats()
      console.log('收藏数据统计:', favorites)
      
      // 检查用户行为记录
      const userBehavior = wx.getStorageSync('userBehavior') || []
      console.log(`用户行为记录: ${userBehavior.length}条`)
      
      // 检查联系历史
      const contactHistory = wx.getStorageSync('contactHistory') || []
      console.log(`联系历史: ${contactHistory.length}条`)
      
    } catch (error) {
      console.error('初始化本地数据失败:', error)
    }
  },

  // 获取用户信息
  getUserInfo() {
    if (this.globalData.hasUserInfo) {
      return this.globalData.userInfo
    }
    
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          this.globalData.userInfo = res.userInfo
          this.globalData.hasUserInfo = true
          this.globalData.isLoggedIn = true
          resolve(res.userInfo)
        },
        fail: reject
      })
    })
  },

  // 全局事件处理
  onShow: function (options) {
    console.log('小程序显示:', options)
    
    // 记录用户访问行为
    this.recordAppUsage('show', options)
  },

  onHide: function () {
    console.log('小程序隐藏')
    this.recordAppUsage('hide')
  },

  onError: function (error) {
    console.error('小程序错误:', error)
    this.recordAppUsage('error', { error })
    
    // 错误上报（如果有错误收集服务）
    wx.showToast({
      title: '出现异常，请稍后重试',
      icon: 'none'
    })
  },

  // 记录应用使用情况
  recordAppUsage(type, data = {}) {
    try {
      const usageData = wx.getStorageSync('appUsage') || []
      usageData.push({
        type,
        data,
        timestamp: new Date().toISOString()
      })
      
      // 只保留最近100条记录
      if (usageData.length > 100) {
        usageData.splice(0, usageData.length - 100)
      }
      
      wx.setStorageSync('appUsage', usageData)
    } catch (error) {
      console.error('记录应用使用失败:', error)
    }
  },

  // 便捷API访问方法
  api: {
    get markets() { return API.getMarkets() },
    get newarrivals() { return API.getNewarrivals() },
    get supplies() { return API.getSupplies() },
    get clearance() { return API.getClearance() },
    get content() { return API.getContent() },
    health: () => API.health(),
    clearCache: () => API.clearCache()
  },

  // 便捷收藏访问方法
  favorite: {
    add: (type, item) => Favorite.add(type, item),
    remove: (type, id) => Favorite.remove(type, id),
    toggle: (type, item) => Favorite.toggle(type, item),
    check: (type, id) => Favorite.check(type, id),
    getList: (type) => Favorite.getList(type),
    getStats: () => Favorite.getStats()
  },

  // 检查小程序更新
  checkForUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          console.log('发现新版本')
        }
      })

      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  },

  // 初始化数据管理
  initDataManager() {
    try {
      // 检查数据结构版本
      const dataVersion = wx.getStorageSync('dataVersion')
      const currentVersion = '1.0'
      
      if (dataVersion !== currentVersion) {
        console.log('数据结构升级中...')
        this.upgradeDataStructure(dataVersion, currentVersion)
        wx.setStorageSync('dataVersion', currentVersion)
      }
      
      // 初始化默认数据
      this.initDefaultData()
      
    } catch (error) {
      console.error('数据管理初始化失败:', error)
    }
  },

  // 升级数据结构
  upgradeDataStructure(oldVersion, newVersion) {
    try {
      // 这里可以添加数据结构升级逻辑
      console.log(`数据结构从 ${oldVersion} 升级到 ${newVersion}`)
      
      // 示例：如果是从旧版本升级，可能需要转换数据格式
      if (!oldVersion) {
        // 首次安装，无需升级
        return
      }
      
      // 可以在这里添加具体的升级逻辑
      
    } catch (error) {
      console.error('数据结构升级失败:', error)
    }
  },

  // 初始化默认数据
  initDefaultData() {
    try {
      // 检查是否已有示例数据
      const hasExampleData = wx.getStorageSync('hasExampleData')
      
      if (!hasExampleData) {
        // 添加一些示例商户数据
        const exampleMerchants = [
          {
            id: 'example_merchant_001',
            name: '福建武夷山茶叶示例店',
            category: '茶叶批发商',
            contact: '李经理',
            phone: '13800138000',
            province: '福建',
            city: '南平市',
            address: '武夷山市示例地址',
            description: '这是一个示例商户，展示平台功能',
            status: 'approved',
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            views: 0,
            contacts: 0,
            rating: 0,
            reviewCount: 0
          }
        ]
        
        wx.setStorageSync('realMerchants', exampleMerchants)
        wx.setStorageSync('hasExampleData', true)
        
        console.log('示例数据初始化完成')
      }
      
    } catch (error) {
      console.error('默认数据初始化失败:', error)
    }
  },

  // 检查存储空间
  checkStorageSpace() {
    try {
      const info = wx.getStorageInfoSync()
      const usagePercent = (info.currentSize / info.limitSize) * 100
      
      console.log(`存储空间使用情况: ${usagePercent.toFixed(1)}% (${info.currentSize}KB/${info.limitSize}KB)`)
      
      if (usagePercent > 90) {
        console.warn('存储空间不足，建议清理数据')
        
        // 可以在这里实现自动清理逻辑
        this.autoCleanup()
      }
      
    } catch (error) {
      console.error('检查存储空间失败:', error)
    }
  },

  // 自动清理
  // 执行自动清理
  async performAutoCleanup() {
    try {
      // 根据当前环境确定清理策略
      const env = this.globalData.environment.envVersion || 'develop'
      let environment = 'production'
      
      if (env === 'develop') {
        environment = 'development'
      } else if (env === 'trial') {
        environment = 'trial'
      }
      
      console.log(`🧹 开始自动清理 (环境: ${environment})`)
      
      // 执行自动清理
      const result = await autoCleanupManager.performAutoCleanup(environment)
      
      // 记录清理结果
      if (result.cleanedCount > 0) {
        console.log(`✅ 自动清理完成: 清理了 ${result.cleanedCount} 个键，释放了 ${result.freedSpace} 字节`)
        
        // 如果是开发环境，显示更详细的信息
        if (environment === 'development') {
          result.cleanedKeys.forEach(item => {
            console.log(`  - ${item.key} (${item.reason})`)
          })
        }
      } else {
        console.log('✅ 自动清理完成: 无需清理的数据')
      }
      
      return result
      
    } catch (error) {
      console.error('❌ 自动清理失败:', error)
      return null
    }
  },

  // 兼容旧版本的清理方法
  autoCleanup() {
    return this.performAutoCleanup()
  },

  // 简单清理方法
  simpleCleanup() {
    try {
      // 清除不需要的支付相关数据
      const keysToClean = ['paymentSettings', 'paymentOrders', 'paymentRecords', 'userWallet', 'refunds']
      
      keysToClean.forEach(key => {
        try {
          wx.removeStorageSync(key)
          console.log(`🗑️ 清除: ${key}`)
        } catch (error) {
          // 忽略错误
        }
      })
      
      console.log('✅ 简单清理完成')
    } catch (error) {
      console.error('❌ 简单清理失败:', error)
    }
  },

  // 立即清除 paymentSettings
  clearPaymentSettingsNow() {
    try {
      wx.removeStorageSync('paymentSettings')
      console.log('✅ paymentSettings 已立即清除')
      return true
    } catch (error) {
      console.error('❌ 清除失败:', error)
      return false
    }
  },

  // 手动清理指定键
  manualCleanup(keys, reason = 'manual') {
    return autoCleanupManager.manualCleanup(keys, reason)
  },

  // 获取清理历史
  getCleanupHistory() {
    return autoCleanupManager.getCleanupHistory()
  },

  // 获取清理统计
  getCleanupStats() {
    return autoCleanupManager.getCleanupStats()
  },

  // 获取全局配置
  getGlobalData() {
    return this.globalData
  },

  // 设置用户信息
  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo
  },

  // 检查管理员权限
  isAdmin(userInfo) {
    if (!userInfo) return false
    
    const adminUsers = this.globalData.dataConfig.adminConfig.superAdmins
    return adminUsers.includes(userInfo.nickName) || 
           userInfo.nickName?.toLowerCase().includes('admin')
  },

  // 新增：检查超级管理员权限
  isSuperAdmin(userInfo) {
    if (!userInfo) return false
    const superAdmins = this.globalData.dataConfig.adminConfig.superAdmins
    return superAdmins.includes(userInfo.nickName)
  },

  // 新增：检查数据管理员权限
  isDataAdmin(userInfo) {
    if (!userInfo) return false
    const dataAdmins = this.globalData.dataConfig.adminConfig.dataAdmins
    const superAdmins = this.globalData.dataConfig.adminConfig.superAdmins
    return dataAdmins.includes(userInfo.nickName) || 
           this.isSuperAdmin(userInfo)
  },

  // 新增：检查商户审核员权限
  isMerchantReviewer(userInfo) {
    if (!userInfo) return false
    const reviewers = this.globalData.dataConfig.adminConfig.merchantReviewers
    const superAdmins = this.globalData.dataConfig.adminConfig.superAdmins
    return reviewers.includes(userInfo.nickName) || 
           this.isSuperAdmin(userInfo)
  },

  // 新增：检查开发人员权限
  isDeveloper(userInfo) {
    if (!userInfo) return false
    const developers = this.globalData.dataConfig.adminConfig.developers
    const superAdmins = this.globalData.dataConfig.adminConfig.superAdmins
    return developers.includes(userInfo.nickName) || 
           this.isSuperAdmin(userInfo)
  },

  // 新增：检查内容管理员权限
  isContentManager(userInfo) {
    if (!userInfo) return false
    const contentManagers = this.globalData.dataConfig.adminConfig.contentManagers || []
    const superAdmins = this.globalData.dataConfig.adminConfig.superAdmins
    return contentManagers.includes(userInfo.nickName) || 
           this.isSuperAdmin(userInfo)
  },

  // 新增：检查测试用户权限
  isTestUser(userInfo) {
    if (!userInfo) return false
    const testUsers = this.globalData.dataConfig.adminConfig.testUsers
    return testUsers.includes(userInfo.nickName)
  },

  // 新增：检查是否可以访问环境切换
  canAccessEnvironmentSwitcher(userInfo) {
    const env = this.globalData.environment
    
    // 正式版不允许任何人切换环境
    if (env.envVersion === 'release') {
      return false
    }
    
    // 开发版和体验版，允许开发人员、超级管理员、测试用户访问
    return this.isDeveloper(userInfo) || 
           this.isSuperAdmin(userInfo) || 
           this.isTestUser(userInfo)
  },

  // 新增：检查是否允许数据管理
  canAccessDataManagement(userInfo) {
    return this.globalData.environment.allowDataManagement && 
           (this.isDataAdmin(userInfo) || this.isSuperAdmin(userInfo))
  },

  // 新增：检查是否为开发环境
  isDevelopmentMode() {
    return this.globalData.environment.isDevelopment
  },

  // 新增：检查是否为生产环境  
  isProductionMode() {
    return this.globalData.environment.isProduction
  },

  // 新增：检查是否为体验版
  isTrialMode() {
    return this.globalData.environment.isTrial
  },

  // 新增：检查是否可以切换环境
  canSwitchEnvironment() {
    return this.globalData.environment.canSwitchEnv
  },

  // 新增：获取微信环境版本
  getWechatEnvVersion() {
    return this.globalData.environment.envVersion
  },

  // 新增：设置环境模式
  setEnvironmentMode(mode, forceSet = false) {
    // 如果是正式版且不是强制设置，则不允许切换
    if (this.globalData.environment.envVersion === 'release' && !forceSet) {
      console.warn('正式版不允许切换环境模式')
      return false
    }
    
    switch (mode) {
      case 'development':
        this.globalData.environment.debugMode = true
        this.globalData.environment.showTestData = true
        this.globalData.environment.allowDataManagement = true
        break
      case 'staging':
        this.globalData.environment.debugMode = true
        this.globalData.environment.showTestData = true
        this.globalData.environment.allowDataManagement = true
        break
      case 'production':
        this.globalData.environment.debugMode = false
        this.globalData.environment.showTestData = false
        this.globalData.environment.allowDataManagement = false
        break
    }
    
    // 保存用户设置（仅在可切换环境时保存）
    if (this.globalData.environment.canSwitchEnv) {
      wx.setStorageSync('environment_mode', mode)
    }
    
    console.log(`环境模式已设置为: ${mode}`)
    return true
  },

  // 新增：获取环境信息总览
  getEnvironmentInfo() {
    const env = this.globalData.environment
    return {
      // 微信官方环境
      wechatEnv: {
        version: env.envVersion,
        name: this.getWechatEnvName(env.envVersion),
        description: this.getWechatEnvDescription(env.envVersion)
      },
      // 应用环境模式
      appMode: {
        isDevelopment: env.isDevelopment,
        isProduction: env.isProduction,
        isTrial: env.isTrial,
        debugMode: env.debugMode,
        allowDataManagement: env.allowDataManagement
      },
      // 环境能力
      capabilities: {
        canSwitchEnv: env.canSwitchEnv,
        showTestData: env.showTestData
      },
      // 账号信息
      account: env.accountInfo
    }
  },

  // 新增：获取微信环境名称
  getWechatEnvName(envVersion) {
    const names = {
      'develop': '开发版',
      'trial': '体验版', 
      'release': '正式版'
    }
    return names[envVersion] || '未知版本'
  },

  // 新增：获取微信环境描述
  getWechatEnvDescription(envVersion) {
    const descriptions = {
      'develop': '开发者工具预览或真机调试的版本，具有完整的调试功能',
      'trial': '通过二维码扫描进入的体验版本，用于内测和验收',
      'release': '已发布的正式版本，普通用户使用的稳定版本'
    }
    return descriptions[envVersion] || '未知版本类型'
  },

  // 记录用户行为
  trackUserAction(action, data = {}) {
    try {
      const actionLog = {
        action: action,
        data: data,
        timestamp: new Date().toISOString(),
        userInfo: this.globalData.userInfo
      }
      
      // 获取现有日志
      let logs = wx.getStorageSync('userActionLogs') || []
      logs.push(actionLog)
      
      // 保持最近1000条记录
      if (logs.length > 1000) {
        logs = logs.slice(-1000)
      }
      
      wx.setStorageSync('userActionLogs', logs)
      
    } catch (error) {
      console.error('记录用户行为失败:', error)
    }
  },

  // 获取系统信息
  getSystemInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: (res) => {
          resolve({
            ...res,
            appVersion: this.globalData.version,
            dataVersion: wx.getStorageSync('dataVersion') || '1.0'
          })
        },
        fail: reject
      })
    })
  },

  // 错误处理
  onError(error) {
    console.error('小程序错误:', error)
    
    try {
      // 记录错误到性能监控系统
      if (performanceMonitor) {
        performanceMonitor.recordError(error, {
          type: 'global_error',
          timestamp: new Date().toISOString(),
          userAgent: systemInfoHelper.getSystemInfo().system
        })
      }
      
      // 自动反馈错误
      const currentPage = getCurrentPages()[getCurrentPages().length - 1]
      const pagePath = currentPage ? currentPage.route : 'unknown'
      feedbackManager.autoReportError(error, pagePath)
      
      // 记录用户行为
      this.trackUserAction('app_error', {
        error: error.toString(),
        stack: error.stack,
        page: pagePath
      })
      
      // 如果是关键错误，立即执行优化
      if (this.isCriticalError(error)) {
        setTimeout(() => {
          this.handleCriticalError(error)
        }, 1000)
      }
      
    } catch (handlingError) {
      console.error('错误处理过程中发生异常:', handlingError)
    }
  },

  // 判断是否为关键错误
  isCriticalError(error) {
    const criticalPatterns = [
      /memory/i,
      /out of memory/i,
      /quota exceeded/i,
      /network/i,
      /timeout/i
    ]
    
    const errorMessage = error.toString().toLowerCase()
    return criticalPatterns.some(pattern => pattern.test(errorMessage))
  },

  // 处理关键错误
  async handleCriticalError(error) {
    try {
      console.log('🚨 处理关键错误:', error.message)
      
      // 执行自动优化
      if (performanceMonitor) {
        await performanceMonitor.optimizeMemory()
        await performanceMonitor.optimizeStorage()
      }
      
      // 清理缓存
      if (cacheManager) {
        await cacheManager.cleanup()
      }
      
      console.log('✅ 关键错误处理完成')
      
    } catch (optimizationError) {
      console.error('关键错误处理失败:', optimizationError)
    }
  },

  // 页面不存在处理
  onPageNotFound(res) {
    console.error('页面不存在:', res)
    
    // 反馈页面不存在错误
    try {
      feedbackManager.autoReportError({
        message: `页面不存在: ${res.path}`,
        query: res.query
      }, 'page-not-found')
    } catch (e) {
      console.error('页面不存在错误反馈失败:', e)
    }
    
    // 跳转到首页
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
}) 