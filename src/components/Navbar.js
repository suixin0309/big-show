import React from 'react'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'
import logo from '../images/logo.jpg'

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [nowTime, setNowTime] = React.useState(false);
    const setTime = () => {
        setTimeout(function () {
            let t = new Date();
            let [year, mon, date, hour, min, sec, milliSec] = [
                t.getFullYear(),
                t.getMonth() + 1>=10?t.getMonth():'0'+(t.getMonth() + 1),
                t.getDate()>=10?t.getDate() + 1:'0'+(t.getDate() + 1),
                t.getHours()>=10?t.getHours() :'0'+(t.getHours() + 1),
                t.getMinutes()>=10?t.getMinutes():'0'+(t.getMinutes() + 1),
                t.getSeconds()>=10?t.getSeconds():'0'+(t.getSeconds() + 1),
                t.getMilliseconds()
            ];
            setNowTime(`${year}年${mon}月${date}日 ${hour}:${min}:${sec}`)
            setTime();
        }, 1000)
    }
    setTime()
    return (
        <nav className="navbar">
            <Row>
                <Col span={8}>
                    <div style={{backgroundColor:'#030c36',display:'inline-block',padding:'2px 2px',marginTop:'-1.5rem'}}>
                        <img src={logo} />
                    </div>
                </Col>
                <Col span={8} className="text-center">
                    <h3 className="color-title">XX集团生产监控中心</h3>
                </Col>
                <Col span={8} className="text-right mgt-4 nav-time">{nowTime}</Col>
            </Row>
            <div className="nav-center">
                <div className="nav-header" style={{ margin: "0 auto" }}>
                </div>
            </div>
        </nav>
    )
}
