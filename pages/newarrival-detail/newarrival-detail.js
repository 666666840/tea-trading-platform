Page({
  data: {
    id: null,
    arrivalInfo: null,
    merchantInfo: {
      name: '杭州茶叶批发商',
      avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=商户',
      rating: 4.8,
      wechat: 'tea_merchant_001',
      phone: '138****8888',
      isActive: true,
      joinTime: '2023-01-15',
      arrivalCount: 25
    },
    relatedArrivals: []
  },

  onLoad(options) {
    const { id } = options
    this.setData({ id })
    this.loadArrivalDetail(id)
  },

  // 加载商品详情
  loadArrivalDetail(id) {
    // TODO: 从服务器获取真实的商品详情数据
    const mockData = {
      id: parseInt(id),
      name: '',
      category: '',
      arrivalTime: '',
      priceRange: '',
      stock: '',
      description: '',
      images: [],
      features: [],
      createTime: '',
      viewCount: 0,
      isTop: false
    }

    this.setData({ arrivalInfo: mockData })
  },

  // 预览图片
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.arrivalInfo
    
    wx.previewImage({
      current: images[index],
      urls: images
    })
  },

  // 联系商户
  contactMerchant() {
    wx.showModal({
      title: '联系商户',
      content: `微信号：${this.data.merchantInfo.wechat}`,
      confirmText: '复制微信号',
      cancelText: '拨打电话',
      success: (res) => {
        if (res.confirm) {
          // 复制微信号
          wx.setClipboardData({
            data: this.data.merchantInfo.wechat,
            success: () => {
              wx.showToast({
                title: '微信号已复制',
                icon: 'success'
              })
            }
          })
        } else if (res.cancel) {
          // 拨打电话
          wx.makePhoneCall({
            phoneNumber: '13888888888',
            success: () => {
              console.log('拨打电话成功')
            },
            fail: () => {
              wx.showToast({
                title: '拨打电话失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  // 打招呼
  sayHello() {
    wx.showModal({
      title: '打招呼',
      content: '确定要向商户打招呼吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已发送打招呼消息',
            icon: 'success'
          })
        }
      }
    })
  },

  // 分享商品
  onShareAppMessage() {
    const { arrivalInfo } = this.data
    return {
      title: `${arrivalInfo.name} - 最新到货！`,
      path: `/pages/newarrival-detail/newarrival-detail?id=${this.data.id}`,
      imageUrl: arrivalInfo.images[0]
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { arrivalInfo } = this.data
    return {
      title: `${arrivalInfo.name} - 最新到货！`,
      imageUrl: arrivalInfo.images[0]
    }
  },

  // 点击相关商品
  onRelatedTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/newarrival-detail/newarrival-detail?id=${id}`
    })
  }
}) 