Page({
  data: {
    gardenId: null,
    garden: null,
    loading: true,
    
    // 当前用户信息
    currentUser: {
      isVip: false,
      isVerified: false
    },
    
    // 联系信息解锁状态
    contactUnlocked: false,
    
    // 分享信息
    shareInfo: {
      title: '',
      path: '',
      imageUrl: ''
    }
  },

  onLoad(options) {
    const { id } = options
    this.setData({ gardenId: id })
    this.loadGardenDetail()
  },

  // 加载茶园详情
  loadGardenDetail() {
    this.setData({ loading: true })
    
    // 模拟API调用
    setTimeout(() => {
      const gardenData = {
        id: this.data.gardenId,
        name: '',
        location: '浙江杭州西湖区龙井村',
        area: 500,
        areaUnit: '亩',
        season: 'spring',
        harvestPeriod: '3.15-4.5',
        teaType: '龙井',
        province: 'zhejiang',
        region: 'xihu',
        features: ['明前采摘', '核心产区', '荒野老枞', '有机认证'],
        images: [
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=西湖茶园1',
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=西湖茶园2',
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=西湖茶园3'
        ],
        merchant: {
          name: '杭州龙井茶农',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=茶农',
          rating: 4.9,
          isVerified: true,
          brand: '八马茶业指定茶园',
          wechat: 'tea_farmer_001',
          phone: '138****8888',
          address: '浙江省杭州市西湖区龙井村',
          description: '世代茶农，专注龙井茶种植30年，拥有核心产区茶园，品质保证。'
        },
        isCertified: true,
        isSeasonal: true,
        createTime: '2024-03-15 10:30:00',
        viewCount: 234,
        
        // 详细信息
        details: {
          altitude: '200-300米',
          soil: '砂质壤土',
          climate: '亚热带季风气候',
          rainfall: '年降水量1500mm',
          temperature: '年平均温度16℃',
          plantingYear: '1985年',
          certification: ['有机认证', '地理标志保护', 'ISO9001'],
          awards: [],
          processing: '传统手工炒制',
          storage: '恒温恒湿专业仓储'
        },
        
        // 价格信息
        pricing: {
          currentPrice: '2800元/斤',
          lastYearPrice: '2600元/斤',
          priceTrend: 'up', // up, down, stable
          minOrder: '10斤',
          payment: ['现金', '银行转账', '微信支付'],
          delivery: '48小时内发货',
          guarantee: '7天无理由退换'
        },
        
        // 评价信息
        reviews: [
          {
            id: 1,
            user: '茶商张先生',
            avatar: 'https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=用户',
            rating: 5,
            content: '',
            time: '2024-03-10 15:30:00',
            images: []
          },
          {
            id: 2,
            user: '茶艺师李女士',
            avatar: 'https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=用户',
            rating: 4,
            content: '茶园环境优美，茶叶新鲜，包装也很精美，值得推荐。',
            time: '2024-03-08 10:15:00',
            images: [
              'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=评价图1'
            ]
          }
        ],
        
        // 相关茶园
        relatedGardens: [
          {
            id: 2,
            name: '新昌龙井茶园',
            location: '浙江新昌县',
            image: 'https://via.placeholder.com/150x100/4CAF50/FFFFFF?text=新昌茶园',
            price: '2200元/斤'
          },
          {
            id: 3,
            name: '安吉白茶园',
            location: '浙江安吉县',
            image: 'https://via.placeholder.com/150x100/4CAF50/FFFFFF?text=安吉茶园',
            price: '1800元/斤'
          }
        ]
      }
      
      this.setData({ 
        garden: gardenData,
        loading: false,
        shareInfo: {
          title: `${gardenData.name} - 源头直采`,
          path: `/pages/garden-detail/garden-detail?id=${gardenData.id}`,
          imageUrl: gardenData.images[0]
        }
      })
      
      // 增加浏览量
      this.increaseViewCount()
    }, 1000)
  },

  // 增加浏览量
  increaseViewCount() {
    const garden = { ...this.data.garden }
    garden.viewCount += 1
    this.setData({ garden })
  },

  // 解锁联系信息
  unlockContact() {
    if (this.data.contactUnlocked) {
      return
    }
    
    wx.showModal({
      title: '解锁联系信息',
      content: '需要消耗10积分或成为VIP会员才能查看完整联系信息',
      confirmText: '确认解锁',
      success: (res) => {
        if (res.confirm) {
          // 模拟解锁过程
          wx.showLoading({ title: '解锁中...' })
          
          setTimeout(() => {
            wx.hideLoading()
            this.setData({ contactUnlocked: true })
            wx.showToast({
              title: '解锁成功',
              icon: 'success'
            })
          }, 1000)
        }
      }
    })
  },

  // 联系茶农
  contactFarmer(e) {
    const { type } = e.currentTarget.dataset
    
    if (!this.data.contactUnlocked) {
      this.unlockContact()
      return
    }
    
    const garden = this.data.garden
    let content = ''
    let action = ''
    
    switch (type) {
      case 'wechat':
        content = `微信号：${garden.merchant.wechat}`
        action = '复制微信号'
        break
      case 'phone':
        content = `联系电话：${garden.merchant.phone}`
        action = '拨打电话'
        break
      case 'address':
        content = `地址：${garden.merchant.address}`
        action = '复制地址'
        break
    }
    
    wx.showModal({
      title: '联系茶农',
      content: content,
      confirmText: action,
      success: (res) => {
        if (res.confirm) {
          if (type === 'phone') {
            wx.makePhoneCall({
              phoneNumber: garden.merchant.phone.replace(/\*/g, '')
            })
          } else {
            const text = type === 'wechat' ? garden.merchant.wechat : garden.merchant.address
            wx.setClipboardData({
              data: text,
              success: () => {
                wx.showToast({
                  title: '已复制到剪贴板',
                  icon: 'success'
                })
              }
            })
          }
        }
      }
    })
  },

  // 查看大图
  previewImage(e) {
    const { current } = e.currentTarget.dataset
    const { images } = this.data.garden
    
    wx.previewImage({
      current: current,
      urls: images
    })
  },

  // 查看评价图片
  previewReviewImage(e) {
    const { current, urls } = e.currentTarget.dataset
    
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  // 跳转到相关茶园
  goToRelatedGarden(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/garden-detail/garden-detail?id=${id}`
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: this.data.shareInfo.title,
      path: this.data.shareInfo.path,
      imageUrl: this.data.shareInfo.imageUrl
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.imageUrl
    }
  },

  // 收藏
  toggleFavorite() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    })
  },

  // 举报
  report() {
    wx.showActionSheet({
      itemList: ['虚假信息', '价格欺诈', '其他问题'],
      success: (res) => {
        wx.showToast({
          title: '举报已提交',
          icon: 'success'
        })
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadGardenDetail()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
}) 