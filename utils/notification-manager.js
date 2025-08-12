// 消息通知管理器 - 统一处理通知功能
class NotificationManager {
  constructor() {
    this.notifications = []
    this.unreadCount = 0
    this.storageKey = 'notifications'
    this.settingsKey = 'notificationSettings'
    this.maxNotifications = 100 // 最大通知数量
    
    this.loadNotifications()
    this.loadSettings()
  }

  /**
   * 加载通知数据
   */
  loadNotifications() {
    try {
      const notifications = wx.getStorageSync(this.storageKey) || []
      this.notifications = notifications
      this.updateUnreadCount()
    } catch (error) {
      console.error('加载通知数据失败:', error)
    }
  }

  /**
   * 保存通知数据
   */
  saveNotifications() {
    try {
      wx.setStorageSync(this.storageKey, this.notifications)
    } catch (error) {
      console.error('保存通知数据失败:', error)
    }
  }

  /**
   * 加载通知设置
   */
  loadSettings() {
    try {
      const settings = wx.getStorageSync(this.settingsKey) || {
        enabled: true,
        sound: true,
        vibrate: true,
        types: {
          system: true,
          price: true,
          goods: true,
          activity: true,
          order: true,
          message: true
        }
      }
      this.settings = settings
    } catch (error) {
      console.error('加载通知设置失败:', error)
      this.settings = {
        enabled: true,
        sound: true,
        vibrate: true,
        types: {
          system: true,
          price: true,
          goods: true,
          activity: true,
          order: true,
          message: true
        }
      }
    }
  }

  /**
   * 保存通知设置
   */
  saveSettings() {
    try {
      wx.setStorageSync(this.settingsKey, this.settings)
    } catch (error) {
      console.error('保存通知设置失败:', error)
    }
  }

  /**
   * 更新未读数量
   */
  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length
    
    // 更新tabBar角标
    if (this.unreadCount > 0) {
      wx.setTabBarBadge({
        index: 1, // 通知页面的tabBar索引
        text: this.unreadCount > 99 ? '99+' : this.unreadCount.toString()
      })
    } else {
      wx.removeTabBarBadge({
        index: 1
      })
    }
  }

  /**
   * 添加通知
   */
  addNotification(notification) {
    if (!this.settings.enabled || !this.settings.types[notification.type]) {
      return false
    }

    const newNotification = {
      id: Date.now() + Math.random(),
      title: notification.title,
      content: notification.content,
      type: notification.type,
      icon: notification.icon || this.getDefaultIcon(notification.type),
      time: new Date().toISOString(),
      read: false,
      data: notification.data || {},
      actions: notification.actions || []
    }

    this.notifications.unshift(newNotification)

    // 保持通知数量不超过最大值
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications)
    }

    this.saveNotifications()
    this.updateUnreadCount()

    // 显示系统通知
    this.showSystemNotification(newNotification)

    return newNotification
  }

  /**
   * 获取默认图标
   */
  getDefaultIcon(type) {
    const iconMap = {
      system: '🔔',
      price: '💰',
      goods: '📦',
      activity: '🎉',
      order: '🚚',
      message: '💬'
    }
    return iconMap[type] || '🔔'
  }

  /**
   * 显示系统通知
   */
  showSystemNotification(notification) {
    if (!this.settings.enabled) return

    // 显示Toast通知
    wx.showToast({
      title: notification.title,
      icon: 'none',
      duration: 2000
    })

    // 震动反馈
    if (this.settings.vibrate) {
      wx.vibrateShort()
    }

    // 播放声音（小程序中无法直接播放声音）
    if (this.settings.sound) {
      // 这里可以添加声音播放逻辑
      console.log('播放通知声音')
    }
  }

  /**
   * 标记通知为已读
   */
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification && !notification.read) {
      notification.read = true
      this.saveNotifications()
      this.updateUnreadCount()
      return true
    }
    return false
  }

  /**
   * 标记所有通知为已读
   */
  markAllAsRead() {
    let hasUnread = false
    this.notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true
        hasUnread = true
      }
    })

    if (hasUnread) {
      this.saveNotifications()
      this.updateUnreadCount()
    }

    return hasUnread
  }

  /**
   * 删除通知
   */
  deleteNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      this.notifications.splice(index, 1)
      this.saveNotifications()
      this.updateUnreadCount()
      return true
    }
    return false
  }

  /**
   * 清空所有通知
   */
  clearAllNotifications() {
    this.notifications = []
    this.saveNotifications()
    this.updateUnreadCount()
  }

  /**
   * 获取通知列表
   */
  getNotifications(options = {}) {
    const { 
      type = null, 
      read = null, 
      limit = null,
      offset = 0 
    } = options

    let filteredNotifications = this.notifications

    // 按类型筛选
    if (type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === type)
    }

    // 按读取状态筛选
    if (read !== null) {
      filteredNotifications = filteredNotifications.filter(n => n.read === read)
    }

    // 分页
    if (limit) {
      filteredNotifications = filteredNotifications.slice(offset, offset + limit)
    }

    return filteredNotifications.map(notification => ({
      ...notification,
      timeText: this.formatTime(notification.time)
    }))
  }

  /**
   * 获取通知统计
   */
  getNotificationStats() {
    const stats = {
      total: this.notifications.length,
      unread: this.unreadCount,
      read: this.notifications.length - this.unreadCount,
      types: {}
    }

    // 按类型统计
    this.notifications.forEach(notification => {
      if (!stats.types[notification.type]) {
        stats.types[notification.type] = {
          total: 0,
          unread: 0,
          read: 0
        }
      }
      stats.types[notification.type].total++
      if (notification.read) {
        stats.types[notification.type].read++
      } else {
        stats.types[notification.type].unread++
      }
    })

    return stats
  }

  /**
   * 格式化时间
   */
  formatTime(timeString) {
    const time = new Date(timeString)
    const now = new Date()
    const diff = now - time

    if (diff < 60000) { // 1分钟内
      return '刚刚'
    } else if (diff < 3600000) { // 1小时内
      return `${Math.floor(diff / 60000)}分钟前`
    } else if (diff < 86400000) { // 1天内
      return `${Math.floor(diff / 3600000)}小时前`
    } else if (diff < 604800000) { // 1周内
      return `${Math.floor(diff / 86400000)}天前`
    } else {
      return time.toLocaleDateString()
    }
  }

  /**
   * 创建系统通知
   */
  createSystemNotification(title, content, data = {}) {
    return this.addNotification({
      type: 'system',
      title,
      content,
      data
    })
  }

  /**
   * 创建价格提醒
   */
  createPriceAlert(title, content, data = {}) {
    return this.addNotification({
      type: 'price',
      title,
      content,
      data
    })
  }

  /**
   * 创建新货通知
   */
  createGoodsNotification(title, content, data = {}) {
    return this.addNotification({
      type: 'goods',
      title,
      content,
      data
    })
  }

  /**
   * 创建活动通知
   */
  createActivityNotification(title, content, data = {}) {
    return this.addNotification({
      type: 'activity',
      title,
      content,
      data
    })
  }

  /**
   * 创建订单通知
   */
  createOrderNotification(title, content, data = {}) {
    return this.addNotification({
      type: 'order',
      title,
      content,
      data
    })
  }

  /**
   * 创建消息通知
   */
  createMessageNotification(title, content, data = {}) {
    return this.addNotification({
      type: 'message',
      title,
      content,
      data
    })
  }

  /**
   * 更新通知设置
   */
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings }
    this.saveSettings()
  }

  /**
   * 获取通知设置
   */
  getSettings() {
    return this.settings
  }

  /**
   * 检查通知权限
   */
  checkNotificationPermission() {
    return new Promise((resolve) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  }

  /**
   * 请求通知权限
   */
  requestNotificationPermission() {
    return new Promise((resolve) => {
      wx.authorize({
        scope: 'scope.userInfo',
        success: () => {
          resolve(true)
        },
        fail: () => {
          wx.showModal({
            title: '通知权限',
            content: '需要您授权通知权限才能接收消息提醒',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (settingRes) => {
                    resolve(settingRes.authSetting['scope.userInfo'])
                  }
                })
              } else {
                resolve(false)
              }
            }
          })
        }
      })
    })
  }

  /**
   * 设置定时通知
   */
  scheduleNotification(notification, delay) {
    setTimeout(() => {
      this.addNotification(notification)
    }, delay)
  }

  /**
   * 模拟接收新通知（用于测试）
   */
  simulateNotifications() {
    const mockNotifications = [
      {
        type: 'system',
        title: '系统通知',
        content: '欢迎使用茶叶一点通小程序，祝您使用愉快！'
      },
      {
        type: 'price',
        title: '价格提醒',
        content: '您关注的商品价格有变动，点击查看详情'
      },
      {
        type: 'goods',
        title: '新货到店',
        content: '新一批明前茶已到店，品质优良，欢迎选购'
      },
      {
        type: 'activity',
        title: '活动通知',
        content: '春季茶叶节活动开始，全场8折优惠'
      },
      {
        type: 'order',
        title: '订单状态',
        content: '您的订单已发货，预计明天送达'
      }
    ]

    mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        this.addNotification(notification)
      }, index * 2000)
    })
  }
}

// 创建全局通知管理器实例
const notificationManager = new NotificationManager()

// 导出便捷方法
const Notification = {
  // 添加通知
  add(notification) {
    return notificationManager.addNotification(notification)
  },

  // 创建各类型通知
  system(title, content, data) {
    return notificationManager.createSystemNotification(title, content, data)
  },

  price(title, content, data) {
    return notificationManager.createPriceAlert(title, content, data)
  },

  goods(title, content, data) {
    return notificationManager.createGoodsNotification(title, content, data)
  },

  activity(title, content, data) {
    return notificationManager.createActivityNotification(title, content, data)
  },

  order(title, content, data) {
    return notificationManager.createOrderNotification(title, content, data)
  },

  message(title, content, data) {
    return notificationManager.createMessageNotification(title, content, data)
  },

  // 标记已读
  markRead(id) {
    return notificationManager.markAsRead(id)
  },

  // 标记全部已读
  markAllRead() {
    return notificationManager.markAllAsRead()
  },

  // 删除通知
  delete(id) {
    return notificationManager.deleteNotification(id)
  },

  // 清空通知
  clear() {
    return notificationManager.clearAllNotifications()
  },

  // 获取通知列表
  getList(options) {
    try {
      return notificationManager.getNotifications(options)
    } catch (error) {
      console.error('获取通知列表失败:', error)
      return []
    }
  },

  // 获取统计信息
  getStats() {
    return notificationManager.getNotificationStats()
  },

  // 获取未读数量
  getUnreadCount() {
    return notificationManager.unreadCount
  },

  // 设置管理
  getSettings() {
    return notificationManager.getSettings()
  },

  updateSettings(settings) {
    return notificationManager.updateSettings(settings)
  },

  // 权限管理
  checkPermission() {
    return notificationManager.checkNotificationPermission()
  },

  requestPermission() {
    return notificationManager.requestNotificationPermission()
  },

  // 定时通知
  schedule(notification, delay) {
    return notificationManager.scheduleNotification(notification, delay)
  },

  // 模拟通知
  simulate() {
    return notificationManager.simulateNotifications()
  }
}

// 消息通知管理器
// 用途：统一管理小程序内的消息通知，支持本地和推送

/**
 * 发送通知
 * @param {string} title 通知标题
 * @param {string} content 通知内容
 * @param {object} [options] 其他选项
 */
function sendNotification(title, content, options) {
  // ...实现...
}

/**
 * 获取通知列表
 * @returns {Array} 通知数组
 */
function getNotifications() {
  // ...实现...
}

/**
 * 清除所有通知
 */
function clearNotifications() {
  // ...实现...
}

module.exports = {
  Notification,
  sendNotification,
  getNotifications,
  clearNotifications
} 