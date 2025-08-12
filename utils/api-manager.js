// API请求管理器 - 解决连接不稳定问题（增强版）
class APIManager {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.cache = new Map()
    this.cacheExpireTime = 5 * 60 * 1000 // 5分钟缓存
    this.maxRetries = 3
    this.requestTimeout = 10000 // 增加到10秒超时
    this.connected = false
    this.lastCheckTime = 0
    this.checkInterval = 60000 // 增加到60秒检查一次连接
    this.token = wx.getStorageSync('userToken') || ''
    this.autoReconnectEnabled = true
  }

  // 智能请求：优先尝试服务器，失败时使用本地数据
  async request(endpoint, options = {}) {
    console.log(`🚀 [智能模式] 请求: ${endpoint}`)
    
    try {
      // 尝试连接服务器
      const result = await this.executeRequest(endpoint, options)
      this.connected = true
      return result
    } catch (error) {
      console.warn(`⚠️ [降级模式] 服务器连接失败，使用本地数据: ${error.message}`)
      this.connected = false
      
      // 减少重连频率，避免频繁错误
      if (this.autoReconnectEnabled) {
        this.autoReconnectEnabled = false
        setTimeout(() => {
          this.autoReconnectEnabled = true
        }, 30000) // 30秒后重新启用自动重连
      }
      
      // 使用本地降级数据
      const fallbackData = this.getFallbackData(endpoint)
      if (fallbackData) {
        return fallbackData
      }
      
      // 如果没有对应的降级数据，返回默认成功响应
      return { status: 'success', data: [], message: '离线模式运行中' }
    }
  }

  // API鉴权钩子（可扩展：token校验、签名校验等）
  getAuthHeader() {
    // 示例：从本地获取token
    const token = wx.getStorageSync('userToken') || ''
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  // 限流与防刷钩子（可扩展：本地计数、时间窗口等）
  static requestCounter = {};
  static RATE_LIMIT = 30; // 30次/分钟
  static TIME_WINDOW = 60 * 1000;
  static lastReset = Date.now();

  static checkRateLimit(endpoint) {
    const now = Date.now();
    if (now - APIManager.lastReset > APIManager.TIME_WINDOW) {
      APIManager.requestCounter = {};
      APIManager.lastReset = now;
    }
    APIManager.requestCounter[endpoint] = (APIManager.requestCounter[endpoint] || 0) + 1;
    if (APIManager.requestCounter[endpoint] > APIManager.RATE_LIMIT) {
      throw new Error('请求过于频繁，请稍后再试');
    }
  }

  // 敏感数据加密钩子（可扩展：加密算法）
  encryptData(data) {
    // 示例：简单Base64加密（实际应用请用更安全算法）
    return typeof data === 'string' ? btoa(data) : data;
  }

  // 日志与异常监控钩子
  logError(error, context) {
    // 可扩展：上报到远程日志服务
    console.error('[API异常]', context, error);
  }

  // 执行单次请求（增强：鉴权、限流、防刷、加密、日志）
  async executeRequest(endpoint, options = {}) {
    try {
      APIManager.checkRateLimit(endpoint);
      const authHeader = this.getAuthHeader();
      const requestOptions = {
        url: `${this.baseUrl}${endpoint}`,
        method: options.method || 'GET',
        data: options.data ? this.encryptData(options.data) : {},
        header: {
          'Content-Type': 'application/json',
          ...authHeader,
          ...options.header
        },
        timeout: this.requestTimeout,
        success: (res) => {
          if (res.statusCode === 200) {
            options.success && options.success(res);
          } else {
            throw new Error(`HTTP ${res.statusCode}: ${res.data?.message || '请求失败'}`);
          }
        },
        fail: (error) => {
          throw new Error(error.errMsg || '连接失败');
        }
      };
      return await new Promise((resolve, reject) => {
        wx.request({
          ...requestOptions,
          success: (res) => {
            if (res.statusCode === 200) {
              resolve(res.data);
            } else {
              this.logError(res, { endpoint, options });
              reject(new Error(`HTTP ${res.statusCode}: ${res.data?.message || '请求失败'}`));
            }
          },
          fail: (error) => {
            this.logError(error, { endpoint, options });
            reject(new Error(error.errMsg || '连接失败'));
          }
        });
      });
    } catch (error) {
      this.logError(error, { endpoint, options });
      throw error;
    }
  }

  // 显示连接状态提示
  showFallbackNotice() {
    if (!this.connected) {
      wx.showToast({
        title: '当前为离线模式',
        icon: 'none',
        duration: 2000
      })
    }
  }

  // 缓存管理
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  getCache(key) {
    const cached = this.cache.get(key)
    if (!cached) return null
    
    if (Date.now() - cached.timestamp > this.cacheExpireTime) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data
  }

  // 获取降级数据（本地数据）
  getFallbackData(endpoint) {
    // 处理带参数的内容请求
    if (endpoint.includes('/api/content')) {
      const url = new URL('http://temp.com' + endpoint)
      const type = url.searchParams.get('type') || 'recommend'
      return { status: 'success', data: this.getLocalContent(type) }
    }
    
    const fallbackMap = {
      '/health': { status: 'ok', message: '本地模式运行' },
      '/api/markets': { status: 'success', data: this.getLocalMarkets() },
      '/api/newarrivals': { status: 'success', data: this.getLocalNewarrivals() },
      '/api/supplies': { status: 'success', data: this.getLocalSupplies() },
      '/api/clearance': { status: 'success', data: this.getLocalClearance() },
      '/api/content': { status: 'success', data: this.getLocalContent() },
      '/api/markets/provinces': { status: 'success', data: this.getLocalProvinces() },
      '/api/inquiry': { status: 'success', data: this.getLocalInquiry() },
      '/api/brands': { status: 'success', data: this.getLocalBrands() },
      '/api/gardens': { status: 'success', data: this.getLocalGardens() },
      '/api/market-price': { status: 'success', data: this.getLocalMarketPrice() }
    }
    
    return fallbackMap[endpoint] || null
  }

  // 本地数据获取方法
  getLocalMarkets() {
    try {
      const app = getApp()
      if (app && app.globalData) {
        return app.globalData.marketsData || [
          { id: 1, name: '本地茶叶市场1', city: '示例城市', address: '示例地址1' },
          { id: 2, name: '本地茶叶市场2', city: '示例城市', address: '示例地址2' }
        ]
      }
    } catch (error) {
      console.warn('获取app实例失败，使用默认数据:', error)
    }
    
    return [
      { id: 1, name: '本地茶叶市场1', city: '示例城市', address: '示例地址1' },
      { id: 2, name: '本地茶叶市场2', city: '示例城市', address: '示例地址2' }
    ]
  }

  getLocalNewarrivals() {
    return [] // 清空示例数据，等待真实数据
  }

  getLocalSupplies() {
    return [] // 清空示例数据，等待真实数据
  }

  getLocalClearance() {
    return [] // 清空示例数据，等待真实数据
  }

  getLocalContent(type = 'recommend') {
    const contentData = {
      'recommend': [],
      'news': [],
      'art': [],
      'hot': []
    }
    
    return contentData[type] || []
  }

  getLocalProvinces() {
    return [
      { id: 1, name: '福建省', marketCount: 61 },
      { id: 2, name: '云南省', marketCount: 198 },
      { id: 3, name: '浙江省', marketCount: 62 },
      { id: 4, name: '安徽省', marketCount: 45 },
      { id: 5, name: '广东省', marketCount: 124 }
    ]
  }

  getLocalInquiry() {
    return [] // 清空示例数据，等待真实数据
  }

  getLocalBrands() {
    return [] // 已清空示例数据，等待真实数据输入
  }

  getLocalGardens() {
    return [
      { id: 1, title: '武夷岩茶直供基地', location: '福建武夷山', varieties: ['大红袍', '肉桂', '水仙'], contact: '园主直供', certification: '有机认证' },
      { id: 2, title: '安溪铁观音茶园', location: '福建安溪', varieties: ['铁观音', '黄金桂'], contact: '茶农直销', certification: '地理标志' }
    ]
  }

  getLocalMarketPrice() {
    return [
      {
        id: 1,
        subCategory: '铁观音',
        category: '青茶（乌龙茶）',
        city: '安溪县',
        priceRange: '80-150',
        unit: '元/斤',
        trend: 'rising',
        trendText: '上涨5%',
        merchantCount: 25,
        updateTime: '2024-01-15',
        rating: 4.8,
        distance: 2.5,
        description: '安溪铁观音，香气浓郁，回甘持久，品质优良',
        hasImages: true,
        hasOrigin: true,
        process: '传统工艺',
        inquiryCount: 156,
        updateStatus: 'updated',
        statusText: '今日更新'
      },
      {
        id: 2,
        subCategory: '大红袍',
        category: '青茶（乌龙茶）',
        city: '武夷山市',
        priceRange: '200-500',
        unit: '元/斤',
        trend: 'stable',
        trendText: '价格稳定',
        merchantCount: 18,
        updateTime: '2024-01-14',
        rating: 4.9,
        distance: 5.2,
        description: '武夷岩茶大红袍，岩骨花香，韵味十足',
        hasImages: true,
        hasOrigin: true,
        process: '岩茶工艺',
        inquiryCount: 203,
        updateStatus: 'updated',
        statusText: '今日更新'
      },
      {
        id: 3,
        subCategory: '龙井',
        category: '绿茶',
        city: '杭州市',
        priceRange: '120-300',
        unit: '元/斤',
        trend: 'falling',
        trendText: '下跌3%',
        merchantCount: 32,
        updateTime: '2024-01-13',
        rating: 4.7,
        distance: 1.8,
        description: '西湖龙井，清香持久，滋味鲜爽',
        hasImages: true,
        hasOrigin: true,
        process: '明前采摘',
        inquiryCount: 189,
        updateStatus: 'updated',
        statusText: '今日更新'
      },
      {
        id: 4,
        subCategory: '普洱茶',
        category: '黑茶',
        city: '普洱市',
        priceRange: '150-800',
        unit: '元/饼',
        trend: 'rising',
        trendText: '上涨8%',
        merchantCount: 22,
        updateTime: '2024-01-12',
        rating: 4.6,
        distance: 8.5,
        description: '云南普洱茶，越陈越香，收藏价值高',
        hasImages: true,
        hasOrigin: true,
        process: '生茶工艺',
        inquiryCount: 267,
        updateStatus: 'updated',
        statusText: '今日更新'
      },
      {
        id: 5,
        subCategory: '白毫银针',
        category: '白茶',
        city: '福鼎市',
        priceRange: '300-800',
        unit: '元/斤',
        trend: 'stable',
        trendText: '价格稳定',
        merchantCount: 15,
        updateTime: '2024-01-11',
        rating: 4.8,
        distance: 12.3,
        description: '福鼎白毫银针，毫香蜜韵，清雅淡雅',
        hasImages: true,
        hasOrigin: true,
        process: '传统工艺',
        inquiryCount: 134,
        updateStatus: 'updated',
        statusText: '今日更新'
      }
    ]
  }

  // 延迟工具函数
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // 清除所有缓存
  clearCache() {
    this.cache.clear()
    console.log('[API] 缓存已清除')
  }

  // 检查服务器连接状态
  async checkConnection() {
    try {
      const response = await this.executeRequest('/health')
      this.connected = true
      return true
    } catch (error) {
      this.connected = false
      return false
    }
  }

  // 获取连接状态
  isConnected() {
    return this.connected
  }

  // 预加载关键数据
  async preloadCriticalData() {
    console.log('🚀 [预加载] 初始化数据...')
    
    try {
      // 尝试从服务器加载数据
      await Promise.all([
        this.request('/api/markets'),
        this.request('/api/newarrivals'),
        this.request('/api/supplies'),
        this.request('/api/clearance'),
        this.request('/api/content')
      ])
      console.log('✅ [预加载] 服务器数据加载完成')
    } catch (error) {
      console.warn('⚠️ [预加载] 服务器连接失败，使用本地数据')
      // 使用本地数据作为备选
      this.getLocalMarkets()
      this.getLocalNewarrivals()
      this.getLocalSupplies()
      this.getLocalClearance()
      this.getLocalContent()
    }
    
    return true
  }

  // 启动自动重连
  startAutoReconnect() {
    console.log('🚀 [自动重连] 已启用智能连接模式')
    
    // 定期检查连接状态
    setInterval(async () => {
      if (!this.connected) {
        console.log('🔄 [自动重连] 尝试重新连接服务器...')
        await this.checkConnection()
      }
    }, this.checkInterval)
  }
}

// 创建全局API管理器实例
const apiManager = new APIManager()

// 启动自动重连
apiManager.startAutoReconnect()

// 导出便捷方法
const API = {
  // 健康检查
  async health() {
    return apiManager.request('/health')
  },

  // 市场数据
  async getMarkets(province = null) {
    const endpoint = province ? `/api/markets?province=${province}` : '/api/markets'
    return apiManager.request(endpoint)
  },

  // 省份数据
  async getProvinces() {
    return apiManager.request('/api/markets/provinces')
  },

  // 新品到货
  async getNewarrivals(category = null) {
    const endpoint = category ? `/api/newarrivals?category=${category}` : '/api/newarrivals'
    return apiManager.request(endpoint)
  },

  // 供求信息
  async getSupplies(type = null) {
    const endpoint = type ? `/api/supplies?type=${type}` : '/api/supplies'
    return apiManager.request(endpoint)
  },

  // 清仓特价
  async getClearance() {
    return apiManager.request('/api/clearance')
  },

  // 内容信息
  async getContent(type = 'recommend') {
    return apiManager.request(`/api/content?type=${type}`)
  },

  // 采购询价
  async getInquiry() {
    return apiManager.request('/api/inquiry')
  },

  // 发布询价
  async publishInquiry(data) {
    return apiManager.request('/api/inquiry', { method: 'POST', data })
  },

  // 知名品牌
  async getBrands(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/brands?${params}` : '/api/brands'
    return apiManager.request(endpoint)
  },

  // 新品到货（统一接口）
  async getNewarrival() {
    return apiManager.request('/api/newarrivals')
  },

  // 发布新品
  async createNewarrival(data) {
    return apiManager.request('/api/newarrivals', { method: 'POST', data })
  },

  // 茶园直通
  async getGardens() {
    return apiManager.request('/api/gardens')
  },

  // 供求平台
  async getSupply() {
    return apiManager.request('/api/supply')
  },

  // 品类行情
  async getMarketPrice() {
    return apiManager.request('/api/market-price')
  },

  // 预加载数据
  async preload() {
    return apiManager.preloadCriticalData()
  },

  // 清除缓存
  clearCache() {
    apiManager.clearCache()
  },

  // 检查连接状态
  async checkConnection() {
    return apiManager.checkConnection()
  },

  // 获取连接状态
  isConnected() {
    return apiManager.isConnected()
  },

  // 用户认证相关
  async login(credentials) {
    return apiManager.request('/api/auth/login', { method: 'POST', data: credentials })
  },

  async logout() {
    return apiManager.request('/api/auth/logout')
  },

  async register(userData) {
    return apiManager.request('/api/auth/register', { method: 'POST', data: userData })
  },

  // 数据管理相关
  async createMarket(marketData) {
    return apiManager.request('/api/markets', { method: 'POST', data: marketData })
  },

  async createSupply(supplyData) {
    return apiManager.request('/api/supplies', { method: 'POST', data: supplyData })
  },

  async createContent(contentData) {
    return apiManager.request('/api/content', { method: 'POST', data: contentData })
  },

  // 数据统计
  async getStats() {
    return apiManager.request('/api/stats')
  },

  // 系统日志
  async getLogs() {
    return apiManager.request('/api/logs')
  },

  // 数据导出
  async exportData(dataType) {
    return apiManager.request(`/api/export/${dataType}`)
  },

  // 详情页面相关
  async getMarketDetail(marketId) {
    return apiManager.request(`/api/markets/${marketId}`)
  },

  async getNewarrivalDetail(itemId) {
    return apiManager.request(`/api/newarrivals/${itemId}`)
  },

  // 搜索功能
  async searchMarkets(keyword) {
    return apiManager.request(`/api/markets?search=${encodeURIComponent(keyword)}`)
  },

  async searchSupplies(keyword) {
    return apiManager.request(`/api/supplies?search=${encodeURIComponent(keyword)}`)
  },

  async searchContent(keyword) {
    return apiManager.request(`/api/content?search=${encodeURIComponent(keyword)}`)
  },

  // 高级搜索和筛选功能
  async advancedSearchMarkets(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/advanced-search/markets?${params}` : '/api/advanced-search/markets'
    return apiManager.request(endpoint)
  },

  async advancedSearchNewarrivals(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/advanced-search/newarrivals?${params}` : '/api/advanced-search/newarrivals'
    return apiManager.request(endpoint)
  },

  async advancedSearchSupplies(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/advanced-search/supplies?${params}` : '/api/advanced-search/supplies'
    return apiManager.request(endpoint)
  },

  async advancedSearchClearance(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/advanced-search/clearance?${params}` : '/api/advanced-search/clearance'
    return apiManager.request(endpoint)
  },

  async advancedSearchContent(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/api/advanced-search/content?${params}` : '/api/advanced-search/content'
    return apiManager.request(endpoint)
  },

  // 获取筛选选项
  async getFilterOptions(dataType = 'all') {
    return apiManager.request(`/api/filter-options?type=${dataType}`)
  },

  // 构建高级搜索参数
  buildAdvancedFilters(options = {}) {
    const filters = {}
    
    // 关键词搜索
    if (options.keyword) {
      filters.keyword = options.keyword
    }
    
    // 分类筛选
    if (options.category) {
      filters.category = options.category
    }
    
    // 类型筛选
    if (options.type) {
      filters.type = options.type
    }
    
    // 省份筛选
    if (options.province) {
      filters.province = options.province
    }
    
    // 价格范围筛选 (格式: "100-500" 或 "300")
    if (options.priceRange) {
      filters.price_range = options.priceRange
    }
    
    // 时间范围筛选 (格式: "2024-01-01-2024-12-31" 或 "2024-01-01")
    if (options.dateRange) {
      filters.date_range = options.dateRange
    }
    
    // 标签筛选
    if (options.tag) {
      filters.tag = options.tag
    }
    
    // 状态筛选
    if (options.status) {
      filters.status = options.status
    }
    
    // 分页参数
    if (options.page) {
      filters.page = options.page
    }
    
    if (options.perPage) {
      filters.per_page = options.perPage
    }
    
    return filters
  },

  // 用户系统增强相关方法

  // 用户资料管理
  async getUserProfile() {
    return apiManager.request('/api/user/profile')
  },

  async updateUserProfile(profileData) {
    return apiManager.request('/api/user/profile', { method: 'PUT', data: profileData })
  },

  // 用户收藏管理
  async getUserFavorites(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/favorites?${params}` : '/api/user/favorites'
    return apiManager.request(endpoint)
  },

  async addUserFavorite(favoriteData) {
    return apiManager.request('/api/user/favorites', { method: 'POST', data: favoriteData })
  },

  async removeUserFavorite(favoriteId) {
    return apiManager.request(`/api/user/favorites/${favoriteId}`, { method: 'DELETE' })
  },

  // 用户浏览历史
  async getUserHistory(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/history?${params}` : '/api/user/history'
    return apiManager.request(endpoint)
  },

  async addUserHistory(historyData) {
    return apiManager.request('/api/user/history', { method: 'POST', data: historyData })
  },

  async clearUserHistory(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/history?${params}` : '/api/user/history'
    return apiManager.request(endpoint, { method: 'DELETE' })
  },

  // 用户消息通知
  async getUserNotifications(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/notifications?${params}` : '/api/user/notifications'
    return apiManager.request(endpoint)
  },

  async markNotificationRead(notificationId) {
    return apiManager.request(`/api/user/notifications/${notificationId}/read`, { method: 'PUT' })
  },

  async markAllNotificationsRead() {
    return apiManager.request('/api/user/notifications/read-all', { method: 'PUT' })
  },

  // 用户关注管理
  async getUserFollows(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/follows?${params}` : '/api/user/follows'
    return apiManager.request(endpoint)
  },

  async addUserFollow(followData) {
    return apiManager.request('/api/user/follows', { method: 'POST', data: followData })
  },

  async removeUserFollow(followingId) {
    return apiManager.request(`/api/user/follows/${followingId}`, { method: 'DELETE' })
  },

  // 用户私信管理
  async getUserMessages(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/messages?${params}` : '/api/user/messages'
    return apiManager.request(endpoint)
  },

  async sendUserMessage(messageData) {
    return apiManager.request('/api/user/messages', { method: 'POST', data: messageData })
  },

  // 用户活动记录
  async getUserActivities(options = {}) {
    const params = new URLSearchParams(options).toString()
    const endpoint = params ? `/api/user/activities?${params}` : '/api/user/activities'
    return apiManager.request(endpoint)
  },

  async addUserActivity(activityData) {
    return apiManager.request('/api/user/activities', { method: 'POST', data: activityData })
  },

  // 用户系统工具方法
  async recordUserActivity(activityType, description = '', activityData = {}) {
    return this.addUserActivity({
      activity_type: activityType,
      description: description,
      activity_data: activityData
    })
  },

  async addToHistory(itemType, itemId, title = '', description = '') {
    return this.addUserHistory({
      item_type: itemType,
      item_id: itemId,
      title: title,
      description: description
    })
  },

  async addToFavorites(itemType, itemId, title = '', description = '') {
    return this.addUserFavorite({
      item_type: itemType,
      item_id: itemId,
      title: title,
      description: description
    })
  },

  // 检查用户是否已收藏
  async isItemFavorited(itemType, itemId) {
    try {
      const response = await this.getUserFavorites({ type: itemType })
      if (response.status === 'success' && response.data) {
        return response.data.some(item => item.item_id === itemId)
      }
      return false
    } catch (error) {
      console.warn('检查收藏状态失败:', error)
      return false
    }
  },

  // 获取未读通知数量
  async getUnreadNotificationCount() {
    try {
      const response = await this.getUserNotifications({ is_read: 'false' })
      if (response.status === 'success' && response.data) {
        return response.data.length
      }
      return 0
    } catch (error) {
      console.warn('获取未读通知数量失败:', error)
      return 0
    }
  }
}

module.exports = {
  APIManager,
  API,
  apiManager
} 