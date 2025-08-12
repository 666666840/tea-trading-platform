// 数据分析页面
const app = getApp()

Page({
  data: {
    // 页面状态
    loading: false,
    activeTab: 'dashboard',
    
    // 时间范围
    timeRange: '7d', // 7d, 30d, 90d
    customStartDate: '',
    customEndDate: '',
    
    // 仪表板数据
    dashboard: {
      overview: {
        totalEvents: 0,
        uniqueUsers: 0,
        uniqueSessions: 0,
        totalContentViews: 0,
        totalSearches: 0
      },
      userBehavior: {
        userSegments: {},
        deviceTypes: {},
        topPages: {}
      },
      contentPerformance: {
        topContent: [],
        contentTypes: {}
      },
      searchInsights: {
        topKeywords: [],
        searchIntents: {}
      },
      trends: {
        dailyEvents: {},
        trendDirection: 'stable'
      }
    },
    
    // 用户行为分析
    userBehavior: {
      userSegments: [],
      deviceTypes: [],
      topPages: [],
      userList: []
    },
    
    // 内容表现分析
    contentPerformance: {
      topContent: [],
      contentTypes: [],
      performanceMetrics: {}
    },
    
    // 搜索分析
    searchAnalytics: {
      topKeywords: [],
      searchIntents: [],
      searchTrends: []
    },
    
    // 事件追踪
    events: {
      list: [],
      pagination: {
        page: 1,
        perPage: 20,
        total: 0,
        pages: 0
      }
    },
    
    // 报告
    reports: {
      daily: null,
      weekly: null
    }
  },

  onLoad(options) {
    console.log('数据分析页面加载')
    this.initPage()
  },

  onShow() {
    this.loadData()
  },

  // 初始化页面
  initPage() {
    // 设置默认时间范围
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    
    this.setData({
      customStartDate: this.formatDate(startDate),
      customEndDate: this.formatDate(endDate)
    })
  },

  // 加载数据
  async loadData() {
    this.setData({ loading: true })
    
    try {
      await Promise.all([
        this.loadDashboard(),
        this.loadUserBehavior(),
        this.loadContentPerformance(),
        this.loadSearchAnalytics(),
        this.loadEvents()
      ])
    } catch (error) {
      console.error('加载数据失败:', error)
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 加载仪表板数据
  async loadDashboard() {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/dashboard`,
        method: 'GET',
        data: {
          days: this.getDaysFromRange()
        }
      })
      
      if (response.data.status === 'success') {
        this.setData({
          dashboard: response.data.data
        })
      }
    } catch (error) {
      console.error('加载仪表板失败:', error)
    }
  },

  // 加载用户行为分析
  async loadUserBehavior() {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/users/behavior`,
        method: 'GET'
      })
      
      if (response.data.status === 'success') {
        const data = response.data.data
        
        // 处理用户分段数据
        const userSegments = Object.entries(data.user_segments || {}).map(([segment, count]) => ({
          segment,
          count,
          percentage: this.calculatePercentage(count, Object.values(data.user_segments || {}).reduce((a, b) => a + b, 0))
        }))
        
        // 处理设备类型数据
        const deviceTypes = Object.entries(data.device_types || {}).map(([device, count]) => ({
          device,
          count,
          percentage: this.calculatePercentage(count, Object.values(data.device_types || {}).reduce((a, b) => a + b, 0))
        }))
        
        // 处理热门页面数据
        const topPages = Object.entries(data.top_pages || {}).map(([page, count]) => ({
          page,
          count
        }))
        
        this.setData({
          'userBehavior.userSegments': userSegments,
          'userBehavior.deviceTypes': deviceTypes,
          'userBehavior.topPages': topPages
        })
      }
    } catch (error) {
      console.error('加载用户行为分析失败:', error)
    }
  },

  // 加载内容表现分析
  async loadContentPerformance() {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/content/performance`,
        method: 'GET'
      })
      
      if (response.data.status === 'success') {
        const data = response.data.data
        
        // 处理内容类型数据
        const contentTypes = Object.entries(data.content_types || {}).map(([type, count]) => ({
          type,
          count,
          percentage: this.calculatePercentage(count, Object.values(data.content_types || {}).reduce((a, b) => a + b, 0))
        }))
        
        this.setData({
          'contentPerformance.topContent': data.top_content || [],
          'contentPerformance.contentTypes': contentTypes
        })
      }
    } catch (error) {
      console.error('加载内容表现分析失败:', error)
    }
  },

  // 加载搜索分析
  async loadSearchAnalytics() {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/search/analytics`,
        method: 'GET'
      })
      
      if (response.data.status === 'success') {
        const data = response.data.data
        
        // 处理搜索意图数据
        const searchIntents = Object.entries(data.search_intents || {}).map(([intent, count]) => ({
          intent,
          count,
          percentage: this.calculatePercentage(count, Object.values(data.search_intents || {}).reduce((a, b) => a + b, 0))
        }))
        
        this.setData({
          'searchAnalytics.topKeywords': data.top_keywords || [],
          'searchAnalytics.searchIntents': searchIntents
        })
      }
    } catch (error) {
      console.error('加载搜索分析失败:', error)
    }
  },

  // 加载事件列表
  async loadEvents() {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/events`,
        method: 'GET',
        data: {
          page: this.data.events.pagination.page,
          per_page: this.data.events.pagination.perPage
        }
      })
      
      if (response.data.status === 'success') {
        this.setData({
          'events.list': response.data.data,
          'events.pagination': response.data.pagination
        })
      }
    } catch (error) {
      console.error('加载事件列表失败:', error)
    }
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    
    // 根据标签页加载对应数据
    switch (tab) {
      case 'dashboard':
        this.loadDashboard()
        break
      case 'users':
        this.loadUserBehavior()
        break
      case 'content':
        this.loadContentPerformance()
        break
      case 'search':
        this.loadSearchAnalytics()
        break
      case 'events':
        this.loadEvents()
        break
      case 'reports':
        this.loadReports()
        break
    }
  },

  // 切换时间范围
  switchTimeRange(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ timeRange: range })
    this.loadData()
  },

  // 选择自定义日期
  onStartDateChange(e) {
    this.setData({
      customStartDate: e.detail.value
    })
  },

  onEndDateChange(e) {
    this.setData({
      customEndDate: e.detail.value
    })
  },

  // 应用自定义日期
  applyCustomDate() {
    this.loadData()
  },

  // 追踪事件
  async trackEvent(eventData) {
    try {
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/events`,
        method: 'POST',
        data: {
          event_type: eventData.type,
          session_id: app.globalData.sessionId || 'session_' + Date.now(),
          page: eventData.page,
          user_id: app.globalData.userInfo?.id,
          item_type: eventData.itemType,
          item_id: eventData.itemId,
          item_title: eventData.itemTitle,
          search_keyword: eventData.searchKeyword,
          category: eventData.category,
          province: eventData.province,
          price_range: eventData.priceRange,
          duration: eventData.duration,
          device_type: 'mobile',
          location: eventData.location,
          timestamp: new Date().toISOString(),
          metadata: eventData.metadata || {}
        }
      })
      
      if (response.data.status === 'success') {
        console.log('事件追踪成功:', response.data.data.event_id)
      }
    } catch (error) {
      console.error('事件追踪失败:', error)
    }
  },

  // 生成报告
  async generateReport(e) {
    const reportType = e.currentTarget.dataset.type
    
    try {
      wx.showLoading({ title: '生成报告中...' })
      
      let response
      if (reportType === 'daily') {
        response = await wx.request({
          url: `${app.globalData.apiBaseUrl}/api/analytics/reports/daily`,
          method: 'GET',
          data: {
            date: this.data.customEndDate
          }
        })
      } else {
        response = await wx.request({
          url: `${app.globalData.apiBaseUrl}/api/analytics/reports/weekly`,
          method: 'GET',
          data: {
            end_date: this.data.customEndDate
          }
        })
      }
      
      if (response.data.status === 'success') {
        this.setData({
          [`reports.${reportType}`]: response.data.data
        })
        
        wx.showToast({
          title: '报告生成成功',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('生成报告失败:', error)
      wx.showToast({
        title: '报告生成失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 导出数据
  async exportData(e) {
    const exportType = e.currentTarget.dataset.type
    
    try {
      wx.showLoading({ title: '导出中...' })
      
      const response = await wx.request({
        url: `${app.globalData.apiBaseUrl}/api/analytics/export`,
        method: 'GET',
        data: {
          type: exportType,
          format: 'json',
          start_date: this.data.customStartDate,
          end_date: this.data.customEndDate
        }
      })
      
      if (response.data.status === 'success') {
        // 在实际应用中，这里可以处理文件下载
        wx.showToast({
          title: '导出成功',
          icon: 'success'
        })
        
        console.log('导出数据:', response.data.data)
      }
    } catch (error) {
      console.error('导出数据失败:', error)
      wx.showToast({
        title: '导出失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 查看内容详情
  viewContentDetail(e) {
    const contentId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/content-detail/content-detail?id=${contentId}`
    })
  },

  // 查看用户详情
  viewUserDetail(e) {
    const userId = e.currentTarget.dataset.id
    // 这里可以跳转到用户详情页面
    wx.showToast({
      title: '用户详情功能开发中',
      icon: 'none'
    })
  },

  // 查看事件详情
  viewEventDetail(e) {
    const eventId = e.currentTarget.dataset.id
    // 这里可以显示事件详情弹窗
    wx.showToast({
      title: '事件详情功能开发中',
      icon: 'none'
    })
  },

  // 刷新数据
  refreshData() {
    this.loadData()
  },

  // 工具方法
  getDaysFromRange() {
    const ranges = {
      '7d': 7,
      '30d': 30,
      '90d': 90
    }
    return ranges[this.data.timeRange] || 7
  },

  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  calculatePercentage(value, total) {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  },

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  },

  formatDuration(seconds) {
    if (seconds < 60) {
      return `${seconds}秒`
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}分钟`
    } else {
      return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分钟`
    }
  },

  getTrendIcon(direction) {
    const icons = {
      'rising': '↗️',
      'falling': '↘️',
      'stable': '→'
    }
    return icons[direction] || '→'
  },

  getSegmentColor(segment) {
    const colors = {
      'new': '#4CAF50',
      'active': '#2196F3',
      'loyal': '#FF9800',
      'churned': '#F44336'
    }
    return colors[segment] || '#9E9E9E'
  },

  getIntentColor(intent) {
    const colors = {
      'informational': '#4CAF50',
      'navigational': '#2196F3',
      'transactional': '#FF9800'
    }
    return colors[intent] || '#9E9E9E'
  }
}) 