// 用户认证管理器
class AuthManager {
  constructor() {
    this.storageKey = 'userAuth'
    this.userInfoKey = 'userInfo'
    this.sessionKey = 'userSession'
  }

  // 获取当前用户状态
  getCurrentUser() {
    try {
      const authData = wx.getStorageSync(this.storageKey)
      const userInfo = wx.getStorageSync(this.userInfoKey)
      
      if (authData && userInfo) {
        return {
          isLoggedIn: true,
          authData,
          userInfo,
          loginType: authData.loginType || 'wechat'
        }
      }
      
      return {
        isLoggedIn: false,
        authData: null,
        userInfo: null,
        loginType: 'guest'
      }
    } catch (error) {
      console.error('获取用户状态失败:', error)
      return {
        isLoggedIn: false,
        authData: null,
        userInfo: null,
        loginType: 'guest'
      }
    }
  }

  // 微信登录
  async loginWithWechat() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '登录中...'
      })
      
      // 获取用户授权
      wx.getUserProfile({
        desc: '用于完善用户资料和提供个性化服务',
        success: (profileRes) => {
          console.log('用户授权成功:', profileRes)
          
          // 获取登录凭证
          wx.login({
            success: (loginRes) => {
              if (loginRes.code) {
                this.processWechatLogin(loginRes.code, profileRes.userInfo)
                  .then(resolve)
                  .catch(reject)
              } else {
                reject(new Error('获取登录凭证失败'))
              }
            },
            fail: (error) => {
              reject(new Error('微信登录失败: ' + error.errMsg))
            }
          })
        },
        fail: (error) => {
          wx.hideLoading()
          console.log('用户拒绝授权:', error)
          
          // 提供游客模式选项
          wx.showModal({
            title: '登录提示',
            content: '登录后可享受个性化服务，如收藏、历史记录等。是否以游客身份继续？',
            confirmText: '游客模式',
            cancelText: '重新登录',
            success: (modalRes) => {
              if (modalRes.confirm) {
                this.setGuestMode().then(resolve).catch(reject)
              } else {
                reject(new Error('用户取消登录'))
              }
            }
          })
        }
      })
    })
  }

  // 处理微信登录
  async processWechatLogin(code, userInfo) {
    try {
      // 这里应该调用后端API验证code和获取openid
      // 现在先模拟登录成功
      const mockAuthData = {
        openid: 'mock_openid_' + Date.now(),
        unionid: null,
        sessionKey: 'mock_session_key',
        loginType: 'wechat',
        loginTime: new Date().toISOString(),
        expireTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7天过期
      }

      // 处理用户信息
      const processedUserInfo = {
        ...userInfo,
        id: mockAuthData.openid,
        loginType: 'wechat',
        isVip: false,
        level: 1,
        points: 0,
        joinTime: new Date().toISOString(),
        lastLoginTime: new Date().toISOString()
      }

      // 保存到本地存储
      wx.setStorageSync(this.storageKey, mockAuthData)
      wx.setStorageSync(this.userInfoKey, processedUserInfo)

      // 更新全局状态
      const app = getApp()
      if (app) {
        app.globalData.userInfo = processedUserInfo
        app.globalData.hasUserInfo = true
        app.globalData.isLoggedIn = true
      }

      wx.hideLoading()
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })

      // 记录登录行为
      this.recordLoginAction('wechat_login', processedUserInfo)

      return {
        success: true,
        authData: mockAuthData,
        userInfo: processedUserInfo
      }

    } catch (error) {
      wx.hideLoading()
      console.error('登录处理失败:', error)
      throw error
    }
  }

  // 设置游客模式
  async setGuestMode() {
    try {
      const guestData = {
        loginType: 'guest',
        guestId: 'guest_' + Date.now(),
        loginTime: new Date().toISOString(),
        features: ['browse', 'search'] // 游客可用功能
      }

      const guestUserInfo = {
        nickName: '游客用户',
        avatarUrl: '/images/default-avatar.png',
        id: guestData.guestId,
        loginType: 'guest',
        isVip: false,
        level: 0,
        points: 0,
        joinTime: new Date().toISOString()
      }

      wx.setStorageSync(this.storageKey, guestData)
      wx.setStorageSync(this.userInfoKey, guestUserInfo)

      // 更新全局状态
      const app = getApp()
      if (app) {
        app.globalData.userInfo = guestUserInfo
        app.globalData.hasUserInfo = true
        app.globalData.isLoggedIn = false
      }

      wx.showToast({
        title: '进入游客模式',
        icon: 'none'
      })

      return {
        success: true,
        authData: guestData,
        userInfo: guestUserInfo
      }

    } catch (error) {
      console.error('设置游客模式失败:', error)
      throw error
    }
  }

  // 登出
  async logout() {
    try {
      wx.showModal({
        title: '确认登出',
        content: '登出后将清除个人信息和收藏记录，确定继续吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除存储的用户数据
            wx.removeStorageSync(this.storageKey)
            wx.removeStorageSync(this.userInfoKey)
            wx.removeStorageSync(this.sessionKey)

            // 清除全局状态
            const app = getApp()
            if (app) {
              app.globalData.userInfo = null
              app.globalData.hasUserInfo = false
              app.globalData.isLoggedIn = false
            }

            // 提示用户
            wx.showToast({
              title: '已退出登录',
              icon: 'success'
            })

            // 记录登出行为
            this.recordLoginAction('logout')

            // 可以选择跳转到登录页或首页
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        }
      })
    } catch (error) {
      console.error('登出失败:', error)
      wx.showToast({
        title: '登出失败',
        icon: 'error'
      })
    }
  }

  // 检查登录状态
  checkLoginStatus() {
    const currentUser = this.getCurrentUser()
    
    if (!currentUser.isLoggedIn) {
      return false
    }

    // 检查是否过期（针对微信登录）
    if (currentUser.authData.expireTime) {
      const expireTime = new Date(currentUser.authData.expireTime)
      if (Date.now() > expireTime.getTime()) {
        console.log('登录已过期')
        this.logout()
        return false
      }
    }

    return true
  }

  // 刷新用户信息
  async refreshUserInfo() {
    const currentUser = this.getCurrentUser()
    
    if (!currentUser.isLoggedIn || currentUser.loginType === 'guest') {
      return currentUser.userInfo
    }

    try {
      wx.showLoading({
        title: '刷新用户信息...'
      })

      // 重新获取用户信息（这里模拟）
      const updatedUserInfo = {
        ...currentUser.userInfo,
        lastLoginTime: new Date().toISOString(),
        // 这里可以从服务器获取最新的用户信息
      }

      wx.setStorageSync(this.userInfoKey, updatedUserInfo)

      // 更新全局状态
      const app = getApp()
      if (app) {
        app.globalData.userInfo = updatedUserInfo
      }

      wx.hideLoading()
      return updatedUserInfo

    } catch (error) {
      wx.hideLoading()
      console.error('刷新用户信息失败:', error)
      return currentUser.userInfo
    }
  }

  // 获取用户权限
  getUserPermissions() {
    const currentUser = this.getCurrentUser()
    
    if (currentUser.loginType === 'guest') {
      return {
        canFavorite: false,
        canPublish: false,
        canContact: true,
        canComment: false,
        canUpload: false,
        message: '登录后可享受完整功能'
      }
    }

    if (currentUser.isLoggedIn) {
      return {
        canFavorite: true,
        canPublish: true,
        canContact: true,
        canComment: true,
        canUpload: currentUser.userInfo.isVip || currentUser.userInfo.level >= 2,
        message: '已登录用户'
      }
    }

    return {
      canFavorite: false,
      canPublish: false,
      canContact: false,
      canComment: false,
      canUpload: false,
      message: '请先登录'
    }
  }

  // 检查特定权限
  checkPermission(permission) {
    const permissions = this.getUserPermissions()
    const hasPermission = permissions[permission] || false
    
    if (!hasPermission) {
      wx.showModal({
        title: '权限不足',
        content: permissions.message + `，无法使用${this.getPermissionName(permission)}功能`,
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm && !this.getCurrentUser().isLoggedIn) {
            this.showLoginModal()
          }
        }
      })
    }
    
    return hasPermission
  }

  // 获取权限名称
  getPermissionName(permission) {
    const names = {
      canFavorite: '收藏',
      canPublish: '发布',
      canContact: '联系',
      canComment: '评论',
      canUpload: '上传'
    }
    return names[permission] || permission
  }

  // 显示登录弹窗
  showLoginModal() {
    wx.showModal({
      title: '登录提示',
      content: '登录后可享受收藏、发布、评论等完整功能',
      confirmText: '立即登录',
      cancelText: '游客模式',
      success: (res) => {
        if (res.confirm) {
          this.loginWithWechat()
        } else {
          this.setGuestMode()
        }
      }
    })
  }

  // 记录登录相关行为
  recordLoginAction(action, userData = null) {
    try {
      const loginHistory = wx.getStorageSync('loginHistory') || []
      loginHistory.push({
        action,
        userData: userData ? {
          id: userData.id,
          nickName: userData.nickName,
          loginType: userData.loginType
        } : null,
        timestamp: new Date().toISOString()
      })
      
      // 只保留最近20条记录
      if (loginHistory.length > 20) {
        loginHistory.splice(0, loginHistory.length - 20)
      }
      
      wx.setStorageSync('loginHistory', loginHistory)
    } catch (error) {
      console.error('记录登录行为失败:', error)
    }
  }

  // 获取登录统计
  getLoginStats() {
    try {
      const loginHistory = wx.getStorageSync('loginHistory') || []
      const currentUser = this.getCurrentUser()
      
      return {
        totalLogins: loginHistory.filter(h => h.action === 'wechat_login').length,
        lastLoginTime: currentUser.userInfo?.lastLoginTime,
        loginType: currentUser.loginType,
        isLoggedIn: currentUser.isLoggedIn,
        userLevel: currentUser.userInfo?.level || 0,
        joinTime: currentUser.userInfo?.joinTime
      }
    } catch (error) {
      console.error('获取登录统计失败:', error)
      return {
        totalLogins: 0,
        lastLoginTime: null,
        loginType: 'guest',
        isLoggedIn: false,
        userLevel: 0,
        joinTime: null
      }
    }
  }

  getStats() {
    const authData = wx.getStorageSync(this.storageKey) || {};
    return {
      loginType: authData.loginType || 'guest',
      totalLogins: authData.totalLogins || 0,
      lastLoginTime: authData.lastLoginTime || null,
      userLevel: authData.level || 0,
      joinTime: authData.joinTime || null
    };
  }
}

// 创建全局认证管理器实例
const authManager = new AuthManager()

// 导出便捷方法
const Auth = {
  // 登录
  login() {
    return authManager.loginWithWechat()
  },

  // 登出
  logout() {
    return authManager.logout()
  },

  // 游客模式
  guest() {
    return authManager.setGuestMode()
  },

  // 获取当前用户
  getCurrentUser() {
    return authManager.getCurrentUser()
  },

  // 检查登录状态
  isLoggedIn() {
    return authManager.checkLoginStatus()
  },

  // 检查权限
  checkPermission(permission) {
    return authManager.checkPermission(permission)
  },

  // 获取权限
  getPermissions() {
    return authManager.getUserPermissions()
  },

  // 显示登录弹窗
  showLogin() {
    return authManager.showLoginModal()
  },

  // 刷新用户信息
  refresh() {
    return authManager.refreshUserInfo()
  },

  // 获取统计
  getStats() {
    return authManager.getLoginStats()
  }
}

module.exports = new AuthManager() 