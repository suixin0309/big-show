import React, { useState } from 'react'
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { useEffect } from 'react';

export const EquipmentModule = (props) => {
    useEffect(() => {
        const chartDom = document.getElementById('equipmentModule');
        var myChart = echarts.init(chartDom);
        const option = {
            legend: {
                right:"10%",
                top:0,
                textStyle:{
                    color:"#fff"
                }
            },
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            color:['#28B1FF','#FFAE00','#F53F8C','#52FFFF'],
            dataset: {
                source: [
                    ['product', '配料', "混料", "成型", "干燥", "车加工", "喷涂", "烧成", "探伤"],
                    ['运行中', 3, 2, 3, 3, 2, 3, 3, 3],
                    ['空闲', 1, 1, 1, 1, 1, 1, 1, 1],
                    ['故障中', 0, 0, 0, 0, 0, 0, 0, 0],
                    ['停用', 0, 1, 1, 0, 1, 1, 1, 1]
                ]
            },
            xAxis: {
                type: 'category', 
                axisLabel: {
                    margin: 10,
                    color: 'rgba(255,255,255,0.5)',
                    textStyle: {
                        fontSize: 12
                    },
                },
            },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%',bottom:'12%' },
            series: [
                { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '30%'],
                    emphasis: { focus: 'data' },
                    label: {
                        formatter: '{b}: {@配料} ({d}%)',
                        color:"#fff"
                    },
                    encode: {
                        itemName: 'product',
                        value: '配料',
                        tooltip: '配料'
                    }
                }
            ]
        };
        myChart.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });

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
        <div className="quipment-module">
            <div className="plate-title color-title">设备看板</div>
            <div id="equipmentModule" style={{ width: "100%", height: "82%" }}></div>
        </div>
    )
}
