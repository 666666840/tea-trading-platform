// 简单的多选功能测试
console.log('=== 多选功能简单测试 ===')

// 模拟数据
const mockData = {
  teaTypes: [],
  features: []
}

// 模拟setData方法
function setData(data) {
  Object.assign(mockData, data)
  console.log('数据更新:', data)
}

// 模拟茶叶类型切换
function onTeaTypeToggle(teaType) {
  console.log('点击茶叶类型:', teaType)
  
  const currentTeaTypes = mockData.teaTypes || []
  const index = currentTeaTypes.indexOf(teaType)
  
  if (index > -1) {
    // 移除
    const newTeaTypes = currentTeaTypes.filter(item => item !== teaType)
    setData({ teaTypes: newTeaTypes })
    console.log('移除茶叶类型:', teaType)
  } else {
    // 添加
    const newTeaTypes = [...currentTeaTypes, teaType]
    setData({ teaTypes: newTeaTypes })
    console.log('添加茶叶类型:', teaType)
  }
  
  console.log('当前茶叶类型:', mockData.teaTypes)
}

// 模拟特色标签切换
function onFeatureToggle(feature) {
  console.log('点击特色标签:', feature)
  
  const currentFeatures = mockData.features || []
  const index = currentFeatures.indexOf(feature)
  
  if (index > -1) {
    // 移除
    const newFeatures = currentFeatures.filter(item => item !== feature)
    setData({ features: newFeatures })
    console.log('移除特色标签:', feature)
  } else {
    // 添加（最多6个）
    if (currentFeatures.length < 6) {
      const newFeatures = [...currentFeatures, feature]
      setData({ features: newFeatures })
      console.log('添加特色标签:', feature)
    } else {
      console.log('最多选择6个特色标签')
      return
    }
  }
  
  console.log('当前特色标签:', mockData.features)
}

// 测试茶叶类型选择
console.log('\n--- 测试茶叶类型选择 ---')
onTeaTypeToggle('红茶')
onTeaTypeToggle('绿茶')
onTeaTypeToggle('红茶') // 取消选择
onTeaTypeToggle('白茶')

// 测试特色标签选择
console.log('\n--- 测试特色标签选择 ---')
onFeatureToggle('明前采摘')
onFeatureToggle('核心产区')
onFeatureToggle('有机认证')
onFeatureToggle('明前采摘') // 取消选择

console.log('\n=== 测试完成 ===')
console.log('最终茶叶类型:', mockData.teaTypes)
console.log('最终特色标签:', mockData.features)
