<template>
    <div id="main">
        <div>{{userAgent}}</div>
        <div>{{nowTime}}</div>
        
    </div>
</template>

<script>
//   import SystemInformation from './LandingPage/SystemInformation'
import fs from "fs";
import path from 'path';
import { ipcMain } from 'electron'
import { app, BrowserWindow } from 'electron'
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
    show() {
      this.userAgent = window.navigator.userAgent;
    },
    getTime() {
      this.nowTime = new Date().toLocaleString();
    },
  },
  mounted() {
    this.show();
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
  }
};
</script>

<style>

</style>
