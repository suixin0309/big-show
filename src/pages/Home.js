import React, { useState, useEffect } from 'react'
import { useInterval } from 'ahooks'
import Mock from "mockjs"
import { Hero } from '../components/Hero'
import { OrderProgress } from '../components/OrderProgress'
import { ProdProgress } from '../components/ProdProgress'
import { MudRemind } from '../components/MudRemind'
import { QualityModule } from '../components/QualityModule'
import { TableBar } from '../components/TableBar'
import { MudPreparation } from '../components/MudPreparation'
import { EquipmentModule } from '../components/EquipmentModule'
import { Map } from '../components/MapModule'
import commonData from '../mock/data.js'
import { Row, Col } from 'antd';
export const Home = () => {
    let numList = [1, -2, 3, 0, 0, -4, 7, -12, 0, 0, 5, 7, -1, 4, 14, 9, -6, -8, 11, 16]
    let moneyList = [120000, 112000, 210000, 1200000, 120600, 100500, 118000]
    const [orderData, setOrderData] = useState(null);
    const [delay, setDelay] = useState(500000);
    const [num1, setNum1] = useState(18859);
    const [num2, setNum2] = useState(19);
    const [num3, setNum3] = useState(89);
    const [num4, setNum4] = useState(28);
    const [num5, setNum5] = useState(20);
    const [num6, setNum6] = useState(1280000);
    useInterval(() => {
        //刷新，重新加载组件
        let num = Mock.mock({
            "num1|1": numList,
            "num2|1": numList,
            "num3|1": numList,
            "num4|1": numList,
            "num5|1": numList,
            "num6|1": moneyList,
        })
        setNum1(num1 + num.num1 < 0 ? 0 : num1 + num.num1);
        setNum2(num2 + num.num2 < 0 ? 0 : num2 + num.num2);
        setNum3(num3 + num.num3 < 0 ? 0 : num3 + num.num3);
        setNum4(num4 + num.num4 < 0 ? 0 : num4 + num.num4);
        setNum5(num5 + num.num5 < 0 ? 0 : num5 + num.num5);
        setNum6(num5 * num.num6);
    }, delay);
    useEffect(() => {
        let data = Mock.mock({
            'title': [
                {
                    name: '工序',
                    span: 4
                },
                {
                    name: '产品名称',
                    span: 6
                },
                {
                    name: '规格',
                    span: 5
                },
                {
                    name: '完成率',
                    span: 5
                },
                {
                    name: '废品率',
                    span: 4
                },],
            'list|10': [{
                "name|1": commonData.processList,
                'tradeNumber|1': commonData.prodNameList,
                'madeNumber|1': commonData.specList,
                "time": /^[0-1]%|[1][0-9]%$/,
                "accomplish": /^[0-1]%|[1][0-9]%$/,
            },],
        })
        setOrderData(data)
        return () => {
            setDelay(null)
        }
    }, [])
    // 判断各种浏览器，找到正确的方法
    const launchFullscreen = (element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    // 启动全屏!
    const FullScreen = () => {
        launchFullscreen(document.documentElement); // 整个网页

    }
    // 退出全屏模式!
    // 判断浏览器种类 
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    return (
        <>
            <Hero>
                <Row style={{ height: "100%" }}>
                    <Col span={6} className="height-100">
                        <Row style={{ padding: "0 0 1rem 1rem" }} className="order-infos color-num text-left" align="middle" justify="space-between">
                            <Col className="small-module" span="7" style={{ height: "100%" }} flex="1">
                                <div style={{ margin: "auto auto" }}>
                                    <div onClick={FullScreen}>订单总量</div>
                                    {/* <div>{font}</div> */}
                                    <div style={{ fontSize: "1.5rem" }} className="color-yellow">{num1}</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div>超期预警订单</div>
                                    <div style={{ fontSize: "20px" }} className="color-red">{num2}</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div onClick={exitFullscreen}>生产完成订单</div>
                                    <div style={{ fontSize: "20px" }} className="color-green">{num3}</div>
                                </div>
                            </Col>
                        </Row>
                        <OrderProgress
                        >
                        </OrderProgress>
                        <Row className="order-infos color-num text-left" align="middle" justify="space-between">
                            <Col className="small-module" span="7" style={{ height: "100%" }} flex="1">
                                <div style={{ margin: "auto auto" }}>
                                    <div>未排产订单345</div>
                                    <div className="color-red mgt-4">{num4}</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div>生产中订单</div>
                                    <div className="color-red mgt-4">{num5}</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div>生产中订单金额</div>
                                    <div className="mgt-4">¥<span className="color-green">{num6}</span></div>
                                </div>
                            </Col>
                        </Row>
                        <ProdProgress
                        >
                        </ProdProgress>
                    </Col>
                    <Col span={12} className="height-100">
                        <div className="map-flow">
                            <Map></Map>
                        </div>
                        <Row className="mua-module">
                            <Col span="12" style={{ height: "100%" }}>
                                <MudPreparation></MudPreparation>
                            </Col>
                            <Col span="12">
                                <MudRemind
                                >
                                </MudRemind>
                            </Col>
                        </Row>
                        {/* <ProdProgress
                        >
                        </ProdProgress> */}

                    </Col>
                    <Col span={6} className="height-100">
                        <div className="quality-infos">
                            {/* <div className="quality-chart"> */}

                            <QualityModule></QualityModule>
                            <div className="quality-list">
                                {orderData ? <TableBar data={orderData}></TableBar> : null}

                            </div>
                            {/* </div> */}

                        </div>
                        <Row className="equipment-infos color-num text-left" align="middle" justify="space-between">
                            <Col className="small-module" span="7" style={{ height: "100%" }} flex="1">
                                <div style={{ margin: "auto auto" }}>
                                    <div>运行设备</div>
                                    <div><span style={{ color: "#28B1FF" }}>22</span> 台</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div>停用设备</div>
                                    <div><span style={{ color: "#52FFFF" }} >6</span> 台</div>
                                </div>
                            </Col>
                            <Col className="small-module" span="7">
                                <div>
                                    <div>空闲设备</div>
                                    <div><span className="color-yellow">8</span> 台</div>
                                </div>
                            </Col>
                        </Row>

                        <EquipmentModule
                        >
                        </EquipmentModule>
                    </Col>
                </Row>

            </Hero>
        </>
    )
}
