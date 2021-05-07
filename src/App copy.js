import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Mock from "mockjs"
import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

function App() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const getScale = () => {
    // const height = window.getComputedStyle(document.body).height.slice(0, -2)
    // const width = window.getComputedStyle(document.body).width.slice(0, -2)
    const height = window.innerWidth
    const width = window.innerHeight

    let scale = 1
    let width1 = width
    let height1 = height
    if (width / 16 <height / 9) {
      height1 = height
      width1 = height / 9 * 16
    } else if (width / 16 > height / 9) {
      width1 = width
      height1 = width / 16 * 9
    }
    let ww = window.innerWidth / width1
    let wh = window.innerHeight / height1

    return ww < wh ? ww : wh
  }
  const [resize, setResize] = useState(getScale());

  const setScale = () => {
    // const height = window.getComputedStyle(document.body).height.slice(0, -2)
    // const width = window.getComputedStyle(document.body).width.slice(0, -2)
    // const height = document.getElementById('scaleBox').innerWidth
    // const width =  document.getElementById('scaleBox').innerHeight
    const height = window.innerWidth
    const width = window.innerHeight
    let scale = 1
    let width1 = width
    let height1 = height
console.log(width)
console.log(height)
    scale=getScale()
    if (width / 16 <height / 9) {
      height1 = height
      width1 = height / 9 * 16
    } else if (width / 16 > height / 9) {
      width1 = width
      height1 = width / 16 * 9
    }
    let ww = width / width1
    let wh = height / height1
    if (ww < wh) {
      setWidth(width > width1 ? width : width1)
      setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
    } else {
      setWidth(width > width1 ? width : width1)
      setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
    }
    setResize(scale)
  }
  useEffect(() => {
    setScale()
    window.addEventListener('resize', setScale)
    return () => {
      window.removeEventListener('resize', setScale)
    }
  })
  useEffect(() => {
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }]
    })
  }, [])
  return (
    <>
      <div className="scale-box" id="scaleBox" style={{
        transform: `scale(${resize}) translate(-50%, -50%)`,
        // WebkitTransform: `scale(${resize}) translate(-50%, -50%)`,
        height, width,
      }}>
        <div className="scale-div"></div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
