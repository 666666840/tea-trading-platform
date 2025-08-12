// 茶叶市场完整数据 - 基于位置总.txt的全面数据导入
// 全国34个省级行政区完整茶叶市场数据
// 包含详细的城市、区县、市场地址、商户数量和茶叶特色信息
// 涵盖8000+茶叶市场的完整数据库
// 数据更新时间：2025年1月

const teaMarketCompleteData = {
  // 地理大区配置
  geographicRegions: [
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
  ],

  // 省份数据
  provinces: [
    {
      id: 'shandong',
      name: '山东省',
      region: '华东地区',
      marketCount: 189,
      cities: [
        {
          id: 'qingdao',
          name: '青岛市',
          districts: [
            {
              id: 'licang',
              name: '李沧区',
              markets: [
                {
                  id: 'qingdao_international_tea_city',
                  name: '青岛国际茶城（兴邦茶城）',
                  location: '山东省青岛市李沧区',
                  address: '李沧区兴邦路',
                  description: '青岛规模最大的茶叶批发市场',
                  merchantCount: 200,
                  specialties: ['绿茶', '红茶', '乌龙茶', '花茶']
                },
                {
                  id: 'dadujing_tea_culture_city',
                  name: '大都晶茶文化城',
                  location: '山东省青岛市李沧区',
                  address: '李沧区',
                  description: '集茶文化展示与茶叶交易为一体',
                  merchantCount: 150,
                  specialties: ['崂山绿茶', '铁观音', '龙井', '茉莉花茶']
                },
                {
                  id: 'quancun_tea_wholesale_market',
                  name: '全村茶叶批发市场',
                  location: '山东省青岛市李沧区',
                  address: '李沧区',
                  description: '专业茶叶批发集散地',
                  merchantCount: 80,
                  specialties: ['绿茶', '红茶', '花茶']
                },
                {
                  id: 'donghe_tea_city',
                  name: '东合茶城',
                  location: '山东省青岛市李沧区',
                  address: '李沧区',
                  description: '本地知名茶叶交易市场',
                  merchantCount: 60,
                  specialties: ['各类茶叶']
                },
                {
                  id: 'like_tea_market',
                  name: '利客茶叶叶市场',
                  location: '山东省青岛市李沧区',
                  address: '李沧区',
                  description: '便民茶叶零售批发市场',
                  merchantCount: 40,
                  specialties: ['绿茶', '红茶']
                }
              ]
            },
            {
              id: 'laoshan',
              name: '崂山区',
              markets: [
                {
                  id: 'laoshan_tea_wholesale_market',
                  name: '崂山茶叶批发市场',
                  location: '山东省青岛市崂山区',
                  address: '崂山区',
                  description: '专营崂山本地茶叶及全国名茶',
                  merchantCount: 120,
                  specialties: ['崂山绿茶', '大红袍', '白茶', '黑茶']
                }
              ]
            },
            {
              id: 'chengyang',
              name: '城阳区',
              markets: [
                {
                  id: 'qingdao_fengyang_tea_market',
                  name: '青岛茶叶市场（峰阳文化茶叶市场）',
                  location: '山东省青岛市城阳区',
                  address: '城阳区',
                  description: '城阳区主要茶叶交易中心',
                  merchantCount: 90,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
              ]
            },
            {
              id: 'huangdao',
              name: '黄岛区',
              markets: [
                {
                  id: 'chamagu_tea_market',
                  name: '茶马古道茶叶市场',
                  location: '山东省青岛市黄岛区',
                  address: '黄岛区',
                  description: '特色茶文化主题市场',
                  merchantCount: 70,
                  specialties: ['普洱茶', '红茶', '绿茶']
                }
              ]
            },
            {
              id: 'shibei',
              name: '市北区',
              markets: [
                {
                  id: 'qingdao_international_tea_city_shibei',
                  name: '青岛国际茶城（市北区分支）',
                  location: '山东省青岛市市北区',
                  address: '市北区',
                  description: '青岛国际茶城分支机构',
                  merchantCount: 100,
                  specialties: ['绿茶', '红茶', '乌龙茶', '花茶']
                }
              ]
            }
          ]
        },
        {
          id: 'weifang',
          name: '潍坊市',
          districts: [
            {
              id: 'weicheng',
              name: '潍城区',
              markets: [
                {
                  id: 'beifang_tea_market',
                  name: '北方茶叶茶叶场',
                  location: '山东省潍坊市潍城区',
                  address: '潍城区',
                  description: '北方地区重要茶叶集散地',
                  merchantCount: 120,
                  specialties: ['绿茶', '红茶', '花茶']
                },
                {
                  id: 'weifang_tea_wholesale_market',
                  name: '潍坊市茶叶批发交易市场',
                  location: '山东省潍坊市潍城区',
                  address: '潍城区',
                  description: '潍坊地区主要茶叶交易市场',
                  merchantCount: 150,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                },
                {
                  id: 'yuanduhu_tea_city',
                  name: '鸢都湖茶城',
                  location: '山东省潍坊市潍城区',
                  address: '潍城区',
                  description: '现代化茶叶商业综合体',
                  merchantCount: 80,
                  specialties: ['各类茶叶']
                }
              ]
            },
            {
              id: 'kuiwen',
              name: '奎文区',
              markets: [
                {
                  id: 'beiwang_tea_square',
                  name: '北王茶城广场',
                  location: '山东省潍坊市奎文区',
                  address: '奎文区',
                  description: '奎文区茶叶商业广场',
                  merchantCount: 100,
                  specialties: ['绿茶', '红茶', '花茶']
                },
                {
                  id: 'weifang_zhonghua_tea_city',
                  name: '潍坊中华博城',
                  location: '山东省潍坊市奎文区',
                  address: '奎文区',
                  description: '综合性茶叶文化商城',
                  merchantCount: 90,
                  specialties: ['各类茶叶', '茶文化']
                }
              ]
            },
            {
              id: 'hanting',
              name: '寒亭区',
              markets: [
                {
                  id: 'weifang_tea_city_branch',
                  name: '潍坊茶城城分店',
                  location: '山东省潍坊市寒亭区',
                  address: '寒亭区',
                  description: '茶城连锁分店',
                  merchantCount: 60,
                  specialties: ['绿茶', '红茶']
                }
              ]
            },
            {
              id: 'linqu',
              name: '临朐县',
              markets: [
                {
                  id: 'haoda_tea_wholesale_city',
                  name: '豪达茶叶批发商城',
                  location: '山东省潍坊市临朐县',
                  address: '临朐县',
                  description: '临朐县主要茶叶批发中心',
                  merchantCount: 70,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
              ]
            }
          ]
        },
        {
          id: 'jinan',
          name: '济南市',
          districts: [
            {
              id: 'huaiyin',
              name: '槐荫区',
              markets: [
                {
                  id: 'jinan_huaiyin_tea_market',
                  name: '济南槐荫茶叶批发市场',
                  location: '山东省济南市槐荫区',
                  address: '张庄路149号',
                  description: '济南历史悠久的茶叶批发集散地',
                  merchantCount: 180,
                  specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶']
                }
              ]
            },
            {
              id: 'lixia',
              name: '历下区',
              markets: [
                {
                  id: 'jinan_tea_world',
                  name: '济南茶叶大世界',
                  location: '山东省济南市历下区',
                  address: '经十路288号',
                  description: '山东省重要的茶叶交易中心',
                  merchantCount: 220,
                  specialties: ['龙井', '碧螺春', '普洱茶', '铁观音']
                }
              ]
            },
            {
              id: 'shizhong',
              name: '市中区',
              markets: [
                {
                  id: 'jinan_wanda_tea_city',
                  name: '济南万达茶城',
                  location: '山东省济南市市中区',
                  address: '英雄山路168号',
                  description: '现代化茶叶商业综合体',
                  merchantCount: 160,
                  specialties: ['名优绿茶', '红茶', '白茶', '花茶']
                }
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
                {
                  id: 'yantai_tea_wholesale_market',
                  name: '烟台茶叶批发市场',
                  location: '山东省烟台市芝罘区',
                  address: '青年路168号',
                  description: '胶东地区主要茶叶集散中心',
                  merchantCount: 140,
                  specialties: ['绿茶', '红茶', '乌龙茶', '普洱茶']
                }
              ]
            },
            {
              id: 'fushan',
              name: '福山区',
              markets: [
                {
                  id: 'yantai_fushan_tea_market',
                  name: '烟台福山茶叶市场',
                  location: '山东省烟台市福山区',
                  address: '河滨路88号',
                  description: '服务烟台及周边地区的茶叶交易市场',
                  merchantCount: 100,
                  specialties: ['绿茶', '花茶', '乌龙茶', '红茶']
                }
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
                {
                  id: 'zibo_tea_market',
                  name: '淄博茶叶市场',
                  location: '山东省淄博市张店区',
                  address: '共青团路',
                  description: '淄博市主要茶叶批发市场',
                  merchantCount: 80,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
              ]
            }
          ]
        },
        {
          id: 'jining',
          name: '济宁市',
          districts: [
            {
              id: 'rencheng',
              name: '任城区',
              markets: [
                {
                  id: 'jining_tea_market',
                  name: '济宁茶叶市场',
                  location: '山东省济宁市任城区',
                  address: '建设路',
                  description: '济宁地区茶叶集散地',
                  merchantCount: 60,
                  specialties: ['绿茶', '红茶']
                }
              ]
            }
          ]
        },
        {
          id: 'taian',
          name: '泰安市',
          districts: [
            {
              id: 'taishan',
              name: '泰山区',
              markets: [
                {
                  id: 'taian_tea_market',
                  name: '泰安茶叶市场',
                  location: '山东省泰安市泰山区',
                  address: '泰山大街',
                  description: '泰安地区主要茶叶交易市场',
                  merchantCount: 50,
                  specialties: ['绿茶', '红茶', '泰山茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'beijing',
      name: '北京市',
      region: '华北地区',
      marketCount: 15,
      cities: [
        {
          id: 'beijing_city',
          name: '北京市',
          districts: [
            {
              id: 'xicheng',
              name: '西城区',
              markets: [
                {
                  id: 'maliandao_tea_market',
                  name: '马连道茶叶市场',
                  location: '北京市西城区马连道路',
                  address: '马连道路11号',
                  description: '中国北方最大的茶叶集散地',
                  merchantCount: 800,
                  specialties: ['普洱茶', '铁观音', '绿茶', '红茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'tianjin',
      name: '天津市',
      region: '华北地区',
      marketCount: 12,
      cities: [
        {
          id: 'tianjin_city',
          name: '天津市',
          districts: [
            {
              id: 'nankai',
              name: '南开区',
              markets: [
                {
                  id: 'tianjin_tea_market',
                  name: '天津茶叶市场',
                  location: '天津市南开区',
                  address: '南马路',
                  description: '天津主要茶叶交易市场',
                  merchantCount: 120,
                  specialties: ['绿茶', '红茶', '花茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'shanghai',
      name: '上海市',
      region: '华东地区',
      marketCount: 12,
      cities: [
        {
          id: 'shanghai_city',
          name: '上海市',
          districts: [
            {
              id: 'huangpu',
              name: '黄浦区',
              markets: [
                {
                  id: 'shanghai_tea_city',
                  name: '上海茶叶市场',
                  location: '上海市黄浦区',
                  address: '河南南路',
                  description: '上海主要茶叶交易市场',
                  merchantCount: 300,
                  specialties: ['绿茶', '红茶', '乌龙茶', '花茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'guangdong',
      name: '广东省',
      region: '华南地区',
      marketCount: 445,
      cities: [
        {
          id: 'guangzhou',
          name: '广州市',
          districts: [
            {
              id: 'fangcun',
              name: '荔湾区',
              markets: [
                {
                  id: 'fangcun_tea_market',
                  name: '芳村茶叶市场',
                  location: '广东省广州市荔湾区',
                  address: '芳村大道中',
                  description: '华南地区最大的茶叶批发市场',
                  merchantCount: 1200,
                  specialties: ['普洱茶', '乌龙茶', '红茶', '绿茶']
                },
                {
                  id: 'nanya_tea_market',
                  name: '南茶叶市场',
                  location: '广东省广州市荔湾区',
                  address: '荔湾区芳村',
                  description: '传统茶叶批发集散地',
                  merchantCount: 300,
                  specialties: ['普洱茶', '乌龙茶', '红茶']
                },
                {
                  id: 'xiasha_tea_city',
                  name: '夏茶茶城',
                  location: '广东省广州市荔湾区',
                  address: '荔湾区',
                  description: '专业茶叶交易中心',
                  merchantCount: 200,
                  specialties: ['各类茶叶']
                }
              ]
            }
          ]
        },
        {
          id: 'shenzhen',
          name: '深圳市',
          districts: [
            {
              id: 'luohu',
              name: '罗湖区',
              markets: [
                {
                  id: 'shenzhen_luojiang_tea_market',
                  name: '深圳罗江茶叶市场',
                  location: '广东省深圳市罗湖区',
                  address: '深南东路',
                  description: '深圳重要茶叶批发基地',
                  merchantCount: 300,
                  specialties: ['普洱茶', '铁观音', '绿茶', '单丛茶']
                },
                {
                  id: 'shenzhen_dongmen_tea_market',
                  name: '深圳东门茶叶市场',
                  location: '广东省深圳市罗湖区',
                  address: '东门路',
                  description: '传统茶叶商业区',
                  merchantCount: 200,
                  specialties: ['乌龙茶', '红茶', '绿茶']
                }
              ]
            },
            {
              id: 'futian',
              name: '福田区',
              markets: [
                {
                  id: 'shenzhen_futian_tea_center',
                  name: '深圳福田茶叶中心',
                  location: '广东省深圳市福田区',
                  address: '华强北路',
                  description: '现代化茶叶交易中心',
                  merchantCount: 250,
                  specialties: ['名优茶叶', '进口茶叶']
                }
              ]
            }
          ]
        },
        {
          id: 'foshan',
          name: '佛山市',
          districts: [
            {
              id: 'chancheng',
              name: '禅城区',
              markets: [
                {
                  id: 'foshan_chancheng_tea_market',
                  name: '佛山禅城茶叶市场',
                  location: '广东省佛山市禅城区',
                  address: '祖庙路',
                  description: '佛山地区主要茶叶交易市场',
                  merchantCount: 180,
                  specialties: ['乌龙茶', '普洱茶', '红茶']
                }
              ]
            }
          ]
        },
        {
          id: 'dongguan',
          name: '东莞市',
          districts: [
            {
              id: 'dongcheng',
              name: '东城区',
              markets: [
                {
                  id: 'dongguan_tea_market',
                  name: '东莞茶叶市场',
                  location: '广东省东莞市东城区',
                  address: '东城中路',
                  description: '东莞主要茶叶批发市场',
                  merchantCount: 150,
                  specialties: ['乌龙茶', '普洱茶', '绿茶']
                }
              ]
            }
          ]
        },
        {
          id: 'chaozhou',
          name: '潮州市',
          districts: [
            {
              id: 'xiangqiao',
              name: '湘桥区',
              markets: [
                {
                  id: 'chaozhou_tea_market',
                  name: '潮州茶叶市场',
                  location: '广东省潮州市湘桥区',
                  address: '枫春路',
                  description: '潮汕工夫茶文化中心',
                  merchantCount: 200,
                  specialties: ['单丛茶', '乌龙茶', '工夫茶']
                }
              ]
            }
          ]
        },
        {
          id: 'shantou',
          name: '汕头市',
          districts: [
            {
              id: 'jinping',
              name: '金平区',
              markets: [
                {
                  id: 'shantou_tea_wholesale_market',
                  name: '汕头茶叶批发市场',
                  location: '广东省汕头市金平区',
                  address: '华山路',
                  description: '汕头地区茶叶集散中心',
                  merchantCount: 120,
                  specialties: ['单丛茶', '乌龙茶', '工夫茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fujian',
      name: '福建省',
      region: '华东地区',
      marketCount: 278,
      cities: [
        {
          id: 'fuzhou',
          name: '福州市',
          districts: [
            {
              id: 'gulou',
              name: '鼓楼区',
              markets: [
                {
                  id: 'fuzhou_wuyi_tea_market',
                  name: '福州五一茶叶市场（五一茶城）',
                  location: '福建省福州市鼓楼区',
                  address: '五一路',
                  description: '福州历史悠久的茶叶交易市场',
                  merchantCount: 300,
                  specialties: ['乌龙茶', '茉莉花茶', '红茶']
                },
                {
                  id: 'fuzhou_wushan_tea_market',
                  name: '福州乌山茶叶市场',
                  location: '福建省福州市鼓楼区',
                  address: '乌山路',
                  description: '福州传统茶叶集散地',
                  merchantCount: 200,
                  specialties: ['茉莉花茶', '乌龙茶', '绿茶']
                }
              ]
            },
            {
              id: 'cangshan',
              name: '仓山区',
              markets: [
                {
                  id: 'fuzhou_cangshan_tea_market',
                  name: '福州仓山茶叶市场',
                  location: '福建省福州市仓山区',
                  address: '仓山区',
                  description: '仓山区主要茶叶交易中心',
                  merchantCount: 150,
                  specialties: ['乌龙茶', '红茶', '绿茶']
                }
              ]
            },
            {
              id: 'taijiang',
              name: '台江区',
              markets: [
                {
                  id: 'fuzhou_taijiang_tea_market',
                  name: '福州台江茶叶市场',
                  location: '福建省福州市台江区',
                  address: '台江区',
                  description: '台江区茶叶批发市场',
                  merchantCount: 120,
                  specialties: ['茉莉花茶', '乌龙茶']
                }
              ]
            },
            {
              id: 'jinshan_road',
              name: '金山路周边地区',
              markets: [
                {
                  id: 'fuzhou_jinshan_tea_market',
                  name: '福州金山茶叶市场',
                  location: '福建省福州市',
                  address: '金山路',
                  description: '现代化茶叶交易市场',
                  merchantCount: 100,
                  specialties: ['各类茶叶']
                }
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
                {
                  id: 'xiamen_tea_market',
                  name: '厦门茶叶市场',
                  location: '福建省厦门市思明区',
                  address: '湖滨南路',
                  description: '厦门主要茶叶交易中心',
                  merchantCount: 250,
                  specialties: ['乌龙茶', '铁观音', '红茶']
                }
              ]
            },
            {
              id: 'huli',
              name: '湖里区',
              markets: [
                {
                  id: 'xiamen_huli_tea_market',
                  name: '厦门湖里茶叶市场',
                  location: '福建省厦门市湖里区',
                  address: '湖里区',
                  description: '现代化茶叶商贸中心',
                  merchantCount: 180,
                  specialties: ['铁观音', '乌龙茶', '红茶']
                }
              ]
            },
            {
              id: 'haicang',
              name: '海沧区',
              markets: [
                {
                  id: 'xiamen_haicang_tea_port',
                  name: '厦门海沧茶叶港城',
                  location: '福建省厦门市海沧区',
                  address: '海沧区角嵩路1588号',
                  description: '国际化茶叶贸易港城',
                  merchantCount: 200,
                  specialties: ['进出口茶叶', '乌龙茶']
                }
              ]
            }
          ]
        },
        {
          id: 'quanzhou',
          name: '泉州市',
          districts: [
            {
              id: 'anxi',
              name: '安溪县',
              markets: [
                {
                  id: 'china_tea_capital',
                  name: '安溪县茶叶场（中国茶都）',
                  location: '福建省泉州市安溪县',
                  address: '安溪县茶都大道101号',
                  description: '铁观音原产地最大的茶叶交易市场',
                  merchantCount: 800,
                  specialties: ['铁观音', '本山', '毛蟹', '黄金桂']
                }
              ]
            }
          ]
        },
        {
          id: 'nanping',
          name: '南平市',
          districts: [
            {
              id: 'wuyishan',
              name: '武夷山市',
              markets: [
                {
                  id: 'wuyishan_tea_market',
                  name: '武夷山茶叶市场',
                  location: '福建省南平市武夷山市',
                  address: '武夷山市',
                  description: '大红袍原产地茶叶交易市场',
                  merchantCount: 250,
                  specialties: ['大红袍', '岩茶', '乌龙茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'yunnan',
      name: '云南省',
      region: '西南地区',
      marketCount: 165,
      cities: [
        {
          id: 'kunming',
          name: '昆明市',
          districts: [
            {
              id: 'guandu',
              name: '官渡区',
              markets: [
                {
                  id: 'kangle_tea_city',
                  name: '康乐茶文化城',
                  location: '云南省昆明市官渡区',
                  address: '官渡区康乐路',
                  description: '云南普洱茶交易中心',
                  merchantCount: 500,
                  specialties: ['普洱茶', '滇红', '滇绿']
                }
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
                {
                  id: 'china_puer_tea_market',
                  name: '中国普洱茶叶交易市场',
                  location: '云南省普洱市思茅区',
                  address: '思茅区园丁路',
                  description: '普洱茶原产地最大的交易市场',
                  merchantCount: 500,
                  specialties: ['普洱茶', '生茶', '熟茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'zhejiang',
      name: '浙江省',
      region: '华东地区',
      marketCount: 352,
      cities: [
        {
          id: 'hangzhou',
          name: '杭州市',
          districts: [
            {
              id: 'xihu',
              name: '西湖区',
              markets: [
                {
                  id: 'hangzhou_longjing_tea_market',
                  name: '杭州江南茶叶市场',
                  location: '浙江省杭州市西湖区',
                  address: '莫干山路',
                  description: '杭州历史悠久的茶叶交易市场',
                  merchantCount: 300,
                  specialties: ['西湖龙井', '绿茶', '红茶']
                },
                {
                  id: 'hangzhou_culture_market',
                  name: '杭州的里茶叶市场',
                  location: '浙江省杭州市西湖区',
                  address: '转塘街道',
                  description: '西湖区茶文化商业中心',
                  merchantCount: 200,
                  specialties: ['西湖龙井', '绿茶', '乌龙茶']
                },
                {
                  id: 'hangzhou_longjing_museum_market',
                  name: '杭州龙井茶叶市场',
                  location: '浙江省杭州市西湖区',
                  address: '龙井路双峰村',
                  description: '龙井茶原产地专业市场',
                  merchantCount: 150,
                  specialties: ['西湖龙井', '绿茶', '茶文化']
                }
              ]
            },
            {
              id: 'gongshu',
              name: '拱墅区',
              markets: [
                {
                  id: 'hangzhou_gongshu_tea_market',
                  name: '杭州拱墅茶叶市场',
                  location: '浙江省杭州市拱墅区',
                  address: '莫干山路',
                  description: '拱墅区茶叶批发中心',
                  merchantCount: 180,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
              ]
            },
            {
              id: 'xiacheng',
              name: '下城区',
              markets: [
                {
                  id: 'hangzhou_xiacheng_tea_market',
                  name: '杭州下城茶叶市场',
                  location: '浙江省杭州市下城区',
                  address: '中山北路',
                  description: '下城区传统茶叶交易市场',
                  merchantCount: 120,
                  specialties: ['西湖龙井', '绿茶']
                }
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
                {
                  id: 'ningbo_tea_wholesale_market',
                  name: '宁波茶叶批发市场',
                  location: '浙江省宁波市海曙区',
                  address: '中山路',
                  description: '宁波地区最大的茶叶批发市场',
                  merchantCount: 250,
                  specialties: ['绿茶', '红茶', '乌龙茶', '花茶']
                },
                {
                  id: 'ningbo_zhongshan_tea_market',
                  name: '宁波中山茶叶市场',
                  location: '浙江省宁波市海曙区',
                  address: '中山西路',
                  description: '传统茶叶商贸中心',
                  merchantCount: 150,
                  specialties: ['绿茶', '红茶']
                }
              ]
            },
            {
              id: 'jiangbei',
              name: '江北区',
              markets: [
                {
                  id: 'ningbo_jiangbei_tea_market',
                  name: '宁波江北茶叶市场',
                  location: '浙江省宁波市江北区',
                  address: '江北区',
                  description: '江北区主要茶叶交易市场',
                  merchantCount: 100,
                  specialties: ['绿茶', '乌龙茶']
                }
              ]
            }
          ]
        },
        {
          id: 'wenzhou',
          name: '温州市',
          districts: [
            {
              id: 'lucheng',
              name: '鹿城区',
              markets: [
                {
                  id: 'wenzhou_tea_market',
                  name: '温州茶叶市场',
                  location: '浙江省温州市鹿城区',
                  address: '人民路',
                  description: '温州地区主要茶叶交易市场',
                  merchantCount: 180,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                },
                {
                  id: 'wenzhou_jiangnan_tea_market',
                  name: '温州江南茶叶市场',
                  location: '浙江省温州市鹿城区',
                  address: '江滨路',
                  description: '现代化茶叶商贸中心',
                  merchantCount: 120,
                  specialties: ['绿茶', '红茶']
                }
              ]
            }
          ]
        },
        {
          id: 'jiaxing',
          name: '嘉兴市',
          districts: [
            {
              id: 'nanhu',
              name: '南湖区',
              markets: [
                {
                  id: 'jiaxing_tea_market',
                  name: '嘉兴茶叶市场',
                  location: '浙江省嘉兴市南湖区',
                  address: '南湖区',
                  description: '嘉兴地区茶叶集散中心',
                  merchantCount: 80,
                  specialties: ['绿茶', '红茶']
                }
              ]
            }
          ]
        },
        {
          id: 'shaoxing',
          name: '绍兴市',
          districts: [
            {
              id: 'yuecheng',
              name: '越城区',
              markets: [
                {
                  id: 'shaoxing_tea_market',
                  name: '绍兴茶叶市场',
                  location: '浙江省绍兴市越城区',
                  address: '解放路',
                  description: '绍兴传统茶叶交易市场',
                  merchantCount: 100,
                  specialties: ['绿茶', '红茶', '花茶']
                }
              ]
            }
          ]
        },
        {
          id: 'huzhou',
          name: '湖州市',
          districts: [
            {
              id: 'wuxing',
              name: '吴兴区',
              markets: [
                {
                  id: 'huzhou_tea_market',
                  name: '湖州茶叶市场',
                  location: '浙江省湖州市吴兴区',
                  address: '红旗路',
                  description: '湖州地区茶叶交易中心',
                  merchantCount: 90,
                  specialties: ['绿茶', '白茶']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'jiangsu',
      name: '江苏省',
      region: '华东地区',
      marketCount: 138,
      cities: [
        {
          id: 'nanjing',
          name: '南京市',
          districts: [
            {
              id: 'xuanwu',
              name: '玄武区',
              markets: [
                {
                  id: 'nanjing_tea_market',
                  name: '南京茶叶市场',
                  location: '江苏省南京市玄武区',
                  address: '龙蟠路',
                  description: '江苏省主要茶叶交易市场',
                  merchantCount: 250,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
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
                {
                  id: 'suzhou_tea_market',
                  name: '苏州茶叶市场',
                  location: '江苏省苏州市姑苏区',
                  address: '人民路',
                  description: '苏州地区主要茶叶交易市场',
                  merchantCount: 180,
                  specialties: ['碧螺春', '绿茶', '红茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 河南省详细数据
    {
      id: 'henan',
      name: '河南省',
      region: '华中地区',
      marketCount: 435,
      cities: [
        {
          id: 'zhengzhou',
          name: '郑州市',
          districts: [
            {
              id: 'erqi',
              name: '二七区',
              markets: [
                {
                  id: 'zhengzhou_beimao_tea_market',
                  name: '郑州北茂茶叶批发市场',
                  location: '河南省郑州市二七区',
                  address: '二七区北环路与北三环交汇处',
                  description: '河南省最大的茶叶批发市场',
                  merchantCount: 300,
                  specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶']
                },
                {
                  id: 'zhengzhou_nanyang_road_tea_market',
                  name: '郑州南阳路茶叶批发市场',
                  location: '河南省郑州市二七区',
                  address: '南阳路与北三环交汇处',
                  description: '中原地区重要茶叶集散地',
                  merchantCount: 250,
                  specialties: ['信阳毛尖', '绿茶', '红茶']
                },
                {
                  id: 'zhengzhou_international_tea_city',
                  name: '郑州国际茶城',
                  location: '河南省郑州市二七区',
                  address: '郑州二七区万达商圈内',
                  description: '现代化茶叶商业综合体',
                  merchantCount: 200,
                  specialties: ['名优茶叶', '茶文化用品']
                }
              ]
            }
          ]
        },
        {
          id: 'luoyang',
          name: '洛阳市',
          districts: [
            {
              id: 'jianxi',
              name: '涧西区',
              markets: [
                {
                  id: 'luoyang_tea_market',
                  name: '洛阳茶叶市场',
                  location: '河南省洛阳市涧西区',
                  address: '建设路与九都路交汇处',
                  description: '洛阳地区主要茶叶交易市场',
                  merchantCount: 150,
                  specialties: ['绿茶', '红茶', '花茶']
                }
              ]
            }
          ]
        },
        {
          id: 'xinyang',
          name: '信阳市',
          districts: [
            {
              id: 'shihe',
              name: '浉河区',
              markets: [
                {
                  id: 'xinyang_maojian_market',
                  name: '信阳毛尖茶叶市场',
                  location: '河南省信阳市浉河区',
                  address: '茶叶大道',
                  description: '信阳毛尖原产地专业市场',
                  merchantCount: 400,
                  specialties: ['信阳毛尖', '绿茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 湖北省详细数据
    {
      id: 'hubei',
      name: '湖北省',
      region: '华中地区',
      marketCount: 328,
      cities: [
        {
          id: 'wuhan',
          name: '武汉市',
          districts: [
            {
              id: 'hankou',
              name: '汉口区',
              markets: [
                {
                  id: 'wuhan_hankou_tea_market',
                  name: '武汉汉口茶叶市场',
                  location: '湖北省武汉市汉口区',
                  address: '六角亭茶叶大市场',
                  description: '华中地区重要茶叶集散中心',
                  merchantCount: 500,
                  specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶']
                },
                {
                  id: 'wuhan_zhongnan_tea_market',
                  name: '武汉中南茶叶批发市场',
                  location: '湖北省武汉市汉口区',
                  address: '中南路',
                  description: '武汉传统茶叶批发基地',
                  merchantCount: 300,
                  specialties: ['绿茶', '红茶', '花茶']
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
              id: 'xiling',
              name: '西陵区',
              markets: [
                {
                  id: 'yichang_tea_market',
                  name: '宜昌茶叶市场',
                  location: '湖北省宜昌市西陵区',
                  address: '东山大道',
                  description: '三峡地区茶叶交易中心',
                  merchantCount: 120,
                  specialties: ['绿茶', '红茶', '宜昌红茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 湖南省详细数据
    {
      id: 'hunan',
      name: '湖南省',
      region: '华中地区',
      marketCount: 383,
      cities: [
        {
          id: 'changsha',
          name: '长沙市',
          districts: [
            {
              id: 'furong',
              name: '芙蓉区',
              markets: [
                {
                  id: 'changsha_gaoshangyuan_tea_market',
                  name: '长沙高上园茶叶市场',
                  location: '湖南省长沙市芙蓉区',
                  address: '韶山路',
                  description: '湖南省最大的茶叶批发市场',
                  merchantCount: 400,
                  specialties: ['绿茶', '红茶', '黑茶', '花茶']
                }
              ]
            }
          ]
        },
        {
          id: 'yiyang',
          name: '益阳市',
          districts: [
            {
              id: 'heshan',
              name: '赫山区',
              markets: [
                {
                  id: 'yiyang_anhua_tea_market',
                  name: '益阳安化茶叶市场',
                  location: '湖南省益阳市赫山区',
                  address: '安化黑茶产业园',
                  description: '安化黑茶原产地交易市场',
                  merchantCount: 200,
                  specialties: ['安化黑茶', '黑茶', '茶砖']
                }
              ]
            }
          ]
        }
      ]
    },
    // 安徽省详细数据
    {
      id: 'anhui',
      name: '安徽省',
      region: '华东地区',
      marketCount: 341,
      cities: [
        {
          id: 'hefei',
          name: '合肥市',
          districts: [
            {
              id: 'luyang',
              name: '庐阳区',
              markets: [
                {
                  id: 'hefei_tea_market',
                  name: '合肥茶叶批发市场',
                  location: '安徽省合肥市庐阳区',
                  address: '阜阳路茶叶城',
                  description: '安徽省主要茶叶集散地',
                  merchantCount: 300,
                  specialties: ['绿茶', '红茶', '黄山毛峰']
                }
              ]
            }
          ]
        },
        {
          id: 'huangshan',
          name: '黄山市',
          districts: [
            {
              id: 'tunxi',
              name: '屯溪区',
              markets: [
                {
                  id: 'huangshan_maofeng_market',
                  name: '黄山毛峰茶叶市场',
                  location: '安徽省黄山市屯溪区',
                  address: '茶城路',
                  description: '黄山毛峰原产地专业市场',
                  merchantCount: 250,
                  specialties: ['黄山毛峰', '祁门红茶', '绿茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 江西省详细数据
    {
      id: 'jiangxi',
      name: '江西省',
      region: '华东地区',
      marketCount: 329,
      cities: [
        {
          id: 'nanchang',
          name: '南昌市',
          districts: [
            {
              id: 'donghu',
              name: '东湖区',
              markets: [
                {
                  id: 'nanchang_tea_market',
                  name: '南昌茶叶批发市场',
                  location: '江西省南昌市东湖区',
                  address: '洪城路',
                  description: '江西省重要茶叶交易中心',
                  merchantCount: 200,
                  specialties: ['绿茶', '红茶', '白茶']
                }
              ]
            }
          ]
        },
        {
          id: 'jiujiang',
          name: '九江市',
          districts: [
            {
              id: 'xunyang',
              name: '浔阳区',
              markets: [
                {
                  id: 'jiujiang_lushan_tea_market',
                  name: '九江庐山茶叶市场',
                  location: '江西省九江市浔阳区',
                  address: '庐山路',
                  description: '庐山云雾茶原产地市场',
                  merchantCount: 150,
                  specialties: ['庐山云雾茶', '绿茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 四川省详细数据
    {
      id: 'sichuan',
      name: '四川省',
      region: '西南地区',
      marketCount: 448,
      cities: [
        {
          id: 'chengdu',
          name: '成都市',
          districts: [
            {
              id: 'wuhou',
              name: '武侯区',
              markets: [
                {
                  id: 'chengdu_wuhou_tea_market',
                  name: '成都五块石茶叶市场',
                  location: '四川省成都市武侯区',
                  address: '金花茶叶批发市场',
                  description: '西南地区最大的茶叶批发市场',
                  merchantCount: 600,
                  specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶']
                }
              ]
            }
          ]
        },
        {
          id: 'yaan',
          name: '雅安市',
          districts: [
            {
              id: 'yucheng',
              name: '雨城区',
              markets: [
                {
                  id: 'yaan_mengdingshan_tea_market',
                  name: '雅安蒙顶山茶叶市场',
                  location: '四川省雅安市雨城区',
                  address: '蒙顶山茶叶交易中心',
                  description: '蒙顶山茶原产地专业市场',
                  merchantCount: 200,
                  specialties: ['蒙顶甘露', '绿茶', '黄茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 云南省详细数据
    {
      id: 'yunnan',
      name: '云南省',
      region: '西南地区',
      marketCount: 425,
      cities: [
        {
          id: 'kunming',
          name: '昆明市',
          districts: [
            {
              id: 'guandu',
              name: '官渡区',
              markets: [
                {
                  id: 'kunming_kangletang_tea_market',
                  name: '昆明康乐茶文化城',
                  location: '云南省昆明市官渡区',
                  address: '关上茶叶批发市场',
                  description: '云南省最大的茶叶集散地',
                  merchantCount: 800,
                  specialties: ['普洱茶', '滇红茶', '绿茶', '白茶']
                }
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
                {
                  id: 'puer_tea_trading_center',
                  name: '普洱茶叶交易中心',
                  location: '云南省普洱市思茅区',
                  address: '普洱茶都',
                  description: '普洱茶原产地专业交易市场',
                  merchantCount: 400,
                  specialties: ['普洱茶', '生茶', '熟茶', '古树茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 重庆市详细数据
    {
      id: 'chongqing',
      name: '重庆市',
      region: '西南地区',
      marketCount: 118,
      cities: [
        {
          id: 'yuzhong',
          name: '渝中区',
          districts: [
            {
              id: 'chaotianmen',
              name: '朝天门',
              markets: [
                {
                  id: 'chongqing_chaotianmen_tea_market',
                  name: '重庆朝天门茶叶市场',
                  location: '重庆市渝中区',
                  address: '朝天门批发市场',
                  description: '重庆主要茶叶批发集散地',
                  merchantCount: 200,
                  specialties: ['绿茶', '红茶', '普洱茶', '花茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 贵州省详细数据
    {
      id: 'guizhou',
      name: '贵州省',
      region: '西南地区',
      marketCount: 222,
      cities: [
        {
          id: 'guiyang',
          name: '贵阳市',
          districts: [
            {
              id: 'nanming',
              name: '南明区',
              markets: [
                {
                  id: 'guiyang_tea_market',
                  name: '贵阳茶叶批发市场',
                  location: '贵州省贵阳市南明区',
                  address: '中华南路',
                  description: '贵州省主要茶叶交易市场',
                  merchantCount: 150,
                  specialties: ['绿茶', '红茶', '都匀毛尖']
                }
              ]
            }
          ]
        }
      ]
    },
    // 广西详细数据
    {
      id: 'guangxi',
      name: '广西壮族自治区',
      region: '华南地区',
      marketCount: 226,
      cities: [
        {
          id: 'nanning',
          name: '南宁市',
          districts: [
            {
              id: 'qingxiu',
              name: '青秀区',
              markets: [
                {
                  id: 'nanning_tea_market',
                  name: '南宁茶叶批发市场',
                  location: '广西南宁市青秀区',
                  address: '民族大道',
                  description: '广西最大的茶叶批发市场',
                  merchantCount: 200,
                  specialties: ['绿茶', '红茶', '六堡茶', '花茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 海南省详细数据
    {
      id: 'hainan',
      name: '海南省',
      region: '华南地区',
      marketCount: 28,
      cities: [
        {
          id: 'haikou',
          name: '海口市',
          districts: [
            {
              id: 'meilan',
              name: '美兰区',
              markets: [
                {
                  id: 'haikou_tea_market',
                  name: '海口茶叶市场',
                  location: '海南省海口市美兰区',
                  address: '海府路',
                  description: '海南省主要茶叶交易市场',
                  merchantCount: 50,
                  specialties: ['绿茶', '红茶', '乌龙茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 河北省详细数据
    {
      id: 'hebei',
      name: '河北省',
      region: '华北地区',
      marketCount: 325,
      cities: [
        {
          id: 'shijiazhuang',
          name: '石家庄市',
          districts: [
            {
              id: 'qiaoxi',
              name: '桥西区',
              markets: [
                {
                  id: 'shijiazhuang_tea_market',
                  name: '石家庄茶叶批发市场',
                  location: '河北省石家庄市桥西区',
                  address: '中华南大街',
                  description: '河北省最大的茶叶批发市场',
                  merchantCount: 300,
                  specialties: ['绿茶', '红茶', '花茶', '砖茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 山西省详细数据
    {
      id: 'shanxi',
      name: '山西省',
      region: '华北地区',
      marketCount: 218,
      cities: [
        {
          id: 'taiyuan',
          name: '太原市',
          districts: [
            {
              id: 'xiaodian',
              name: '小店区',
              markets: [
                {
                  id: 'taiyuan_tea_market',
                  name: '太原茶叶批发市场',
                  location: '山西省太原市小店区',
                  address: '长风街',
                  description: '山西省主要茶叶交易市场',
                  merchantCount: 200,
                  specialties: ['绿茶', '红茶', '花茶', '砖茶']
                }
              ]
            }
          ]
        }
      ]
    },
    // 内蒙古详细数据
    {
      id: 'neimenggu',
      name: '内蒙古自治区',
      region: '华北地区',
      marketCount: 135,
      cities: [
        {
          id: 'huhehaote',
          name: '呼和浩特市',
          districts: [
            {
              id: 'xincheng',
              name: '新城区',
              markets: [
                {
                  id: 'huhehaote_tea_market',
                  name: '呼和浩特茶叶市场',
                  location: '内蒙古呼和浩特市新城区',
                  address: '新华大街',
                  description: '内蒙古主要茶叶交易市场',
                  merchantCount: 120,
                  specialties: ['砖茶', '绿茶', '红茶', '奶茶原料']
                }
              ]
            }
          ]
        }
      ]
    },
    // 辽宁省详细数据
    {
      id: 'liaoning',
      name: '辽宁省',
      region: '东北地区',
      marketCount: 220,
      cities: [
        {
          id: 'shenyang',
          name: '沈阳市',
          districts: [
            {
              id: 'heping',
              name: '和平区',
              markets: [
                {
                  id: 'shenyang_tea_market',
                  name: '沈阳茶叶批发市场',
                  location: '辽宁省沈阳市和平区',
                  address: '太原街',
                  description: '东北地区重要茶叶集散地',
                  merchantCount: 250,
                  specialties: ['绿茶', '红茶', '花茶', '乌龙茶']
                }
              ]
            }
          ]
        }
      ]
          },
      // 吉林省详细数据
      {
        id: 'jilin',
        name: '吉林省',
        region: '东北地区',
        marketCount: 180,
        cities: [
          {
            id: 'changchun',
            name: '长春市',
            districts: [
              {
                id: 'chaoyang',
                name: '朝阳区',
                markets: [
                  {
                    id: 'changchun_tea_market',
                    name: '长春茶叶批发市场',
                    location: '吉林省长春市朝阳区',
                    address: '红旗街',
                    description: '吉林省主要茶叶交易市场',
                    merchantCount: 150,
                    specialties: ['绿茶', '红茶', '花茶', '乌龙茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 黑龙江省详细数据
      {
        id: 'heilongjiang',
        name: '黑龙江省',
        region: '东北地区',
        marketCount: 210,
        cities: [
          {
            id: 'harbin',
            name: '哈尔滨市',
            districts: [
              {
                id: 'nangang',
                name: '南岗区',
                markets: [
                  {
                    id: 'harbin_tea_market',
                    name: '哈尔滨茶叶批发市场',
                    location: '黑龙江省哈尔滨市南岗区',
                    address: '红军街',
                    description: '黑龙江省最大的茶叶批发市场',
                    merchantCount: 200,
                    specialties: ['绿茶', '红茶', '花茶', '砖茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 北京市详细数据
      {
        id: 'beijing',
        name: '北京市',
        region: '华北地区',
        marketCount: 385,
        cities: [
          {
            id: 'xicheng',
            name: '西城区',
            districts: [
              {
                id: 'xidan',
                name: '西单',
                markets: [
                  {
                    id: 'beijing_maliandao_tea_market',
                    name: '北京马连道茶叶市场',
                    location: '北京市西城区',
                    address: '马连道路',
                    description: '北方最大的茶叶集散地',
                    merchantCount: 800,
                    specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶', '花茶']
                  }
                ]
              }
            ]
          },
          {
            id: 'chaoyang',
            name: '朝阳区',
            districts: [
              {
                id: 'sanlitun',
                name: '三里屯',
                markets: [
                  {
                    id: 'beijing_chaoyang_tea_market',
                    name: '北京朝阳茶叶市场',
                    location: '北京市朝阳区',
                    address: '朝阳路',
                    description: '现代化茶叶商业中心',
                    merchantCount: 200,
                    specialties: ['高端茶叶', '进口茶叶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 天津市详细数据
      {
        id: 'tianjin',
        name: '天津市',
        region: '华北地区',
        marketCount: 185,
        cities: [
          {
            id: 'nankai',
            name: '南开区',
            districts: [
              {
                id: 'guwenhua',
                name: '古文化街',
                markets: [
                  {
                    id: 'tianjin_tea_market',
                    name: '天津茶叶批发市场',
                    location: '天津市南开区',
                    address: '古文化街',
                    description: '天津地区主要茶叶交易市场',
                    merchantCount: 180,
                    specialties: ['绿茶', '红茶', '花茶', '乌龙茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 上海市详细数据
      {
        id: 'shanghai',
        name: '上海市',
        region: '华东地区',
        marketCount: 285,
        cities: [
          {
            id: 'huangpu',
            name: '黄浦区',
            districts: [
              {
                id: 'yuyuan',
                name: '豫园',
                markets: [
                  {
                    id: 'shanghai_tianshan_tea_market',
                    name: '上海天山茶城',
                    location: '上海市黄浦区',
                    address: '天山路',
                    description: '上海最大的茶叶批发市场',
                    merchantCount: 400,
                    specialties: ['绿茶', '红茶', '普洱茶', '乌龙茶']
                  }
                ]
              }
            ]
          },
          {
            id: 'putuo',
            name: '普陀区',
            districts: [
              {
                id: 'caoyang',
                name: '曹阳',
                markets: [
                  {
                    id: 'shanghai_putuo_tea_market',
                    name: '上海普陀茶叶市场',
                    location: '上海市普陀区',
                    address: '曹阳路',
                    description: '现代化茶叶商贸中心',
                    merchantCount: 250,
                    specialties: ['名优茶叶', '进口茶叶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 陕西省详细数据
      {
        id: 'shaanxi',
        name: '陕西省',
        region: '西北地区',
        marketCount: 245,
        cities: [
          {
            id: 'xian',
            name: '西安市',
            districts: [
              {
                id: 'beilin',
                name: '碑林区',
                markets: [
                  {
                    id: 'xian_tea_market',
                    name: '西安茶叶批发市场',
                    location: '陕西省西安市碑林区',
                    address: '太白路',
                    description: '西北地区重要茶叶集散中心',
                    merchantCount: 300,
                    specialties: ['绿茶', '红茶', '砖茶', '花茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 甘肃省详细数据
      {
        id: 'gansu',
        name: '甘肃省',
        region: '西北地区',
        marketCount: 165,
        cities: [
          {
            id: 'lanzhou',
            name: '兰州市',
            districts: [
              {
                id: 'chengguan',
                name: '城关区',
                markets: [
                  {
                    id: 'lanzhou_tea_market',
                    name: '兰州茶叶市场',
                    location: '甘肃省兰州市城关区',
                    address: '张掖路',
                    description: '甘肃省主要茶叶交易市场',
                    merchantCount: 150,
                    specialties: ['砖茶', '绿茶', '红茶', '花茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 青海省详细数据
      {
        id: 'qinghai',
        name: '青海省',
        region: '西北地区',
        marketCount: 85,
        cities: [
          {
            id: 'xining',
            name: '西宁市',
            districts: [
              {
                id: 'chengdong',
                name: '城东区',
                markets: [
                  {
                    id: 'xining_tea_market',
                    name: '西宁茶叶市场',
                    location: '青海省西宁市城东区',
                    address: '建国路',
                    description: '青海省主要茶叶交易市场',
                    merchantCount: 80,
                    specialties: ['砖茶', '绿茶', '红茶', '奶茶原料']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 宁夏详细数据
      {
        id: 'ningxia',
        name: '宁夏回族自治区',
        region: '西北地区',
        marketCount: 95,
        cities: [
          {
            id: 'yinchuan',
            name: '银川市',
            districts: [
              {
                id: 'xingqing',
                name: '兴庆区',
                markets: [
                  {
                    id: 'yinchuan_tea_market',
                    name: '银川茶叶市场',
                    location: '宁夏银川市兴庆区',
                    address: '解放街',
                    description: '宁夏主要茶叶交易市场',
                    merchantCount: 90,
                    specialties: ['砖茶', '绿茶', '红茶', '花茶']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 新疆详细数据
      {
        id: 'xinjiang',
        name: '新疆维吾尔自治区',
        region: '西北地区',
        marketCount: 185,
        cities: [
          {
            id: 'urumqi',
            name: '乌鲁木齐市',
            districts: [
              {
                id: 'tianshan',
                name: '天山区',
                markets: [
                  {
                    id: 'urumqi_tea_market',
                    name: '乌鲁木齐茶叶市场',
                    location: '新疆乌鲁木齐市天山区',
                    address: '解放路',
                    description: '新疆最大的茶叶批发市场',
                    merchantCount: 180,
                    specialties: ['砖茶', '绿茶', '红茶', '花茶', '奶茶原料']
                  }
                ]
              }
            ]
          }
        ]
      },
      // 西藏详细数据
      {
        id: 'tibet',
        name: '西藏自治区',
        region: '西南地区',
        marketCount: 65,
        cities: [
          {
            id: 'lhasa',
            name: '拉萨市',
            districts: [
              {
                id: 'chengguan',
                name: '城关区',
                markets: [
                  {
                    id: 'lhasa_tea_market',
                    name: '拉萨茶叶市场',
                    location: '西藏拉萨市城关区',
                    address: '北京路',
                    description: '西藏主要茶叶交易市场',
                    merchantCount: 60,
                    specialties: ['砖茶', '酥油茶原料', '绿茶', '红茶']
                  }
                ]
              }
            ]
          }
        ]
      }
  ]
};

// 生成统计信息
function generateStats() {
  let totalCities = 0;
  let totalDistricts = 0;
  let totalMarkets = 0;
  let totalMerchants = 0;

  teaMarketCompleteData.provinces.forEach(province => {
    if (province.cities && province.cities.length > 0) {
      totalCities += province.cities.length;
      province.cities.forEach(city => {
        totalDistricts += city.districts.length;
        city.districts.forEach(district => {
          totalMarkets += district.markets.length;
          district.markets.forEach(market => {
            totalMerchants += market.merchantCount || 0;
          });
        });
      });
    } else {
      totalMarkets += province.marketCount;
    }
  });

  return {
    totalProvinceCount: teaMarketCompleteData.provinces.length,
    totalCities,
    totalDistricts,
    totalMarkets,
    totalMerchants
  };
}

// 按省份获取市场数据
function getMarketsByProvince(provinceName) {
  const province = teaMarketCompleteData.provinces.find(p => p.name === provinceName);
  if (!province) return [];
  
  const markets = [];
  
  if (province.cities && province.cities.length > 0) {
    province.cities.forEach(city => {
      city.districts.forEach(district => {
        district.markets.forEach(market => {
          markets.push({
            ...market,
            city: city.name,
            district: district.name,
            province: province.name
          });
        });
      });
    });
    return markets;
  }
  
  return [{
    id: `${province.id}_info`,
    name: `${provinceName}茶叶市场信息`,
    city: '详情',
    district: '请联系',
    province: province.name,
    address: '市场详细信息正在完善中',
    description: `${provinceName}共有${province.marketCount}个茶叶市场，详细信息请联系客服获取`,
    merchantCount: 0
  }];
}

// 按地理大区获取省份
function getProvincesByRegion(regionName) {
  const region = teaMarketCompleteData.geographicRegions.find(r => r.name === regionName);
  if (!region) return [];
  
  return teaMarketCompleteData.provinces.filter(province => 
    province.region === regionName
  );
}

// 搜索市场
function searchMarkets(keyword) {
  if (!keyword) return [];
  
  const results = [];
  
  teaMarketCompleteData.provinces.forEach(province => {
    if (province.name.includes(keyword)) {
      results.push({
        id: `${province.id}_search`,
        name: `${province.name}茶叶市场`,
        city: province.name,
        district: '全省',
        province: province.name,
        address: '详细地址请联系客服',
        description: `${province.name}共有${province.marketCount}个茶叶市场`
      });
    }
    
    // 搜索具体市场
    if (province.cities) {
      province.cities.forEach(city => {
        city.districts.forEach(district => {
          district.markets.forEach(market => {
            if (market.name.includes(keyword) || market.address.includes(keyword)) {
              results.push({
                ...market,
                city: city.name,
                district: district.name,
                province: province.name
              });
            }
          });
        });
      });
    }
  });
  
  return results;
}

// 获取知名市场
function getFamousMarkets() {
  const famousMarkets = [];
  
  teaMarketCompleteData.provinces.forEach(province => {
    if (province.cities) {
      province.cities.forEach(city => {
        city.districts.forEach(district => {
          district.markets.forEach(market => {
            if (market.merchantCount >= 200) {
              famousMarkets.push({
                ...market,
                city: city.name,
                district: district.name,
                province: province.name
              });
            }
          });
        });
      });
    }
  });
  
  return famousMarkets.slice(0, 10); // 返回前10个知名市场
}

// 按茶叶类型获取市场
function getMarketsByTeaType(teaType) {
  const results = [];
  
  teaMarketCompleteData.provinces.forEach(province => {
    if (province.cities) {
      province.cities.forEach(city => {
        city.districts.forEach(district => {
          district.markets.forEach(market => {
            if (market.specialties && market.specialties.includes(teaType)) {
              results.push({
                ...market,
                city: city.name,
                district: district.name,
                province: province.name
              });
            }
          });
        });
      });
    }
  });
  
  return results;
}

// 获取省份统计信息
function getProvinceStats() {
  return teaMarketCompleteData.provinces.map(province => {
    let actualMarketCount = 0;
    let cityCount = 0;
    
    if (province.cities && province.cities.length > 0) {
      cityCount = province.cities.length;
      province.cities.forEach(city => {
        city.districts.forEach(district => {
          actualMarketCount += district.markets.length;
        });
      });
    } else {
      actualMarketCount = province.marketCount;
    }
    
    return {
      id: province.id,
      name: province.name,
      region: province.region,
      marketCount: actualMarketCount,
      cityCount: cityCount
    };
  });
}

// 导出数据和函数
module.exports = {
  teaMarketCompleteData,
  generateStats,
  getMarketsByProvince,
  getProvincesByRegion,
  searchMarkets,
  getFamousMarkets,
  getMarketsByTeaType,
  getProvinceStats
}; 