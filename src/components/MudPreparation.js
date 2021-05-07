import React, { useState } from 'react'
import Mock from "mockjs"
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { useEffect } from 'react';
import commonData from '../mock/data.js'
export const MudPreparation = () => {
    const [mpData, setMpData] = useState(null);
    useEffect(() => {
        let data = Mock.mock({
            "title|8": [
                { "value|1": commonData.mudNameList, }
            ],
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|8': [
                {
                    "name|1": commonData.mudNameList,
                    "instockNum|0-10000000": 10,
                    "safetyNum|10-10000000": 10,
                    "demandNum|0-100": 10,
                }],
        })
        data.list = data.list.map(item => { 
            if(item.safetyNum-item.instockNum>0){
                item.demandNum=item.safetyNum-item.instockNum
            }else{
                item.demandNum=0
            }
            return item 
        })
        data.title = data.title.map(item => { 
            return item.value
        })
        setMpData(data)
    }, [])
    useEffect(() => {
        const chartDom = document.getElementById('mudPreparation');
        let myChart = echarts.init(chartDom);
        let xData = mpData?.title,
            yData1 = mpData?.list.map(item=>item.instockNum),
            yData2 = mpData?.list.map(item=>item.safetyNum),
            yData4 = mpData?.list.map(item=>item.demandNum),
            borderData = [],
            legend = ["库存数量", "安全数量", "需求数量"],
            colorArr = [{
                start: "rgba(155, 101, 229,",
                end: "rgba(18, 58, 86,0.5)"
            },
            {
                start: "rgba(71, 173, 245,",
                end: "rgba(18, 58, 86,0.5)"
            },
            {
                color: "#00EAFF"
            }
            ];
        var normalColor = "rgba(255,255,255,0.5)";
        //   var fontSize = 20;
        let seriesData = [];
        var borderHeight = 4;
        new Array(8).forEach(element => {
            borderData.push(borderHeight);
        });
        [yData1, yData2, yData4].forEach((item, index) => {
            var obj1 = {};
            var obj2 = {};
            if (index < 2) {
                obj1 = {
                    name: legend[index],
                    type: "bar",
                    stack: legend[index],
                    data: item,
                    barWidth: "15%",
                    itemStyle: {
                        normal: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: colorArr[index].start + "0.7)"
                                },
                                {
                                    offset: 0.5,
                                    color: colorArr[index].start + "0.3)"
                                },
                                {
                                    offset: 1,
                                    color: colorArr[index].end
                                }
                                ],
                                globalCoord: false
                            }
                        }
                    }
                };
                obj2 = {
                    name: "",
                    type: "bar",
                    stack: legend[index],
                    itemStyle: {
                        normal: {
                            color: colorArr[index].start + "1)"
                        }
                    },
                    data: borderData
                };
                seriesData.push(obj1);
                seriesData.push(obj2);
            } else {
                var obj3 = {
                    name: legend[index],
                    type: "line",
                    yAxisIndex: 1,
                    smooth: false,
                    symbol: "circle",
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colorArr[index].color,
                            borderColor: "#fff",
                            borderWidth: 1
                        }
                    },
                    data: item,
                    label: {
                        normal: {
                            show: false
                        }
                    }
                };
                seriesData.push(obj3);
            }
        });
        const option = {
            backgroundColor: null,
            grid: {
                left: "3%",
                top: "16%",
                right: "3%",
                bottom: "2%",
                containLabel: true
            },
            legend: {
                show: true,
                icon: "rect",
                itemWidth: 20,
                itemHeight: 3,
                right: "15%",
                top: "0%",
                right:"6%",
                textStyle: {
                    color: "#fff"
                },
                data: legend
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${ colorArr[0].start + "0.7)"}'></span>` +
                        params[0].seriesName + ' : ' + params[0].value + ' <br/>'+
                        `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${ colorArr[1].start + "0.7)"}'></span>` +
                        params[1].seriesName + ' : ' + params[1].value + ' <br/>'+
                        `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${ colorArr[2].color}'></span>` +
                        params[2].seriesName + ' : ' + params[2].value + ' <br/>'
                        
                }
            },
            // tooltip: {
            //     trigger: "axis",
            //     formatter: function (params) {
            //         var str = "";
            //         for (var i = 0; i < params.length; i++) {
            //             if (params[i].seriesName !== "") {
            //                 str +=
            //                     params[i].name +
            //                     ":" +
            //                     params[i].seriesName +
            //                     params[i].value +
            //                     "<br/>";
            //             }
            //         }
            //         return str;
            //     }
            // },
            xAxis: [{
                type: "category",
                data: xData,
                axisPointer: {
                    type: "shadow"
                },
                axisLabel: {
                    textStyle: {
                        color: normalColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: normalColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            yAxis: [{
                type: "value",
                name: "千克",
                nameTextStyle: {
                    color: normalColor,
                    fontSize: 12
                },
                // "min": 0,
                // "max": 50,
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        color: normalColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: normalColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: "dashed",
                        color: normalColor
                    }
                }
            },
            {
                type: "value",
                name: "千克",
                nameTextStyle: {
                    color: normalColor,
                    fontSize: 12
                },
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        color: normalColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: normalColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "rgba(255,255,255,0.2)"
                    }
                }
            }
            ],
            series: seriesData
        };
        option && myChart.setOption(option);
        window.addEventListener('resize', () => {
            myChart && myChart.resize();
        })
        // 销毁
        return () => window.removeEventListener("resize", () => {
            myChart && myChart.resize();
        });
    })
    return (
        <div className="mud-preparation">
            <div className="plate-title color-title">泥料备料</div>
            <div id="mudPreparation" style={{ width: "100%", height: "79%",paddingTop:"4%" }}></div>
        </div>
    )
}
