// 实时功能客户端 - 茶叶一点通小程序
class RealtimeClient {
  constructor() {
    this.socket = null
    this.isConnected = false
    this.isAuthenticated = false
    this.userId = null
    this.token = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.heartbeatInterval = null
    this.eventHandlers = {}
    this.priceAlerts = []
    this.stockAlerts = []
    
    // 服务器配置
    this.serverUrl = 'http://localhost:3000'
    
    // 自动重连
    this.autoReconnect = true
  }

  // 连接WebSocket
  connect() {
    if (this.socket && this.isConnected) {
      console.log('🔗 WebSocket已连接')
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      try {
        // 使用微信小程序的WebSocket
        this.socket = wx.connectSocket({
          url: `${this.serverUrl.replace('http', 'ws')}/socket.io/?EIO=4&transport=websocket`,
          success: () => {
            console.log('🔗 WebSocket连接成功')
            this.isConnected = true
            this.setupEventHandlers()
            this.startHeartbeat()
            resolve()
          },
          fail: (error) => {
            console.error('❌ WebSocket连接失败:', error)
            reject(error)
          }
        })
      } catch (error) {
        console.error('❌ WebSocket连接异常:', error)
        reject(error)
      }
    })
  }

  // 设置事件处理器
  setupEventHandlers() {
    if (!this.socket) return

    // 连接成功
    this.socket.onOpen(() => {
      console.log('✅ WebSocket连接已建立')
      this.isConnected = true
      this.reconnectAttempts = 0
      
      // 如果已认证，重新认证
      if (this.userId && this.token) {
        this.authenticate(this.userId, this.token)
      }
    })

    // 连接关闭
    this.socket.onClose(() => {
      console.log('🔌 WebSocket连接已关闭')
      this.isConnected = false
      this.isAuthenticated = false
      this.stopHeartbeat()
      
      // 自动重连
      if (this.autoReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++
        console.log(`🔄 尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        setTimeout(() => {
          this.connect()
        }, this.reconnectInterval)
      }
    })

    // 连接错误
    this.socket.onError((error) => {
      console.error('❌ WebSocket连接错误:', error)
      this.isConnected = false
    })

    // 接收消息
    this.socket.onMessage((message) => {
      try {
        const data = JSON.parse(message.data)
        this.handleMessage(data)
      } catch (error) {
        console.error('❌ 解析消息失败:', error)
      }
    })
  }

  // 处理接收到的消息
  handleMessage(data) {
    const event = data.event || data.type
    const payload = data.data || data

    console.log(`📨 收到消息: ${event}`, payload)

    // 触发事件处理器
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => {
        try {
          handler(payload)
        } catch (error) {
          console.error(`❌ 事件处理器错误 (${event}):`, error)
        }
      })
    }

    // 处理特定事件
    switch (event) {
      case 'connected':
        this.handleConnected(payload)
        break
      case 'authenticated':
        this.handleAuthenticated(payload)
        break
      case 'notification':
        this.handleNotification(payload)
        break
      case 'market_update':
        this.handleMarketUpdate(payload)
        break
      case 'price_update':
        this.handlePriceUpdate(payload)
        break
      case 'new_arrival':
        this.handleNewArrival(payload)
        break
      case 'clearance_alert':
        this.handleClearanceAlert(payload)
        break
      case 'price_alert':
        this.handlePriceAlert(payload)
        break
      case 'stock_alert':
        this.handleStockAlert(payload)
        break
    }
  }

  // 发送消息
  send(event, data = {}) {
    if (!this.socket || !this.isConnected) {
      console.warn('⚠️ WebSocket未连接，无法发送消息')
      return false
    }

    try {
      const message = {
        event: event,
        data: data,
        timestamp: Date.now()
      }

      this.socket.send({
        data: JSON.stringify(message),
        success: () => {
          console.log(`📤 发送消息: ${event}`)
        },
        fail: (error) => {
          console.error(`❌ 发送消息失败 (${event}):`, error)
        }
      })
      return true
    } catch (error) {
      console.error(`❌ 发送消息异常 (${event}):`, error)
      return false
    }
  }

  // 用户认证
  authenticate(userId, token) {
    this.userId = userId
    this.token = token
    
    return this.send('authenticate', {
      user_id: userId,
      token: token
    })
  }

  // 加入房间
  joinRoom(room) {
    return this.send('join_room', { room: room })
  }

  // 离开房间
  leaveRoom(room) {
    return this.send('leave_room', { room: room })
  }

  // 订阅市场更新
  subscribeMarketUpdates(marketId) {
    return this.send('subscribe_market_updates', { market_id: marketId })
  }

  // 订阅价格更新
  subscribePriceUpdates(category) {
    return this.send('subscribe_price_updates', { category: category })
  }

  // 设置价格提醒
  setPriceAlert(itemType, itemId, targetPrice, condition = 'below') {
    const alert = {
      item_type: itemType,
      item_id: itemId,
      target_price: targetPrice,
      condition: condition
    }

    this.priceAlerts.push(alert)
    return this.send('set_price_alert', alert)
  }

  // 设置库存提醒
  setStockAlert(itemType, itemId, minStock) {
    const alert = {
      item_type: itemType,
      item_id: itemId,
      min_stock: minStock
    }

    this.stockAlerts.push(alert)
    return this.send('set_stock_alert', alert)
  }

  // 事件处理器
  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = []
    }
    this.eventHandlers[event].push(handler)
  }

  off(event, handler) {
    if (this.eventHandlers[event]) {
      const index = this.eventHandlers[event].indexOf(handler)
      if (index > -1) {
        this.eventHandlers[event].splice(index, 1)
      }
    }
  }

  // 心跳检测
  startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.send('ping', { timestamp: Date.now() })
      }
    }, 30000) // 30秒心跳
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  // 断开连接
  disconnect() {
    this.autoReconnect = false
    this.stopHeartbeat()
    
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    
    this.isConnected = false
    this.isAuthenticated = false
    console.log('🔌 WebSocket已断开连接')
  }

  // 获取连接状态
  getStatus() {
    return {
      connected: this.isConnected,
      authenticated: this.isAuthenticated,
      userId: this.userId,
      reconnectAttempts: this.reconnectAttempts,
      priceAlerts: this.priceAlerts.length,
      stockAlerts: this.stockAlerts.length
    }
  }

  // 事件处理方法
  handleConnected(data) {
    console.log('✅ 连接成功:', data)
  }

  handleAuthenticated(data) {
    if (data.status === 'success') {
      this.isAuthenticated = true
      console.log('✅ 认证成功:', data)
    } else {
      this.isAuthenticated = false
      console.error('❌ 认证失败:', data.message)
    }
  }

  handleNotification(data) {
    console.log('📢 收到通知:', data)
    
    // 显示微信通知
    wx.showToast({
      title: data.title,
      icon: 'none',
      duration: 3000
    })
    
    // 触发通知事件
    this.triggerEvent('notification', data)
  }

  handleMarketUpdate(data) {
    console.log('🏪 市场更新:', data)
    this.triggerEvent('market_update', data)
  }

  handlePriceUpdate(data) {
    console.log('💰 价格更新:', data)
    this.triggerEvent('price_update', data)
  }

  handleNewArrival(data) {
    console.log('🆕 新品到货:', data)
    this.triggerEvent('new_arrival', data)
  }

  handleClearanceAlert(data) {
    console.log('🔥 清仓提醒:', data)
    this.triggerEvent('clearance_alert', data)
  }

  handlePriceAlert(data) {
    console.log('💰 价格提醒:', data)
    this.triggerEvent('price_alert', data)
  }

  handleStockAlert(data) {
    console.log('📦 库存提醒:', data)
    this.triggerEvent('stock_alert', data)
  }

  // 触发事件
  triggerEvent(event, data) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => {
        try {
          handler(data)
        } catch (error) {
          console.error(`❌ 事件处理器错误 (${event}):`, error)
        }
      })
    }
  }
}

// 创建全局实时客户端实例
const realtimeClient = new RealtimeClient()

// 导出
module.exports = {
  RealtimeClient,
  realtimeClient
} 