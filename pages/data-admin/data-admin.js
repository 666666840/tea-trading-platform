const { Data } = require('../../utils/data-manager.js')
const { Auth } = require('../../utils/auth-manager.js')
const { Performance } = require('../../utils/performance-monitor.js')

Page({
  data: {
    // 权限控制
    isAdmin: false,
    userRole: '',
    permissions: [],
    
    // 页面状态
    currentTab: 0,
    tabs: ['商户管理', '内容管理', '用户管理', '数据导入', '统计分析', '系统监控', '系统管理'],
    
    // 商户管理
    merchants: [],
    merchantFilters: {
      status: 'all',
      category: 'all',
      keyword: '',
      dateRange: 'all'
    },
    merchantCategories: [
      '茶叶批发商', '茶叶零售商', '茶园/茶厂', '品牌代理商',
      '茶具经销商', '包装材料商', '物流服务商', '其他'
    ],
    
    // 内容管理
    contents: [],
    contentTypes: ['recommend', 'news', 'art', 'hot'],
    contentFilters: {
      type: 'all',
      status: 'all',
      keyword: ''
    },
    
    // 用户管理
    users: [],
    userFilters: {
      status: 'all',
      type: 'all',
      keyword: ''
    },
    
    // 数据导入
    importData: '',
    importing: false,
    importResult: null,
    importType: 'merchants',
    
    // 统计数据
    stats: null,
    realtimeStats: null,
    
    // 系统监控
    systemStatus: null,
    performanceMetrics: null,
    errorLogs: [],
    
    // 系统管理
    backups: [],
    systemConfig: {},
    
    // 通用
    loading: false,
    refreshing: false
  },

  onLoad() {
    this.checkAdminPermission()
  },

  onShow() {
    if (this.data.isAdmin) {
      this.loadData()
    }
  },

  onPullDownRefresh() {
    this.refreshData()
  },

  // 检查管理员权限
  checkAdminPermission() {
    const app = getApp()
    const user = Auth.getCurrentUser()
    
    if (!user.isLoggedIn) {
      this.showPermissionError('请先登录')
      return
    }

    // 检查权限等级
    const permissions = this.getUserPermissions(user.userInfo)
    
    if (permissions.length === 0) {
      this.showPermissionError('权限不足，请联系系统管理员')
      return
    }

    // 记录访问日志
    console.log(`数据管理页面访问 - 用户: ${user.userInfo.nickName}, 权限: ${permissions.join(',')}`)
    
    this.setData({ 
      isAdmin: true,
      userRole: this.getUserRole(user.userInfo),
      permissions: permissions
    })
    
    this.loadData()
  },

  // 获取用户权限
  getUserPermissions(userInfo) {
    const app = getApp()
    const permissions = []

    if (app.isSuperAdmin(userInfo)) {
      permissions.push('super_admin')
    }
    if (app.canAccessDataManagement(userInfo)) {
      permissions.push('data_management')
    }
    if (app.isMerchantReviewer(userInfo)) {
      permissions.push('merchant_review')
    }
    if (app.isDeveloper(userInfo)) {
      permissions.push('development')
    }

    return permissions
  },

  // 获取用户角色
  getUserRole(userInfo) {
    const app = getApp()
    
    if (app.isSuperAdmin(userInfo)) return '超级管理员'
    if (app.canAccessDataManagement(userInfo)) return '数据管理员'
    if (app.isMerchantReviewer(userInfo)) return '商户审核员'
    if (app.isDeveloper(userInfo)) return '开发人员'
    
    return '普通用户'
  },

  // 显示权限错误
  showPermissionError(message) {
    wx.showModal({
      title: '权限不足',
      content: message,
      showCancel: false,
      success: () => {
        wx.navigateBack()
      }
    })
  },

  // 加载数据
  async loadData() {
    try {
      this.setData({ loading: true })

      // 根据当前标签页加载对应数据
      switch (this.data.currentTab) {
        case 0: // 商户管理
          await this.loadMerchants()
          break
        case 1: // 内容管理
          await this.loadContents()
          break
        case 2: // 用户管理
          await this.loadUsers()
          break
        case 4: // 统计分析
          await this.loadStats()
          break
        case 5: // 系统监控
          await this.loadSystemStatus()
          break
        case 6: // 系统管理
          await this.loadSystemConfig()
          break
      }

    } catch (error) {
      console.error('加载数据失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 刷新数据
  async refreshData() {
    this.setData({ refreshing: true })
    await this.loadData()
    this.setData({ refreshing: false })
    wx.stopPullDownRefresh()
  },

  // 切换标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ currentTab: index })
    this.loadData()
  },

  // ==================== 商户管理 ====================
  
  // 加载商户数据
  async loadMerchants() {
    const merchants = Data.getMerchants()
    this.setData({ merchants: merchants })
  },

  // 商户筛选
  onFilterChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`merchantFilters.${field}`]: value
    })
    
    this.filterMerchants()
  },

  // 搜索商户
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      'merchantFilters.keyword': keyword
    })
    
    // 延迟搜索
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.filterMerchants()
    }, 500)
  },

  // 筛选商户
  filterMerchants() {
    const { status, category, keyword, dateRange } = this.data.merchantFilters
    let filtered = Data.getMerchants()

    // 状态筛选
    if (status !== 'all') {
      filtered = filtered.filter(m => m.status === status)
    }

    // 类别筛选
    if (category !== 'all') {
      filtered = filtered.filter(m => m.category === category)
    }

    // 关键词搜索
    if (keyword.trim()) {
      filtered = Data.searchMerchants(keyword.trim())
    }

    // 日期范围筛选
    if (dateRange !== 'all') {
      const now = new Date()
      const days = parseInt(dateRange)
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      
      filtered = filtered.filter(m => {
        const createDate = new Date(m.createTime)
        return createDate >= cutoffDate
      })
    }

    this.setData({ merchants: filtered })
  },

  // 审核商户
  async approveMerchant(e) {
    const { id, action } = e.currentTarget.dataset
    
    let title = action === 'approve' ? '通过审核' : '拒绝申请'
    let content = action === 'approve' ? 
      '确认通过此商户的入驻申请？' : 
      '确认拒绝此商户的入驻申请？请填写拒绝原因。'

    if (action === 'reject') {
      // 拒绝需要填写原因
      wx.showModal({
        title: '拒绝原因',
        editable: true,
        placeholderText: '请输入拒绝原因',
        success: async (res) => {
          if (res.confirm) {
            await this.doApprove(id, 'rejected', res.content || '不符合入驻要求')
          }
        }
      })
    } else {
      wx.showModal({
        title: title,
        content: content,
        success: async (res) => {
          if (res.confirm) {
            await this.doApprove(id, action === 'approve' ? 'approved' : 'rejected')
          }
        }
      })
    }
  },

  // 执行审核
  async doApprove(merchantId, status, reason = '') {
    try {
      wx.showLoading({ title: '处理中...' })
      
      const result = await Data.approveMerchant(merchantId, status, reason)
      
      if (result.success) {
        wx.hideLoading()
        wx.showToast({
          title: status === 'approved' ? '审核通过' : '已拒绝',
          icon: 'success'
        })
        
        // 刷新数据
        this.loadMerchants()
        
        // 记录操作日志
        this.logAdminAction('merchant_approve', {
          merchantId: merchantId,
          status: status,
          reason: reason
        })
      }
    } catch (error) {
      wx.hideLoading()
      console.error('审核失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  },

  // 删除商户
  async deleteMerchant(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认删除',
      content: '删除后无法恢复，确认删除此商户？',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '删除中...' })
            
            const result = await Data.deleteMerchant(id)
            
            if (result.success) {
              wx.hideLoading()
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              
              this.loadMerchants()
              
              // 记录操作日志
              this.logAdminAction('merchant_delete', { merchantId: id })
            }
          } catch (error) {
            wx.hideLoading()
            console.error('删除失败:', error)
            wx.showToast({
              title: '删除失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // ==================== 内容管理 ====================
  
  // 加载内容数据
  async loadContents() {
    try {
      // 从API获取内容数据
      const contents = await this.getContentData()
      this.setData({ contents: contents })
    } catch (error) {
      console.error('加载内容失败:', error)
    }
  },

  // 获取内容数据
  async getContentData() {
    // 这里应该从API获取，暂时使用模拟数据
    return [
      {
        id: '1',
        type: 'recommend',
        title: '铁观音推荐',
        content: '精选铁观音茶叶...',
        status: 'active',
        createTime: '2024-01-01',
        views: 100
      }
    ]
  },

  // 内容筛选
  onContentFilterChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`contentFilters.${field}`]: value
    })
    
    this.filterContents()
  },

  // 筛选内容
  filterContents() {
    const { type, status, keyword } = this.data.contentFilters
    let filtered = this.data.contents

    if (type !== 'all') {
      filtered = filtered.filter(c => c.type === type)
    }

    if (status !== 'all') {
      filtered = filtered.filter(c => c.status === status)
    }

    if (keyword.trim()) {
      const lowerKeyword = keyword.toLowerCase()
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(lowerKeyword) ||
        c.content.toLowerCase().includes(lowerKeyword)
      )
    }

    this.setData({ contents: filtered })
  },

  // ==================== 用户管理 ====================
  
  // 加载用户数据
  async loadUsers() {
    try {
      // 获取用户数据
      const users = await this.getUserData()
      this.setData({ users: users })
    } catch (error) {
      console.error('加载用户失败:', error)
    }
  },

  // 获取用户数据
  async getUserData() {
    // 模拟用户数据
    return [
      {
        id: '1',
        nickName: '测试用户',
        avatar: '/images/default-avatar.png',
        status: 'active',
        type: 'normal',
        registerTime: '2024-01-01',
        lastLoginTime: '2024-01-20'
      }
    ]
  },

  // ==================== 数据导入 ====================
  
  // 导入类型选择
  onImportTypeChange(e) {
    const importType = e.detail.value
    this.setData({ importType: importType })
  },

  // 数据输入
  onImportDataInput(e) {
    this.setData({ importData: e.detail.value })
  },

  // 导入数据
  async importMerchants() {
    if (!this.data.importData.trim()) {
      wx.showToast({
        title: '请输入数据',
        icon: 'none'
      })
      return
    }

    try {
      this.setData({ importing: true })
      
      let data
      try {
        data = JSON.parse(this.data.importData)
      } catch (error) {
        throw new Error('JSON格式错误，请检查数据格式')
      }

      const result = await Data.importData(this.data.importType, data)
      
      this.setData({
        importResult: result,
        importing: false
      })

      if (result.success > 0) {
        wx.showToast({
          title: `成功导入${result.success}条数据`,
          icon: 'success'
        })
        
        // 刷新数据
        this.loadData()
      }

    } catch (error) {
      this.setData({ importing: false })
      console.error('导入失败:', error)
      
      wx.showModal({
        title: '导入失败',
        content: error.message || '数据导入失败，请检查数据格式',
        showCancel: false
      })
    }
  },

  // 清空导入数据
  clearImportData() {
    this.setData({
      importData: '',
      importResult: null
    })
  },

  // 查看模板
  viewTemplate() {
    const templates = {
      merchants: `[
  {
    "name": "福建武夷山茶叶有限公司",
    "category": "茶叶批发商",
    "contact": "李经理",
    "phone": "13800138000",
    "email": "business@wuyishan-tea.com",
    "province": "福建",
    "city": "南平市",
    "address": "武夷山市星村镇茶叶街123号",
    "description": "专业经营武夷岩茶，有自有茶园200亩"
  }
]`,
      products: `[
  {
    "name": "特级大红袍",
    "category": "乌龙茶",
    "price": 880,
    "description": "武夷山核心产区大红袍，传统工艺制作",
    "origin": "福建武夷山",
    "specification": "250g/盒",
    "stock": 100
  }
]`
    }

    const template = templates[this.data.importType] || templates.merchants
    
    wx.showModal({
      title: '数据模板',
      content: template,
      showCancel: false,
      confirmText: '复制模板'
    })
  },

  // 导出数据
  async exportData() {
    try {
      wx.showLoading({ title: '导出中...' })
      
      const data = Data.exportData(this.data.importType)
      
      // 复制到剪贴板
      wx.setClipboardData({
        data: JSON.stringify(data, null, 2),
        success: () => {
          wx.hideLoading()
          wx.showToast({
            title: '数据已复制到剪贴板',
            icon: 'success'
          })
        }
      })
    } catch (error) {
      wx.hideLoading()
      console.error('导出失败:', error)
      wx.showToast({
        title: '导出失败',
        icon: 'error'
      })
    }
  },

  // ==================== 统计分析 ====================
  
  // 加载统计数据
  async loadStats() {
    try {
      const stats = Data.getStats()
      const realtimeStats = await this.getRealtimeStats()
      
      this.setData({
        stats: stats,
        realtimeStats: realtimeStats
      })
    } catch (error) {
      console.error('加载统计失败:', error)
    }
  },

  // 获取实时统计
  async getRealtimeStats() {
    // 模拟实时统计数据
    return {
      onlineUsers: Math.floor(Math.random() * 100) + 50,
      todayVisits: Math.floor(Math.random() * 1000) + 500,
      todayRegistrations: Math.floor(Math.random() * 50) + 10,
      systemLoad: Math.random() * 100
    }
  },

  // ==================== 系统监控 ====================
  
  // 加载系统状态
  async loadSystemStatus() {
    try {
      const systemStatus = await this.getSystemStatus()
      const performanceMetrics = await Performance.getMetrics()
      const errorLogs = await this.getErrorLogs()
      
      this.setData({
        systemStatus: systemStatus,
        performanceMetrics: performanceMetrics,
        errorLogs: errorLogs
      })
    } catch (error) {
      console.error('加载系统状态失败:', error)
    }
  },

  // 获取系统状态
  async getSystemStatus() {
    return {
      serverStatus: 'running',
      databaseStatus: 'connected',
      apiStatus: 'healthy',
      lastUpdate: new Date().toISOString(),
      uptime: '7天12小时30分钟'
    }
  },

  // 获取错误日志
  async getErrorLogs() {
    // 模拟错误日志
    return [
      {
        id: '1',
        level: 'error',
        message: 'API连接超时',
        timestamp: '2024-01-20 10:30:00',
        details: '请求超时，响应时间超过5秒'
      }
    ]
  },

  // ==================== 系统管理 ====================
  
  // 加载系统配置
  async loadSystemConfig() {
    try {
      const backups = await this.loadBackups()
      const systemConfig = await this.getSystemConfig()
      
      this.setData({
        backups: backups,
        systemConfig: systemConfig
      })
    } catch (error) {
      console.error('加载系统配置失败:', error)
    }
  },

  // 获取系统配置
  async getSystemConfig() {
    return {
      maxMerchants: 1000,
      maxProducts: 5000,
      maxImageSize: '2MB',
      autoBackup: true,
      backupInterval: '24小时'
    }
  },

  // 备份数据
  async backupData() {
    try {
      wx.showLoading({ title: '备份中...' })
      
      const result = await Data.backup()
      
      if (result.success) {
        wx.hideLoading()
        wx.showToast({
          title: '备份成功',
          icon: 'success'
        })
        
        // 刷新备份列表
        this.loadSystemConfig()
        
        // 记录操作日志
        this.logAdminAction('system_backup', { backupId: result.backupId })
      }
    } catch (error) {
      wx.hideLoading()
      console.error('备份失败:', error)
      wx.showToast({
        title: '备份失败',
        icon: 'error'
      })
    }
  },

  // 加载备份列表
  async loadBackups() {
    try {
      const backups = await Data.getBackups()
      return backups
    } catch (error) {
      console.error('加载备份失败:', error)
      return []
    }
  },

  // 恢复数据
  async restoreData(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认恢复',
      content: '恢复数据将覆盖当前数据，确认恢复？',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '恢复中...' })
            
            const result = await Data.restore(id)
            
            if (result.success) {
              wx.hideLoading()
              wx.showToast({
                title: '恢复成功',
                icon: 'success'
              })
              
              // 刷新数据
              this.loadData()
              
              // 记录操作日志
              this.logAdminAction('system_restore', { backupId: id })
            }
          } catch (error) {
            wx.hideLoading()
            console.error('恢复失败:', error)
            wx.showToast({
              title: '恢复失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 清理数据
  async cleanupData() {
    wx.showModal({
      title: '确认清理',
      content: '清理将删除过期和无效数据，确认清理？',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '清理中...' })
            
            const result = await Data.cleanup({
              deleteExpired: true,
              deleteInvalid: true,
              optimizeStorage: true
            })
            
            if (result.success) {
              wx.hideLoading()
              wx.showToast({
                title: `清理完成，释放${result.freedSpace}KB空间`,
                icon: 'success'
              })
              
              // 刷新数据
              this.loadData()
              
              // 记录操作日志
              this.logAdminAction('system_cleanup', result)
            }
          } catch (error) {
            wx.hideLoading()
            console.error('清理失败:', error)
            wx.showToast({
              title: '清理失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 重置系统
  resetSystem() {
    wx.showModal({
      title: '危险操作',
      content: '重置系统将清空所有数据，此操作不可恢复！确认重置？',
      success: async (res) => {
        if (res.confirm) {
          wx.showModal({
            title: '最终确认',
            content: '请输入"RESET"确认重置系统',
            editable: true,
            success: async (finalRes) => {
              if (finalRes.confirm && finalRes.content === 'RESET') {
                try {
                  wx.showLoading({ title: '重置中...' })
                  
                  // 执行重置
                  await this.performSystemReset()
                  
                  wx.hideLoading()
                  wx.showToast({
                    title: '系统已重置',
                    icon: 'success'
                  })
                  
                  // 记录操作日志
                  this.logAdminAction('system_reset', {})
                  
                  // 重启应用
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  }, 2000)
                  
                } catch (error) {
                  wx.hideLoading()
                  console.error('重置失败:', error)
                  wx.showToast({
                    title: '重置失败',
                    icon: 'error'
                  })
                }
              }
            }
          })
        }
      }
    })
  },

  // 执行系统重置
  async performSystemReset() {
    // 清空所有数据
    const keys = [
      'realMerchants', 'realProducts', 'realMarkets', 'realSupplies',
      'userFavorites', 'userSettings', 'systemBackups'
    ]
    
    keys.forEach(key => {
      try {
        wx.removeStorageSync(key)
      } catch (error) {
        console.error(`清除${key}失败:`, error)
      }
    })
    
    // 重新初始化系统
    await Data.initializeSystem()
  },

  // ==================== 通用功能 ====================
  
  // 记录管理员操作日志
  logAdminAction(action, details) {
    const log = {
      action: action,
      details: details,
      timestamp: new Date().toISOString(),
      user: Auth.getCurrentUser().userInfo.nickName,
      role: this.data.userRole
    }
    
    console.log('管理员操作日志:', log)
    
    // 这里可以发送到服务器记录
    // await this.sendLogToServer(log)
  },

  // 发送日志到服务器
  async sendLogToServer(log) {
    try {
      // 发送到服务器的逻辑
      console.log('发送日志到服务器:', log)
    } catch (error) {
      console.error('发送日志失败:', error)
    }
  }
}) 