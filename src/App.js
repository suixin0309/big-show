import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Mock from "mockjs"
import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import './common/rem'
function App() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const getScale = () => {
    // const height = window.getComputedStyle(document.body).height.slice(0, -2)
    // const width = window.getComputedStyle(document.body).width.slice(0, -2)
    const height = window.innerWidth
    const width = window.innerHeight
    let scale = 1
    let width1 = 1920
    let height1 = 1080
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
    const width = window.innerWidth
    const height = window.innerHeight
    let scale = 1
    let width1 = width
    let height1 = height
    // scale=getScale()
    if (width > 1920) {
      if (width / 16 > height / 9) {
        height1 = height
        width1 = height / 9 * 16
      } else if (width / 16 < height / 9) {
        width1 = width
        height1 = width / 16 * 9
      }
      setWidth(width1)
      setHeight(height1)
    }
    else {
      width1 = 1920
      height1 = 1080
      let ww = width / width1
      let wh = height / height1
      if (ww < wh) {
        setWidth(width > width1 ? width : width1)
        setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
      } else {
        setWidth(width > width1 ? width : width1)
        setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
      }
      scale = getScale()
    }

    setResize(scale)

    return false
    let ww = width / width1
    let wh = height / height1
    if (ww < wh) {
      setWidth(width > width1 ? width : width1)
      setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
    } else {
      setWidth(width > width1 ? width : width1)
      setHeight((2 - height / height1) * height1 < height ? (2 - height / height1) * height1 : height1)
    }
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
      // ?????? list ???????????????????????????????????? 1 ??? 10 ?????????
      'list|1-10': [{
        // ?????? id ????????????????????????????????? 1???????????? 1
        'id|+1': 1
      }]
    })
  }, [])
  const [screen, setScreen] = useState(false);
  const [screenShow, setScreenShow] = useState(false);
  // ?????????????????????????????????????????????
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
  // ??????????????????
  // ????????????????????? 
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  // ????????????
  const FullScreen = () => {
    setScreen(true)
    launchFullscreen(document.documentElement); // ????????????
  }
  // ????????????
  const ExitScreen = () => {
    setScreen(false)
    exitFullscreen(); // ????????????
  }
  const screenClick=()=>{
    if (screen) {
      ExitScreen();
    } else {
      FullScreen()
    }
  }
  return (
    <>
      <div style={{ width: "100%", height: "100%"}}>
        <div className={screenShow?'show screen-box':'hide screen-box'} onMouseEnter={()=>{setScreenShow(true)}} onMouseLeave={()=>{setScreenShow(false)}} onClick={screenClick}>{screen?'????????????':'????????????'}</div>
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
      </div>
    </>
  );
}

export default App;
