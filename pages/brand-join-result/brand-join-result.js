Page({
  data: {
    // 申请状态
    applicationStatus: 'submitted', // submitted, reviewing, approved, rejected
    
    // 申请信息
    applicationInfo: {
      applicationId: '',
      submitTime: '',
      brandName: '',
      packageName: '',
      packagePrice: 0
    },
    
    // 审核流程
    reviewProcess: [
      {
        step: 1,
        title: '申请提交',
        status: 'completed',
        time: '2024-12-01 14:30:25',
        desc: '您的品牌入驻申请已成功提交'
      },
      {
        step: 2,
        title: '资料审核',
        status: 'pending',
        time: '',
        desc: '平台将在48小时内完成资料审核'
      },
      {
        step: 3,
        title: '费用缴纳',
        status: 'waiting',
        time: '',
        desc: '审核通过后，请及时完成费用缴纳'
      },
      {
        step: 4,
        title: '入驻完成',
        status: 'waiting',
        time: '',
        desc: '缴费成功后，品牌将正式入驻平台'
      }
    ],
    
    // 联系信息
    contactInfo: {
      phone: '400-123-4567',
      wechat: 'tea_brand_service',
      email: 'brand@teaplatform.com',
      workTime: '周一至周五 9:00-18:00'
    }
  },

  onLoad(options) {
    console.log('品牌入驻结果页面加载')
    this.initApplicationInfo()
  },

  // 初始化申请信息
  initApplicationInfo() {
    // 这里可以从缓存或服务器获取申请信息
    // 暂时使用模拟数据
  },

  // 查看申请详情
  viewApplicationDetail() {
    wx.showModal({
      title: '申请详情',
      content: `申请编号：${this.data.applicationInfo.applicationId}\n品牌名称：${this.data.applicationInfo.brandName}\n入驻套餐：${this.data.applicationInfo.packageName}\n申请时间：${this.data.applicationInfo.submitTime}`,
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 联系客服
  contactService() {
    wx.showActionSheet({
      itemList: ['电话咨询', '微信咨询', '邮件咨询'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.makePhoneCall()
            break
          case 1:
            this.copyWechat()
            break
          case 2:
            this.sendEmail()
            break
        }
      }
    })
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.contactInfo.phone,
      success: () => {
        console.log('拨打电话成功')
      },
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        })
      }
    })
  },

  // 复制微信号
  copyWechat() {
    wx.setClipboardData({
      data: this.data.contactInfo.wechat,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 发送邮件
  sendEmail() {
    wx.setClipboardData({
      data: this.data.contactInfo.email,
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        })
      }
    })
  },

  // 查看入驻指南
  viewJoinGuide() {
    wx.showModal({
      title: '入驻指南',
      content: '1. 资料准备：营业执照、商标注册证\n2. 资质要求：年销售额100万以上\n3. 审核时间：48小时内完成\n4. 费用缴纳：审核通过后7天内完成\n5. 入驻权益：品牌认证、首页展示等',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 返回首页
  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 返回品牌页面
  goBackToBrand() {
    wx.navigateBack({
      delta: 2
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '品牌入驻申请已提交',
      path: '/pages/brand/brand',
      imageUrl: '/images/share-brand-join.jpg'
    }
  }
}) 