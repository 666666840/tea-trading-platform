Page({
  data: {
    testMarkets: [
      {
        id: 'guangzhou_fangcun',
        name: '广州芳村茶叶市场',
        description: '国家级市场'
      },
      {
        id: 'beijing_maliandao',
        name: '北京马连道茶城',
        description: '市级市场'
      },
      {
        id: 'jinan_zhangzhuang',
        name: '济南张庄路茶叶市场',
        description: '省级市场'
      },
      {
        id: 'test_market',
        name: '测试市场',
        description: '测试用市场'
      }
    ]
  },

  onLoad() {
    console.log('测试页面加载完成')
  },

  // 跳转到市场详情页面
  goToMarketDetail(e) {
    const marketId = e.currentTarget.dataset.id
    console.log('跳转到市场详情页面，marketId:', marketId)
    
    wx.navigateTo({
      url: `/pages/market-detail/market-detail?id=${marketId}`,
      success: () => {
        console.log('跳转成功')
      },
      fail: (error) => {
        console.error('跳转失败:', error)
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 直接跳转到入驻指南
  goToJoinGuide() {
    wx.navigateTo({
      url: '/pages/market-join-guide/market-join-guide'
    })
  }
}) 