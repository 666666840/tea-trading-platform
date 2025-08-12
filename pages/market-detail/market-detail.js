const teaMarketData = require('../../utils/tea-market-data.js')

Page({
  data: {
    marketId: '',
    marketInfo: null,
    
    // 商户列表
    merchantList: [],
    filteredMerchants: [],
    
    // 排序方式
    sortType: 'comprehensive', // 'comprehensive' | 'newest' | 'activity'
    
    // 筛选条件
    filterType: 'all', // 'all' | 'active' | 'verified'
    
    // 搜索关键词
    searchKeyword: '',
    
    // 分页
    page: 1,
    pageSize: 20,
    hasMore: true,
    
    // 加载状态
    loading: true,

    // 入驻相关
    showJoinModal: false,
    joinForm: {
      merchantName: '',
      contactName: '',
      phone: '',
      wechat: '',
      businessType: '',
      mainCategory: '',
      description: '',
      license: '',
      idCard: ''
    },
    
    // 经营类型选项
    businessTypes: [
      '茶厂',
      '茶园', 
      '一级批发商',
      '品牌总代',
      '区域分销商',
      '源头供应商',
      '零售商'
    ],
    
    // 主营品类选项
    mainCategories: [
      '绿茶类',
      '红茶类', 
      '乌龙茶类',
      '白茶类',
      '黑茶类',
      '黄茶类',
      '普洱茶类',
      '花茶类'
    ]
  },

  onLoad(options) {
    console.log('市场详情页面加载，options:', options)
    
    // 如果没有传入marketId，使用默认值进行测试
    const marketId = options.id || 'guangzhou_fangcun'
    
    this.setData({
      marketId: marketId
    })
    
    console.log('设置marketId:', marketId)
    
    this.loadMarketInfo()
    this.loadMerchants()
  },

  // 加载市场信息
  loadMarketInfo() {
    console.log('加载市场信息，marketId:', this.data.marketId)
    
    // 从数据中查找市场信息
    const markets = teaMarketData.markets
    const market = markets.find(m => m.id === this.data.marketId)
    
    if (market) {
      this.setData({
        marketInfo: market,
        loading: false
      })
    } else {
      // 如果没找到，创建一个基础信息
      this.setData({
        marketInfo: {
          id: this.data.marketId,
          name: '茶叶批发市场',
          province: '未知',
          city: '未知',
          district: '未知',
          address: '地址信息待补充'
        },
        loading: false
      })
      console.log('使用默认市场信息:', this.data.marketInfo)
    }
  },

  // 加载商户列表
  loadMerchants() {
    this.setData({ loading: true })
    
    // 模拟商户数据
    const mockMerchants = [
      {
        id: 1,
        name: '芳村茶业批发商',
        logo: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=茶',
        mainProducts: ['普洱茶', '铁观音'],
        activityLevel: 'high',
        activityText: '今日活跃',
        verified: true,
        rating: 4.8,
        responseTime: '5分钟内',
        lastActive: '2小时前',
        contact: {
          phone: '13800138001',
          wechat: 'fangcun_tea',
          qrcode: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=微信'
        },
        description: '专业经营普洱茶、铁观音等名优茶叶，品质保证，价格优惠。',
        address: '广州市荔湾区芳村大道123号',
        businessHours: '08:00-18:00'
      },
      {
        id: 2,
        name: '龙井茶专营店',
        logo: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=龙井',
        mainProducts: [],
        activityLevel: 'medium',
        activityText: '3小时前活跃',
        verified: true,
        rating: 4.6,
        responseTime: '10分钟内',
        lastActive: '3小时前',
        contact: {
          phone: '13800138002',
          wechat: 'longjing_tea',
          qrcode: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=微信'
        },
        description: '',
        address: '广州市荔湾区芳村大道456号',
        businessHours: '09:00-17:00'
      },
      {
        id: 3,
        name: '红茶批发中心',
        logo: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=红茶',
        mainProducts: ['祁门红茶', '正山小种'],
        activityLevel: 'low',
        activityText: '昨日活跃',
        verified: false,
        rating: 4.2,
        responseTime: '30分钟内',
        lastActive: '1天前',
        contact: {
          phone: '13800138003',
          wechat: 'red_tea_center',
          qrcode: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=微信'
        },
        description: '专业红茶批发，品种齐全，价格实惠。',
        address: '广州市荔湾区芳村大道789号',
        businessHours: '08:30-17:30'
      }
    ]
    
    setTimeout(() => {
      this.setData({
        merchantList: mockMerchants,
        filteredMerchants: mockMerchants,
        loading: false
      })
      this.sortMerchants()
    }, 500)
  },

  // 搜索商户
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.filterMerchants()
  },

  // 筛选商户
  filterMerchants() {
    let merchants = [...this.data.merchantList]
    
    // 按搜索关键词筛选
    if (this.data.searchKeyword) {
      merchants = merchants.filter(merchant => 
        merchant.name.includes(this.data.searchKeyword) ||
        merchant.mainProducts.some(product => product.includes(this.data.searchKeyword)) ||
        merchant.description.includes(this.data.searchKeyword)
      )
    }
    
    // 按状态筛选
    if (this.data.filterType === 'active') {
      merchants = merchants.filter(merchant => merchant.activityLevel === 'high')
    } else if (this.data.filterType === 'verified') {
      merchants = merchants.filter(merchant => merchant.verified)
    }
    
    this.setData({
      filteredMerchants: merchants
    })
    this.sortMerchants()
  },

  // 设置筛选条件
  setFilter(e) {
    const filterType = e.currentTarget.dataset.type
    this.setData({
      filterType: filterType
    })
    this.filterMerchants()
  },

  // 设置排序方式
  setSortType(e) {
    const sortType = e.currentTarget.dataset.type
    this.setData({
      sortType: sortType
    })
    this.sortMerchants()
  },

  // 排序商户
  sortMerchants() {
    let merchants = [...this.data.filteredMerchants]
    
    switch (this.data.sortType) {
      case 'comprehensive':
        // 综合排序（评分 + 活跃度 + 认证状态）
        merchants.sort((a, b) => {
          const scoreA = a.rating * 0.4 + (a.activityLevel === 'high' ? 1 : a.activityLevel === 'medium' ? 0.5 : 0) * 0.3 + (a.verified ? 1 : 0) * 0.3
          const scoreB = b.rating * 0.4 + (b.activityLevel === 'high' ? 1 : b.activityLevel === 'medium' ? 0.5 : 0) * 0.3 + (b.verified ? 1 : 0) * 0.3
          return scoreB - scoreA
        })
        break
      case 'newest':
        // 最新入驻（这里用ID模拟）
        merchants.sort((a, b) => b.id - a.id)
        break
      case 'activity':
        // 活跃度排序
        const activityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
        merchants.sort((a, b) => activityOrder[b.activityLevel] - activityOrder[a.activityLevel])
        break
    }
    
    this.setData({
      filteredMerchants: merchants
    })
  },

  // 查看商户详情
  viewMerchantDetail(e) {
    const merchantId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/merchant-detail/merchant-detail?id=${merchantId}`,
      fail: () => {
        wx.showToast({
          title: '商户详情页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 联系商户
  contactMerchant(e) {
    const merchant = e.currentTarget.dataset.merchant
    wx.showActionSheet({
      itemList: ['拨打电话', '添加微信', '查看二维码'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            wx.makePhoneCall({
              phoneNumber: merchant.contact.phone
            })
            break
          case 1:
            wx.setClipboardData({
              data: merchant.contact.wechat,
              success: () => {
                wx.showToast({
                  title: '微信号已复制',
                  icon: 'success'
                })
              }
            })
            break
          case 2:
            wx.previewImage({
              urls: [merchant.contact.qrcode]
            })
            break
        }
      }
    })
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore || this.data.loading) return
    
    this.setData({
      loading: true
    })
    
    // 模拟加载更多
    setTimeout(() => {
      this.setData({
        loading: false,
        hasMore: false
      })
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none'
      })
    }, 1000)
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `${this.data.marketInfo?.name} - 茶叶一点通`,
      path: `/pages/market-detail/market-detail?id=${this.data.marketId}&name=${this.data.marketInfo?.name}`
    }
  },

  // 显示入驻申请表单
  showJoinForm() {
    this.setData({
      showJoinModal: true
    })
  },

  // 关闭入驻申请表单
  closeJoinForm() {
    this.setData({
      showJoinModal: false,
      joinForm: {
        merchantName: '',
        contactName: '',
        phone: '',
        wechat: '',
        businessType: '',
        mainCategory: '',
        description: '',
        license: '',
        idCard: ''
      }
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止事件冒泡
  },

  // 输入入驻表单
  inputJoinForm(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`joinForm.${field}`]: value
    })
  },

  // 选择经营类型
  onBusinessTypeChange(e) {
    this.setData({
      'joinForm.businessType': this.data.businessTypes[e.detail.value]
    })
  },

  // 选择主营品类
  onCategoryChange(e) {
    this.setData({
      'joinForm.mainCategory': this.data.mainCategories[e.detail.value]
    })
  },

  // 上传营业执照
  uploadLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 这里应该上传到服务器，这里只是模拟
        this.setData({
          'joinForm.license': res.tempFilePaths[0]
        })
        wx.showToast({
          title: '营业执照上传成功',
          icon: 'success'
        })
      }
    })
  },

  // 上传身份证
  uploadIDCard() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 这里应该上传到服务器，这里只是模拟
        this.setData({
          'joinForm.idCard': res.tempFilePaths[0]
        })
        wx.showToast({
          title: '身份证上传成功',
          icon: 'success'
        })
      }
    })
  },

  // 提交入驻申请
  submitJoinForm() {
    const { joinForm, marketInfo } = this.data
    
    // 验证表单
    if (!joinForm.merchantName || !joinForm.contactName || !joinForm.phone || !joinForm.businessType || !joinForm.mainCategory) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    if (!joinForm.license || !joinForm.idCard) {
      wx.showToast({
        title: '请上传资质证明',
        icon: 'none'
      })
      return
    }

    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(joinForm.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    // 显示确认对话框
    wx.showModal({
      title: '确认提交',
      content: `确认申请入驻${marketInfo.name}吗？\n\n入驻费用：${marketInfo.level === '国家级' ? '500元/年' : '300元/年'}`,
      success: (res) => {
        if (res.confirm) {
          this.submitApplication()
        }
      }
    })
  },

  // 提交申请
  submitApplication() {
    wx.showLoading({
      title: '提交中...'
    })

    // 模拟提交到服务器
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '申请提交成功',
        icon: 'success'
      })
      
      this.closeJoinForm()
      
      // 显示申请状态
      wx.showModal({
        title: '申请已提交',
        content: '您的入驻申请已提交成功，我们将在3个工作日内完成审核，请保持手机畅通。',
        showCancel: false,
        confirmText: '我知道了'
      })
    }, 2000)
  },

  // 查看入驻指南
  viewJoinGuide() {
    wx.navigateTo({
      url: '/pages/market-join-guide/market-join-guide'
    })
  },

  // 拨打电话 - 修复功能
  callPhone() {
    const phoneNumber = this.data.marketInfo.phone
    
    if (!phoneNumber) {
      wx.showToast({
        title: '暂无联系电话',
        icon: 'none'
      })
      return
    }
    
    // 显示确认弹窗
    wx.showModal({
      title: '拨打电话',
      content: `确定要拨打 ${phoneNumber} 吗？`,
      confirmText: '拨打',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phoneNumber,
            success: () => {
              console.log('拨号成功')
              // 记录用户行为
              this.recordUserAction('call_phone', { marketId: this.data.marketInfo.id })
            },
            fail: (error) => {
              console.error('拨号失败:', error)
              wx.showModal({
                title: '拨号失败',
                content: '无法拨打电话，可能是权限问题或设备不支持。您可以手动拨打：' + phoneNumber,
                showCancel: false,
                confirmText: '知道了'
              })
            }
          })
        }
      }
    })
  },

  // 查看地图 - 修复功能
  viewMap() {
    const marketInfo = this.data.marketInfo
    
    if (!marketInfo.latitude || !marketInfo.longitude) {
      // 如果没有坐标，使用地址搜索
      wx.openLocation({
        name: marketInfo.name,
        address: marketInfo.address,
        scale: 15,
        fail: (error) => {
          console.error('打开地图失败:', error)
          wx.showModal({
            title: '地图功能',
            content: `暂时无法打开地图，市场地址：${marketInfo.address}`,
            showCancel: true,
            confirmText: '复制地址',
            cancelText: '知道了',
            success: (res) => {
              if (res.confirm) {
                wx.setClipboardData({
                  data: marketInfo.address,
                  success: () => {
                    wx.showToast({
                      title: '地址已复制',
                      icon: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果有坐标，直接打开位置
      wx.openLocation({
        latitude: parseFloat(marketInfo.latitude),
        longitude: parseFloat(marketInfo.longitude),
        name: marketInfo.name,
        address: marketInfo.address,
        scale: 15
      })
    }
  },

  // 记录用户行为
  recordUserAction(action, data = {}) {
    console.log('用户行为记录:', action, data)
    // 这里可以上报到分析服务
    try {
      const userBehavior = wx.getStorageSync('userBehavior') || []
      userBehavior.push({
        action,
        data,
        timestamp: new Date().toISOString(),
        page: 'market-detail'
      })
      
      // 只保留最近100条记录
      if (userBehavior.length > 100) {
        userBehavior.splice(0, userBehavior.length - 100)
      }
      
      wx.setStorageSync('userBehavior', userBehavior)
    } catch (error) {
      console.error('记录用户行为失败:', error)
    }
  }
}) 