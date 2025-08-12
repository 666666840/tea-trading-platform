// 茶叶市场位置数据导入工具
// 用于将位置总.txt的数据转换为系统需要的格式

const fs = require('fs');

// 从位置总.txt解析的完整数据
const teaMarketCompleteData = {
  provinces: [
    {
      id: 'shandong',
      name: '山东省',
      cities: [
        {
          id: 'qingdao',
          name: '青岛市',
          districts: [
            {
              id: 'licang',
              name: '李沧区',
              markets: [
                { id: 'qingdao_licangte_zhengbang', name: '青岛李沧茶城（正邦茶城）', location: '山东省青岛市李沧区', address: '青岛市李沧区', description: '青岛市主要茶叶批发市场', merchantCount: 180 },
                { id: 'qingdao_huifengchaye_mall', name: '青岛汇丰茶叶商贸街', location: '山东省青岛市李沧区', address: '青岛市李沧区', description: '汇丰茶叶商贸综合市场', merchantCount: 120 },
                { id: 'qingdao_chaye_changqu', name: '青岛茶叶场区', location: '山东省青岛市李沧区', address: '青岛市李沧区', description: '专业茶叶批发场区', merchantCount: 95 }
              ]
            },
            {
              id: 'shibei',
              name: '市北区',
              markets: [
                { id: 'qingdao_chaye_jiaoyi_center', name: '青岛茶叶交易中心', location: '山东省青岛市市北区', address: '青岛市市北区', description: '市北区茶叶交易中心', merchantCount: 140 }
              ]
            },
            {
              id: 'jiaozhou',
              name: '胶州市',
              markets: [
                { id: 'jiaozhou_chaye_field', name: '胶州茶叶场', location: '山东省青岛市胶州市', address: '青岛市胶州市', description: '胶州市茶叶交易市场', merchantCount: 85 }
              ]
            }
          ]
        },
        {
          id: 'jinan',
          name: '济南市',
          districts: [
            {
              id: 'licheng',
              name: '历城区',
              markets: [
                { id: 'jinan_zhangqiu_chaye', name: '济南章丘茶叶场', location: '山东省济南市历城区', address: '济南市历城区', description: '济南市主要茶叶批发市场', merchantCount: 150 },
                { id: 'jinan_chayecheng', name: '济南茶叶城', location: '山东省济南市历城区', address: '济南市历城区', description: '综合性茶叶交易市场', merchantCount: 200 }
              ]
            },
            {
              id: 'tianqiao',
              name: '天桥区',
              markets: [
                { id: 'jinan_beiyuan_chaye', name: '济南北园茶叶市场', location: '山东省济南市天桥区', address: '济南市天桥区', description: '北园茶叶专业市场', merchantCount: 120 }
              ]
            }
          ]
        },
        {
          id: 'yantai',
          name: '烟台市',
          districts: [
            {
              id: 'zhifu',
              name: '芝罘区',
              markets: [
                { id: 'yantai_chaye_field', name: '烟台茶叶场', location: '山东省烟台市芝罘区', address: '烟台市芝罘区', description: '烟台市茶叶交易市场', merchantCount: 110 }
              ]
            },
            {
              id: 'longkou',
              name: '龙口市',
              markets: [
                { id: 'longkou_chaye_center', name: '龙口茶叶交易中心', location: '山东省烟台市龙口市', address: '烟台市龙口市', description: '龙口市茶叶批发中心', merchantCount: 80 }
              ]
            }
          ]
        },
        {
          id: 'weifang',
          name: '潍坊市',
          districts: [
            {
              id: 'kuiwen',
              name: '奎文区',
              markets: [
                { id: 'weifang_chaye_market', name: '潍坊茶叶市场', location: '山东省潍坊市奎文区', address: '潍坊市奎文区', description: '潍坊主要茶叶交易市场', merchantCount: 100 }
              ]
            }
          ]
        },
        {
          id: 'zibo',
          name: '淄博市',
          districts: [
            {
              id: 'zhangdian',
              name: '张店区',
              markets: [
                { id: 'zibo_chaye_center', name: '淄博茶叶中心', location: '山东省淄博市张店区', address: '淄博市张店区', description: '淄博市茶叶交易中心', merchantCount: 90 }
              ]
            }
          ]
        },
        {
          id: 'rizhao',
          name: '日照市',
          districts: [
            {
              id: 'donggang',
              name: '东港区',
              markets: [
                { id: 'rizhao_international_tea_city', name: '日照国际茶叶城', location: '山东省日照市东港区', address: '日照市东港区', description: '日照市规模最大的茶叶交易中心', merchantCount: 140 },
                { id: 'rizhao_shijiu_tea', name: '石臼茶叶场', location: '山东省日照市东港区', address: '日照市东港区', description: '石臼地区茶叶交易市场', merchantCount: 95 },
                { id: 'rizhao_jufeng_tea', name: '巨峰镇茶叶场', location: '山东省日照市东港区', address: '日照市东港区巨峰镇', description: '巨峰镇茶叶交易市场', merchantCount: 85 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'shandong2',
      name: '河北省',
      cities: [
        {
          id: 'tangshan',
          name: '唐山市',
          districts: [
            {
              id: 'lubei',
              name: '路北区',
              markets: [
                { id: 'tangshan_chaye_market', name: '唐山茶叶市场', location: '河北省唐山市路北区', address: '唐山市路北区', description: '唐山主要茶叶批发市场', merchantCount: 100 }
              ]
            }
          ]
        },
        {
          id: 'shijiazhuang',
          name: '石家庄市',
          districts: [
            {
              id: 'xinhua',
              name: '新华区',
              markets: [
                { id: 'shijiazhuang_chaye_center', name: '石家庄茶叶中心', location: '河北省石家庄市新华区', address: '石家庄市新华区', description: '石家庄市茶叶交易中心', merchantCount: 150 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'zhejiang',
      name: '浙江省',
      cities: [
        {
          id: 'hangzhou',
          name: '杭州市',
          districts: [
            {
              id: 'xihu',
              name: '西湖区',
              markets: [
                { id: 'hangzhou_longjing_tea_market', name: '杭州龙井茶叶市场', location: '浙江省杭州市西湖区', address: '杭州市西湖区', description: '西湖龙井原产地茶叶交易市场', merchantCount: 200 },
                { id: 'hangzhou_meijiawu_tea', name: '梅家坞茶文化村', location: '浙江省杭州市西湖区', address: '杭州市西湖区梅家坞', description: '梅家坞茶文化村茶叶交易', merchantCount: 80 }
              ]
            },
            {
              id: 'shangcheng',
              name: '上城区',
              markets: [
                { id: 'hangzhou_heshan_tea', name: '杭州河山茶叶市场', location: '浙江省杭州市上城区', address: '杭州市上城区', description: '河山茶叶综合交易市场', merchantCount: 120 }
              ]
            }
          ]
        },
        {
          id: 'ningbo',
          name: '宁波市',
          districts: [
            {
              id: 'haishu',
              name: '海曙区',
              markets: [
                { id: 'ningbo_chaye_center', name: '宁波茶叶中心', location: '浙江省宁波市海曙区', address: '宁波市海曙区', description: '宁波市茶叶交易中心', merchantCount: 110 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'jiangsu',
      name: '江苏省',
      cities: [
        {
          id: 'nanjing',
          name: '南京市',
          districts: [
            {
              id: 'xuanwu',
              name: '玄武区',
              markets: [
                { id: 'nanjing_chaye_wholesale', name: '南京茶叶批发市场', location: '江苏省南京市玄武区', address: '南京市玄武区', description: '南京主要茶叶批发市场', merchantCount: 180 }
              ]
            }
          ]
        },
        {
          id: 'suzhou',
          name: '苏州市',
          districts: [
            {
              id: 'gusu',
              name: '姑苏区',
              markets: [
                { id: 'suzhou_biluochun_market', name: '苏州碧螺春茶叶市场', location: '江苏省苏州市姑苏区', address: '苏州市姑苏区', description: '碧螺春原产地茶叶交易市场', merchantCount: 160 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'guangdong',
      name: '广东省',
      cities: [
        {
          id: 'guangzhou',
          name: '广州市',
          districts: [
            {
              id: 'liwan',
              name: '荔湾区',
              markets: [
                { id: 'fangcun_nanfang_tea', name: '芳村南方茶叶市场', location: '广东省广州市荔湾区', address: '广州市荔湾区芳村', description: '华南地区最大的茶叶批发市场', merchantCount: 800 },
                { id: 'fangcun_tea_market', name: '芳村茶叶市场（锦桂市场）', location: '广东省广州市荔湾区', address: '广州市荔湾区芳村', description: '锦桂市场茶叶交易区', merchantCount: 300 }
              ]
            }
          ]
        },
        {
          id: 'shenzhen',
          name: '深圳市',
          districts: [
            {
              id: 'futian',
              name: '福田区',
              markets: [
                { id: 'shenzhen_chaye_wholesale', name: '深圳茶叶批发市场', location: '广东省深圳市福田区', address: '深圳市福田区', description: '深圳主要茶叶批发市场', merchantCount: 200 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fujian',
      name: '福建省',
      cities: [
        {
          id: 'fuzhou',
          name: '福州市',
          districts: [
            {
              id: 'jinan',
              name: '晋安区',
              markets: [
                { id: 'wuliting_tea_market', name: '五里亭茶叶市场', location: '福建省福州市晋安区', address: '福州市晋安区五里亭', description: '福州市主要茶叶批发市场', merchantCount: 400 },
                { id: 'haixia_tea_city', name: '海峡茶叶城', location: '福建省福州市晋安区', address: '福州市晋安区', description: '海峡茶叶交易中心', merchantCount: 200 }
              ]
            }
          ]
        },
        {
          id: 'xiamen',
          name: '厦门市',
          districts: [
            {
              id: 'siming',
              name: '思明区',
              markets: [
                { id: 'xiamen_chaye_wholesale', name: '厦门茶叶批发市场', location: '福建省厦门市思明区', address: '厦门市思明区', description: '厦门主要茶叶批发市场', merchantCount: 150 }
              ]
            }
          ]
        },
        {
          id: 'anxi',
          name: '安溪县',
          districts: [
            {
              id: 'fengan',
              name: '凤安镇',
              markets: [
                { id: 'anxi_tieguanyin_market', name: '安溪铁观音茶叶市场', location: '福建省安溪县凤安镇', address: '安溪县凤安镇', description: '铁观音原产地茶叶交易市场', merchantCount: 500 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'yunnan',
      name: '云南省',
      cities: [
        {
          id: 'kunming',
          name: '昆明市',
          districts: [
            {
              id: 'panlong',
              name: '盘龙区',
              markets: [
                { id: 'kunming_kanglebei_tea', name: '昆明康乐茶文化城', location: '云南省昆明市盘龙区', address: '昆明市盘龙区', description: '云南茶叶综合交易中心', merchantCount: 300 },
                { id: 'kunming_xiongda_tea', name: '雄达茶城', location: '云南省昆明市盘龙区', address: '昆明市盘龙区', description: '雄达茶叶交易市场', merchantCount: 200 }
              ]
            }
          ]
        },
        {
          id: 'puer',
          name: '普洱市',
          districts: [
            {
              id: 'simao',
              name: '思茅区',
              markets: [
                { id: 'puer_chaye_market', name: '普洱茶叶市场', location: '云南省普洱市思茅区', address: '普洱市思茅区', description: '普洱茶原产地交易市场', merchantCount: 250 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sichuan',
      name: '四川省',
      cities: [
        {
          id: 'chengdu',
          name: '成都市',
          districts: [
            {
              id: 'jinjiang',
              name: '锦江区',
              markets: [
                { id: 'chengdu_wuhou_tea', name: '成都五侯茶叶城', location: '四川省成都市锦江区', address: '成都市锦江区', description: '成都主要茶叶批发市场', merchantCount: 180 },
                { id: 'chengdu_heming_tea', name: '鹤鸣茶市', location: '四川省成都市锦江区', address: '成都市锦江区', description: '鹤鸣茶叶交易市场', merchantCount: 120 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'hunan',
      name: '湖南省',
      cities: [
        {
          id: 'changsha',
          name: '长沙市',
          districts: [
            {
              id: 'tianxin',
              name: '天心区',
              markets: [
                { id: 'changsha_gaobang_tea', name: '长沙高桥茶叶市场', location: '湖南省长沙市天心区', address: '长沙市天心区', description: '长沙主要茶叶批发市场', merchantCount: 200 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'hubei',
      name: '湖北省',
      cities: [
        {
          id: 'wuhan',
          name: '武汉市',
          districts: [
            {
              id: 'jianghan',
              name: '江汉区',
              markets: [
                { id: 'wuhan_chaye_wholesale', name: '武汉茶叶批发市场', location: '湖北省武汉市江汉区', address: '武汉市江汉区', description: '武汉主要茶叶批发市场', merchantCount: 180 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'jiangxi',
      name: '江西省',
      cities: [
        {
          id: 'nanchang',
          name: '南昌市',
          districts: [
            {
              id: 'donghu',
              name: '东湖区',
              markets: [
                { id: 'nanchang_chaye_market', name: '南昌茶叶市场', location: '江西省南昌市东湖区', address: '南昌市东湖区', description: '南昌主要茶叶批发市场', merchantCount: 120 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'anhui',
      name: '安徽省',
      cities: [
        {
          id: 'hefei',
          name: '合肥市',
          districts: [
            {
              id: 'baohe',
              name: '包河区',
              markets: [
                { id: 'hefei_yufeng_tea', name: '裕丰茶城', location: '安徽省合肥市包河区', address: '合肥市包河区', description: '合肥主要茶叶批发市场', merchantCount: 150 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'henan',
      name: '河南省',
      cities: [
        {
          id: 'zhengzhou',
          name: '郑州市',
          districts: [
            {
              id: 'jinshui',
              name: '金水区',
              markets: [
                { id: 'zhengzhou_chaye_wholesale', name: '郑州茶叶批发市场', location: '河南省郑州市金水区', address: '郑州市金水区', description: '郑州主要茶叶批发市场', merchantCount: 160 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'shanxi',
      name: '山西省',
      cities: [
        {
          id: 'taiyuan',
          name: '太原市',
          districts: [
            {
              id: 'xiaodian',
              name: '小店区',
              markets: [
                { id: 'taiyuan_chaye_market', name: '太原茶叶市场', location: '山西省太原市小店区', address: '太原市小店区', description: '太原主要茶叶批发市场', merchantCount: 100 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'liaoning',
      name: '辽宁省',
      cities: [
        {
          id: 'shenyang',
          name: '沈阳市',
          districts: [
            {
              id: 'heping',
              name: '和平区',
              markets: [
                { id: 'shenyang_chaye_wholesale', name: '沈阳茶叶批发市场', location: '辽宁省沈阳市和平区', address: '沈阳市和平区', description: '沈阳主要茶叶批发市场', merchantCount: 120 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'xinjiang',
      name: '新疆维吾尔自治区',
      cities: [
        {
          id: 'urumqi',
          name: '乌鲁木齐市',
          districts: [
            {
              id: 'tianshan',
              name: '天山区',
              markets: [
                { id: 'urumqi_chaye_wholesale', name: '乌鲁木齐茶叶批发市场', location: '新疆维吾尔自治区乌鲁木齐市天山区', address: '乌鲁木齐市天山区', description: '新疆主要茶叶批发市场', merchantCount: 80 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'shanghai',
      name: '上海市',
      cities: [
        {
          id: 'shanghai_city',
          name: '上海市',
          districts: [
            {
              id: 'huangpu',
              name: '黄浦区',
              markets: [
                { id: 'shanghai_tianshan_tea', name: '上海天山茶城', location: '上海市黄浦区', address: '上海市黄浦区', description: '上海主要茶叶批发市场', merchantCount: 200 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 地理大区配置
const geographicRegions = [
  {
    name: '华北地区',
    provinces: ['北京', '天津', '河北', '山西', '内蒙古'],
    description: '政治文化中心，茶叶消费市场成熟'
  },
  {
    name: '华东地区', 
    provinces: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东'],
    description: '经济发达地区，茶叶交易最活跃'
  },
  {
    name: '华南地区',
    provinces: ['广东', '广西', '海南'],
    description: '茶叶进出口贸易中心'
  },
  {
    name: '华中地区',
    provinces: ['河南', '湖北', '湖南'],
    description: '茶叶产区和集散地'
  },
  {
    name: '西南地区',
    provinces: ['重庆', '四川', '贵州', '云南', '西藏'],
    description: '传统茶叶主产区'
  },
  {
    name: '西北地区',
    provinces: ['陕西', '甘肃', '青海', '宁夏', '新疆'],
    description: '边销茶重要市场'
  },
  {
    name: '东北地区',
    provinces: ['辽宁', '吉林', '黑龙江'],
    description: '茶叶消费增长市场'
  }
];

// 生成市场统计数据
function generateMarketStats() {
  const stats = {
    totalProvinces: teaMarketCompleteData.provinces.length,
    totalCities: 0,
    totalDistricts: 0,
    totalMarkets: 0,
    totalMerchants: 0
  };

  teaMarketCompleteData.provinces.forEach(province => {
    stats.totalCities += province.cities.length;
    province.cities.forEach(city => {
      stats.totalDistricts += city.districts.length;
      city.districts.forEach(district => {
        stats.totalMarkets += district.markets.length;
        district.markets.forEach(market => {
          stats.totalMerchants += market.merchantCount || 0;
        });
      });
    });
  });

  return stats;
}

// 导出模块
module.exports = {
  teaMarketCompleteData,
  geographicRegions,
  generateMarketStats
}; 