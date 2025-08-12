// 清除本地存储数据的工具
const clearStorageData = {
  // 清除支付相关数据
  clearPaymentData() {
    try {
      // 清除支付设置
      wx.removeStorageSync('paymentSettings')
      
      // 清除支付订单
      wx.removeStorageSync('paymentOrders')
      
      // 清除支付记录
      wx.removeStorageSync('paymentRecords')
      
      // 清除用户钱包
      wx.removeStorageSync('userWallet')
      
      // 清除退款记录
      wx.removeStorageSync('refunds')
      
      console.log('支付相关数据已清除')
      return true
    } catch (error) {
      console.error('清除支付数据失败:', error)
      return false
    }
  },

  // 清除所有存储数据
  clearAllData() {
    try {
      wx.clearStorageSync()
      console.log('所有本地存储数据已清除')
      return true
    } catch (error) {
      console.error('清除所有数据失败:', error)
      return false
    }
  },

  // 清除指定键的数据
  clearKey(key) {
    try {
      wx.removeStorageSync(key)
      console.log(`键 "${key}" 的数据已清除`)
      return true
    } catch (error) {
      console.error(`清除键 "${key}" 失败:`, error)
      return false
    }
  },

  // 列出所有存储的键
  listAllKeys() {
    try {
      const info = wx.getStorageInfoSync()
      console.log('当前存储的键:', info.keys)
      return info.keys
    } catch (error) {
      console.error('获取存储信息失败:', error)
      return []
    }
  }
}

module.exports = {
  clearStorageData
}
