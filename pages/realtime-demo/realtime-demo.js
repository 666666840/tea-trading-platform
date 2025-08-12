// 实时功能演示页面
const { realtimeClient } = require('../../utils/realtime-client.js')
const API = require('../../utils/api-manager.js')

Page({
  data: {
    connectionStatus: 'disconnected',
    isAuthenticated: false,
    userId: null,
    notifications: [],
    priceAlerts: [],
    stockAlerts: [],
    marketUpdates: [],
    priceUpdates: [],
    newArrivals: [],
    clearanceAlerts: [],
    connectedUsers: 0,
    serverTime: ''
  },

  onLoad() {
    this.initRealtimeClient()
    this.loadUserInfo()
  },

  onShow() {
    // 页面显示时连接WebSocket
    this.connectWebSocket()
  },

  onHide() {
    // 页面隐藏时断开WebSocket
    this.disconnectWebSocket()
  },

  onUnload() {
    // 页面卸载时清理
    this.cleanup()
  },

  // 初始化实时客户端
  initRealtimeClient() {
    // 监听连接状态变化
    realtimeClient.on('connected', (data) => {
      this.setData({
        connectionStatus: 'connected',
        serverTime: new Date(data.timestamp).toLocaleString()
      })
      console.log('✅ 实时连接已建立')
    })

    // 监听认证状态变化
    realtimeClient.on('authenticated', (data) => {
      this.setData({
        isAuthenticated: data.status === 'success'
      })
      if (data.status === 'success') {
        wx.showToast({
          title: '认证成功',
          icon: 'success'
        })
      }
    })

    // 监听通知
    realtimeClient.on('notification', (data) => {
      this.addNotification(data)
    })

    // 监听市场更新
    realtimeClient.on('market_update', (data) => {
      this.addMarketUpdate(data)
    })

    // 监听价格更新
    realtimeClient.on('price_update', (data) => {
      this.addPriceUpdate(data)
    })

    // 监听新品到货
    realtimeClient.on('new_arrival', (data) => {
      this.addNewArrival(data)
    })

    // 监听清仓提醒
    realtimeClient.on('clearance_alert', (data) => {
      this.addClearanceAlert(data)
    })

    // 监听价格提醒
    realtimeClient.on('price_alert', (data) => {
      this.addPriceAlert(data)
    })

    // 监听库存提醒
    realtimeClient.on('stock_alert', (data) => {
      this.addStockAlert(data)
    })
  },

  // 加载用户信息
  async loadUserInfo() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.setData({
          userId: userInfo.id
        })
      }
    } catch (error) {
      console.error('加载用户信息失败:', error)
    }
  },

  // 连接WebSocket
  async connectWebSocket() {
    try {
      this.setData({ connectionStatus: 'connecting' })
      
      await realtimeClient.connect()
      
      // 如果有用户信息，进行认证
      if (this.data.userId) {
        const token = wx.getStorageSync('userToken')
        if (token) {
          realtimeClient.authenticate(this.data.userId, token)
        }
      }
      
    } catch (error) {
      console.error('连接WebSocket失败:', error)
      this.setData({ connectionStatus: 'error' })
      wx.showToast({
        title: '连接失败',
        icon: 'error'
      })
    }
  },

  // 断开WebSocket
  disconnectWebSocket() {
    realtimeClient.disconnect()
    this.setData({ connectionStatus: 'disconnected' })
  },

  // 清理资源
  cleanup() {
    realtimeClient.disconnect()
  },

  // 添加通知
  addNotification(data) {
    const notifications = [{
      id: Date.now(),
      title: data.title,
      content: data.content,
      type: data.type,
      timestamp: new Date().toLocaleString()
    }, ...this.data.notifications.slice(0, 9)] // 保留最近10条

    this.setData({ notifications })
  },

  // 添加市场更新
  addMarketUpdate(data) {
    const marketUpdates = [{
      id: Date.now(),
      marketId: data.market_id,
      updateType: data.update_type,
      data: data.data,
      timestamp: new Date().toLocaleString()
    }, ...this.data.marketUpdates.slice(0, 9)]

    this.setData({ marketUpdates })
  },

  // 添加价格更新
  addPriceUpdate(data) {
    const priceUpdates = [{
      id: Date.now(),
      category: data.category,
      priceData: data.price_data,
      timestamp: new Date().toLocaleString()
    }, ...this.data.priceUpdates.slice(0, 9)]

    this.setData({ priceUpdates })
  },

  // 添加新品到货
  addNewArrival(data) {
    const newArrivals = [{
      id: Date.now(),
      name: data.data.name,
      price: data.data.price,
      category: data.data.category,
      timestamp: new Date().toLocaleString()
    }, ...this.data.newArrivals.slice(0, 9)]

    this.setData({ newArrivals })
  },

  // 添加清仓提醒
  addClearanceAlert(data) {
    const clearanceAlerts = [{
      id: Date.now(),
      name: data.data.name,
      salePrice: data.data.sale_price,
      stock: data.data.stock,
      timestamp: new Date().toLocaleString()
    }, ...this.data.clearanceAlerts.slice(0, 9)]

    this.setData({ clearanceAlerts })
  },

  // 添加价格提醒
  addPriceAlert(data) {
    const priceAlerts = [{
      id: Date.now(),
      alert: data.alert,
      currentPrice: data.current_price,
      timestamp: new Date().toLocaleString()
    }, ...this.data.priceAlerts.slice(0, 9)]

    this.setData({ priceAlerts })
  },

  // 添加库存提醒
  addStockAlert(data) {
    const stockAlerts = [{
      id: Date.now(),
      alert: data.alert,
      currentStock: data.current_stock,
      timestamp: new Date().toLocaleString()
    }, ...this.data.stockAlerts.slice(0, 9)]

    this.setData({ stockAlerts })
  },

  // 手动连接
  onConnect() {
    this.connectWebSocket()
  },

  // 手动断开
  onDisconnect() {
    this.disconnectWebSocket()
  },

  // 设置价格提醒
  onSetPriceAlert() {
    wx.showModal({
      title: '设置价格提醒',
      content: '请输入目标价格',
      editable: true,
      placeholderText: '例如: 100',
      success: (res) => {
        if (res.confirm && res.content) {
          const targetPrice = parseFloat(res.content)
          if (!isNaN(targetPrice)) {
            // 这里需要实际的商品ID，这里用示例ID
            realtimeClient.setPriceAlert('newarrival', 1, targetPrice, 'below')
            wx.showToast({
              title: '价格提醒已设置',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '请输入有效价格',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 设置库存提醒
  onSetStockAlert() {
    wx.showModal({
      title: '设置库存提醒',
      content: '请输入最低库存数量',
      editable: true,
      placeholderText: '例如: 10',
      success: (res) => {
        if (res.confirm && res.content) {
          const minStock = parseInt(res.content)
          if (!isNaN(minStock)) {
            // 这里需要实际的商品ID，这里用示例ID
            realtimeClient.setStockAlert('clearance', 1, minStock)
            wx.showToast({
              title: '库存提醒已设置',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '请输入有效数量',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 订阅市场更新
  onSubscribeMarket() {
    wx.showModal({
      title: '订阅市场更新',
      content: '请输入市场ID',
      editable: true,
      placeholderText: '例如: 1',
      success: (res) => {
        if (res.confirm && res.content) {
          const marketId = parseInt(res.content)
          if (!isNaN(marketId)) {
            realtimeClient.subscribeMarketUpdates(marketId)
            wx.showToast({
              title: '已订阅市场更新',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '请输入有效ID',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 订阅价格更新
  onSubscribePrice() {
    wx.showActionSheet({
      itemList: ['绿茶', '红茶', '乌龙茶', '普洱茶', '白茶'],
      success: (res) => {
        const categories = ['绿茶', '红茶', '乌龙茶', '普洱茶', '白茶']
        const category = categories[res.tapIndex]
        realtimeClient.subscribePriceUpdates(category)
        wx.showToast({
          title: `已订阅${category}价格更新`,
          icon: 'success'
        })
      }
    })
  },

  // 测试通知
  onTestNotification() {
    wx.request({
      url: 'http://localhost:3000/api/realtime/test_notification',
      method: 'POST',
      data: {
        user_id: this.data.userId || 1
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '测试通知已发送',
            icon: 'success'
          })
        }
      },
      fail: (error) => {
        console.error('发送测试通知失败:', error)
        wx.showToast({
          title: '发送失败',
          icon: 'error'
        })
      }
    })
  },

  // 获取服务器状态
  onGetStatus() {
    wx.request({
      url: 'http://localhost:3000/api/realtime/status',
      success: (res) => {
        if (res.data.status === 'success') {
          const data = res.data.data
          this.setData({
            connectedUsers: data.connected_users,
            serverTime: new Date(data.server_time).toLocaleString()
          })
          wx.showToast({
            title: `在线用户: ${data.connected_users}`,
            icon: 'none'
          })
        }
      },
      fail: (error) => {
        console.error('获取状态失败:', error)
        wx.showToast({
          title: '获取状态失败',
          icon: 'error'
        })
      }
    })
  },

  // 清空通知
  onClearNotifications() {
    this.setData({ notifications: [] })
  },

  // 清空市场更新
  onClearMarketUpdates() {
    this.setData({ marketUpdates: [] })
  },

  // 清空价格更新
  onClearPriceUpdates() {
    this.setData({ priceUpdates: [] })
  },

  // 清空新品到货
  onClearNewArrivals() {
    this.setData({ newArrivals: [] })
  },

  // 清空清仓提醒
  onClearClearanceAlerts() {
    this.setData({ clearanceAlerts: [] })
  }
}) 