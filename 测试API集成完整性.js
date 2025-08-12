// 茶叶一点通API集成完整性测试脚本
// 测试所有已集成页面的API调用功能

const { API } = require('./utils/api-manager')

// 测试结果记录
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
}

// 测试工具函数
function logTest(name, result, error = null) {
  testResults.total++
  if (result) {
    testResults.passed++
    console.log(`✅ ${name} - 通过`)
  } else {
    testResults.failed++
    console.log(`❌ ${name} - 失败: ${error}`)
  }
  testResults.details.push({ name, result, error })
}

// 测试API连接
async function testConnection() {
  try {
    const result = await API.health()
    logTest('健康检查', result.status === 'ok')
  } catch (error) {
    logTest('健康检查', false, error.message)
  }
}

// 测试市场数据API
async function testMarketsAPI() {
  try {
    const result = await API.getMarkets()
    logTest('市场数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('市场数据获取', false, error.message)
  }
}

// 测试省份数据API
async function testProvincesAPI() {
  try {
    const result = await API.getProvinces()
    logTest('省份数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('省份数据获取', false, error.message)
  }
}

// 测试新品数据API
async function testNewarrivalsAPI() {
  try {
    const result = await API.getNewarrivals()
    logTest('新品数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('新品数据获取', false, error.message)
  }
}

// 测试供求数据API
async function testSuppliesAPI() {
  try {
    const result = await API.getSupplies()
    logTest('供求数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('供求数据获取', false, error.message)
  }
}

// 测试清仓数据API
async function testClearanceAPI() {
  try {
    const result = await API.getClearance()
    logTest('清仓数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('清仓数据获取', false, error.message)
  }
}

// 测试内容数据API
async function testContentAPI() {
  try {
    const result = await API.getContent('recommend')
    logTest('内容数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('内容数据获取', false, error.message)
  }
}

// 测试询价数据API
async function testInquiryAPI() {
  try {
    const result = await API.getInquiry()
    logTest('询价数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('询价数据获取', false, error.message)
  }
}

// 测试品牌数据API
async function testBrandsAPI() {
  try {
    const result = await API.getBrands()
    logTest('品牌数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('品牌数据获取', false, error.message)
  }
}

// 测试茶园数据API
async function testGardensAPI() {
  try {
    const result = await API.getGardens()
    logTest('茶园数据获取', result.status === 'success' && Array.isArray(result.data))
  } catch (error) {
    logTest('茶园数据获取', false, error.message)
  }
}

// 测试带参数的API调用
async function testParameterizedAPIs() {
  try {
    // 测试带筛选的供求API
    const suppliesResult = await API.getSupplies('supply')
    logTest('供求筛选API', suppliesResult.status === 'success')
    
    // 测试带分类的新品API
    const newarrivalsResult = await API.getNewarrivals('绿茶')
    logTest('新品分类API', newarrivalsResult.status === 'success')
    
    // 测试带筛选的品牌API
    const brandsResult = await API.getBrands({ category: '绿茶' })
    logTest('品牌筛选API', brandsResult.status === 'success')
    
  } catch (error) {
    logTest('参数化API测试', false, error.message)
  }
}

// 测试离线降级功能
async function testOfflineFallback() {
  try {
    // 模拟断网情况（通过修改baseUrl）
    const originalBaseUrl = API.apiManager.baseUrl
    API.apiManager.baseUrl = 'http://invalid-url:9999'
    
    const result = await API.getMarkets()
    const isFallback = result.message === '离线模式运行中' || result.data.length > 0
    
    // 恢复原始URL
    API.apiManager.baseUrl = originalBaseUrl
    
    logTest('离线降级功能', isFallback)
  } catch (error) {
    logTest('离线降级功能', false, error.message)
  }
}

// 测试缓存功能
async function testCacheFunction() {
  try {
    // 清除缓存
    API.clearCache()
    
    // 第一次请求
    const result1 = await API.getMarkets()
    
    // 第二次请求（应该使用缓存）
    const result2 = await API.getMarkets()
    
    logTest('缓存功能', result1.status === 'success' && result2.status === 'success')
  } catch (error) {
    logTest('缓存功能', false, error.message)
  }
}

// 测试连接状态检查
async function testConnectionStatus() {
  try {
    const isConnected = await API.checkConnection()
    logTest('连接状态检查', typeof isConnected === 'boolean')
  } catch (error) {
    logTest('连接状态检查', false, error.message)
  }
}

// 主测试函数
async function runAllTests() {
  console.log('🚀 开始API集成完整性测试...\n')
  
  // 基础连接测试
  await testConnection()
  
  // 核心数据API测试
  await testMarketsAPI()
  await testProvincesAPI()
  await testNewarrivalsAPI()
  await testSuppliesAPI()
  await testClearanceAPI()
  await testContentAPI()
  await testInquiryAPI()
  await testBrandsAPI()
  await testGardensAPI()
  
  // 高级功能测试
  await testParameterizedAPIs()
  await testOfflineFallback()
  await testCacheFunction()
  await testConnectionStatus()
  
  // 输出测试结果
  console.log('\n📊 测试结果汇总:')
  console.log(`总测试数: ${testResults.total}`)
  console.log(`通过: ${testResults.passed}`)
  console.log(`失败: ${testResults.failed}`)
  console.log(`成功率: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`)
  
  if (testResults.failed > 0) {
    console.log('\n❌ 失败的测试:')
    testResults.details
      .filter(test => !test.result)
      .forEach(test => {
        console.log(`  - ${test.name}: ${test.error}`)
      })
  }
  
  console.log('\n🎉 API集成测试完成!')
  
  return testResults
}

// 导出测试函数
module.exports = {
  runAllTests,
  testResults
}

// 如果直接运行此文件，执行测试
if (typeof window !== 'undefined') {
  // 在微信小程序环境中
  runAllTests().then(results => {
    console.log('测试完成，结果:', results)
  }).catch(error => {
    console.error('测试执行失败:', error)
  })
} 