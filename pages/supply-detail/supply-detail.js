Page({
  data: {
    // 供应信息详情
    supplyInfo: null,
    
    // 当前图片索引
    currentImageIndex: 0,
    
    // 是否显示图片预览
    showImagePreview: false,
    
    // 联系信息是否解锁
    contactUnlocked: false,
    
    // 是否已收藏
    isFavorited: false,
    
    // 相关推荐
    relatedList: [],
    
    // 加载状态
    loading: true
  },

  onLoad(options) {
    const { id } = options
    console.log('供应详情页面加载，ID:', id)
    
    this.loadSupplyDetail(id)
    this.loadRelatedSupply()
  },

  // 加载供应详情
  loadSupplyDetail(id) {
    this.setData({ loading: true })
    
    // 模拟API调用
    setTimeout(() => {
      const supplyInfo = {
        id: parseInt(id),
        type: 'supply',
        typeText: '供应',
        title: '勐海茶厂熟茶现货供应',
        description: '2020年勐海茶厂熟茶，品质稳定，价格优惠，量大从优。采用传统工艺制作，经过三年陈化，口感醇厚，回甘持久。适合收藏和品饮。',
        teaType: '普洱茶',
        teaSubType: '熟茶',
        price: '面议',
        quantity: '1000kg',
        location: '云南西双版纳',
        market: '勐海',
        tags: ['熟茶', '勐海茶厂', '现货', '量大从优', '陈化三年'],
        isNew: true,
        isClearance: false,
        isRecommended: true,
        isUrgent: false,
        merchant: {
          name: '勐海茶厂',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=茶厂',
          rating: 4.8,
          isVerified: true,
          mainBusiness: '普洱茶',
          wechat: 'mengchaitea888',
          phone: '13800138000',
          address: '云南省西双版纳傣族自治州勐海县勐海镇',
          businessYears: 15,
          totalSupply: 1250,
          responseRate: 98,
          responseTime: '2小时内'
        },
        createTime: '2024-03-15 10:30:00',
        updateTime: '2024-03-15 14:20:00',
        viewCount: 156,
        favoriteCount: 23,
        contactCount: 8,
        validityPeriod: '2024-04-15',
        images: [
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=熟茶1',
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=熟茶2',
          'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=熟茶3'
        ],
        specifications: {
          year: '2020年',
          grade: '特级',
          origin: '勐海',
          process: '传统工艺',
          storage: '干仓存储',
          moisture: '<8%',
          packaging: '散装/饼装'
        },
        quality: {
          appearance: '条索紧结，色泽褐红',
          aroma: '陈香浓郁，枣香明显',
          taste: '醇厚甘甜，回甘持久',
          soup: '红浓明亮，油润有光'
        },
        delivery: {
          method: '物流配送',
          time: '3-5个工作日',
          area: '全国',
          cost: '买家承担',
          insurance: '可提供'
        },
        payment: {
          methods: ['银行转账', '支付宝', '微信支付'],
          terms: '预付30%，发货前付清',
          guarantee: '品质保证，不满意可退换'
        },
        certificates: [
          {
            name: '有机认证',
            issuer: '中国有机产品认证中心',
            validUntil: '2025-12-31'
          },
          {
            name: 'ISO9001认证',
            issuer: '中国质量认证中心',
            validUntil: '2025-06-30'
          }
        ]
      }
      
      this.setData({
        supplyInfo,
        loading: false
      })
      
      // 增加浏览次数
      this.increaseViewCount()
    }, 1000)
  },

  // 加载相关推荐
  loadRelatedSupply() {
    // 模拟相关推荐数据
    setTimeout(() => {
      const relatedList = [
        {
          id: 2,
          title: '福鼎白茶新茶到货',
          price: '280元/斤',
          location: '福建宁德',
          image: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=白茶'
        },
        {
          id: 3,
          title: '',
          price: '',
          location: '',
          image: ''
        },
        {
          id: 4,
          title: '安溪铁观音春茶预售',
          price: '320元/斤',
          location: '福建泉州',
          image: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=铁观音'
        }
      ]
      
      this.setData({ relatedList })
    }, 1500)
  },

  // 增加浏览次数
  increaseViewCount() {
    const { supplyInfo } = this.data
    if (supplyInfo) {
      this.setData({
        'supplyInfo.viewCount': supplyInfo.viewCount + 1
      })
    }
  },

  // 预览图片
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { supplyInfo } = this.data
    
    wx.previewImage({
      current: supplyInfo.images[index],
      urls: supplyInfo.images
    })
  },

  // 切换图片
  onImageChange(e) {
    const { current } = e.detail
    this.setData({ currentImageIndex: current })
  },

  // 联系商户
  contactMerchant() {
    const { supplyInfo, contactUnlocked } = this.data
    
    if (!contactUnlocked) {
      this.unlockContact()
      return
    }
    
    wx.showActionSheet({
      itemList: ['复制微信号', '拨打电话', '查看地址'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.copyWechat()
            break
          case 1:
            this.callPhone()
            break
          case 2:
            this.viewAddress()
            break
        }
      }
    })
  },

  // 解锁联系信息
  unlockContact() {
    wx.showModal({
      title: '解锁联系信息',
      content: '需要消耗1个积分查看商户联系方式，是否继续？',
      confirmText: '确认解锁',
      success: (res) => {
        if (res.confirm) {
          // 模拟积分扣除
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

  // 复制微信号
  copyWechat() {
    const { supplyInfo } = this.data
    wx.setClipboardData({
      data: supplyInfo.merchant.wechat,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 拨打电话
  callPhone() {
    const { supplyInfo } = this.data
    wx.makePhoneCall({
      phoneNumber: supplyInfo.merchant.phone,
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
  },

  // 查看地址
  viewAddress() {
    const { supplyInfo } = this.data
    wx.showModal({
      title: '商户地址',
      content: supplyInfo.merchant.address,
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 收藏/取消收藏
  toggleFavorite() {
    const { isFavorited, supplyInfo } = this.data
    
    this.setData({
      isFavorited: !isFavorited,
      'supplyInfo.favoriteCount': isFavorited ? 
        supplyInfo.favoriteCount - 1 : supplyInfo.favoriteCount + 1
    })
    
    wx.showToast({
      title: isFavorited ? '已取消收藏' : '已收藏',
      icon: 'success'
    })
  },

  // 分享
  onShareAppMessage() {
    const { supplyInfo } = this.data
    return {
      title: supplyInfo.title,
      path: `/pages/supply-detail/supply-detail?id=${supplyInfo.id}`,
      imageUrl: supplyInfo.images[0]
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { supplyInfo } = this.data
    return {
      title: supplyInfo.title,
      imageUrl: supplyInfo.images[0]
    }
  },

  // 举报
  reportSupply() {
    wx.showActionSheet({
      itemList: ['虚假信息', '价格欺诈', '质量不符', '其他问题'],
      success: (res) => {
        const reasons = ['虚假信息', '价格欺诈', '质量不符', '其他问题']
        wx.showModal({
          title: '举报确认',
          content: `确定要举报该供应信息吗？\n举报原因：${reasons[res.tapIndex]}`,
          confirmText: '确认举报',
          success: (modalRes) => {
            if (modalRes.confirm) {
              wx.showToast({
                title: '举报成功',
                icon: 'success'
              })
            }
          }
        })
      }
    })
  },

  // 点击相关推荐
  onRelatedTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/supply-detail/supply-detail?id=${id}`
    })
  },

  // 查看商户详情
  viewMerchantDetail() {
    const { supplyInfo } = this.data
    wx.navigateTo({
      url: `/pages/merchant-detail/merchant-detail?id=${supplyInfo.merchant.id}`
    })
  },

  // 拨打电话
  onPhoneTap() {
    const { supplyInfo } = this.data
    if (this.data.contactUnlocked) {
      this.callPhone()
    } else {
      this.unlockContact()
    }
  },

  // 复制微信号
  onWechatTap() {
    const { supplyInfo } = this.data
    if (this.data.contactUnlocked) {
      this.copyWechat()
    } else {
      this.unlockContact()
    }
  }
}) 