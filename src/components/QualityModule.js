import React, { useState } from 'react'
import Mock from "mockjs"
import * as echarts from 'echarts';
import { Row, Col, Select } from 'antd';

import { useEffect } from 'react';
const { Option } = Select;

export const QualityModule = () => {
    const madeNumList = [
        {
            number: '123423534'
        },
        {
            number: '23232'
        },
        {
            number: '444455555'
        },
    ]
    const content = [
        {
            name: '制造业',
            value: 10,
        },
        {
            name: '建筑业',
            value: 6,
        }
        ,
        {
            name: '农林牧渔',
            value: 18,
        },
        {
            name: '房地产',
            value: 1,
        },
        {
            name: '金融业',
            value: 12,
        },
        {
            name: '居民服务及其他',
            value: 10,
        }
    ]
    //[10, 50, 20, 9, 8, 12]
    const title = ['配料', "混料", "成型", "干燥", "车加工", "喷涂", "烧成", "探伤",]
    const madeNumber = ["20210101001", "20201101001", "20201101002", "20201101003", "20201101004",]
    const [qData, setQData] = useState(null);
    const [selectValue, setSelectValue] = useState("20210101001");
    useEffect(() => {
        var data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|8': [{
                "name|1": title,
                "value|1-40": 10,
            }],
        })
        setQData(data)
    }, selectValue)
    useEffect(() => {
        const chartDom = document.getElementById('qualityModule');
        var myChart = echarts.init(chartDom);
        const option = {
            backgroundColor: null,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '15%',
                right: '3%',
                left: '5%',
                bottom: '12%'
            },
            xAxis: [{
                type: 'category',
                data: title,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                },
                axisLabel: {
                    margin: 10,
                    color: '#e2e9ff',
                    textStyle: {
                        fontSize: 12
                    },
                },
            }],
            yAxis: [{
                name: '      产品废品率%',
                axisLabel: {
                    formatter: '{value}',
                    color: '#e2e9ff',
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,1)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                }
            }],
            series: [{
                type: 'bar',
                data: qData?.list,
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,244,255,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(0,244,255,0.4)' // 100% 处的颜色
                        }], false),
                        barBorderRadius: [30, 30, 5, 5],
                        shadowColor: 'rgba(0,160,221,1)',
                        shadowBlur: 4,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        borderRadius: 200,
                        position: ['0', '-15'],
                        distance: 1,
                        formatter: [
                            ' {a|{c}}     \n',
                        ].join(','),
                        rich: {
                            d: {
                                color: '#3CDDCF',
                            },
                            a: {
                                color: '#fff',
                                align: 'center',
                            },
                            b: {
                                width: 1,
                                height: 10,
                                borderWidth: 1,
                                borderColor: '#234e6c',
                                align: 'left'
                            },
                        }
                    }
                }
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
    const onSearch = () => {

    }
    const onChange=(e)=>{
        setSelectValue(e)
    }
    return (
        <div className="quality-chart">
            <div className="color-title " style={{ height: "16%" }}>
                <Row align="bottom" justify="space-between">
                    <Col span="10" className="plate-title ">质量看板</Col>
                    <Col span="14">
                        <Row align="middle" justify="space-between" className="font-12">
                            <Col span="8" className="font-12">制令单号：</Col>
                            <Col span="16">
                                <Select
                                    dropdownStyle={{ minWidth: "100px", backgroundColor: "rgba(255, 255, 255, 0.2)",fontSize:"0.8rem" }}
                                    showSearch
                                    dropdownMatchSelectWidth={false}
                                    placeholder="请选择制令单号"
                                    optionFilterProp="children"
                                    onSearch={onSearch}
                                    onChange={onChange}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {madeNumber.map((item, index) => (
                                        <Option key={index} value={item}>{item}</Option>
                                    ))}
                                </Select></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="quality-module" id="qualityModule" style={{ width: "100%", height: "84%" ,paddingTop:"4%"}}></div>
        </div>
    )
}
