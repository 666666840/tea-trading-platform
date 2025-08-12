Page({
  data: {
    // 表单数据
    formData: {
      name: '',
      location: '',
      area: '',
      areaUnit: '亩',
      teaTypes: [], // 改为数组，支持多选
      harvestPeriod: '',
      features: [],
      description: '',
      images: [],
      price: '',
      priceUnit: '元/斤',
      minOrder: '',
      delivery: '48小时内发货',
      guarantee: '7天无理由退换',
      payment: ['现金', '银行转账', '微信支付']
    },
    
    // 茶叶类型选项（多选）
    teaTypeOptions: [
      '红茶', '绿茶', '青茶', '黄茶', '黑茶', '白茶', '花茶'
    ],
    
    // 特色标签选项
    featureOptions: [
      '明前采摘', '核心产区', '荒野老枞', '有机认证', '传统工艺', '生态种植', 
      '古树茶', '手工炒制', '地理标志', '无农药', '无添加', '品质保证'
    ],
    
    // 面积单位选项
    areaUnits: ['亩', '公顷', '平方米'],
    
    // 价格单位选项
    priceUnits: ['元/斤', '元/公斤', '元/克'],
    
    // 发货时间选项
    deliveryOptions: [
      '24小时内发货', '48小时内发货', '72小时内发货', '一周内发货'
    ],
    
    // 保障选项
    guaranteeOptions: [
      '7天无理由退换', '15天无理由退换', '30天无理由退换', '无退换'
    ],
    
    // 支付方式选项
    paymentOptions: [
      '现金', '银行转账', '微信支付', '支付宝', '货到付款'
    ],
    
    // 表单验证状态
    validation: {
      name: { valid: true, message: '' },
      location: { valid: true, message: '' },
      area: { valid: true, message: '' },
      teaTypes: { valid: true, message: '' }, // 改为teaTypes
      harvestPeriod: { valid: true, message: '' },
      price: { valid: true, message: '' },
      minOrder: { valid: true, message: '' }
    },
    
    // 提交状态
    submitting: false,
    
    // 当前步骤
    currentStep: 1,
    totalSteps: 3
  },

  onLoad() {
    console.log('茶园发布页面加载完成')
    
    // 强制初始化数据
    this.setData({
      'formData.teaTypes': [],
      'formData.features': []
    })
    
    console.log('数据初始化完成:', this.data.formData)
  },

  // 输入框变化
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`formData.${field}`]: value
    })
    
    // 实时验证
    this.validateField(field, value)
  },

  // 选择器变化
  onPickerChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    let selectedValue = ''
    let selectedLabel = ''
    
    switch (field) {
      case 'areaUnit':
        selectedValue = this.data.areaUnits[value]
        break
      case 'priceUnit':
        selectedValue = this.data.priceUnits[value]
        break
      case 'delivery':
        selectedValue = this.data.deliveryOptions[value]
        break
      case 'guarantee':
        selectedValue = this.data.guaranteeOptions[value]
        break
    }
    
    this.setData({
      [`formData.${field}`]: selectedValue
    })
  },

  // 多选器变化
  onMultiPickerChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    let selectedValues = []
    
    switch (field) {
      case 'payment':
        selectedValues = value.map(index => this.data.paymentOptions[index])
        break
    }
    
    this.setData({
      [`formData.${field}`]: selectedValues
    })
  },

  // 特色标签切换
  onFeatureToggle(e) {
    try {
      console.log('=== 特色标签点击事件触发 ===')
      console.log('事件对象:', e)
      
      // 获取选中的特色标签
      const feature = e.currentTarget.dataset.feature
      console.log('选中的特色标签:', feature)
      
      if (!feature) {
        console.error('特色标签数据为空')
        wx.showToast({
          title: '数据错误，请重试',
          icon: 'none'
        })
        return
      }
      
      // 获取当前数据，确保是数组
      let currentFeatures = this.data.formData.features
      if (!Array.isArray(currentFeatures)) {
        console.warn('当前特色标签不是数组，重置为空数组')
        currentFeatures = []
      }
      console.log('当前特色标签:', currentFeatures)
      
      // 检查是否已经选中
      const index = currentFeatures.indexOf(feature)
      let newFeatures = []
      
      if (index > -1) {
        // 如果已经选中，则移除
        newFeatures = currentFeatures.filter(item => item !== feature)
        console.log('移除特色标签:', feature)
      } else {
        // 如果未选中，则添加（最多6个）
        if (currentFeatures.length < 6) {
          newFeatures = [...currentFeatures, feature]
          console.log('添加特色标签:', feature)
        } else {
          wx.showToast({
            title: '最多选择6个特色标签',
            icon: 'none'
          })
          return
        }
      }
      
      console.log('更新后的特色标签:', newFeatures)
      
      // 更新数据
      this.setData({
        'formData.features': newFeatures
      }, () => {
        // 在setData回调中确认数据已更新
        console.log('数据更新完成，当前特色标签:', this.data.formData.features)
        
        // 显示成功提示
        wx.showToast({
          title: newFeatures.length > 0 ? '选择成功' : '已取消选择',
          icon: 'success',
          duration: 1000
        })
      })
      
    } catch (error) {
      console.error('特色标签切换错误:', error)
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      })
    }
  },

  // 茶叶类型切换
  onTeaTypeToggle(e) {
    try {
      console.log('=== 茶叶类型点击事件触发 ===')
      console.log('事件对象:', e)
      
      // 获取选中的茶叶类型
      const teaType = e.currentTarget.dataset.teaType
      console.log('选中的茶叶类型:', teaType)
      
      if (!teaType) {
        console.error('茶叶类型数据为空')
        wx.showToast({
          title: '数据错误，请重试',
          icon: 'none'
        })
        return
      }
      
      // 获取当前数据，确保是数组
      let currentTeaTypes = this.data.formData.teaTypes
      if (!Array.isArray(currentTeaTypes)) {
        console.warn('当前茶叶类型不是数组，重置为空数组')
        currentTeaTypes = []
      }
      console.log('当前茶叶类型:', currentTeaTypes)
      
      // 检查是否已经选中
      const index = currentTeaTypes.indexOf(teaType)
      let newTeaTypes = []
      
      if (index > -1) {
        // 如果已经选中，则移除
        newTeaTypes = currentTeaTypes.filter(item => item !== teaType)
        console.log('移除茶叶类型:', teaType)
      } else {
        // 如果未选中，则添加
        newTeaTypes = [...currentTeaTypes, teaType]
        console.log('添加茶叶类型:', teaType)
      }
      
      console.log('更新后的茶叶类型:', newTeaTypes)
      
      // 强制更新数据
      this.setData({
        'formData.teaTypes': newTeaTypes
      }, () => {
        // 在setData回调中确认数据已更新
        console.log('数据更新完成，当前茶叶类型:', this.data.formData.teaTypes)
        
        // 显示成功提示
        wx.showToast({
          title: newTeaTypes.length > 0 ? '选择成功' : '已取消选择',
          icon: 'success',
          duration: 1000
        })
        
        // 实时验证
        this.validateField('teaTypes', newTeaTypes)
      })
      
    } catch (error) {
      console.error('茶叶类型切换错误:', error)
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      })
    }
  },

  // 清空茶叶类型选择
  clearTeaTypes() {
    this.setData({
      'formData.teaTypes': []
    })
    this.validateField('teaTypes', [])
    
    wx.showToast({
      title: '已清空选择',
      icon: 'success'
    })
  },

  // 清空特色标签选择
  clearFeatures() {
    this.setData({
      'formData.features': []
    })
    
    wx.showToast({
      title: '已清空选择',
      icon: 'success'
    })
  },

  // 全选茶叶类型
  selectAllTeaTypes() {
    this.setData({
      'formData.teaTypes': [...this.data.teaTypeOptions]
    })
    this.validateField('teaTypes', this.data.teaTypeOptions)
    
    wx.showToast({
      title: '已全选',
      icon: 'success'
    })
  },

  // 上传图片
  chooseImage() {
    const { images } = this.data.formData
    
    if (images.length >= 9) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      })
      return
    }
    
    wx.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...images, ...res.tempFilePaths]
        this.setData({
          'formData.images': newImages
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const { index } = e.currentTarget.dataset
    const images = [...this.data.formData.images]
    images.splice(index, 1)
    
    this.setData({
      'formData.images': images
    })
  },

  // 预览图片
  previewImage(e) {
    const { current } = e.currentTarget.dataset
    const { images } = this.data.formData
    
    wx.previewImage({
      current: current,
      urls: images
    })
  },

  // 选择位置
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          'formData.location': res.address
        })
        this.validateField('location', res.address)
      },
      fail: () => {
        wx.showToast({
          title: '请允许位置权限',
          icon: 'none'
        })
      }
    })
  },

  // 字段验证
  validateField(field, value) {
    let valid = true
    let message = ''
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          valid = false
          message = '请输入茶园名称'
        } else if (value.length < 2) {
          valid = false
          message = '茶园名称至少2个字符'
        }
        break
        
      case 'location':
        if (!value.trim()) {
          valid = false
          message = '请选择茶园位置'
        }
        break
        
      case 'area':
        if (!value.trim()) {
          valid = false
          message = '请输入种植面积'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          valid = false
          message = '请输入有效的面积数值'
        }
        break
        
      case 'teaTypes':
        if (!value.length) {
          valid = false
          message = '请选择茶叶类型'
        }
        break
        
      case 'harvestPeriod':
        if (!value.trim()) {
          valid = false
          message = '请输入采摘期'
        }
        break
        
      case 'price':
        if (!value.trim()) {
          valid = false
          message = '请输入价格'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          valid = false
          message = '请输入有效的价格'
        }
        break
        
      case 'minOrder':
        if (!value.trim()) {
          valid = false
          message = '请输入起订量'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          valid = false
          message = '请输入有效的起订量'
        }
        break
    }
    
    this.setData({
      [`validation.${field}`]: { valid, message }
    })
    
    return valid
  },

  // 验证所有字段
  validateAll() {
    const { formData } = this.data
    const fields = ['name', 'location', 'area', 'teaTypes', 'harvestPeriod', 'price', 'minOrder']
    let allValid = true
    
    fields.forEach(field => {
      if (!this.validateField(field, formData[field])) {
        allValid = false
      }
    })
    
    return allValid
  },

  // 下一步
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
    const { currentStep, formData } = this.data
    
    switch (currentStep) {
      case 1:
        return this.validateField('name', formData.name) &&
               this.validateField('location', formData.location) &&
               this.validateField('area', formData.area) &&
               this.validateField('teaTypes', formData.teaTypes)
      case 2:
        return this.validateField('harvestPeriod', formData.harvestPeriod) &&
               this.validateField('price', formData.price) &&
               this.validateField('minOrder', formData.minOrder)
      case 3:
        return formData.images.length > 0
    }
    
    return true
  },

  // 提交表单
  submitForm() {
    if (!this.validateAll()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }
    
    if (this.data.formData.images.length === 0) {
      wx.showToast({
        title: '请至少上传一张茶园图片',
        icon: 'none'
      })
      return
    }
    
    this.setData({ submitting: true })
    
    // 模拟提交
    wx.showLoading({ title: '发布中...' })
    
    setTimeout(() => {
      wx.hideLoading()
      this.setData({ submitting: false })
      
      wx.showModal({
        title: '发布成功',
        content: '茶园信息已提交审核，审核通过后将展示在茶园直通页面',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }, 2000)
  },

  // 保存草稿
  saveDraft() {
    wx.showToast({
      title: '草稿已保存',
      icon: 'success'
    })
  },

  // 重置表单
  resetForm() {
    wx.showModal({
      title: '确认重置',
      content: '确定要清空所有已填写的信息吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            formData: {
              name: '',
              location: '',
              area: '',
              areaUnit: '亩',
              teaTypes: [], // 改为数组，支持多选
              harvestPeriod: '',
              features: [],
              description: '',
              images: [],
              price: '',
              priceUnit: '元/斤',
              minOrder: '',
              delivery: '48小时内发货',
              guarantee: '7天无理由退换',
              payment: ['现金', '银行转账', '微信支付']
            },
            currentStep: 1
          })
        }
      }
    })
  }
}) 