import React, { useState } from 'react'
import Mock from "mockjs"
import { TableBar } from '../components/TableBar'

import { useEffect } from 'react';
import commonData from '../mock/data.js'
export const OrderProgress = () => {
    const content = {
        title: [
            {
                name: '工厂',
                span: 4
            },
            {
                name: '订单编号',
                span: 6
            },
            {
                name: '制令单号',
                span: 5
            },
            {
                name: '交货日期',
                span: 5
            },
            {
                name: '完成率',
                span: 4
            },],
        list: [
            {
                name: '交货日期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '人生发生的',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '交货冯绍峰的日期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '舒服舒服的',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '交期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '交日期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '日期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: 90,
            },
            {
                name: '交货期',
                tradeNumber: 5,
                madeNumber: 5,
                time: 5,
                accomplish: "90%",
            },
        ]
    };
    const [orderData, setOrderData] = useState(null);
    useEffect(() => {
        const nameList =  ['长春路1号', "即墨产业园", "高新产业园","南万"]
        var data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'title': [
                {
                    name: '工厂',
                    span: 4
                },
                {
                    name: '订单编号',
                    span: 6
                },
                {
                    name: '制令单号',
                    span: 5
                },
                {
                    name: '交货日期',
                    span: 5
                },
                {
                    name: '完成率',
                    span: 4
                },],
            'list|20': function(item,i){
                return [{
                    "name|1": nameList,
                    'tradeNumber|1': commonData.tradeNumList,
                    'madeNumber|+1': commonData.mudCodeList,
                    "time|1": commonData.afterTimeList,
                    "accomplish":  /^[0-1]%|[1][0-9]%$/,
                },]
            }(),
        })
        setOrderData(data)
    }, [])
    return (
        <div className="orderProgress">
            <div className="plate-title color-title">订单进度</div>
            <div id="orderProgressChart" style={{height:"86%",overflow:"hidden"}}>
                {orderData?<TableBar data={orderData}></TableBar>:null}
            </div>
        </div>
    )
}
