Page({
  data: {
    merchantId: '',
    merchantInfo: null,
    loading: true
  },

  onLoad(options) {
    this.setData({
      merchantId: options.id
    })
    this.loadMerchantInfo()
  },

  // 加载商户信息
  loadMerchantInfo() {
    // 模拟商户数据
    const mockMerchant = {
      id: this.data.merchantId,
      name: '芳村茶业批发商',
      logo: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=茶',
      mainProducts: ['普洱茶', '铁观音', '红茶'],
      activityLevel: 'high',
      activityText: '今日活跃',
      verified: true,
      rating: 4.8,
      responseTime: '5分钟内',
      lastActive: '2小时前',
      contact: {
        phone: '13800138001',
        wechat: 'fangcun_tea',
        qrcode: 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=微信'
      },
      description: '专业经营普洱茶、铁观音等名优茶叶，品质保证，价格优惠。我们拥有多年的茶叶经营经验，与各大茶厂建立了长期合作关系，确保茶叶品质的稳定性和价格的竞争力。',
      address: '广州市荔湾区芳村大道123号',
      businessHours: '08:00-18:00',
      established: '2010年',
      businessLicense: '已认证',
      products: [
        {
          id: 1,
          name: '云南普洱茶',
          type: '熟茶',
          price: '¥180/饼',
          image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=普洱'
        },
        {
          id: 2,
          name: '安溪铁观音',
          type: '清香型',
          price: '¥120/斤',
          image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=铁观音'
        },
        {
          id: 3,
          name: '正山小种',
          type: '红茶',
          price: '¥80/斤',
          image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=红茶'
        }
      ],
      certificates: [
        '食品经营许可证',
        '茶叶质量检测报告',
        '有机认证证书'
      ],
      services: [
        '免费品茶',
        '专业咨询',
        '物流配送',
        '售后服务'
      ]
    }
    
    setTimeout(() => {
      this.setData({
        merchantInfo: mockMerchant,
        loading: false
      })
    }, 500)
  },

  // 拨打商户电话
  callMerchant() {
    const merchantInfo = this.data.merchantInfo
    const phoneNumber = merchantInfo.phone || merchantInfo.contact
    
    if (!phoneNumber) {
      wx.showToast({
        title: '暂无联系电话',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '联系商户',
      content: `确定要拨打 ${merchantInfo.name} 的电话 ${phoneNumber} 吗？`,
      confirmText: '拨打',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phoneNumber,
            success: () => {
              console.log('拨号成功')
              // 记录联系行为，可用于统计转化率
              this.recordContactAction('phone_call')
            },
            fail: (error) => {
              console.error('拨号失败:', error)
              wx.showModal({
                title: '拨号失败',
                content: '无法拨打电话，您可以手动拨打：' + phoneNumber,
                showCancel: true,
                confirmText: '复制号码',
                cancelText: '知道了',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.setClipboardData({
                      data: phoneNumber,
                      success: () => {
                        wx.showToast({
                          title: '号码已复制',
                          icon: 'success'
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  // 记录联系行为
  recordContactAction(type) {
    const merchantInfo = this.data.merchantInfo
    console.log('联系行为记录:', type, merchantInfo.id)
    
    try {
      const contactHistory = wx.getStorageSync('contactHistory') || []
      contactHistory.push({
        merchantId: merchantInfo.id,
        merchantName: merchantInfo.name,
        contactType: type,
        timestamp: new Date().toISOString()
      })
      
      // 只保留最近50条联系记录
      if (contactHistory.length > 50) {
        contactHistory.splice(0, contactHistory.length - 50)
      }
      
      wx.setStorageSync('contactHistory', contactHistory)
    } catch (error) {
      console.error('记录联系行为失败:', error)
    }
  },

  // 复制微信号
  copyWechat() {
    wx.setClipboardData({
      data: this.data.merchantInfo.contact.wechat,
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
      urls: [this.data.merchantInfo.contact.qrcode]
    })
  },

  // 联系商户
  contactMerchant() {
    wx.showActionSheet({
      itemList: ['拨打电话', '添加微信', '查看二维码'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.callMerchant()
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

  // 查看产品详情
  viewProduct(e) {
    const productId = e.currentTarget.dataset.id
    wx.showToast({
      title: '产品详情页面开发中',
      icon: 'none'
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `${this.data.merchantInfo?.name} - 茶叶一点通`,
      path: `/pages/merchant-detail/merchant-detail?id=${this.data.merchantId}`
    }
  }
}) 