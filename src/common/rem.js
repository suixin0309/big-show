/**
 * Created by suixin on 2018/7/3.
 */
(function () {
  'use strict';
  //获取设备宽度 并计算其与UI界面的比例并将其设置到html的style中作为rem值
  var screenWidth;
  var html = document.getElementsByTagName("html")[0];
  if (window.innerWidth) {//标准浏览器的写法
    screenWidth = window.innerWidth;
  }
  else if ((document.body) && (document.body.clientWidth)) {//非标准浏览器ie10以下
    screenWidth = document.body.clientWidth;
  }
  // screenWidth = window.innerWidth;
  if (screenWidth > 1920) {
    html.style.fontSize = (screenWidth /1920)* 14 + "px"; //假设html检测到的宽度是375px，那么得到的根元素font-size:50px;假设设计图上元素为18px的字体大小，那么计算得到是18/50 = .36rem
  } else {
    html.style.fontSize="14px"
  }
})();
