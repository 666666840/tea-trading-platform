Page({
  data: {
    // 页面状态
    loading: false,
    hasMore: true,
    
    // 当前选中的分类
    activeCategory: 'all',
    
    // 分类名称映射
    categoryNames: {
      'all': '全部茶类',
      'green': '绿茶',
      'white': '白茶', 
      'yellow': '黄茶',
      'oolong': '青茶（乌龙茶）',
      'black': '红茶',
      'dark': '黑茶',
      'flower': '花茶'
    },
    

    
    // 价格列表数据 - 直接设置初始数据
    priceList: [
      {
        id: 1,
        name: '西湖龙井',
        minPrice: 800,
        maxPrice: 1200,
        avgPrice: 1000,
        unit: '斤',
        changeType: 'up',
        changePercent: 5.2,
        origin: '浙江杭州',
        updateTime: '2小时前',
        sourceCount: 15,
        isHot: true,
        isNew: false,
        isRecommended: true
      },
      {
        id: 2,
        name: '碧螺春',
        minPrice: 600,
        maxPrice: 900,
        avgPrice: 750,
        unit: '斤',
        changeType: 'down',
        changePercent: 2.1,
        origin: '江苏苏州',
        updateTime: '1小时前',
        sourceCount: 12,
        isHot: false,
        isNew: true,
        isRecommended: false
      },
      {
        id: 3,
        name: '正山小种',
        minPrice: 300,
        maxPrice: 600,
        avgPrice: 450,
        unit: '斤',
        changeType: 'up',
        changePercent: 3.8,
        origin: '福建武夷山',
        updateTime: '30分钟前',
        sourceCount: 20,
        isHot: true,
        isNew: false,
        isRecommended: true
      }
    ],
    
    // 分页参数
    page: 1,
    pageSize: 10
  },

  onLoad() {
    console.log('品类行情页面加载完成')
    console.log('初始数据:', this.data.priceList)
  },

  onShow() {
    console.log('品类行情页面显示')
    console.log('当前价格列表长度:', this.data.priceList.length)
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    console.log('切换分类到:', category)
    
    // 根据分类设置不同的数据
    let newData = []
    
    if (category === 'green') {
      newData = [
        {
          id: 1,
          name: '西湖龙井',
          minPrice: 800,
          maxPrice: 1200,
          avgPrice: 1000,
          unit: '斤',
          changeType: 'up',
          changePercent: 5.2,
          origin: '浙江杭州',
          updateTime: '2小时前',
          sourceCount: 15,
          isHot: true,
          isNew: false,
          isRecommended: true
        },
        {
          id: 2,
          name: '碧螺春',
          minPrice: 600,
          maxPrice: 900,
          avgPrice: 750,
          unit: '斤',
          changeType: 'down',
          changePercent: 2.1,
          origin: '江苏苏州',
          updateTime: '1小时前',
          sourceCount: 12,
          isHot: false,
          isNew: true,
          isRecommended: false
        }
      ]
    } else if (category === 'black') {
      newData = [
        {
          id: 4,
          name: '正山小种',
          minPrice: 300,
          maxPrice: 600,
          avgPrice: 450,
          unit: '斤',
          changeType: 'up',
          changePercent: 3.8,
          origin: '福建武夷山',
          updateTime: '30分钟前',
          sourceCount: 20,
          isHot: true,
          isNew: false,
          isRecommended: true
        },
        {
          id: 5,
          name: '祁门红茶',
          minPrice: 400,
          maxPrice: 700,
          avgPrice: 550,
          unit: '斤',
          changeType: 'up',
          changePercent: 1.5,
          origin: '安徽祁门',
          updateTime: '1小时前',
          sourceCount: 18,
          isHot: false,
          isNew: false,
          isRecommended: true
        }
      ]
    } else if (category === 'all') {
      newData = [
        {
          id: 1,
          name: '西湖龙井',
          minPrice: 800,
          maxPrice: 1200,
          avgPrice: 1000,
          unit: '斤',
          changeType: 'up',
          changePercent: 5.2,
          origin: '浙江杭州',
          updateTime: '2小时前',
          sourceCount: 15,
          isHot: true,
          isNew: false,
          isRecommended: true
        },
        {
          id: 2,
          name: '碧螺春',
          minPrice: 600,
          maxPrice: 900,
          avgPrice: 750,
          unit: '斤',
          changeType: 'down',
          changePercent: 2.1,
          origin: '江苏苏州',
          updateTime: '1小时前',
          sourceCount: 12,
          isHot: false,
          isNew: true,
          isRecommended: false
        },
        {
          id: 3,
          name: '正山小种',
          minPrice: 300,
          maxPrice: 600,
          avgPrice: 450,
          unit: '斤',
          changeType: 'up',
          changePercent: 3.8,
          origin: '福建武夷山',
          updateTime: '30分钟前',
          sourceCount: 20,
          isHot: true,
          isNew: false,
          isRecommended: true
        }
      ]
    }
    
    this.setData({
      activeCategory: category,
      priceList: newData,
      page: 1,
      hasMore: false
    })
    
    console.log('切换分类完成，新数据长度:', newData.length)
  },

  // 查看价格详情
  viewPriceDetail(e) {
    const item = e.currentTarget.dataset.item
    console.log('查看价格详情:', item)
    
    // 跳转到价格详情页面
    wx.navigateTo({
      url: `/pages/market-price-detail/market-price-detail?id=${item.id}&name=${item.name}`
    })
  },

  // 发布价格
  publishPrice() {
    console.log('跳转到发布价格页面')
    wx.navigateTo({
      url: '/pages/publish-price/publish-price'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    // 重新加载当前分类的数据
    this.switchCategory({ currentTarget: { dataset: { category: this.data.activeCategory } } })
    
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '茶叶品类行情 - 实时价格查询',
      path: '/pages/category/category'
    }
  }
}) 