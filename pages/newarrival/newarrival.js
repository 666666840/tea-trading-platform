const app = getApp()
const { API } = require('../../utils/api-manager.js')

Page({
  data: {
    arrivalList: [],
    connectionStatus: 'checking', // 连接状态
    
    // 筛选选项 - 补齐完整的茶叶类型
    filterOptions: [
      { value: 'all', label: '全部' },
      { value: '绿茶', label: '绿茶' },
      { value: '乌龙茶', label: '乌龙茶' },
      { value: '红茶', label: '红茶' },
      { value: '白茶', label: '白茶' },
      { value: '黑茶', label: '黑茶' },
      { value: '黄茶', label: '黄茶' },
      { value: '普洱茶', label: '普洱茶' }
    ],
    currentFilter: 'all',
    
    // 排序选项
    sortOptions: [
      { value: 'time', label: '最新发布' },
      { value: 'price_low', label: '价格从低到高' },
      { value: 'price_high', label: '价格从高到低' }
    ],
    currentSort: 'time',
    
    // 加载状态
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 20
  },

  onLoad() {
    console.log('🆕 [新品] 页面加载');
    this.loadArrivalData();
  },

  // 加载新品到货数据
  async loadArrivalData() {
    try {
      this.setData({ loading: true });
      
      // 尝试从API加载数据
      const apiData = await this.loadFromAPI();
      if (apiData) {
        this.setData({
          arrivalList: apiData,
          loading: false,
          connectionStatus: 'online'
        });
        console.log('✅ [新品] API数据加载成功:', apiData.length, '个商品');
        return;
      }
    } catch (error) {
      console.warn('⚠️ [新品] API加载失败，使用本地数据:', error.message);
    }
    
    // 使用本地降级数据
    this.loadLocalData();
  },

  // 从API加载数据
  async loadFromAPI() {
    try {
      const response = await API.getNewarrivals();
      if (response.status === 'success' && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // 加载本地降级数据
  loadLocalData() {
    this.setData({ loading: true });
    
    // 使用本地数据
    const arrivalList = this.getLocalArrivalData();
    
    this.setData({
      arrivalList: arrivalList,
      loading: false,
      connectionStatus: 'offline'
    });
    
    console.log('✅ [新品] 本地数据加载完成:', arrivalList.length, '个商品');
  },

  // 本地降级数据
  getLocalArrivalData() {
    return [] // 清空示例数据，等待真实数据
  },

  // 跳转到发布新品页面
  navigateToPublish() {
    wx.navigateTo({
      url: '/pages/publish-newarrival/publish-newarrival'
    });
  },

  // 切换筛选
  onFilterChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ currentFilter: value });
    this.filterAndSortList();
    wx.showToast({
      title: `已筛选${this.data.filterOptions.find(item => item.value === value).label}`,
      icon: 'none'
    });
  },

  // 切换排序
  onSortChange(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ currentSort: value });
    this.filterAndSortList();
    wx.showToast({
      title: `已按${this.data.sortOptions.find(item => item.value === value).label}排序`,
      icon: 'none'
    });
  },

  // 筛选和排序列表
  filterAndSortList() {
    let filteredList = [...this.data.arrivalList];
    
    // 筛选
    if (this.data.currentFilter !== 'all') {
      filteredList = filteredList.filter(item => {
        return item.category === this.data.currentFilter;
      });
    }
    
    // 排序
    switch (this.data.currentSort) {
      case 'time':
        // 按创建时间倒序
        filteredList.sort((a, b) => new Date(b.create_time) - new Date(a.create_time));
        break;
        
      case 'price_low':
        // 价格从低到高
        filteredList.sort((a, b) => a.price - b.price);
        break;
        
      case 'price_high':
        // 价格从高到低
        filteredList.sort((a, b) => b.price - a.price);
        break;
    }
    
    this.setData({ arrivalList: filteredList });
  },

  // 点击商品
  onItemTap(e) {
    const { id } = e.currentTarget.dataset;
    console.log('📖 [新品] 查看详情:', id);
    wx.navigateTo({
      url: `/pages/newarrival-detail/newarrival-detail?id=${id}`
    });
  },

  // 联系商户
  contactMerchant(e) {
    const { merchant } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '联系商户',
      content: `商户：${merchant}`,
      confirmText: '复制商户信息',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: merchant,
            success: () => {
              wx.showToast({
                title: '商户信息已复制',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshList();
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore();
    }
  },

  // 刷新列表
  async refreshList() {
    this.setData({ loading: true });
    
    try {
      if (this.data.connectionStatus === 'online') {
        await this.loadArrivalData();
      } else {
        this.filterAndSortList();
      }
    } catch (error) {
      console.error('❌ [新品] 刷新失败:', error);
    } finally {
      this.setData({ loading: false });
      wx.stopPullDownRefresh();
    }
  },

  // 加载更多
  async loadMore() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    try {
      if (this.data.connectionStatus === 'online') {
        // 从API加载更多数据
        const response = await API.getNewarrivals();
        if (response.status === 'success' && response.data) {
          const newItems = response.data.slice(
            this.data.arrivalList.length,
            this.data.arrivalList.length + this.data.pageSize
          );
          
          if (newItems.length > 0) {
            this.setData({
              arrivalList: [...this.data.arrivalList, ...newItems],
              hasMore: newItems.length === this.data.pageSize
            });
          } else {
            this.setData({ hasMore: false });
          }
        }
      } else {
        // 本地数据已全部加载
        this.setData({ hasMore: false });
      }
    } catch (error) {
      console.error('❌ [新品] 加载更多失败:', error);
      this.setData({ hasMore: false });
    } finally {
      this.setData({ loading: false });
    }
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
    await this.loadArrivalData();
    
    if (this.data.connectionStatus === 'online') {
      wx.showToast({
        title: '连接成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '连接失败，继续使用离线模式',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: '最新茶叶到货信息',
      path: '/pages/newarrival/newarrival'
    };
  }
}); 