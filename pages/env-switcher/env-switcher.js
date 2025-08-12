// 环境切换工具页面 - 基于微信官方环境检测
Page({
  data: {
    currentMode: '',
    wechatEnv: {},
    environments: [
      {
        key: 'development',
        name: '开发模式',
        desc: '显示所有管理功能，开启调试模式',
        color: '#ff6b6b',
        features: ['数据管理', '商户审核', '开发调试', '测试数据']
      },
      {
        key: 'staging',
        name: '预发布模式', 
        desc: '用于测试验证，功能接近生产环境',
        color: '#feca57',
        features: ['数据管理', '商户审核', '调试模式']
      },
      {
        key: 'production',
        name: '生产模式',
        desc: '用户正式使用版本，隐藏管理功能',
        color: '#48dbfb',
        features: ['基础功能', '安全模式']
      }
    ],
    userInfo: null,
    isDeveloper: false,
    canSwitchEnv: false,
    envInfo: null
  },

  onLoad() {
    this.checkPermission()
    this.loadEnvironmentInfo()
  },

  // 检查权限
  checkPermission() {
    const app = getApp()
    
    // 检查是否可以切换环境（基于微信环境）
    const canSwitch = app.canSwitchEnvironment()
    const wechatEnv = app.getWechatEnvVersion()
    
    this.setData({
      canSwitchEnv: canSwitch,
      wechatEnv: {
        version: wechatEnv,
        name: app.getWechatEnvName(wechatEnv),
        description: app.getWechatEnvDescription(wechatEnv)
      }
    })

    // 如果是正式版，直接禁止访问
    if (wechatEnv === 'release') {
      wx.showModal({
        title: '🚫 无法使用',
        content: '当前为微信小程序正式版，为确保用户体验稳定，不允许切换环境。如需调试功能，请使用开发版或体验版。',
        showCancel: false,
        confirmText: '我知道了',
        success: () => {
          wx.navigateBack()
        }
      })
      return
    }
    
    // 获取用户信息
    app.getUserInfo().then(userInfo => {
      const canAccess = app.canAccessEnvironmentSwitcher(userInfo)
      
      this.setData({
        userInfo: userInfo,
        isDeveloper: canAccess
      })

      // 如果用户没有权限，显示提示但允许使用
      if (!canAccess) {
        wx.showModal({
          title: '⚠️ 环境切换工具',
          content: `当前运行在微信${this.data.wechatEnv.name}环境下。此工具用于切换应用的功能模式，请谨慎操作。`,
          confirmText: '我了解',
          cancelText: '返回',
          success: (res) => {
            if (!res.confirm) {
              wx.navigateBack()
            }
          }
        })
      } else {
        // 开发人员直接进入
        wx.showToast({
          title: `欢迎使用环境切换工具`,
          icon: 'none',
          duration: 2000
        })
      }

    }).catch(() => {
      // 未登录用户
      wx.showModal({
        title: '环境切换工具',
        content: `当前运行在微信${this.data.wechatEnv.name}环境下。建议先登录以获得更好的体验。`,
        confirmText: '继续使用',
        cancelText: '返回',
        success: (res) => {
          if (!res.confirm) {
            wx.navigateBack()
          }
        }
      })
    })
  },

  // 加载环境信息
  loadEnvironmentInfo() {
    const app = getApp()
    const envInfo = app.getEnvironmentInfo()
    
    // 确定当前模式
    let currentMode = 'production'
    if (envInfo.appMode.debugMode && envInfo.appMode.allowDataManagement) {
      if (envInfo.wechatEnv.version === 'trial') {
        currentMode = 'staging'
      } else {
        currentMode = 'development'
      }
    }

    this.setData({ 
      currentMode,
      envInfo
    })
  },

  // 切换环境
  switchEnvironment(e) {
    const { mode } = e.currentTarget.dataset
    const app = getApp()

    // 检查是否可以切换
    if (!app.canSwitchEnvironment()) {
      wx.showModal({
        title: '无法切换',
        content: '当前微信环境不支持切换功能模式',
        showCancel: false
      })
      return
    }

    const modeInfo = this.getModeInfo(mode)
    
    wx.showModal({
      title: '确认切换环境',
      content: `即将切换到 ${modeInfo.name}\n\n${modeInfo.desc}\n\n这将影响应用的功能显示和行为。确定要切换吗？`,
      confirmColor: modeInfo.color,
      success: (res) => {
        if (res.confirm) {
          this.performSwitch(mode)
        }
      }
    })
  },

  // 执行环境切换
  performSwitch(mode) {
    const app = getApp()
    
    wx.showLoading({
      title: '切换中...',
      mask: true
    })

    try {
      // 尝试切换环境
      const result = app.setEnvironmentMode(mode)
      
      if (!result) {
        throw new Error('环境切换被拒绝')
      }
      
      // 更新界面
      this.setData({ currentMode: mode })
      this.loadEnvironmentInfo()
      
      wx.hideLoading()
      
      const modeInfo = this.getModeInfo(mode)
      wx.showToast({
        title: `已切换到${modeInfo.name}`,
        icon: 'success',
        duration: 2000
      })

      // 记录切换日志
      console.log(`环境已切换到: ${mode}`, {
        wechatEnv: app.getWechatEnvVersion(),
        appMode: mode,
        timestamp: new Date().toISOString()
      })
      
      // 提示重启应用以确保功能正常
      setTimeout(() => {
        wx.showModal({
          title: '切换完成',
          content: '环境已切换成功。建议重新启动小程序以确保所有功能正常工作。',
          confirmText: '重启应用',
          cancelText: '稍后重启',
          success: (res) => {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
          }
        })
      }, 2000)

    } catch (error) {
      wx.hideLoading()
      wx.showModal({
        title: '切换失败',
        content: `环境切换失败: ${error.message}`,
        showCancel: false
      })
    }
  },

  // 获取模式信息
  getModeInfo(mode) {
    return this.data.environments.find(env => env.key === mode) || {
      name: '未知模式',
      desc: '未知的环境模式',
      color: '#666666'
    }
  },

  // 查看环境详情
  viewEnvironmentDetail() {
    const envInfo = this.data.envInfo
    if (!envInfo) return

    const detail = `🌐 微信环境信息
版本类型: ${envInfo.wechatEnv.name} (${envInfo.wechatEnv.version})
环境描述: ${envInfo.wechatEnv.description}

📱 应用模式配置
开发模式: ${envInfo.appMode.isDevelopment ? '是' : '否'}
生产模式: ${envInfo.appMode.isProduction ? '是' : '否'}  
体验模式: ${envInfo.appMode.isTrial ? '是' : '否'}
调试模式: ${envInfo.appMode.debugMode ? '开启' : '关闭'}
数据管理: ${envInfo.appMode.allowDataManagement ? '允许' : '禁止'}

⚙️ 环境能力
切换环境: ${envInfo.capabilities.canSwitchEnv ? '支持' : '不支持'}
测试数据: ${envInfo.capabilities.showTestData ? '显示' : '隐藏'}

📝 账号信息
AppID: ${envInfo.account?.miniProgram?.appId || '未知'}`

    wx.showModal({
      title: '环境详情',
      content: detail,
      showCancel: false,
      confirmText: '关闭'
    })
  },

  // 查看使用帮助
  viewHelp() {
    const helpContent = `🔧 环境切换工具帮助

📌 环境类型说明：
• 开发模式：显示完整管理功能，用于开发调试
• 预发布模式：接近生产环境，用于测试验收  
• 生产模式：用户正式版本，功能精简稳定

🔐 使用限制：
• 微信正式版：不允许切换，确保用户体验稳定
• 微信开发版：完全支持切换，便于开发调试
• 微信体验版：支持切换，用于内测验收

⚠️ 注意事项：
• 切换后建议重启小程序确保功能正常
• 不同模式下功能权限可能不同
• 生产模式下隐藏调试和管理功能`

    wx.showModal({
      title: '使用帮助',
      content: helpContent,
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 重置为默认配置
  resetToDefault() {
    const app = getApp()
    const wechatEnv = app.getWechatEnvVersion()
    
    // 根据微信环境确定默认模式
    let defaultMode = 'production'
    if (wechatEnv === 'develop') {
      defaultMode = 'development'
    } else if (wechatEnv === 'trial') {
      defaultMode = 'staging'
    }

    wx.showModal({
      title: '重置确认',
      content: `确定要重置为默认的${this.getModeInfo(defaultMode).name}吗？`,
      success: (res) => {
        if (res.confirm) {
          this.performSwitch(defaultMode)
        }
      }
    })
  },

  // 导出环境配置
  exportConfig() {
    const envInfo = this.data.envInfo
    const config = {
      timestamp: new Date().toISOString(),
      wechatEnvironment: envInfo.wechatEnv,
      applicationMode: envInfo.appMode,
      capabilities: envInfo.capabilities,
      account: {
        appId: envInfo.account?.miniProgram?.appId
      }
    }

    wx.setClipboardData({
      data: JSON.stringify(config, null, 2),
      success: () => {
        wx.showToast({
          title: '配置已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  }
}) 