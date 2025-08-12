const Auth = require('../../utils/auth-manager.js')
const { Favorite } = require('../../utils/favorite-manager.js')

Page({
  data: {
    // 用户基本信息
    userInfo: {
      avatar: '/images/default-avatar.png',
      name: '未登录',
      userId: 'guest_001',
      wechatBound: false,
      realNameVerified: false
    },
    isLoggedIn: false,
    loginType: 'guest',
    favoriteStats: null,
    userStats: null,
    menuItems: [],
    isAdmin: false,
    
    // 店铺相关
    shopInfo: {
      hasShop: false
    },
    shopStats: {
      views: 0,
      contactUnlocks: 0,
      conversionRate: 0
    },
    
    // 新增：环境相关
    wechatEnv: 'release',
    canSwitchEnv: false,
    version: '7.0',
    
    // 移除隐藏管理后台相关代码，完全分离小程序和管理后台
  },

  onLoad() {
    // 移除自动跳转到 web-view 的代码，恢复原有逻辑
    const app = getApp();
    const currentUser = app.globalData.currentUser || { isLoggedIn: false, userInfo: {} };
    this.setData({
      isLoggedIn: !!currentUser.isLoggedIn,
      userInfo: currentUser.userInfo || {}
    });
    this.initUserProfile && this.initUserProfile();
    this.checkAdminPermission && this.checkAdminPermission();
  },

  onShow() {
    const currentUser = Auth.getCurrentUser();
    this.setData({
      isLoggedIn: !!currentUser.isLoggedIn,
      userInfo: currentUser.userInfo || {
        avatar: '/images/default-avatar.png',
        name: '未登录',
        userId: 'guest_001'
      }
    });
    console.log('onShow isLoggedIn:', this.data.isLoggedIn, currentUser);
  },

  // 初始化用户资料
  initUserProfile() {
    const currentUser = Auth.getCurrentUser()
    const favoriteStats = Favorite.getStats()
    const userStats = Auth.getStats()
    
    // 获取微信环境信息
    const app = getApp()
    const wechatEnv = app.getWechatEnvVersion()
    const canSwitchEnv = app.canSwitchEnvironment()
    
    this.setData({
      userInfo: currentUser.userInfo,
      isLoggedIn: !!currentUser.isLoggedIn,
      loginType: currentUser.loginType,
      favoriteStats: favoriteStats,
      userStats: userStats,
      wechatEnv: wechatEnv,
      canSwitchEnv: canSwitchEnv,
      version: app.globalData.version || '7.0',
      menuItems: this.getMenuItems(currentUser)
    })
  },

  // 刷新用户数据
  refreshUserData() {
    const currentUser = Auth.getCurrentUser()
    const favoriteStats = Favorite.getStats()
    const userStats = Auth.getStats()
    
    // 获取微信环境信息
    const app = getApp()
    const wechatEnv = app.getWechatEnvVersion()
    const canSwitchEnv = app.canSwitchEnvironment()
    
    this.setData({
      userInfo: currentUser.userInfo,
      isLoggedIn: !!currentUser.isLoggedIn,
      loginType: currentUser.loginType,
      favoriteStats: favoriteStats,
      userStats: userStats,
      wechatEnv: wechatEnv,
      canSwitchEnv: canSwitchEnv,
      version: app.globalData.version || '7.0',
      menuItems: this.getMenuItems(currentUser)
    })
  },

  // 获取菜单项
  getMenuItems(currentUser) {
    const app = getApp()
    
    const baseItems = [
      {
        icon: 'star',
        title: '我的收藏',
        desc: `${this.data.favoriteStats?.total || 0}个收藏`,
        url: '/pages/my-favorites/my-favorites',
        needLogin: true
      },
      {
        icon: 'edit',
        title: '我的发布',
        desc: '管理发布内容',
        url: '/pages/my-publish/my-publish',
        needLogin: true
      },
      {
        icon: 'message',
        title: '我的询价',
        desc: '查看询价记录',
        url: '/pages/inquiry-manage/inquiry-manage',
        needLogin: true
      },
      {
        icon: 'phone',
        title: '联系记录',
        desc: '查看联系历史',
        url: '/pages/contact-history/contact-history',
        needLogin: false
      }
    ]

    const systemItems = [
      {
        icon: 'setting',
        title: '设置',
        desc: '应用设置',
        url: '/pages/settings/settings',
        needLogin: false
      },
      {
        icon: 'help',
        title: '帮助反馈',
        desc: '使用帮助',
        url: '/pages/help/help',
        needLogin: false
      },
      {
        icon: 'info',
        title: '关于我们',
        desc: '应用信息',
        url: '/pages/about/about',
        needLogin: false
      }
    ]

    // 管理员功能菜单
    const adminItems = []

    if (currentUser.isLoggedIn && currentUser.userInfo) {
      const userInfo = currentUser.userInfo

      // 数据管理功能（数据管理员 + 超级管理员）
      if (app.canAccessDataManagement(userInfo)) {
        adminItems.push({
          icon: 'analytics',
          title: '数据管理',
          desc: '商户和数据管理',
          url: '/pages/data-admin/data-admin',
          needLogin: true,
          isAdmin: true,
          adminType: 'data'
        })
      }

      // 商户审核功能（商户审核员 + 超级管理员）
      if (app.isMerchantReviewer(userInfo)) {
        adminItems.push({
          icon: 'check',
          title: '商户审核',
          desc: '商户入驻审核',
          url: '/pages/merchant-status/merchant-status',
          needLogin: true,
          isAdmin: true,
          adminType: 'merchant'
        })
      }

      // 开发调试功能（仅开发环境 + 开发人员）
      if (app.isDeveloper(userInfo) && app.isDevelopmentMode()) {
        adminItems.push({
          icon: 'code',
          title: '开发调试',
          desc: '开发调试工具',
          url: '/pages/dev-tools/dev-tools',
          needLogin: true,
          isAdmin: true,
          adminType: 'developer'
        })
      }



      // 移除外置管理后台入口，完全分离小程序和管理后台
      // 管理后台只能通过直接访问网址进入，小程序内无任何跳转途径

      // 内容管理功能（管理员 + 内容管理员）
      if (app.isContentManager(userInfo) || app.isSuperAdmin(userInfo)) {
        adminItems.push({
          icon: 'edit',
          title: '内容管理',
          desc: '管理转载内容和本地数据',
          url: '/pages/content-management/content-management',
          needLogin: true,
          isAdmin: true,
          adminType: 'content'
        })
      }

      // 超级管理员专用功能
      if (app.isSuperAdmin(userInfo)) {
        adminItems.push({
          icon: 'gear',
          title: '系统管理',
          desc: '系统配置管理',
          url: '/pages/system-admin/system-admin',
          needLogin: true,
          isAdmin: true,
          adminType: 'super'
        })
      }
    }



    // 如果有管理员功能，将其添加到系统项目的开头
    if (adminItems.length > 0) {
      systemItems.unshift(...adminItems)
    }

    // 环境提示（仅开发模式）
    if (app.isDevelopmentMode()) {
      systemItems.push({
        icon: 'warning',
        title: '开发模式',
        desc: '当前为开发环境',
        url: '',
        needLogin: false,
        isDevelopmentMode: true
      })
    }

    // 环境状态演示（所有用户可见）
    systemItems.push({
      icon: 'info',
      title: '环境状态',
      desc: '查看当前环境和权限信息',
      url: '/pages/env-demo/env-demo',
      needLogin: false,
      isDemo: true
    })





    return {
      user: baseItems,
      system: systemItems
    }
  },

  // 用户头像点击
  onAvatarTap() {
    if (!this.data.isLoggedIn) {
      this.handleLogin()
    } else {
      this.showUserMenu()
    }
  },

  // 显示用户菜单
  showUserMenu() {
    const menuItems = ['刷新用户信息', '切换账号', '退出登录']
    
    wx.showActionSheet({
      itemList: menuItems,
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.refreshUserInfo()
            break
          case 1:
            this.switchAccount()
            break
          case 2:
            this.handleLogout()
            break
        }
      }
    })
  },

  // 处理登录
  async handleLogin() {
    try {
      wx.showLoading({
        title: '准备登录...'
      })
      
      const result = await Auth.login()
      if (result.success) {
        this.refreshUserData()
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('登录失败:', error)
      wx.showModal({
        title: '登录失败',
        content: error.message || '登录过程中出现问题，请稍后重试',
        showCancel: false
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 处理登出
  handleLogout() {
    Auth.logout();
    wx.switchTab({ url: '/pages/profile/profile' });
  },

  // 刷新用户信息
  async refreshUserInfo() {
    try {
      wx.showLoading({
        title: '刷新中...'
      })
      
      await Auth.refresh()
      this.refreshUserData()
      
      wx.showToast({
        title: '刷新完成',
        icon: 'success'
      })
    } catch (error) {
      wx.showToast({
        title: '刷新失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 切换账号
  switchAccount() {
    wx.showModal({
      title: '切换账号',
      content: '是否要退出当前账号并重新登录？',
      success: (res) => {
        if (res.confirm) {
          Auth.logout()
        }
      }
    })
  },

  // 菜单项点击
  onMenuTap(e) {
    const { url, needLogin, title } = e.currentTarget.dataset
    
    if (needLogin && !this.data.isLoggedIn) {
      wx.showModal({
        title: '登录提示',
        content: `使用${title}功能需要先登录`,
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.handleLogin()
          }
        }
      })
      return
    }

    if (url) {
      wx.navigateTo({
        url: url,
        fail: () => {
          wx.showToast({
            title: '页面开发中',
            icon: 'none'
          })
        }
      })
    }
  },

  // 显示收藏统计详情
  showFavoriteDetail() {
    if (!this.data.isLoggedIn) {
      this.handleLogin()
      return
    }

    const stats = this.data.favoriteStats
    const detail = [
      `市场：${stats.markets}个`,
      // 这里补充其他统计项，如：
      `商户：${stats.merchants}个`,
      `产品：${stats.products}个`,
      `新品：${stats.newarrivals}个`,
      `供求：${stats.supplies}个`,
      `特价：${stats.clearance}个`,
      `文章：${stats.articles}个`
    ].join('\n')

    wx.showModal({
      title: `收藏详情 (总计${stats.total}个)` ,
      content: detail,
      showCancel: false,
      confirmText: '管理收藏',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/my-favorites/my-favorites'
          })
        }
      }
    })
  }
})