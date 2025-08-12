// 用户系统增强组件
const { API } = require('./api-manager.js')

class UserSystem {
  constructor() {
    this.currentUser = null
    this.userProfile = null
    this.notifications = []
    this.favorites = []
    this.history = []
    this.follows = []
    this.activities = []
  }

  // 初始化用户系统
  async init() {
    try {
      console.log('🚀 [用户系统] 初始化中...')
      
      // 检查用户登录状态
      const token = wx.getStorageSync('userToken')
      if (!token) {
        console.log('⚠️ [用户系统] 用户未登录')
        return false
      }

      // 加载用户资料
      await this.loadUserProfile()
      
      // 加载用户数据
      await Promise.all([
        this.loadNotifications(),
        this.loadFavorites(),
        this.loadHistory(),
        this.loadFollows(),
        this.loadActivities()
      ])

      console.log('✅ [用户系统] 初始化完成')
      return true
    } catch (error) {
      console.error('❌ [用户系统] 初始化失败:', error)
      return false
    }
  }

  // 用户资料管理
  async loadUserProfile() {
    try {
      const response = await API.getUserProfile()
      if (response.status === 'success') {
        this.userProfile = response.data
        console.log('✅ [用户系统] 用户资料加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 用户资料加载失败:', error)
    }
  }

  async updateUserProfile(profileData) {
    try {
      const response = await API.updateUserProfile(profileData)
      if (response.status === 'success') {
        await this.loadUserProfile()
        wx.showToast({
          title: '资料更新成功',
          icon: 'success'
        })
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 更新资料失败:', error)
      wx.showToast({
        title: '更新失败',
        icon: 'error'
      })
      return false
    }
  }

  // 收藏管理
  async loadFavorites(options = {}) {
    try {
      const response = await API.getUserFavorites(options)
      if (response.status === 'success') {
        this.favorites = response.data || []
        console.log('✅ [用户系统] 收藏列表加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 收藏列表加载失败:', error)
    }
  }

  async addFavorite(itemType, itemId, title = '', description = '') {
    try {
      const response = await API.addToFavorites(itemType, itemId, title, description)
      if (response.status === 'success') {
        await this.loadFavorites()
        wx.showToast({
          title: '收藏成功',
          icon: 'success'
        })
        
        // 记录活动
        await API.recordUserActivity('add_favorite', `收藏${itemType}`, {
          item_type: itemType,
          item_id: itemId,
          title: title
        })
        
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 添加收藏失败:', error)
      wx.showToast({
        title: '收藏失败',
        icon: 'error'
      })
      return false
    }
  }

  async removeFavorite(favoriteId) {
    try {
      const response = await API.removeUserFavorite(favoriteId)
      if (response.status === 'success') {
        await this.loadFavorites()
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success'
        })
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 取消收藏失败:', error)
      wx.showToast({
        title: '取消收藏失败',
        icon: 'error'
      })
      return false
    }
  }

  async isFavorited(itemType, itemId) {
    return this.favorites.some(item => 
      item.item_type === itemType && item.item_id === itemId
    )
  }

  // 浏览历史管理
  async loadHistory(options = {}) {
    try {
      const response = await API.getUserHistory(options)
      if (response.status === 'success') {
        this.history = response.data || []
        console.log('✅ [用户系统] 浏览历史加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 浏览历史加载失败:', error)
    }
  }

  async addHistory(itemType, itemId, title = '', description = '') {
    try {
      const response = await API.addToHistory(itemType, itemId, title, description)
      if (response.status === 'success') {
        // 更新本地历史记录
        const existingIndex = this.history.findIndex(item => 
          item.item_type === itemType && item.item_id === itemId
        )
        
        const historyItem = {
          item_type: itemType,
          item_id: itemId,
          title: title,
          description: description,
          viewed_at: new Date().toISOString()
        }
        
        if (existingIndex >= 0) {
          this.history[existingIndex] = historyItem
        } else {
          this.history.unshift(historyItem)
        }
        
        return true
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 添加历史记录失败:', error)
      return false
    }
  }

  async clearHistory(itemType = null) {
    try {
      const options = itemType ? { type: itemType } : {}
      const response = await API.clearUserHistory(options)
      if (response.status === 'success') {
        if (itemType) {
          this.history = this.history.filter(item => item.item_type !== itemType)
        } else {
          this.history = []
        }
        
        wx.showToast({
          title: '历史记录已清空',
          icon: 'success'
        })
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 清空历史记录失败:', error)
      wx.showToast({
        title: '清空失败',
        icon: 'error'
      })
      return false
    }
  }

  // 通知管理
  async loadNotifications(options = {}) {
    try {
      const response = await API.getUserNotifications(options)
      if (response.status === 'success') {
        this.notifications = response.data || []
        console.log('✅ [用户系统] 通知列表加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 通知列表加载失败:', error)
    }
  }

  async markNotificationRead(notificationId) {
    try {
      const response = await API.markNotificationRead(notificationId)
      if (response.status === 'success') {
        const notification = this.notifications.find(n => n.id === notificationId)
        if (notification) {
          notification.is_read = true
        }
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 标记通知已读失败:', error)
      return false
    }
  }

  async markAllNotificationsRead() {
    try {
      const response = await API.markAllNotificationsRead()
      if (response.status === 'success') {
        this.notifications.forEach(notification => {
          notification.is_read = true
        })
        
        wx.showToast({
          title: '全部已读',
          icon: 'success'
        })
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 标记全部已读失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
      return false
    }
  }

  getUnreadNotificationCount() {
    return this.notifications.filter(notification => !notification.is_read).length
  }

  // 关注管理
  async loadFollows(options = {}) {
    try {
      const response = await API.getUserFollows(options)
      if (response.status === 'success') {
        this.follows = response.data || []
        console.log('✅ [用户系统] 关注列表加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 关注列表加载失败:', error)
    }
  }

  async addFollow(followingId) {
    try {
      const response = await API.addUserFollow({ following_id: followingId })
      if (response.status === 'success') {
        await this.loadFollows()
        wx.showToast({
          title: '关注成功',
          icon: 'success'
        })
        
        // 记录活动
        await API.recordUserActivity('add_follow', `关注用户${followingId}`, {
          following_id: followingId
        })
        
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 关注失败:', error)
      wx.showToast({
        title: '关注失败',
        icon: 'error'
      })
      return false
    }
  }

  async removeFollow(followingId) {
    try {
      const response = await API.removeUserFollow(followingId)
      if (response.status === 'success') {
        await this.loadFollows()
        wx.showToast({
          title: '取消关注成功',
          icon: 'success'
        })
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 取消关注失败:', error)
      wx.showToast({
        title: '取消关注失败',
        icon: 'error'
      })
      return false
    }
  }

  async isFollowing(followingId) {
    return this.follows.some(follow => follow.following_id === followingId)
  }

  // 私信管理
  async loadMessages(options = {}) {
    try {
      const response = await API.getUserMessages(options)
      if (response.status === 'success') {
        return response.data || []
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 私信列表加载失败:', error)
      return []
    }
  }

  async sendMessage(receiverId, content, messageType = 'text') {
    try {
      const response = await API.sendUserMessage({
        receiver_id: receiverId,
        content: content,
        message_type: messageType
      })
      if (response.status === 'success') {
        wx.showToast({
          title: '发送成功',
          icon: 'success'
        })
        
        // 记录活动
        await API.recordUserActivity('send_message', `发送私信给用户${receiverId}`, {
          receiver_id: receiverId,
          content: content
        })
        
        return true
      }
    } catch (error) {
      console.error('❌ [用户系统] 发送私信失败:', error)
      wx.showToast({
        title: '发送失败',
        icon: 'error'
      })
      return false
    }
  }

  // 活动记录管理
  async loadActivities(options = {}) {
    try {
      const response = await API.getUserActivities(options)
      if (response.status === 'success') {
        this.activities = response.data || []
        console.log('✅ [用户系统] 活动记录加载成功')
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 活动记录加载失败:', error)
    }
  }

  async recordActivity(activityType, description = '', activityData = {}) {
    try {
      const response = await API.recordUserActivity(activityType, description, activityData)
      if (response.status === 'success') {
        // 更新本地活动记录
        const activity = {
          activity_type: activityType,
          description: description,
          activity_data: activityData,
          created_at: new Date().toISOString()
        }
        this.activities.unshift(activity)
        return true
      }
    } catch (error) {
      console.warn('⚠️ [用户系统] 记录活动失败:', error)
      return false
    }
  }

  // 用户系统工具方法
  async refreshAllData() {
    console.log('🔄 [用户系统] 刷新所有数据...')
    await Promise.all([
      this.loadUserProfile(),
      this.loadNotifications(),
      this.loadFavorites(),
      this.loadHistory(),
      this.loadFollows(),
      this.loadActivities()
    ])
    console.log('✅ [用户系统] 数据刷新完成')
  }

  // 获取用户统计信息
  getStats() {
    return {
      favorites_count: this.favorites.length,
      history_count: this.history.length,
      follows_count: this.follows.length,
      unread_notifications: this.getUnreadNotificationCount(),
      activities_count: this.activities.length
    }
  }

  // 检查用户是否登录
  isLoggedIn() {
    const token = wx.getStorageSync('userToken')
    return !!token
  }

  // 用户登出
  logout() {
    this.currentUser = null
    this.userProfile = null
    this.notifications = []
    this.favorites = []
    this.history = []
    this.follows = []
    this.activities = []
    
    wx.removeStorageSync('userToken')
    wx.removeStorageSync('userInfo')
    
    console.log('✅ [用户系统] 用户已登出')
  }
}

// 创建全局用户系统实例
const userSystem = new UserSystem()

// 导出
module.exports = {
  UserSystem,
  userSystem
} 