// 自动清理管理器 - 在应用启动时自动清理不需要的数据
class AutoCleanupManager {
  constructor() {
    this.cleanupConfig = {
      // 需要清理的键模式
      patterns: {
        // 支付相关数据（如果不需要支付功能）
        payment: ['paymentSettings', 'paymentOrders', 'paymentRecords', 'userWallet', 'refunds'],
        
        // 临时数据
        temp: ['temp_', 'cache_', 'tmp_'],
        
        // 过期数据（基于时间戳）
        expired: ['expired_', 'old_'],
        
        // 测试数据
        test: ['test_', 'debug_', 'demo_'],
        
        // 废弃的功能数据
        deprecated: ['deprecated_', 'legacy_', 'old_'],
        
        // 大文件数据
        largeFiles: ['large_', 'file_', 'image_']
      },
      
      // 清理策略
      strategies: {
        // 开发环境：更激进的清理
        development: {
          cleanPayment: true,
          cleanTemp: true,
          cleanTest: true,
          cleanDeprecated: true,
          maxAge: 24 * 60 * 60 * 1000, // 1天
          maxStorageSize: 5 * 1024 * 1024 // 5MB
        },
        
        // 生产环境：保守的清理
        production: {
          cleanPayment: false, // 生产环境保留支付数据
          cleanTemp: true,
          cleanTest: false,
          cleanDeprecated: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
          maxStorageSize: 10 * 1024 * 1024 // 10MB
        },
        
        // 体验版：中等清理
        trial: {
          cleanPayment: false,
          cleanTemp: true,
          cleanTest: true,
          cleanDeprecated: true,
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3天
          maxStorageSize: 8 * 1024 * 1024 // 8MB
        }
      }
    }
    
    this.cleanupHistory = []
    this.lastCleanupTime = null
  }

  // 执行自动清理
  async performAutoCleanup(environment = 'production') {
    try {
      console.log('🧹 开始自动清理...')
      
      const strategy = this.cleanupConfig.strategies[environment] || this.cleanupConfig.strategies.production
      const cleanupResult = {
        timestamp: new Date().toISOString(),
        environment: environment,
        strategy: strategy,
        cleanedKeys: [],
        cleanedCount: 0,
        freedSpace: 0,
        errors: []
      }

      // 1. 清理基于模式的键
      await this.cleanupByPatterns(strategy, cleanupResult)
      
      // 2. 清理过期数据
      await this.cleanupExpiredData(strategy, cleanupResult)
      
      // 3. 清理大文件数据
      await this.cleanupLargeFiles(strategy, cleanupResult)
      
      // 4. 检查存储空间
      await this.checkAndCleanupStorage(strategy, cleanupResult)
      
      // 5. 记录清理历史
      this.recordCleanupHistory(cleanupResult)
      
      console.log(`✅ 自动清理完成: 清理了 ${cleanupResult.cleanedCount} 个键，释放了 ${cleanupResult.freedSpace} 字节`)
      
      return cleanupResult
      
    } catch (error) {
      console.error('❌ 自动清理失败:', error)
      return {
        timestamp: new Date().toISOString(),
        environment: environment,
        cleanedKeys: [],
        cleanedCount: 0,
        freedSpace: 0,
        errors: [error.message]
      }
    }
  }

  // 基于模式清理数据
  async cleanupByPatterns(strategy, result) {
    try {
      const keys = wx.getStorageInfoSync().keys
      
      keys.forEach(key => {
        try {
          let shouldClean = false
          let reason = ''
          
          // 检查支付相关数据
          if (strategy.cleanPayment && this.cleanupConfig.patterns.payment.includes(key)) {
            shouldClean = true
            reason = 'payment'
          }
          
          // 检查临时数据
          if (strategy.cleanTemp && this.cleanupConfig.patterns.temp.some(pattern => key.startsWith(pattern))) {
            shouldClean = true
            reason = 'temp'
          }
          
          // 检查测试数据
          if (strategy.cleanTest && this.cleanupConfig.patterns.test.some(pattern => key.startsWith(pattern))) {
            shouldClean = true
            reason = 'test'
          }
          
          // 检查废弃数据
          if (strategy.cleanDeprecated && this.cleanupConfig.patterns.deprecated.some(pattern => key.startsWith(pattern))) {
            shouldClean = true
            reason = 'deprecated'
          }
          
          if (shouldClean) {
            const data = wx.getStorageSync(key)
            const dataSize = this.calculateDataSize(data)
            
            wx.removeStorageSync(key)
            
            result.cleanedKeys.push({
              key: key,
              reason: reason,
              size: dataSize
            })
            result.cleanedCount++
            result.freedSpace += dataSize
            
            console.log(`🗑️ 清理 ${reason} 数据: ${key} (${dataSize} 字节)`)
          }
          
        } catch (error) {
          result.errors.push(`清理键 ${key} 失败: ${error.message}`)
        }
      })
      
    } catch (error) {
      result.errors.push(`基于模式清理失败: ${error.message}`)
    }
  }

  // 清理过期数据
  async cleanupExpiredData(strategy, result) {
    try {
      const keys = wx.getStorageInfoSync().keys
      const now = Date.now()
      
      keys.forEach(key => {
        try {
          const data = wx.getStorageSync(key)
          
          // 检查是否有过期时间
          if (data && typeof data === 'object') {
            let expireTime = null
            
            // 检查不同的过期时间字段
            if (data.expireTime) {
              expireTime = new Date(data.expireTime).getTime()
            } else if (data.expiresAt) {
              expireTime = new Date(data.expiresAt).getTime()
            } else if (data.timestamp && data.maxAge) {
              expireTime = data.timestamp + data.maxAge
            }
            
            if (expireTime && now > expireTime) {
              const dataSize = this.calculateDataSize(data)
              
              wx.removeStorageSync(key)
              
              result.cleanedKeys.push({
                key: key,
                reason: 'expired',
                size: dataSize,
                expiredAt: new Date(expireTime).toISOString()
              })
              result.cleanedCount++
              result.freedSpace += dataSize
              
              console.log(`⏰ 清理过期数据: ${key} (过期时间: ${new Date(expireTime).toISOString()})`)
            }
          }
          
        } catch (error) {
          result.errors.push(`清理过期数据 ${key} 失败: ${error.message}`)
        }
      })
      
    } catch (error) {
      result.errors.push(`清理过期数据失败: ${error.message}`)
    }
  }

  // 清理大文件数据
  async cleanupLargeFiles(strategy, result) {
    try {
      const keys = wx.getStorageInfoSync().keys
      const maxFileSize = 1024 * 1024 // 1MB
      
      keys.forEach(key => {
        try {
          if (this.cleanupConfig.patterns.largeFiles.some(pattern => key.startsWith(pattern))) {
            const data = wx.getStorageSync(key)
            const dataSize = this.calculateDataSize(data)
            
            if (dataSize > maxFileSize) {
              wx.removeStorageSync(key)
              
              result.cleanedKeys.push({
                key: key,
                reason: 'large_file',
                size: dataSize
              })
              result.cleanedCount++
              result.freedSpace += dataSize
              
              console.log(`📁 清理大文件: ${key} (${dataSize} 字节)`)
            }
          }
          
        } catch (error) {
          result.errors.push(`清理大文件 ${key} 失败: ${error.message}`)
        }
      })
      
    } catch (error) {
      result.errors.push(`清理大文件失败: ${error.message}`)
    }
  }

  // 检查并清理存储空间
  async checkAndCleanupStorage(strategy, result) {
    try {
      const storageInfo = wx.getStorageInfoSync()
      const currentSize = storageInfo.currentSize * 1024 // 转换为字节
      const limitSize = storageInfo.limitSize * 1024
      
      // 如果存储使用超过限制的80%，进行紧急清理
      if (currentSize > limitSize * 0.8) {
        console.log(`⚠️ 存储空间使用率过高: ${(currentSize / limitSize * 100).toFixed(1)}%`)
        
        // 清理最旧的数据
        await this.emergencyCleanup(strategy, result)
      }
      
    } catch (error) {
      result.errors.push(`检查存储空间失败: ${error.message}`)
    }
  }

  // 紧急清理
  async emergencyCleanup(strategy, result) {
    try {
      const keys = wx.getStorageInfoSync().keys
      const keyInfo = []
      
      // 收集所有键的信息
      keys.forEach(key => {
        try {
          const data = wx.getStorageSync(key)
          const dataSize = this.calculateDataSize(data)
          
          keyInfo.push({
            key: key,
            size: dataSize,
            timestamp: data?.timestamp || data?.createTime || Date.now()
          })
          
        } catch (error) {
          // 忽略错误
        }
      })
      
      // 按时间排序，删除最旧的数据
      keyInfo.sort((a, b) => a.timestamp - b.timestamp)
      
      // 删除最旧的20%的数据
      const deleteCount = Math.ceil(keyInfo.length * 0.2)
      
      for (let i = 0; i < deleteCount; i++) {
        const key = keyInfo[i].key
        try {
          wx.removeStorageSync(key)
          
          result.cleanedKeys.push({
            key: key,
            reason: 'emergency',
            size: keyInfo[i].size
          })
          result.cleanedCount++
          result.freedSpace += keyInfo[i].size
          
          console.log(`🚨 紧急清理: ${key}`)
          
        } catch (error) {
          result.errors.push(`紧急清理 ${key} 失败: ${error.message}`)
        }
      }
      
    } catch (error) {
      result.errors.push(`紧急清理失败: ${error.message}`)
    }
  }

  // 计算数据大小
  calculateDataSize(data) {
    try {
      const jsonString = JSON.stringify(data)
      return new Blob([jsonString]).size
    } catch (error) {
      return 0
    }
  }

  // 记录清理历史
  recordCleanupHistory(result) {
    this.cleanupHistory.push(result)
    this.lastCleanupTime = new Date()
    
    // 只保留最近10次清理记录
    if (this.cleanupHistory.length > 10) {
      this.cleanupHistory = this.cleanupHistory.slice(-10)
    }
    
    // 保存清理历史到存储
    try {
      wx.setStorageSync('cleanupHistory', this.cleanupHistory)
    } catch (error) {
      console.error('保存清理历史失败:', error)
    }
  }

  // 获取清理历史
  getCleanupHistory() {
    try {
      const history = wx.getStorageSync('cleanupHistory') || []
      return history
    } catch (error) {
      return []
    }
  }

  // 获取清理统计
  getCleanupStats() {
    const history = this.getCleanupHistory()
    
    const stats = {
      totalCleanups: history.length,
      totalCleanedKeys: 0,
      totalFreedSpace: 0,
      lastCleanupTime: null,
      averageFreedSpace: 0
    }
    
    if (history.length > 0) {
      history.forEach(record => {
        stats.totalCleanedKeys += record.cleanedCount
        stats.totalFreedSpace += record.freedSpace
      })
      
      stats.lastCleanupTime = history[history.length - 1].timestamp
      stats.averageFreedSpace = Math.round(stats.totalFreedSpace / history.length)
    }
    
    return stats
  }

  // 手动清理指定键
  manualCleanup(keys, reason = 'manual') {
    const result = {
      timestamp: new Date().toISOString(),
      reason: reason,
      cleanedKeys: [],
      cleanedCount: 0,
      freedSpace: 0,
      errors: []
    }
    
    keys.forEach(key => {
      try {
        const data = wx.getStorageSync(key)
        const dataSize = this.calculateDataSize(data)
        
        wx.removeStorageSync(key)
        
        result.cleanedKeys.push({
          key: key,
          reason: reason,
          size: dataSize
        })
        result.cleanedCount++
        result.freedSpace += dataSize
        
        console.log(`🔧 手动清理: ${key} (${dataSize} 字节)`)
        
      } catch (error) {
        result.errors.push(`手动清理 ${key} 失败: ${error.message}`)
      }
    })
    
    this.recordCleanupHistory(result)
    return result
  }
}

// 创建全局实例
const autoCleanupManager = new AutoCleanupManager()

module.exports = {
  AutoCleanupManager,
  autoCleanupManager
}
