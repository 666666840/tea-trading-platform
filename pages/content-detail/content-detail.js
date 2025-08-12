// pages/content-detail/content-detail.js
const { API } = require('../../utils/api-manager.js');

Page({
  data: {
    content: null,
    loading: true,
    error: false
  },

  onLoad(options) {
    console.log('📱 页面加载，参数:', options);
    
    const { id, type, title } = options;
    
    if (!id || !type) {
      this.setData({
        loading: false,
        error: true
      });
      return;
    }

    // 设置页面标题
    if (title) {
      wx.setNavigationBarTitle({
        title: title.length > 10 ? title.substring(0, 10) + '...' : title
      });
    }

    this.loadContent(id, type);
  },

  // 加载内容
  async loadContent(id, type) {
    try {
      console.log('🔄 开始加载内容，ID:', id, '类型:', type);
      
      // 从API获取内容
      const response = await API.getContent(type);
      
      if (response && response.status === 'success') {
        // 查找指定ID的内容
        const content = response.data.find(item => item.id == id);
        
        if (content) {
          console.log('✅ 内容加载成功，长度:', content.content.length);
          this.setData({
            content: content,
            loading: false
          });
        } else {
          // 尝试从本地获取
          const localContent = this.getLocalContent(id, type);
          if (localContent) {
            console.log('✅ 使用本地数据');
            this.setData({
              content: localContent,
              loading: false
            });
          } else {
            throw new Error('内容不存在');
          }
        }
      } else {
        // API失败，使用本地数据
        const localContent = this.getLocalContent(id, type);
        if (localContent) {
          console.log('✅ 使用本地数据');
          this.setData({
            content: localContent,
            loading: false
          });
        } else {
          throw new Error('内容不存在');
        }
      }
    } catch (error) {
      console.error('❌ 加载失败:', error);
      this.setData({
        loading: false,
        error: true
      });
    }
  },

  // 获取本地内容
  getLocalContent(id, type) {
    try {
      const localContent = wx.getStorageSync('localContent') || [];
      return localContent.find(item => item.id == id && item.type === type);
    } catch (error) {
      console.error('❌ 获取本地内容失败:', error);
      return null;
    }
  },

  // 返回
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
}); 