/**
 * 系统信息辅助工具
 * 用于替代弃用的 wx.getSystemInfoSync
 */

class SystemInfoHelper {
  constructor() {
    this.cachedInfo = null
    this.cacheTime = 0
    this.cacheExpiry = 5 * 60 * 1000 // 5分钟缓存
  }

  /**
   * 获取完整的系统信息（兼容旧版本）
   */
  getSystemInfo() {
    try {
      // 检查缓存
      if (this.cachedInfo && (Date.now() - this.cacheTime) < this.cacheExpiry) {
        return this.cachedInfo
      }

      let systemInfo = {}

      // 尝试使用新API
      try {
        const deviceInfo = wx.getDeviceInfo()
        const windowInfo = wx.getWindowInfo()
        const appBaseInfo = wx.getAppBaseInfo()
        
        systemInfo = {
          ...deviceInfo,
          ...windowInfo,
          ...appBaseInfo
        }
      } catch (newApiError) {
        // 新API失败，使用旧API
        try {
          systemInfo = wx.getSystemInfoSync()
        } catch (oldApiError) {
          console.warn('获取系统信息失败，使用默认值:', oldApiError)
          systemInfo = this.getDefaultSystemInfo()
        }
      }

      // 缓存结果
      this.cachedInfo = systemInfo
      this.cacheTime = Date.now()

      return systemInfo
    } catch (error) {
      console.error('SystemInfoHelper.getSystemInfo 错误:', error)
      return this.getDefaultSystemInfo()
    }
  }

  /**
   * 获取设备信息
   */
  getDeviceInfo() {
    try {
      return wx.getDeviceInfo ? wx.getDeviceInfo() : {
        brand: this.getSystemInfo().brand || 'unknown',
        model: this.getSystemInfo().model || 'unknown',
        system: this.getSystemInfo().system || 'unknown',
        platform: this.getSystemInfo().platform || 'devtools'
      }
    } catch (error) {
      console.warn('获取设备信息失败:', error)
      return {
        brand: 'unknown',
        model: 'unknown', 
        system: 'unknown',
        platform: 'devtools'
      }
    }
  }

  /**
   * 获取窗口信息
   */
  getWindowInfo() {
    try {
      return wx.getWindowInfo ? wx.getWindowInfo() : {
        windowWidth: this.getSystemInfo().windowWidth || 375,
        windowHeight: this.getSystemInfo().windowHeight || 667,
        screenWidth: this.getSystemInfo().screenWidth || 375,
        screenHeight: this.getSystemInfo().screenHeight || 667,
        pixelRatio: this.getSystemInfo().pixelRatio || 2
      }
    } catch (error) {
      console.warn('获取窗口信息失败:', error)
      return {
        windowWidth: 375,
        windowHeight: 667,
        screenWidth: 375,
        screenHeight: 667,
        pixelRatio: 2
      }
    }
  }

  /**
   * 获取应用基础信息
   */
  getAppBaseInfo() {
    try {
      return wx.getAppBaseInfo ? wx.getAppBaseInfo() : {
        SDKVersion: this.getSystemInfo().SDKVersion || '2.0.0',
        enableDebug: this.getSystemInfo().enableDebug || false,
        host: this.getSystemInfo().host || { env: 'WeChat' },
        language: this.getSystemInfo().language || 'zh_CN',
        version: this.getSystemInfo().version || '8.0.0'
      }
    } catch (error) {
      console.warn('获取应用基础信息失败:', error)
      return {
        SDKVersion: '2.0.0',
        enableDebug: false,
        host: { env: 'WeChat' },
        language: 'zh_CN',
        version: '8.0.0'
      }
    }
  }

  /**
   * 获取系统设置信息
   */
  getSystemSetting() {
    try {
      return wx.getSystemSetting ? wx.getSystemSetting() : {
        bluetoothEnabled: false,
        locationEnabled: false,
        wifiEnabled: true,
        deviceOrientation: 'portrait'
      }
    } catch (error) {
      console.warn('获取系统设置失败:', error)
      return {
        bluetoothEnabled: false,
        locationEnabled: false,
        wifiEnabled: true,
        deviceOrientation: 'portrait'
      }
    }
  }

  /**
   * 获取应用授权设置
   */
  getAppAuthorizeSetting() {
    try {
      return wx.getAppAuthorizeSetting ? wx.getAppAuthorizeSetting() : {
        albumAuthorized: 'not determined',
        bluetoothAuthorized: 'not determined',
        cameraAuthorized: 'not determined',
        locationAuthorized: 'not determined',
        microphoneAuthorized: 'not determined',
        notificationAuthorized: 'not determined'
      }
    } catch (error) {
      console.warn('获取应用授权设置失败:', error)
      return {
        albumAuthorized: 'not determined',
        bluetoothAuthorized: 'not determined', 
        cameraAuthorized: 'not determined',
        locationAuthorized: 'not determined',
        microphoneAuthorized: 'not determined',
        notificationAuthorized: 'not determined'
      }
    }
  }

  /**
   * 获取主题信息
   */
  getTheme() {
    try {
      const systemInfo = this.getSystemInfo()
      return systemInfo.theme || 'light'
    } catch (error) {
      console.warn('获取主题信息失败:', error)
      return 'light'
    }
  }

  /**
   * 默认系统信息
   */
  getDefaultSystemInfo() {
    return {
      brand: 'devtools',
      model: 'devtools',
      system: 'iOS 10.0.1',
      platform: 'devtools',
      version: '8.0.0',
      SDKVersion: '2.0.0',
      windowWidth: 375,
      windowHeight: 667,
      screenWidth: 375,
      screenHeight: 667,
      pixelRatio: 2,
      language: 'zh_CN',
      enableDebug: true,
      theme: 'light'
    }
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.cachedInfo = null
    this.cacheTime = 0
  }

  /**
   * 检查是否为开发环境
   */
  isDevelopment() {
    try {
      const appBaseInfo = this.getAppBaseInfo()
      return appBaseInfo.enableDebug || 
             appBaseInfo.host?.env === 'development' ||
             this.getSystemInfo().platform === 'devtools'
    } catch (error) {
      return false
    }
  }

  /**
   * 获取设备类型
   */
  getDeviceType() {
    try {
      const deviceInfo = this.getDeviceInfo()
      const windowInfo = this.getWindowInfo()
      
      if (deviceInfo.platform === 'devtools') {
        return 'simulator'
      }
      
      if (windowInfo.windowWidth >= 768) {
        return 'tablet'
      }
      
      return 'mobile'
    } catch (error) {
      return 'mobile'
    }
  }
}

// 创建全局实例
const systemInfoHelper = new SystemInfoHelper()

module.exports = {
  SystemInfoHelper,
  systemInfoHelper
} 