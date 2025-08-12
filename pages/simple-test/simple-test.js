// pages/simple-test/simple-test.js
const { clearStorageData } = require('../../utils/clear-storage.js')

Page({
  data: {
    storageKeys: [],
    clearResult: '',
    cleanupStats: null,
    cleanupHistory: []
  },

  onLoad() {
    this.listStorageKeys()
    this.loadCleanupStats()
  },

  // 列出所有存储的键
  listStorageKeys() {
    const keys = clearStorageData.listAllKeys()
    this.setData({
      storageKeys: keys
    })
  },

  // 加载清理统计
  loadCleanupStats() {
    const app = getApp()
    const stats = app.getCleanupStats()
    const history = app.getCleanupHistory()
    
    this.setData({
      cleanupStats: stats,
      cleanupHistory: history.slice(-5) // 只显示最近5次
    })
  },

  // 超简单清除 - 一键清除 paymentSettings
  simpleClear() {
    try {
      wx.removeStorageSync('paymentSettings')
      this.setData({
        clearResult: '✅ paymentSettings 已清除！'
      })
      this.listStorageKeys()
      this.loadCleanupStats()
    } catch (error) {
      this.setData({
        clearResult: '❌ 清除失败: ' + error.message
      })
    }
  },

  // 执行自动清理
  performAutoCleanup() {
    const app = getApp()
    app.performAutoCleanup().then(result => {
      if (result) {
        this.setData({
          clearResult: `自动清理完成: 清理了 ${result.cleanedCount} 个键，释放了 ${result.freedSpace} 字节`
        })
        this.listStorageKeys()
        this.loadCleanupStats()
      } else {
        this.setData({
          clearResult: '自动清理失败'
        })
      }
    })
  },

  // 清除支付相关数据
  clearPaymentData() {
    const result = clearStorageData.clearPaymentData()
    this.setData({
      clearResult: result ? '支付相关数据已清除' : '清除失败'
    })
    this.listStorageKeys()
    this.loadCleanupStats()
  },

  // 清除指定键的数据
  clearSpecificKey() {
    const result = clearStorageData.clearKey('paymentSettings')
    this.setData({
      clearResult: result ? 'paymentSettings 已清除' : '清除失败'
    })
    this.listStorageKeys()
    this.loadCleanupStats()
  },

  // 清除所有数据
  clearAllData() {
    wx.showModal({
      title: '确认清除',
      content: '这将清除所有本地存储数据，确定要继续吗？',
      success: (res) => {
        if (res.confirm) {
          const result = clearStorageData.clearAllData()
          this.setData({
            clearResult: result ? '所有数据已清除' : '清除失败'
          })
          this.listStorageKeys()
          this.loadCleanupStats()
        }
      }
    })
  },

  // 刷新列表
  refreshList() {
    this.listStorageKeys()
    this.loadCleanupStats()
    this.setData({
      clearResult: ''
    })
  }
}) 