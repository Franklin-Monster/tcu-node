<template>
  <div id="user-information">
    <div class="next-login-header">
      <div class="header-home">
        <img src="../../../assets/img/nextLogin/home.png" alt />首页
      </div>
      <div class="header-search">
        站内搜索
        <div class="search-wrapper">
          <div class="search">
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="header-user" @mouseenter="dropDown" @mouseleave="unDropDown">
        <img src="../../../assets/img/nextLogin/user.png" alt />
        <span @mouseenter="dropDown">{{ sessionCode }}</span>
        <span @mouseenter="dropDown">
          <img src="../../../assets/img/nextLogin/dropdown.png" alt />
        </span>
        <div class="combo-box" v-if="flag==true" @mouseenter="dropDown">
          <li @click="userClick">个人信息</li>
          <li @click="connectClick">连接管理</li>
          <li @click="cancelClick">注销</li>
        </div>
      </div>
    </div>
    <div class="user-title">账号安全</div>
    <el-col :span="12">
      <el-menu default-active="1" class="el-menu-vertical-demo" active-text-color="#000000">
        <el-menu-item index="1" @click="passwordClick">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="2" @click="feedbackClick">
          <i class="el-icon-document"></i>
          <span slot="title">信息反馈</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="password" v-if="view">
      <div class="input">
        原密码
        <el-input v-model.trim="oldPassWord" placeholder="请输入原密码" show-password></el-input>
      </div>
      <div class="input">
        新密码
        <el-input v-model.trim="newPassWord" placeholder="请输入新密码" show-password></el-input>
      </div>
      <div class="newpassword-judge" ref="newPassWordJudge">密码必须大于六位！</div>
      <div class="confirmpassword-judge" ref="confirmPassWordJudge">确认密码与新密码不相同！</div>
      <div class="input input3">
        确认密码
        <el-input v-model.trim="confirmPassWord" placeholder="请再次输入新密码" show-password></el-input>
      </div>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
    <div class="feedback" v-else>
      <div class="input">
        标题*
        <el-input></el-input>
      </div>
      <div class="input">
        <span>内容*</span>
        <el-input type="textarea" :rows="4" placeholder="请输入反馈信息" v-model="textarea"></el-input>
      </div>
      <div class="input input3">
        联系方式
        <el-input></el-input>
      </div>
      <span class="upload-word">附件(图片)</span>
      <div class="upload">
        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <el-upload class="upload-demo" action="www.1453765616@qq.com">
          <el-button size="small" type="primary">上传文件</el-button>
        </el-upload>
      </div>
      <div class="button">
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      view: true,
      input: "",
      oldPassWord: "",
      newPassWord: "",
      confirmPassWord: "",
      textarea: "",
      sessionCode: ""
    };
  },
  created() {
    this.dealSession();
  },
  methods: {
    dropDown() {
      this.flag = true;
    },
    unDropDown() {
      this.flag = false;
    },
    passwordClick() {
      this.view = true;
    },
    feedbackClick() {
      this.view = false;
    },
    userClick() {
      this.$router.push({
        url: "login/next/user",
        name: "userInformation"
      });
    },
    connectClick() {
      this.$router.push({
        url: "login/next/connect-manage",
        name: "connectManage"
      });
    },
    cancelClick() {
      this.$confirm("您将注销此账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("sessionCode");
          this.$message({
            type: "success",
            duration: 1000,
            message: "注销成功!"
          });
          setTimeout(() => {
            this.$router.push({ url: "/login/teacher", name: "teacherlogin" });
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 1000,
            message: "已取消注销"
          });
        });
    },
    judgeNewPassWord() {
      if (this.newPassWord == this.oldPassWord) {
        this.$refs.newPassWordJudge.innerText = "新密码不能与原密码相同！";
        this.makeBlock("newPassWordJudge");
      } else {
        this.$refs.newPassWordJudge.innerText = "密码必须大于等于六位！";
        this.makeNone("newPassWordJudge");
      }
      if (this.newPassWord.length < 6) {
        this.makeBlock("newPassWordJudge");
      } else {
        this.makeNone("newPassWordJudge");
      }
    },
    judgeConfirmPassWord() {
      if (this.confirmPassWord != this.newPassWord) {
        this.makeBlock("confirmPassWordJudge");
      } else {
        this.makeNone("confirmPassWordJudge");
      }
    },
    clearPassWordBox() {
      this.newPassWord = "";
      this.oldPassWord = "";
      this.confirmPassWord = "";
      setTimeout(() => {
        this.makeNone("newPassWordJudge");
        this.makeNone("confirmPassWordJudge");
      }, 1800);
    },
    handleSubmit() {
      if (
        this.confirmPassWord === this.newPassWord &&
        this.newPassWord.length >= 6
      ) {
        this.$axios({
          url: "/login/next/user/changePassword",
          method: "post",
          data: {
            number: this.sessionCode,
            oldPassWord: this.oldPassWord,
            newPassWord: this.newPassWord,
            confirmPassWord: this.confirmPassWord
          }
        })
          .then(res => {
            switch (res.data.err_code) {
              case 0:
                this.$message({
                  message: "更改成功！",
                  type: "success"
                });
                break;
              case 1:
                this.$message.error("原密码错误！");
                break;
              case 2:
                this.judgeNewPassWord();
                break;
            }
          })
          .catch(() => {
            this.catchError();
          });
      } else {
        this.judgeNewPassWord();
        this.judgeConfirmPassWord();
      }
      this.clearPassWordBox();
    }
  }
};
</script>

<style lang="scss" scoped>
#user-information {
  max-width: 1536px;
  overflow-x: hidden;
  background-color: #f6f8f9;
  height: 1000px;
  .next-login-header {
    height: 60px;
    background: url("../../../assets/img/nextLogin/header.jpg") no-repeat;
    line-height: 60px;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    width: 100%;
    position: relative;
    .header-home {
      width: 80px;
      height: 20px;
      color: #ffffff;
      font-size: 18px;
      font-family: "微软雅黑";
      margin-left: 24px;
      display: inline-block;
      img {
        width: 18px;
        height: 18px;
        padding-right: 12px;
        vertical-align: middle;
        padding-bottom: 2px;
      }
    }
    .header-search {
      width: 336px;
      height: 40px;
      font-size: 14px;
      font-family: "微软雅黑";
      display: inline-block;
      margin-left: 849px;
      color: #ffffff;
      .search-wrapper {
        background-color: #fff;
        display: inline-block;
        width: 260px;
        height: 34px;
        vertical-align: middle;
        .search {
          display: inline-block;
          width: 260px;
          height: 34px;
          background: url("../../../assets/img/nextLogin/search.png") no-repeat;
          background-position: left;
          background-position-x: 230px;
          input {
            height: 34px;
            width: 260px;
            background: none;
            border: none;
            vertical-align: top;
          }
        }
      }
    }
    .header-user {
      width: 230px;
      height: 60px;
      display: inline-block;
      color: #ffffff;
      img {
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin-right: 14px;
        margin-left: 18px;
      }
      .combo-box {
        z-index: 999999 !important;
        position: absolute;
        background-color: #ffffff;
        width: 120px;
        height: 120px;
        color: #000000;
        font-size: 16px;
        border-radius: 2px;
        margin-left: 66px;
        li:hover {
          cursor: pointer;
          background-color: #e0e2e3;
        }
        li {
          height: 40px;
          list-style: none;
          display: block;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
  .user-title {
    width: 1000px;
    height: 41px;
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: 0 24px;
    position: relative;
    top: 60px;
    left: 250px;
    border: 1px solid #dcdfe6;
  }
  .el-col {
    margin: 60px 250px;
    margin-right: 24px;
    width: 240px;
    background-color: #fff;
    height: 145px;
    display: inline-block;
    ul {
      margin: 24px 0;
    }
  }
  .password {
    width: 733px;
    height: 500px;
    display: inline-block;
    background-color: #fff;
    margin: 60px -24px;
    padding-top: 50px;
    padding-left: 76px;
    button {
      width: 64px;
      height: 38px;
      background-color: #1b9ef3;
      text-align: center;
      position: relative;
      top: 24px;
      left: 524px;
    }
    .newpassword-judge {
      display: none;
      position: absolute;
      top: 290px;
      font-size: 12px;
      left: 1160px;
      width: 160px;
      height: 20px;
      color: red;
    }
    .confirmpassword-judge {
      display: none;
      position: absolute;
      top: 340px;
      font-size: 12px;
      left: 1160px;
      width: 150px;
      height: 20px;
      color: red;
    }
    .input {
      width: 590px;
      height: 38px;
      margin: 12px auto;
      margin-left: 36px;
      .el-input {
        width: 490px;
        height: 38px;
        margin: 0 10px;
      }
    }
    .input3 {
      margin: 0 20px;
    }
  }
  .feedback {
    width: 733px;
    height: 500px;
    display: inline-block;
    background-color: #fff;
    margin: 60px -24px;
    padding-top: 50px;
    padding-left: 76px;

    .input {
      width: 590px;
      height: 38px;
      margin: 12px auto;
      margin-left: 36px;
      span {
        position: relative;
        bottom: 72px;
        display: inline-block;
        margin-right: 5px;
      }
      .el-input {
        width: 490px;
        height: 38px;
        margin: 0 10px;
      }
      .el-textarea {
        width: 490px;
        height: 100px;
        margin: 0 10px;
      }
    }
    .input3 {
      padding-top: 60px;
      margin: 0 11px;
    }
    .upload-word {
      display: inline-block;
      margin: 66px auto;
    }
    .upload {
      display: inline-block;
      margin: 12px 15px;
      button {
        width: 92px;
        height: 38px;
        font-size: 14px;
      }
    }
    .el-button {
      background-color: #1b9ef3;
    }
    .button {
      margin-left: 508px;
    }
  }
}
</style>