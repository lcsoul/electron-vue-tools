<template>
    <div id="main">
        <div>{{userAgent}}</div>
        <div>{{nowTime}}</div>
        <div class="uploadRegion">
            <div class="uploadRegionText">选择文件</div>
            <input type="file" id="uploadFile" name="content" ref="uploadFile" @change="uploadFile">
        </div>
        <el-button type="primary" @click="quit">别点我</el-button>
        <el-button type="primary" @click="setWin('minimize')">最小化</el-button>
        <el-button type="primary" @click="setWin('maximize')">最大化</el-button>
        <el-button type="primary" @click="setWin('unmaximize')">取消最大化</el-button>
        <el-button type="primary" @click="setWin('closed')">关闭</el-button>
        <el-button type="primary" @click="setWin('full')">全屏</el-button>
        <el-button type="primary" @click="setWin('noFull')">取消全屏</el-button>
        <div style="max-width:100%;max-height:500px;" v-if="imgUrl">
            <img :src="imgUrl" style="max-width:100%;max-height:500px;">
        </div>
        <textarea ref="textarea" style="width:100%;min-height:100px;" v-model="textarea"></textarea>
    </div>
</template>

<script>
//   import SystemInformation from './LandingPage/SystemInformation'
import fs from "fs";
import os from "os";
import path from 'path';
// import { ipcMain,app, BrowserWindow  } from 'electron';
const {ipcRenderer: ipc,ipcMain: ipcMain} = require('electron');
export default {
  name: "index",
  components: {},
  data() {
    return {
      userAgent: "",
      nowTime: "",
      textarea: "",
      imgUrl: ""
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    show() {
      this.userAgent = window.navigator.userAgent;
    },
    uploadFile() {
      // _this.$refs.uploadFile.value = "";
      const _this = this;
      const files = _this.$refs.uploadFile;
      console.log(files.files[0]);
      this.textarea= "",
      this.imgUrl= ""
      if (/image\/\w+/.test(files.files[0].type)) {
        // this.imgUrl = files.files[0].path;
        var reader = new FileReader(); //声明一个FileReader实例
        reader.readAsDataURL(files.files[0]);
        reader.onload = function(e) {
          console.log(e);
           _this.imgUrl = e.target.result 
        };
      } else {
        fs.readFile(
          files.files[0].path,
          { flag: "r+", encoding: "utf8" },
          function(err, data) {
            if (err) {
              console.error(err);
              return;
            }
            _this.textarea = data;
          }
        );
      }
    },
    getTime() {
      this.nowTime = new Date().toLocaleString();
    },
    quit(){
        // console.log(ipc)
        // console.log(ipcMain)
        ipc.send('win','minimize');
        // console.log(app)
        // console.log(BrowserWindow)
    },
    setWin(str){
      ipc.send('win',str);
    }
  },
  mounted() {
    this.show();
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
    ipc.on('winres',(e,rs) => {
      console.log(rs)
    });
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>