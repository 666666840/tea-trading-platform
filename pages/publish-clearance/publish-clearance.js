Page({
  data: {
    // 表单数据
    formData: {
      name: '',
      originalPrice: '',
      clearancePrice: '',
      stockMin: '',
      stockMax: '',
      reason: '',
      description: '',
      images: []
    },
    
    // 清仓原因选项
    reasonOptions: [
      { value: '库存积压', label: '库存积压' },
      { value: '批次更新', label: '批次更新' },
      { value: '包装破损', label: '包装破损' },
      { value: '季节调整', label: '季节调整' },
      { value: '其他原因', label: '其他原因' }
    ],
    
    // 当前选中的原因索引
    reasonIndex: -1,
    
    // 表单验证状态
    formErrors: {},
    
    // 提交状态
    submitting: false
  },

  onLoad() {
    console.log('发布特价尾货页面加载')
  },

  // 输入商品名称
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
    this.validateField('name', e.detail.value)
  },

  // 输入原价
  onOriginalPriceInput(e) {
    this.setData({
      'formData.originalPrice': e.detail.value
    })
    this.validateField('originalPrice', e.detail.value)
  },

  // 输入清仓价
  onClearancePriceInput(e) {
    this.setData({
      'formData.clearancePrice': e.detail.value
    })
    this.validateField('clearancePrice', e.detail.value)
  },

  // 输入库存最小值
  onStockMinInput(e) {
    this.setData({
      'formData.stockMin': e.detail.value
    })
    this.validateField('stockMin', e.detail.value)
  },

  // 输入库存最大值
  onStockMaxInput(e) {
    this.setData({
      'formData.stockMax': e.detail.value
    })
    this.validateField('stockMax', e.detail.value)
  },

  // 选择清仓原因
  onReasonChange(e) {
    const index = e.detail.value
    const reason = this.data.reasonOptions[index].value
    
    this.setData({
      'formData.reason': reason,
      reasonIndex: index
    })
    this.validateField('reason', reason)
  },

  // 输入描述
  onDescriptionInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  // 选择图片
  chooseImage() {
    const { images } = this.data.formData
    const remaining = 6 - images.length
    
    if (remaining <= 0) {
      wx.showToast({
        title: '最多上传6张图片',
        icon: 'none'
      })
      return
    }

    wx.chooseImage({
      count: remaining,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...images, ...res.tempFilePaths]
        this.setData({
          'formData.images': newImages
        })
        this.validateField('images', newImages)
      }
    })
  },

  // 预览图片
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.formData
    
    wx.previewImage({
      current: images[index],
      urls: images
    })
  },

  // 删除图片
  deleteImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.formData
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张图片吗？',
      success: (res) => {
        if (res.confirm) {
          const newImages = images.filter((_, i) => i !== index)
          this.setData({
            'formData.images': newImages
          })
          this.validateField('images', newImages)
        }
      }
    })
  },

  // 字段验证
  validateField(field, value) {
    const errors = { ...this.data.formErrors }
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = '请输入商品名称'
        } else if (value.length < 2) {
          errors.name = '商品名称至少2个字符'
        } else {
          delete errors.name
        }
        break
        
      case 'originalPrice':
        if (!value) {
          errors.originalPrice = '请输入原价'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          errors.originalPrice = '请输入有效的原价'
        } else {
          delete errors.originalPrice
        }
        break
        
      case 'clearancePrice':
        if (!value) {
          errors.clearancePrice = '请输入清仓价'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          errors.clearancePrice = '请输入有效的清仓价'
        } else if (parseFloat(value) >= parseFloat(this.data.formData.originalPrice)) {
          errors.clearancePrice = '清仓价必须低于原价'
        } else {
          delete errors.clearancePrice
        }
        break
        
      case 'stockMin':
        if (!value) {
          errors.stockMin = '请输入最小库存'
        } else if (isNaN(value) || parseInt(value) < 100) {
          errors.stockMin = '最小库存不能少于100斤'
        } else {
          delete errors.stockMin
        }
        break
        
      case 'stockMax':
        if (!value) {
          errors.stockMax = '请输入最大库存'
        } else if (isNaN(value) || parseInt(value) < parseInt(this.data.formData.stockMin)) {
          errors.stockMax = '最大库存不能小于最小库存'
        } else {
          delete errors.stockMax
        }
        break
        
      case 'reason':
        if (!value) {
          errors.reason = '请选择清仓原因'
        } else {
          delete errors.reason
        }
        break
        
      case 'images':
        if (value.length < 3) {
          errors.images = '请至少上传3张商品图片'
        } else {
          delete errors.images
        }
        break
    }
    
    this.setData({ formErrors: errors })
    return Object.keys(errors).length === 0
  },

  // 验证整个表单
  validateForm() {
    const { formData } = this.data
    const fields = ['name', 'originalPrice', 'clearancePrice', 'stockMin', 'stockMax', 'reason', 'images']
    
    let isValid = true
    fields.forEach(field => {
      if (!this.validateField(field, formData[field])) {
        isValid = false
      }
    })
    
    return isValid
  },

  // 提交表单
  async submitForm() {
    if (this.data.submitting) return
    
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }
    
    this.setData({ submitting: true })
    
    try {
      // 模拟上传图片
      const uploadedImages = await this.uploadImages()
      
      // 构建提交数据
      const submitData = {
        ...this.data.formData,
        images: uploadedImages,
        createTime: new Date().toISOString(),
        status: 'pending' // 待审核
      }
      
      // 模拟API调用
      await this.mockSubmitAPI(submitData)
      
      wx.showToast({
        title: '发布成功，等待审核',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      
    } catch (error) {
      wx.showToast({
        title: '发布失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ submitting: false })
    }
  },

  // 模拟上传图片
  uploadImages() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uploadedImages = this.data.formData.images.map((_, index) => 
          `https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=商品图片${index + 1}`
        )
        resolve(uploadedImages)
      }, 1000)
    })
  },

  // 模拟提交API
  mockSubmitAPI(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('提交数据:', data)
        resolve({ success: true })
      }, 500)
    })
  }
}) 