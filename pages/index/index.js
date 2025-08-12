const app = getApp()
const { API } = require('../../utils/api-manager.js')
const { PerformanceMonitor } = require('../../utils/performance-monitor.js')
const performanceMonitor = new PerformanceMonitor()

Page({
  data: {
    activeTab: 'recommend',
    functionList: [
      { id: 1, name: '全国市场', icon: '🏪', url: '/pages/market/market' },
      { id: 2, name: '采购询价', icon: '💰', url: '/pages/inquiry/inquiry' },
      { id: 3, name: '品类行情', icon: '📊', url: '/pages/category/category' },
      { id: 4, name: '知名品牌', icon: '🏷️', url: '/pages/brand/brand' },
      { id: 5, name: '尾货清仓', icon: '🎯', url: '/pages/clearance/clearance' },
      { id: 6, name: '新品到货', icon: '🆕', url: '/pages/newarrival/newarrival' },
      { id: 7, name: '茶园直通', icon: '🌱', url: '/pages/garden/garden' },
      { id: 8, name: '出租转让', icon: '🏠', url: '/pages/rental/rental' },
      { id: 9, name: '供求平台', icon: '🤝', url: '/pages/supply/supply' },
      { id: 10, name: '智慧茶业', icon: '🧠', url: '/pages/smart/smart' }
    ],
    // 内容推送相关数据
    recommendList: [],
    newsList: [],
    artList: [],
    hotList: [],
    loading: false,
    dataSource: '', // 数据来源标识
    connectionStatus: 'checking', // 连接状态：checking, online, offline
  },

  onLoad: function() {
    // 首屏加载性能监控
    performanceMonitor.recordRequest && performanceMonitor.recordRequest()
    performanceMonitor.startMonitoring && performanceMonitor.startMonitoring(5000)
    console.log('🏠 [首页] 页面加载，快速显示推荐内容')
    
    // 立即预加载所有分栏数据，避免切换时的延迟
    this.preloadAllContent();
    this.loadContent('recommend');
    
    // 自动检测API健康状态
    this.checkAPIConnection();
  },

  onShow: function() {
    // 页面显示时不重新加载，保持已有数据
    console.log('🏠 [首页] 页面显示')
  },

  // 检查API连接状态
  async checkAPIConnection() {
    try {
      const health = await API.health();
      if (health.status === 'ok') {
        this.setData({ connectionStatus: 'online' });
        console.log('✅ [首页] API连接正常');
        // 连接正常时，尝试从服务器加载最新数据
        this.loadServerContent('recommend');
      } else {
        this.setData({ connectionStatus: 'offline' });
        console.log('⚠️ [首页] API连接异常');
      }
    } catch (error) {
      this.setData({ connectionStatus: 'offline' });
      console.log('❌ [首页] API连接失败，使用离线模式');
    }
  },

  // 预加载所有分栏内容
  preloadAllContent() {
    const types = ['recommend', 'news', 'art', 'hot'];
    types.forEach(type => {
      const updateData = {};
      updateData[`${type}List`] = [];
      this.setData(updateData);
      console.log(`[上下文] ${type}分栏本地内容条数:`, 0);
    });
    console.log('✅ [首页] 所有分栏内容预加载完成');
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;
    
    console.log(`🔄 [首页] 切换到${tab}分栏`);
    this.setData({ 
      activeTab: tab,
      loading: true 
    });
    
    // 根据连接状态选择数据源
    if (this.data.connectionStatus === 'online') {
      this.loadServerContent(tab);
    } else {
      this.loadContent(tab);
    }
  },

  // 从服务器加载内容
  async loadServerContent(type) {
    try {
      console.log(`📡 [首页] 从服务器加载${type}内容...`);
      
      // 直接设置空数组，不调用API
      const updateData = {};
      updateData[`${type}List`] = [];
      updateData.loading = false;
      updateData.dataSource = '服务器';
      this.setData(updateData);
      
      console.log(`✅ [首页] ${type}内容加载完成:`, 0, '条(服务器)');
    } catch (error) {
      console.warn(`⚠️ [首页] 服务器加载失败，使用本地数据:`, error.message);
      this.loadContent(type);
    }
  },

  // 快速内容加载（优先使用本地数据，异常兜底）
  loadContent(type) {
    console.log(`📡 [首页] 快速加载${type}内容...`);
    const updateData = {};
    updateData[`${type}List`] = [];
    updateData.loading = false;
    updateData.dataSource = '离线模式';
    this.setData(updateData);
    
    console.log(`[上下文] ${type}内容加载来源: 离线模式, 条数:`, 0);
    console.log(`✅ [首页] ${type}内容加载完成:`, 0, '条(离线)');
  },

  // 获取分栏中文名称
  getTabName(type) {
    const nameMap = {
      'recommend': '推荐内容',
      'news': '茶叶资讯', 
      'art': '茶艺文化',
      'hot': '热点话题'
    }
    return nameMap[type] || type
  },

  // 🏠 本地降级数据
  getLocalContentData(type) {
    const localData = {
      'recommend': [],
      'news': [],
      'art': [],
      'hot': []
    }
    
    return localData[type] || []
  },

  navigateToFunction(e) {
    const url = e.currentTarget.dataset.url;
    const name = e.currentTarget.dataset.name;
    
    console.log(`🔗 [首页] 导航到功能: ${name}`);
    
    if (!url) {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
      return;
    }
    
    // 特殊处理出租转让功能
    if (name === '出租转让') {
      this.navigateToRental();
      return;
    }
    
    // 检查用户登录状态（针对需要登录的功能）
    const needLoginFunctions = ['出租转让', '发布茶园', '发布新品', '发布价格'];
    if (needLoginFunctions.includes(name)) {
      const userInfo = wx.getStorageSync('userInfo');
      if (!userInfo) {
        wx.showModal({
          title: '需要登录',
          content: `使用${name}功能需要先登录，是否前往登录？`,
          confirmText: '去登录',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login'
              });
            }
          }
        });
        return;
      }
    }
    
    // 正常跳转
    wx.navigateTo({ 
      url,
      success: () => {
        console.log(`✅ [首页] 成功跳转到: ${name}`);
      },
      fail: (err) => {
        console.error('❌ [首页] 页面跳转失败:', err);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  // 跳转到出租转让页面
  navigateToRental() {
    console.log('🏠 [首页] 跳转到出租转让页面');
    
    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showModal({
        title: '需要登录',
        content: '使用出租转让功能需要先登录，是否前往登录？',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
      return;
    }
    
    // 跳转到出租转让页面
    wx.navigateTo({
      url: '/pages/rental/rental',
      success: () => {
        console.log('✅ [首页] 成功跳转到出租转让页面');
      },
      fail: (error) => {
        console.error('❌ [首页] 跳转出租转让页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  viewDetail: function(e) {
    const item = e.currentTarget.dataset.item;
    console.log(`📖 [首页] 查看详情:`, item.title);
    console.log(`[上下文] 用户查看详情:`, { id: item.id, type: this.data.activeTab });
    wx.navigateTo({
      url: `/pages/content-detail/content-detail?id=${item.id}&type=${this.data.activeTab}&title=${item.title}`
    });
  },

  // 🔄 刷新当前分栏内容
  onRefresh: function() {
    console.log(`🔄 [首页] 手动刷新${this.data.activeTab}内容`);
    this.setData({ loading: true });
    
    if (this.data.connectionStatus === 'online') {
      this.loadServerContent(this.data.activeTab);
    } else {
      this.loadContent(this.data.activeTab);
    }
  },

  onPullDownRefresh: function() {
    console.log(`⬇️ [首页] 下拉刷新${this.data.activeTab}内容`);
    this.onRefresh();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1500);
  },

  showError: function(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },

  // 显示连接状态
  showConnectionStatus() {
    const status = this.data.connectionStatus;
    const messages = {
      'checking': '正在检查连接...',
      'online': '已连接到服务器',
      'offline': '当前为离线模式'
    };
    
    wx.showToast({
      title: messages[status] || '连接状态未知',
      icon: 'none',
      duration: 2000
    });
  },

  // 重新连接
  async reconnect() {
    this.setData({ connectionStatus: 'checking' });
    await this.checkAPIConnection();
    
    if (this.data.connectionStatus === 'online') {
      wx.showToast({
        title: '连接成功',
        icon: 'success'
      });
      // 重新加载当前内容
      this.loadServerContent(this.data.activeTab);
    } else {
      wx.showToast({
        title: '连接失败，继续使用离线模式',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: '茶叶一点通 - 专业的茶叶信息平台',
      path: '/pages/index/index'
    }
  },

  // 跳转到内容管理页面
  goToContentManagement() {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    
    // 检查权限
    if (app.isContentManager && app.isContentManager(userInfo) || 
        app.isSuperAdmin && app.isSuperAdmin(userInfo)) {
      wx.navigateTo({
        url: '/pages/content-management/content-management',
        success: function() {
          console.log('✅ 成功跳转到内容管理页面');
        },
        fail: function(err) {
          console.error('❌ 跳转失败:', err);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showModal({
        title: '权限不足',
        content: '您需要内容管理员权限才能访问此功能',
        showCancel: false,
        confirmText: '知道了'
      });
    }
  }
})