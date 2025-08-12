const { API } = require('../../utils/api-manager')

Page({
  data: {
    // 页面状态
    loading: false,
    // apiBase字段已废弃，统一用API.getBrands()
    
    // 用户位置
    userLocation: null,
    locationAuthorized: false,
    
    // 筛选条件
    filters: {
      category: '全部茶类',
      region: '全部地区',
      certification: '全部认证'
    },
    
    // 茶类分类
    teaCategories: [
      '全部茶类', '绿茶', '白茶', '黄茶', '青茶（乌龙茶）', '红茶', '黑茶', '花茶'
    ],
    
    // 地区分类
    regions: [
      '全部地区', '云南', '福建', '浙江', '安徽', '四川', '贵州', '湖南', '湖北', '江西', '广东', '广西'
    ],
    
    // 认证类型
    certifications: [
      '全部认证', '地理标志', '中华老字号', '有机认证', '国品认证'
    ],
    
    // 品牌数据 - 已清空示例数据，等待真实数据输入
    brands: [],
    
    // 筛选后的品牌数据
    filteredBrands: [],
    
    // 显示筛选面板
    showFilterPanel: false,
    
    // 当前选中的品牌
    selectedBrand: null,
    
    // 显示品牌详情
    showBrandDetail: false,
    
    // 显示经销商地图
    showDealerMap: false,
    
    // 申请认领表单
    claimForm: {
      wechatName: '',
      realName: '',
      phone: '',
      merchantName: '',
      companyName: '',
      license: ''
    },
    
    // 显示认领申请
    showClaimForm: false
  },

  onLoad() {
    console.log('品牌货页面加载')
    this.initLocation()
    this.loadBrandData()
  },

  // 加载品牌数据
  async loadBrandData() {
    this.setData({ loading: true })
    
    try {
      // 构建筛选参数
      const filters = {}
      if (this.data.filters.category !== '全部茶类') {
        filters.category = this.data.filters.category
      }
      if (this.data.filters.region !== '全部地区') {
        filters.region = this.data.filters.region
      }
      if (this.data.filters.certification !== '全部认证') {
        filters.certification = this.data.filters.certification
      }
      
      const res = await API.getBrands(filters)
      if (res.status === 'success') {
        this.setData({
          brands: res.data || [],
          loading: false
        })
        this.filterBrands()
      } else {
        this.setData({ loading: false })
        this.filterBrands()
      }
    } catch (err) {
      console.log('API加载失败，使用本地数据:', err)
      this.setData({ loading: false })
      this.filterBrands()
    }
  },

  onShow() {
    console.log('品牌货页面显示')
  },

  // 初始化位置信息
  initLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          userLocation: res,
          locationAuthorized: true
        })
        console.log('获取位置成功:', res)
        this.updateDealerDistances()
      },
      fail: (err) => {
        console.log('获取位置失败:', err)
        this.setData({
          locationAuthorized: false
        })
      }
    })
  },

  // 更新经销商距离
  updateDealerDistances() {
    if (!this.data.userLocation) return
    
    const brands = this.data.brands.map(brand => {
      const dealers = brand.dealers.map(dealer => {
        // 简单计算距离（实际应用中应使用更精确的算法）
        const distance = Math.sqrt(
          Math.pow(dealer.coordinates.latitude - this.data.userLocation.latitude, 2) +
          Math.pow(dealer.coordinates.longitude - this.data.userLocation.longitude, 2)
        ) * 111 // 粗略转换为公里
        return { ...dealer, distance: Math.round(distance * 10) / 10 }
      })
      
      // 按距离排序
      dealers.sort((a, b) => a.distance - b.distance)
      
      return { ...brand, dealers }
    })
    
    this.setData({ brands })
    this.filterBrands()
  },

  // 筛选品牌
  filterBrands() {
    let filtered = this.data.brands
    
    // 按茶类筛选
    if (this.data.filters.category !== '全部茶类') {
      filtered = filtered.filter(brand => 
        brand.productLines.includes(this.data.filters.category)
      )
    }
    
    // 按地区筛选
    if (this.data.filters.region !== '全部地区') {
      filtered = filtered.filter(brand => 
        brand.coreRegion.includes(this.data.filters.region)
      )
    }
    
    // 按认证筛选
    if (this.data.filters.certification !== '全部认证') {
      filtered = filtered.filter(brand => 
        brand.certifications.includes(this.data.filters.certification)
      )
    }
    
    this.setData({
      filteredBrands: filtered
    })
  },

  // 切换筛选面板
  toggleFilterPanel() {
    this.setData({
      showFilterPanel: !this.data.showFilterPanel
    })
  },

  // 选择筛选条件
  selectFilter(e) {
    const { type, value } = e.currentTarget.dataset
    this.setData({
      [`filters.${type}`]: value,
      showFilterPanel: false
    })
    this.loadBrandData() // 重新加载数据
  },

  // 查看品牌详情
  viewBrandDetail(e) {
    const brandId = e.currentTarget.dataset.id
    const brand = this.data.brands.find(b => b.id === brandId)
    
    this.setData({
      selectedBrand: brand,
      showBrandDetail: true
    })
  },

  // 关闭品牌详情
  closeBrandDetail() {
    this.setData({
      showBrandDetail: false,
      selectedBrand: null
    })
  },

  // 查看经销商地图
  viewDealerMap(e) {
    const brandId = e.currentTarget.dataset.id
    const brand = this.data.brands.find(b => b.id === brandId)
    
    this.setData({
      selectedBrand: brand,
      showDealerMap: true
    })
  },

  // 关闭经销商地图
  closeDealerMap() {
    this.setData({
      showDealerMap: false,
      selectedBrand: null
    })
  },

  // 申请品牌认领
  applyBrandClaim(e) {
    const brandId = e.currentTarget.dataset.id
    const brand = this.data.brands.find(b => b.id === brandId)
    
    this.setData({
      selectedBrand: brand,
      showClaimForm: true
    })
  },

  // 关闭认领申请
  closeClaimForm() {
    this.setData({
      showClaimForm: false,
      selectedBrand: null,
      claimForm: {
        wechatName: '',
        realName: '',
        phone: '',
        merchantName: '',
        companyName: '',
        license: ''
      }
    })
  },

  // 输入认领表单
  inputClaimForm(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`claimForm.${field}`]: value
    })
  },

  // 提交认领申请
  submitClaimForm() {
    const { claimForm, selectedBrand } = this.data
    
    // 验证表单
    if (!claimForm.wechatName || !claimForm.realName || !claimForm.phone || !claimForm.merchantName) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 模拟提交
    wx.showLoading({
      title: '提交中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '申请提交成功',
        icon: 'success'
      })
      
      this.closeClaimForm()
    }, 2000)
  },

  // 联系经销商
  contactDealer(e) {
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  // 导航到经销商
  navigateToDealer(e) {
    const { coordinates, name } = e.currentTarget.dataset
    
    wx.openLocation({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      name: name,
      scale: 15
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '知名品牌茶叶 - 品质保证',
      path: '/pages/brand/brand',
      imageUrl: '/images/share-brand.jpg'
    }
  },

  // 显示品牌入驻信息
  showJoinInfo() {
    wx.showModal({
      title: '品牌入驻',
      content: '品牌入驻流程：\n\n1. 电脑端登录平台\n2. 进入"品牌合作"频道\n3. 上传营业执照+商标注册证\n4. 缴纳3000元年费\n5. 平台48小时内人工审核\n\n特权政策：\n• 省级以上农业龙头企业\n• 中华老字号\n• 免年费 + "国品认证"勋章\n• 首页轮播位展示',
      showCancel: true,
      cancelText: '了解更多',
      confirmText: '立即入驻',
      success: (res) => {
        if (res.confirm) {
          // 跳转到品牌入驻页面
          this.navigateToBrandJoin()
        } else if (res.cancel) {
          // 显示更详细的入驻信息
          this.showDetailedJoinInfo()
        }
      }
    })
  },

  // 跳转到品牌入驻页面
  navigateToBrandJoin() {
    wx.navigateTo({
      url: '/pages/brand-join/brand-join'
    })
  },

  // 显示详细的入驻信息
  showDetailedJoinInfo() {
    wx.showModal({
      title: '品牌入驻详情',
      content: '入驻条件：\n• 拥有注册商标\n• 具备营业执照\n• 年销售额100万以上\n• 有稳定的供应链\n\n入驻权益：\n• 品牌认证标识\n• 首页推荐展示\n• 专属客服支持\n• 数据分析报告\n• 营销活动优先\n\n入驻费用：\n• 标准入驻：3000元/年\n• 高级入驻：8000元/年\n• 特级入驻：15000元/年',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止事件冒泡
  }
}) 