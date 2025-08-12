// 管理后台配置文件
class AdminConfig {
  constructor() {
    // 权限配置
    this.permissions = {
      // 超级管理员权限
      super_admin: {
        name: '超级管理员',
        description: '拥有所有权限',
        permissions: [
          'merchant_management',
          'content_management', 
          'user_management',
          'data_import_export',
          'statistics_analysis',
          'system_monitoring',
          'system_management',
          'permission_management'
        ]
      },
      
      // 数据管理员权限
      data_management: {
        name: '数据管理员',
        description: '负责数据管理和统计分析',
        permissions: [
          'merchant_management',
          'data_import_export',
          'statistics_analysis',
          'system_monitoring'
        ]
      },
      
      // 商户审核员权限
      merchant_review: {
        name: '商户审核员',
        description: '负责商户审核和管理',
        permissions: [
          'merchant_management'
        ]
      },
      
      // 内容管理员权限
      content_management: {
        name: '内容管理员',
        description: '负责内容管理和发布',
        permissions: [
          'content_management',
          'statistics_analysis'
        ]
      },
      
      // 开发人员权限
      development: {
        name: '开发人员',
        description: '系统开发和维护',
        permissions: [
          'system_monitoring',
          'system_management',
          'statistics_analysis'
        ]
      }
    }

    // 系统配置
    this.systemConfig = {
      // 数据限制
      limits: {
        maxMerchants: 1000,
        maxProducts: 5000,
        maxUsers: 10000,
        maxImages: 10000,
        maxImageSize: 2 * 1024 * 1024, // 2MB
        maxBackupSize: 50 * 1024 * 1024 // 50MB
      },
      
      // 自动清理配置
      cleanup: {
        autoCleanup: true,
        cleanupInterval: 24 * 60 * 60 * 1000, // 24小时
        keepDays: 30, // 保留30天数据
        cleanupTypes: ['expired', 'invalid', 'duplicate']
      },
      
      // 备份配置
      backup: {
        autoBackup: true,
        backupInterval: 24 * 60 * 60 * 1000, // 24小时
        maxBackups: 10,
        backupTypes: ['merchants', 'products', 'users', 'system']
      },
      
      // 监控配置
      monitoring: {
        enabled: true,
        interval: 5000, // 5秒
        alertThresholds: {
          memoryUsage: 80,
          cpuUsage: 70,
          responseTime: 1000,
          errorRate: 3
        }
      },
      
      // 安全配置
      security: {
        maxLoginAttempts: 5,
        lockoutDuration: 30 * 60 * 1000, // 30分钟
        sessionTimeout: 2 * 60 * 60 * 1000, // 2小时
        requirePasswordChange: 90 * 24 * 60 * 60 * 1000 // 90天
      }
    }

    // 默认管理员账户
    this.defaultAdmins = [
      {
        id: 'admin_001',
        username: 'admin',
        password: 'admin123', // 实际项目中应该加密
        role: 'super_admin',
        name: '系统管理员',
        email: 'admin@tea-platform.com',
        phone: '13800138000',
        status: 'active',
        createTime: '2024-01-01T00:00:00.000Z',
        lastLoginTime: null
      },
      {
        id: 'admin_002',
        username: 'data_admin',
        password: 'data123',
        role: 'data_management',
        name: '数据管理员',
        email: 'data@tea-platform.com',
        phone: '13800138001',
        status: 'active',
        createTime: '2024-01-01T00:00:00.000Z',
        lastLoginTime: null
      },
      {
        id: 'admin_003',
        username: 'reviewer',
        password: 'review123',
        role: 'merchant_review',
        name: '商户审核员',
        email: 'review@tea-platform.com',
        phone: '13800138002',
        status: 'active',
        createTime: '2024-01-01T00:00:00.000Z',
        lastLoginTime: null
      }
    ]

    // 操作日志配置
    this.logConfig = {
      enabled: true,
      maxLogs: 10000,
      logLevels: ['info', 'warning', 'error', 'critical'],
      logTypes: [
        'login',
        'logout',
        'merchant_approve',
        'merchant_delete',
        'content_publish',
        'content_delete',
        'user_manage',
        'system_backup',
        'system_restore',
        'system_reset'
      ]
    }
  }

  // 检查用户权限
  checkPermission(userRole, permission) {
    const roleConfig = this.permissions[userRole]
    if (!roleConfig) {
      return false
    }
    
    return roleConfig.permissions.includes(permission)
  }

  // 获取用户角色信息
  getRoleInfo(role) {
    return this.permissions[role] || null
  }

  // 获取所有角色
  getAllRoles() {
    return Object.keys(this.permissions).map(role => ({
      role: role,
      ...this.permissions[role]
    }))
  }

  // 获取系统配置
  getSystemConfig() {
    return this.systemConfig
  }

  // 更新系统配置
  updateSystemConfig(newConfig) {
    this.systemConfig = {
      ...this.systemConfig,
      ...newConfig
    }
    
    // 保存到本地存储
    try {
      wx.setStorageSync('adminSystemConfig', this.systemConfig)
    } catch (error) {
      console.error('保存系统配置失败:', error)
    }
  }

  // 获取默认管理员
  getDefaultAdmins() {
    return this.defaultAdmins
  }

  // 验证管理员账户
  validateAdmin(username, password) {
    const admin = this.defaultAdmins.find(a => 
      a.username === username && a.password === password
    )
    
    return admin || null
  }

  // 创建管理员账户
  createAdmin(adminData) {
    const newAdmin = {
      id: `admin_${Date.now()}`,
      ...adminData,
      status: 'active',
      createTime: new Date().toISOString(),
      lastLoginTime: null
    }
    
    this.defaultAdmins.push(newAdmin)
    return newAdmin
  }

  // 更新管理员信息
  updateAdmin(adminId, updates) {
    const index = this.defaultAdmins.findIndex(a => a.id === adminId)
    if (index === -1) {
      return false
    }
    
    this.defaultAdmins[index] = {
      ...this.defaultAdmins[index],
      ...updates,
      updateTime: new Date().toISOString()
    }
    
    return true
  }

  // 删除管理员账户
  deleteAdmin(adminId) {
    const index = this.defaultAdmins.findIndex(a => a.id === adminId)
    if (index === -1) {
      return false
    }
    
    this.defaultAdmins.splice(index, 1)
    return true
  }

  // 记录操作日志
  logAction(action, details) {
    if (!this.logConfig.enabled) {
      return
    }
    
    const log = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action: action,
      details: details,
      timestamp: new Date().toISOString(),
      level: this.getLogLevel(action)
    }
    
    try {
      const logs = wx.getStorageSync('adminLogs') || []
      logs.push(log)
      
      // 限制日志数量
      if (logs.length > this.logConfig.maxLogs) {
        logs.splice(0, logs.length - this.logConfig.maxLogs)
      }
      
      wx.setStorageSync('adminLogs', logs)
    } catch (error) {
      console.error('记录操作日志失败:', error)
    }
  }

  // 获取日志级别
  getLogLevel(action) {
    const criticalActions = ['system_reset', 'system_restore']
    const warningActions = ['merchant_delete', 'content_delete', 'user_delete']
    
    if (criticalActions.includes(action)) {
      return 'critical'
    } else if (warningActions.includes(action)) {
      return 'warning'
    } else {
      return 'info'
    }
  }

  // 获取操作日志
  getLogs(filters = {}) {
    try {
      const logs = wx.getStorageSync('adminLogs') || []
      
      let filteredLogs = logs
      
      // 按级别筛选
      if (filters.level) {
        filteredLogs = filteredLogs.filter(log => log.level === filters.level)
      }
      
      // 按操作类型筛选
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filters.action)
      }
      
      // 按时间范围筛选
      if (filters.startTime) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.timestamp) >= new Date(filters.startTime)
        )
      }
      
      if (filters.endTime) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.timestamp) <= new Date(filters.endTime)
        )
      }
      
      // 按数量限制
      if (filters.limit) {
        filteredLogs = filteredLogs.slice(-filters.limit)
      }
      
      return filteredLogs
    } catch (error) {
      console.error('获取操作日志失败:', error)
      return []
    }
  }

  // 清理日志
  cleanupLogs(days = 30) {
    try {
      const logs = wx.getStorageSync('adminLogs') || []
      const cutoffTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      
      const filteredLogs = logs.filter(log => 
        new Date(log.timestamp) >= cutoffTime
      )
      
      wx.setStorageSync('adminLogs', filteredLogs)
      
      return {
        success: true,
        removedCount: logs.length - filteredLogs.length
      }
    } catch (error) {
      console.error('清理日志失败:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // 导出配置
  exportConfig() {
    return {
      permissions: this.permissions,
      systemConfig: this.systemConfig,
      defaultAdmins: this.defaultAdmins,
      logConfig: this.logConfig,
      exportTime: new Date().toISOString()
    }
  }

  // 导入配置
  importConfig(config) {
    try {
      if (config.permissions) {
        this.permissions = config.permissions
      }
      
      if (config.systemConfig) {
        this.systemConfig = config.systemConfig
      }
      
      if (config.defaultAdmins) {
        this.defaultAdmins = config.defaultAdmins
      }
      
      if (config.logConfig) {
        this.logConfig = config.logConfig
      }
      
      console.log('配置导入成功')
      return true
    } catch (error) {
      console.error('配置导入失败:', error)
      return false
    }
  }

  // 重置配置
  resetConfig() {
    // 重新初始化配置
    this.constructor()
    
    // 清理存储
    try {
      wx.removeStorageSync('adminSystemConfig')
      wx.removeStorageSync('adminLogs')
    } catch (error) {
      console.error('重置配置失败:', error)
    }
    
    console.log('配置已重置')
  }

  // 获取系统状态
  getSystemStatus() {
    try {
      const storageInfo = wx.getStorageInfoSync()
      const systemInfo = wx.getSystemInfoSync()
      
      return {
        storage: {
          currentSize: storageInfo.currentSize,
          limitSize: storageInfo.limitSize,
          usageRatio: storageInfo.currentSize / storageInfo.limitSize
        },
        system: {
          platform: systemInfo.platform,
          version: systemInfo.version,
          model: systemInfo.model,
          brand: systemInfo.brand
        },
        admin: {
          totalAdmins: this.defaultAdmins.length,
          activeAdmins: this.defaultAdmins.filter(a => a.status === 'active').length
        },
        logs: {
          totalLogs: this.getLogs().length,
          recentLogs: this.getLogs({ limit: 10 }).length
        }
      }
    } catch (error) {
      console.error('获取系统状态失败:', error)
      return null
    }
  }
}

// 创建全局实例
const AdminConfig = new AdminConfig()

module.exports = {
  AdminConfig,
  adminConfig: AdminConfig
} 