<template>
  <div class="res_info">
    <pre>{{info}}</pre>
    <div class="mt15">
      <el-button
        type="primary"
        @click="saveInfo"
      >保存信息</el-button>
    </div>
  </div>
</template>

<script>
import saveAs from "../assets/js/fileSave.js";
export default {
  data() {
    return {
      info: {},
      name: ""
    };
  },
  methods: {
    getInfo() {
      this.info = JSON.parse(localStorage.getItem("info"));
    },
    saveInfo() {
      let info = localStorage.getItem("info"),
        name = this.info.name;
      let file = new File([info], `患者${name}信息.txt`, {
        type: "text/plain;charset=utf-8"
      });
      saveAs(file);
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="less">
.res_info {
  width: 615px;
  font-size: 16px;
  margin: 150px auto 0;
}
</style>

