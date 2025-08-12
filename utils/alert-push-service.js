// 性能告警推送服务
class AlertPushService {
  constructor() {
    this.isEnabled = true
    this.notificationHistory = []
    this.maxHistory = 100
    this.alertLevels = {
      critical: { color: '#f44336', icon: '🚨', priority: 3 },
      error: { color: '#ff5722', icon: '❌', priority: 2 },
      warning: { color: '#ff9800', icon: '⚠️', priority: 1 },
      info: { color: '#2196f3', icon: 'ℹ️', priority: 0 }
    }
  }

  // 推送告警通知
  pushAlert(alert) {
    if (!this.isEnabled) return

    // 记录到历史
    this.addToHistory(alert)

    // 根据级别决定通知方式
    const level = this.alertLevels[alert.level] || this.alertLevels.info
    
    if (level.priority >= 2) {
      // 高优先级：弹窗通知
      this.showModalAlert(alert, level)
    } else if (level.priority >= 1) {
      // 中优先级：Toast通知
      this.showToastAlert(alert, level)
    } else {
      // 低优先级：静默记录
      this.logAlert(alert, level)
    }
  }

  // 显示弹窗告警
  showModalAlert(alert, level) {
    wx.showModal({
      title: `${level.icon} 性能告警`,
      content: alert.message,
      confirmText: '查看详情',
      cancelText: '忽略',
      confirmColor: level.color,
      success: (res) => {
        if (res.confirm) {
          this.showAlertDetail(alert)
        }
      }
    })
  }

  // 显示Toast告警
  showToastAlert(alert, level) {
    wx.showToast({
      title: `${level.icon} ${alert.message}`,
      icon: 'none',
      duration: 3000
    })
  }

  // 记录告警
  logAlert(alert, level) {
    console.log(`${level.icon} [${alert.level.toUpperCase()}] ${alert.message}`)
  }

  // 显示告警详情
  showAlertDetail(alert) {
    const detailContent = `
告警详情:
类型: ${alert.type}
级别: ${alert.level}
时间: ${new Date(alert.timestamp).toLocaleString()}
消息: ${alert.message}
${alert.context ? `上下文: ${JSON.stringify(alert.context, null, 2)}` : ''}
    `.trim()

    wx.showModal({
      title: '告警详情',
      content: detailContent,
      showCancel: false,
      confirmText: '关闭'
    })
  }

  // 批量推送告警
  pushAlerts(alerts) {
    if (!Array.isArray(alerts)) return

    // 按优先级排序
    const sortedAlerts = alerts.sort((a, b) => {
      const levelA = this.alertLevels[a.level] || this.alertLevels.info
      const levelB = this.alertLevels[b.level] || this.alertLevels.info
      return levelB.priority - levelA.priority
    })

    // 推送前3个最重要的告警
    sortedAlerts.slice(0, 3).forEach(alert => {
      this.pushAlert(alert)
    })
  }

  // 检查并推送关键告警
  checkAndPushCriticalAlerts(alerts) {
    const criticalAlerts = alerts.filter(alert => 
      alert.level === 'critical' || alert.level === 'error'
    )

    if (criticalAlerts.length > 0) {
      this.pushAlerts(criticalAlerts)
    }
  }

  // 添加到历史记录
  addToHistory(alert) {
    this.notificationHistory.unshift({
      ...alert,
      pushTime: Date.now()
    })

    // 限制历史记录数量
    if (this.notificationHistory.length > this.maxHistory) {
      this.notificationHistory = this.notificationHistory.slice(0, this.maxHistory)
    }

    // 保存到本地存储
    wx.setStorageSync('alertHistory', this.notificationHistory)
  }

  // 获取历史记录
  getHistory(limit = 50) {
    return this.notificationHistory.slice(0, limit)
  }

  // 清理历史记录
  clearHistory() {
    this.notificationHistory = []
    wx.removeStorageSync('alertHistory')
  }

  // 获取告警统计
  getAlertStats() {
    const stats = {
      total: this.notificationHistory.length,
      critical: 0,
      error: 0,
      warning: 0,
      info: 0,
      today: 0
    }

    const today = new Date().setHours(0, 0, 0, 0)

    this.notificationHistory.forEach(alert => {
      stats[alert.level]++
      if (alert.pushTime >= today) {
        stats.today++
      }
    })

    return stats
  }

  // 启用/禁用推送
  setEnabled(enabled) {
    this.isEnabled = enabled
  }

  // 设置最大历史记录数
  setMaxHistory(max) {
    this.maxHistory = max
  }

  // 自定义告警级别
  setAlertLevel(level, config) {
    this.alertLevels[level] = {
      ...this.alertLevels[level],
      ...config
    }
  }

  // 获取告警级别配置
  getAlertLevels() {
    return this.alertLevels
  }
}

// 创建全局实例
const alertPushService = new AlertPushService()

module.exports = {
  AlertPushService,
  alertPushService
} 