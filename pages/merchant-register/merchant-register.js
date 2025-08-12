const { Data } = require('../../utils/data-manager.js')
const { Image } = require('../../utils/image-manager.js')
const { Auth } = require('../../utils/auth-manager.js')

Page({
  data: {
    // 表单数据
    formData: {
      name: '',
      category: '',
      contact: '',
      phone: '',
      email: '',
      province: '',
      city: '',
      address: '',
      description: '',
      businessLicense: '',
      businessScope: '',
      establishYear: ''
    },

    // 图片数据
    images: {
      logo: '', // 商户logo
      storefront: [], // 店面照片
      license: '', // 营业执照
      certificates: [] // 其他证书
    },

    // 选项数据
    categories: [
      '茶叶批发商', '茶叶零售商', '茶园/茶厂', '品牌代理商',
      '茶具经销商', '包装材料商', '物流服务商', '其他'
    ],

    provinces: [
      '北京', '上海', '广东', '浙江', '福建', '江苏', '安徽',
      '河南', '湖南', '湖北', '四川', '云南', '贵州', '山东',
      '河北', '山西', '陕西', '甘肃', '青海', '宁夏', '新疆',
      '内蒙古', '辽宁', '吉林', '黑龙江', '江西', '广西',
      '海南', '重庆', '天津', '西藏', '香港', '澳门', '台湾'
    ],

    // 界面状态
    currentStep: 1, // 当前步骤 1-基本信息 2-详细信息 3-图片上传 4-确认提交
    totalSteps: 4,
    isSubmitting: false,
    showCategoryPicker: false,
    showProvincePicker: false,
    categoryIndex: -1,
    provinceIndex: -1,

    // 验证状态
    errors: {},
    touched: {}
  },

  onLoad() {
    // 检查登录状态
    const user = Auth.getCurrentUser()
    if (!user.isLoggedIn) {
      wx.showModal({
        title: '需要登录',
        content: '商户入驻需要先登录，是否前往登录？',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/profile/profile'
            })
          } else {
            wx.navigateBack()
          }
        }
      })
      return
    }

    this.initFormData()
  },

  // 初始化表单数据
  initFormData() {
    const user = Auth.getCurrentUser()
    if (user.userInfo) {
      this.setData({
        'formData.contact': user.userInfo.nickName || ''
      })
    }
  },

  // 表单输入处理
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`formData.${field}`]: value,
      [`touched.${field}`]: true
    })

    // 实时验证
    this.validateField(field, value)
  },

  // 字段验证
  validateField(field, value) {
    const errors = { ...this.data.errors }
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors[field] = '商户名称不能为空'
        } else if (value.length < 2) {
          errors[field] = '商户名称至少2个字符'
        } else {
          delete errors[field]
        }
        break
        
      case 'contact':
        if (!value.trim()) {
          errors[field] = '联系人不能为空'
        } else {
          delete errors[field]
        }
        break
        
      case 'phone':
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!value.trim()) {
          errors[field] = '联系电话不能为空'
        } else if (!phoneRegex.test(value)) {
          errors[field] = '请输入正确的手机号码'
        } else {
          delete errors[field]
        }
        break
        
      case 'email':
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errors[field] = '请输入正确的邮箱地址'
          } else {
            delete errors[field]
          }
        } else {
          delete errors[field]
        }
        break
        
      case 'address':
        if (!value.trim()) {
          errors[field] = '详细地址不能为空'
        } else if (value.length < 5) {
          errors[field] = '地址信息过于简单'
        } else {
          delete errors[field]
        }
        break
    }

    this.setData({ errors })
  },

  // 类别选择
  onCategoryPickerShow() {
    this.setData({ showCategoryPicker: true })
  },

  onCategoryPickerChange(e) {
    const index = e.detail.value
    this.setData({
      categoryIndex: index,
      'formData.category': this.data.categories[index],
      showCategoryPicker: false,
      'touched.category': true
    })
    this.validateField('category', this.data.categories[index])
  },

  onCategoryPickerCancel() {
    this.setData({ showCategoryPicker: false })
  },

  // 省份选择
  onProvincePickerShow() {
    this.setData({ showProvincePicker: true })
  },

  onProvincePickerChange(e) {
    const index = e.detail.value
    this.setData({
      provinceIndex: index,
      'formData.province': this.data.provinces[index],
      showProvincePicker: false,
      'touched.province': true
    })
  },

  onProvincePickerCancel() {
    this.setData({ showProvincePicker: false })
  },

  // 图片上传
  async uploadLogo() {
    try {
      const result = await Image.choose({
        count: 1,
        sizeType: ['compressed']
      })

      if (result.success && result.images.length > 0) {
        this.setData({
          'images.logo': result.images[0].compressedPath
        })
        
        wx.showToast({
          title: 'Logo上传成功',
          icon: 'success'
        })
      }

    } catch (error) {
      wx.showToast({
        title: '上传失败',
        icon: 'error'
      })
    }
  },

  async uploadStorefront() {
    try {
      const result = await Image.choose({
        count: 5,
        sizeType: ['compressed']
      })

      if (result.success && result.images.length > 0) {
        const currentImages = this.data.images.storefront
        const newImages = result.images.map(img => img.compressedPath)
        
        this.setData({
          'images.storefront': [...currentImages, ...newImages].slice(0, 6)
        })
        
        wx.showToast({
          title: `已上传${result.images.length}张照片`,
          icon: 'success'
        })
      }

    } catch (error) {
      wx.showToast({
        title: '上传失败',
        icon: 'error'
      })
    }
  },

  async uploadLicense() {
    try {
      const result = await Image.choose({
        count: 1,
        sizeType: ['compressed']
      })

      if (result.success && result.images.length > 0) {
        this.setData({
          'images.license': result.images[0].compressedPath
        })
        
        wx.showToast({
          title: '营业执照上传成功',
          icon: 'success'
        })
      }

    } catch (error) {
      wx.showToast({
        title: '上传失败',
        icon: 'error'
      })
    }
  },

  // 删除图片
  deleteStorefrontImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images.storefront
    images.splice(index, 1)
    
    this.setData({
      'images.storefront': images
    })
  },

  deleteLogo() {
    this.setData({
      'images.logo': ''
    })
  },

  deleteLicense() {
    this.setData({
      'images.license': ''
    })
  },

  // 预览图片
  previewImage(e) {
    const { src, list } = e.currentTarget.dataset
    if (list) {
      Image.preview(this.data.images[list], src)
    } else {
      Image.preview([src])
    }
  },

  // 步骤控制
  nextStep() {
    if (!this.validateCurrentStep()) {
      return
    }

    if (this.data.currentStep < this.data.totalSteps) {
      this.setData({
        currentStep: this.data.currentStep + 1
      })
    }
  },

  prevStep() {
    if (this.data.currentStep > 1) {
      this.setData({
        currentStep: this.data.currentStep - 1
      })
    }
  },

  // 验证当前步骤
  validateCurrentStep() {
    const { currentStep } = this.data
    let isValid = true

    switch (currentStep) {
      case 1: // 基本信息
        const basicFields = ['name', 'category', 'contact', 'phone']
        basicFields.forEach(field => {
          this.validateField(field, this.data.formData[field])
        })
        isValid = basicFields.every(field => !this.data.errors[field])
        break

      case 2: // 详细信息
        const detailFields = ['province', 'address']
        detailFields.forEach(field => {
          this.validateField(field, this.data.formData[field])
        })
        isValid = detailFields.every(field => !this.data.errors[field])
        break

      case 3: // 图片上传
        if (!this.data.images.logo) {
          wx.showToast({
            title: '请上传商户Logo',
            icon: 'none'
          })
          isValid = false
        }
        break
    }

    if (!isValid) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
    }

    return isValid
  },

  // 提交申请
  async submitApplication() {
    if (!this.validateCurrentStep()) {
      return
    }

    wx.showModal({
      title: '确认提交',
      content: '确认提交商户入驻申请？提交后我们将在3个工作日内审核。',
      success: async (res) => {
        if (res.confirm) {
          await this.doSubmit()
        }
      }
    })
  },

  async doSubmit() {
    try {
      this.setData({ isSubmitting: true })
      
      wx.showLoading({
        title: '提交中...'
      })

      // 准备提交数据
      const submitData = {
        ...this.data.formData,
        images: this.data.images,
        applicant: Auth.getCurrentUser().userInfo,
        submitTime: new Date().toISOString()
      }

      // 提交到数据管理器
      const result = await Data.addMerchant(submitData)

      if (result.success) {
        wx.hideLoading()
        
        wx.showModal({
          title: '申请提交成功',
          content: `您的商户入驻申请已提交，申请编号：${result.merchantId}。我们将在3个工作日内完成审核，请耐心等待。`,
          showCancel: false,
          confirmText: '确定',
          success: () => {
            // 跳转到申请状态页面
            wx.redirectTo({
              url: `/pages/merchant-status/merchant-status?id=${result.merchantId}`
            })
          }
        })
      }

    } catch (error) {
      wx.hideLoading()
      console.error('提交申请失败:', error)
      
      wx.showModal({
        title: '提交失败',
        content: error.message || '提交过程中出现问题，请稍后重试',
        showCancel: false
      })
    } finally {
      this.setData({ isSubmitting: false })
    }
  },

  // 保存草稿
  saveDraft() {
    try {
      const draftData = {
        formData: this.data.formData,
        images: this.data.images,
        currentStep: this.data.currentStep,
        saveTime: new Date().toISOString()
      }

      wx.setStorageSync('merchantRegisterDraft', draftData)
      
      wx.showToast({
        title: '草稿已保存',
        icon: 'success'
      })

    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  },

  // 加载草稿
  loadDraft() {
    try {
      const draftData = wx.getStorageSync('merchantRegisterDraft')
      
      if (draftData) {
        wx.showModal({
          title: '发现草稿',
          content: `发现${new Date(draftData.saveTime).toLocaleString()}保存的草稿，是否加载？`,
          success: (res) => {
            if (res.confirm) {
              this.setData({
                formData: draftData.formData,
                images: draftData.images,
                currentStep: draftData.currentStep
              })
              
              wx.showToast({
                title: '草稿已加载',
                icon: 'success'
              })
            }
          }
        })
      }

    } catch (error) {
      console.error('加载草稿失败:', error)
    }
  },

  // 清除草稿
  clearDraft() {
    try {
      wx.removeStorageSync('merchantRegisterDraft')
    } catch (error) {
      console.error('清除草稿失败:', error)
    }
  },

  // 页面离开时保存草稿
  onUnload() {
    this.saveDraft()
  },

  onShow() {
    // 页面显示时检查草稿
    if (this.data.currentStep === 1 && !this.data.formData.name) {
      this.loadDraft()
    }
  }
}) 