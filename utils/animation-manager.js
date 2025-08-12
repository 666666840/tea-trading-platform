/**
 * 动画管理器
 * 提供页面切换动画、元素动画和交互动画效果
 */

class AnimationManager {
  constructor() {
    this.animations = new Map()
    this.animationQueue = []
    this.isReducedMotion = false
    this.defaultDuration = 300
    this.defaultEasing = 'ease-out'
    
    this.init()
  }

  /**
   * 初始化动画管理器
   */
  init() {
    try {
      // 检查用户是否偏好减少动画
      this.checkReducedMotionPreference()
      
      console.log('动画管理器初始化完成')
    } catch (error) {
      console.error('动画管理器初始化失败:', error)
    }
  }

  /**
   * 检查减少动画偏好
   */
  checkReducedMotionPreference() {
    try {
      // 检查本地存储的用户偏好
      const reduceMotion = wx.getStorageSync('reduce_motion_preference')
      if (reduceMotion !== undefined) {
        this.isReducedMotion = reduceMotion
        return
      }

      // 在小程序中，暂时默认启用动画
      this.isReducedMotion = false
    } catch (error) {
      console.error('检查动画偏好失败:', error)
      this.isReducedMotion = false
    }
  }

  /**
   * 设置动画偏好
   * @param {boolean} reduce - 是否减少动画
   */
  setReducedMotion(reduce) {
    try {
      this.isReducedMotion = reduce
      wx.setStorageSync('reduce_motion_preference', reduce)
      
      if (reduce) {
        // 如果用户偏好减少动画，清除所有进行中的动画
        this.clearAllAnimations()
      }
    } catch (error) {
      console.error('设置动画偏好失败:', error)
    }
  }

  /**
   * 创建动画对象
   * @param {object} options - 动画选项
   */
  createAnimation(options = {}) {
    const {
      duration = this.defaultDuration,
      timingFunction = this.defaultEasing,
      delay = 0,
      transformOrigin = '50% 50% 0',
      fillMode = 'forwards'
    } = options

    // 如果用户偏好减少动画，返回即时动画
    if (this.isReducedMotion) {
      return wx.createAnimation({
        duration: 0,
        timingFunction: 'linear'
      })
    }

    return wx.createAnimation({
      duration,
      timingFunction,
      delay,
      transformOrigin,
      fillMode
    })
  }

  /**
   * 淡入动画
   * @param {string} selector - 元素选择器
   * @param {object} options - 动画选项
   */
  fadeIn(selector, options = {}) {
    const animation = this.createAnimation(options)
    animation.opacity(1).step()
    
    return this.applyAnimation(selector, animation, 'fadeIn')
  }

  /**
   * 淡出动画
   * @param {string} selector - 元素选择器
   * @param {object} options - 动画选项
   */
  fadeOut(selector, options = {}) {
    const animation = this.createAnimation(options)
    animation.opacity(0).step()
    
    return this.applyAnimation(selector, animation, 'fadeOut')
  }

  /**
   * 滑入动画
   * @param {string} selector - 元素选择器
   * @param {string} direction - 方向: 'up', 'down', 'left', 'right'
   * @param {object} options - 动画选项
   */
  slideIn(selector, direction = 'up', options = {}) {
    const animation = this.createAnimation(options)
    
    switch (direction) {
      case 'up':
        animation.translateY(0).opacity(1).step()
        break
      case 'down':
        animation.translateY(0).opacity(1).step()
        break
      case 'left':
        animation.translateX(0).opacity(1).step()
        break
      case 'right':
        animation.translateX(0).opacity(1).step()
        break
    }
    
    return this.applyAnimation(selector, animation, `slideIn${direction}`)
  }

  /**
   * 滑出动画
   * @param {string} selector - 元素选择器
   * @param {string} direction - 方向: 'up', 'down', 'left', 'right'
   * @param {object} options - 动画选项
   */
  slideOut(selector, direction = 'up', options = {}) {
    const animation = this.createAnimation(options)
    const distance = options.distance || 100
    
    switch (direction) {
      case 'up':
        animation.translateY(-distance).opacity(0).step()
        break
      case 'down':
        animation.translateY(distance).opacity(0).step()
        break
      case 'left':
        animation.translateX(-distance).opacity(0).step()
        break
      case 'right':
        animation.translateX(distance).opacity(0).step()
        break
    }
    
    return this.applyAnimation(selector, animation, `slideOut${direction}`)
  }

  /**
   * 缩放动画
   * @param {string} selector - 元素选择器
   * @param {number} scale - 缩放比例
   * @param {object} options - 动画选项
   */
  scale(selector, scale = 1, options = {}) {
    const animation = this.createAnimation(options)
    animation.scale(scale).step()
    
    return this.applyAnimation(selector, animation, 'scale')
  }

  /**
   * 弹跳动画
   * @param {string} selector - 元素选择器
   * @param {object} options - 动画选项
   */
  bounce(selector, options = {}) {
    const duration = options.duration || 600
    const animation1 = this.createAnimation({ ...options, duration: duration / 3 })
    const animation2 = this.createAnimation({ ...options, duration: duration / 3 })
    const animation3 = this.createAnimation({ ...options, duration: duration / 3 })
    
    // 第一阶段：放大
    animation1.scale(1.1).step()
    // 第二阶段：缩小
    animation2.scale(0.95).step()
    // 第三阶段：恢复
    animation3.scale(1).step()
    
    // 连续执行动画
    return this.sequenceAnimation(selector, [animation1, animation2, animation3], 'bounce')
  }

  /**
   * 摇摆动画
   * @param {string} selector - 元素选择器
   * @param {object} options - 动画选项
   */
  shake(selector, options = {}) {
    const duration = options.duration || 500
    const stepDuration = duration / 6
    
    const animations = []
    const rotations = [5, -5, 3, -3, 1, 0]
    
    rotations.forEach(rotation => {
      const animation = this.createAnimation({ ...options, duration: stepDuration })
      animation.rotate(rotation).step()
      animations.push(animation)
    })
    
    return this.sequenceAnimation(selector, animations, 'shake')
  }

  /**
   * 脉冲动画
   * @param {string} selector - 元素选择器
   * @param {object} options - 动画选项
   */
  pulse(selector, options = {}) {
    const duration = options.duration || 1000
    const animation1 = this.createAnimation({ ...options, duration: duration / 2 })
    const animation2 = this.createAnimation({ ...options, duration: duration / 2 })
    
    animation1.opacity(0.5).step()
    animation2.opacity(1).step()
    
    return this.sequenceAnimation(selector, [animation1, animation2], 'pulse')
  }

  /**
   * 旋转动画
   * @param {string} selector - 元素选择器
   * @param {number} degrees - 旋转角度
   * @param {object} options - 动画选项
   */
  rotate(selector, degrees = 360, options = {}) {
    const animation = this.createAnimation(options)
    animation.rotate(degrees).step()
    
    return this.applyAnimation(selector, animation, 'rotate')
  }

  /**
   * 页面切换动画 - 滑动
   * @param {object} page - 页面对象
   * @param {string} direction - 方向: 'left', 'right', 'up', 'down'
   * @param {object} options - 动画选项
   */
  pageSlideTransition(page, direction = 'left', options = {}) {
    const { duration = 300 } = options
    
    if (this.isReducedMotion) {
      return Promise.resolve()
    }
    
    return new Promise((resolve) => {
      const animation = this.createAnimation({ duration })
      
      // 设置初始位置
      let initialTransform = ''
      switch (direction) {
        case 'left':
          initialTransform = 'translateX(-100%)'
          break
        case 'right':
          initialTransform = 'translateX(100%)'
          break
        case 'up':
          initialTransform = 'translateY(-100%)'
          break
        case 'down':
          initialTransform = 'translateY(100%)'
          break
      }
      
      // 执行动画
      animation.translateX(0).translateY(0).step()
      
      page.setData({
        pageAnimation: animation.export()
      })
      
      setTimeout(resolve, duration)
    })
  }

  /**
   * 页面切换动画 - 淡入淡出
   * @param {object} page - 页面对象
   * @param {object} options - 动画选项
   */
  pageFadeTransition(page, options = {}) {
    const { duration = 300 } = options
    
    if (this.isReducedMotion) {
      return Promise.resolve()
    }
    
    return new Promise((resolve) => {
      const fadeOut = this.createAnimation({ duration: duration / 2 })
      const fadeIn = this.createAnimation({ duration: duration / 2 })
      
      fadeOut.opacity(0).step()
      fadeIn.opacity(1).step()
      
      page.setData({
        pageAnimation: fadeOut.export()
      })
      
      setTimeout(() => {
        page.setData({
          pageAnimation: fadeIn.export()
        })
        setTimeout(resolve, duration / 2)
      }, duration / 2)
    })
  }

  /**
   * 列表项动画
   * @param {Array} items - 列表项数组
   * @param {string} animationType - 动画类型
   * @param {object} options - 动画选项
   */
  animateListItems(items, animationType = 'slideIn', options = {}) {
    const { delay = 50, stagger = true } = options
    
    if (this.isReducedMotion) {
      return Promise.resolve()
    }
    
    const promises = items.map((item, index) => {
      const itemDelay = stagger ? index * delay : 0
      const itemOptions = { ...options, delay: itemDelay }
      
      switch (animationType) {
        case 'slideIn':
          return this.slideIn(`.list-item-${index}`, 'up', itemOptions)
        case 'fadeIn':
          return this.fadeIn(`.list-item-${index}`, itemOptions)
        case 'scale':
          return this.scale(`.list-item-${index}`, 1, itemOptions)
        default:
          return this.fadeIn(`.list-item-${index}`, itemOptions)
      }
    })
    
    return Promise.all(promises)
  }

  /**
   * 应用动画
   * @param {string} selector - 元素选择器
   * @param {object} animation - 动画对象
   * @param {string} name - 动画名称
   */
  applyAnimation(selector, animation, name) {
    return new Promise((resolve) => {
      const animationId = `${name}_${Date.now()}`
      this.animations.set(animationId, { selector, animation, name })
      
      // 获取当前页面
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      
      if (currentPage) {
        const animationData = {}
        animationData[selector.replace('.', '')] = animation.export()
        
        currentPage.setData(animationData)
        
        // 动画完成后清理
        setTimeout(() => {
          this.animations.delete(animationId)
          resolve(animationId)
        }, this.defaultDuration)
      } else {
        resolve(animationId)
      }
    })
  }

  /**
   * 顺序执行动画
   * @param {string} selector - 元素选择器
   * @param {Array} animations - 动画数组
   * @param {string} name - 动画名称
   */
  sequenceAnimation(selector, animations, name) {
    return new Promise(async (resolve) => {
      const animationId = `${name}_${Date.now()}`
      
      for (let i = 0; i < animations.length; i++) {
        await this.applyAnimation(selector, animations[i], `${name}_${i}`)
      }
      
      resolve(animationId)
    })
  }

  /**
   * 并行执行动画
   * @param {Array} animationTasks - 动画任务数组
   */
  parallelAnimation(animationTasks) {
    const promises = animationTasks.map(task => {
      const { selector, animation, name } = task
      return this.applyAnimation(selector, animation, name)
    })
    
    return Promise.all(promises)
  }

  /**
   * 清除所有动画
   */
  clearAllAnimations() {
    this.animations.clear()
    this.animationQueue = []
  }

  /**
   * 获取预设动画配置
   * @param {string} preset - 预设名称
   */
  getPresetAnimation(preset) {
    const presets = {
      button: {
        duration: 150,
        timingFunction: 'ease-out'
      },
      modal: {
        duration: 300,
        timingFunction: 'ease-out'
      },
      slide: {
        duration: 250,
        timingFunction: 'ease-in-out'
      },
      fade: {
        duration: 200,
        timingFunction: 'ease-in-out'
      },
      bounce: {
        duration: 600,
        timingFunction: 'ease-out'
      },
      spring: {
        duration: 400,
        timingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
    
    return presets[preset] || presets.fade
  }

  /**
   * 创建交互动画（按钮点击等）
   * @param {string} selector - 元素选择器
   * @param {string} type - 交互类型
   */
  createInteractiveAnimation(selector, type = 'tap') {
    const animations = {
      tap: () => {
        const scale1 = this.createAnimation({ duration: 100 })
        const scale2 = this.createAnimation({ duration: 100 })
        
        scale1.scale(0.95).step()
        scale2.scale(1).step()
        
        return this.sequenceAnimation(selector, [scale1, scale2], 'tap')
      },
      
      hover: () => {
        const animation = this.createAnimation({ duration: 200 })
        animation.scale(1.05).step()
        return this.applyAnimation(selector, animation, 'hover')
      },
      
      focus: () => {
        const animation = this.createAnimation({ duration: 300 })
        animation.scale(1.02).step()
        return this.applyAnimation(selector, animation, 'focus')
      }
    }
    
    return animations[type] ? animations[type]() : Promise.resolve()
  }

  /**
   * 监听动画事件
   * @param {string} eventType - 事件类型
   * @param {function} callback - 回调函数
   */
  onAnimationEvent(eventType, callback) {
    // 这里可以实现动画事件监听
    // 由于小程序限制，主要通过 Promise 和超时来处理
    console.log(`监听动画事件: ${eventType}`)
  }

  /**
   * 创建骨架屏动画
   * @param {string} selector - 元素选择器
   */
  createSkeletonAnimation(selector) {
    if (this.isReducedMotion) {
      return Promise.resolve()
    }
    
    const shimmer = () => {
      const animation1 = this.createAnimation({ duration: 1000 })
      const animation2 = this.createAnimation({ duration: 1000 })
      
      animation1.opacity(0.4).step()
      animation2.opacity(1).step()
      
      this.sequenceAnimation(selector, [animation1, animation2], 'shimmer')
        .then(() => shimmer()) // 循环动画
    }
    
    shimmer()
  }
}

// 创建全局动画管理器实例
const animationManager = new AnimationManager()

// 在 app.js 中使用的工具函数
function initAnimationManager(app) {
  // 将动画管理器添加到 app 实例
  app.animationManager = animationManager
  
  console.log('动画管理器初始化完成')
}

// 页面级动画工具函数
function setupPageAnimations(page) {
  // 添加页面动画方法
  page.fadeIn = (selector, options) => animationManager.fadeIn(selector, options)
  page.fadeOut = (selector, options) => animationManager.fadeOut(selector, options)
  page.slideIn = (selector, direction, options) => animationManager.slideIn(selector, direction, options)
  page.slideOut = (selector, direction, options) => animationManager.slideOut(selector, direction, options)
  page.scale = (selector, scale, options) => animationManager.scale(selector, scale, options)
  page.bounce = (selector, options) => animationManager.bounce(selector, options)
  page.shake = (selector, options) => animationManager.shake(selector, options)
  page.pulse = (selector, options) => animationManager.pulse(selector, options)
  page.rotate = (selector, degrees, options) => animationManager.rotate(selector, degrees, options)
  
  // 页面进入动画
  page.onPageEnter = function() {
    if (typeof this.enterAnimation === 'function') {
      this.enterAnimation()
    }
  }
  
  // 页面退出动画
  page.onPageLeave = function() {
    if (typeof this.leaveAnimation === 'function') {
      this.leaveAnimation()
    }
  }
}

// 常用动画快捷方法
const animationUtils = {
  // 按钮点击动画
  buttonTap: (selector) => animationManager.createInteractiveAnimation(selector, 'tap'),
  
  // 卡片悬停动画
  cardHover: (selector) => animationManager.createInteractiveAnimation(selector, 'hover'),
  
  // 列表项进入动画
  listItemEnter: (selector, index = 0) => {
    return animationManager.slideIn(selector, 'up', { delay: index * 50 })
  },
  
  // 模态框动画
  modalShow: (selector) => {
    return animationManager.scale(selector, 1, { 
      duration: 300, 
      timingFunction: 'ease-out' 
    })
  },
  
  modalHide: (selector) => {
    return animationManager.scale(selector, 0, { 
      duration: 200, 
      timingFunction: 'ease-in' 
    })
  },
  
  // 页面切换动画
  pageTransition: (page, direction = 'left') => {
    return animationManager.pageSlideTransition(page, direction)
  }
}

module.exports = {
  AnimationManager,
  animationManager,
  initAnimationManager,
  setupPageAnimations,
  animationUtils
} 