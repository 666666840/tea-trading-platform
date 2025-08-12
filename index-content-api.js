// pages/index/index.js - 首页内容API集成

Page({
  data: {
    // 内容数据
    recommendList: [],
    newsList: [],
    artList: [],
    hotList: [],
    
    // 当前选中的tab
    currentTab: 'recommend',
    
    // 加载状态
    loading: false,
    
    // API配置
    apiBase: 'http://82.157.231.110:3000'
  },

  onLoad: function (options) {
    // 页面加载时获取推荐内容
    this.loadContent('recommend');
  },

  onShow: function () {
    // 页面显示时刷新内容
    if (this.data.currentTab) {
      this.loadContent(this.data.currentTab);
    }
  },

  // 切换tab
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    this.loadContent(tab);
  },

  // 加载指定类型的内容
  loadContent: function(type) {
    const that = this;
    
    // 显示加载状态
    that.setData({ loading: true });
    
    // 使用本地数据而不是API调用
    setTimeout(() => {
      const localData = {
        'recommend': [],
        'news': [],
        'art': [],
        'hot': []
      };
      
      const updateData = {};
      updateData[`${type}List`] = localData[type] || [];
      updateData.loading = false;
      
      that.setData(updateData);
    }, 500);
  },

  // 加载所有内容
  loadAllContent: function() {
    const that = this;
    
    wx.request({
      url: `${that.data.apiBase}/api/content/all`,
      method: 'GET',
      success: function(res) {
        console.log('所有内容:', res.data);
        
        if (res.data.status === 'success') {
          // 按类型分组数据
          const grouped = that.groupContentByType(res.data.data);
          that.setData({
            recommendList: grouped.recommend || [],
            newsList: grouped.news || [],
            artList: grouped.art || [],
            hotList: grouped.hot || []
          });
        }
      },
      fail: function(err) {
        console.error('加载所有内容失败:', err);
      }
    });
  },

  // 按类型分组内容
  groupContentByType: function(contentList) {
    const grouped = {};
    contentList.forEach(item => {
      const type = item.type || 'recommend';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(item);
    });
    return grouped;
  },

  // 查看内容详情
  viewDetail: function(e) {
    const item = e.currentTarget.dataset.item;
    console.log('查看详情:', item);
    
    // 跳转到详情页
    wx.navigateTo({
      url: `/pages/content-detail/content-detail?id=${item.id}&type=${this.data.currentTab}`
    });
  },

  // 刷新当前内容
  onRefresh: function() {
    this.loadContent(this.data.currentTab);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadContent(this.data.currentTab);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 显示错误信息
  showError: function(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 3000
    });
  },

  // 测试API连接
  testAPI: function() {
    const that = this;
    
    wx.request({
      url: `${that.data.apiBase}/health`,
      method: 'GET',
      success: function(res) {
        console.log('API健康检查:', res.data);
        wx.showToast({
          title: 'API连接正常',
          icon: 'success'
        });
      },
      fail: function(err) {
        console.error('API连接失败:', err);
        wx.showToast({
          title: 'API连接失败',
          icon: 'error'
        });
      }
    });
  }
}); 