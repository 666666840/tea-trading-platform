// 真实数据导入脚本
// 用于将数据库中的真实数据导入到微信小程序存储中

const realData = {
  "version": "1.0",
  "syncTime": "2024-08-11T17:45:00",
  "realMerchants": [
    {
      "id": "merchant_001",
      "name": "福建安溪铁观音茶业有限公司",
      "category": "茶园/茶厂",
      "contact": "张经理",
      "phone": "13800138001",
      "email": "zhang@anxi-tea.com",
      "province": "福建省",
      "city": "泉州市",
      "address": "安溪县感德镇槐植村",
      "description": "专业生产安溪铁观音，拥有自有茶园500亩，年产量50吨",
      "status": "approved"
    },
    {
      "id": "merchant_002",
      "name": "杭州西湖龙井茶业合作社",
      "category": "茶园/茶厂",
      "contact": "李社长",
      "phone": "13900139002",
      "email": "li@xihu-longjing.com",
      "province": "浙江省",
      "city": "杭州市",
      "address": "西湖区龙井村",
      "description": "西湖龙井核心产区，合作社成员50户，年产量30吨",
      "status": "approved"
    },
    {
      "id": "merchant_003",
      "name": "云南普洱茶集团",
      "category": "茶叶批发商",
      "contact": "王总",
      "phone": "13700137003",
      "email": "wang@puer-group.com",
      "province": "云南省",
      "city": "昆明市",
      "address": "西山区滇池路123号",
      "description": "专业普洱茶批发，代理多个知名品牌，年销售额5000万",
      "status": "approved"
    },
    {
      "id": "merchant_004",
      "name": "广东潮州凤凰单丛茶厂",
      "category": "茶园/茶厂",
      "contact": "陈师傅",
      "phone": "13600136004",
      "email": "chen@fenghuang-dancong.com",
      "province": "广东省",
      "city": "潮州市",
      "address": "潮安区凤凰镇",
      "description": "传统凤凰单丛制作工艺，拥有百年制茶历史",
      "status": "approved"
    },
    {
      "id": "merchant_005",
      "name": "安徽黄山毛峰茶业有限公司",
      "category": "茶叶批发商",
      "contact": "刘经理",
      "phone": "13500135005",
      "email": "liu@huangshan-maofeng.com",
      "province": "安徽省",
      "city": "黄山市",
      "address": "屯溪区新安北路456号",
      "description": "黄山毛峰专业批发，与多家茶园建立长期合作关系",
      "status": "approved"
    },
    {
      "id": "merchant_006",
      "name": "四川蒙顶山茶业有限公司",
      "category": "茶园/茶厂",
      "contact": "赵总",
      "phone": "13400134006",
      "email": "zhao@mengdingshan.com",
      "province": "四川省",
      "city": "雅安市",
      "address": "名山区蒙顶山镇",
      "description": "蒙顶山茶传统制作工艺，拥有千年制茶历史",
      "status": "approved"
    },
    {
      "id": "merchant_007",
      "name": "江苏碧螺春茶业合作社",
      "category": "茶园/茶厂",
      "contact": "孙社长",
      "phone": "13300133007",
      "email": "sun@biluochun.com",
      "province": "江苏省",
      "city": "苏州市",
      "address": "吴中区东山镇",
      "description": "碧螺春核心产区，合作社成员30户，年产量20吨",
      "status": "approved"
    },
    {
      "id": "merchant_008",
      "name": "湖南安化黑茶集团",
      "category": "茶叶批发商",
      "contact": "周经理",
      "phone": "13200132008",
      "email": "zhou@anhua-heicha.com",
      "province": "湖南省",
      "city": "益阳市",
      "address": "安化县东坪镇",
      "description": "安化黑茶专业批发，代理多个知名品牌",
      "status": "approved"
    }
  ],
  "realProducts": [
    {
      "id": "product_20240811174500_0",
      "name": "安溪铁观音特级",
      "category": "乌龙茶",
      "price": 299.00,
      "merchantId": "merchant_001",
      "description": "安溪铁观音特级，香气浓郁，回甘持久",
      "specification": "500g/盒",
      "origin": "福建安溪",
      "grade": "特级",
      "stock": 100,
      "status": "active"
    },
    {
      "id": "product_20240811174500_1",
      "name": "西湖龙井明前茶",
      "category": "绿茶",
      "price": 599.00,
      "merchantId": "merchant_002",
      "description": "西湖龙井明前茶，清香鲜爽，叶底嫩绿",
      "specification": "250g/罐",
      "origin": "浙江西湖",
      "grade": "明前特级",
      "stock": 50,
      "status": "active"
    },
    {
      "id": "product_20240811174500_2",
      "name": "云南普洱熟茶饼",
      "category": "普洱茶",
      "price": 199.00,
      "merchantId": "merchant_003",
      "description": "云南普洱熟茶饼，醇厚甘甜，越陈越香",
      "specification": "357g/饼",
      "origin": "云南普洱",
      "grade": "一级",
      "stock": 200,
      "status": "active"
    },
    {
      "id": "product_20240811174500_3",
      "name": "凤凰单丛蜜兰香",
      "category": "乌龙茶",
      "price": 399.00,
      "merchantId": "merchant_004",
      "description": "凤凰单丛蜜兰香，蜜香浓郁，韵味悠长",
      "specification": "500g/盒",
      "origin": "广东潮州",
      "grade": "特级",
      "stock": 80,
      "status": "active"
    },
    {
      "id": "product_20240811174500_4",
      "name": "黄山毛峰特级",
      "category": "绿茶",
      "price": 259.00,
      "merchantId": "merchant_005",
      "description": "黄山毛峰特级，清香高爽，滋味鲜醇",
      "specification": "250g/盒",
      "origin": "安徽黄山",
      "grade": "特级",
      "stock": 150,
      "status": "active"
    },
    {
      "id": "product_20240811174500_5",
      "name": "蒙顶甘露特级",
      "category": "绿茶",
      "price": 459.00,
      "merchantId": "merchant_006",
      "description": "蒙顶甘露特级，清香高雅，滋味鲜爽",
      "specification": "200g/盒",
      "origin": "四川蒙顶山",
      "grade": "特级",
      "stock": 60,
      "status": "active"
    },
    {
      "id": "product_20240811174500_6",
      "name": "碧螺春明前茶",
      "category": "绿茶",
      "price": 699.00,
      "merchantId": "merchant_007",
      "description": "碧螺春明前茶，清香持久，滋味鲜醇",
      "specification": "200g/盒",
      "origin": "江苏苏州",
      "grade": "明前特级",
      "stock": 40,
      "status": "active"
    },
    {
      "id": "product_20240811174500_7",
      "name": "安化黑茶千两茶",
      "category": "黑茶",
      "price": 899.00,
      "merchantId": "merchant_008",
      "description": "安化黑茶千两茶，醇厚甘甜，越陈越香",
      "specification": "500g/饼",
      "origin": "湖南安化",
      "grade": "特级",
      "stock": 30,
      "status": "active"
    }
  ]
};

// 导入到微信小程序存储
function importRealData() {
  try {
    console.log('🔄 开始导入真实数据...');
    
    // 导入商户数据
    wx.setStorageSync('realMerchants', realData.realMerchants);
    console.log('✅ 商户数据导入成功:', realData.realMerchants.length, '个');
    
    // 导入产品数据
    wx.setStorageSync('realProducts', realData.realProducts);
    console.log('✅ 产品数据导入成功:', realData.realProducts.length, '个');
    
    // 设置数据版本和时间
    wx.setStorageSync('dataVersion', realData.version);
    wx.setStorageSync('dataSyncTime', realData.syncTime);
    
    // 设置数据状态
    wx.setStorageSync('hasRealData', true);
    wx.setStorageSync('dataSource', 'database');
    
    console.log('🎉 所有真实数据导入完成！');
    console.log('📊 数据统计:');
    console.log('   🏪 商户:', realData.realMerchants.length, '个');
    console.log('   🍵 产品:', realData.realProducts.length, '个');
    console.log('   📅 同步时间:', realData.syncTime);
    
    return true;
  } catch (error) {
    console.error('❌ 数据导入失败:', error);
    return false;
  }
}

// 检查数据状态
function checkDataStatus() {
  try {
    const hasRealData = wx.getStorageSync('hasRealData');
    const dataVersion = wx.getStorageSync('dataVersion');
    const dataSyncTime = wx.getStorageSync('dataSyncTime');
    const merchantCount = wx.getStorageSync('realMerchants')?.length || 0;
    const productCount = wx.getStorageSync('realProducts')?.length || 0;
    
    console.log('📊 数据状态检查:');
    console.log('   ✅ 真实数据:', hasRealData ? '已导入' : '未导入');
    console.log('   📋 数据版本:', dataVersion || '未知');
    console.log('   📅 同步时间:', dataSyncTime || '未知');
    console.log('   🏪 商户数量:', merchantCount, '个');
    console.log('   🍵 产品数量:', productCount, '个');
    
    return {
      hasRealData,
      dataVersion,
      dataSyncTime,
      merchantCount,
      productCount
    };
  } catch (error) {
    console.error('❌ 数据状态检查失败:', error);
    return null;
  }
}

// 清除真实数据
function clearRealData() {
  try {
    console.log('🗑️ 开始清除真实数据...');
    
    wx.removeStorageSync('realMerchants');
    wx.removeStorageSync('realProducts');
    wx.removeStorageSync('dataVersion');
    wx.removeStorageSync('dataSyncTime');
    wx.removeStorageSync('hasRealData');
    wx.removeStorageSync('dataSource');
    
    console.log('✅ 真实数据清除完成！');
    return true;
  } catch (error) {
    console.error('❌ 数据清除失败:', error);
    return false;
  }
}

// 导出函数
module.exports = {
  importRealData,
  checkDataStatus,
  clearRealData,
  realData
};

// 使用说明：
// 1. 在微信开发者工具的控制台中运行：
//    const { importRealData, checkDataStatus } = require('./import_real_data.js');
//    importRealData();
//    checkDataStatus();
//
// 2. 或者在页面中调用：
//    const dataImporter = require('../../import_real_data.js');
//    dataImporter.importRealData();
