// 陕西省茶叶市场数据
const shaanxiTeaMarkets = {
  province: {
    id: 20,
    name: '陕西省',
    marketCount: 67
  },
  markets: [
    // 西安市
    { id: 1, provinceId: 20, province: '陕西省', city: '西安市', district: '新城区', name: '西安茶叶场（西北茶城）', address: '新城区' },
    { id: 2, provinceId: 20, province: '陕西省', city: '西安市', district: '新城区', name: '金康路茶叶一条街', address: '新城区' },
    { id: 3, provinceId: 20, province: '陕西省', city: '西安市', district: '雁塔区', name: '西安轻工茶叶批发市场（西部茶城）', address: '雁塔区' },
    { id: 4, provinceId: 20, province: '陕西省', city: '西安市', district: '未央区', name: '西北茶城（西郊茶叶场）', address: '未央区' },
    { id: 5, provinceId: 20, province: '陕西省', city: '西安市', district: '未央区', name: '西安北郊茶叶市场', address: '未央区' },
    { id: 6, provinceId: 20, province: '陕西省', city: '西安市', district: '未央区', name: '六安国际光彩茶叶大市场', address: '未央区' },
    { id: 7, provinceId: 20, province: '陕西省', city: '西安市', district: '曲江新区', name: '大唐茶城', address: '曲江新区' },

    // 宝鸡市
    { id: 8, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '陈仓区', name: '宝鸡茶叶场', address: '陈仓区' },
    { id: 9, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '金台区', name: '宝鸡茶叶交易市场', address: '金台区' },
    { id: 10, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '金台区', name: '宝鸡茶叶批发市场（新民路）', address: '金台区' },
    { id: 11, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '渭滨区', name: '宝鸡茶叶城', address: '渭滨区' },
    { id: 12, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '渭滨区', name: '红旗路汉唐茶城', address: '渭滨区' },
    { id: 13, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '凤翔区', name: '凤翔区茶叶经销部', address: '凤翔区' },
    { id: 14, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '岐山县', name: '宝鸡佳毫商贸有限公司', address: '岐山县' },

    // 咸阳市
    { id: 15, provinceId: 20, province: '陕西省', city: '咸阳市', district: '秦都区', name: '酌茗居茶叶商贸中心', address: '秦都区' },
    { id: 16, provinceId: 20, province: '陕西省', city: '咸阳市', district: '秦都区', name: '金盛茶城', address: '秦都区' },
    { id: 17, provinceId: 20, province: '陕西省', city: '咸阳市', district: '秦都区', name: '西兰路茶叶批发集群', address: '秦都区' },
    { id: 18, provinceId: 20, province: '陕西省', city: '咸阳市', district: '渭城区', name: '茶苑轩茶叶店', address: '渭城区' },
    { id: 19, provinceId: 20, province: '陕西省', city: '咸阳市', district: '渭城区', name: '旭琪钧浩经销部', address: '渭城区' },
    { id: 20, provinceId: 20, province: '陕西省', city: '咸阳市', district: '渭城区', name: '硒源茶叶店', address: '渭城区' },
    { id: 21, provinceId: 20, province: '陕西省', city: '咸阳市', district: '泾阳县', name: '泾河新城熙宁茯茶经销中心', address: '泾阳县' },
    { id: 22, provinceId: 20, province: '陕西省', city: '咸阳市', district: '老街巷', name: '三宁茶业', address: '老街巷' },

    // 铜川市
    { id: 23, provinceId: 20, province: '陕西省', city: '铜川市', district: '耀州区', name: '华原市场茶叶区（含舒芝紫阳茶庄）', address: '耀州区' },

    // 延安市
    { id: 24, provinceId: 20, province: '陕西省', city: '延安市', district: '宝塔区', name: '延安茶叶市场', address: '宝塔区' },
    { id: 25, provinceId: 20, province: '陕西省', city: '延安市', district: '宝塔区', name: '延安集贸市场', address: '宝塔区' },
    { id: 26, provinceId: 20, province: '陕西省', city: '延安市', district: '宝塔区', name: '延安农产品场', address: '宝塔区' },
    { id: 27, provinceId: 20, province: '陕西省', city: '延安市', district: '宝塔区', name: '延安茶城', address: '宝塔区' },
    { id: 28, provinceId: 20, province: '陕西省', city: '延安市', district: '延川县', name: '共和茶叶街', address: '延川县' },
    { id: 29, provinceId: 20, province: '陕西省', city: '延安市', district: '宜川县', name: '奎山茶叶市场', address: '宜川县' },
    { id: 30, provinceId: 20, province: '陕西省', city: '延安市', district: '延长县', name: '勉川茶叶市场', address: '延长县' },

    // 渭南市
    { id: 31, provinceId: 20, province: '陕西省', city: '渭南市', district: '华州区', name: '渭南茶叶场', address: '华州区' },
    { id: 32, provinceId: 20, province: '陕西省', city: '渭南市', district: '临渭区', name: '陕西十贰茶肆茶业有限公司', address: '临渭区' },
    { id: 33, provinceId: 20, province: '陕西省', city: '渭南市', district: '临渭区', name: '人民街茶叶经销集群', address: '临渭区' },
    { id: 34, provinceId: 20, province: '陕西省', city: '渭南市', district: '泾阳县', name: '熙宁茯茶经销中心', address: '泾阳县' },

    // 汉中市
    { id: 35, provinceId: 20, province: '陕西省', city: '汉中市', district: '汉台区', name: '南郑茶叶市场', address: '汉台区' },
    { id: 36, provinceId: 20, province: '陕西省', city: '汉中市', district: '汉台区', name: '汉中茶城', address: '汉台区' },
    { id: 37, provinceId: 20, province: '陕西省', city: '汉中市', district: '汉台区', name: '宏运茶叶经营部', address: '汉台区' },
    { id: 38, provinceId: 20, province: '陕西省', city: '汉中市', district: '汉台区', name: '汉中天泽茶城', address: '汉台区' },
    { id: 39, provinceId: 20, province: '陕西省', city: '汉中市', district: '汉台区', name: '茶叶特产市集', address: '汉台区' },
    { id: 40, provinceId: 20, province: '陕西省', city: '汉中市', district: '南郑区', name: '南郑茶叶市场（文苑路）', address: '南郑区' },
    { id: 41, provinceId: 20, province: '陕西省', city: '汉中市', district: '西乡县', name: '西乡茶叶市场', address: '西乡县' },
    { id: 42, provinceId: 20, province: '陕西省', city: '汉中市', district: '城固县', name: '城固茶叶交易点', address: '城固县' },

    // 榆林市
    { id: 43, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '榆林茶叶场', address: '榆阳区' },
    { id: 44, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '榆林茶具场', address: '榆阳区' },
    { id: 45, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '李宏茶叶批发', address: '榆阳区' },
    { id: 46, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '榆阳区万泰鑫龙茶叶店', address: '榆阳区' },
    { id: 47, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '天合茶叶销售店', address: '榆阳区' },
    { id: 48, provinceId: 20, province: '陕西省', city: '榆林市', district: '榆阳区', name: '茶茗堂茶叶', address: '榆阳区' },
    { id: 49, provinceId: 20, province: '陕西省', city: '榆林市', district: '府谷县', name: '八马茶叶旗舰店', address: '府谷县' },
    { id: 50, provinceId: 20, province: '陕西省', city: '榆林市', district: '府谷县', name: '九马茶行', address: '府谷县' },
    { id: 51, provinceId: 20, province: '陕西省', city: '榆林市', district: '横山区', name: '兰聚阁茶叶店', address: '横山区' },
    { id: 52, provinceId: 20, province: '陕西省', city: '榆林市', district: '高新区', name: '圣景普洱茶经销店', address: '高新区' },

    // 安康市
    { id: 53, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '天源茶城', address: '汉滨区' },
    { id: 54, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '安康富硒茶城（即将开业）', address: '汉滨区' },
    { id: 55, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '江北大道茶叶批发市场', address: '汉滨区' },
    { id: 56, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '小南门商圈（含福泰茶业、茶景缘）', address: '汉滨区' },
    { id: 57, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '双安辉茶叶批发部', address: '汉滨区' },
    { id: 58, provinceId: 20, province: '陕西省', city: '安康市', district: '汉滨区', name: '泽茗茶叶经销部', address: '汉滨区' },

    // 商洛市
    { id: 59, provinceId: 20, province: '陕西省', city: '商洛市', district: '商南县', name: '商南县茶叶博览园', address: '商南县' },
    { id: 60, provinceId: 20, province: '陕西省', city: '商洛市', district: '商南县', name: '商南县茶业市场', address: '商南县' },
    { id: 61, provinceId: 20, province: '陕西省', city: '商洛市', district: '商南县', name: '试马北茶小镇（茶文旅园区）', address: '商南县' },
    { id: 62, provinceId: 20, province: '陕西省', city: '商洛市', district: '商南县', name: '富水茶产业示范园（茶文旅园区）', address: '商南县' }
  ]
};

module.exports = shaanxiTeaMarkets; 