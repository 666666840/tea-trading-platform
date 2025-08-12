// 实时通信管理系统
class RealtimeManager {
  constructor() {
    this.messagesKey = 'realtimeMessages'
    this.conversationsKey = 'conversations'
    this.onlineUsersKey = 'onlineUsers'
    this.notificationsKey = 'realtimeNotifications'
    
    // WebSocket连接管理
    this.socketUrl = 'wss://api.tea-platform.com/ws'
    this.socket = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 3000
    this.heartbeatInterval = 30000
    this.heartbeatTimer = null
    
    // 连接状态
    this.connectionState = {
      connected: false,
      connecting: false,
      lastConnected: null,
      lastDisconnected: null,
      reconnecting: false
    }
    
    // 事件监听器
    this.eventListeners = {
      message: [],
      notification: [],
      userOnline: [],
      userOffline: [],
      connectionChange: []
    }
    
    // 消息队列（离线时存储）
    this.messageQueue = []
    this.maxQueueSize = 100
    
    // 用户状态
    this.userStatus = {
      online: false,
      lastSeen: null,
      typing: false,
      currentConversation: null
    }
    
    // 初始化
    this.initializeRealtime()
  }

  // 初始化实时通信
  async initializeRealtime() {
    try {
      // 加载离线消息
      await this.loadOfflineMessages()
      
      // 尝试连接WebSocket
      this.connect()
      
      // 设置页面可见性监听
      this.setupVisibilityListener()
      
      console.log('✅ 实时通信系统初始化完成')
    } catch (error) {
      console.error('实时通信初始化失败:', error)
    }
  }

  // 连接WebSocket
  async connect() {
    if (this.connectionState.connecting || this.connectionState.connected) {
      return
    }
    
    try {
      this.connectionState.connecting = true
      
      // 模拟WebSocket连接（实际应用中使用真实WebSocket）
      console.log('🔌 正在连接实时通信服务器...')
      
      // 模拟连接延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟连接成功
      this.socket = {
        readyState: 1, // WebSocket.OPEN
        send: (data) => {
          console.log('📤 发送消息:', data)
          // 模拟服务器响应
          setTimeout(() => {
            this.handleServerMessage(JSON.parse(data))
          }, 100)
        },
        close: () => {
          this.handleDisconnection()
        }
      }
      
      this.connectionState.connected = true
      this.connectionState.connecting = false
      this.connectionState.lastConnected = new Date().toISOString()
      this.reconnectAttempts = 0
      
      // 开始心跳
      this.startHeartbeat()
      
      // 发送用户上线消息
      await this.sendUserOnline()
      
      // 同步离线消息
      await this.syncOfflineMessages()
      
      // 触发连接事件
      this.emit('connectionChange', { connected: true })
      
      console.log('✅ 实时通信连接成功')
      
    } catch (error) {
      console.error('实时通信连接失败:', error)
      this.connectionState.connecting = false
      this.scheduleReconnect()
    }
  }

  // 断开连接
  disconnect() {
    if (this.socket) {
      this.socket.close()
    }
    
    this.stopHeartbeat()
    this.connectionState.connected = false
    this.connectionState.lastDisconnected = new Date().toISOString()
    
    // 发送用户下线消息
    this.sendUserOffline()
    
    this.emit('connectionChange', { connected: false })
    console.log('🔌 实时通信已断开')
  }

  // 处理断开连接
  handleDisconnection() {
    this.connectionState.connected = false
    this.connectionState.lastDisconnected = new Date().toISOString()
    this.socket = null
    
    this.stopHeartbeat()
    this.emit('connectionChange', { connected: false })
    
    // 自动重连
    this.scheduleReconnect()
  }

  // 计划重连
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('❌ 达到最大重连次数，停止重连')
      return
    }
    
    this.connectionState.reconnecting = true
    this.reconnectAttempts++
    
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
    
    console.log(`🔄 ${delay/1000}秒后尝试第${this.reconnectAttempts}次重连...`)
    
    setTimeout(() => {
      this.connect()
    }, delay)
  }

  // 开始心跳
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.connectionState.connected) {
        this.sendHeartbeat()
      }
    }, this.heartbeatInterval)
  }

  // 停止心跳
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // 发送心跳
  sendHeartbeat() {
    this.sendMessage({
      type: 'heartbeat',
      timestamp: Date.now()
    })
  }

  // 发送消息到服务器
  sendMessage(data) {
    if (!this.connectionState.connected || !this.socket) {
      // 添加到离线队列
      this.addToQueue(data)
      return false
    }
    
    try {
      this.socket.send(JSON.stringify(data))
      return true
    } catch (error) {
      console.error('发送消息失败:', error)
      this.addToQueue(data)
      return false
    }
  }

  // 处理服务器消息
  handleServerMessage(data) {
    switch (data.type) {
      case 'message':
        this.handleIncomingMessage(data)
        break
      case 'notification':
        this.handleIncomingNotification(data)
        break
      case 'user_online':
        this.handleUserOnline(data)
        break
      case 'user_offline':
        this.handleUserOffline(data)
        break
      case 'typing':
        this.handleTypingStatus(data)
        break
      case 'heartbeat_response':
        // 心跳响应，无需处理
        break
      case 'heartbeat':
        // 处理心跳消息
        this.handleHeartbeat(data)
        break
      default:
        console.log('未知消息类型:', data.type)
    }
  }

  // 发送聊天消息
  async sendChatMessage(conversationId, content, messageType = 'text') {
    const message = {
      id: this.generateMessageId(),
      conversationId: conversationId,
      content: content,
      type: messageType,
      senderId: this.getCurrentUserId(),
      timestamp: new Date().toISOString(),
      status: 'sending'
    }
    
    // 保存到本地
    await this.saveMessage(message)
    
    // 发送到服务器
    const sent = this.sendMessage({
      type: 'message',
      message: message
    })
    
    if (sent) {
      message.status = 'sent'
    } else {
      message.status = 'failed'
    }
    
    // 更新消息状态
    await this.updateMessageStatus(message.id, message.status)
    
    // 触发消息事件
    this.emit('message', { type: 'sent', message })
    
    return message
  }

  // 处理心跳消息
  handleHeartbeat(data) {
    // 心跳消息处理，可以用于连接状态检测
    console.log('收到心跳消息:', data.timestamp)
  }

  // 处理接收到的消息
  async handleIncomingMessage(data) {
    const message = data.message
    
    // 保存消息
    await this.saveMessage(message)
    
    // 更新会话
    await this.updateConversation(message.conversationId, message)
    
    // 触发消息事件
    this.emit('message', { type: 'received', message })
    
    // 发送已读回执（如果当前在该会话中）
    if (this.userStatus.currentConversation === message.conversationId) {
      this.sendReadReceipt(message.id)
    }
    
    // 显示系统通知
    this.showMessageNotification(message)
  }

  // 发送实时通知
  async sendNotification(userId, notification) {
    const notificationData = {
      id: this.generateNotificationId(),
      userId: userId,
      ...notification,
      timestamp: new Date().toISOString(),
      status: 'sending'
    }
    
    // 保存到本地
    await this.saveNotification(notificationData)
    
    // 发送到服务器
    const sent = this.sendMessage({
      type: 'notification',
      notification: notificationData
    })
    
    if (sent) {
      notificationData.status = 'sent'
    } else {
      notificationData.status = 'failed'
    }
    
    // 更新通知状态
    await this.updateNotificationStatus(notificationData.id, notificationData.status)
    
    return notificationData
  }

  // 处理接收到的通知
  async handleIncomingNotification(data) {
    const notification = data.notification
    
    // 保存通知
    await this.saveNotification(notification)
    
    // 触发通知事件
    this.emit('notification', notification)
    
    // 显示系统通知
    this.showSystemNotification(notification)
  }

  // 发送打字状态
  sendTypingStatus(conversationId, isTyping) {
    this.userStatus.typing = isTyping
    
    this.sendMessage({
      type: 'typing',
      conversationId: conversationId,
      userId: this.getCurrentUserId(),
      isTyping: isTyping,
      timestamp: Date.now()
    })
  }

  // 处理打字状态
  handleTypingStatus(data) {
    this.emit('typing', {
      conversationId: data.conversationId,
      userId: data.userId,
      isTyping: data.isTyping
    })
  }

  // 发送用户上线消息
  sendUserOnline() {
    this.userStatus.online = true
    this.userStatus.lastSeen = new Date().toISOString()
    
    this.sendMessage({
      type: 'user_online',
      userId: this.getCurrentUserId(),
      timestamp: Date.now()
    })
  }

  // 发送用户下线消息
  sendUserOffline() {
    this.userStatus.online = false
    this.userStatus.lastSeen = new Date().toISOString()
    
    this.sendMessage({
      type: 'user_offline',
      userId: this.getCurrentUserId(),
      timestamp: Date.now()
    })
  }

  // 处理用户上线
  handleUserOnline(data) {
    this.updateUserOnlineStatus(data.userId, true)
    this.emit('userOnline', { userId: data.userId })
  }

  // 处理用户下线
  handleUserOffline(data) {
    this.updateUserOnlineStatus(data.userId, false)
    this.emit('userOffline', { userId: data.userId })
  }

  // 发送已读回执
  sendReadReceipt(messageId) {
    this.sendMessage({
      type: 'read_receipt',
      messageId: messageId,
      readerId: this.getCurrentUserId(),
      timestamp: Date.now()
    })
  }

  // 获取会话列表
  async getConversations(userId) {
    try {
      const conversations = wx.getStorageSync(this.conversationsKey) || []
      return conversations
        .filter(conv => conv.participants.includes(userId))
        .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
    } catch (error) {
      console.error('获取会话列表失败:', error)
      return []
    }
  }

  // 获取会话消息
  async getConversationMessages(conversationId, page = 1, pageSize = 20) {
    try {
      const messages = wx.getStorageSync(this.messagesKey) || []
      const conversationMessages = messages
        .filter(msg => msg.conversationId === conversationId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      
      return {
        messages: conversationMessages.slice(startIndex, endIndex),
        hasMore: conversationMessages.length > endIndex,
        total: conversationMessages.length
      }
    } catch (error) {
      console.error('获取会话消息失败:', error)
      return { messages: [], hasMore: false, total: 0 }
    }
  }

  // 创建会话
  async createConversation(participants, conversationType = 'private') {
    const conversationId = this.generateConversationId()
    
    const conversation = {
      id: conversationId,
      type: conversationType,
      participants: participants,
      createTime: new Date().toISOString(),
      lastMessageTime: new Date().toISOString(),
      lastMessage: null,
      unreadCount: 0,
      settings: {
        muted: false,
        pinned: false
      }
    }
    
    await this.saveConversation(conversation)
    return conversation
  }

  // 保存消息
  async saveMessage(message) {
    try {
      const messages = wx.getStorageSync(this.messagesKey) || []
      messages.push(message)
      
      // 只保留最近1000条消息
      if (messages.length > 1000) {
        messages.splice(0, messages.length - 1000)
      }
      
      wx.setStorageSync(this.messagesKey, messages)
    } catch (error) {
      console.error('保存消息失败:', error)
    }
  }

  // 更新消息状态
  async updateMessageStatus(messageId, status) {
    try {
      const messages = wx.getStorageSync(this.messagesKey) || []
      const messageIndex = messages.findIndex(msg => msg.id === messageId)
      
      if (messageIndex >= 0) {
        messages[messageIndex].status = status
        wx.setStorageSync(this.messagesKey, messages)
      }
    } catch (error) {
      console.error('更新消息状态失败:', error)
    }
  }

  // 保存会话
  async saveConversation(conversation) {
    try {
      const conversations = wx.getStorageSync(this.conversationsKey) || []
      const existingIndex = conversations.findIndex(conv => conv.id === conversation.id)
      
      if (existingIndex >= 0) {
        conversations[existingIndex] = conversation
      } else {
        conversations.push(conversation)
      }
      
      wx.setStorageSync(this.conversationsKey, conversations)
    } catch (error) {
      console.error('保存会话失败:', error)
    }
  }

  // 更新会话
  async updateConversation(conversationId, lastMessage) {
    try {
      const conversations = wx.getStorageSync(this.conversationsKey) || []
      const conversationIndex = conversations.findIndex(conv => conv.id === conversationId)
      
      if (conversationIndex >= 0) {
        conversations[conversationIndex].lastMessage = lastMessage
        conversations[conversationIndex].lastMessageTime = lastMessage.timestamp
        conversations[conversationIndex].unreadCount++
        
        wx.setStorageSync(this.conversationsKey, conversations)
      }
    } catch (error) {
      console.error('更新会话失败:', error)
    }
  }

  // 标记会话已读
  async markConversationRead(conversationId) {
    try {
      const conversations = wx.getStorageSync(this.conversationsKey) || []
      const conversationIndex = conversations.findIndex(conv => conv.id === conversationId)
      
      if (conversationIndex >= 0) {
        conversations[conversationIndex].unreadCount = 0
        wx.setStorageSync(this.conversationsKey, conversations)
      }
    } catch (error) {
      console.error('标记会话已读失败:', error)
    }
  }

  // 保存通知
  async saveNotification(notification) {
    try {
      const notifications = wx.getStorageSync(this.notificationsKey) || []
      notifications.push(notification)
      
      // 只保留最近500条通知
      if (notifications.length > 500) {
        notifications.splice(0, notifications.length - 500)
      }
      
      wx.setStorageSync(this.notificationsKey, notifications)
    } catch (error) {
      console.error('保存通知失败:', error)
    }
  }

  // 更新通知状态
  async updateNotificationStatus(notificationId, status) {
    try {
      const notifications = wx.getStorageSync(this.notificationsKey) || []
      const notificationIndex = notifications.findIndex(notif => notif.id === notificationId)
      
      if (notificationIndex >= 0) {
        notifications[notificationIndex].status = status
        wx.setStorageSync(this.notificationsKey, notifications)
      }
    } catch (error) {
      console.error('更新通知状态失败:', error)
    }
  }

  // 更新用户在线状态
  updateUserOnlineStatus(userId, isOnline) {
    try {
      const onlineUsers = wx.getStorageSync(this.onlineUsersKey) || []
      
      if (isOnline) {
        if (!onlineUsers.includes(userId)) {
          onlineUsers.push(userId)
        }
      } else {
        const index = onlineUsers.indexOf(userId)
        if (index >= 0) {
          onlineUsers.splice(index, 1)
        }
      }
      
      wx.setStorageSync(this.onlineUsersKey, onlineUsers)
    } catch (error) {
      console.error('更新用户在线状态失败:', error)
    }
  }

  // 添加到消息队列
  addToQueue(message) {
    this.messageQueue.push(message)
    
    if (this.messageQueue.length > this.maxQueueSize) {
      this.messageQueue.shift()
    }
  }

  // 同步离线消息
  async syncOfflineMessages() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      this.sendMessage(message)
    }
  }

  // 加载离线消息
  async loadOfflineMessages() {
    try {
      const offlineMessages = wx.getStorageSync('offlineMessages') || []
      this.messageQueue = offlineMessages
    } catch (error) {
      console.error('加载离线消息失败:', error)
    }
  }

  // 显示消息通知
  showMessageNotification(message) {
    if (this.userStatus.currentConversation === message.conversationId) {
      return // 当前在该会话中，不显示通知
    }
    
    // 震动提醒
    wx.vibrateShort()
    
    // 显示通知
    wx.showToast({
      title: `新消息：${message.content.substring(0, 10)}...`,
      icon: 'none',
      duration: 2000
    })
  }

  // 显示系统通知
  showSystemNotification(notification) {
    wx.showToast({
      title: notification.title || '新通知',
      icon: 'none',
      duration: 2000
    })
  }

  // 设置页面可见性监听
  setupVisibilityListener() {
    wx.onAppShow(() => {
      if (!this.connectionState.connected) {
        this.connect()
      }
    })
    
    wx.onAppHide(() => {
      // 应用进入后台时不断开连接，保持接收消息
    })
  }

  // 事件监听
  on(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(callback)
    }
  }

  // 移除事件监听
  off(event, callback) {
    if (this.eventListeners[event]) {
      const index = this.eventListeners[event].indexOf(callback)
      if (index >= 0) {
        this.eventListeners[event].splice(index, 1)
      }
    }
  }

  // 触发事件
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error(`事件监听器执行失败 [${event}]:`, error)
        }
      })
    }
  }

  // 工具方法
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateConversationId() {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateNotificationId() {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  getCurrentUserId() {
    const app = getApp()
    return app.globalData.userInfo?.id || 'guest_user'
  }

  // 获取连接状态
  getConnectionState() {
    return {
      ...this.connectionState,
      userStatus: this.userStatus
    }
  }

  // 获取统计信息
  getStats() {
    try {
      const messages = wx.getStorageSync(this.messagesKey) || []
      const conversations = wx.getStorageSync(this.conversationsKey) || []
      const notifications = wx.getStorageSync(this.notificationsKey) || []
      const onlineUsers = wx.getStorageSync(this.onlineUsersKey) || []
      
      return {
        totalMessages: messages.length,
        totalConversations: conversations.length,
        totalNotifications: notifications.length,
        onlineUsersCount: onlineUsers.length,
        queuedMessages: this.messageQueue.length,
        connectionState: this.connectionState
      }
    } catch (error) {
      console.error('获取统计信息失败:', error)
      return {
        totalMessages: 0,
        totalConversations: 0,
        totalNotifications: 0,
        onlineUsersCount: 0,
        queuedMessages: 0,
        connectionState: this.connectionState
      }
    }
  }
}

// 创建全局实时通信管理器实例
const realtimeManager = new RealtimeManager()

// 导出便捷方法
const Realtime = {
  // 连接管理
  connect() {
    return realtimeManager.connect()
  },

  disconnect() {
    return realtimeManager.disconnect()
  },

  getConnectionState() {
    return realtimeManager.getConnectionState()
  },

  // 消息功能
  async sendMessage(conversationId, content, type = 'text') {
    return realtimeManager.sendChatMessage(conversationId, content, type)
  },

  async getConversations(userId) {
    return realtimeManager.getConversations(userId)
  },

  async getMessages(conversationId, page = 1, pageSize = 20) {
    return realtimeManager.getConversationMessages(conversationId, page, pageSize)
  },

  async createConversation(participants, type = 'private') {
    return realtimeManager.createConversation(participants, type)
  },

  async markRead(conversationId) {
    return realtimeManager.markConversationRead(conversationId)
  },

  // 通知功能
  async sendNotification(userId, notification) {
    return realtimeManager.sendNotification(userId, notification)
  },

  // 状态功能
  sendTyping(conversationId, isTyping) {
    return realtimeManager.sendTypingStatus(conversationId, isTyping)
  },

  setCurrentConversation(conversationId) {
    realtimeManager.userStatus.currentConversation = conversationId
  },

  // 事件监听
  on(event, callback) {
    return realtimeManager.on(event, callback)
  },

  off(event, callback) {
    return realtimeManager.off(event, callback)
  },

  // 统计信息
  getStats() {
    return realtimeManager.getStats()
  }
}

module.exports = {
  RealtimeManager,
  Realtime,
  realtimeManager
} 