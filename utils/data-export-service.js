// 数据导出和分享服务
class DataExportService {
  constructor() {
    this.exportFormats = {
      json: 'application/json',
      csv: 'text/csv',
      txt: 'text/plain'
    }
  }

  // 导出性能数据
  exportPerformanceData(data, format = 'json') {
    switch (format) {
      case 'json':
        return this.exportAsJSON(data)
      case 'csv':
        return this.exportAsCSV(data)
      case 'txt':
        return this.exportAsTXT(data)
      default:
        return this.exportAsJSON(data)
    }
  }

  // 导出为JSON格式
  exportAsJSON(data) {
    const exportData = {
      exportTime: new Date().toISOString(),
      version: '1.0',
      data: data
    }

    return {
      content: JSON.stringify(exportData, null, 2),
      filename: `performance-data-${Date.now()}.json`,
      type: this.exportFormats.json
    }
  }

  // 导出为CSV格式
  exportAsCSV(data) {
    let csvContent = '指标,数值,单位,时间\n'
    
    // 核心指标
    if (data.metrics) {
      Object.entries(data.metrics).forEach(([key, value]) => {
        csvContent += `${key},${value},${this.getUnit(key)},${new Date().toISOString()}\n`
      })
    }

    // 告警数据
    if (data.alerts && data.alerts.length > 0) {
      csvContent += '\n告警数据\n级别,类型,消息,时间\n'
      data.alerts.forEach(alert => {
        csvContent += `${alert.level},${alert.type},"${alert.message}",${new Date(alert.timestamp).toISOString()}\n`
      })
    }

    // 建议数据
    if (data.suggestions && data.suggestions.length > 0) {
      csvContent += '\n优化建议\n建议内容\n'
      data.suggestions.forEach(suggestion => {
        csvContent += `"${suggestion}"\n`
      })
    }

    return {
      content: csvContent,
      filename: `performance-data-${Date.now()}.csv`,
      type: this.exportFormats.csv
    }
  }

  // 导出为TXT格式
  exportAsTXT(data) {
    let txtContent = '茶叶批发平台性能监控报告\n'
    txtContent += '=' * 50 + '\n'
    txtContent += `生成时间: ${new Date().toLocaleString()}\n\n`

    // 核心指标
    txtContent += '核心指标:\n'
    txtContent += '-' * 20 + '\n'
    if (data.metrics) {
      Object.entries(data.metrics).forEach(([key, value]) => {
        txtContent += `${key}: ${value}${this.getUnit(key)}\n`
      })
    }

    // 告警数据
    if (data.alerts && data.alerts.length > 0) {
      txtContent += '\n告警信息:\n'
      txtContent += '-' * 20 + '\n'
      data.alerts.forEach(alert => {
        txtContent += `[${alert.level.toUpperCase()}] ${alert.type}: ${alert.message}\n`
        txtContent += `时间: ${new Date(alert.timestamp).toLocaleString()}\n\n`
      })
    }

    // 建议数据
    if (data.suggestions && data.suggestions.length > 0) {
      txtContent += '优化建议:\n'
      txtContent += '-' * 20 + '\n'
      data.suggestions.forEach((suggestion, index) => {
        txtContent += `${index + 1}. ${suggestion}\n`
      })
    }

    return {
      content: txtContent,
      filename: `performance-report-${Date.now()}.txt`,
      type: this.exportFormats.txt
    }
  }

  // 获取单位
  getUnit(key) {
    const units = {
      memoryUsage: '%',
      apiAvgResponseTime: 'ms',
      errorRate: '%',
      uptime: '分钟'
    }
    return units[key] || ''
  }

  // 复制到剪贴板
  copyToClipboard(content) {
    return new Promise((resolve, reject) => {
      wx.setClipboardData({
        data: content,
        success: () => {
          wx.showToast({
            title: '数据已复制到剪贴板',
            icon: 'success'
          })
          resolve(true)
        },
        fail: (err) => {
          wx.showToast({
            title: '复制失败',
            icon: 'error'
          })
          reject(err)
        }
      })
    })
  }

  // 保存到本地文件
  saveToFile(content, filename) {
    // 小程序环境下，通常通过分享或复制到剪贴板来实现
    // 这里提供基础的保存逻辑
    return this.copyToClipboard(content)
  }

  // 生成分享内容
  generateShareContent(data) {
    const shareData = {
      title: '茶叶批发平台性能监控',
      path: '/pages/performance-dashboard/performance-dashboard',
      imageUrl: '/images/performance-share.png',
      content: this.generateShareText(data)
    }

    return shareData
  }

  // 生成分享文本
  generateShareText(data) {
    let text = '📊 茶叶批发平台性能监控报告\n\n'
    
    // 核心指标摘要
    if (data.metrics) {
      text += '📈 核心指标:\n'
      Object.entries(data.metrics).forEach(([key, value]) => {
        text += `• ${key}: ${value}${this.getUnit(key)}\n`
      })
    }

    // 告警摘要
    if (data.alerts && data.alerts.length > 0) {
      text += `\n🚨 告警数量: ${data.alerts.length}\n`
    }

    // 建议摘要
    if (data.suggestions && data.suggestions.length > 0) {
      text += `\n💡 优化建议: ${data.suggestions.length}条\n`
    }

    text += '\n查看详细报告请点击小程序'
    
    return text
  }

  // 导出图表数据
  exportChartData(chartData) {
    const exportData = {
      timestamp: Date.now(),
      charts: {
        memory: {
          title: '内存使用率趋势',
          data: chartData.memoryTrend,
          unit: '%'
        },
        api: {
          title: 'API响应时间趋势',
          data: chartData.apiTrend,
          unit: 'ms'
        },
        error: {
          title: '错误率趋势',
          data: chartData.errorTrend,
          unit: '%'
        }
      }
    }

    return this.exportAsJSON(exportData)
  }

  // 批量导出
  async batchExport(dataList, format = 'json') {
    const results = []
    
    for (const data of dataList) {
      try {
        const result = this.exportPerformanceData(data, format)
        results.push({
          success: true,
          data: result
        })
      } catch (error) {
        results.push({
          success: false,
          error: error.message
        })
      }
    }

    return results
  }

  // 获取导出格式列表
  getExportFormats() {
    return Object.keys(this.exportFormats)
  }

  // 验证导出数据
  validateExportData(data) {
    const required = ['metrics', 'alerts', 'suggestions']
    const missing = required.filter(key => !data[key])
    
    if (missing.length > 0) {
      throw new Error(`缺少必要数据: ${missing.join(', ')}`)
    }

    return true
  }
}

// 创建全局实例
const dataExportService = new DataExportService()

module.exports = {
  DataExportService,
  dataExportService
} 