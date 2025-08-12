Page({
  data: {
    // 出租转让详情
    rentalDetail: {
      id: 1,
      title: '',
      type: 'market',
      typeName: '市场档口',
      price: '',
      priceType: 'transfer',
      location: '',
      area: 0,
      areaUnit: '㎡',
      boothNumber: '',
      marketContact: '',
      description: '',
      images: [],
      merchant: {
        name: '',
        avatar: '',
        rating: 0,
        isVerified: false,
        phone: '',
        wechat: '',
        address: ''
      },
      isRecommended: false,
      isUrgent: false,
      createTime: '',
      viewCount: 0,
      tags: [],
      
      // 市场档口特有信息
      marketInfo: {
        floor: '',
        direction: '',
        businessHours: '',
        parking: '',
        security: '',
        facilities: []
      },
      
      // 转让条件
      transferConditions: {
        transferFee: '',
        deposit: '',
        contractTerm: '',
        requirements: []
      }
    },
    
    // 联系信息解锁状态
    contactUnlocked: false,
    
    // 当前图片索引
    currentImageIndex: 0,
    
    // 是否显示图片预览
    showImagePreview: false,
    
    // 分享信息
    shareInfo: {
      title: '',
      path: '/pages/rental-detail/rental-detail?id=1',
      imageUrl: ''
    },
    
    // 相关推荐
    relatedRentals: []
  },

  onLoad(options) {
    const { id } = options
    console.log('=== 出租转让详情页面加载 ===')
    console.log('页面参数:', options)
    
    if (!id) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }
    
    // 根据ID加载详情数据
    this.loadRentalDetail(id)
    
    // 增加浏览量
    this.increaseViewCount(id)
    
    // 设置分享信息
    this.setShareInfo(id)
  },

  // 加载出租转让详情
  loadRentalDetail(id) {
    console.log('📡 加载出租转让详情，ID:', id)
    
    // 显示加载状态
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    
    // 模拟从服务器加载数据
    setTimeout(() => {
      wx.hideLoading()
      
      // 模拟数据
      const mockData = {
        id: id,
        title: '西湖龙井茶城A区档口转让',
        type: 'market',
        typeName: '市场档口',
        price: '面议',
        priceType: 'transfer',
        location: '浙江杭州西湖区',
        area: 15,
        areaUnit: '㎡',
        boothNumber: 'A-123',
        description: '位于西湖龙井茶城核心位置，人流量大，适合经营茶叶、茶具等。',
        images: [
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=档口1',
          'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=档口2'
        ],
        merchant: {
          name: '西湖茶业',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶业',
          rating: 4.8,
          isVerified: true,
          phone: '138****8888',
          wechat: 'xihu_tea'
        },
        isRecommended: true,
        isUrgent: false,
        createTime: '2024-03-15 10:30:00',
        viewCount: 156,
        tags: ['核心位置', '人流量大', '适合茶叶经营'],
        marketInfo: {
          floor: '1楼',
          direction: '朝南',
          businessHours: '8:00-22:00',
          parking: '有',
          security: '24小时',
          facilities: ['空调', '水电', '网络', '监控']
        },
        transferConditions: {
          transferFee: '5万元',
          deposit: '2万元',
          contractTerm: '3年',
          requirements: ['有经营经验', '资金充足']
        }
      }
      
      this.setData({
        rentalDetail: mockData
      })
      
      console.log('✅ 详情数据加载完成')
    }, 1000)
  },

  // 增加浏览量
  increaseViewCount(id) {
    // 模拟增加浏览量
    this.setData({
      'rentalDetail.viewCount': this.data.rentalDetail.viewCount + 1
    })
  },

  // 解锁联系信息
  unlockContact() {
    wx.showModal({
      title: '解锁联系信息',
      content: '需要消耗10积分查看发布者联系方式',
      confirmText: '确认解锁',
      success: (res) => {
        if (res.confirm) {
          // 模拟积分扣除
          this.setData({
            contactUnlocked: true
          })
          wx.showToast({
            title: '解锁成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 拨打电话
  callPhone() {
    if (!this.data.contactUnlocked) {
      this.unlockContact()
      return
    }
    
    const phone = this.data.rentalDetail.merchant.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      success: () => {
        console.log('拨打电话成功')
      },
      fail: (err) => {
        console.log('拨打电话失败', err)
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        })
      }
    })
  },

  // 复制微信号
  copyWechat() {
    if (!this.data.contactUnlocked) {
      this.unlockContact()
      return
    }
    
    const wechat = this.data.rentalDetail.merchant.wechat
    wx.setClipboardData({
      data: wechat,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 查看位置
  viewLocation() {
    const location = this.data.rentalDetail.location
    // 这里可以调用地图API显示位置
    wx.showToast({
      title: '位置：' + location,
      icon: 'none',
      duration: 2000
    })
  },

  // 图片预览
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.rentalDetail
    
    wx.previewImage({
      current: images[index],
      urls: images
    })
  },

  // 图片轮播切换
  onImageChange(e) {
    const { current } = e.detail
    this.setData({
      currentImageIndex: current
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
      itemList: ['虚假信息', '价格不实', '联系方式错误', '其他问题'],
      success: (res) => {
        const reasons = ['虚假信息', '价格不实', '联系方式错误', '其他问题']
        wx.showToast({
          title: `已举报：${reasons[res.tapIndex]}`,
          icon: 'success'
        })
      }
    })
  },

  // 联系发布者
  contactPublisher() {
    if (!this.data.contactUnlocked) {
      this.unlockContact()
      return
    }
    
    wx.showActionSheet({
      itemList: ['拨打电话', '复制微信号', '查看地址'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.callPhone()
            break
          case 1:
            this.copyWechat()
            break
          case 2:
            this.viewLocation()
            break
        }
      }
    })
  },

  // 点击相关推荐
  onRelatedTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/rental-detail/rental-detail?id=${id}`
    })
  },

  // 发布相似信息
  publishSimilar() {
    console.log('=== 发布相似出租转让信息 ===')
    
    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '需要登录',
        content: '发布信息需要先登录，是否前往登录？',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }
    
    // 检查用户认证状态
    if (!userInfo.isVerified) {
      wx.showModal({
        title: '需要认证',
        content: '发布信息需要先完成商户认证，是否前往认证？',
        confirmText: '去认证',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/merchant-register/merchant-register'
            })
          }
        }
      })
      return
    }
    
    // 跳转到发布页面，并传递当前信息作为模板
    const { rentalDetail } = this.data
    const templateData = {
      type: rentalDetail.type,
      priceType: rentalDetail.priceType,
      location: rentalDetail.location,
      area: rentalDetail.area,
      areaUnit: rentalDetail.areaUnit
    }
    
    // 将模板数据存储到本地
    wx.setStorageSync('rental_template', templateData)
    
    wx.navigateTo({
      url: '/pages/publish-rental/publish-rental?template=true',
      success: () => {
        console.log('✅ 成功跳转到发布页面')
        wx.showToast({
          title: '已加载相似信息模板',
          icon: 'success'
        })
      },
      fail: (error) => {
        console.error('❌ 跳转失败:', error)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 返回列表
  backToList() {
    wx.navigateBack()
  },

  // 设置分享信息
  setShareInfo(id) {
    this.setData({
      shareInfo: {
        title: this.data.rentalDetail.title,
        path: `/pages/rental-detail/rental-detail?id=${id}`,
        imageUrl: this.data.rentalDetail.images[0] || ''
      }
    })
  }
}) 