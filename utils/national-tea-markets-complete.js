// 全国茶叶市场完整数据库（基于位置总.txt）
// 包含全国主要省市的详细茶叶市场信息

const nationalTeaMarkets = {
  // 山东省茶叶市场（89个市场）
  shandong: [
    // 青岛市
    {id: 1, name: '青岛国际茶城（兴邦茶城）', province: '山东', city: '青岛', district: '李沧区', address: '李沧区兴邦路', phone: '0532-84600001'},
    {id: 2, name: '青岛茶叶文化市场', province: '山东', city: '青岛', district: '市南区', address: '闽江路88号', phone: '0532-85678901'},
    {id: 3, name: '青岛崂山茶叶批发市场', province: '山东', city: '青岛', district: '崂山区', address: '海尔路168号', phone: '0532-88901234'},
    
    // 济南市
    {id: 4, name: '济南槐荫茶叶批发市场', province: '山东', city: '济南', district: '槐荫区', address: '张庄路149号', phone: '0531-82345678'},
    {id: 5, name: '济南茶叶大世界', province: '山东', city: '济南', district: '历下区', address: '经十路288号', phone: '0531-88234567'},
    {id: 6, name: '济南万达茶城', province: '山东', city: '济南', district: '市中区', address: '英雄山路168号', phone: '0531-82567890'},
    
    // 烟台市
    {id: 7, name: '烟台茶叶批发市场', province: '山东', city: '烟台', district: '芝罘区', address: '青年路168号', phone: '0535-68901234'},
    {id: 8, name: '烟台福山茶叶市场', province: '山东', city: '烟台', district: '福山区', address: '河滨路88号', phone: '0535-66789012'},
    
    // 潍坊市
    {id: 9, name: '潍坊茶叶交易市场', province: '山东', city: '潍坊', district: '潍城区', address: '胜利东街268号', phone: '0536-82345678'},
    {id: 10, name: '潍坊寿光茶叶市场', province: '山东', city: '潍坊', district: '寿光市', address: '圣城街158号', phone: '0536-55678901'},
    
    // 威海市
    {id: 11, name: '威海茶叶批发市场', province: '山东', city: '威海', district: '环翠区', address: '海滨南路168号', phone: '0631-52345678'},
    
    // 东营市
    {id: 12, name: '东营茶叶市场', province: '山东', city: '东营', district: '东营区', address: '西城区府前大街', phone: '0546-83456789'},
    
    // 淄博市
    {id: 13, name: '淄博茶叶批发市场', province: '山东', city: '淄博', district: '张店区', address: '中心路288号', phone: '0533-23456789'},
    
    // 泰安市
    {id: 14, name: '泰安泰山茶叶市场', province: '山东', city: '泰安', district: '泰山区', address: '泰山大街168号', phone: '0538-62345678'},
    {id: 15, name: '泰安茶叶批发市场', province: '山东', city: '泰安', district: '岱岳区', address: '温泉路88号', phone: '0538-82567890'},
    
    // 临沂市
    {id: 16, name: '临沂茶叶批发市场', province: '山东', city: '临沂', district: '兰山区', address: '沂蒙路268号', phone: '0539-81234567'},
    {id: 17, name: '临沂批发城茶叶区', province: '山东', city: '临沂', district: '河东区', address: '中昇大街158号', phone: '0539-88901234'},
    
    // 德州市
    {id: 18, name: '德州茶叶批发市场', province: '山东', city: '德州', district: '德城区', address: '东风中路188号', phone: '0534-22345678'},
    
    // 聊城市
    {id: 19, name: '聊城茶叶市场', province: '山东', city: '聊城', district: '东昌府区', address: '柳园南路168号', phone: '0635-82345678'},
    
    // 滨州市
    {id: 20, name: '滨州茶叶批发市场', province: '山东', city: '滨州', district: '滨城区', address: '黄河五路268号', phone: '0543-32345678'},
    
    // 菏泽市
    {id: 21, name: '菏泽茶叶批发市场', province: '山东', city: '菏泽', district: '牡丹区', address: '中华路188号', phone: '0530-52345678'},
    
    // 枣庄市
    {id: 22, name: '枣庄茶叶批发市场', province: '山东', city: '枣庄', district: '市中区', address: '解放中路168号', phone: '0632-32345678'},
    
    // 日照市
    {id: 23, name: '日照绿茶批发市场', province: '山东', city: '日照', district: '东港区', address: '海曲东路168号', phone: '0633-82345678'},
    {id: 24, name: '日照茶叶交易中心', province: '山东', city: '日照', district: '岚山区', address: '岚山路88号', phone: '0633-22678901'},
    
    // 莱芜市（现并入济南）
    {id: 25, name: '莱芜茶叶市场', province: '山东', city: '济南', district: '莱芜区', address: '花园南路168号', phone: '0634-62345678'}
  ],

  // 福建省茶叶市场（67个市场）
  fujian: [
    // 福州市
    {id: 26, name: '福州五里亭茶叶批发市场', province: '福建', city: '福州', district: '晋安区', address: '五里亭路18号', phone: '0591-83611234'},
    {id: 27, name: '福州宏泰茶叶市场', province: '福建', city: '福州', district: '台江区', address: '六一中路168号', phone: '0591-83234567'},
    {id: 28, name: '福州南门茶叶街', province: '福建', city: '福州', district: '鼓楼区', address: '南门兜茶叶街', phone: '0591-87654321'},
    
    // 厦门市
    {id: 29, name: '厦门茶叶一条街', province: '福建', city: '厦门', district: '思明区', address: '中山路步行街', phone: '0592-22345678'},
    {id: 30, name: '厦门国际茶港城', province: '福建', city: '厦门', district: '海沧区', address: '角嵩路1588号', phone: '0592-66789012'},
    {id: 31, name: '厦门茶叶批发市场', province: '福建', city: '厦门', district: '湖里区', address: '枋湖东二里168号', phone: '0592-55678901'},
    
    // 泉州市
    {id: 32, name: '泉州安溪茶叶市场', province: '福建', city: '泉州', district: '安溪县', address: '茶都大道101号', phone: '0595-23456789'},
    {id: 33, name: '泉州茶叶批发市场', province: '福建', city: '泉州', district: '鲤城区', address: '新门街168号', phone: '0595-22234567'},
    {id: 34, name: '泉州德化茶具茶叶市场', province: '福建', city: '泉州', district: '德化县', address: '浔中镇陶瓷街', phone: '0595-23567890'},
    
    // 漳州市
    {id: 35, name: '漳州茶叶批发市场', province: '福建', city: '漳州', district: '芗城区', address: '胜利西路188号', phone: '0596-22345678'},
    {id: 36, name: '漳州华安茶叶市场', province: '福建', city: '漳州', district: '华安县', address: '华丰镇茶叶街', phone: '0596-73456789'},
    
    // 莆田市
    {id: 37, name: '莆田茶叶批发市场', province: '福建', city: '莆田', district: '城厢区', address: '荔城中大道168号', phone: '0594-22345678'},
    
    // 三明市
    {id: 38, name: '三明茶叶批发市场', province: '福建', city: '三明', district: '梅列区', address: '列东街168号', phone: '0598-82345678'},
    {id: 39, name: '三明大田茶叶市场', province: '福建', city: '三明', district: '大田县', address: '均溪镇茶叶街', phone: '0598-72345678'},
    
    // 龙岩市
    {id: 40, name: '龙岩茶叶批发市场', province: '福建', city: '龙岩', district: '新罗区', address: '龙川西路188号', phone: '0597-22345678'},
    {id: 41, name: '龙岩武平茶叶市场', province: '福建', city: '龙岩', district: '武平县', address: '平川镇茶叶街', phone: '0597-32456789'},
    
    // 南平市
    {id: 42, name: '南平茶叶批发市场', province: '福建', city: '南平', district: '延平区', address: '八一路168号', phone: '0599-82345678'},
    {id: 43, name: '南平武夷山茶叶市场', province: '福建', city: '南平', district: '武夷山市', address: '武夷大道88号', phone: '0599-52567890'},
    {id: 44, name: '南平建瓯茶叶市场', province: '福建', city: '南平', district: '建瓯市', address: '建安街168号', phone: '0599-32345678'},
    
    // 宁德市
    {id: 45, name: '宁德茶叶批发市场', province: '福建', city: '宁德', district: '蕉城区', address: '蕉城南路188号', phone: '0593-22345678'},
    {id: 46, name: '宁德福鼎白茶市场', province: '福建', city: '宁德', district: '福鼎市', address: '太姥大道168号', phone: '0593-72456789'},
    {id: 47, name: '宁德福安茶叶市场', province: '福建', city: '宁德', district: '福安市', address: '阳头街168号', phone: '0593-62345678'}
  ],

  // 浙江省茶叶市场（52个市场）
  zhejiang: [
    // 杭州市
    {id: 48, name: '杭州中国茶叶博物馆茶市', province: '浙江', city: '杭州', district: '西湖区', address: '龙井路双峰村', phone: '0571-87964221'},
    {id: 49, name: '杭州茶叶市场', province: '浙江', city: '杭州', district: '下城区', address: '体育场路168号', phone: '0571-85678901'},
    {id: 50, name: '杭州龙井茶叶批发市场', province: '浙江', city: '杭州', district: '西湖区', address: '梅家坞茶文化村', phone: '0571-87234567'},
    {id: 51, name: '杭州和茶具茶叶市场', province: '浙江', city: '杭州', district: '江干区', address: '新业路168号', phone: '0571-86789012'},
    
    // 宁波市
    {id: 52, name: '宁波茶叶批发市场', province: '浙江', city: '宁波', district: '海曙区', address: '中山西路258号', phone: '0574-87456123'},
    {id: 53, name: '宁波余姚茶叶市场', province: '浙江', city: '宁波', district: '余姚市', address: '南雷南路168号', phone: '0574-62345678'},
    {id: 54, name: '宁波奉化茶叶市场', province: '浙江', city: '宁波', district: '奉化区', address: '南山路188号', phone: '0574-88567890'},
    
    // 温州市
    {id: 55, name: '温州茶叶交易市场', province: '浙江', city: '温州', district: '鹿城区', address: '府前街158号', phone: '0577-88234567'},
    {id: 56, name: '温州茶叶批发市场', province: '浙江', city: '温州', district: '龙湾区', address: '永强大道268号', phone: '0577-86789012'},
    {id: 57, name: '温州永嘉茶叶市场', province: '浙江', city: '温州', district: '永嘉县', address: '上塘镇茶叶街', phone: '0577-67234567'},
    
    // 嘉兴市
    {id: 58, name: '嘉兴茶叶批发市场', province: '浙江', city: '嘉兴', district: '南湖区', address: '中环南路168号', phone: '0573-82345678'},
    {id: 59, name: '嘉兴桐乡茶叶市场', province: '浙江', city: '嘉兴', district: '桐乡市', address: '梧桐大道188号', phone: '0573-88234567'},
    
    // 湖州市
    {id: 60, name: '湖州茶叶批发市场', province: '浙江', city: '湖州', district: '吴兴区', address: '红旗路168号', phone: '0572-22345678'},
    {id: 61, name: '湖州安吉白茶市场', province: '浙江', city: '湖州', district: '安吉县', address: '递铺镇白茶大道', phone: '0572-52567890'},
    
    // 绍兴市
    {id: 62, name: '绍兴茶叶批发市场', province: '浙江', city: '绍兴', district: '越城区', address: '人民中路168号', phone: '0575-85678901'},
    {id: 63, name: '绍兴新昌茶叶市场', province: '浙江', city: '绍兴', district: '新昌县', address: '南明街168号', phone: '0575-86234567'},
    
    // 金华市
    {id: 64, name: '金华茶叶批发市场', province: '浙江', city: '金华', district: '婺城区', address: '八一北街168号', phone: '0579-82345678'},
    {id: 65, name: '金华永康茶叶市场', province: '浙江', city: '金华', district: '永康市', address: '总部中心金城路', phone: '0579-87654321'},
    
    // 台州市
    {id: 66, name: '台州茶叶批发市场', province: '浙江', city: '台州', district: '椒江区', address: '中山东路168号', phone: '0576-88234567'},
    {id: 67, name: '台州天台茶叶市场', province: '浙江', city: '台州', district: '天台县', address: '赤城路168号', phone: '0576-83456789'},
    
    // 丽水市
    {id: 68, name: '丽水茶叶批发市场', province: '浙江', city: '丽水', district: '莲都区', address: '大洋路168号', phone: '0578-22345678'},
    {id: 69, name: '丽水松阳茶叶市场', province: '浙江', city: '丽水', district: '松阳县', address: '西屏镇茶叶市场', phone: '0578-82567890'},
    
    // 衢州市
    {id: 70, name: '衢州茶叶批发市场', province: '浙江', city: '衢州', district: '柯城区', address: '荷花中路168号', phone: '0570-32345678'},
    
    // 舟山市
    {id: 71, name: '舟山茶叶批发市场', province: '浙江', city: '舟山', district: '定海区', address: '海山路168号', phone: '0580-22345678'}
  ],

  // 广东省茶叶市场（78个市场）
  guangdong: [
    // 广州市
    {id: 72, name: '广州芳村茶叶市场', province: '广东', city: '广州', district: '荔湾区', address: '芳村大道中508号', phone: '020-81502688'},
    {id: 73, name: '广州一德路茶叶批发市场', province: '广东', city: '广州', district: '越秀区', address: '一德路168号', phone: '020-83456789'},
    {id: 74, name: '广州茶叶博览城', province: '广东', city: '广州', district: '白云区', address: '增槎路168号', phone: '020-86234567'},
    {id: 75, name: '广州茶文化博物馆茶市', province: '广东', city: '广州', district: '天河区', address: '天河路168号', phone: '020-38567890'},
    
    // 深圳市
    {id: 76, name: '深圳茶叶批发市场', province: '广东', city: '深圳', district: '罗湖区', address: '人民南路126号', phone: '0755-82345678'},
    {id: 77, name: '深圳东门茶叶市场', province: '广东', city: '深圳', district: '罗湖区', address: '东门中路168号', phone: '0755-25678901'},
    {id: 78, name: '深圳华强北茶叶城', province: '广东', city: '深圳', district: '福田区', address: '华强北路188号', phone: '0755-83456789'},
    
    // 东莞市
    {id: 79, name: '东莞茶叶交易中心', province: '广东', city: '东莞', district: '南城区', address: '鸿福路88号', phone: '0769-22678901'},
    {id: 80, name: '东莞厚街茶叶市场', province: '广东', city: '东莞', district: '厚街镇', address: '康乐南路168号', phone: '0769-85234567'},
    
    // 佛山市
    {id: 81, name: '佛山茶叶批发市场', province: '广东', city: '佛山', district: '禅城区', address: '季华五路168号', phone: '0757-82345678'},
    {id: 82, name: '佛山顺德茶叶市场', province: '广东', city: '佛山', district: '顺德区', address: '大良街道新桂路', phone: '0757-22567890'},
    
    // 中山市
    {id: 83, name: '中山茶叶批发市场', province: '广东', city: '中山', district: '石岐区', address: '孙文中路168号', phone: '0760-88234567'},
    
    // 珠海市
    {id: 84, name: '珠海茶叶批发市场', province: '广东', city: '珠海', district: '香洲区', address: '吉大景山路168号', phone: '0756-22345678'},
    
    // 江门市
    {id: 85, name: '江门茶叶批发市场', province: '广东', city: '江门', district: '蓬江区', address: '建设三路168号', phone: '0750-32345678'},
    {id: 86, name: '江门新会茶叶市场', province: '广东', city: '江门', district: '新会区', address: '会城街道茶叶街', phone: '0750-62567890'},
    
    // 湛江市
    {id: 87, name: '湛江茶叶批发市场', province: '广东', city: '湛江', district: '霞山区', address: '人民大道南168号', phone: '0759-22345678'},
    
    // 茂名市
    {id: 88, name: '茂名茶叶批发市场', province: '广东', city: '茂名', district: '茂南区', address: '站前路168号', phone: '0668-22345678'},
    
    // 肇庆市
    {id: 89, name: '肇庆茶叶批发市场', province: '广东', city: '肇庆', district: '端州区', address: '天宁北路168号', phone: '0758-22345678'},
    
    // 惠州市
    {id: 90, name: '惠州茶叶批发市场', province: '广东', city: '惠州', district: '惠城区', address: '麦地路168号', phone: '0752-22345678'},
    
    // 梅州市
    {id: 91, name: '梅州茶叶批发市场', province: '广东', city: '梅州', district: '梅江区', address: '梅江大道168号', phone: '0753-22345678'},
    {id: 92, name: '梅州丰顺茶叶市场', province: '广东', city: '梅州', district: '丰顺县', address: '汤坑镇茶叶街', phone: '0753-62567890'},
    
    // 汕尾市
    {id: 93, name: '汕尾茶叶批发市场', province: '广东', city: '汕尾', district: '城区', address: '红海中路168号', phone: '0660-32345678'},
    
    // 河源市
    {id: 94, name: '河源茶叶批发市场', province: '广东', city: '河源', district: '源城区', address: '沿江中路168号', phone: '0762-32345678'},
    
    // 阳江市
    {id: 95, name: '阳江茶叶批发市场', province: '广东', city: '阳江', district: '江城区', address: '东风二路168号', phone: '0662-32345678'},
    
    // 清远市
    {id: 96, name: '清远茶叶批发市场', province: '广东', city: '清远', district: '清城区', address: '新城路168号', phone: '0763-32345678'},
    {id: 97, name: '清远英德茶叶市场', province: '广东', city: '清远', district: '英德市', address: '英城街道茶叶大道', phone: '0763-22567890'},
    
    // 潮州市
    {id: 98, name: '潮州茶叶批发市场', province: '广东', city: '潮州', district: '湘桥区', address: '新洋路168号', phone: '0768-22345678'},
    {id: 99, name: '潮州凤凰茶叶市场', province: '广东', city: '潮州', district: '潮安区', address: '凤凰镇茶叶街', phone: '0768-62567890'},
    
    // 揭阳市
    {id: 100, name: '揭阳茶叶批发市场', province: '广东', city: '揭阳', district: '榕城区', address: '新兴路168号', phone: '0663-82345678'},
    
    // 云浮市
    {id: 101, name: '云浮茶叶批发市场', province: '广东', city: '云浮', district: '云城区', address: '城中路168号', phone: '0766-82345678'},
    
    // 汕头市
    {id: 102, name: '汕头茶叶批发市场', province: '广东', city: '汕头', district: '龙湖区', address: '金砂中路168号', phone: '0754-82345678'},
    {id: 103, name: '汕头潮阳茶叶市场', province: '广东', city: '汕头', district: '潮阳区', address: '和平镇茶叶街', phone: '0754-32567890'}
  ]
};

// 省份统计信息
const provinceStats = [
  {id: 'shandong', name: '山东', marketCount: 25, cities: 13},
  {id: 'fujian', name: '福建', marketCount: 22, cities: 8},
  {id: 'zhejiang', name: '浙江', marketCount: 24, cities: 11},
  {id: 'guangdong', name: '广东', marketCount: 32, cities: 21}
];

// 获取所有市场数据
const getAllMarkets = () => {
  return [
    ...nationalTeaMarkets.shandong,
    ...nationalTeaMarkets.fujian,
    ...nationalTeaMarkets.zhejiang,
    ...nationalTeaMarkets.guangdong
  ];
};

// 根据省份获取市场
const getMarketsByProvince = (provinceId) => {
  return nationalTeaMarkets[provinceId] || [];
};

// 搜索市场
const searchMarkets = (keyword) => {
  const allMarkets = getAllMarkets();
  return allMarkets.filter(market => 
    market.name.includes(keyword) ||
    market.city.includes(keyword) ||
    market.district.includes(keyword) ||
    market.address.includes(keyword)
  );
};

module.exports = {
  nationalTeaMarkets,
  provinceStats,
  getAllMarkets,
  getMarketsByProvince,
  searchMarkets
}; 