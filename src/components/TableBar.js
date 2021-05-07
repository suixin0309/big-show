import React, { useState, useRef } from 'react'
import { useInterval } from 'ahooks'
import { useEffect } from 'react';
import { Row, Col } from 'antd';
export const TableBar = (props) => {
    const content = props.data.list
    const title = props.data.title
    const marqueeRef = useRef(null);
    const [delay, setDelay] = useState(1000)
    const [index, setIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [titleLen, setTitleLen] = useState(props.data.title.length)
    const [orderData, setOrderData] = useState([...JSON.parse(JSON.stringify(content.concat(content)))])
    // 鼠标移上去取消事件
    const mouseenter = () => {
        setDelay(null)
    }
    const mouseleave = () => {
        setDelay(null)
        setDelay(1000)
    }
    useInterval(() => {
        if (!marqueeRef || !marqueeRef.current) return;
        // const { height } = marqueeRef.current.getBoundingClientRect();
        const top = window.getComputedStyle(marqueeRef.current).top.slice(0, -2)
        const height = window.getComputedStyle(marqueeRef.current).height.slice(0, -2)
        const translateYItem = Math.floor(height / (orderData.length + 1));
        const nextIndex = currentIndex + 1;
        const cIndex = index + 1
        if (index >= content.length) {
            setIndex(0);
            setCurrentIndex(0)
            marqueeRef.current.style.transform = `translateY(-0px)`;
            marqueeRef.current.style.transition = 'transform 0s';
        } else {
            // marqueeRef.current.style.top = `${top-1
            //     }px`;
            marqueeRef.current.style.transform = `translateY(-${translateYItem * nextIndex
                }px)`;
            marqueeRef.current.style.transition = 'transform 1s';
            setIndex(cIndex);
            setOrderData(orderData)
            setCurrentIndex(nextIndex)
        }

    }, delay);
    return (
        <div className="marquee-container">
            <Row className="marquee-content-itm color-title" style={{fontSize:'1rem'}}>
                {title.map((itm, i) => (
                    <Col key={i} span={itm.span} className={i == 0 ? 'text-left pdl-04' : 'text-center'}>{itm.name}</Col>
                ))}
            </Row>


            <div>

            </div>
            <div className="marquee-wrapper">
                <div className="color-text marquee-scroll" ref={marqueeRef}>

                    {
                        orderData.concat(orderData[0]).map((itm, i) => (
                            <Row onMouseLeave={mouseleave} onMouseEnter={mouseenter} key={`${itm}-${i}`} className="marquee-content-itm color-text">
                                <Col className="ellipsis1 pdl-04" span={title[0].span}>{itm.name}</Col>
                                <Col className="ellipsis1 text-center" span={title[1].span}>{itm.tradeNumber}</Col>
                                <Col className="ellipsis1 text-center" span={title[2].span}>{itm.madeNumber}</Col>
                                <Col className="ellipsis1 text-center" span={title[3].span}>{itm.time}</Col>
                                <Col className="ellipsis1 text-center" span={title[4].span}>{itm.accomplish}</Col>
                            </Row>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}
