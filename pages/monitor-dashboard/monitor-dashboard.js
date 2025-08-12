// 监控数据可视化页面
const apiMonitor = require('../../utils/api-monitor-middleware.js')
const analyticsTracker = require('../../utils/analytics-tracker.js')

Page({
  data: {
    // 页面状态
    loading: true,
    refreshing: false,
    
    // API监控数据
    apiMonitorData: {
      summary: {},
      performance: {},
      realtime: {},
      slowAPIs: [],
      errorAPIs: [],
      recentCalls: []
    },
    
    // 埋点数据
    analyticsData: {
      summary: {},
      pages: {},
      features: {},
      errors: {},
      popularPages: [],
      popularFeatures: []
    },
    
    // 图表数据
    charts: {
      apiPerformance: {
        categories: [],
        responseTimes: [],
        errorRates: []
      },
      pageViews: {
        pages: [],
        views: []
      },
      userActions: {
        actions: [],
        counts: []
      }
    },
    
    // 筛选器
    filters: {
      timeRange: '1h', // 1h, 24h, 7d, 30d
      apiType: 'all',  // all, slow, error
      pageType: 'all'  // all, popular, error
    },
    
    // 实时更新
    realtimeUpdate: true,
    updateInterval: null
  },

  onLoad(options) {
    this.initPage()
    this.startRealtimeUpdate()
  },

  onShow() {
    this.refreshData()
  },

  onHide() {
    this.stopRealtimeUpdate()
  },

  onUnload() {
    this.stopRealtimeUpdate()
  },

  // 初始化页面
  initPage() {
    this.setData({
      loading: true
    })
    
    this.loadMonitorData()
    this.setupCharts()
  },

  // 加载监控数据
  async loadMonitorData() {
    try {
      // 获取API监控数据
      const apiData = apiMonitor.getMonitorData()
      
      // 获取埋点数据
      const analyticsData = analyticsTracker.getAnalyticsData()
      
      // 处理数据
      this.processAPIMonitorData(apiData)
      this.processAnalyticsData(analyticsData)
      
      this.setData({
        loading: false,
        refreshing: false
      })
      
    } catch (error) {
      console.error('加载监控数据失败:', error)
      wx.showToast({
        title: '数据加载失败',
        icon: 'error'
      })
      this.setData({
        loading: false,
        refreshing: false
      })
    }
  },

  // 处理API监控数据
  processAPIMonitorData(data) {
    const apiMonitorData = {
      summary: data.summary || {},
      performance: data.performance || {},
      realtime: data.realtime || {},
      slowAPIs: data.performance?.slowAPIs || [],
      errorAPIs: data.performance?.errorAPIs || [],
      recentCalls: data.calls?.slice(-20).reverse() || []
    }
    
    this.setData({
      apiMonitorData
    })
    
    // 更新图表数据
    this.updateAPIPerformanceChart(data)
  },

  // 处理埋点数据
  processAnalyticsData(data) {
    const analyticsData = {
      summary: data.summary || {},
      pages: data.pages || {},
      features: data.features || {},
      errors: data.errors || {},
      popularPages: analyticsTracker.getPopularPages(10),
      popularFeatures: analyticsTracker.getPopularFeatures(10)
    }
    
    this.setData({
      analyticsData
    })
    
    // 更新图表数据
    this.updatePageViewsChart(data)
    this.updateUserActionsChart(data)
  },

  // 更新API性能图表
  updateAPIPerformanceChart(data) {
    const calls = data.calls || []
    const recentCalls = calls.slice(-50) // 最近50次调用
    
    const categories = []
    const responseTimes = []
    const errorRates = []
    
    // 按API分组统计
    const apiStats = {}
    recentCalls.forEach(call => {
      const api = call.url
      if (!apiStats[api]) {
        apiStats[api] = {
          calls: 0,
          totalTime: 0,
          errors: 0
        }
      }
      
      apiStats[api].calls++
      apiStats[api].totalTime += call.responseTime
      if (!call.success) {
        apiStats[api].errors++
      }
    })
    
    // 转换为图表数据
    Object.keys(apiStats).forEach(api => {
      const stats = apiStats[api]
      categories.push(api.split('/').pop() || api)
      responseTimes.push(Math.round(stats.totalTime / stats.calls))
      errorRates.push(Math.round(stats.errors / stats.calls * 100))
    })
    
    this.setData({
      'charts.apiPerformance': {
        categories,
        responseTimes,
        errorRates
      }
    })
  },

  // 更新页面访问图表
  updatePageViewsChart(data) {
    const pages = data.pages || {}
    const pageViews = Object.keys(pages).map(page => ({
      page: page.split('/').pop() || page,
      views: pages[page].views || 0
    }))
    
    // 按访问量排序
    pageViews.sort((a, b) => b.views - a.views)
    
    const chartData = pageViews.slice(0, 10)
    
    this.setData({
      'charts.pageViews': {
        pages: chartData.map(item => item.page),
        views: chartData.map(item => item.views)
      }
    })
  },

  // 更新用户行为图表
  updateUserActionsChart(data) {
    const features = data.features || {}
    const userActions = Object.keys(features).map(feature => ({
      action: feature,
      count: features[feature].uses || 0
    }))
    
    // 按使用次数排序
    userActions.sort((a, b) => b.count - a.count)
    
    const chartData = userActions.slice(0, 10)
    
    this.setData({
      'charts.userActions': {
        actions: chartData.map(item => item.action),
        counts: chartData.map(item => item.count)
      }
    })
  },

  // 设置图表
  setupCharts() {
    // 这里可以初始化ECharts图表
    // 由于小程序环境限制，这里使用简单的数据展示
  },

  // 开始实时更新
  startRealtimeUpdate() {
    if (this.data.realtimeUpdate) {
      this.data.updateInterval = setInterval(() => {
        this.refreshData()
      }, 30000) // 每30秒更新一次
    }
  },

  // 停止实时更新
  stopRealtimeUpdate() {
    if (this.data.updateInterval) {
      clearInterval(this.data.updateInterval)
      this.data.updateInterval = null
    }
  },

  // 刷新数据
  refreshData() {
    this.setData({
      refreshing: true
    })
    this.loadMonitorData()
  },

  // 切换实时更新
  toggleRealtimeUpdate() {
    const realtimeUpdate = !this.data.realtimeUpdate
    this.setData({
      realtimeUpdate
    })
    
    if (realtimeUpdate) {
      this.startRealtimeUpdate()
    } else {
      this.stopRealtimeUpdate()
    }
  },

  // 筛选器变化
  onFilterChange(e) {
    const { type, value } = e.detail
    this.setData({
      [`filters.${type}`]: value
    })
    
    // 重新加载数据
    this.loadMonitorData()
  },

  // 查看API详情
  viewAPIDetail(e) {
    const { api } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/api-detail/api-detail?api=${encodeURIComponent(api)}`
    })
  },

  // 查看页面详情
  viewPageDetail(e) {
    const { page } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/page-detail/page-detail?page=${encodeURIComponent(page)}`
    })
  },

  // 查看错误详情
  viewErrorDetail(e) {
    const { error } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/error-detail/error-detail?error=${encodeURIComponent(error)}`
    })
  },

  // 导出数据
  exportData() {
    wx.showActionSheet({
      itemList: ['导出JSON', '导出CSV', '分享数据'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.exportJSON()
            break
          case 1:
            this.exportCSV()
            break
          case 2:
            this.shareData()
            break
        }
      }
    })
  },

  // 导出JSON
  exportJSON() {
    const data = {
      apiMonitor: this.data.apiMonitorData,
      analytics: this.data.analyticsData,
      exportTime: new Date().toISOString()
    }
    
    const jsonStr = JSON.stringify(data, null, 2)
    
    // 复制到剪贴板
    wx.setClipboardData({
      data: jsonStr,
      success: () => {
        wx.showToast({
          title: '数据已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  },

  // 导出CSV
  exportCSV() {
    // 生成CSV格式数据
    let csv = 'API,响应时间,错误率,调用次数\n'
    
    this.data.apiMonitorData.slowAPIs.forEach(api => {
      csv += `${api.url},${api.responseTime},${api.count},${api.count}\n`
    })
    
    wx.setClipboardData({
      data: csv,
      success: () => {
        wx.showToast({
          title: 'CSV数据已复制',
          icon: 'success'
        })
      }
    })
  },

  // 分享数据
  shareData() {
    const summary = this.data.apiMonitorData.summary
    const shareText = `茶叶批发平台监控报告\n\n` +
      `总调用次数: ${summary.totalCalls || 0}\n` +
      `平均响应时间: ${summary.avgResponseTime || 0}ms\n` +
      `错误率: ${summary.errorRate || '0%'}\n` +
      `慢API数量: ${summary.slowAPICount || 0}\n` +
      `错误API数量: ${summary.errorAPICount || 0}`
    
    wx.setClipboardData({
      data: shareText,
      success: () => {
        wx.showToast({
          title: '分享内容已复制',
          icon: 'success'
        })
      }
    })
  },

  // 重置数据
  resetData() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有监控数据吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          try {
            apiMonitor.reset()
            analyticsTracker.reset()
            
            wx.showToast({
              title: '数据已重置',
              icon: 'success'
            })
            
            this.refreshData()
          } catch (error) {
            wx.showToast({
              title: '重置失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '茶叶批发平台监控仪表盘',
      path: '/pages/monitor-dashboard/monitor-dashboard'
    }
  }
}) 