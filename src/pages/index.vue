<template>
  <div class="wrap_box">
    <Header></Header>
    <div class="content">
      <div class="f-24">超声影像采集系统</div>
      <div class="img_record clear">
        <div>
          <p>新建影像记录</p>
          <div class="info fl">
            <div class="num">
              <p>设备编号</p>
              <div>医院1科室1设备B102</div>
            </div>
            <div class="patient">
              <p>患者信息</p>
              <el-form size="small">
                <el-form-item label="末次月经:" label-width="80px" class="must-icon pos_r">
                  <el-date-picker v-model="lastDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item v-for="(v,i) in infoArr" :key="i" :label="v.name" label-width="80px" class="pos_r" :class="i < 3 ? 'must-icon' : i < 5 ? 'must-icon2' : ''">
                  <el-input v-model="v.value"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="imgs">
            <p>图像采集</p>
            <div class="clear">
              <div v-for="(v,i) in imgs" :key="i" class="fl">
                <p>{{v.name}}</p>
                <div v-if="v.url !== ''" class="img_box has_img"  @click="popBoxShow = true">
                  <img :src="v.url" alt="" @click="addImg(i)">
                </div>
                <div v-else class="img_box"  @click="addImg(i)"><i class="el-icon-plus"></i></div>
              </div>
            </div>
          </div>
        </div>
        <div class="w130">
          <el-button type="primary" class="w130" @click="submitInfo">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择图片"
      :visible.sync="popBoxShow"
      width="1080px">
      <div class="box_content clear">
        <ul class="img_date fl">
          <li v-for="(v,i) in folder" :key="i" :class="{'active' : i === fileIndex}" @click="chooseFolder(i)">{{v}}</li>
        </ul>
        <div class="imgs_box">
          <div>
            <el-button type="primary" class="w130 update_btn" size="medium" @click="getImgs">全部刷新</el-button>
          </div>
          <ul class="img_list clear">
            <li v-for="(v,i) in imgList" :key="i" class="fl" @click="chooseImg(v,i)" :class="{'img_active': i === listIndex}">
              <img :src="v" alt="">
              <div class="mask">
                <i class="el-icon-check"></i>
              </div>
              <div>{{v | imgName}}</div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="popBoxShow = false">取 消</el-button>
        <el-button type="primary" @click="sureImg" :disabled="imgUrl === ''">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="subSuccess"
      width="500px" @closed='initFun'>
      <div class="check_info">提交成功!</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showRes">查看提交数据</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "./common/header"
import http from '../api/http.js'
import Address from '../api/portAddress.js'
export default {
  components: {
    Header
  },
  data () {
    return {
      popBoxShow : false,
      infoArr : [
        {
          name : '患者姓名:',
          value : ''
        },
        {
          name : '身份证号:',
          value : ''
        },
        {
          name : '手机号码:',
          value : ''
        },
        {
          name : '孕周:',
          value : ''
        },
        {
          name : '年龄:',
          value : ''
        },
        {
          name : '孕史:',
          value : ''
        }
      ],
      imgs:[
        {
          name : '上腹部横切面',
          url : ''
        },
        {
          name : '四腔心切面',
          url : ''
        },
        {
          name : '左心室流出道切面',
          url : ''
        },
        {
          name : '右心室流出道切面',
          url : ''
        },
        {
          name : '三血管切面',
          url : ''
        },
        {
          name : '三血管气管切面',
          url : ''
        }
      ],
      lastDate : '',
      folder : [],
      imgList : [],
      imgIndex: 0,
      imgUrl:'',
      listIndex: '',
      fileIndex: 0,
      subSuccess: false
    }
  },
  methods: {
    addImg(i) {
      this.popBoxShow = true
      this.imgIndex = i
      this.getImgs()
    },
    chooseImg(url,i) {
      this.listIndex = i
      this.imgUrl = url
    },
    sureImg() {
      this.popBoxShow = false
      this.imgs[this.imgIndex].url = this.imgUrl
      this.imgUrl = ''
      this.listIndex = ''
    },
    chooseFolder(i) {
      this.fileIndex = i
    },
    showRes() {
      const { href } = this.$router.resolve({
        name : 'info'
      })
      window.open(href, '_blank')
      this.subSuccess = false
    },
    submitInfo() {
      let name = this.infoArr[0].value, idNo = this.infoArr[1].value,phoneNo = this.infoArr[2].value, week = this.infoArr[3].value, age = this.infoArr[4].value, preHistory = this.infoArr[5].value
      let filterArr = this.imgs.filter(item => {
        return item.url === ''
      })
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, regPhone = /^1[34578]\d{9}$/, regAge = /^[1-9]\d*$/
      let flag
      if(name.length < 1 || name.match(/^[ ]+$/) || !regIdNo.test(idNo) || !regPhone.test(phoneNo) || !regAge.test(age) || age < 16 || !regAge.test(week) || week < 16 || this.lastDate.length < 1) {
        flag = false
        this.$message.error('患者信息不完整或格式不符')
      }else if(filterArr.length > 0){
        flag = false
        this.$message.error('请完善图像采集信息')
      }else {
        flag = true
        this.subSuccess = true
        let imgs = []
        this.imgs.forEach(item => {
          imgs.push(item.url)
        })
        let userInfo = {
          lastDate : this.lastDate,
          name,
          idNo,
          phoneNo,
          week,
          age,
          preHistory,
          imgs
        }
        localStorage.setItem('info',JSON.stringify(userInfo))
      }
    },
    getFolder() {
      let param = {
        device : 'B102'
      }
      http(Address.folder,param).then(res => {
        let { data } = res
        if(data.errorCode === 0) {
          this.folder = data.result
        } else {
          this.$message.error('失败文案')
        }
      })
    },
    getImgs() {
      let param = {
        path : this.folder[this.fileIndex]
      }
      http(Address.imgs,param).then(res => {
        let { data } = res
        if(data.errorCode === 0) {
          this.imgList = data.result
        } else {
          this.$message.error('失败文案')
        }
      })
    },
    initFun() {
      this.$router.push('/repage')
    }
  },
  mounted () {
    this.getFolder()
  },
  watch: {
    fileIndex : function () {
      this.getImgs()
    }
  },
  filters: {
    imgName(v) {
      if(v) {
        let a = v.lastIndexOf('/'), b = v.lastIndexOf('.')
        return v.slice(a + 1,b)
      }
    }
  }
};
</script>

<style lang="less">
.wrap_box {
  box-sizing: border-box;
  background-color: rgb(233, 233, 233);
  .pos_r {
    position: relative;
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 30px 36px;
    .img_record {
      margin-top: 30px;
      background-color: rgb(244, 244, 244);
      border-bottom: 1px solid #ccc;
      & > div:first-child {
        & > p {
          border-bottom: 1px solid #ccc;
          padding: 20px;
        }
        border-bottom: 1px solid #ccc;
      }
      .info {
        width: 500px;
        // border-right: 1px solid #ccc;
        padding-left: 30px;
        box-sizing: border-box;
        .num {
          border-bottom: 1px solid #ccc;
          padding: 20px 0;
          div {
            margin: 20px 0 0 10px;
          }
        }
        .patient {
          p {
            margin-bottom: 20px;
          }
          margin: 20px 50px 0 0;
        }
      }
      .imgs {
        margin-left: 500px;
        padding: 20px 0 0 30px;
        border-left: 1px solid #ccc;
        & > p {
          margin-bottom: 20px;
        }
        .img_box {
          text-align: center;
          width: 200px;
          height: 200px;
          border: 1px dashed #ccc;
          margin: 0 20px 20px 0;
          img {
            width: 200px;
            height: 200px;
          }
        }
        .has_img {
          border: none;
        }
        .fl {
          p {
            margin-bottom: 20px;
          }
        }
        [class*=" el-icon-"], [class^=el-icon-] {
          font-size: 30px;
          line-height: 200px;
          color: #999;
        }
      }
      .w130 {
        margin: 20px auto 10px;
      }
    }
  }
  .box_content {
    .img_date {
      li {
        width: 130px;
        padding: 5px 10px;
        margin-bottom: 10px;
        text-align: center;
      }
      li:hover {
        cursor: pointer;
      }
      .active {
        background-color: #f2f2f2;
      }
    }
    .imgs_box {
      border-left: 1px solid #ccc;
      margin-left: 150px;
      & > div:first-child {
        border-bottom: 1px solid #ccc;
        position: relative;
        height: 40px;
        .update_btn {
          position: absolute;
          right: 0;
        }
      }
      .img_list {
        height: 500px;
        overflow-y: auto;
        margin-left: 20px;
        li {
          box-sizing: border-box;
          padding: 10px 10px 0px 0;
          position: relative;
        }
        img {
          width: 200px;
          height: 200px;
        }
        .mask {
          position: absolute;
          background-color: rgba(255, 255, 255, .5);
          top: 10px;
          left: 0;
          bottom: 0;
          right: 10px;
          display: none;
        }
        .img_active {
          .mask {
            display: block;
            text-align: center;
            [class*=" el-icon-"], [class^=el-icon-] {
              font-size: 60px;
              line-height: 200px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .check_info {
    width: 112px;
    margin: 0 auto;
    font-size: 26px;
  }
}
</style>

