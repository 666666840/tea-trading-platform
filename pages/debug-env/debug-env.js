// 环境调试页面
Page({
  data: {
    envInfo: {},
    userInfo: {},
    debugInfo: {}
  },

  onLoad() {
    this.loadDebugInfo()
  },

  loadDebugInfo() {
    const app = getApp()
    
    console.log('=== 环境调试信息 ===')
    
    try {
      // 检查app.js方法是否存在
      const methods = [
        'getWechatEnvVersion',
        'canSwitchEnvironment', 
        'getEnvironmentInfo',
        'canAccessEnvironmentSwitcher'
      ]
      
      const methodStatus = {}
      methods.forEach(method => {
        methodStatus[method] = typeof app[method] === 'function' ? '✅存在' : '❌缺失'
      })

      // 获取微信环境信息
      let wechatEnv = 'unknown'
      let accountInfo = null
      try {
        accountInfo = wx.getAccountInfoSync()
        wechatEnv = accountInfo.miniProgram.envVersion || 'release'
        console.log('微信环境:', wechatEnv, accountInfo)
      } catch (error) {
        console.error('获取微信环境失败:', error)
        wechatEnv = 'error'
      }

      // 检查app环境配置
      let appEnv = null
      try {
        if (typeof app.getEnvironmentInfo === 'function') {
          appEnv = app.getEnvironmentInfo()
        } else {
          appEnv = app.globalData.environment || '未配置'
        }
      } catch (error) {
        console.error('获取app环境失败:', error)
        appEnv = { error: error.message }
      }

      // 检查用户权限
      let userStatus = 'unknown'
      let userInfo = null
      try {
        if (typeof app.getUserInfo === 'function') {
          app.getUserInfo().then(info => {
            userInfo = info
            this.setData({ 'userInfo': info })
          }).catch(err => {
            console.log('未登录或获取用户信息失败:', err)
            userInfo = null
          })
        }
      } catch (error) {
        console.error('用户信息检查失败:', error)
      }

      // 检查环境切换能力
      let canSwitch = false
      try {
        if (typeof app.canSwitchEnvironment === 'function') {
          canSwitch = app.canSwitchEnvironment()
        }
      } catch (error) {
        console.error('检查切换能力失败:', error)
      }

      const debugInfo = {
        appMethods: methodStatus,
        wechatEnv: {
          version: wechatEnv,
          accountInfo: accountInfo
        },
        appEnvironment: appEnv,
        canSwitchEnvironment: canSwitch,
        timestamp: new Date().toISOString(),
        appVersion: app.globalData.version || '未知'
      }

      console.log('调试信息:', debugInfo)

      this.setData({
        debugInfo: debugInfo,
        envInfo: appEnv
      })

    } catch (error) {
      console.error('调试信息加载失败:', error)
      this.setData({
        debugInfo: {
          error: error.message,
          stack: error.stack
        }
      })
    }
  },

  // 复制调试信息
  copyDebugInfo() {
    const debugText = JSON.stringify(this.data.debugInfo, null, 2)
    wx.setClipboardData({
      data: debugText,
      success: () => {
        wx.showToast({
          title: '调试信息已复制',
          icon: 'success'
        })
      }
    })
  },

  // 强制刷新app
  refreshApp() {
    wx.showModal({
      title: '重启应用',
      content: '即将重启小程序以刷新环境配置',
      success: (res) => {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  },

  // 手动测试环境切换
  testEnvSwitch() {
    try {
      wx.navigateTo({
        url: '/pages/env-switcher/env-switcher',
        fail: (error) => {
          wx.showModal({
            title: '页面跳转失败',
            content: `错误：${error.errMsg}`,
            showCancel: false
          })
        }
      })
    } catch (error) {
      wx.showModal({
        title: '跳转异常',
        content: `异常：${error.message}`,
        showCancel: false
      })
    }
  },

  // 查看profile菜单
  checkProfileMenu() {
    try {
      wx.navigateTo({
        url: '/pages/profile/profile',
        fail: (error) => {
          wx.showModal({
            title: '跳转失败',
            content: `错误：${error.errMsg}`,
            showCancel: false
          })
        }
      })
    } catch (error) {
      wx.showModal({
        title: '跳转异常',
        content: `异常：${error.message}`,
        showCancel: false
      })
    }
  }
}) 