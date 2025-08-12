Page({
  data: {
    // 表单数据
    formData: {
      shopLogo: '',
      shopName: '',
      businessType: '',
      address: {
        province: '',
        city: '',
        district: '',
        detail: ''
      },
      mainMarket: '',
      mainCategory: '',
      phone: '',
      verifyCode: ''
    },
    
    // 经营类型选项
    businessTypes: [
      '茶厂',
      '茶园', 
      '一级批发商',
      '品牌总代',
      '区域分销商',
      '源头供应商'
    ],
    
    // 主营品类选项
    teaCategories: {
      '绿茶类': [],
      '红茶类': ['金骏眉', '正山小种', '祁门红茶', '滇红', '宁红'],
      '乌龙茶类': ['铁观音', '大红袍', '凤凰单丛', '冻顶乌龙', '水仙'],
      '白茶类': ['白毫银针', '白牡丹', '寿眉', '贡眉'],
      '黑茶类': ['普洱茶', '安化黑茶', '六堡茶', '茯砖茶'],
      '黄茶类': ['君山银针', '蒙顶黄芽', '霍山黄芽'],
      '普洱茶类': ['生普', '熟普', '山头茶', '古树茶', '台地茶']
    },
    
    // 批发市场选项
    markets: [
      '杭州茶叶市场',
      '广州芳村茶叶市场',
      '北京马连道茶叶市场',
      '上海大宁国际茶城',
      '成都五块石茶叶市场',
      '其他'
    ],
    
    // 表单验证状态
    formErrors: {},
    
    // 手机验证码倒计时
    countdown: 0,
    
    // 当前步骤
    currentStep: 1,
    totalSteps: 3
  },

  onLoad() {
    console.log('创建店铺页面加载完成')
  },

  // 选择店铺Logo
  onLogoSelect() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          'formData.shopLogo': tempFilePath
        })
      }
    })
  },

  // 输入店铺名称
  onShopNameInput(e) {
    this.setData({
      'formData.shopName': e.detail.value
    })
    this.validateField('shopName', e.detail.value)
  },

  // 选择经营类型
  onBusinessTypeChange(e) {
    this.setData({
      'formData.businessType': this.data.businessTypes[e.detail.value]
    })
  },

  // 选择地区
  onRegionChange(e) {
    const { province, city, district } = e.detail.value
    this.setData({
      'formData.address.province': province,
      'formData.address.city': city,
      'formData.address.district': district
    })
  },

  // 输入详细地址
  onDetailAddressInput(e) {
    this.setData({
      'formData.address.detail': e.detail.value
    })
  },

  // 选择批发市场
  onMarketChange(e) {
    this.setData({
      'formData.mainMarket': this.data.markets[e.detail.value]
    })
  },

  // 选择主营品类
  onCategoryChange(e) {
    this.setData({
      'formData.mainCategory': e.detail.value
    })
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({
      'formData.phone': e.detail.value
    })
    this.validateField('phone', e.detail.value)
  },

  // 输入验证码
  onVerifyCodeInput(e) {
    this.setData({
      'formData.verifyCode': e.detail.value
    })
  },

  // 发送验证码
  onSendCode() {
    const phone = this.data.formData.phone
    if (!this.validatePhone(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    // 开始倒计时
    this.setData({
      countdown: 60
    })
    
    const timer = setInterval(() => {
      if (this.data.countdown > 0) {
        this.setData({
          countdown: this.data.countdown - 1
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    // 模拟发送验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  },

  // 下一步
  onNextStep() {
    if (this.validateCurrentStep()) {
      if (this.data.currentStep < this.data.totalSteps) {
        this.setData({
          currentStep: this.data.currentStep + 1
        })
      } else {
        this.submitForm()
      }
    }
  },

  // 上一步
  onPrevStep() {
    if (this.data.currentStep > 1) {
      this.setData({
        currentStep: this.data.currentStep - 1
      })
    }
  },

  // 验证当前步骤
  validateCurrentStep() {
    const { currentStep, formData } = this.data
    const errors = {}

    if (currentStep === 1) {
      if (!formData.shopLogo) {
        errors.shopLogo = '请上传店铺Logo'
      }
      if (!formData.shopName.trim()) {
        errors.shopName = '请输入店铺名称'
      }
      if (!formData.businessType) {
        errors.businessType = '请选择经营类型'
      }
    } else if (currentStep === 2) {
      if (!formData.address.province || !formData.address.city || !formData.address.district) {
        errors.address = '请选择完整地址'
      }
      if (!formData.address.detail.trim()) {
        errors.detailAddress = '请输入详细地址'
      }
    } else if (currentStep === 3) {
      if (!formData.phone) {
        errors.phone = '请输入手机号'
      } else if (!this.validatePhone(formData.phone)) {
        errors.phone = '请输入正确的手机号'
      }
      if (!formData.verifyCode) {
        errors.verifyCode = '请输入验证码'
      }
    }

    this.setData({
      formErrors: errors
    })

    return Object.keys(errors).length === 0
  },

  // 验证手机号
  validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  },

  // 验证字段
  validateField(field, value) {
    const errors = { ...this.data.formErrors }
    
    if (field === 'shopName') {
      if (!value.trim()) {
        errors.shopName = '请输入店铺名称'
      } else {
        delete errors.shopName
      }
    } else if (field === 'phone') {
      if (!value) {
        errors.phone = '请输入手机号'
      } else if (!this.validatePhone(value)) {
        errors.phone = '请输入正确的手机号'
      } else {
        delete errors.phone
      }
    }

    this.setData({
      formErrors: errors
    })
  },

  // 提交表单
  submitForm() {
    wx.showLoading({
      title: '创建中...'
    })

    // 模拟创建店铺
    setTimeout(() => {
      wx.hideLoading()
      
      // 保存店铺信息
      const shopInfo = {
        hasShop: true,
        shopLogo: this.data.formData.shopLogo,
        shopName: this.data.formData.shopName,
        shopType: this.data.formData.businessType,
        shopAddress: `${this.data.formData.address.province}${this.data.formData.address.city}${this.data.formData.address.district}${this.data.formData.address.detail}`,
        mainMarket: this.data.formData.mainMarket,
        mainCategory: this.data.formData.mainCategory,
        phoneVerified: true
      }
      
      wx.setStorageSync('shopInfo', shopInfo)
      
      wx.showToast({
        title: '店铺创建成功',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 2000)
  }
}) 