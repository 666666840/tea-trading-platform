Page({
  data: {
    // 页面状态
    loading: false,
    submitting: false,
    
    // 入驻套餐
    joinPackages: [
      {
        id: 'standard',
        name: '标准入驻',
        price: 3000,
        originalPrice: 4000,
        features: [
          '品牌认证标识',
          '首页推荐展示',
          '专属客服支持',
          '基础数据分析',
          '营销活动参与'
        ],
        popular: false
      },
      {
        id: 'premium',
        name: '高级入驻',
        price: 8000,
        originalPrice: 10000,
        features: [
          '标准入驻所有权益',
          '首页轮播位展示',
          '优先推荐排序',
          '详细数据分析报告',
          '专属营销活动',
          '品牌故事展示'
        ],
        popular: true
      },
      {
        id: 'vip',
        name: '特级入驻',
        price: 15000,
        originalPrice: 20000,
        features: [
          '高级入驻所有权益',
          '首页固定展示位',
          '最高推荐排序',
          '定制化数据分析',
          '专属品牌活动',
          '一对一客服',
          '品牌专访机会'
        ],
        popular: false
      }
    ],
    
    // 选中的套餐
    selectedPackage: 'premium',
    
    // 计算属性
    selectedPackageInfo: {
      name: '高级入驻',
      price: 8000
    },
    
    // 表单数据
    formData: {
      // 基本信息
      brandName: '',
      brandSlogan: '',
      foundedYear: '',
      headquarters: '',
      coreRegion: '',
      annualOutput: '',
      marketCoverage: '',
      
      // 联系信息
      contactName: '',
      contactPhone: '',
      contactWechat: '',
      contactEmail: '',
      
      // 企业信息
      companyName: '',
      businessLicense: '',
      trademarkCertificate: '',
      
      // 产品信息
      mainCategories: [],
      mainCategoriesText: '',
      productLines: [],
      productLinesText: '',
      certifications: [],
      
      // 品牌介绍
      brandDescription: '',
      
      // 图片资料
      brandLogo: '',
      brandImages: [],
      certificateImages: []
    },
    
    // 主营品类选项
    mainCategories: [
      '绿茶类', '白茶类', '黄茶类', '青茶（乌龙茶）类', '红茶类', '黑茶类', '花茶类'
    ],
    
    // 认证类型选项
    certificationOptions: [
      '地理标志', '中华老字号', '有机认证', '国品认证', 'ISO认证', 'HACCP认证', '绿色食品认证'
    ],
    
    // 表单验证错误
    formErrors: {},
    
    // 当前步骤
    currentStep: 1,
    totalSteps: 4,
    
    // 步骤标题
    stepTitles: [
      '选择套餐',
      '基本信息',
      '企业资质',
      '确认提交'
    ]
  },

  onLoad() {
    console.log('品牌入驻页面加载')
    this.initFormData()
  },

  // 初始化表单数据
  initFormData() {
    // 设置默认值
    this.setData({
      'formData.foundedYear': new Date().getFullYear().toString(),
      'formData.marketCoverage': '0'
    })
  },

  // 选择套餐
  selectPackage(e) {
    const packageId = e.currentTarget.dataset.id
    const selectedPackage = this.data.joinPackages.find(p => p.id === packageId)
    
    this.setData({
      selectedPackage: packageId,
      selectedPackageInfo: {
        name: selectedPackage.name,
        price: selectedPackage.price
      }
    })
  },

  // 下一步
  nextStep() {
    if (this.data.currentStep < this.data.totalSteps) {
      // 验证当前步骤
      if (this.validateCurrentStep()) {
        this.setData({
          currentStep: this.data.currentStep + 1
        })
      }
    }
  },

  // 上一步
  prevStep() {
    if (this.data.currentStep > 1) {
      this.setData({
        currentStep: this.data.currentStep - 1
      })
    }
  },

  // 验证当前步骤
  validateCurrentStep() {
    const errors = {}
    const { currentStep, formData } = this.data

    switch (currentStep) {
      case 1:
        // 套餐选择验证
        if (!this.data.selectedPackage) {
          errors.package = '请选择入驻套餐'
        }
        break
        
      case 2:
        // 基本信息验证
        if (!formData.brandName.trim()) {
          errors.brandName = '请输入品牌名称'
        }
        if (!formData.brandSlogan.trim()) {
          errors.brandSlogan = '请输入品牌口号'
        }
        if (!formData.foundedYear.trim()) {
          errors.foundedYear = '请输入创立年份'
        }
        if (!formData.headquarters.trim()) {
          errors.headquarters = '请输入总部地址'
        }
        if (!formData.coreRegion.trim()) {
          errors.coreRegion = '请输入核心产区'
        }
        if (!formData.contactName.trim()) {
          errors.contactName = '请输入联系人姓名'
        }
        if (!formData.contactPhone.trim()) {
          errors.contactPhone = '请输入联系电话'
        }
        break
        
      case 3:
        // 企业资质验证
        if (!formData.companyName.trim()) {
          errors.companyName = '请输入企业名称'
        }
        if (!formData.businessLicense.trim()) {
          errors.businessLicense = '请上传营业执照'
        }
        if (!formData.trademarkCertificate.trim()) {
          errors.trademarkCertificate = '请上传商标注册证'
        }
        if (formData.mainCategories.length === 0) {
          errors.mainCategories = '请选择主营品类'
        }
        break
    }

    this.setData({ formErrors: errors })
    return Object.keys(errors).length === 0
  },

  // 输入表单数据
  inputFormData(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`formData.${field}`]: value
    })
    
    // 特殊处理产品线
    if (field === 'productLines') {
      const productLines = value.split('、').filter(item => item.trim())
      this.setData({
        'formData.productLines': productLines,
        'formData.productLinesText': value
      })
    }
    
    // 清除对应错误
    if (this.data.formErrors[field]) {
      this.setData({
        [`formErrors.${field}`]: ''
      })
    }
  },

  // 选择主营品类
  selectMainCategory(e) {
    const category = e.currentTarget.dataset.category
    const { mainCategories } = this.data.formData
    const index = mainCategories.indexOf(category)
    
    if (index > -1) {
      mainCategories.splice(index, 1)
    } else {
      mainCategories.push(category)
    }
    
    this.setData({
      'formData.mainCategories': mainCategories,
      'formData.mainCategoriesText': mainCategories.join('、')
    })
  },

  // 选择认证类型
  selectCertification(e) {
    const certification = e.currentTarget.dataset.certification
    const { certifications } = this.data.formData
    const index = certifications.indexOf(certification)
    
    if (index > -1) {
      certifications.splice(index, 1)
    } else {
      certifications.push(certification)
    }
    
    this.setData({
      'formData.certifications': certifications
    })
  },

  // 上传品牌Logo
  uploadBrandLogo() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.brandLogo': res.tempFilePaths[0]
        })
      }
    })
  },

  // 上传品牌图片
  uploadBrandImages() {
    wx.chooseImage({
      count: 9 - this.data.formData.brandImages.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = this.data.formData.brandImages.concat(res.tempFilePaths)
        this.setData({
          'formData.brandImages': newImages
        })
      }
    })
  },

  // 删除品牌图片
  deleteBrandImage(e) {
    const index = e.currentTarget.dataset.index
    const { brandImages } = this.data.formData
    brandImages.splice(index, 1)
    this.setData({
      'formData.brandImages': brandImages
    })
  },

  // 上传营业执照
  uploadBusinessLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.businessLicense': res.tempFilePaths[0]
        })
      }
    })
  },

  // 上传商标注册证
  uploadTrademarkCertificate() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.trademarkCertificate': res.tempFilePaths[0]
        })
      }
    })
  },

  // 提交入驻申请
  submitApplication() {
    if (!this.validateCurrentStep()) {
      return
    }

    this.setData({ submitting: true })

    // 模拟提交
    setTimeout(() => {
      this.setData({ submitting: false })
      
      wx.showToast({
        title: '申请提交成功',
        icon: 'success'
      })
      
      // 跳转到申请结果页面
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/brand-join-result/brand-join-result'
        })
      }, 1500)
    }, 2000)
  },

  // 预览图片
  previewImage(e) {
    const { url, urls } = e.currentTarget.dataset
    wx.previewImage({
      current: url,
      urls: urls || [url]
    })
  },

  // 返回
  goBack() {
    wx.navigateBack()
  }
}) 