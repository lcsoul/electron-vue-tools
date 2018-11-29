// 通用封装的工具方法
// 创建uuid
export const uuid = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};

//秒 转 天时分秒
export const secondToDate = (time) => {
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "秒";
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else if (time >= 60 * 60 * 24) {
      time = parseInt(time / 3600.0 / 24) + "天" + parseInt((parseFloat(time / 3600.0 / 24) -
        parseInt(time / 3600.0 / 24)) * 24) + "小时" + parseInt((parseFloat(time / 3600.0) -
          parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    }
    else {
      time = parseInt(time) + "秒";
    }
  }
  return time;
};
//秒 转 天时分秒
export const secondToDate_ = (s) => {
  var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
  var hour = Math.floor((s - day * 24 * 3600) / 3600);
  var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return day + "天" + hour + "时" + minute + "分" + second + "秒";
};

// 秒 转 时分秒
export const formatSeconds = (time) => {
  var theTime = parseInt(time);// 秒 
  var theTime1 = 0;// 分 
  var theTime2 = 0;// 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
};

// 下载
export const download = (url, name) => {
  let fileName_ = url.substring(url.lastIndexOf('/') + 1, url.length);
  let extensionName = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  let fileName = '';
  if (name) {
    fileName = name + '.' + extensionName;
  } else {
    fileName = fileName_;
  }
  let xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'blob';
  xhr.addEventListener(
    'load',
    e => {
      let a = document.createElement('a'); // 生成一个a元素
      document.body.appendChild(a);
      let event = new MouseEvent('click'); // 创建一个单击事件
      a.download = fileName; // 设置图片名称
      a.href = URL.createObjectURL(xhr.response); // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
      document.body.removeChild(a);
      setTimeout(() => {
        URL.revokeObjectURL(xhr.response);
      }, 200);
    },
    false
  );
  xhr.send();
};