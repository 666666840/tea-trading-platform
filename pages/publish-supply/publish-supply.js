// pages/publish-supply/publish-supply.js
Page({
  data: {
    // 表单数据
    formData: {
      title: '',
      teaTypes: [], // 茶叶类型多选
      customTeaType: '', // 自定义茶叶类型
      origin: '',
      grade: '',
      harvestTime: '',
      features: [], // 特色标签多选
      description: '',
      images: [],
      price: '',
      priceUnit: '元/斤',
      quantity: '',
      quantityUnit: '斤',
      delivery: '48小时内发货',
      guarantee: '7天无理由退换',
      payment: ['现金', '银行转账', '微信支付'],
      contact: '',
      phone: ''
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
    
    // 等级选项
    gradeOptions: [
      '特级', '一级', '二级', '三级', '四级', '五级'
    ],
    
    // 采摘时间选项
    harvestTimeOptions: [
      '明前茶', '雨前茶', '春茶', '夏茶', '秋茶', '冬茶'
    ],
    
    // 价格单位选项
    priceUnits: ['元/斤', '元/公斤', '元/克', '元/两'],
    
    // 数量单位选项
    quantityUnits: ['斤', '公斤', '克', '两', '饼', '砖', '沱'],
    
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
      title: { valid: true, message: '' },
      teaTypes: { valid: true, message: '' },
      origin: { valid: true, message: '' },
      grade: { valid: true, message: '' },
      price: { valid: true, message: '' },
      quantity: { valid: true, message: '' },
      contact: { valid: true, message: '' },
      phone: { valid: true, message: '' }
    },
    
    // 提交状态
    submitting: false
  },

  onLoad() {
    console.log('发布供应页面加载完成')
    
    // 初始化数据
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
    
    switch (field) {
      case 'grade':
        selectedValue = this.data.gradeOptions[value]
        break
      case 'harvestTime':
        selectedValue = this.data.harvestTimeOptions[value]
        break
      case 'priceUnit':
        selectedValue = this.data.priceUnits[value]
        break
      case 'quantityUnit':
        selectedValue = this.data.quantityUnits[value]
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

  // 清空茶叶类型选择
  clearTeaTypes() {
    this.setData({
      'formData.teaTypes': [],
      'formData.customTeaType': ''
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

  // 添加自定义茶叶类型
  addCustomTeaType() {
    const customType = this.data.formData.customTeaType.trim()
    
    if (!customType) {
      wx.showToast({
        title: '请输入茶叶类型',
        icon: 'none'
      })
      return
    }
    
    // 检查是否已经存在
    const teaTypes = this.data.formData.teaTypes
    if (teaTypes.indexOf(customType) > -1) {
      wx.showToast({
        title: '该茶叶类型已存在',
        icon: 'none'
      })
      return
    }
    
    // 添加到茶叶类型列表
    const newTeaTypes = [...teaTypes, customType]
    this.setData({
      'formData.teaTypes': newTeaTypes,
      'formData.customTeaType': '' // 清空输入框
    })
    
    // 验证字段
    this.validateField('teaTypes', newTeaTypes)
    
    wx.showToast({
      title: '已添加自定义类型',
      icon: 'success'
    })
    
    console.log('添加自定义茶叶类型:', customType, '当前茶叶类型:', newTeaTypes)
  },

  // 添加自定义茶叶类型
  addCustomTeaType() {
    const customType = this.data.formData.customTeaType.trim()
    
    if (!customType) {
      wx.showToast({
        title: '请输入茶叶类型',
        icon: 'none'
      })
      return
    }
    
    // 检查是否已经存在
    const teaTypes = this.data.formData.teaTypes
    if (teaTypes.indexOf(customType) > -1) {
      wx.showToast({
        title: '该茶叶类型已存在',
        icon: 'none'
      })
      return
    }
    
    // 添加到茶叶类型列表
    const newTeaTypes = [...teaTypes, customType]
    this.setData({
      'formData.teaTypes': newTeaTypes,
      'formData.customTeaType': '' // 清空输入框
    })
    
    // 验证字段
    this.validateField('teaTypes', newTeaTypes)
    
    wx.showToast({
      title: '已添加自定义类型',
      icon: 'success'
    })
    
    console.log('添加自定义茶叶类型:', customType, '当前茶叶类型:', newTeaTypes)
  },

  // 选择图片
  chooseImage() {
    const that = this
    wx.chooseMedia({
      count: 9 - that.data.formData.images.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFiles = res.tempFiles
        const newImages = that.data.formData.images.concat(tempFiles.map(file => file.tempFilePath))
        
        that.setData({
          'formData.images': newImages
        })
        
        wx.showToast({
          title: `已选择${tempFiles.length}张图片`,
          icon: 'success'
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const { index } = e.currentTarget.dataset
    const images = this.data.formData.images
    images.splice(index, 1)
    
    this.setData({
      'formData.images': images
    })
    
    wx.showToast({
      title: '已删除图片',
      icon: 'success'
    })
  },

  // 预览图片
  previewImage(e) {
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      current: url,
      urls: this.data.formData.images
    })
  },

  // 表单验证
  validateField(field, value) {
    let valid = true
    let message = ''
    
    switch (field) {
      case 'title':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入供应标题'
        } else if (value.length < 5) {
          valid = false
          message = '标题至少5个字符'
        }
        break
        
      case 'teaTypes':
        if (!value || value.length === 0) {
          valid = false
          message = '请选择茶叶类型'
        }
        break
        
      case 'origin':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入产地'
        }
        break
        
      case 'grade':
        if (!value || value.trim() === '') {
          valid = false
          message = '请选择等级'
        }
        break
        
      case 'price':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入价格'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          valid = false
          message = '请输入有效价格'
        }
        break
        
      case 'quantity':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入数量'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          valid = false
          message = '请输入有效数量'
        }
        break
        
      case 'contact':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入联系人'
        }
        break
        
      case 'phone':
        if (!value || value.trim() === '') {
          valid = false
          message = '请输入联系电话'
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          valid = false
          message = '请输入有效手机号'
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
    const fields = ['title', 'teaTypes', 'origin', 'grade', 'price', 'quantity', 'contact', 'phone']
    let allValid = true
    
    fields.forEach(field => {
      const value = this.data.formData[field]
      if (!this.validateField(field, value)) {
        allValid = false
      }
    })
    
    return allValid
  },

  // 提交表单
  submitForm() {
    if (this.data.submitting) {
      return
    }
    
    if (!this.validateAll()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }
    
    this.setData({ submitting: true })
    
    // 模拟提交
    wx.showLoading({
      title: '发布中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      this.setData({ submitting: false })
      
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      
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
      content: '确定要清空所有已填写的内容吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            formData: {
              title: '',
              teaTypes: [],
              customTeaType: '',
              origin: '',
              grade: '',
              harvestTime: '',
              features: [],
              description: '',
              images: [],
              price: '',
              priceUnit: '元/斤',
              quantity: '',
              quantityUnit: '斤',
              delivery: '48小时内发货',
              guarantee: '7天无理由退换',
              payment: ['现金', '银行转账', '微信支付'],
              contact: '',
              phone: ''
            }
          })
          
          wx.showToast({
            title: '已重置',
            icon: 'success'
          })
        }
      }
    })
  }
})