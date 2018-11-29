<template>
    <div id="main">
        <div>{{userAgent}}</div>
        <div>{{nowTime}}</div>
        <div class="uploadRegion">
            <div class="uploadRegionText">选择文件</div>
            <input type="file" id="uploadFile" name="content" ref="uploadFile" @change="uploadFile">
        </div>
        <el-button type="primary" @click="setWin('minimize')">最小化</el-button>
        <el-button type="primary" @click="setWin('maximize')">最大化</el-button>
        <el-button type="primary" @click="setWin('full')">全屏</el-button>
        <el-button type="primary" @click="setWin('closed')">关闭</el-button>
        <el-button type="primary" @click="setWin('reload')">重新加载</el-button>
        <div style="max-width:100%;max-height:500px;" v-if="imgUrl">
            <img :src="imgUrl" style="max-width:100%;max-height:500px;">
        </div>
        <div v-for="item in systemInfo.cpus">
          <span>{{item.model}}</span>
          <!-- <span>{{item.speed}}</span> -->
        </div>
        <div>CPU架构:{{systemInfo.arch}}</div>
        <div v-if="systemInfo.freemem">内存:{{(systemInfo.freemem).toFixed(2)}}M/{{systemInfo.totalmem}}M</div>
        <div v-if="systemInfo.freemem">内存使用情况:{{(systemInfo.freeused).toFixed(2)}}%</div>
        <div>计算机名称:{{systemInfo.hostname}}</div>
        <div>系统类型:
          <span v-if="systemInfo.type == 'Darwin'">macOS</span>
          <span v-else-if="systemInfo.type == 'Linux'">Linux</span>
          <span v-else-if="systemInfo.type == 'Windows_NT'">Windows</span>
          <span v-else>{{systemInfo.type}}</span>
        </div>
        <div>系统版本号:{{systemInfo.release}}</div>
        <div>系统已运行时间:{{systemInfo.uptime}}</div>
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
import { uuid, secondToDate_ } from '../../utils/tools';
export default {
  name: "index",
  components: {},
  data() {
    return {
      userAgent: "",
      nowTime: "",
      textarea: "",
      imgUrl: "",
      systemInfo:{
        cpus:[],
        arch:'',//CPU架构
        freemem:'',//剩余内存
        totalmem:'',//总内存
        freeused: '',//内存使用%
        hostname:'',
        type:'',//系统类型
        platform:'',//系统平台
        release:'',//系统版本号
        uptime:'',//系统运行时间
      }
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
    setWin(str){
      ipc.send('win',str);
    },
    secondsFormat( s ) { 
      
    }
    
  },
  mounted() {
    this.show();
    this.getTime();
    setInterval(() => {
      this.getTime();
      this.systemInfo.freemem = os.freemem()/1024/1024;
      this.systemInfo.uptime = secondToDate_(os.uptime());
      this.systemInfo.freeused = ((this.systemInfo.totalmem - this.systemInfo.freemem) / this.systemInfo.totalmem) * 100;
    }, 1000);
    ipc.on('winres',(e,rs) => {
      console.log(rs)
    });
    this.systemInfo.cpus = os.cpus();
    this.systemInfo.arch = os.arch();
    this.systemInfo.freemem = os.freemem()/1024/1024;
    this.systemInfo.totalmem = os.totalmem()/1024/1024;
    this.systemInfo.hostname = os.hostname();
    this.systemInfo.type = os.type();
    this.systemInfo.release = os.release();
    this.systemInfo.uptime = secondToDate_(os.uptime());
    this.systemInfo.freeused = ((this.systemInfo.totalmem - this.systemInfo.freemem) / this.systemInfo.totalmem) * 100;
    // console.log(this.secondsFormat(os.uptime()))
    // console.log(os.cpus())
    // console.log(os.totalmem())
    // console.log(uuid())
    // console.log(path.resolve(__dirname, '../')
    // console.log(path)
    // console.log(__dirname)
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>