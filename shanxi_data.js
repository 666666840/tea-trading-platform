// 山西省茶叶市场数据
const shanxiTeaMarkets = {
  // 省份信息
  province: {
    id: 16,
    name: '山西省',
    marketCount: 67
  },

  // 市场数据
  markets: [
    // 太原市
    { id: 1, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '山西马连道茶城', address: '小店区' },
    { id: 2, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '太原茶叶场（南宫市场）', address: '小店区' },
    { id: 3, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '太原茶叶茶具场', address: '小店区' },
    { id: 4, provinceId: 16, province: '山西省', city: '太原市', district: '万柏林区', name: '和平茶城', address: '万柏林区' },
    { id: 5, provinceId: 16, province: '山西省', city: '太原市', district: '万柏林区', name: '太原中奥茶城', address: '万柏林区' },
    { id: 6, provinceId: 16, province: '山西省', city: '太原市', district: '尖草坪区', name: '山西北方商贸城茶叶市场', address: '尖草坪区' },
    { id: 7, provinceId: 16, province: '山西省', city: '太原市', district: '尖草坪区', name: '太原现代茶城', address: '尖草坪区' },
    { id: 8, provinceId: 16, province: '山西省', city: '太原市', district: '迎泽区', name: '新闻大厦茶叶城', address: '迎泽区' },
    { id: 9, provinceId: 16, province: '山西省', city: '太原市', district: '迎泽区', name: '光华市场', address: '迎泽区' },

    // 大同市
    { id: 10, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '东信广场茶叶一条街（东信茶叶批零市场）', address: '平城区' },
    { id: 11, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '南方茶城', address: '平城区' },
    { id: 12, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '云中商城茶业集群（含裕德缘茶行、云中茶叙等商户）', address: '平城区' },
    { id: 13, provinceId: 16, province: '山西省', city: '大同市', district: '古城文旅区', name: '福茂源茶庄（迎泽南街）', address: '古城文旅区' },
    { id: 14, provinceId: 16, province: '山西省', city: '大同市', district: '古城文旅区', name: '一烟玖鼎茶社（南方茶城）', address: '古城文旅区' },

    // 忻州市
    { id: 15, provinceId: 16, province: '山西省', city: '忻州市', district: '市区核心', name: '忻州茶城', address: '市区核心' },
    { id: 16, provinceId: 16, province: '山西省', city: '忻州市', district: '市区核心', name: '北城区茶叶场', address: '市区核心' },
    { id: 17, provinceId: 16, province: '山西省', city: '忻州市', district: '市区核心', name: '南城区茶叶商贸中心', address: '市区核心' },
    { id: 18, provinceId: 16, province: '山西省', city: '忻州市', district: '忻府区', name: '彩云之南古树茶庄（和平东街）', address: '忻府区' },
    { id: 19, provinceId: 16, province: '山西省', city: '忻州市', district: '忻府区', name: '惠客茗茶茶叶店（和平西街）', address: '忻府区' },
    { id: 20, provinceId: 16, province: '山西省', city: '忻州市', district: '忻府区', name: '仓静茶叶经销部（开发区）', address: '忻府区' },
    { id: 21, provinceId: 16, province: '山西省', city: '忻州市', district: '五台县', name: '五台县聚源茶庄（台城镇）', address: '五台县' },
    { id: 22, provinceId: 16, province: '山西省', city: '忻州市', district: '原平市', name: '原平市明镜山茶叶科技公司（云水镇）', address: '原平市' },
    { id: 23, provinceId: 16, province: '山西省', city: '忻州市', district: '定襄县', name: '定襄县茶空间茶叶店（晋昌镇）', address: '定襄县' },

    // 朔州市
    { id: 24, provinceId: 16, province: '山西省', city: '朔州市', district: '朔城区', name: '晋闽茶城·马邑古玩城（政务大厅东侧）', address: '朔城区' },
    { id: 25, provinceId: 16, province: '山西省', city: '朔州市', district: '开发区', name: '开发区茶叶批发聚集区（建设北路发斯特大厦）', address: '开发区' },
    { id: 26, provinceId: 16, province: '山西省', city: '朔州市', district: '开发区', name: '老曼娥茶叶店', address: '开发区' },
    { id: 27, provinceId: 16, province: '山西省', city: '朔州市', district: '开发区', name: '华鑫茶叶经销部', address: '开发区' },

    // 吕梁市
    { id: 28, provinceId: 16, province: '山西省', city: '吕梁市', district: '离石区', name: '永宁市场茶叶聚集区（含江南茗茶、如宝茶叶经销店）', address: '离石区' },
    { id: 29, provinceId: 16, province: '山西省', city: '吕梁市', district: '离石区', name: '新华街茶叶批发点（连香茶叶经销部）', address: '离石区' },
    { id: 30, provinceId: 16, province: '山西省', city: '吕梁市', district: '柳林县', name: '红枣街茗香茶庄（三交镇）', address: '柳林县' },
    { id: 31, provinceId: 16, province: '山西省', city: '吕梁市', district: '兴县', name: '平水供销社横溪收茶站（平水镇）', address: '兴县' },

    // 阳泉市
    { id: 32, provinceId: 16, province: '山西省', city: '阳泉市', district: '高新区', name: '阳泉滇好茶叶批发市场（高新区，经营状态需确认）', address: '高新区' },
    { id: 33, provinceId: 16, province: '山西省', city: '阳泉市', district: '城区', name: '康盛茶叶经销部（城区七一市场）', address: '城区' },
    { id: 34, provinceId: 16, province: '山西省', city: '阳泉市', district: '城区', name: '七一市场茶叶区', address: '城区' },

    // 晋中市
    { id: 35, provinceId: 16, province: '山西省', city: '晋中市', district: '榆次区', name: '晋中批发茶叶市场（丰产路）', address: '榆次区' },
    { id: 36, provinceId: 16, province: '山西省', city: '晋中市', district: '榆次区', name: '晋都副食茶叶粮店街批发部（粮店街）', address: '榆次区' },
    { id: 37, provinceId: 16, province: '山西省', city: '晋中市', district: '榆次区', name: '旺春茶庄（窑北街）', address: '榆次区' },
    { id: 38, provinceId: 16, province: '山西省', city: '晋中市', district: '榆次区', name: '八马茶叶经销部（颐景新城）', address: '榆次区' },

    // 长治市
    { id: 39, provinceId: 16, province: '山西省', city: '长治市', district: '潞州区', name: '潞州区府后西街茶叶市场', address: '潞州区' },
    { id: 40, provinceId: 16, province: '山西省', city: '长治市', district: '潞州区', name: '云亭茶叶经销部（华东小区）', address: '潞州区' },
    { id: 41, provinceId: 16, province: '山西省', city: '长治市', district: '潞州区', name: '帕拉纳马代茶茶业经销部（炉坊小区）', address: '潞州区' },

    // 晋城市
    { id: 42, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '晋城茶叶场（凤台东街商贸城）', address: '城区' },
    { id: 43, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '晋城市茶叶场（中原路）', address: '城区' },
    { id: 44, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '晋城市茶文化市场（文峰路）', address: '城区' },
    { id: 45, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '普洱茶博物馆（建设南路）', address: '城区' },
    { id: 46, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '普洱茶缘（人民路）', address: '城区' },
    { id: 47, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '周水龙茶叶经销部（前进路）', address: '城区' },
    { id: 48, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '闽浙茶叶批发部（黄华街）', address: '城区' },
    { id: 49, provinceId: 16, province: '山西省', city: '晋城市', district: '城区', name: '风炉茶叶经销店（凤台东街）', address: '城区' },
    { id: 50, provinceId: 16, province: '山西省', city: '晋城市', district: '阳城县', name: '阳城县城誉润茶叶（阳城县）', address: '阳城县' },
    { id: 51, provinceId: 16, province: '山西省', city: '晋城市', district: '开发区', name: '明之远茶叶销售部（开发区）', address: '开发区' },

    // 临汾市
    { id: 52, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '临汾茶叶场（解放东路）', address: '尧都区' },
    { id: 53, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '华强茶城（南外环）', address: '尧都区' },
    { id: 54, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '新临汾茶叶场（解放东路与光明街交叉口）', address: '尧都区' },
    { id: 55, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '鼓楼南街茶叶市场', address: '尧都区' },
    { id: 56, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '古城路茶叶市场', address: '尧都区' },
    { id: 57, provinceId: 16, province: '山西省', city: '临汾市', district: '尧都区', name: '高铁茂发茶行（高铁西站）', address: '尧都区' },
    { id: 58, provinceId: 16, province: '山西省', city: '临汾市', district: '侯马市', name: '晋都茶城（晋都西路）', address: '侯马市' },

    // 运城市
    { id: 59, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '盐湖区北城茶叶场（棉北街）', address: '盐湖区' },
    { id: 60, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '运城茶叶交易市场（文化路）', address: '盐湖区' },
    { id: 61, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '晋闽茶城·马邑古玩城（政务大厅东）', address: '盐湖区' },
    { id: 62, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '禹都市场茶叶区（巧巧茶叶批发部等）', address: '盐湖区' },
    { id: 63, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '高铁茂发茶行（高铁西站）', address: '盐湖区' },
    { id: 64, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '上品阁茶叶店', address: '盐湖区' },
    { id: 65, provinceId: 16, province: '山西省', city: '运城市', district: '盐湖区', name: '清香茶业', address: '盐湖区' }
  ]
};

// 导出数据
module.exports = shanxiTeaMarkets; 