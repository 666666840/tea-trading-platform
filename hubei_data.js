// 湖北省茶叶市场数据
const hubeiData = {
  id: 'hubei',
  name: '湖北省',
  cities: [
    {
      id: 'wuhan',
      name: '武汉市',
      districts: [
        {
          id: 'huangpi',
          name: '黄陂区',
          markets: [
            {
              id: 'hankoubei_tea_field',
              name: '汉口北茶叶场',
              location: '湖北省武汉市黄陂区',
              merchantCount: 150,
              address: '武汉市黄陂区汉口北',
              description: '汉口北地区茶叶交易市场'
            }
          ]
        },
        {
          id: 'jiangan',
          name: '江岸区',
          markets: [
            {
              id: 'zhongchu_tea_field',
              name: '中储茶叶场',
              location: '湖北省武汉市江岸区',
              merchantCount: 120,
              address: '武汉市江岸区',
              description: '中储地区茶叶交易市场'
            },
            {
              id: 'chongrenlu_tea_market',
              name: '崇仁路茶叶市场',
              location: '湖北省武汉市江岸区',
              merchantCount: 100,
              address: '武汉市江岸区崇仁路',
              description: '崇仁路茶叶交易市场'
            }
          ]
        },
        {
          id: 'hanyang',
          name: '汉阳区',
          markets: [
            {
              id: 'xibeihu_tea_market',
              name: '西北湖茶叶市场',
              location: '湖北省武汉市汉阳区',
              merchantCount: 90,
              address: '武汉市汉阳区西北湖',
              description: '西北湖地区茶叶交易市场'
            },
            {
              id: 'zhiyin_international_tea_city',
              name: '知音国际茶城',
              location: '湖北省武汉市汉阳区',
              merchantCount: 110,
              address: '武汉市汉阳区',
              description: '知音国际茶城交易中心'
            }
          ]
        },
        {
          id: 'qiaokou',
          name: '硚口区',
          markets: [
            {
              id: 'yudaimingdu_tea_market',
              name: '玉带茗都茶叶市场',
              location: '湖北省武汉市硚口区',
              merchantCount: 85,
              address: '武汉市硚口区',
              description: '玉带茗都茶叶交易市场'
            }
          ]
        },
        {
          id: 'hongshan',
          name: '洪山区',
          markets: [
            {
              id: 'xudong_tea_market',
              name: '徐东茶市',
              location: '湖北省武汉市洪山区',
              merchantCount: 95,
              address: '武汉市洪山区徐东',
              description: '徐东地区茶叶交易市场'
            },
            {
              id: 'shuiguohu_tea_market',
              name: '水果湖茶叶市场',
              location: '湖北省武汉市洪山区',
              merchantCount: 80,
              address: '武汉市洪山区水果湖',
              description: '水果湖地区茶叶交易市场'
            },
            {
              id: 'hongshan_luoyu_wholesale_market',
              name: '洪山珞喻路批发市场',
              location: '湖北省武汉市洪山区',
              merchantCount: 130,
              address: '武汉市洪山区珞喻路',
              description: '洪山珞喻路茶叶批发市场'
            }
          ]
        },
        {
          id: 'wuchang',
          name: '武昌区',
          markets: [
            {
              id: 'luyu_tea_capital',
              name: '陆羽茶都',
              location: '湖北省武汉市武昌区',
              merchantCount: 140,
              address: '武汉市武昌区',
              description: '陆羽茶都交易中心'
            }
          ]
        }
      ]
    },
    {
      id: 'huangshi',
      name: '黄石市',
      districts: [
        {
          id: 'huangshigang',
          name: '黄石港区',
          markets: [
            {
              id: 'huangshi_tea_city',
              name: '黄石茶城',
              location: '湖北省黄石市黄石港区',
              merchantCount: 100,
              address: '黄石市黄石港区',
              description: '黄石市主要茶叶交易中心'
            },
            {
              id: 'huazhong_tea_city',
              name: '华中茶叶城',
              location: '湖北省黄石市黄石港区',
              merchantCount: 90,
              address: '黄石市黄石港区',
              description: '华中茶叶城交易中心'
            }
          ]
        },
        {
          id: 'xisaishan',
          name: '西塞山区',
          markets: [
            {
              id: 'xisaishan_tea_market',
              name: '西塞山茶叶市场',
              location: '湖北省黄石市西塞山区',
              merchantCount: 75,
              address: '黄石市西塞山区',
              description: '西塞山区茶叶交易市场'
            }
          ]
        },
        {
          id: 'tieshan',
          name: '铁山区',
          markets: [
            {
              id: 'tieshan_tea_field',
              name: '铁山茶叶场',
              location: '湖北省黄石市铁山区',
              merchantCount: 60,
              address: '黄石市铁山区',
              description: '铁山区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'shiyan',
      name: '十堰市',
      districts: [
        {
          id: 'maojian',
          name: '茅箭区',
          markets: [
            {
              id: 'liulinlu_chutian_tea_wholesale',
              name: '柳林路楚天名茶批发部',
              location: '湖北省十堰市茅箭区',
              merchantCount: 40,
              address: '十堰市茅箭区柳林路',
              description: '柳林路楚天名茶批发部'
            },
            {
              id: 'wudang_tea_city',
              name: '武当茶城',
              location: '湖北省十堰市茅箭区',
              merchantCount: 85,
              address: '十堰市茅箭区',
              description: '武当茶城交易中心'
            },
            {
              id: 'shiyan_tea_market',
              name: '十堰茶叶市场',
              location: '湖北省十堰市茅箭区',
              merchantCount: 70,
              address: '十堰市茅箭区',
              description: '十堰市主要茶叶交易市场'
            }
          ]
        },
        {
          id: 'zhangwan',
          name: '张湾区',
          markets: [
            {
              id: 'zhangwan_tea_field',
              name: '张湾茶叶场',
              location: '湖北省十堰市张湾区',
              merchantCount: 65,
              address: '十堰市张湾区',
              description: '张湾区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'yichang',
      name: '宜昌市',
      districts: [
        {
          id: 'yiling',
          name: '夷陵区',
          markets: [
            {
              id: 'yichang_yiling_tea_city',
              name: '宜昌夷陵茶城',
              location: '湖北省宜昌市夷陵区',
              merchantCount: 95,
              address: '宜昌市夷陵区',
              description: '宜昌夷陵茶城交易中心'
            },
            {
              id: 'sanxia_tea_city',
              name: '三峡茶城',
              location: '湖北省宜昌市夷陵区',
              merchantCount: 110,
              address: '宜昌市夷陵区',
              description: '三峡茶城交易中心'
            },
            {
              id: 'yichang_tea_market',
              name: '宜昌茶叶市场',
              location: '湖北省宜昌市夷陵区',
              merchantCount: 85,
              address: '宜昌市夷陵区',
              description: '宜昌市主要茶叶交易市场'
            }
          ]
        },
        {
          id: 'xiling',
          name: '西陵区',
          markets: [
            {
              id: 'xiling_tea_field',
              name: '西陵茶叶场',
              location: '湖北省宜昌市西陵区',
              merchantCount: 75,
              address: '宜昌市西陵区',
              description: '西陵区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'xiangyang',
      name: '襄阳市',
      districts: [
        {
          id: 'xiangcheng',
          name: '襄城区',
          markets: [
            {
              id: 'xiangyang_tea_city',
              name: '襄阳茶城',
              location: '湖北省襄阳市襄城区',
              merchantCount: 120,
              address: '襄阳市襄城区',
              description: '襄阳市主要茶叶交易中心'
            },
            {
              id: 'xiangyang_tea_market',
              name: '襄阳茶叶市场',
              location: '湖北省襄阳市襄城区',
              merchantCount: 100,
              address: '襄阳市襄城区',
              description: '襄阳茶叶市场'
            }
          ]
        },
        {
          id: 'fancheng',
          name: '樊城区',
          markets: [
            {
              id: 'fancheng_tea_field',
              name: '樊城茶叶场',
              location: '湖北省襄阳市樊城区',
              merchantCount: 90,
              address: '襄阳市樊城区',
              description: '樊城区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'ezhou',
      name: '鄂州市',
      districts: [
        {
          id: 'ezhou',
          name: '鄂城区',
          markets: [
            {
              id: 'ezhou_tea_market',
              name: '鄂州茶叶市场',
              location: '湖北省鄂州市鄂城区',
              merchantCount: 80,
              address: '鄂州市鄂城区',
              description: '鄂州市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'jingmen',
      name: '荆门市',
      districts: [
        {
          id: 'dongbao',
          name: '东宝区',
          markets: [
            {
              id: 'jingmen_tea_city',
              name: '荆门茶城',
              location: '湖北省荆门市东宝区',
              merchantCount: 95,
              address: '荆门市东宝区',
              description: '荆门市主要茶叶交易中心'
            }
          ]
        },
        {
          id: 'duodao',
          name: '掇刀区',
          markets: [
            {
              id: 'duodao_tea_field',
              name: '掇刀茶叶场',
              location: '湖北省荆门市掇刀区',
              merchantCount: 70,
              address: '荆门市掇刀区',
              description: '掇刀区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'xiaogan',
      name: '孝感市',
      districts: [
        {
          id: 'xiaonan',
          name: '孝南区',
          markets: [
            {
              id: 'xiaogan_tea_market',
              name: '孝感茶叶市场',
              location: '湖北省孝感市孝南区',
              merchantCount: 85,
              address: '孝感市孝南区',
              description: '孝感市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'jingzhou',
      name: '荆州市',
      districts: [
        {
          id: 'shashi',
          name: '沙市区',
          markets: [
            {
              id: 'jingzhou_tea_city',
              name: '荆州茶城',
              location: '湖北省荆州市沙市区',
              merchantCount: 110,
              address: '荆州市沙市区',
              description: '荆州市主要茶叶交易中心'
            }
          ]
        },
        {
          id: 'jingzhou',
          name: '荆州区',
          markets: [
            {
              id: 'jingzhou_tea_field',
              name: '荆州茶叶场',
              location: '湖北省荆州市荆州区',
              merchantCount: 90,
              address: '荆州市荆州区',
              description: '荆州区茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'huanggang',
      name: '黄冈市',
      districts: [
        {
          id: 'huangzhou',
          name: '黄州区',
          markets: [
            {
              id: 'huanggang_tea_market',
              name: '黄冈茶叶市场',
              location: '湖北省黄冈市黄州区',
              merchantCount: 100,
              address: '黄冈市黄州区',
              description: '黄冈市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'xianning',
      name: '咸宁市',
      districts: [
        {
          id: 'xianan',
          name: '咸安区',
          markets: [
            {
              id: 'xianning_tea_city',
              name: '咸宁茶城',
              location: '湖北省咸宁市咸安区',
              merchantCount: 95,
              address: '咸宁市咸安区',
              description: '咸宁市主要茶叶交易中心'
            }
          ]
        }
      ]
    },
    {
      id: 'suizhou',
      name: '随州市',
      districts: [
        {
          id: 'zengdu',
          name: '曾都区',
          markets: [
            {
              id: 'suizhou_tea_market',
              name: '随州茶叶市场',
              location: '湖北省随州市曾都区',
              merchantCount: 80,
              address: '随州市曾都区',
              description: '随州市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'enshi',
      name: '恩施土家族苗族自治州',
      districts: [
        {
          id: 'enshi',
          name: '恩施市',
          markets: [
            {
              id: 'enshi_tea_city',
              name: '恩施茶城',
              location: '湖北省恩施土家族苗族自治州恩施市',
              merchantCount: 120,
              address: '恩施市',
              description: '恩施州主要茶叶交易中心'
            }
          ]
        },
        {
          id: 'lichuan',
          name: '利川市',
          markets: [
            {
              id: 'lichuan_tea_field',
              name: '利川茶叶场',
              location: '湖北省恩施土家族苗族自治州利川市',
              merchantCount: 90,
              address: '利川市',
              description: '利川市茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'xiantao',
      name: '仙桃市',
      districts: [
        {
          id: 'xiantao',
          name: '仙桃市',
          markets: [
            {
              id: 'xiantao_tea_market',
              name: '仙桃茶叶市场',
              location: '湖北省仙桃市',
              merchantCount: 75,
              address: '仙桃市',
              description: '仙桃市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'qianjiang',
      name: '潜江市',
      districts: [
        {
          id: 'qianjiang',
          name: '潜江市',
          markets: [
            {
              id: 'qianjiang_tea_field',
              name: '潜江茶叶场',
              location: '湖北省潜江市',
              merchantCount: 70,
              address: '潜江市',
              description: '潜江市茶叶交易场'
            }
          ]
        }
      ]
    },
    {
      id: 'tianmen',
      name: '天门市',
      districts: [
        {
          id: 'tianmen',
          name: '天门市',
          markets: [
            {
              id: 'tianmen_tea_market',
              name: '天门茶叶市场',
              location: '湖北省天门市',
              merchantCount: 65,
              address: '天门市',
              description: '天门市主要茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'shennongjia',
      name: '神农架林区',
      districts: [
        {
          id: 'shennongjia',
          name: '神农架林区',
          markets: [
            {
              id: 'shennongjia_tea_field',
              name: '神农架茶叶场',
              location: '湖北省神农架林区',
              merchantCount: 50,
              address: '神农架林区',
              description: '神农架林区茶叶交易场'
            }
          ]
        }
      ]
    }
  ]
};

module.exports = hubeiData; 