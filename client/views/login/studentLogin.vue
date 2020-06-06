<template>
  <div id="student-login">
    <div class="student-login-title">天津城建大学学生VPN登录门户</div>
    <div class="student-login-left">
      <div class="left-title">通知</div>
      <div class="left-br"></div>
      <div class="left-content">
        <p>
          为了方便您在外网访问学校内网资源，学校开通了新版VPN，无需安装客户端和插件，
          支持电脑和手机直接使用，为了获得更好的体验建议使用Chrome、Firefox、IE11、Edge、Safari等浏览器。
        </p>
        <p>账号校园网认证用户名和密码。</p>
        <p>
          修改密码流程：1.发送邮件至邮箱（webvpn@tcu.edu.cn），
          邮件内容包括本人的学号，姓名，班级和联系方式，
          并附上本人一卡通（或学生证）和身份证正面照片（两证缺一不可）。
          2.待信息确认无误后通过邮件反馈密码修改情况。
        </p>
      </div>
    </div>
    <div class="student-login-right">
      <div class="right-title">账号登录</div>
      <div class="right-br"></div>
      <div class="right-input">
        <div class="el-input input1">
          <el-input
            placeholder="学生用户"
            prefix-icon="el-icon-user"
            class="input"
            v-model="studentNum"
          ></el-input>
        </div>
        <div class="el-input input2">
          <el-form>
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-unlock"
              class="input"
              v-model="studentPassWord"
              show-password
              @keyup.enter.native="handleSubmit"
            ></el-input>
          </el-form>
        </div>
        <div class="el-input input3" ref="input3">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-unlock"
            class="input"
            v-model="Qrcode"
            @keyup.enter.native="handleSubmit"
          ></el-input>
        </div>
        <div class="right-code" ref="code">
          <img src="../../assets/img/teacherLogin-code.png" alt />
        </div>
        <div class="input-checkbox" ref="checkbox">
          <span class="falseNum" ref="falseNum">用户名密码错误</span>
          <input type="checkbox" />
          下次自动登录
        </div>
        <div class="input-button" @click="handleSubmit" ref="login">登录</div>
      </div>
    </div>
    <div class="footer-word">天津城建大学 2020</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentNum: "",
      studentPassWord: "",
      Qrcode: "",
      num: "",
      passWord: "",
      code: "",
      userType: "0",
      err_code: ""
    };
  },
  methods: {
    handleCodeStyle() {
      this.makeBlock("input3");
      this.makeBlock("code");
      this.$refs.checkbox.style.top = 276 + "px";
      this.$refs.login.style.top = 306 + "px";
    },
    goNextLogin() {
      this.$router.push({
        url: "/login/next",
        name: "nextlogin",
      });
    },
    loginSuccess() {
      this.$message({
        type: "success",
        duration: 2400,
        message: "登录成功!"
      });
    },
    handleSubmit() {
      this.num = this.studentNum;
      this.passWord = this.studentPassWord;
      this.code = this.Qrcode;
      this.handleCodeStyle();
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          number: this.num,
          password: this.passWord,
          code: this.code
        }
      })
        .then(res => {
          this.err_code = res.data.err_code;
          if (this.err_code === 0) {
            this.loginSuccess();
            sessionStorage.setItem('sessionCode',res.data.sessionCode ) 
            setTimeout(() => {
              this.goNextLogin();
            }, 2400);
          }
        })
        .catch(() => {
          this.catchError()
        });
    }
  },
  watch: {
    err_code: function() {
      if (this.err_code === 1) {
        this.makeBlock("falseNum");
      }
    }
  }
};
</script>

<style lang="scss">
#student-login {
  position: absolute;
  background: url("../../assets/img/studentLogin-bgc.jpg") no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  z-index: -10;
  overflow: hidden;
  .student-login-title {
    font-size: 33px;
    color: #ffffff;
    position: relative;
    top: 72px;
    left: 226px;
  }
  .student-login-left {
    width: 705px;
    height: 420px;
    background: rgba($color: #000000, $alpha: 0.68);
    position: relative;
    top: 18px;
    left: 228px;
    display: inline-block;
    border-radius: 5px;
    .left-title {
      width: 126px;
      color: #ffffff;

      font-size: 21px;
      font-weight: bolder;
      padding-top: 42px;
      margin: 0 auto;
    }
    .left-br {
      width: 600px;
      height: 1.5px;
      background-color: #ffffff;
      margin: 15px auto;
    }
    .left-content {
      width: 598px;
      text-align: left;
      text-indent: 32px;
      font-size: 16px;
      line-height: 2;
      color: #ffffff;
      margin: 15px auto;
    }
  }
  .student-login-right {
    width: 350px;
    height: 420px;
    background: rgba($color: #000000, $alpha: 0.68);
    display: inline-block;
    position: relative;
    top: 123px;
    right: 287px;
    left: 249px;
    border-radius: 5px;
    .right-title {
      color: #ffffff;
      font-size: 21px;
      font-weight: bolder;
      position: absolute;
      margin: 41px 129px;
    }
    .right-br {
      width: 300px;
      height: 2px;
      background-color: #ffffff;
      position: absolute;
      margin: 0 25px;
      margin-top: 85px;
    }
    .input1 {
      position: absolute;
      top: 100px;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 5px 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 85%;
      }
    }
    .input2 {
      position: absolute;
      top: 165px;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 5px 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 85%;
      }
    }
    .input3 {
      position: absolute;
      top: 230px;
      display: none;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 0 24px;
        margin-left: 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 50%;
      }
    }
    .right-code {
      position: absolute;
      top: 230px;
      right: 32px;
      display: none;
      img {
        width: 100px;
        height: 40px;
        background-color: #fff;
        border-radius: 10px;
      }
    }
    .input-checkbox {
      position: absolute;
      top: 220px;
      right: 30px;
      color: #ffffff;
      font-size: 14px;
      .noNull {
        color: #ff4505;
        padding-right: 95px;
        display: none;
      }
      .falseNum {
        color: #ff4505;
        padding-right: 95px;
        display: none;
      }
      input {
        vertical-align: middle;
      }
    }
    .input-button:hover {
      cursor: pointer;
    }
    .input-button {
      position: absolute;
      top: 251px;
      width: 85%;
      height: 50px;
      background-color: #ffffff;
      border-radius: 18px;
      text-align: center;
      font-size: 14px;
      font-weight: bolder;
      line-height: 50px;
      margin: 0 24px;
    }
  }
  .footer-word {
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    bottom: 24px;
    width: 100%;
    text-align: center;
  }
}
</style>