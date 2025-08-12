Page({
  data: {
    // 智能功能模块
    smartModules: [
      {
        id: 1,
        icon: '🌱',
        title: '智能种植',
        description: 'AI辅助茶叶种植管理，提供精准的种植建议',
        features: ['土壤监测', '气候预测', '病虫害预警', '施肥建议'],
        status: 'active',
        color: '#4CAF50'
      },
      {
        id: 2,
        icon: '🔍',
        title: '品质检测',
        description: '智能茶叶品质分析，快速识别茶叶等级',
        features: ['外观检测', '香气分析', '口感评估', '成分检测'],
        status: 'active',
        color: '#2196F3'
      },
      {
        id: 3,
        icon: '📊',
        title: '数据分析',
        description: '茶叶市场趋势分析，助力决策制定',
        features: ['价格预测', '需求分析', '竞品监控', '销售预测'],
        status: 'active',
        color: '#FF9800'
      },
      {
        id: 4,
        icon: '🤖',
        title: '智能客服',
        description: '24小时在线智能客服，解答茶叶相关问题',
        features: ['自动回复', '知识库', '多语言支持', '情感分析'],
        status: 'active',
        color: '#9C27B0'
      },
      {
        id: 5,
        icon: '📱',
        title: '移动管理',
        description: '随时随地管理茶园，实时监控生产状态',
        features: ['远程监控', '移动办公', '数据同步', '即时通知'],
        status: 'active',
        color: '#607D8B'
      },
      {
        id: 6,
        icon: '🔗',
        title: '区块链溯源',
        description: '茶叶全生命周期追溯，确保品质安全',
        features: ['产地溯源', '生产记录', '物流追踪', '防伪验证'],
        status: 'active',
        color: '#795548'
      }
    ],
    

    
    // 热门功能
    hotFeatures: [
      {
        id: 1,
        title: 'AI种植助手',
        users: 8560,
        rating: 4.8,
        description: '基于机器学习的智能种植建议系统'
      },
      {
        id: 2,
        title: '品质评估',
        users: 7230,
        rating: 4.7,
        description: '快速准确的茶叶品质检测工具'
      },
      {
        id: 3,
        title: '市场预测',
        users: 6540,
        rating: 4.6,
        description: '精准的茶叶市场价格预测分析'
      }
    ],
    

    

  },

  onLoad() {
    console.log('智慧茶业页面加载完成')
  },

  // 点击功能模块
  onModuleTap(e) {
    const { id } = e.currentTarget.dataset
    const module = this.data.smartModules.find(item => item.id === id)
    
    wx.showModal({
      title: module.title,
      content: `功能特点：${module.features.join('、')}`,
      confirmText: '立即体验',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 点击热门功能
  onHotFeatureTap(e) {
    const { id } = e.currentTarget.dataset
    const feature = this.data.hotFeatures.find(item => item.id === id)
    
    wx.showModal({
      title: feature.title,
      content: feature.description,
      confirmText: '开始使用',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },




}) 