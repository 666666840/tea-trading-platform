Page({
  data: {
    // 入驻流程步骤
    joinSteps: [
      {
        step: 1,
        title: '填写基本信息',
        description: '提供商户名称、联系人、联系方式等基本信息',
        icon: '📝',
        details: [
          '商户名称（营业执照上的名称）',
          '联系人姓名和手机号',
          '微信号（用于后续沟通）',
          '经营地址'
        ]
      },
      {
        step: 2,
        title: '选择经营类型',
        description: '根据实际经营情况选择对应的经营类型',
        icon: '🏪',
        details: [
          '茶厂：自有茶厂，生产加工茶叶',
          '茶园：自有茶园，种植茶叶',
          '一级批发商：从厂家直接进货',
          '品牌总代：品牌官方授权代理',
          '区域分销商：在特定区域销售',
          '源头供应商：产地直供',
          '零售商：终端销售'
        ]
      },
      {
        step: 3,
        title: '上传资质证明',
        description: '上传营业执照、身份证等必要证件',
        icon: '📄',
        details: [
          '营业执照（清晰完整）',
          '身份证正反面',
          '食品经营许可证（如有）',
          '商标注册证（如有）'
        ]
      },
      {
        step: 4,
        title: '等待审核',
        description: '平台将在3个工作日内完成审核',
        icon: '⏳',
        details: [
          '资料完整性审核',
          '资质真实性验证',
          '经营能力评估',
          '审核结果通知'
        ]
      },
      {
        step: 5,
        title: '缴纳费用',
        description: '审核通过后缴纳入驻费用',
        icon: '💰',
        details: [
          '国家级市场：500元/年',
          '省级市场：300元/年',
          '市级市场：200元/年',
          '支持微信支付、支付宝'
        ]
      },
      {
        step: 6,
        title: '开通权限',
        description: '缴费成功后立即开通商户权限',
        icon: '✅',
        details: [
          '发布商品信息',
          '接收询价消息',
          '参与市场活动',
          '享受平台服务'
        ]
      }
    ],

    // 入驻费用说明
    feeInfo: {
      national: {
        level: '国家级市场',
        fee: '500元/年',
        benefits: [
          '首页推荐位展示',
          '优先搜索排名',
          '专属客服服务',
          '免费培训课程',
          '市场活动优先参与'
        ]
      },
      provincial: {
        level: '省级市场',
        fee: '300元/年',
        benefits: [
          '区域推荐位展示',
          '搜索排名优化',
          '客服支持服务',
          '基础培训课程'
        ]
      },
      city: {
        level: '市级市场',
        fee: '200元/年',
        benefits: [
          '本地推荐展示',
          '基础搜索功能',
          '在线客服咨询'
        ]
      }
    },

    // 常见问题
    faqs: [
      {
        question: '入驻需要什么条件？',
        answer: '需要具备合法的营业执照，经营茶叶相关业务，有固定的经营场所和联系方式。'
      },
      {
        question: '审核需要多长时间？',
        answer: '正常情况下3个工作日内完成审核，如遇节假日可能会延长。'
      },
      {
        question: '入驻费用可以退吗？',
        answer: '入驻费用为年费，一经缴纳不予退还。如因平台原因导致无法正常使用，可申请延期。'
      },
      {
        question: '可以同时入驻多个市场吗？',
        answer: '可以，每个市场需要单独申请和缴费，享受对应市场的服务。'
      },
      {
        question: '入驻后可以发布哪些信息？',
        answer: '可以发布茶叶供应信息、价格信息、求购信息等，但需要确保信息真实有效。'
      },
      {
        question: '如何提高曝光率？',
        answer: '保持信息更新频率，提供高质量的产品图片，及时回复询价消息，参与平台活动。'
      }
    ],

    // 联系方式
    contactInfo: {
      phone: '400-123-4567',
      wechat: 'tea_market_service',
      email: 'service@tea-market.com',
      workTime: '周一至周五 9:00-18:00'
    }
  },

  onLoad() {
    console.log('商户入驻指南页面加载完成')
  },

  // 联系客服
  contactService() {
    wx.showActionSheet({
      itemList: ['拨打电话', '添加微信', '发送邮件'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            wx.makePhoneCall({
              phoneNumber: this.data.contactInfo.phone
            })
            break
          case 1:
            wx.setClipboardData({
              data: this.data.contactInfo.wechat,
              success: () => {
                wx.showToast({
                  title: '微信号已复制',
                  icon: 'success'
                })
              }
            })
            break
          case 2:
            wx.setClipboardData({
              data: this.data.contactInfo.email,
              success: () => {
                wx.showToast({
                  title: '邮箱已复制',
                  icon: 'success'
                })
              }
            })
            break
        }
      }
    })
  },

  // 查看市场列表
  viewMarkets() {
    wx.navigateTo({
      url: '/pages/market/market'
    })
  },

  // 开始入驻申请
  startJoin() {
    wx.showModal({
      title: '选择入驻方式',
      content: '您可以选择：\n1. 直接选择市场申请\n2. 联系客服协助',
      confirmText: '选择市场',
      cancelText: '联系客服',
      success: (res) => {
        if (res.confirm) {
          this.viewMarkets()
        } else {
          this.contactService()
        }
      }
    })
  },

  // 分享页面
  onShareAppMessage() {
    return {
      title: '茶叶批发市场商户入驻指南',
      path: '/pages/market-join-guide/market-join-guide'
    }
  }
}) 