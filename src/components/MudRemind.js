import React, { useState } from 'react'
import Mock from "mockjs"
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { useEffect } from 'react';
import commonData from '../mock/data.js'
export const MudRemind = () => {
    const [mudData, setMudData] = useState([]);
    useEffect(() => {
        let data = Mock.mock({
            "title|8": [
                { "value": "@ctitle", }
            ],
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|8': [
                {
                    "name|1": commonData.mudNameList,
                    "mudCode|1": commonData.mudCodeList,
                    "weight|1-10000.1-10": 10,
                    "unit|1": commonData.specList,
                    "overdueDay|-60-200": 10,
                }],
        })
        data.list = data.list.sort((a, b) => {
            return a.overdueDay - b.overdueDay
        })
        setMudData(data.list)
    }, [])
    useEffect(() => {
        const chartDom = document.getElementById('mudRemind');
        var myChart = echarts.init(chartDom);
        let color = [
            "#0090FF",
            "#36CE9E",
        ];
        let echartData = mudData
        let xAxisData = echartData.map(v => v.name);
        //  ["1", "2", "3", "4", "5", "6", "7", "8"]
        // let yAxisData1 = echartData.map(v => v.value1);
        // [100, 138, 350, 173, 180, 150, 180, 230]
        let yAxisData2 = echartData.map(v => v.overdueDay);
        // [233, 233, 200, 180, 199, 233, 210, 180]
        const hexToRgba = (hex, opacity) => {
            let rgbaColor = "";
            let reg = /^#[\da-f]{6}$/i;
            if (reg.test(hex)) {
                rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
                    "0x" + hex.slice(3, 5)
                )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
            }
            return rgbaColor;
        }

        const option = {
            backgroundColor: null,
            color: color,
            tooltip: {
                trigger: "axis",
                formatter: function (params) {
                    let html = '';
                    params.forEach(v => {
                        html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                ${v.name} </br>
                泥料距离到期时间：<span style="color:${color[v.componentIndex]};font-weight:700;font-size: 14px">${v.value}</span>
                天</br>
                `;
                    })
                    return html
                },
                extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
                axisPointer: {
                    label: {
                        show: true,
                        backgroundColor: '#fff',
                        color: '#556677',
                        borderColor: 'rgba(0,0,0,0)',
                        shadowColor: 'rgba(0,0,0,0)',
                        shadowOffsetY: 0
                    },
                    lineStyle: {
                        width: 0
                    }
                }
            },
            grid: {
                top: 50,
                bottom:20,
                containLabel: true
            },
            xAxis: [{
                type: "category",
                boundaryGap: false,
                axisLabel: {
                    formatter: '{value}月',
                    textStyle: {
                        color: "rgba(255,255,255,0.5)"
                    }
                },
                axisLine: {
                    lineStyle: {
                        // color: "#D9D9D9"
                    }
                },
                data: xAxisData
            }],
            yAxis: {
                type: "value",
                name: '单位：天',
                axisLabel: {
                    textStyle: {
                        // color: "#fff"
                    }
                },
                nameTextStyle: {
                    // color: "#fff",
                    fontSize: 12,
                    lineHeight: 40
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        // color: "#E9E9E9"
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: "2019",
                type: "line",
                smooth: true,
                showSymbol: false,
                symbolSize: 8,
                zlevel: 3,
                lineStyle: {
                    normal: {
                        color: color[1],
                        shadowBlur: 3,
                        shadowColor: hexToRgba(color[1], 0.5),
                        shadowOffsetY: 8
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                offset: 0,
                                color: hexToRgba(color[1], 0.3)
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[1], 0.1)
                            }
                            ],
                            false
                        ),
                        shadowColor: hexToRgba(color[1], 0.1),
                        shadowBlur: 10
                    }
                },
                data: yAxisData2,
                markLine: {
                    silent: true,
                    lineStyle: {
                        normal: {
                            color: '#703790'                   // 这儿设置安全基线颜色
                        },
                    },
                    data: [{
                        yAxis: 0
                    }],
                    label: {
                        normal: {
                            formatter: '安全基线' ,          // 这儿设置安全基线
                            position:"insideEndTop",
                            color:"#fff"
                        },
                    },
                },
            }]
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
        <div className="mudRemind">
            <div className="plate-title color-title">泥料超期提醒</div>
            <div id="mudRemind" style={{ width: "100%", height: "82%" ,paddingTop:"4%"}}></div>
        </div>
    )
}
