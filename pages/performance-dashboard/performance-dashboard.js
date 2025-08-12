const { performanceMonitor } = require('../../utils/performance-monitor')
const echarts = require('../../ec-canvas/echarts')

Page({
  data: {
    // 基础数据
    metrics: {},
    alerts: [],
    suggestions: [],
    
    // 图表数据
    chartData: {
      memoryTrend: [],
      apiTrend: [],
      errorTrend: []
    },
    
    // 自定义指标
    customMetrics: {
      activeUsers: 0,
      slowAPIs: [],
      topPages: [],
      alertCount: 0
    },
    
    // 筛选条件
    filters: {
      timeRange: '24h', // 24h, 7d, 30d
      alertType: 'all', // all, error, warning, info
      severity: 'all'   // all, high, medium, low
    },
    
    // ECharts配置
    ec: {
      onInit: function (canvas, width, height) {
        const chart = echarts.init(canvas, width, height);
        canvas.setChart(chart);
        return chart;
      }
    },
    
    // 页面状态
    loading: false,
    showFilters: false,
    selectedAlert: null,
    
    // 图表实例
    charts: {
      memory: null,
      api: null,
      error: null
    }
  },

  onLoad() {
    this.loadPerformanceData()
    this.startAutoRefresh()
  },

  onUnload() {
    this.stopAutoRefresh()
  },

  // 加载性能数据
  async loadPerformanceData() {
    this.setData({ loading: true })
    
    try {
      const report = performanceMonitor.getPerformanceReport()
      
      // 基础指标
      this.setData({
        metrics: report.stats || {},
        alerts: report.recentAlerts || [],
        suggestions: report.optimizationSuggestions || []
      })
      
      // 自定义指标
      this.updateCustomMetrics(report)
      
      // 图表数据
      this.updateChartData(report)
      
      // 检查告警并推送
      this.checkAndPushAlerts(report.recentAlerts || [])
      
    } catch (error) {
      console.error('加载性能数据失败:', error)
      wx.showToast({
        title: '数据加载失败',
        icon: 'error'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 更新自定义指标
  updateCustomMetrics(report) {
    const customMetrics = {
      activeUsers: this.calculateActiveUsers(),
      slowAPIs: this.getSlowAPIs(report),
      topPages: this.getTopPages(report),
      alertCount: (report.recentAlerts || []).length
    }
    
    this.setData({ customMetrics })
  },

  // 计算活跃用户数（模拟数据）
  calculateActiveUsers() {
    return Math.floor(Math.random() * 100) + 50
  },

  // 获取慢API列表
  getSlowAPIs(report) {
    const apiMetrics = report.latestMetrics || []
    return apiMetrics
      .filter(metric => metric.apiName && metric.responseTime > 1000)
      .sort((a, b) => b.responseTime - a.responseTime)
      .slice(0, 5)
      .map(api => ({
        name: api.apiName,
        time: api.responseTime,
        timestamp: api.timestamp
      }))
  },

  // 获取热门页面
  getTopPages(report) {
    const pageMetrics = report.latestMetrics || []
    return pageMetrics
      .filter(metric => metric.pageName)
      .sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
      .slice(0, 5)
      .map(page => ({
        name: page.pageName,
        visits: page.visitCount || 0,
        loadTime: page.loadTime || 0
      }))
  },

  // 更新图表数据
  updateChartData(report) {
    const now = Date.now()
    const timePoints = []
    const memoryData = []
    const apiData = []
    const errorData = []
    
    // 生成24小时的时间点
    for (let i = 23; i >= 0; i--) {
      const time = now - i * 60 * 60 * 1000
      timePoints.push(new Date(time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
      
      // 模拟数据（实际应该从历史数据中获取）
      memoryData.push(Math.random() * 30 + 50)
      apiData.push(Math.random() * 500 + 200)
      errorData.push(Math.random() * 5)
    }
    
    this.setData({
      'chartData.memoryTrend': memoryData,
      'chartData.apiTrend': apiData,
      'chartData.errorTrend': errorData
    })
    
    this.updateChartOptions(timePoints)
  },

  // 更新图表配置
  updateChartOptions(timePoints) {
    // 内存使用率趋势图
    const memoryOption = {
      title: {
        text: '内存使用率趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>内存使用率: {c}%'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '使用率(%)',
        min: 0,
        max: 100,
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: this.data.chartData.memoryTrend,
        type: 'line',
        smooth: true,
        name: '内存使用率',
        itemStyle: { 
          color: '#4CAF50',
          borderColor: '#4CAF50'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(76, 175, 80, 0.3)'
            }, {
              offset: 1, color: 'rgba(76, 175, 80, 0.1)'
            }]
          }
        }
      }]
    }

    // API响应时间趋势图
    const apiOption = {
      title: {
        text: 'API响应时间趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>响应时间: {c}ms'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '响应时间(ms)',
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: this.data.chartData.apiTrend,
        type: 'line',
        smooth: true,
        name: 'API响应时间',
        itemStyle: { 
          color: '#2196F3',
          borderColor: '#2196F3'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(33, 150, 243, 0.3)'
            }, {
              offset: 1, color: 'rgba(33, 150, 243, 0.1)'
            }]
          }
        }
      }]
    }

    // 错误率趋势图
    const errorOption = {
      title: {
        text: '错误率趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>错误率: {c}%'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '错误率(%)',
        min: 0,
        max: 10,
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: this.data.chartData.errorTrend,
        type: 'line',
        smooth: true,
        name: '错误率',
        itemStyle: { 
          color: '#F44336',
          borderColor: '#F44336'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(244, 67, 54, 0.3)'
            }, {
              offset: 1, color: 'rgba(244, 67, 54, 0.1)'
            }]
          }
        }
      }]
    }

    // 更新图表
    this.updateChart('memory', memoryOption)
    this.updateChart('api', apiOption)
    this.updateChart('error', errorOption)
  },

  // 更新图表
  updateChart(chartName, option) {
    if (this.data.charts[chartName]) {
      this.data.charts[chartName].setOption(option)
    }
  },

  // 图表初始化完成回调
  onChartInit(e) {
    const { chart, canvas, width, height } = e.detail
    const chartName = e.currentTarget.dataset.chart
    
    // 保存图表实例
    this.setData({
      [`charts.${chartName}`]: chart
    })
    
    // 设置图表配置
    const option = this.getChartOption(chartName)
    if (option) {
      chart.setOption(option)
    }
  },

  // 获取图表配置
  getChartOption(chartName) {
    const timePoints = []
    const now = Date.now()
    
    // 生成时间点
    for (let i = 23; i >= 0; i--) {
      const time = now - i * 60 * 60 * 1000
      timePoints.push(new Date(time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
    }
    
    const baseOption = {
      title: {
        text: this.getChartTitle(chartName),
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: this.getChartYAxisName(chartName),
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: this.data.chartData[`${chartName}Trend`] || [],
        type: 'line',
        smooth: true,
        name: this.getChartSeriesName(chartName),
        itemStyle: { 
          color: this.getChartColor(chartName)
        }
      }]
    }
    
    return baseOption
  },

  // 获取图表标题
  getChartTitle(chartName) {
    const titles = {
      memory: '内存使用率趋势',
      api: 'API响应时间趋势',
      error: '错误率趋势'
    }
    return titles[chartName] || ''
  },

  // 获取Y轴名称
  getChartYAxisName(chartName) {
    const names = {
      memory: '使用率(%)',
      api: '响应时间(ms)',
      error: '错误率(%)'
    }
    return names[chartName] || ''
  },

  // 获取系列名称
  getChartSeriesName(chartName) {
    const names = {
      memory: '内存使用率',
      api: 'API响应时间',
      error: '错误率'
    }
    return names[chartName] || ''
  },

  // 获取图表颜色
  getChartColor(chartName) {
    const colors = {
      memory: '#4CAF50',
      api: '#2196F3',
      error: '#F44336'
    }
    return colors[chartName] || '#333'
  },

  // 检查并推送告警
  checkAndPushAlerts(alerts) {
    const criticalAlerts = alerts.filter(alert => 
      alert.level === 'error' || alert.level === 'critical'
    )
    
    if (criticalAlerts.length > 0) {
      this.showAlertNotification(criticalAlerts[0])
    }
  },

  // 显示告警通知
  showAlertNotification(alert) {
    wx.showModal({
      title: '🚨 性能告警',
      content: alert.message,
      confirmText: '查看详情',
      cancelText: '忽略',
      success: (res) => {
        if (res.confirm) {
          this.showAlertDetail(alert)
        }
      }
    })
  },

  // 显示告警详情
  showAlertDetail(alert) {
    this.setData({ selectedAlert: alert })
    wx.showModal({
      title: '告警详情',
      content: `类型: ${alert.type}\n级别: ${alert.level}\n时间: ${new Date(alert.timestamp).toLocaleString()}\n\n${alert.message}`,
      showCancel: false,
      confirmText: '关闭'
    })
  },

  // 自动刷新
  startAutoRefresh() {
    this.refreshTimer = setInterval(() => {
      this.loadPerformanceData()
    }, 30000) // 30秒刷新一次
  },

  stopAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  },

  // 筛选功能
  onFilterChange(e) {
    const { type, value } = e.detail
    this.setData({
      [`filters.${type}`]: value
    })
    this.applyFilters()
  },

  applyFilters() {
    const { filters } = this.data
    let filteredAlerts = this.data.alerts
    
    // 按类型筛选
    if (filters.alertType !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.type === filters.alertType)
    }
    
    // 按严重程度筛选
    if (filters.severity !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.level === filters.severity)
    }
    
    this.setData({ alerts: filteredAlerts })
  },

  // 显示筛选器
  toggleFilters() {
    this.setData({
      showFilters: !this.data.showFilters
    })
  },

  // 数据导出
  exportData() {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics: this.data.metrics,
      alerts: this.data.alerts,
      suggestions: this.data.suggestions,
      customMetrics: this.data.customMetrics
    }
    
    // 复制到剪贴板
    wx.setClipboardData({
      data: JSON.stringify(exportData, null, 2),
      success: () => {
        wx.showToast({
          title: '数据已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '茶叶批发平台性能监控',
      path: '/pages/performance-dashboard/performance-dashboard',
      imageUrl: '/images/performance-share.png'
    }
  },

  // 手动刷新
  onRefresh() {
    this.loadPerformanceData()
    wx.showToast({
      title: '数据已刷新',
      icon: 'success'
    })
  },

  // 一键优化
  onOptimize() {
    wx.showModal({
      title: '性能优化',
      content: '是否执行一键性能优化？',
      success: (res) => {
        if (res.confirm) {
          performanceMonitor.optimize().then(() => {
            wx.showToast({
              title: '优化完成',
              icon: 'success'
            })
            this.loadPerformanceData()
          })
        }
      }
    })
  }
}) 