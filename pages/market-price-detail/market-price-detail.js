Page({
  data: {
    // 页面数据
    priceDetail: null,
    loading: true,
    
    // 相关商户列表
    merchants: [],
    
    // 价格趋势数据
    priceTrend: [],
    
    // 用户位置
    userLocation: {
      latitude: 0,
      longitude: 0
    },
    
    // 页面状态
    activeTab: 'detail', // detail, merchants, trend
    
    // 排序方式
    sortType: 'distance', // distance, rating, price
  },

  onLoad(options) {
    console.log('市场行情详情页面加载', options)
    
    if (options.id) {
      this.loadPriceDetail(options.id)
      this.loadMerchants(options.id)
      this.loadPriceTrend(options.id)
    }
    
    this.getUserLocation()
  },

  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          userLocation: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
      }
    })
  },

  // 加载价格详情
  loadPriceDetail(id) {
    // TODO: 从服务器获取真实的价格详情数据
    setTimeout(() => {
      const mockDetail = {
        id: id,
        category: '',
        subCategory: '',
        city: '',
        priceRange: '',
        unit: '元/斤',
        updateTime: '',
        updateStatus: '',
        description: '',
        process: '',
        origin: '',
        images: [],
        tags: [],
        merchantCount: 0,
        avgRating: 0,
        totalInquiries: 0,
        priceTrend: 'stable',
        trendText: '',
        trendIcon: ''
      }
      
      this.setData({
        priceDetail: mockDetail,
        loading: false
      })
    }, 1000)
  },

  // 加载商户列表
  loadMerchants(priceId) {
    // 模拟API调用
    setTimeout(() => {
      const mockMerchants = [
        {
          id: 1,
          name: '龙井茶庄',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=龙井',
          rating: 4.9,
          distance: 2.5,
          price: '680-1200',
          unit: '元/斤',
          hasImages: true,
          hasOrigin: true,
          process: '手工炒制',
          origin: '西湖区龙井村',
          updateTime: '2小时前',
          contactPhone: '13800138000',
          address: '杭州市西湖区龙井路123号'
        },
        {
          id: 2,
          name: '西湖茶叶店',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=西湖',
          rating: 4.7,
          distance: 5.2,
          price: '720-1350',
          unit: '元/斤',
          hasImages: false,
          hasOrigin: true,
          process: '传统工艺',
          origin: '西湖区',
          updateTime: '1天前',
          contactPhone: '13800138001',
          address: '杭州市西湖区梅家坞456号'
        },
        {
          id: 3,
          name: '明前茶坊',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=明前',
          rating: 4.8,
          distance: 8.1,
          price: '650-1480',
          unit: '元/斤',
          hasImages: true,
          hasOrigin: false,
          process: '手工炒制',
          origin: '西湖区',
          updateTime: '3小时前',
          contactPhone: '13800138002',
          address: '杭州市西湖区满觉陇789号'
        }
      ]
      
      this.setData({
        merchants: mockMerchants
      })
    }, 1500)
  },

  // 加载价格趋势
  loadPriceTrend(priceId) {
    // 模拟API调用
    setTimeout(() => {
      const mockTrend = [
        { date: '2024-01-01', price: 680 },
        { date: '2024-01-08', price: 690 },
        { date: '2024-01-15', price: 685 },
        { date: '2024-01-22', price: 700 },
        { date: '2024-01-29', price: 695 },
        { date: '2024-02-05', price: 710 },
        { date: '2024-02-12', price: 720 },
        { date: '2024-02-19', price: 715 },
        { date: '2024-02-26', price: 730 },
        { date: '2024-03-05', price: 725 },
        { date: '2024-03-12', price: 740 },
        { date: '2024-03-19', price: 735 },
        { date: '2024-03-26', price: 750 },
        { date: '2024-04-02', price: 745 },
        { date: '2024-04-09', price: 760 }
      ]
      
      this.setData({
        priceTrend: mockTrend
      })
    }, 2000)
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: tab
    })
  },

  // 切换排序方式
  changeSort(e) {
    const sortType = e.currentTarget.dataset.sort
    this.setData({
      sortType: sortType
    })
    this.sortMerchants()
  },

  // 排序商户
  sortMerchants() {
    let sortedMerchants = [...this.data.merchants]
    
    switch (this.data.sortType) {
      case 'distance':
        // 按距离排序（需要用户位置）
        if (this.data.userLocation.latitude && this.data.userLocation.longitude) {
          sortedMerchants.sort((a, b) => {
            const aDistance = this.calculateMerchantDistance(a)
            const bDistance = this.calculateMerchantDistance(b)
            return aDistance - bDistance
          })
        }
        break
      case 'rating':
        // 按评分排序：综合评分、咨询量、好评数等
        sortedMerchants.sort((a, b) => {
          const aScore = this.calculateMerchantRatingScore(a)
          const bScore = this.calculateMerchantRatingScore(b)
          return bScore - aScore
        })
        break
      case 'price':
        // 按价格排序（取最低价）
        sortedMerchants.sort((a, b) => {
          const aMin = parseInt(a.price.split('-')[0])
          const bMin = parseInt(b.price.split('-')[0])
          return aMin - bMin
        })
        break
      default:
        break
    }
    
    this.setData({
      merchants: sortedMerchants
    })
  },

  // 计算商户评分分数
  calculateMerchantRatingScore(merchant) {
    let score = 0
    
    // 基础评分（0-5分）
    score += (merchant.rating || 0) * 10
    
    // 咨询量加分
    score += Math.floor((merchant.totalInquiries || 0) / 5)
    
    // 好评数加分
    score += (merchant.positiveReviews || 0) * 2
    
    // 信息完整性加分
    if (merchant.hasImages) score += 15
    if (merchant.hasOrigin) score += 10
    if (merchant.process) score += 5
    
    // 更新时间加分
    if (merchant.updateTime.includes('小时前') || merchant.updateTime.includes('分钟前')) {
      score += 20
    } else if (merchant.updateTime.includes('天前')) {
      const days = parseInt(merchant.updateTime)
      if (days <= 1) score += 15
      else if (days <= 3) score += 10
      else if (days <= 7) score += 5
    }
    
    return score
  },

  // 计算商户距离（简化版）
  calculateMerchantDistance(merchant) {
    // 这里应该根据商户地址和用户位置计算实际距离
    // 暂时使用模拟数据
    return merchant.distance || 9999
  },

  // 联系商户
  contactMerchant(e) {
    const merchantId = e.currentTarget.dataset.id
    const merchant = this.data.merchants.find(m => m.id === merchantId)
    
    if (merchant) {
      wx.showActionSheet({
        itemList: ['拨打电话', '查看地址', '发送消息'],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.callMerchant(merchant.contactPhone)
              break
            case 1:
              this.viewMerchantAddress(merchant)
              break
            case 2:
              this.sendMessage(merchant)
              break
          }
        }
      })
    }
  },

  // 拨打电话
  callMerchant(phone) {
    wx.makePhoneCall({
      phoneNumber: phone,
      fail: () => {
        wx.showToast({
          title: '拨号失败',
          icon: 'none'
        })
      }
    })
  },

  // 查看地址
  viewMerchantAddress(merchant) {
    wx.showModal({
      title: merchant.name,
      content: merchant.address,
      confirmText: '导航',
      success: (res) => {
        if (res.confirm) {
          // 这里应该调用地图导航
          wx.showToast({
            title: '导航功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 发送消息
  sendMessage(merchant) {
    wx.navigateTo({
      url: `/pages/inquiry/inquiry?merchantId=${merchant.id}&product=${this.data.priceDetail.subCategory}`
    })
  },

  // 查看商户详情
  viewMerchantDetail(e) {
    const merchantId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/merchant-detail/merchant-detail?id=${merchantId}`
    })
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    const url = this.data.priceDetail.images[index]
    wx.previewImage({
      current: url,
      urls: this.data.priceDetail.images
    })
  },

  // 分享
  onShareAppMessage() {
    const detail = this.data.priceDetail
    return {
      title: `${detail.subCategory}价格行情 - ${detail.priceRange}${detail.unit}`,
      path: `/pages/market-price-detail/market-price-detail?id=${detail.id}`,
      imageUrl: detail.images[0]
    }
  },

  // 返回
  goBack() {
    wx.navigateBack()
  }
}) 