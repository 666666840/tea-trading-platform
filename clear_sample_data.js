
// 小程序存储清理脚本
function clearSampleData() {
  try {
    console.log('🗑️ 开始清理小程序存储中的示例数据...');
    
    // 清理示例商户数据
    const merchants = wx.getStorageSync('merchants') || [];
    const realMerchants = merchants.filter(m => 
      !m.name.includes('示例') && 
      !m.name.includes('测试') && 
      !m.description.includes('示例') &&
      !m.phone.startsWith('1380000') &&
      !m.phone.startsWith('1390000')
    );
    wx.setStorageSync('merchants', realMerchants);
    
    // 清理示例产品数据
    const products = wx.getStorageSync('products') || [];
    const realProducts = products.filter(p => 
      !p.name.includes('示例') && 
      !p.name.includes('测试') && 
      !p.description.includes('示例') &&
      p.price >= 10 && p.price <= 10000
    );
    wx.setStorageSync('products', realProducts);
    
    // 清理示例市场数据
    const markets = wx.getStorageSync('markets') || [];
    const realMarkets = markets.filter(m => 
      !m.name.includes('示例') && 
      !m.name.includes('测试')
    );
    wx.setStorageSync('markets', realMarkets);
    
    // 清理示例供应数据
    const supplies = wx.getStorageSync('supplies') || [];
    const realSupplies = supplies.filter(s => 
      !s.name.includes('示例') && 
      !s.name.includes('测试')
    );
    wx.setStorageSync('supplies', realSupplies);
    
    // 清理示例清仓数据
    const clearance = wx.getStorageSync('clearance') || [];
    const realClearance = clearance.filter(c => 
      !c.name.includes('示例') && 
      !c.name.includes('测试')
    );
    wx.setStorageSync('clearance', realClearance);
    
    // 清理示例新品数据
    const newarrivals = wx.getStorageSync('newarrivals') || [];
    const realNewarrivals = newarrivals.filter(n => 
      !n.name.includes('示例') && 
      !n.name.includes('测试')
    );
    wx.setStorageSync('newarrivals', realNewarrivals);
    
    // 清理示例茶园直采数据
    const gardenData = wx.getStorageSync('gardenData') || [];
    const realGardenData = gardenData.filter(g => 
      !g.name.includes('示例') && 
      !g.name.includes('测试')
    );
    wx.setStorageSync('gardenData', realGardenData);
    
    console.log('✅ 小程序存储示例数据清理完成！');
    console.log('📊 清理统计:');
    console.log('   🏪 商户:', merchants.length - realMerchants.length, '个');
    console.log('   🍵 产品:', products.length - realProducts.length, '个');
    console.log('   🏬 市场:', markets.length - realMarkets.length, '个');
    console.log('   📦 供应:', supplies.length - realSupplies.length, '个');
    console.log('   🎯 清仓:', clearance.length - realClearance.length, '个');
    console.log('   🆕 新品:', newarrivals.length - realNewarrivals.length, '个');
    console.log('   🌱 茶园:', gardenData.length - realGardenData.length, '个');
    
    return true;
  } catch (error) {
    console.error('❌ 小程序存储清理失败:', error);
    return false;
  }
}

// 导出函数
module.exports = {
  clearSampleData
};
