// 离线模式配置文件
const OfflineConfig = {
  // 离线模式设置
  offline: {
    enabled: true,
    cacheExpireTime: 24 * 60 * 60 * 1000, // 24小时
    maxCacheSize: 50 * 1024 * 1024, // 50MB
    syncOnReconnect: true
  },

  // 性能监控设置
  performance: {
    enabled: true,
    checkInterval: 10000, // 10秒
    maxErrorRate: 2, // 最大错误率2%
    maxMemoryUsage: 80, // 最大内存使用率80%
    maxCpuUsage: 70 // 最大CPU使用率70%
  },

  // API连接设置
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000, // 10秒超时
    retryCount: 3,
    retryDelay: 5000, // 5秒重试间隔
    healthCheckInterval: 60000 // 60秒健康检查
  },

  // 通知设置
  notification: {
    enabled: true,
    maxNotifications: 100,
    autoClearInterval: 7 * 24 * 60 * 60 * 1000 // 7天自动清理
  },

  // 实时通信设置
  realtime: {
    enabled: true,
    heartbeatInterval: 30000, // 30秒心跳
    reconnectInterval: 5000, // 5秒重连间隔
    maxReconnectAttempts: 10
  },

  // 缓存设置
  cache: {
    enabled: true,
    defaultExpireTime: 5 * 60 * 1000, // 5分钟
    maxSize: 10 * 1024 * 1024, // 10MB
    cleanupInterval: 60 * 60 * 1000 // 1小时清理
  },

  // 错误处理设置
  errorHandling: {
    logErrors: true,
    showUserFriendlyErrors: true,
    maxErrorLogSize: 1000,
    errorReportInterval: 300000 // 5分钟错误报告
  },

  // 调试设置
  debug: {
    enabled: false,
    logLevel: 'warn', // error, warn, info, debug
    showPerformanceMetrics: false,
    enableRemoteLogging: false
  }
}

module.exports = OfflineConfig
