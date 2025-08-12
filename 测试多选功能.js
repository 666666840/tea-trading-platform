// 测试多选功能
console.log('=== 测试多选功能 ===')

// 模拟Page对象
const mockPage = {
  data: {
    formData: {
      teaTypes: [],
      features: []
    },
    teaTypeOptions: [
      '红茶', '绿茶', '青茶', '黄茶', '黑茶', '白茶', '花茶'
    ],
    featureOptions: [
      '明前采摘', '核心产区', '荒野老枞', '有机认证', '传统工艺', '生态种植', 
      '古树茶', '手工炒制', '地理标志', '无农药', '无添加', '品质保证'
    ]
  },
  
  setData(data) {
    Object.assign(this.data, data)
    console.log('setData调用:', data)
  },
  
  // 茶叶类型切换
  onTeaTypeToggle(e) {
    console.log('茶叶类型点击事件触发', e)
    const { teaType } = e.currentTarget.dataset
    console.log('选中的茶叶类型:', teaType)
    
    const teaTypes = [...this.data.formData.teaTypes] // 创建新数组
    const index = teaTypes.indexOf(teaType)
    
    if (index > -1) {
      // 移除类型
      teaTypes.splice(index, 1)
      console.log('移除茶叶类型:', teaType)
    } else {
      // 添加类型
      teaTypes.push(teaType)
      console.log('添加茶叶类型:', teaType)
    }
    
    this.setData({
      'formData.teaTypes': teaTypes
    })
    
    console.log('当前茶叶类型:', teaTypes)
  },
  
  // 特色标签切换
  onFeatureToggle(e) {
    console.log('特色标签点击事件触发', e)
    const { feature } = e.currentTarget.dataset
    console.log('选中的特色标签:', feature)
    
    const features = [...this.data.formData.features] // 创建新数组
    const index = features.indexOf(feature)
    
    if (index > -1) {
      // 移除标签
      features.splice(index, 1)
      console.log('移除特色标签:', feature)
    } else {
      // 添加标签（最多6个）
      if (features.length < 6) {
        features.push(feature)
        console.log('添加特色标签:', feature)
      } else {
        console.log('最多选择6个特色标签')
        return
      }
    }
    
    this.setData({
      'formData.features': features
    })
    
    console.log('当前特色标签:', features)
  }
}

// 测试茶叶类型多选
console.log('开始测试茶叶类型多选...')
mockPage.onTeaTypeToggle({ currentTarget: { dataset: { teaType: '绿茶' } } })
mockPage.onTeaTypeToggle({ currentTarget: { dataset: { teaType: '红茶' } } })
mockPage.onTeaTypeToggle({ currentTarget: { dataset: { teaType: '绿茶' } } })

// 测试特色标签多选
console.log('开始测试特色标签多选...')
mockPage.onFeatureToggle({ currentTarget: { dataset: { feature: '明前采摘' } } })
mockPage.onFeatureToggle({ currentTarget: { dataset: { feature: '核心产区' } } })
mockPage.onFeatureToggle({ currentTarget: { dataset: { feature: '有机认证' } } })

console.log('测试完成！')
console.log('最终数据状态:', mockPage.data)
