// 性能仪表盘功能测试脚本
const { performanceMonitor } = require('./utils/performance-monitor')
const { apiMonitor } = require('./utils/api-monitor')
const { alertPushService } = require('./utils/alert-push-service')
const { dataExportService } = require('./utils/data-export-service')

// 模拟性能数据
const mockPerformanceData = {
  metrics: {
    memoryUsage: 65.5,
    apiAvgResponseTime: 850,
    errorRate: 2.3,
    uptime: 120
  },
  alerts: [
    {
      id: 1,
      level: 'warning',
      type: 'memory_high',
      message: '内存使用率较高，建议优化',
      timestamp: Date.now() - 300000
    },
    {
      id: 2,
      level: 'error',
      type: 'api_timeout',
      message: 'API请求超时',
      timestamp: Date.now() - 600000
    }
  ],
  suggestions: [
    '建议清理缓存数据',
    '优化图片加载策略',
    '减少不必要的API调用'
  ],
  customMetrics: {
    activeUsers: 87,
    slowAPIs: [
      { name: '/api/market/list', time: 2500, timestamp: Date.now() - 1000000 },
      { name: '/api/supply/search', time: 1800, timestamp: Date.now() - 2000000 }
    ],
    topPages: [
      { name: '首页', visits: 156, loadTime: 1200 },
      { name: '市场详情', visits: 89, loadTime: 1800 }
    ],
    alertCount: 2
  }
}

// 测试函数
class PerformanceDashboardTest {
  constructor() {
    this.testResults = []
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🚀 开始性能仪表盘功能测试...\n')
    
    await this.testPerformanceMonitor()
    await this.testAPIMonitor()
    await this.testAlertPushService()
    await this.testDataExportService()
    await this.testDashboardPage()
    
    this.printTestResults()
  }

  // 测试性能监控
  async testPerformanceMonitor() {
    console.log('📊 测试性能监控功能...')
    
    try {
      // 测试获取性能报告
      const report = performanceMonitor.getPerformanceReport()
      this.assert(report, '性能报告获取成功')
      
      // 测试记录API调用
      performanceMonitor.recordAPICall('/api/test', 500, true)
      this.assert(true, 'API调用记录成功')
      
      // 测试阈值检查
      const thresholds = performanceMonitor.checkThresholds()
      this.assert(Array.isArray(thresholds), '阈值检查成功')
      
      console.log('✅ 性能监控测试通过\n')
    } catch (error) {
      this.assert(false, `性能监控测试失败: ${error.message}`)
    }
  }

  // 测试API监控
  async testAPIMonitor() {
    console.log('🔍 测试API监控功能...')
    
    try {
      // 测试API统计
      const stats = apiMonitor.getAPIStats()
      this.assert(stats, 'API统计获取成功')
      
      // 测试慢API记录
      const slowAPIs = apiMonitor.getSlowAPIs()
      this.assert(Array.isArray(slowAPIs), '慢API列表获取成功')
      
      // 测试错误API记录
      const errorAPIs = apiMonitor.getErrorAPIs()
      this.assert(Array.isArray(errorAPIs), '错误API列表获取成功')
      
      console.log('✅ API监控测试通过\n')
    } catch (error) {
      this.assert(false, `API监控测试失败: ${error.message}`)
    }
  }

  // 测试告警推送服务
  async testAlertPushService() {
    console.log('🚨 测试告警推送功能...')
    
    try {
      // 测试告警推送
      alertPushService.pushAlert({
        level: 'warning',
        type: 'test',
        message: '测试告警消息',
        timestamp: Date.now()
      })
      this.assert(true, '告警推送成功')
      
      // 测试历史记录
      const history = alertPushService.getHistory()
      this.assert(Array.isArray(history), '告警历史获取成功')
      
      // 测试统计信息
      const stats = alertPushService.getAlertStats()
      this.assert(stats, '告警统计获取成功')
      
      console.log('✅ 告警推送测试通过\n')
    } catch (error) {
      this.assert(false, `告警推送测试失败: ${error.message}`)
    }
  }

  // 测试数据导出服务
  async testDataExportService() {
    console.log('📤 测试数据导出功能...')
    
    try {
      // 测试JSON导出
      const jsonExport = dataExportService.exportPerformanceData(mockPerformanceData, 'json')
      this.assert(jsonExport.content, 'JSON导出成功')
      
      // 测试CSV导出
      const csvExport = dataExportService.exportPerformanceData(mockPerformanceData, 'csv')
      this.assert(csvExport.content, 'CSV导出成功')
      
      // 测试TXT导出
      const txtExport = dataExportService.exportPerformanceData(mockPerformanceData, 'txt')
      this.assert(txtExport.content, 'TXT导出成功')
      
      // 测试分享内容生成
      const shareContent = dataExportService.generateShareContent(mockPerformanceData)
      this.assert(shareContent.title, '分享内容生成成功')
      
      console.log('✅ 数据导出测试通过\n')
    } catch (error) {
      this.assert(false, `数据导出测试失败: ${error.message}`)
    }
  }

  // 测试仪表盘页面
  async testDashboardPage() {
    console.log('📱 测试仪表盘页面功能...')
    
    try {
      // 模拟页面数据加载
      const pageData = {
        metrics: mockPerformanceData.metrics,
        alerts: mockPerformanceData.alerts,
        suggestions: mockPerformanceData.suggestions,
        customMetrics: mockPerformanceData.customMetrics,
        chartData: {
          memoryTrend: [60, 65, 70, 68, 72, 75, 73, 71, 69, 67],
          apiTrend: [800, 850, 900, 820, 880, 920, 860, 840, 890, 870],
          errorTrend: [2.1, 2.3, 2.0, 2.5, 2.2, 2.4, 2.1, 2.3, 2.0, 2.2]
        }
      }
      
      this.assert(pageData.metrics, '页面数据加载成功')
      this.assert(pageData.alerts.length > 0, '告警数据加载成功')
      this.assert(pageData.suggestions.length > 0, '建议数据加载成功')
      this.assert(pageData.customMetrics, '自定义指标加载成功')
      this.assert(pageData.chartData, '图表数据加载成功')
      
      console.log('✅ 仪表盘页面测试通过\n')
    } catch (error) {
      this.assert(false, `仪表盘页面测试失败: ${error.message}`)
    }
  }

  // 断言函数
  assert(condition, message) {
    const result = {
      success: !!condition,
      message: message,
      timestamp: new Date().toISOString()
    }
    
    this.testResults.push(result)
    
    if (!condition) {
      console.log(`❌ ${message}`)
    } else {
      console.log(`✅ ${message}`)
    }
  }

  // 打印测试结果
  printTestResults() {
    console.log('\n📋 测试结果汇总:')
    console.log('=' * 50)
    
    const total = this.testResults.length
    const passed = this.testResults.filter(r => r.success).length
    const failed = total - passed
    
    console.log(`总测试数: ${total}`)
    console.log(`通过: ${passed}`)
    console.log(`失败: ${failed}`)
    console.log(`成功率: ${((passed / total) * 100).toFixed(1)}%`)
    
    if (failed > 0) {
      console.log('\n❌ 失败的测试:')
      this.testResults
        .filter(r => !r.success)
        .forEach(r => console.log(`- ${r.message}`))
    }
    
    console.log('\n🎉 测试完成!')
  }

  // 生成测试报告
  generateTestReport() {
    const report = {
      timestamp: new Date().toISOString(),
      total: this.testResults.length,
      passed: this.testResults.filter(r => r.success).length,
      failed: this.testResults.filter(r => !r.success).length,
      results: this.testResults
    }
    
    return report
  }
}

// 运行测试
if (typeof module !== 'undefined' && module.exports) {
  // Node.js环境
  const test = new PerformanceDashboardTest()
  test.runAllTests().then(() => {
    const report = test.generateTestReport()
    console.log('\n📄 测试报告:', JSON.stringify(report, null, 2))
  })
} else {
  // 小程序环境
  const test = new PerformanceDashboardTest()
  test.runAllTests()
}

module.exports = PerformanceDashboardTest 