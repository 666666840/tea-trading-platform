// 环境状态演示页面
Page({
  data: {
    currentEnvironment: '',
    environmentConfig: null,
    userPermissions: null,
    availableFeatures: [],
    userInfo: null
  },

  onLoad() {
    this.loadEnvironmentInfo()
  },

  onShow() {
    this.loadEnvironmentInfo()
  },

  // 加载环境信息
  loadEnvironmentInfo() {
    const app = getApp()
    
    // 获取当前环境
    let currentMode = 'production'
    if (app.isDevelopmentMode()) {
      currentMode = 'development'
    } else if (!app.isProductionMode()) {
      currentMode = 'staging'
    }

    // 获取环境配置
    const envConfig = app.globalData.environment

    // 获取用户信息和权限
    app.getUserInfo().then(userInfo => {
      const permissions = this.getUserPermissions(userInfo)
      const features = this.getAvailableFeatures(userInfo, app)

      this.setData({
        currentEnvironment: currentMode,
        environmentConfig: envConfig,
        userPermissions: permissions,
        availableFeatures: features,
        userInfo: userInfo
      })
    }).catch(() => {
      // 未登录状态
      const permissions = this.getUserPermissions(null)
      const features = this.getAvailableFeatures(null, app)

      this.setData({
        currentEnvironment: currentMode,
        environmentConfig: envConfig,
        userPermissions: permissions,
        availableFeatures: features,
        userInfo: null
      })
    })
  },

  // 获取用户权限
  getUserPermissions(userInfo) {
    if (!userInfo) {
      return {
        type: '游客',
        level: 0,
        description: '未登录用户，只能访问基础功能'
      }
    }

    const app = getApp()
    
    if (app.isSuperAdmin(userInfo)) {
      return {
        type: '超级管理员',
        level: 5,
        description: '拥有所有权限，包括系统管理'
      }
    }
    
    if (app.isDeveloper(userInfo)) {
      return {
        type: '开发人员',
        level: 4,
        description: '拥有开发调试权限'
      }
    }
    
    if (app.isDataAdmin(userInfo)) {
      return {
        type: '数据管理员',
        level: 3,
        description: '可以管理商户和数据'
      }
    }
    
    if (app.isMerchantReviewer(userInfo)) {
      return {
        type: '商户审核员',
        level: 2,
        description: '可以审核商户申请'
      }
    }
    
    if (app.isTestUser(userInfo)) {
      return {
        type: '测试用户',
        level: 1,
        description: '可以访问测试功能'
      }
    }

    return {
      type: '普通用户',
      level: 1,
      description: '基础功能用户'
    }
  },

  // 获取可用功能列表
  getAvailableFeatures(userInfo, app) {
    const features = []

    // 基础功能（所有用户可用）
    features.push({
      name: '浏览茶叶信息',
      category: '基础功能',
      available: true,
      icon: '🍃'
    })

    features.push({
      name: '查看市场信息',
      category: '基础功能', 
      available: true,
      icon: '🏪'
    })

    features.push({
      name: '收藏功能',
      category: '基础功能',
      available: !!userInfo,
      icon: '⭐'
    })

    // 管理功能
    if (userInfo) {
      if (app.canAccessDataManagement(userInfo)) {
        features.push({
          name: '数据管理',
          category: '管理功能',
          available: true,
          icon: '📊'
        })
      }

      if (app.isMerchantReviewer(userInfo)) {
        features.push({
          name: '商户审核',
          category: '管理功能',
          available: true,
          icon: '✅'
        })
      }

      if (app.canAccessEnvironmentSwitcher(userInfo)) {
        features.push({
          name: '环境切换',
          category: '开发功能',
          available: true,
          icon: '🔄'
        })
      }

      if (app.isDeveloper(userInfo) && app.isDevelopmentMode()) {
        features.push({
          name: '开发调试',
          category: '开发功能',
          available: true,
          icon: '🛠️'
        })
      }
    }

    // 隐藏功能提示
    features.push({
      name: '隐藏功能',
      category: '特殊功能',
      available: false,
      icon: '🔐',
      hint: '连续点击版本号5次激活'
    })

    return features
  },

  // 测试环境切换
  testEnvironmentSwitch() {
    wx.navigateTo({
      url: '/pages/env-switcher/env-switcher'
    })
  },

  // 激活隐藏功能演示
  activateHiddenDemo() {
    wx.showModal({
      title: '隐藏功能激活',
      content: '在个人中心页面，连续快速点击版本号5次即可激活环境切换功能。这是为普通用户提供的隐藏入口。',
      confirmText: '去试试',
      cancelText: '我知道了',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/profile/profile'
          })
        }
      }
    })
  },

  // 查看详细配置
  viewDetailedConfig() {
    const app = getApp()
    const config = {
      environment: app.globalData.environment,
      version: app.globalData.version,
      apiBaseUrl: app.globalData.apiBaseUrl,
      globalMode: app.getGlobalEnvironmentMode(),
      isGlobalControlled: app.isGlobalEnvironmentEnabled()
    }

    const configText = JSON.stringify(config, null, 2)
    
    wx.setClipboardData({
      data: configText,
      success: () => {
        wx.showModal({
          title: '配置信息',
          content: '详细配置已复制到剪贴板',
          showCancel: false
        })
      }
    })
  },

  // 刷新信息
  refreshInfo() {
    wx.showLoading({
      title: '刷新中...'
    })
    
    setTimeout(() => {
      this.loadEnvironmentInfo()
      wx.hideLoading()
      wx.showToast({
        title: '刷新完成',
        icon: 'success'
      })
    }, 1000)
  }
}) 