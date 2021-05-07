import React, { useState } from 'react'
import Mock from "mockjs"
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { useEffect } from 'react';
import commonData from '../mock/data.js'

export const ProdProgress = () => {
    const title = ['大米', '玉米', '蔬菜', '鸡蛋', '坚果', '面粉', '黄豆']
    const [pData, setPData] = useState(null);
    useEffect(() => {
        let data = Mock.mock({
            "title|8": [
                { "value": "@ctitle", }
            ],
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|8': [
                {
                    "name|1": commonData.prodNameList,
                    "madeNumber|+1": 20201101001,
                    "value|40-100": 10,
                }],
        })
        data.list = data.list.sort((a, b) => {
            return Number(b.value) - Number(a.value)
        })
        data.title = data.list.map(item => { return item.name })
        setPData(data)
    }, [])
    useEffect(() => {
        const chartDom = document.getElementById('prodProgressChart');
        var myChart = echarts.init(chartDom);
        var data = [];
        for (let i = 0; i < 5; ++i) {
            data.push(Math.round(Math.random() * 200));
        }
        const option = {
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + params[0].value + ' %<br/>'
                }
            },
            backgroundColor: null,
            xAxis: {
                show: false,
                type: 'value',
                barMaxWidth: 8,
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                barMaxWidth: 8,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (params) {
                        // if (value >= 10000) {
                        //     return (value / 10000).toLocaleString() + '万';
                        // } else {
                        return params;
                        // }
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: pData?.title
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12'
                    },
                    formatter: function (value) {
                        // if (value >= 10000) {
                        //     return (value / 10000).toLocaleString() + '万';
                        // } else {
                        return value.toLocaleString() + '%';
                        // }
                    },
                },
                data: pData?.list
            }],
            series: [{
                name: '完成率',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: function () {
                            let color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgb(57,89,255)'
                            }, {
                                offset: 1,
                                color: 'rgb(46,200,207)'
                            }])
                            return color
                        }(),
                    },
                },
                barWidth: 8,
                barMaxWidth: 14,
                data: pData?.list
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 20,
                barGap: '-100%',
                data: pData?.list,
                itemStyle: {
                    normal: {
                        color: 'rgba(24,31,68,1)',
                        barBorderRadius: 30,
                    }
                },
            },
            ]
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
        <div className="prodProgress">
            <div className="plate-title color-title">生产进度</div>
            <div id="prodProgressChart" style={{ width: "100%", height: "82%" }}></div>
        </div>
    )
}
