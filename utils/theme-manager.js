/**
 * 主题管理器
 * 提供深色模式切换、主题定制等功能
 */

const { systemInfoHelper } = require('./system-info-helper.js')

class ThemeManager {
  constructor() {
    this.currentTheme = 'light'
    this.systemPreference = 'auto'
    this.storageKey = 'app_theme_preference'
    this.themes = {
      light: {
        name: '浅色主题',
        icon: '☀️',
        description: '适合白天使用的明亮主题'
      },
      dark: {
        name: '深色主题',
        icon: '🌙',
        description: '适合夜间使用的深色主题'
      },
      auto: {
        name: '跟随系统',
        icon: '🔄',
        description: '自动跟随系统主题设置'
      }
    }
    
    this.init()
  }

  /**
   * 初始化主题管理器
   */
  init() {
    try {
      // 读取用户偏好设置
      const savedPreference = wx.getStorageSync(this.storageKey)
      if (savedPreference) {
        this.systemPreference = savedPreference
      }

      // 监听系统主题变化
      this.watchSystemTheme()

      // 应用主题
      this.applyTheme()

    } catch (error) {
      console.error('主题管理器初始化失败:', error)
      this.applyTheme('light')
    }
  }

  /**
   * 监听系统主题变化
   */
  watchSystemTheme() {
    try {
      wx.onThemeChange && wx.onThemeChange((res) => {
        if (this.systemPreference === 'auto') {
          this.currentTheme = res.theme
          this.updatePageTheme(res.theme)
        }
      })
    } catch (error) {
      console.log('系统主题监听不支持:', error)
    }
  }

  /**
   * 获取系统主题
   */
  getSystemTheme() {
    try {
      const theme = systemInfoHelper.getTheme()
      return theme || 'light'
    } catch (error) {
      console.log('获取系统主题失败:', error)
      return 'light'
    }
  }

  /**
   * 设置主题偏好
   * @param {string} preference - 主题偏好: 'light' | 'dark' | 'auto'
   */
  setThemePreference(preference) {
    try {
      this.systemPreference = preference
      wx.setStorageSync(this.storageKey, preference)
      this.applyTheme()
      
      // 触发主题变化事件
      this.emitThemeChange()
      
      return true
    } catch (error) {
      console.error('设置主题偏好失败:', error)
      return false
    }
  }

  /**
   * 应用主题
   */
  applyTheme() {
    let targetTheme = this.systemPreference

    if (targetTheme === 'auto') {
      targetTheme = this.getSystemTheme()
    }

    this.currentTheme = targetTheme
    this.updatePageTheme(targetTheme)
  }

  /**
   * 更新页面主题
   * @param {string} theme - 主题名称
   */
  updatePageTheme(theme) {
    try {
      // 获取当前页面
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]

      if (currentPage) {
        // 更新页面 data-theme 属性
        currentPage.setData({
          'theme': theme
        })
      }

      // 更新全局页面属性
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme)
      }

    } catch (error) {
      console.error('更新页面主题失败:', error)
    }
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.setThemePreference(nextTheme)
  }

  /**
   * 获取当前主题信息
   */
  getCurrentTheme() {
    return {
      current: this.currentTheme,
      preference: this.systemPreference,
      info: this.themes[this.currentTheme] || this.themes.light
    }
  }

  /**
   * 获取所有可用主题
   */
  getAvailableThemes() {
    return Object.keys(this.themes).map(key => ({
      key,
      ...this.themes[key],
      isCurrent: this.systemPreference === key
    }))
  }

  /**
   * 触发主题变化事件
   */
  emitThemeChange() {
    try {
      // 通过全局事件总线通知主题变化
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentTheme = this.currentTheme
        
        // 如果有事件总线，触发事件
        if (app.eventBus && app.eventBus.emit) {
          app.eventBus.emit('themeChanged', {
            theme: this.currentTheme,
            preference: this.systemPreference
          })
        }
      }
    } catch (error) {
      console.error('触发主题变化事件失败:', error)
    }
  }

  /**
   * 获取主题相关的颜色值
   * @param {string} colorName - 颜色名称
   */
  getThemeColor(colorName) {
    const colorMap = {
      light: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#333333',
        textSecondary: '#666666'
      },
      dark: {
        primary: '#66BB6A',
        secondary: '#42A5F5',
        background: '#1e1e1e',
        surface: '#2d2d2d',
        text: '#ffffff',
        textSecondary: '#b3b3b3'
      }
    }

    return colorMap[this.currentTheme]?.[colorName] || colorMap.light[colorName]
  }

  /**
   * 创建主题选择器数据
   */
  createThemePickerData() {
    return {
      currentTheme: this.getCurrentTheme(),
      availableThemes: this.getAvailableThemes(),
      isSystemSupported: this.isSystemThemeSupported()
    }
  }

  /**
   * 检查是否支持系统主题
   */
  isSystemThemeSupported() {
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      return !!(systemInfo.theme || wx.onThemeChange)
    } catch (error) {
      return false
    }
  }

  /**
   * 保存主题设置到云端（可选实现）
   */
  async syncThemeToCloud() {
    try {
      // 这里可以实现将主题设置同步到云端的逻辑
      console.log('同步主题设置到云端:', this.systemPreference)
    } catch (error) {
      console.error('同步主题设置失败:', error)
    }
  }

  /**
   * 从云端恢复主题设置（可选实现）
   */
  async restoreThemeFromCloud() {
    try {
      // 这里可以实现从云端恢复主题设置的逻辑
      console.log('从云端恢复主题设置')
    } catch (error) {
      console.error('恢复主题设置失败:', error)
    }
  }
}

// 创建全局主题管理器实例
const themeManager = new ThemeManager()

// 在 app.js 中使用的工具函数
function initThemeManager(app) {
  try {
    if (!app) {
      console.warn('initThemeManager: app参数未提供，跳过初始化')
      return
    }
    
    // 将主题管理器添加到 app 实例
    app.themeManager = themeManager
    
    // 确保 globalData 存在
    if (!app.globalData) {
      app.globalData = {}
    }
    
    // 在 globalData 中添加主题信息
    app.globalData.theme = themeManager.getCurrentTheme()
    
    console.log('主题管理器初始化完成')
  } catch (error) {
    console.error('主题管理器初始化失败:', error)
  }
}

// 页面级主题工具函数
function setupPageTheme(page) {
  const currentTheme = themeManager.getCurrentTheme()
  
  // 设置页面数据
  page.setData({
    theme: currentTheme.current,
    themeInfo: currentTheme.info
  })
  
  // 监听主题变化
  page.onThemeChange = function(newTheme) {
    this.setData({
      theme: newTheme.current,
      themeInfo: newTheme.info
    })
  }
}

module.exports = {
  ThemeManager,
  themeManager,
  initThemeManager,
  setupPageTheme
} 