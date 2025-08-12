// 测试多选功能修复效果
console.log('🧪 开始测试多选功能修复效果...')

// 模拟页面数据
const mockPage = {
  data: {
    formData: {
      teaTypes: [],
      features: []
    },
    teaTypeOptions: ['红茶', '绿茶', '青茶', '黄茶', '黑茶', '白茶', '花茶'],
    featureOptions: ['明前采摘', '核心产区', '荒野老枞', '有机认证', '传统工艺', '生态种植']
  },
  
  setData(data) {
    console.log('📝 setData调用:', data)
    // 模拟数据更新
    Object.keys(data).forEach(key => {
      const keys = key.split('.')
      let target = this.data
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]]
      }
      target[keys[keys.length - 1]] = data[key]
    })
    console.log('✅ 数据更新完成:', this.data.formData)
  },
  
  validateField(field, value) {
    console.log(`🔍 验证字段 ${field}:`, value)
  }
}

// 模拟茶叶类型切换方法
function onTeaTypeToggle(teaType) {
  console.log('=== 茶叶类型点击事件触发 ===')
  console.log('选中的茶叶类型:', teaType)
  
  if (!teaType) {
    console.error('茶叶类型数据为空')
    return
  }
  
  // 获取当前数据，确保是数组
  let currentTeaTypes = mockPage.data.formData.teaTypes
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
  
  // 更新数据
  mockPage.setData({
    'formData.teaTypes': newTeaTypes
  })
  
  // 实时验证
  mockPage.validateField('teaTypes', newTeaTypes)
  
  console.log('🎉 操作完成!')
}

// 模拟特色标签切换方法
function onFeatureToggle(feature) {
  console.log('=== 特色标签点击事件触发 ===')
  console.log('选中的特色标签:', feature)
  
  if (!feature) {
    console.error('特色标签数据为空')
    return
  }
  
  // 获取当前数据，确保是数组
  let currentFeatures = mockPage.data.formData.features
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
      console.log('❌ 最多选择6个特色标签')
      return
    }
  }
  
  console.log('更新后的特色标签:', newFeatures)
  
  // 更新数据
  mockPage.setData({
    'formData.features': newFeatures
  })
  
  console.log('🎉 操作完成!')
}

// 测试用例
console.log('\n📋 开始执行测试用例...')

// 测试1: 选择第一个茶叶类型
console.log('\n🧪 测试1: 选择红茶')
onTeaTypeToggle('红茶')

// 测试2: 选择第二个茶叶类型
console.log('\n🧪 测试2: 选择绿茶')
onTeaTypeToggle('绿茶')

// 测试3: 取消选择红茶
console.log('\n🧪 测试3: 取消选择红茶')
onTeaTypeToggle('红茶')

// 测试4: 选择特色标签
console.log('\n🧪 测试4: 选择明前采摘')
onFeatureToggle('明前采摘')

// 测试5: 选择更多特色标签
console.log('\n🧪 测试5: 选择核心产区')
onFeatureToggle('核心产区')

// 测试6: 测试数组类型检查
console.log('\n🧪 测试6: 测试数组类型检查')
mockPage.data.formData.teaTypes = null
onTeaTypeToggle('白茶')

// 测试7: 测试空数据
console.log('\n🧪 测试7: 测试空数据')
onTeaTypeToggle('')

console.log('\n✅ 所有测试用例执行完成!')
console.log('📊 最终数据状态:', mockPage.data.formData)
