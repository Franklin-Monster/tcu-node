<template>
  <div id="system-login">
    <div class="login-wrapper">
      <div class="login-header">
        <img src="../../assets/img/systemLogin/logo.jpg" alt />
        <span class="header-title">提供全新教务管理方案</span>
      </div>
      <div class="login-br"></div>
      <div class="login-table">
        <div class="table-title">欢迎来到URP综合教务系统，请输入您的帐号和密码</div>
        <div class="table-content">
          <div class="input">
            账号：
            <input type="text" v-model="num" />
          </div>
          <div class="input">
            密码：
            <input type="text" v-model="passWord" />
          </div>
          <div class="input-code">
            验证码：
            <input type="text" v-model="code" />
            <img src="../../assets/img/systemLogin/validateCodeAction.jpg" alt />
            <span>看不清，换一张</span>
          </div>
        </div>
        <div class="table-button">
          <img src="../../assets/img/systemLogin/login.gif" alt @click="handleSubmit" />
          <img src="../../assets/img/systemLogin/reset.gif" alt />
          <img src="../../assets/img/systemLogin/fpassword.gif" alt />
        </div>
        <div class="table-num">版本号：1.5_0</div>
        <div class="table-footer-middle">
          <span>版权所有 © 2005-2008 北京清元优软科技有限公司 保留所有权利。</span>
        </div>
        <div class="table-footer-right"></div>
        <div class="table-footer-left"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: "",
      passWord: "",
      code: ""
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.num == 1705080106 &&
        this.passWord == 1705080106 &&
        this.code.toLowerCase() == "ubx6"
      ) {
        alert("登录成功");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#system-login {
  max-width: 1536px;
  .login-wrapper {
    width: 525px;
    height: 352px;
    // background-color: yellow;
    position: relative;
    margin: 160px auto;
    border: 1px solid #000;
    border-radius: 8px;
    .login-header {
      background: url("../../assets/img/systemLogin/bg-top.jpg");
      height: 39px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      span {
        font-size: 11px;
        vertical-align: middle;
        display: inline-block;
        margin-bottom: 8px;
      }
    }
    .login-br {
      height: 7px;
      background-color: #5b86c6;
    }
    .login-table {
      width: 525px;
      height: 285px;
      font-family: "Arial";
      background: url("../../assets/img/systemLogin/stamp.jpg");
      position: relative;
      .table-title {
        color: #003366;
        font-size: 12px;
        position: absolute;
        top: 64px;
        left: 50px;
      }
      .table-content {
        position: absolute;
        top: 100px;
        left: 50px;
        font-size: 11px;
        font-weight: bold;
        .input {
          margin: 10px 24px;
          input {
            border: 1px soild #666666;
            width: 220px;
            height: 21px;
          }
        }
        .input-code {
          margin: 10px 13px;
          input {
            border: 1px soild #666666;
            width: 51px;
            height: 18px;
          }
          img {
            width: 80px;
            height: 20px;
            vertical-align: middle;
            margin: 0 6px;
          }
          span {
            color: #000099;
            font-size: 11px;
            text-decoration: underline;
            vertical-align: bottom;
          }
        }
      }
      .table-button {
        position: absolute;
        top: 220px;
        left: 88px;
        img {
          width: 65px;
          height: 16px;
          display: inline-block;
          margin: 0 8px;
        }
      }
      .table-num {
        position: absolute;
        font-size: 11px;
        color: #555555;
        left: 453px;
        top: 270px;
      }
      .table-footer-middle {
        width: 490px;
        height: 21px;
        position: absolute;
        bottom: -21px;
        left: 20px;
        background: url("../../assets/img/systemLogin/bg-bottom.jpg");
        text-align: center;
        color: #ffffff;
        font-size: 11px;
        span {
          display: inline-block;
          margin: 4px 0;
          vertical-align: middle;
        }
      }
      .table-footer-left {
        width: 20px;
        height: 21px;
        position: absolute;
        bottom: -21px;
        left: 0;
        background: url("../../assets/img/systemLogin/bottom-left.jpg");
        border-bottom-left-radius: 8px;
      }
      .table-footer-right {
        width: 15px;
        height: 21px;
        position: absolute;
        bottom: -21px;
        right: 0px;
        background: url("../../assets/img/systemLogin/bottom-right.jpg");
        border-bottom-right-radius: 8px;
      }
    }
  }
}
</style>