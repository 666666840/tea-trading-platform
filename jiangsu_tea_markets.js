// 江苏省茶叶市场数据
const jiangsuTeaMarkets = {
  id: 'jiangsu',
  name: '江苏省',
  cities: [
    // 南京市
    {
      id: 'nanjing',
      name: '南京市',
      districts: [
        {
          id: 'gulou',
          name: '鼓楼区',
          markets: [
            { id: 'xiaguan_tea_market', name: '下关茶叶市场', location: '江苏省南京市鼓楼区', address: '鼓楼区', description: '下关地区茶叶交易市场' },
            { id: 'hesheng_tea_field', name: '禾盛茶叶场', location: '江苏省南京市鼓楼区', address: '鼓楼区', description: '禾盛茶叶交易场' }
          ]
        },
        {
          id: 'jianye',
          name: '建邺区',
          markets: [
            { id: 'jiangsu_zhengda_tea_city', name: '江苏正大茶城', location: '江苏省南京市建邺区', address: '建邺区', description: '江苏正大茶城交易中心' },
            { id: 'nanjing_puer_tea_center', name: '南京普洱茶交易中心', location: '江苏省南京市建邺区', address: '建邺区', description: '南京普洱茶专营交易中心' }
          ]
        },
        {
          id: 'pukou',
          name: '浦口区（江北）',
          markets: [
            { id: 'nanjing_south_station_tea_city', name: '南京南站茶城', location: '江苏省南京市浦口区', address: '浦口区', description: '南京南站茶城交易中心' }
          ]
        },
        {
          id: 'jiangning',
          name: '江宁区',
          markets: [
            { id: 'lulang_tea_wholesale', name: '陆朗茶叶批发', location: '江苏省南京市江宁区', address: '江宁区', description: '陆朗茶叶批发市场' }
          ]
        },
        {
          id: 'qinhuai',
          name: '秦淮区',
          markets: [
            { id: 'fuzimiao_tea_market', name: '夫子庙茶叶市场', location: '江苏省南京市秦淮区', address: '秦淮区', description: '夫子庙茶叶交易市场' },
            { id: 'xinyu_lianghang', name: '信誉粮行', location: '江苏省南京市秦淮区', address: '秦淮区', description: '信誉粮行茶叶交易' }
          ]
        }
      ]
    },
    // 无锡市
    {
      id: 'wuxi',
      name: '无锡市',
      districts: [
        {
          id: 'liangxi',
          name: '梁溪区',
          markets: [
            { id: 'hongxing_tea_wholesale_market', name: '红星茶叶批发市场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '红星茶叶批发市场' },
            { id: 'chaoyang_tea_market', name: '朝阳茶叶市场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '朝阳茶叶交易市场' },
            { id: 'dajiangnan_tea_field', name: '大江南茶叶场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '大江南茶叶交易场' }
          ]
        },
        {
          id: 'nanchang',
          name: '南长区',
          markets: [
            { id: 'taihu_tea_market', name: '太湖茶叶市场', location: '江苏省无锡市南长区', address: '南长区', description: '太湖茶叶交易市场' }
          ]
        },
        {
          id: 'xinqu',
          name: '新区',
          markets: [
            { id: 'wuxi_international_tea_city', name: '无锡国际茶叶城', location: '江苏省无锡市新区', address: '新区', description: '无锡国际茶叶城交易中心' }
          ]
        },
        {
          id: 'specialty_wholesale',
          name: '特色批发',
          markets: [
            { id: 'hongtaiyang_tea_city', name: '红太阳茶叶城', location: '江苏省无锡市', address: '无锡市', description: '红太阳茶叶城交易中心' },
            { id: 'qianhong_zaochun_tea', name: '乾红·早春茶', location: '江苏省无锡市', address: '无锡市', description: '乾红早春茶专营店' },
            { id: 'zhaoshang_tea_city', name: '招商城茶城', location: '江苏省无锡市', address: '无锡市', description: '招商城茶城交易中心' }
          ]
        }
      ]
    },
    // 徐州市
    {
      id: 'xuzhou',
      name: '徐州市',
      districts: [
        {
          id: 'yunlong',
          name: '云龙区',
          markets: [
            { id: 'yumao_tea_market', name: '裕茂茶叶市场', location: '江苏省徐州市云龙区', address: '云龙区', description: '裕茂茶叶交易市场' },
            { id: 'xuzhou_tea_field', name: '徐州茶叶场', location: '江苏省徐州市云龙区', address: '云龙区', description: '徐州茶叶交易场' }
          ]
        },
        {
          id: 'gulou_xuzhou',
          name: '鼓楼区',
          markets: [
            { id: 'minnan_tea_market', name: '闽南茶叶市场', location: '江苏省徐州市鼓楼区', address: '鼓楼区', description: '闽南茶叶交易市场' },
            { id: 'laotongchang_tea_market', name: '老同昌茶叶市场', location: '江苏省徐州市鼓楼区', address: '鼓楼区', description: '老同昌茶叶交易市场' }
          ]
        },
        {
          id: 'quanshan',
          name: '泉山区',
          markets: [
            { id: 'quanshan_tea_distribution', name: '泉山茶叶集散区', location: '江苏省徐州市泉山区', address: '泉山区', description: '泉山茶叶集散交易区' },
            { id: 'hubushan_tea_market', name: '户部山茶叶市场', location: '江苏省徐州市泉山区', address: '泉山区', description: '户部山茶叶交易市场' }
          ]
        }
      ]
    },
    // 常州市
    {
      id: 'changzhou',
      name: '常州市',
      districts: [
        {
          id: 'main_city',
          name: '主城区',
          markets: [
            { id: 'yipin_tea_market', name: '一品茶叶交易市场', location: '江苏省常州市主城区', address: '主城区', description: '一品茶叶交易市场' },
            { id: 'yinqiao_tea_market', name: '银桥茶叶市场（马坝古镇）', location: '江苏省常州市主城区', address: '主城区', description: '马坝古镇银桥茶叶市场' },
            { id: 'bazu_kaigu_international', name: '霸祖开古国际兰陵茶城（常州普洱茶场）', location: '江苏省常州市主城区', address: '主城区', description: '霸祖开古国际兰陵茶城' },
            { id: 'buyecheng_tea_field', name: '不夜城茶叶场', location: '江苏省常州市主城区', address: '主城区', description: '不夜城茶叶交易场' }
          ]
        },
        {
          id: 'jintan',
          name: '金坛区',
          markets: [
            { id: 'huashan_tea_market', name: '花山茶叶市场', location: '江苏省常州市金坛区', address: '金坛区', description: '花山茶叶交易市场' },
            { id: 'maolu_tea_market', name: '茅麓茶叶市场', location: '江苏省常州市金坛区', address: '金坛区', description: '茅麓茶叶交易市场' }
          ]
        }
      ]
    },
    // 苏州市
    {
      id: 'suzhou',
      name: '苏州市',
      districts: [
        {
          id: 'gusong',
          name: '姑苏区',
          markets: [
            { id: 'dalonggang_tea_wholesale', name: '大龙港茶叶批发市场', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '大龙港茶叶批发市场' },
            { id: 'huilin_xinshi', name: '汇邻·新市（原苏州茶叶市场）', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '汇邻新市茶叶交易中心' },
            { id: 'anhejin_meidi_park', name: '安和锦·美地PARK茶人街', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '安和锦美地PARK茶人街' }
          ]
        },
        {
          id: 'wuzhong',
          name: '吴中区',
          markets: [
            { id: 'nanmen_tea_wholesale', name: '南门茶叶批发市场', location: '江苏省苏州市吴中区', address: '吴中区', description: '南门茶叶批发市场' },
            { id: 'tiantu_tea_city', name: '天荼茶城（木渎凯马广场）', location: '江苏省苏州市吴中区', address: '吴中区', description: '木渎凯马广场天荼茶城' }
          ]
        }
      ]
    },
    // 南通市
    {
      id: 'nantong',
      name: '南通市',
      districts: [
        {
          id: 'nantong_city',
          name: '南通市',
          markets: [
            { id: 'nantong_international_tea_city', name: '南通国际茶城', location: '江苏省南通市', address: '南通市', description: '南通国际茶城交易中心' },
            { id: 'nantong_tea_city', name: '南通茶叶城', location: '江苏省南通市', address: '南通市', description: '南通茶叶城交易中心' },
            { id: 'wenfeng_tea_market', name: '文峰茶叶市场', location: '江苏省南通市', address: '南通市', description: '文峰茶叶交易市场' },
            { id: 'lvyuan_tea_market', name: '绿源茶叶市场', location: '江苏省南通市', address: '南通市', description: '绿源茶叶交易市场' }
          ]
        }
      ]
    },
    // 连云港市
    {
      id: 'lianyungang',
      name: '连云港市',
      districts: [
        {
          id: 'haizhou',
          name: '海州区',
          markets: [
            { id: 'siji_agricultural_tea_section', name: '四季农副产品场茶叶专区', location: '江苏省连云港市海州区', address: '海州区', description: '四季农副产品场茶叶专区' },
            { id: 'baihushan_wholesale_market', name: '白虎山批发市场', location: '江苏省连云港市海州区', address: '海州区', description: '白虎山批发市场茶叶区' }
          ]
        },
        {
          id: 'lianyun',
          name: '连云区',
          markets: [
            { id: 'huadong_tea_market', name: '华东城茶叶市场', location: '江苏省连云港市连云区', address: '连云区', description: '华东城茶叶交易市场' }
          ]
        }
      ]
    },
    // 淮安市
    {
      id: 'huaian',
      name: '淮安市',
      districts: [
        {
          id: 'qingjiangpu',
          name: '清江浦区',
          markets: [
            { id: 'fulin_tea_wholesale', name: '福林茶叶批发市场', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '福林茶叶批发市场' },
            { id: 'qingjiangpu_tea_market', name: '清江浦区茶叶市场（圩北路市场）', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '圩北路茶叶交易市场' },
            { id: 'huaian_tea_wholesale_center', name: '淮安市茶叶批发中心', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '淮安市茶叶批发中心' },
            { id: 'huaian_ancient_tea_street', name: '淮安古茶街', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '淮安古茶街交易中心' }
          ]
        },
        {
          id: 'huaiyin_qinghe',
          name: '淮阴区/清河新区',
          markets: [
            { id: 'huaian_tea_market', name: '淮安茶叶大市场', location: '江苏省淮安市淮阴区', address: '淮阴区', description: '淮安茶叶大市场交易中心' },
            { id: 'huaian_international_tea_city', name: '淮安国际茶城', location: '江苏省淮安市淮阴区', address: '淮阴区', description: '淮安国际茶城交易中心' }
          ]
        }
      ]
    },
    // 盐城市
    {
      id: 'yancheng',
      name: '盐城市',
      districts: [
        {
          id: 'yancheng_city',
          name: '盐城市',
          markets: [
            { id: 'baima_tea_market', name: '白马茶叶市场', location: '江苏省盐城市', address: '盐城市', description: '白马茶叶交易市场' },
            { id: 'jiangsu_zhengda_tea_city_yancheng', name: '江苏正大茶叶城', location: '江苏省盐城市', address: '盐城市', description: '江苏正大茶叶城交易中心' },
            { id: 'jiuding_tea_field', name: '九鼎茶叶场', location: '江苏省盐城市', address: '盐城市', description: '九鼎茶叶交易场' },
            { id: 'tea_market_new_location', name: '茶叶大市场（新址）', location: '江苏省盐城市', address: '盐城市', description: '茶叶大市场新址交易中心' },
            { id: 'ziwei_tea_city', name: '紫薇茶城', location: '江苏省盐城市', address: '盐城市', description: '紫薇茶城交易中心' }
          ]
        }
      ]
    },
    // 扬州市
    {
      id: 'yangzhou',
      name: '扬州市',
      districts: [
        {
          id: 'guangling',
          name: '广陵区',
          markets: [
            { id: 'yangzhou_agricultural_tea_field', name: '扬州农业茶叶场', location: '江苏省扬州市广陵区', address: '广陵区', description: '扬州农业茶叶交易场' },
            { id: 'hehuachi_walking_tea_field', name: '荷花池步行街茶叶场', location: '江苏省扬州市广陵区', address: '广陵区', description: '荷花池步行街茶叶交易场' },
            { id: 'tianmuchun_tea_wholesale', name: '天目春茶业批发部', location: '江苏省扬州市广陵区', address: '广陵区', description: '天目春茶业批发部' }
          ]
        },
        {
          id: 'hanjiang',
          name: '邗江区',
          markets: [
            { id: 'yangzhou_tea_field', name: '扬州茶叶场（原南门市场）', location: '江苏省扬州市邗江区', address: '邗江区', description: '原南门市场茶叶交易场' },
            { id: 'yongshang_tea_wholesale', name: '永尚茶叶批发部', location: '江苏省扬州市邗江区', address: '邗江区', description: '永尚茶叶批发部' },
            { id: 'runyang_tea_field', name: '润扬茶叶场', location: '江苏省扬州市邗江区', address: '邗江区', description: '润扬茶叶交易场' }
          ]
        },
        {
          id: 'jiangdu',
          name: '江都区',
          markets: [
            { id: 'eqiao_tea_wholesale_market', name: '峨桥镇茶叶批发市场', location: '江苏省扬州市江都区', address: '江都区', description: '峨桥镇茶叶批发市场' }
          ]
        }
      ]
    },
    // 镇江市
    {
      id: 'zhenjiang',
      name: '镇江市',
      districts: [
        {
          id: 'zhenjiang_city',
          name: '镇江市',
          markets: [
            { id: 'jingkou_tea_market', name: '京口路茶叶市场（京口路茶叶城）', location: '江苏省镇江市', address: '镇江市', description: '京口路茶叶城交易中心' },
            { id: 'zhenjiang_yiwu_tea_wholesale', name: '镇江义乌小商品城茶叶批发市场', location: '江苏省镇江市', address: '镇江市', description: '义乌小商品城茶叶批发市场' },
            { id: 'xinba_tea_city', name: '新坝茶叶城', location: '江苏省镇江市', address: '镇江市', description: '新坝茶叶城交易中心' }
          ]
        }
      ]
    },
    // 泰州市
    {
      id: 'taizhou',
      name: '泰州市',
      districts: [
        {
          id: 'hailing',
          name: '海陵区',
          markets: [
            { id: 'taizhou_tea_city', name: '泰州市茶叶城', location: '江苏省泰州市海陵区', address: '海陵区', description: '泰州市茶叶城交易中心' },
            { id: 'jiulong_food_market', name: '九龙副食品市场（茶叶专区）', location: '江苏省泰州市海陵区', address: '海陵区', description: '九龙副食品市场茶叶专区' },
            { id: 'taizhou_agricultural_center', name: '泰州市农副产品中心场', location: '江苏省泰州市海陵区', address: '海陵区', description: '泰州市农副产品中心场' },
            { id: 'sixiang_tea_city', name: '寺巷茶叶城', location: '江苏省泰州市海陵区', address: '海陵区', description: '寺巷茶叶城交易中心' },
            { id: 'lvsexinqing_tea_ware', name: '绿色心情茶叶茶具批发商行', location: '江苏省泰州市海陵区', address: '海陵区', description: '绿色心情茶叶茶具批发商行' }
          ]
        },
        {
          id: 'gaogang_jiangyan',
          name: '高港区/姜堰区',
          markets: [
            { id: 'lishan_tea_shop', name: '历山茶行', location: '江苏省泰州市高港区', address: '高港区', description: '历山茶行交易中心' },
            { id: 'xiaoye_tea_wholesale', name: '小叶茶叶批发', location: '江苏省泰州市姜堰区', address: '姜堰区', description: '小叶茶叶批发市场' }
          ]
        }
      ]
    },
    // 宿迁市
    {
      id: 'suqian',
      name: '宿迁市',
      districts: [
        {
          id: 'suqian_city',
          name: '宿迁市',
          markets: [
            { id: 'eqiao_tea_trading_market', name: '峨桥茶叶交易市场', location: '江苏省宿迁市', address: '宿迁市', description: '峨桥茶叶交易市场' },
            { id: 'hongxing_kaisheng_tea_city', name: '红星凯盛茶叶城', location: '江苏省宿迁市', address: '宿迁市', description: '红星凯盛茶叶城交易中心' },
            { id: 'suqian_shoumei_white_tea_field', name: '宿迁寿眉白茶场', location: '江苏省宿迁市', address: '宿迁市', description: '宿迁寿眉白茶交易场' },
            { id: 'suqian_puer_tea_field', name: '宿迁市普洱茶场', location: '江苏省宿迁市', address: '宿迁市', description: '宿迁市普洱茶交易场' }
          ]
        }
      ]
    },
    // 昆山市
    {
      id: 'kunshan',
      name: '昆山市',
      districts: [
        {
          id: 'kunshan_city',
          name: '昆山市',
          markets: [
            { id: 'chunhui_tea_wholesale_market', name: '春晖茶叶批发市场', location: '江苏省昆山市', address: '昆山市', description: '春晖茶叶批发市场' },
            { id: 'kunshan_tea_city', name: '昆山茶叶城', location: '江苏省昆山市', address: '昆山市', description: '昆山茶叶城交易中心' },
            { id: 'yushan_tea_market', name: '玉山茶叶市场', location: '江苏省昆山市', address: '昆山市', description: '玉山茶叶交易市场' },
            { id: 'huayuan_tea_street', name: '花园路茶叶街', location: '江苏省昆山市', address: '昆山市', description: '花园路茶叶交易街' },
            { id: 'yushan_comprehensive_wholesale', name: '玉山镇综合批发市场（含兴灿茶叶批发部、宝法茶叶南北货批发总汇）', location: '江苏省昆山市', address: '昆山市', description: '玉山镇综合批发市场茶叶区' }
          ]
        }
      ]
    },
    // 泰兴市
    {
      id: 'taixing',
      name: '泰兴市',
      districts: [
        {
          id: 'taixing_city',
          name: '泰兴市',
          markets: [
            { id: 'taizhou_mei_dealer_field', name: '泰州眉经销场', location: '江苏省泰兴市', address: '泰兴市', description: '泰州眉经销场交易中心' },
            { id: 'yintai_shopping_tea_cluster', name: '银泰购物中心茶业集群（含大世界茶叶批发部、东进茶业）', location: '江苏省泰兴市', address: '泰兴市', description: '银泰购物中心茶业集群' }
          ]
        }
      ]
    },
    // 沭阳县
    {
      id: 'shuyang',
      name: '沭阳县',
      districts: [
        {
          id: 'shuyang_county',
          name: '沭阳县',
          markets: [
            { id: 'baimeng_logistics_tea_city', name: '百盟物流产业园茶城区', location: '江苏省沭阳县', address: '沭阳县', description: '百盟物流产业园茶城区' },
            { id: 'lantian_international_trade_city', name: '蓝天国际商贸城（茶叶专区）', location: '江苏省沭阳县', address: '沭阳县', description: '蓝天国际商贸城茶叶专区' },
            { id: 'wanhao_international_hotel_tea_city', name: '万豪国际大酒店附属茶城', location: '江苏省沭阳县', address: '沭阳县', description: '万豪国际大酒店附属茶城' },
            { id: 'darunfa_supermarket_tea_street', name: '大润发超市商店街（茶叶商户）', location: '江苏省沭阳县', address: '沭阳县', description: '大润发超市商店街茶叶商户' },
            { id: 'dongfang_plaza_tea_merchants', name: '东方广场（茶叶商户）', location: '江苏省沭阳县', address: '沭阳县', description: '东方广场茶叶商户区' }
          ]
        }
      ]
    }
  ]
};

module.exports = jiangsuTeaMarkets; 