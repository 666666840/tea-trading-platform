// 快速清除脚本 - 可在控制台直接执行
// 使用方法：在小程序开发者工具的控制台中复制粘贴以下代码

// 立即清除 paymentSettings
function clearPaymentSettingsNow() {
  try {
    wx.removeStorageSync('paymentSettings')
    console.log('✅ paymentSettings 已立即清除')
    return true
  } catch (error) {
    console.error('❌ 清除失败:', error)
    return false
  }
}

// 清除 paymentSettings
function clearPaymentSettings() {
  try {
    wx.removeStorageSync('paymentSettings')
    console.log('✅ paymentSettings 已清除')
    return true
  } catch (error) {
    console.error('❌ 清除失败:', error)
    return false
  }
}

// 清除所有支付相关数据
function clearAllPaymentData() {
  try {
    const keys = ['paymentSettings', 'paymentOrders', 'paymentRecords', 'userWallet', 'refunds']
    let clearedCount = 0
    
    keys.forEach(key => {
      try {
        wx.removeStorageSync(key)
        console.log(`✅ ${key} 已清除`)
        clearedCount++
      } catch (error) {
        console.log(`⚠️ ${key} 清除失败:`, error)
      }
    })
    
    console.log(`🎉 共清除 ${clearedCount} 个支付相关数据`)
    return true
  } catch (error) {
    console.error('❌ 清除失败:', error)
    return false
  }
}

// 查看当前存储的所有键
function listStorageKeys() {
  try {
    const info = wx.getStorageInfoSync()
    console.log('📋 当前存储的键:', info.keys)
    console.log('📊 存储大小:', info.currentSize, 'KB')
    console.log('📈 存储限制:', info.limitSize, 'KB')
    return info.keys
  } catch (error) {
    console.error('❌ 获取存储信息失败:', error)
    return []
  }
}

// 清除所有存储数据
function clearAllStorage() {
  try {
    wx.clearStorageSync()
    console.log('🎉 所有本地存储数据已清除')
    return true
  } catch (error) {
    console.error('❌ 清除所有数据失败:', error)
    return false
  }
}

// 导出函数到全局作用域
if (typeof window !== 'undefined') {
  window.clearPaymentSettingsNow = clearPaymentSettingsNow
  window.clearPaymentSettings = clearPaymentSettings
  window.clearAllPaymentData = clearAllPaymentData
  window.listStorageKeys = listStorageKeys
  window.clearAllStorage = clearAllStorage
}

// 在微信小程序环境中
if (typeof wx !== 'undefined') {
  // 自动执行一次，显示当前存储状态
  console.log('🔍 当前存储状态:')
  listStorageKeys()
  
  console.log('\n📝 可用命令:')
  console.log('• clearPaymentSettingsNow() - 立即清除 paymentSettings')
  console.log('• clearPaymentSettings() - 清除 paymentSettings')
  console.log('• clearAllPaymentData() - 清除所有支付相关数据')
  console.log('• listStorageKeys() - 查看所有存储的键')
  console.log('• clearAllStorage() - 清除所有存储数据')
  
  // 自动执行清除
  console.log('\n🚀 正在自动清除 paymentSettings...')
  clearPaymentSettingsNow()
}

module.exports = {
  clearPaymentSettingsNow,
  clearPaymentSettings,
  clearAllPaymentData,
  listStorageKeys,
  clearAllStorage
}
