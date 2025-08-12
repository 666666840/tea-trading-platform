// 河北省茶叶市场数据
const hebeiData = {
  id: 'hebei',
  name: '河北省',
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
              id: 'huaxia1_tea_wholesale',
              name: '华夏1号茶叶批发市场',
              location: '河北省石家庄市桥西区',
              merchantCount: 120,
              address: '石家庄市桥西区',
              description: '桥西区主要茶叶批发市场'
            },
            {
              id: 'jianong_tea_market',
              name: '佳农茶叶市场',
              location: '河北省石家庄市桥西区',
              merchantCount: 90,
              address: '石家庄市桥西区',
              description: '佳农茶叶交易市场'
            },
            {
              id: 'jinzheng_tea_market',
              name: '金正茶叶市场',
              location: '河北省石家庄市桥西区',
              merchantCount: 85,
              address: '石家庄市桥西区',
              description: '金正茶叶交易市场'
            },
            {
              id: 'youyibeidajie_tea_wholesale',
              name: '友谊北大街茶叶批发市场',
              location: '河北省石家庄市桥西区',
              merchantCount: 110,
              address: '石家庄市桥西区友谊北大街',
              description: '友谊北大街茶叶批发市场'
            }
          ]
        },
        {
          id: 'gaoyi',
          name: '高邑县',
          markets: [
            {
              id: 'mingyang_tea_wholesale_center',
              name: '明阳茶叶批发中心',
              location: '河北省石家庄市高邑县',
              merchantCount: 70,
              address: '石家庄市高邑县',
              description: '高邑县茶叶批发中心'
            }
          ]
        },
        {
          id: 'changan',
          name: '长安区',
          markets: [
            {
              id: 'caixing_tea_wholesale',
              name: '财星茶业批发市场',
              location: '河北省石家庄市长安区',
              merchantCount: 95,
              address: '石家庄市长安区',
              description: '长安区茶业批发市场'
            }
          ]
        }
      ]
    },
    {
      id: 'tangshan',
      name: '唐山市',
      districts: [
        {
          id: 'lunan',
          name: '路南区',
          markets: [
            {
              id: 'tangshan_tiandao_tea_city',
              name: '唐山天道茶城',
              location: '河北省唐山市路南区',
              merchantCount: 150,
              address: '唐山市路南区',
              description: '唐山天道茶城交易中心'
            },
            {
              id: 'fenghuangshan_tea_market',
              name: '凤凰山茶叶市场',
              location: '河北省唐山市路南区',
              merchantCount: 100,
              address: '唐山市路南区凤凰山',
              description: '凤凰山茶叶交易市场'
            },
            {
              id: 'nanhu_tea_market',
              name: '南湖茶叶市场',
              location: '河北省唐山市路南区',
              merchantCount: 85,
              address: '唐山市路南区南湖',
              description: '南湖茶叶交易市场'
            }
          ]
        },
        {
          id: 'lubei',
          name: '路北区',
          markets: [
            {
              id: 'lubei_tea_wholesale_market',
              name: '路北区茶叶批发市场',
              location: '河北省唐山市路北区',
              merchantCount: 120,
              address: '唐山市路北区',
              description: '路北区茶叶批发市场'
            }
          ]
        },
        {
          id: 'fengrun',
          name: '丰润区',
          markets: [
            {
              id: 'fengrun_tea_market',
              name: '丰润区茶叶市场（茶文化街）',
              location: '河北省唐山市丰润区',
              merchantCount: 95,
              address: '唐山市丰润区茶文化街',
              description: '丰润区茶叶市场茶文化街'
            }
          ]
        },
        {
          id: 'gaoxin',
          name: '高新区',
          markets: [
            {
              id: 'xianming_tea_shop',
              name: '仙茗茶行',
              location: '河北省唐山市高新区',
              merchantCount: 60,
              address: '唐山市高新区',
              description: '高新区仙茗茶行'
            }
          ]
        }
      ]
    },
    {
      id: 'qinhuangdao',
      name: '秦皇岛市',
      districts: [
        {
          id: 'haigang',
          name: '海港区',
          markets: [
            {
              id: 'qinhuangdao_nongken_tea_trade',
              name: '秦皇岛农垦茶叶贸易有限公司',
              location: '河北省秦皇岛市海港区',
              merchantCount: 80,
              address: '秦皇岛市海港区',
              description: '农垦茶叶贸易公司'
            },
            {
              id: 'jiefanglu_tea_wholesale',
              name: '解放路茶叶批发市场',
              location: '河北省秦皇岛市海港区',
              merchantCount: 110,
              address: '秦皇岛市海港区解放路',
              description: '解放路茶叶批发市场'
            },
            {
              id: 'huayi_century_tea_field',
              name: '华亿茶叶场 & 世纪城茶叶场',
              location: '河北省秦皇岛市海港区',
              merchantCount: 95,
              address: '秦皇岛市海港区',
              description: '华亿茶叶场和世纪城茶叶场'
            }
          ]
        },
        {
          id: 'beidaihe',
          name: '北戴河区',
          markets: [
            {
              id: 'beidaihe_specialty_market',
              name: '北戴河特产市场',
              location: '河北省秦皇岛市北戴河区',
              merchantCount: 70,
              address: '秦皇岛市北戴河区',
              description: '北戴河特产市场茶叶区'
            }
          ]
        },
        {
          id: 'shanhaiguan',
          name: '山海关区',
          markets: [
            {
              id: 'changcheng_tea_house',
              name: '长城茶社',
              location: '河北省秦皇岛市山海关区',
              merchantCount: 50,
              address: '秦皇岛市山海关区',
              description: '山海关区长城茶社'
            },
            {
              id: 'gudao_tea_shop',
              name: '古道茶行',
              location: '河北省秦皇岛市山海关区',
              merchantCount: 45,
              address: '秦皇岛市山海关区',
              description: '山海关区古道茶行'
            }
          ]
        },
        {
          id: 'kaifaqu',
          name: '开发区',
          markets: [
            {
              id: 'tiancui_tianfu_tea_dealer',
              name: '天翠天福茗茶经销部',
              location: '河北省秦皇岛市开发区',
              merchantCount: 40,
              address: '秦皇岛市开发区',
              description: '开发区天翠天福茗茶经销部'
            }
          ]
        },
        {
          id: 'changli',
          name: '昌黎县',
          markets: [
            {
              id: 'xinji_agricultural_market',
              name: '新集农副产品市场（茶叶区）',
              location: '河北省秦皇岛市昌黎县',
              merchantCount: 65,
              address: '秦皇岛市昌黎县新集',
              description: '新集农副产品市场茶叶区'
            }
          ]
        }
      ]
    },
    {
      id: 'handan',
      name: '邯郸市',
      districts: [
        {
          id: 'hanshan',
          name: '邯山区',
          markets: [
            {
              id: 'yilande_market',
              name: '意蓝德市场',
              location: '河北省邯郸市邯山区',
              merchantCount: 100,
              address: '邯郸市邯山区',
              description: '邯山区意蓝德市场'
            },
            {
              id: 'tianming_tea_wholesale',
              name: '天明茶叶批发部',
              location: '河北省邯郸市邯山区',
              merchantCount: 75,
              address: '邯郸市邯山区',
              description: '邯山区天明茶叶批发部'
            },
            {
              id: 'handan_tea_city',
              name: '邯郸茶城',
              location: '河北省邯郸市邯山区',
              merchantCount: 130,
              address: '邯郸市邯山区',
              description: '邯郸市主要茶叶交易中心'
            }
          ]
        },
        {
          id: 'congtai',
          name: '丛台区',
          markets: [
            {
              id: 'handan_tea_wholesale_city',
              name: '邯郸市茶叶批发城',
              location: '河北省邯郸市丛台区',
              merchantCount: 140,
              address: '邯郸市丛台区',
              description: '邯郸市茶叶批发城'
            },
            {
              id: 'yunshan_tea_wholesale',
              name: '云山茶叶批发部',
              location: '河北省邯郸市丛台区',
              merchantCount: 85,
              address: '邯郸市丛台区',
              description: '丛台区云山茶叶批发部'
            }
          ]
        },
        {
          id: 'fuxing',
          name: '复兴区',
          markets: [
            {
              id: 'handan_tea_wholesale_fuxing',
              name: '邯郸茶叶批发城（复兴区）',
              location: '河北省邯郸市复兴区',
              merchantCount: 110,
              address: '邯郸市复兴区',
              description: '复兴区茶叶批发城'
            }
          ]
        }
      ]
    },
    {
      id: 'baoding',
      name: '保定市',
      districts: [
        {
          id: 'lianchi',
          name: '莲池区',
          markets: [
            {
              id: 'huazhou_tea_city',
              name: '华洲茶城',
              location: '河北省保定市莲池区',
              merchantCount: 120,
              address: '保定市莲池区',
              description: '莲池区华洲茶城'
            },
            {
              id: 'zhili_tea_market',
              name: '直隶茶叶市场',
              location: '河北省保定市莲池区',
              merchantCount: 95,
              address: '保定市莲池区',
              description: '莲池区直隶茶叶市场'
            }
          ]
        },
        {
          id: 'jingxiu',
          name: '竞秀区',
          markets: [
            {
              id: 'wuyi_tea_market',
              name: '五一茶叶市场',
              location: '河北省保定市竞秀区',
              merchantCount: 80,
              address: '保定市竞秀区',
              description: '竞秀区五一茶叶市场'
            }
          ]
        },
        {
          id: 'mancheng',
          name: '满城区',
          markets: [
            {
              id: 'ma_tea_city',
              name: '马茶城',
              location: '河北省保定市满城区',
              merchantCount: 90,
              address: '保定市满城区',
              description: '满城区马茶城'
            }
          ]
        },
        {
          id: 'shizhongxin',
          name: '市中心',
          markets: [
            {
              id: 'gulianhua_market',
              name: '古莲花市场',
              location: '河北省保定市市中心',
              merchantCount: 100,
              address: '保定市市中心',
              description: '市中心古莲花市场'
            }
          ]
        },
        {
          id: 'anxin',
          name: '安新县',
          markets: [
            {
              id: 'xingming_tea_market',
              name: '兴茗茶叶市场',
              location: '河北省保定市安新县',
              merchantCount: 70,
              address: '保定市安新县',
              description: '安新县兴茗茶叶市场'
            }
          ]
        }
      ]
    },
    {
      id: 'xingtai',
      name: '邢台市',
      districts: [
        {
          id: 'xindu',
          name: '信都区',
          markets: [
            {
              id: 'xingtai_tea_city',
              name: '邢台茶城',
              location: '河北省邢台市信都区',
              merchantCount: 110,
              address: '邢台市信都区',
              description: '信都区邢台茶城'
            },
            {
              id: 'chenlong_tea_trade',
              name: '辰龙茶叶商贸公司',
              location: '河北省邢台市信都区',
              merchantCount: 85,
              address: '邢台市信都区',
              description: '信都区辰龙茶叶商贸公司'
            }
          ]
        },
        {
          id: 'xiangdu',
          name: '襄都区',
          markets: [
            {
              id: 'huaite_ancient_culture_tea_city',
              name: '怀特古文化茶城',
              location: '河北省邢台市襄都区',
              merchantCount: 95,
              address: '邢台市襄都区',
              description: '襄都区怀特古文化茶城'
            },
            {
              id: 'gongxiaofu_tea_store',
              name: '供销福茶专卖店',
              location: '河北省邢台市襄都区',
              merchantCount: 60,
              address: '邢台市襄都区',
              description: '襄都区供销福茶专卖店'
            }
          ]
        },
        {
          id: 'qiaodong',
          name: '桥东区',
          markets: [
            {
              id: 'jiangnan_tea_shop',
              name: '江南茶叶店',
              location: '河北省邢台市桥东区',
              merchantCount: 50,
              address: '邢台市桥东区',
              description: '桥东区江南茶叶店'
            },
            {
              id: 'tianshui_tea_store',
              name: '天水茶叶门市',
              location: '河北省邢台市桥东区',
              merchantCount: 45,
              address: '邢台市桥东区',
              description: '桥东区天水茶叶门市'
            },
            {
              id: 'zhuyeqing_tea_business',
              name: '竹叶青茶业商行',
              location: '河北省邢台市桥东区',
              merchantCount: 55,
              address: '邢台市桥东区',
              description: '桥东区竹叶青茶业商行'
            }
          ]
        },
        {
          id: 'qiaoxi_xingtai',
          name: '桥西区',
          markets: [
            {
              id: 'qingrun_tea_dealer',
              name: '清润茶叶经销处',
              location: '河北省邢台市桥西区',
              merchantCount: 65,
              address: '邢台市桥西区',
              description: '桥西区清润茶叶经销处'
            },
            {
              id: 'linzhang_tea_trade',
              name: '林璋茶叶贸易公司',
              location: '河北省邢台市桥西区',
              merchantCount: 70,
              address: '邢台市桥西区',
              description: '桥西区林璋茶叶贸易公司'
            }
          ]
        },
        {
          id: 'nangong',
          name: '南宫市',
          markets: [
            {
              id: 'baiming_tea_trade',
              name: '佰茗茶叶贸易公司',
              location: '河北省邢台市南宫市',
              merchantCount: 75,
              address: '邢台市南宫市',
              description: '南宫市佰茗茶叶贸易公司'
            }
          ]
        },
        {
          id: 'nanhe',
          name: '南和区',
          markets: [
            {
              id: 'zhangyan_tea_house',
              name: '张燕茶庄',
              location: '河北省邢台市南和区',
              merchantCount: 40,
              address: '邢台市南和区',
              description: '南和区张燕茶庄'
            }
          ]
        }
      ]
    },
    {
      id: 'chengde',
      name: '承德市',
      districts: [
        {
          id: 'shuangqiao',
          name: '双桥区',
          markets: [
            {
              id: 'chengde_tea_field',
              name: '承德市茶叶场',
              location: '河北省承德市双桥区',
              merchantCount: 100,
              address: '承德市双桥区',
              description: '双桥区承德市茶叶场'
            },
            {
              id: 'nandajie_tea_gathering',
              name: '南大街与南市南街茶叶聚集带',
              location: '河北省承德市双桥区',
              merchantCount: 120,
              address: '承德市双桥区南大街',
              description: '南大街与南市南街茶叶聚集带'
            },
            {
              id: 'chengde_tea_city',
              name: '承德茶城',
              location: '河北省承德市双桥区',
              merchantCount: 110,
              address: '承德市双桥区',
              description: '双桥区承德茶城'
            },
            {
              id: 'xuan_tea_garden',
              name: '轩茶苑茶叶商店',
              location: '河北省承德市双桥区',
              merchantCount: 60,
              address: '承德市双桥区',
              description: '双桥区轩茶苑茶叶商店'
            }
          ]
        },
        {
          id: 'shuangluan',
          name: '双滦区',
          markets: [
            {
              id: 'junyu_puer_wholesale_city',
              name: '峻宇普洱茶批发城',
              location: '河北省承德市双滦区',
              merchantCount: 90,
              address: '承德市双滦区',
              description: '双滦区峻宇普洱茶批发城'
            }
          ]
        },
        {
          id: 'xinglong',
          name: '兴隆县',
          markets: [
            {
              id: 'changshan_xinglong_tea_house',
              name: '常山兴隆茶庄',
              location: '河北省承德市兴隆县',
              merchantCount: 50,
              address: '承德市兴隆县',
              description: '兴隆县常山兴隆茶庄'
            }
          ]
        },
        {
          id: 'fengning',
          name: '丰宁县',
          markets: [
            {
              id: 'fengning_puer_tea_store',
              name: '丰宁县普洱茶专卖店',
              location: '河北省承德市丰宁县',
              merchantCount: 45,
              address: '承德市丰宁县',
              description: '丰宁县普洱茶专卖店'
            }
          ]
        }
      ]
    },
    {
      id: 'zhangjiakou',
      name: '张家口市',
      districts: [
        {
          id: 'qiaoxi_zhangjiakou',
          name: '桥西区',
          markets: [
            {
              id: 'jinding_guomao_tea_market',
              name: '金鼎国贸茶叶市场',
              location: '河北省张家口市桥西区',
              merchantCount: 130,
              address: '张家口市桥西区',
              description: '桥西区金鼎国贸茶叶市场'
            },
            {
              id: 'zhangjiakou_international_tea_center',
              name: '张家口国际茶叶交易中心',
              location: '河北省张家口市桥西区',
              merchantCount: 150,
              address: '张家口市桥西区',
              description: '桥西区国际茶叶交易中心'
            }
          ]
        },
        {
          id: 'qiaodong_zhangjiakou',
          name: '桥东区',
          markets: [
            {
              id: 'shengli_beilu_tea_market',
              name: '胜利北路茶叶市场',
              location: '河北省张家口市桥东区',
              merchantCount: 100,
              address: '张家口市桥东区胜利北路',
              description: '桥东区胜利北路茶叶市场'
            },
            {
              id: 'dongxin_mall_tea_area',
              name: '东鑫商城茶叶区',
              location: '河北省张家口市桥东区',
              merchantCount: 85,
              address: '张家口市桥东区东鑫商城',
              description: '桥东区东鑫商城茶叶区'
            }
          ]
        },
        {
          id: 'xuanhua',
          name: '宣化区',
          markets: [
            {
              id: 'xuanhua_ancient_city_tea_area',
              name: '宣化古城茶叶交易区',
              location: '河北省张家口市宣化区',
              merchantCount: 95,
              address: '张家口市宣化区古城',
              description: '宣化区古城茶叶交易区'
            }
          ]
        },
        {
          id: 'jingji_kaifaqu',
          name: '经济开发区',
          markets: [
            {
              id: 'juxiangchun_tea_dealer',
              name: '聚祥春茶叶经销部',
              location: '河北省张家口市经济开发区',
              merchantCount: 70,
              address: '张家口市经济开发区',
              description: '经济开发区聚祥春茶叶经销部'
            }
          ]
        },
        {
          id: 'xiahuayuan',
          name: '下花园区',
          markets: [
            {
              id: 'shucai_market_tea_area',
              name: '蔬菜市场茶叶区',
              location: '河北省张家口市下花园区',
              merchantCount: 60,
              address: '张家口市下花园区蔬菜市场',
              description: '下花园区蔬菜市场茶叶区'
            }
          ]
        },
        {
          id: 'shiqu_jinji',
          name: '市区近郊',
          markets: [
            {
              id: 'wuyang_tea_field',
              name: '武阳茶叶场',
              location: '河北省张家口市市区近郊',
              merchantCount: 80,
              address: '张家口市市区近郊',
              description: '市区近郊武阳茶叶场'
            }
          ]
        }
      ]
    },
    {
      id: 'langfang',
      name: '廊坊市',
      districts: [
        {
          id: 'lianchi_langfang',
          name: '莲池区',
          markets: [
            {
              id: 'huazhou_tea_city_langfang',
              name: '华洲茶城',
              location: '河北省廊坊市莲池区',
              merchantCount: 110,
              address: '廊坊市莲池区',
              description: '莲池区华洲茶城'
            }
          ]
        },
        {
          id: 'guangyang',
          name: '广阳区',
          markets: [
            {
              id: 'yunhe_tea_city',
              name: '运河茶城',
              location: '河北省廊坊市广阳区',
              merchantCount: 120,
              address: '廊坊市广阳区',
              description: '广阳区运河茶城'
            },
            {
              id: 'xinhualu_tea_market',
              name: '新华路茶叶市场',
              location: '河北省廊坊市广阳区',
              merchantCount: 95,
              address: '廊坊市广阳区新华路',
              description: '广阳区新华路茶叶市场'
            }
          ]
        },
        {
          id: 'anci',
          name: '安次区',
          markets: [
            {
              id: 'anci_xihuanlu_tea_market',
              name: '安次区西环路茶叶市场',
              location: '河北省廊坊市安次区',
              merchantCount: 85,
              address: '廊坊市安次区西环路',
              description: '安次区西环路茶叶市场'
            }
          ]
        },
        {
          id: 'shuangluan_langfang',
          name: '双滦区',
          markets: [
            {
              id: 'junyu_puer_tea_city',
              name: '峻宇普洱茶城',
              location: '河北省廊坊市双滦区',
              merchantCount: 90,
              address: '廊坊市双滦区',
              description: '双滦区峻宇普洱茶城'
            }
          ]
        },
        {
          id: 'sanhe',
          name: '三河市',
          markets: [
            {
              id: 'yanjiao_wholesale_point',
              name: '燕郊批发点',
              location: '河北省廊坊市三河市',
              merchantCount: 75,
              address: '廊坊市三河市燕郊',
              description: '三河市燕郊批发点'
            }
          ]
        },
        {
          id: 'mancheng_langfang',
          name: '满城区',
          markets: [
            {
              id: 'ma_tea_city_langfang',
              name: '马茶城',
              location: '河北省廊坊市满城区',
              merchantCount: 80,
              address: '廊坊市满城区',
              description: '满城区马茶城'
            }
          ]
        },
        {
          id: 'guan',
          name: '固安县',
          markets: [
            {
              id: 'guan_tea_market',
              name: '固安茶叶市场',
              location: '河北省廊坊市固安县',
              merchantCount: 65,
              address: '廊坊市固安县',
              description: '固安县茶叶市场'
            }
          ]
        }
      ]
    },
    {
      id: 'cangzhou',
      name: '沧州市',
      districts: [
        {
          id: 'yunhe',
          name: '运河区',
          markets: [
            {
              id: 'dong_tea_market',
              name: '东茶市',
              location: '河北省沧州市运河区',
              merchantCount: 100,
              address: '沧州市运河区',
              description: '运河区东茶市'
            },
            {
              id: 'xiaowang_tea_field',
              name: '小王茶叶场',
              location: '河北省沧州市运河区',
              merchantCount: 85,
              address: '沧州市运河区',
              description: '运河区小王茶叶场'
            },
            {
              id: 'sihe_tea_city',
              name: '四合茶城',
              location: '河北省沧州市运河区',
              merchantCount: 110,
              address: '沧州市运河区',
              description: '运河区四合茶城'
            }
          ]
        },
        {
          id: 'xinhua',
          name: '新华区',
          markets: [
            {
              id: 'mingzhu_trade_mall_tea_area',
              name: '明珠商贸城茶叶批发区',
              location: '河北省沧州市新华区',
              merchantCount: 95,
              address: '沧州市新华区明珠商贸城',
              description: '新华区明珠商贸城茶叶批发区'
            }
          ]
        },
        {
          id: 'huanghua',
          name: '黄骅市',
          markets: [
            {
              id: 'huanghua_tea_market',
              name: '黄骅茶叶市场（八马茶业专营店）',
              location: '河北省沧州市黄骅市',
              merchantCount: 80,
              address: '沧州市黄骅市',
              description: '黄骅市茶叶市场八马茶业专营店'
            }
          ]
        },
        {
          id: 'suning',
          name: '肃宁县',
          markets: [
            {
              id: 'xinshi_mall_puer_tea',
              name: '新世商城（普洱茶专营）',
              location: '河北省沧州市肃宁县',
              merchantCount: 70,
              address: '沧州市肃宁县新世商城',
              description: '肃宁县新世商城普洱茶专营'
            }
          ]
        }
      ]
    },
    {
      id: 'hengshui',
      name: '衡水市',
      districts: [
        {
          id: 'taocheng',
          name: '桃城区',
          markets: [
            {
              id: 'jingnan_tea_field',
              name: '京南茶叶场',
              location: '河北省衡水市桃城区',
              merchantCount: 120,
              address: '衡水市桃城区',
              description: '桃城区京南茶叶场'
            },
            {
              id: 'qiyilu_tea_market',
              name: '七一路茶叶市场',
              location: '河北省衡水市桃城区',
              merchantCount: 95,
              address: '衡水市桃城区七一路',
              description: '桃城区七一路茶叶市场'
            },
            {
              id: 'jiuzhou_tea_wholesale',
              name: '玖洲茶叶批发馆',
              location: '河北省衡水市桃城区',
              merchantCount: 85,
              address: '衡水市桃城区',
              description: '桃城区玖洲茶叶批发馆'
            },
            {
              id: 'deli_famous_tea',
              name: '德利名茶',
              location: '河北省衡水市桃城区',
              merchantCount: 70,
              address: '衡水市桃城区',
              description: '桃城区德利名茶'
            },
            {
              id: 'yulin_ancient_tea_house',
              name: '雨林古茶坊',
              location: '河北省衡水市桃城区',
              merchantCount: 60,
              address: '衡水市桃城区',
              description: '桃城区雨林古茶坊'
            },
            {
              id: 'shiyu_tea_ware_shop',
              name: '石雨茶具经营部',
              location: '河北省衡水市桃城区',
              merchantCount: 50,
              address: '衡水市桃城区',
              description: '桃城区石雨茶具经营部'
            }
          ]
        },
        {
          id: 'yongnian',
          name: '永年区',
          markets: [
            {
              id: 'yongnian_tea_field',
              name: '永年茶叶场',
              location: '河北省衡水市永年区',
              merchantCount: 80,
              address: '衡水市永年区',
              description: '永年区茶叶场'
            }
          ]
        }
      ]
    }
  ]
};

module.exports = hebeiData; 