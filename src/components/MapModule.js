import React, { useState } from 'react'
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { useEffect } from 'react';
import { map } from "../common/world"
import { useInterval } from 'ahooks'
export const Map = () => {
    const [orderType, setOrderType] = useState('订单')
    const [delay, setDelay] = useState(10000)
    useInterval(() => {
        orderType == "订单" ? setOrderType('物料') : setOrderType('订单')
    }, delay)
    useEffect(() => {
        return () => {
            setDelay(null)
        }
    }, [])
    useEffect(() => {
        const chartDom = document.getElementById('mapChart');
        const chartDom1 = document.getElementById('scriptChart');
        var myChart = echarts.init(chartDom);
        var myChart1 = echarts.init(chartDom1);
        echarts.registerMap('world', map);
        var geoCoordMap = {
            青岛: [120.33, 36.07],
            济南: [116.98, 36.67],
            开封市: [114.351642, 34.801854],
            保定市: [115.49481, 38.886565],
            宁波: [121.56, 29.86],
            江苏无锡: [120.3, 31.57],
            北京: [116.404184, 39.914578],

            俄罗斯罗斯托夫: [39.7, 47.22],
            俄罗斯圣彼得堡: [59.53,30.13],
            俄罗斯下诺夫哥罗德: [56.2, 44],
            俄罗斯叶卡捷琳堡: [56.2, 60.35],
            俄罗斯莫斯科: [37.35, 55.45],
            尼日利亚: [-4.388361, 11.186148],
            美国洛杉矶: [-118.24311, 34.052713],
            香港邦泰: [114.195466, 22.282751],
            美国芝加哥: [-87.801833, 41.870975],
            加纳库马西: [-4.62829, 7.72415],
            英国曼彻斯特: [-1.657222, 51.886863],
            德国汉堡: [10.01959, 54.38474],
            哈萨克斯坦阿拉木图: [45.326912, 41.101891],
            俄罗斯伊尔库茨克: [89.116876, 67.757906],
            巴西: [-48.678945, -10.493623],
            埃及达米埃塔: [31.815593, 31.418032],
            西班牙巴塞罗纳: [2.175129, 41.385064],
            柬埔寨金边: [104.88659, 11.545469],
            意大利米兰: [9.189948, 45.46623],
            乌拉圭蒙得维的亚: [-56.162231, -34.901113],
            莫桑比克马普托: [32.608571, -25.893473],
            阿尔及利亚阿尔及尔: [3.054275, 36.753027],
            阿联酋迪拜: [55.269441, 25.204514],
            匈牙利布达佩斯: [17.108519, 48.179162],
            澳大利亚悉尼: [150.993137, -33.675509],
            美国加州: [-121.910642, 41.38028],
            澳大利亚墨尔本: [144.999416, -37.781726],
            墨西哥: [-99.094092, 19.365711],
            加拿大温哥华: [-123.023921, 49.311753],
            比利时: [4.21, 50.51],
            "阿富汗": [69.11, 34.28],
            "阿尔巴尼亚": [19.49, 41.18],
            "阿尔及利亚": [3.08, 36.42],
            "美属萨摩亚": [-170.43, -14.16],
            "安道尔": [1.32, 42.31],
            "安哥拉": [13.15, -8.50],
            "安提瓜和巴布达": [-61.48, 17.20],
            "阿根廷": [-60.00, -36.30],
            "亚美尼亚": [44.31, 40.10],
            "阿鲁巴": [-70.02, 12.32],
            "澳大利亚": [149.08, -35.15],
            "奥地利": [16.22, 48.12],
            "阿塞拜疆": [49.56, 40.29],
            "巴哈马": [-77.20, 25.05],
            "巴林": [50.30, 26.10],
            "孟加拉国": [90.26, 23.43],
            "巴巴多斯": [-59.30, 13.05],
            "白俄罗斯": [27.30, 53.52],
            "伯利兹": [-88.30, 17.18],
            "贝宁": [2.42, 6.23],
            "不丹": [89.45, 27.31],
            "玻利维亚": [-68.10, -16.20],
            "波斯尼亚和黑塞哥维那": [18.26, 43.52],
            "博茨瓦纳": [25.57, -24.45],
            "巴西": [-47.55, -15.47],
            "英属维尔京群岛": [-64.37, 18.27],
            "文莱": [115.00, 4.52],
            "保加利亚": [23.20, 42.45],
            "布基纳法索": [-1.30, 12.15],
            "布隆迪": [29.18, -3.16],
            "柬埔寨": [104.55, 11.33],
            "喀麦隆": [11.35, 3.50],
            "加拿大": [-75.42, 45.27],
            "佛得角": [-23.34, 15.02],
            "开曼群岛": [-81.24, 19.20],
            "中非共和国": [18.35, 4.23],
            "乍得": [14.59, 12.10],
            "智利": [-70.40, -33.24],
            "中国": [116.20, 39.55],
            "哥伦比亚": [-74.00, 4.34],
            "科摩罗": [43.16, -11.40],
            "刚果": [15.12, -4.09],
            "哥斯达黎加": [-84.02, 9.55],
            "科特迪瓦": [-5.17, 6.49],
            "克罗地亚": [15.58, 45.50],
            "古巴": [-82.22, 23.08],
            "塞浦路斯": [33.25, 35.10],
            "捷克共和国": [14.22, 50.05],
            "朝鲜": [125.30, 39.09],
            "刚果(扎伊尔)": [15.15, -4.20],
            "丹麦": [12.34, 55.41],
            "吉布提": [42.20, 11.08],
            "多米尼加": [-61.24, 15.20],
            "多米尼加共和国": [-69.59, 18.30],
            "东帝汶": [125.34, -8.29],
            "厄瓜多尔": [-78.35, -0.15],
            "埃及": [31.14, 30.01],
            "萨尔瓦多": [-89.10, 13.40],
            "赤道几内亚": [8.50, 3.45],
            "厄立特里亚": [38.55, 15.19],
            "爱沙尼亚": [24.48, 59.22],
            "埃塞俄比亚": [38.42, 9.02],
            "福克兰群岛(马尔维纳斯群岛)": [-59.51, -51.40],
            "法罗群岛": [-6.56, 62.05],
            "斐济": [178.30, -18.06],
            "芬兰": [25.03, 60.15],
            法国: [2.20, 48.50],
            "法属圭亚那": [-52.18, 5.05],
            "法属波利尼西亚": [-149.34, -17.32],
            "加蓬": [9.26, 0.25],
            "冈比亚": [-16.40, 13.28],
            "格鲁吉亚": [44.50, 41.43],
            "德国": [13.25, 52.30],
            "加纳": [-0.06, 5.35],
            "希腊": [23.46, 37.58],
            "格陵兰": [-51.35, 64.10],
            "瓜德罗普岛": [-61.44, 16.00],
            "危地马拉": [-90.22, 14.40],
            "根西岛": [-2.33, 49.26],
            "几内亚": [-13.49, 9.29],
            "几内亚比绍": [-15.45, 11.45],
            "圭亚那": [-58.12, 6.50],
            "海地": [-72.20, 18.40],
            "赫德岛和麦当劳群岛": [74.00, -53.00],
            "洪都拉斯": [-87.14, 14.05],
            "匈牙利": [19.05, 47.29],
            "冰岛": [-21.57, 64.10],
            "印度": [77.13, 28.37],
            "印度尼西亚": [106.49, -6.09],
            "伊朗": [51.30, 35.44],
            "伊拉克": [44.30, 33.20],
            "爱尔兰": [-6.15, 53.21],
            "以色列": [35.12, 31.47],
            "意大利": [12.29, 41.54],
            "牙买加": [-76.50, 18.00],
            "约旦": [35.52, 31.57],
            "哈萨克斯坦": [71.30, 51.10],
            "肯尼亚": [36.48, -1.17],
            "基里巴斯": [173.00, 1.30],
            "科威特": [48.00, 29.30],
            "吉尔吉斯斯坦": [74.46, 42.54],
            "老挝": [102.36, 17.58],
            "拉脱维亚": [24.08, 56.53],
            "黎巴嫩": [35.31, 33.53],
            "莱索托": [27.30, -29.18],
            "利比里亚": [-10.47, 6.18],
            "阿拉伯利比亚民众国": [13.07, 32.49],
            "列支敦士登": [9.31, 47.08],
            "立陶宛": [25.19, 54.38],
            "卢森堡": [6.09, 49.37],
            "马达加斯加": [47.31, -18.55],
            "马拉维": [33.48, -14.00],
            "马来西亚": [101.41, 3.09],
            "马尔代夫": [73.28, 4.00],
            "马里": [-7.55, 12.34],
            "马耳他": [14.31, 35.54],
            "马提尼克岛": [-61.02, 14.36],
            "毛里塔尼亚": [57.30, -20.10],
            "马约特岛": [45.14, -12.48],
            "墨西哥": [-99.10, 19.20],
            "密克罗尼西亚(联邦) ": [158.09, 6.55],
            "摩尔多瓦共和国": [28.50, 47.02],
            "莫桑比克": [32.32, -25.58],
            "缅甸": [96.20, 16.45],
            "纳米比亚": [17.04, -22.35],
            "尼泊尔": [85.20, 27.45],
            "荷兰": [4.54, 52.23],
            "荷属安的列斯": [-69.00, 12.05],
            "新喀里多尼亚": [166.30, -22.17],
            "新西兰": [174.46, -41.19],
            "尼加拉瓜": [-86.20, 12.06],
            "尼日尔": [2.06, 13.27],
            "尼日利亚": [7.32, 9.05],
            "诺福克岛": [168.43, -45.20],
            "北马里亚纳群岛": [145.45, 15.12],
            "挪威": [10.45, 59.55],
            "阿曼": [58.36, 23.37],
            "巴基斯坦": [73.10, 33.40],
            "帕劳": [134.28, 7.20],
            "巴拿马": [-79.25, 9.00],
            "巴布亚新几内亚": [147.08, -9.24],
            "巴拉圭": [-57.30, -25.10],
            "秘鲁": [-77.00, -12.00],
            "菲律宾": [121.03, 14.40],
            "波兰": [21.00, 52.13],
            "葡萄牙": [-9.10, 38.42],
            "波多黎各": [-66.07, 18.28],
            "卡塔尔": [51.35, 25.15],
            "韩国": [126.58, 37.31],
            "罗马尼亚": [26.10, 44.27],
            "俄罗斯": [37.35, 55.45],
            "卢旺达": [30.04, -1.59],
            "圣基茨和尼维斯": [-62.43, 17.17],
            "圣卢西亚": [-60.58, 14.02],
            "圣皮埃尔和密克隆": [-56.12, 46.46],
            "圣文森特和格林纳丁斯": [-61.10, 13.10],
            "萨摩亚": [-171.50, -13.50],
            "圣马力诺": [12.30, 43.55],
            "圣多美和普林西比": [6.39, 0.10],
            "沙特阿拉伯": [46.42, 24.41],
            "塞内加尔": [-17.29, 14.34],
            "塞拉利昂": [-13.17, 8.30],
            "斯洛伐克": [17.07, 48.10],
            "斯洛文尼亚": [14.33, 46.04],
            "所罗门群岛": [159.57, -9.27],
            "索马里": [45.25, 2.02],
            "比勒陀利亚": [28.12, -25.44],
            西班牙: [-3.45, 40.25],
            "苏丹": [32.35, 15.31],
            "苏里南": [-55.10, 5.50],
            "斯威士兰": [31.06, -26.18],
            "瑞典": [18.03, 59.20],
            "瑞士": [7.28, 46.57],
            "阿拉伯叙利亚共和国": [36.18, 33.30],
            "塔吉克斯坦": [68.48, 38.33],
            "泰国": [100.35, 13.45],
            "马其顿": [21.26, 42.01],
            "多哥": [1.20, 6.09],
            "汤加": [-174.00, -21.10],
            "突尼斯": [10.11, 36.50],
            "土耳其": [32.54, 39.57],
            "土库曼斯坦": [57.50, 38.00],
            "图瓦卢": [179.13, -8.31],
            "乌干达": [32.30, 0.20],
            "乌克兰": [30.28, 50.30],
            "阿联酋": [54.22, 24.28],
            "英国": [-0.05, 51.36],
            "坦桑尼亚": [35.45, -6.08],
            "美国": [-77.02, 39.91],
            "美属维尔京群岛": [-64.56, 18.21],
            "乌拉圭": [-56.11, -34.50],
            "乌兹别克斯坦": [69.10, 41.20],
            "瓦努阿图": [168.18, -17.45],
            "委内瑞拉": [-66.55, 10.30],
            "越南": [105.55, 21.05],
            "南斯拉夫": [20.37, 44.50],
            "赞比亚": [28.16, -15.28],
            "津巴布韦": [31.02, -17.43]
        };
        var BJData = [
            
            [{
                name: "俄罗斯圣彼得堡",
                value: 2000
            }, {
                name: "青岛"
            }],
            [{
                name: "俄罗斯罗斯托夫",
                value: 3000
            }, {
                name: "青岛"
            }],

            [{
                name: "俄罗斯下诺夫哥罗德",
                value: 4000
            }, {
                name: "青岛"
            }],
            [{
                name: "俄罗斯叶卡捷琳堡",
                value: 900
            }, {
                name: "青岛"
            }],

            [{
                name: "俄罗斯",
                value: 11000
            }, {
                name: "青岛"
            }],
            [{
                name: "尼日利亚",
                value: 9100
            }, {
                name: "青岛"
            }],
            [{
                name: "美国洛杉矶",
                value: 2370
            }, {
                name: "青岛"
            }],
            [{
                name: "香港邦泰",
                value: 3130
            }, {
                name: "青岛"
            }],
            [{
                name: "美国芝加哥",
                value: 2350
            }, {
                name: "青岛"
            }],
            [{
                name: "加纳库马西",
                value: 5120
            }, {
                name: "青岛"
            }],
            [{
                name: "英国曼彻斯特",
                value: 3110
            }, {
                name: "青岛"
            }],
            [{
                name: "德国汉堡",
                value: 6280
            }, {
                name: "青岛"
            }],
            [{
                name: "哈萨克斯坦阿拉木图",
                value: 5255
            }, {
                name: "青岛"
            }],
            [{
                name: "墨西哥",
                value: 3590
            }, {
                name: "青岛"
            }],
            [{
                name: "加拿大温哥华",
                value: 1590
            }, {
                name: "青岛"
            }],
            [{
                name: "青岛",
                value: 222
            }, {
                name: "加拿大温哥华"
            }],
            [{
                name: "青岛",
                value: 33
            }, {
                name: "济南"
            }],
            [{
                name: "青岛",
                value: 9000
            }, {
                name: "开封市"
            }],
            [{
                name: "青岛",
                value: 12122

            }, {
                name: "保定市",
            }],
            [{
                name: "青岛",
                value: 3434
            }, {
                name: "宁波"
            }],
            [{
                name: "青岛",
                value: 5434
            }, {
                name: "江苏无锡"
            }],
            
            [{
                name: "青岛",
                value: 11000
            }, {
                name: "俄罗斯"
            }],
            [{
                name: "青岛",
                value: 5000
            }, {
                name: "俄罗斯莫斯科"
            }],
            [{
                name: "青岛",
                value: 3000
            }, {
                name: "俄罗斯罗斯托夫"
            }],

        ];

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                let fromCoord = "";
                let toCoord = "";
                if (dataItem[0].name != '青岛') {//青岛from
                    fromCoord = geoCoordMap[dataItem[0].name];
                    toCoord = geoCoordMap[dataItem[1].name];
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[0].value
                    });
                } else {//青岛to
                    fromCoord = geoCoordMap[dataItem[0].name];
                    toCoord = geoCoordMap[dataItem[1].name];
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[0].value
                    });
                }
            }
            return res;
        };
        const orderData = convertData(BJData).filter(item => item.fromName != '青岛').sort((a, b) => a.value - b.value).slice(0, 8)
        const mudData = convertData(BJData).filter(item => item.fromName == '青岛').sort((a, b) => a.value - b.value).slice(0, 8)
        const echarts2Data = orderType == '订单' ? orderData : mudData
        const nameList = echarts2Data.map(item => orderType == '订单' ? item.fromName : item.toName)
        const dataList = echarts2Data.map(item => item.value)
        function mapOptions() {
            let colorList = ['#4ab2e5', '#4fb6d2', '#52b9c7', '#5abead', '#f34e2b', '#f56321', '#f56f1c', '#f58414'
                , '#f58f0e'
                , '#f5a305'
                , '#e7ab0b'
                , '#dfae10'
                , '#d5b314'
                , '#c1bb1f'
                , '#b9be23'
                , '#a6c62c'
                , '#96cc34']
            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            var series = [];
            [
                ["青岛", BJData]
            ].forEach(function (item, i) {
                series.push(
                    {
                        type: 'map',
                        roam: false,
                        label: {
                            show: !1,
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgb(147, 235, 248)',
                                borderWidth: 0.1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgb(210,246,253)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgb(154,210,244)'  // 100% 处的颜色
                                    }],
                                    globalCoord: true // 缺省为 false
                                },
                            },
                            emphasis: {
                                label: {
                                    // show: !1,
                                    color: '#fff',
                                },
                                areaColor: 'rgb(46,229,206)',
                                //    shadowColor: 'rgb(12,25,50)',
                                borderWidth: 0.1
                            }
                        },
                        zlevel: 1,
                        zoom: 1.05,
                        map: 'world' //使用
                        // data: this.difficultData //热力图数据   不同区域 不同的底色
                    },
                    {
                        type: "lines",
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 7, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: function (item, index) {
                                    let colorData = item.data.toName == "青岛" ?
                                        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#00F6FF'
                                        }, {
                                            offset: 1,
                                            color: '#00A8FF'
                                        }]) :
                                        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#FF9600'
                                        }, {
                                            offset: 1,
                                            color: '#EAFB00'
                                        }])
                                    return colorData
                                },
                                // 线条宽度
                                width: 1,
                                opacity: 1,
                                curveness: 0.3
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'middle',
                                formatter: '{a}'
                            }
                        },
                        data: convertData(item[1])
                    },
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        zlevel: 3,

                        rippleEffect: {
                            //涟漪特效
                            period: 15, //动画时间，值越小速度越快
                            brushType: "stroke", //波纹绘制方式 stroke, fill
                            scale: 4 //波纹圆环最大限制，值越大波纹越大
                        },
                        label: {
                            normal: {
                                show: false,
                                position: "right", //显示位置
                                offset: [5, 0], //偏移设置
                                formatter: "{b}", //圆环显示文字
                                textStyle: {
                                    color: "rgb(214,206,143)"
                                }
                            },
                        },
                        emphasis: {
                            show: true,
                            scale: !0,
                            label: {
                                show: true,
                                backgroundColor: '#000',
                                padding: 2,
                                borderRadius: 2,
                                color: "#fff",
                            }
                        },
                        symbol: "circle",
                        symbolSize: function (val) {
                            return 4 + val[2] / 1000; //圆环大小
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                color: function (item, index) {
                                    // let color = colorList[item.dataIndex] || "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6)
                                    // let color =  item.data.name != "青岛" ? "#00F6FF" : "#932AE1";
                                    let color = ""
                                    if (item.data.name != "青岛") {
                                        if (item.data.from) {
                                            color = "#00F6FF"
                                        } else {
                                            color = "#FF9600"
                                        }
                                    } else {
                                        if (item.data.from) {
                                            color = "#00F6FF"
                                        } else {
                                            color = "#932AE1"
                                        }
                                    }
                                    return color
                                }
                            }
                        },
                        data: item[1].map(function (dataItem) {
                            if (dataItem[0].name == '青岛') {
                                return {
                                    from: false,
                                    name: dataItem[1].name,
                                    value: geoCoordMap[dataItem[1].name].concat([dataItem[0].value])
                                };
                            } else {
                                return {
                                    from: true,
                                    name: dataItem[0].name,
                                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                                };
                            }
                        })
                    },
                    //被攻击点
                    {
                        type: "scatter",
                        coordinateSystem: "geo",
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: "stroke",
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                color: "#9966cc",
                                formatter: "{b}",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: "pin",
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: "#9966cc"
                            }
                        },
                        data: [{
                            name: item[0],
                            value: geoCoordMap[item[0]].concat([10])
                        }]
                    },
                );
            });
            let option = {
                backgroundColor: null,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: "yellow",
                        barBorderRadius: [0, 30, 30, 0]
                    }
                },
                geo: {
                    map: 'world',
                    aspectScale: 0.75, //长宽比
                    // zoom: 1,
                    tooltip: {
                        show: true,
                    },
                    scaleLimit: {
                        min: 1,
                        max: 5,
                    },
                    label: {
                        show: !1
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: '#09132c' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#274d68' // 100% 处的颜色
                                }],
                                globalCoord: true // 缺省为 false
                            },
                            shadowColor: 'rgb(58,115,192)',
                            shadowOffsetX: 10,
                            shadowOffsetY: 11
                        },
                        emphasis: {
                            areaColor: '#2AB8FF',
                            borderWidth: 0,
                            color: '#fff',
                            label: {
                                show: false
                            }
                        }
                    },
                },
                tooltip: {
                    trigger: "item",
                    formatter: function (params, ticket, callback) {
                        if (params.seriesType == "effectScatter") {
                            if (params.data.from) {
                                return params.data.name + '<br/>' +
                                    `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00F6FF'></span>` +
                                    '订单: ' + params.data.value[2] + '笔 <br/>'
                            } else {
                                return params.data.name + '<br/>' +
                                    `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FF9600'></span>` +
                                    '物料: ' + params.data.value[2] + '笔 <br/>'
                            }
                        } else if (params.seriesType == "bar") {
                            return params.name + '<br/>' +
                                `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${orderType == '订单' ? '#00F6FF' : '#FF9600'}'></span>` +
                                orderType + ': ' + params.value + '笔 <br/>'
                        } else if (params.seriesType == "lines") {
                            if (params.data.toName == "青岛") {
                                return "订单汇入"
                            } else {
                                return "物料采购";
                            }
                        } else {
                            return params.name;
                        }
                    },
                },
                zlevel: 999,
                series: [...series],
            }
            return option
        }
        let option = mapOptions()
        let option1 = {
            title:{
                show:true,
                text:orderType=="订单"?"订单汇入":"物料流向",
                textStyle:{
                    color:"#fff"
                }
            },
            borderRadius:"1rem",
            backgroundColor: 'rgba(0,0,0,0.3)',
            grid: {
                show: false,
                containLabel: true,
                left: 10,
                top: "10%",
                bottom: 10,
                width: '100%',
                height:'100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderWidth: 0,
            },
            yAxis: {
                data: nameList,
                barMaxWidth: 8,
                symbol: 'none',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
            },
            xAxis: {
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel:{
                    show:false
                }
            },
            barMaxWidth: 8,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: "yellow",
                    barBorderRadius: [0, 30, 30, 0]
                }
            },
            tooltip: {
                trigger: "item",
                formatter: function (params, ticket, callback) {
                    if (params.seriesType == "bar") {
                        return params.name + '<br/>' +
                            `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${orderType == '订单' ? '#00F6FF' : '#FF9600'}'></span>` +
                            orderType + ': ' + params.value + '笔 <br/>'
                    } else {
                        return params.name;
                    }
                },
            },
            zlevel: 999,
            series: {
                type: 'bar',
                roam: false,
                visualMap: false,
                zlevel: 2,
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 30, 30, 5],
                        color: function () {
                            let color = orderType == '订单' ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#2441AC'
                            }, {
                                offset: 1,
                                color: '#4AE0EF'
                            }]) : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#2194B5'
                            }, {
                                offset: 1,
                                color: '#FFB400'
                            }])
                            return color
                        },
                    },
                    // emphasis: {
                    //     color: "#3596c0"
                    // }
                },
                barMaxWidth: 10,
                data: dataList,
            },
        }
        option && myChart.setOption(option);
        option1 && myChart1.setOption(option1);
        window.addEventListener('resize', () => {
            myChart && myChart.resize();
        })
        // 销毁
        return () => window.removeEventListener("resize", () => {
            myChart && myChart.resize();
        });
    })
    return (
        <div className="" style={{ width: "100%", height: "100%" , position: "relative"}}>
            <div className="plate-title color-title">全球订单物料流向</div>
            <div id="mapChart" style={{ width: "100%", height: "90%" }}>
            </div>
            <div id="scriptChart" style={{ position: "absolute", bottom:"1rem", left: '10px', width: "24%", height: "50%" }}></div>

        </div>
    )
}
