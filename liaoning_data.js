// 辽宁省茶叶市场数据
const liaoningTeaMarkets = {
  province: {
    id: 21,
    name: '辽宁省',
    marketCount: 67
  },
  markets: [
    // 沈阳市
    { id: 1, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '沈阳茶城', address: '沈河区' },
    { id: 2, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '中街茶城', address: '沈河区' },
    { id: 3, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '沈阳北站茶叶市场', address: '沈河区' },
    { id: 4, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '大东区', name: '北方茶城', address: '大东区' },
    { id: 5, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '铁西区', name: '沈阳茶叶城', address: '铁西区' },
    { id: 6, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '浑南区', name: '五里河茶城', address: '浑南区' },
    { id: 7, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '新城区', name: '金康路茶叶街', address: '新城区' },
    { id: 8, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '和平区', name: '沈阳市第四百货商场（茶叶专区）', address: '和平区' },
    { id: 9, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '辽中县', name: '辽中县茶叶市场', address: '辽中县' },

    // 大连市
    { id: 10, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '大连金玛茶城', address: '中山区' },
    { id: 11, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '大连茶叶场', address: '中山区' },
    { id: 12, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '万茶叶市场', address: '中山区' },
    { id: 13, provinceId: 21, province: '辽宁省', city: '大连市', district: '沙河口区', name: '大连金三角茶城', address: '沙河口区' },
    { id: 14, provinceId: 21, province: '辽宁省', city: '大连市', district: '西岗区', name: '振富茶城', address: '西岗区' },
    { id: 15, provinceId: 21, province: '辽宁省', city: '大连市', district: '西岗区', name: '双兴综合批发市场（茶叶专区）', address: '西岗区' },
    { id: 16, provinceId: 21, province: '辽宁省', city: '大连市', district: '甘井子区', name: '青绿茶叶城', address: '甘井子区' },

    // 鞍山市
    { id: 17, provinceId: 21, province: '辽宁省', city: '鞍山市', district: '铁东区', name: '鞍山茶叶市场', address: '铁东区' },
    { id: 18, provinceId: 21, province: '辽宁省', city: '鞍山市', district: '铁东区', name: '新兴商贸城茶叶专区', address: '铁东区' },
    { id: 19, provinceId: 21, province: '辽宁省', city: '鞍山市', district: '铁西区', name: '永乐茶城', address: '铁西区' },
    { id: 20, provinceId: 21, province: '辽宁省', city: '鞍山市', district: '铁西区', name: '乐雪五一路批发市场（茶叶专区）', address: '铁西区' },

    // 抚顺市
    { id: 21, provinceId: 21, province: '辽宁省', city: '抚顺市', district: '新抚区', name: '新抚茶叶市场', address: '新抚区' },
    { id: 22, provinceId: 21, province: '辽宁省', city: '抚顺市', district: '新抚区', name: '抚顺乾茶文化村', address: '新抚区' },
    { id: 23, provinceId: 21, province: '辽宁省', city: '抚顺市', district: '顺城区', name: '顺城茶叶市场', address: '顺城区' },
    { id: 24, provinceId: 21, province: '辽宁省', city: '抚顺市', district: '东湖风景区', name: '东湖茶城', address: '东湖风景区' },

    // 丹东市
    { id: 25, provinceId: 21, province: '辽宁省', city: '丹东市', district: '振兴区', name: '丹东茶叶场（核心集散地）', address: '振兴区' },
    { id: 26, provinceId: 21, province: '辽宁省', city: '丹东市', district: '凤城市', name: '中国供销辽东农特产品批发城', address: '凤城市' },

    // 本溪市
    { id: 27, provinceId: 21, province: '辽宁省', city: '本溪市', district: '明山区', name: '本溪花卉市场茶城', address: '明山区' },
    { id: 28, provinceId: 21, province: '辽宁省', city: '本溪市', district: '溪湖区', name: '一品轩茶叶批发行', address: '溪湖区' },

    // 锦州市
    { id: 29, provinceId: 21, province: '辽宁省', city: '锦州市', district: '古塔区', name: '锦州茶叶场', address: '古塔区' },
    { id: 30, provinceId: 21, province: '辽宁省', city: '锦州市', district: '古塔区', name: '华茗茶城', address: '古塔区' },
    { id: 31, provinceId: 21, province: '辽宁省', city: '锦州市', district: '凌河区', name: '红塔区茶市场', address: '凌河区' },
    { id: 32, provinceId: 21, province: '辽宁省', city: '锦州市', district: '太和区', name: '大潮茶城', address: '太和区' },

    // 营口市
    { id: 33, provinceId: 21, province: '辽宁省', city: '营口市', district: '站前区', name: '环渤海茶叶场', address: '站前区' },
    { id: 34, provinceId: 21, province: '辽宁省', city: '营口市', district: '凤城市', name: '辽东农特产品批发城', address: '凤城市' },

    // 阜新市
    { id: 35, provinceId: 21, province: '辽宁省', city: '阜新市', district: '海州区', name: '阜新市糖酒茶城', address: '海州区' },
    { id: 36, provinceId: 21, province: '辽宁省', city: '阜新市', district: '细河区', name: '辽西批发大市场（茶叶专区）', address: '细河区' },

    // 辽阳市
    { id: 37, provinceId: 21, province: '辽宁省', city: '辽阳市', district: '辽阳县', name: '辽眉经销场', address: '辽阳县' },
    { id: 38, provinceId: 21, province: '辽宁省', city: '辽阳市', district: '白塔区', name: '辽阳茶叶场（市中心综合市场）', address: '白塔区' },
    { id: 39, provinceId: 21, province: '辽宁省', city: '辽阳市', district: '白塔区', name: '翰林府大市场（茶叶专区）', address: '白塔区' },
    { id: 40, provinceId: 21, province: '辽宁省', city: '辽阳市', district: '白塔区', name: '木鱼石大市场（茶叶专区）', address: '白塔区' },
    { id: 41, provinceId: 21, province: '辽宁省', city: '辽阳市', district: '文圣区', name: '襄平贸易城（茶叶专区）', address: '文圣区' },

    // 盘锦市
    { id: 42, provinceId: 21, province: '辽宁省', city: '盘锦市', district: '双台子区', name: '三合茶叶经销中心', address: '双台子区' },
    { id: 43, provinceId: 21, province: '辽宁省', city: '盘锦市', district: '大洼区', name: '裕泰茶业（批发部）', address: '大洼区' },

    // 铁岭市
    { id: 44, provinceId: 21, province: '辽宁省', city: '铁岭市', district: '银州区', name: '银州贸易城农副产品市场（茶叶专区）', address: '银州区' },
    { id: 45, provinceId: 21, province: '辽宁省', city: '铁岭市', district: '银州区', name: '辽北批发市场（茶叶专区）', address: '银州区' },

    // 葫芦岛市
    { id: 46, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '龙港区', name: '葫芦岛茶叶场', address: '龙港区' },
    { id: 47, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '龙港区', name: '葫芦岛茶城', address: '龙港区' },
    { id: 48, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '绥中县', name: '茶叶总汇', address: '绥中县' },
    { id: 49, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '盖州市', name: '盖州茶叶场', address: '盖州市' },
    { id: 50, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '兴城市', name: '兴城茶叶场', address: '兴城市' },
    { id: 51, provinceId: 21, province: '辽宁省', city: '葫芦岛市', district: '建昌县', name: '建昌西山茶叶场', address: '建昌县' }
  ]
};

module.exports = liaoningTeaMarkets; 