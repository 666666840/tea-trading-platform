const { Notification } = require('../../utils/notification-manager')
const { setupPageAnimations } = require('../../utils/animation-manager')

Page({
  data: {
    notificationList: [],
    loading: false,
    stats: {
      total: 0,
      unread: 0,
      read: 0
    },
    filterType: 'all', // all, unread, read
    showSettings: false
  },

  onLoad() {
    console.log('通知页面加载完成')
    this.loadNotifications()
    setupPageAnimations(this)
  },

  onShow() {
    // 页面显示时刷新通知列表
    this.loadNotifications()
  },

  /**
   * 加载通知列表
   */
  loadNotifications() {
    this.setData({ loading: true })
    
    try {
      // 获取通知列表
      const options = {}
      if (this.data.filterType === 'unread') {
        options.read = false
      } else if (this.data.filterType === 'read') {
        options.read = true
      }
      
      const notificationList = Notification.getList(options)
      const stats = Notification.getStats()
      
      this.setData({
        notificationList,
        stats,
        loading: false
      })

      // 添加进入动画
      this.fadeIn('.notification-container', { duration: 300 })
      
    } catch (error) {
      console.error('加载通知失败:', error)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  },

  /**
   * 筛选通知
   */
  onFilterChange(e) {
    const filterType = e.currentTarget.dataset.type
    this.setData({ filterType })
    this.loadNotifications()
    
    // 切换动画
    this.slideIn('.notification-list', 'left', { duration: 250 })
  },

  /**
   * 标记单个消息为已读
   */
  readNotification(e) {
    const id = e.currentTarget.dataset.id
    const success = Notification.markRead(id)
    
    if (success) {
      // 更新列表
      this.loadNotifications()
      
      // 添加已读动画
      this.fadeOut(`[data-id="${id}"]`, { duration: 200 })
      setTimeout(() => {
        this.fadeIn(`[data-id="${id}"]`, { duration: 200 })
      }, 200)
    }
  },

  /**
   * 全部标记为已读
   */
  markAllRead() {
    const hasUnread = Notification.markAllRead()
    
    if (hasUnread) {
      this.loadNotifications()
      wx.showToast({
        title: '全部已读',
        icon: 'success'
      })
      
      // 全部已读动画
      this.pulse('.notification-list', { duration: 300 })
    } else {
      wx.showToast({
        title: '没有未读消息',
        icon: 'none'
      })
    }
  },

  /**
   * 删除单个通知
   */
  deleteNotification(e) {
    e.stopPropagation()
    const id = e.currentTarget.dataset.id
    const item = this.data.notificationList.find(n => n.id === id)
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${item.title}"吗？`,
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          const success = Notification.delete(id)
          if (success) {
            // 删除动画
            this.slideOut(`[data-id="${id}"]`, 'right', { duration: 200 })
            setTimeout(() => {
              this.loadNotifications()
            }, 200)
          }
        }
      }
    })
  },

  /**
   * 清空所有通知
   */
  clearAll() {
    if (this.data.notificationList.length === 0) {
      wx.showToast({
        title: '没有通知可清空',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有通知吗？此操作不可恢复！',
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          Notification.clear()
          this.loadNotifications()
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  /**
   * 显示通知设置
   */
  showNotificationSettings() {
    this.setData({ showSettings: true })
    this.slideUp('.settings-panel', { duration: 300 })
  },

  /**
   * 隐藏通知设置
   */
  hideNotificationSettings() {
    this.slideDown('.settings-panel', { duration: 300 })
    setTimeout(() => {
      this.setData({ showSettings: false })
    }, 300)
  },

  /**
   * 更新通知设置
   */
  onSettingChange(e) {
    const { setting, value } = e.currentTarget.dataset
    const currentSettings = Notification.getSettings()
    
    if (setting.includes('.')) {
      // 嵌套设置，如 types.system
      const [parent, child] = setting.split('.')
      currentSettings[parent][child] = value
    } else {
      currentSettings[setting] = value
    }
    
    Notification.updateSettings(currentSettings)
    
    wx.showToast({
      title: value ? '已开启' : '已关闭',
      icon: 'success'
    })
  },

  /**
   * 模拟接收通知（用于测试）
   */
  simulateNotifications() {
    Notification.simulate()
    wx.showToast({
      title: '正在模拟通知...',
      icon: 'none'
    })
    
    // 延迟刷新列表
    setTimeout(() => {
      this.loadNotifications()
    }, 1000)
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.loadNotifications()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 上拉加载更多
   */
  onReachBottom() {
    // 这里可以实现分页加载更多通知
    console.log('加载更多通知')
  }
}) 