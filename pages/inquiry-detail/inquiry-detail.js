Page({
  data: {
    inquiryId: '',
    inquiryInfo: null,
    loading: true,
    
    // 用户身份（买家/商户）
    userRole: 'merchant', // 'buyer' | 'merchant'
    
    // 联系信息显示状态
    showContact: false
  },

  onLoad(options) {
    this.setData({
      inquiryId: options.id
    })
    this.loadInquiryDetail()
  },

  // 加载求购信息详情
  loadInquiryDetail() {
    // 清空示例数据，等待真实数据
    this.setData({
      inquiryInfo: null,
      loading: false
    })
  },

  // 显示联系信息
  showContactInfo() {
    if (this.data.userRole === 'merchant') {
      this.setData({
        showContact: true
      })
    } else {
      wx.showToast({
        title: '您需要认证为商户才能查看联系信息',
        icon: 'none'
      })
    }
  },

  // 隐藏联系信息
  hideContactInfo() {
    this.setData({
      showContact: false
    })
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.inquiryInfo.publisher.contact.phone
    })
  },

  // 复制微信号
  copyWechat() {
    wx.setClipboardData({
      data: this.data.inquiryInfo.publisher.contact.wechat,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 查看二维码
  viewQRCode() {
    wx.previewImage({
      urls: [this.data.inquiryInfo.publisher.contact.qrcode]
    })
  },

  // 联系买家
  contactBuyer() {
    wx.showActionSheet({
      itemList: ['拨打电话', '添加微信', '查看二维码'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.makePhoneCall()
            break
          case 1:
            this.copyWechat()
            break
          case 2:
            this.viewQRCode()
            break
        }
      }
    })
  },

  // 预览附件
  previewAttachment(e) {
    const index = e.currentTarget.dataset.index
    const url = this.data.inquiryInfo.attachments[index]
    wx.previewImage({
      current: url,
      urls: this.data.inquiryInfo.attachments
    })
  },

  // 收藏求购信息
  toggleFavorite() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    })
  },

  // 分享求购信息
  onShareAppMessage() {
    return {
      title: `${this.data.inquiryInfo?.title} - 茶叶一点通`,
      path: `/pages/inquiry-detail/inquiry-detail?id=${this.data.inquiryId}`
    }
  },

  // 编辑求购信息（仅买家）
  editInquiry() {
    if (this.data.userRole === 'buyer') {
      wx.navigateTo({
        url: `/pages/edit-inquiry/edit-inquiry?id=${this.data.inquiryId}`,
        fail: () => {
          wx.showToast({
            title: '编辑页面开发中',
            icon: 'none'
          })
        }
      })
    }
  },

  // 关闭求购信息（仅买家）
  closeInquiry() {
    if (this.data.userRole === 'buyer') {
      wx.showModal({
        title: '确认关闭',
        content: '确定要关闭这条求购信息吗？关闭后将无法恢复。',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '求购信息已关闭',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}) 