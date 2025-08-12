// 立即清除 paymentSettings 脚本
// 在微信开发者工具控制台中直接执行

console.log('🚀 开始立即清除 paymentSettings...')

try {
  // 立即清除 paymentSettings
  wx.removeStorageSync('paymentSettings')
  console.log('✅ paymentSettings 已成功清除！')
  
  // 验证清除结果
  const result = wx.getStorageSync('paymentSettings')
  if (result === undefined) {
    console.log('✅ 验证成功：paymentSettings 已不存在')
  } else {
    console.log('⚠️ 验证失败：paymentSettings 仍然存在')
  }
  
  // 显示当前存储状态
  const storageInfo = wx.getStorageInfoSync()
  console.log('📋 当前存储的键:', storageInfo.keys)
  console.log('📊 当前存储大小:', storageInfo.currentSize, 'KB')
  
} catch (error) {
  console.error('❌ 清除失败:', error)
}

console.log('🎉 清除操作完成！')
