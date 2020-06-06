<template>
  <div id="next-login">
    <div class="next-login-header">
      <div class="header-home">
        <img src="../../assets/img/nextLogin/home.png" alt />首页
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
        <img src="../../assets/img/nextLogin/user.png" alt />
        <span @mouseenter="dropDown">{{ sessionCode }}</span>
        <span @mouseenter="dropDown">
          <img src="../../assets/img/nextLogin/dropdown.png" alt />
        </span>
        <div class="combo-box" v-if="flag==true" @mouseenter="dropDown">
          <li @click="userClick">个人信息</li>
          <li @click="connectClick">连接管理</li>
          <li @click="cancelClick">注销</li>
        </div>
      </div>
      <div class="notice" ref="notice">
        您使用的是初始密码，存在安全隐患，请尽快
        <span @click="connectClick">修改密码</span>
        <span @click="noticeErrorClick">
          <img src="../../assets/img/nextLogin/error.png" alt />
        </span>
      </div>
    </div>
    <div class="next-login-body">
      <div class="body-search">
        <div class="search-down">
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ command }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu
              slot="dropdown"
              style="margin-bottom:-132px;margin-right:0px;display:block;width:138px"
            >
              <el-dropdown-item command="http">http</el-dropdown-item>
              <el-dropdown-item command="https">https</el-dropdown-item>
              <el-dropdown-item command="ssh">ssh</el-dropdown-item>
              <el-dropdown-item command="telnet">telnet</el-dropdown-item>
              <el-dropdown-item command="vnc">vnc</el-dropdown-item>
              <el-dropdown-item command="rdp">rdp</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input v-model="input" placeholder="输入域-+名或链接直接访问校内资源或图书馆资源"></el-input>
          <el-button type="primary">立即跳转</el-button>
        </div>
      </div>
      <div class="body-system">
        <div class="system-title">
          <span>业务系统</span>
        </div>
        <div class="system-br"></div>
        <div class="system-content">
          <div class="system-box">
            <div class="system-card">
              <div class="box-logo">图</div>
              <div class="box-content">
                <div class="box-title">图书馆资源</div>
                <div class="box-web">lib.tcu.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="system-box">
            <div class="system-card">
              <div class="box-logo">实</div>
              <div class="box-content">
                <div class="box-title">实践教学服务平台</div>
                <div class="box-web">sjjx.tcu.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="system-box" @click="systemLogin">
            <div class="system-card">
              <div class="box-logo">本</div>
              <div class="box-content">
                <div class="box-title">本科教务系统</div>
                <div class="box-web">jwxt.tcu.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="system-box">
            <div class="system-card">
              <div class="box-logo">研</div>
              <div class="box-content">
                <div class="box-title">研究生系统学生端</div>
                <div class="box-web">yjsx.tcu.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="system-box">
            <div class="system-card">
              <div class="box-logo">知</div>
              <div class="box-content">
                <div class="box-title">知网</div>
                <div class="box-web">cnki.net</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-login-footer">天津城建大学 2020</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      command: "http",
      input: "",
      sessionCode: ""
    };
  },
  created() {
    this.dealSession()
  },
  methods: {
    handleCommand(command) {
      this.command = command;
    },
    dropDown() {
      this.flag = true;
    },
    unDropDown() {
      this.flag = false;
    },
    systemLogin() {
      this.$router.push({ url: "login/system", name: "systemlogin" });
    },
    userClick() {
      this.$router.push({
        url: "login/next/user",
        name: "userInformation"
      });
    },
    noticeErrorClick() {
      this.makeNone("notice");
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
    }
  }
};
</script>

<style lang="scss" >
#next-login {
  max-width: 1536px;
  overflow: hidden;
  background-color: #f6f8f9;
  height: 670px;
  .next-login-header {
    height: 60px;
    background: url("../../assets/img/nextLogin/header.jpg") no-repeat;
    line-height: 60px;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    .notice {
      width: 330px;
      height: 36px;
      padding: 0 12px;
      font-size: 12px;
      line-height: 36px;
      background-color: #ffd5d5;
      position: absolute;
      top: 61px;
      left: 1150px;
      z-index: 99;
      span {
        color: #05aaf8;
        text-decoration: underline;
      }
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-left: 16px;
      }
    }
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
          background: url("../../assets/img/nextLogin/search.png") no-repeat;
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
        z-index: 999 !important;
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
  .next-login-body {
    top: 80px;
    position: absolute;
    width: 80%;
    height: 100px;
    background-color: #f6f8f9;
    .body-search {
      .search-down {
        position: relative;
        left: 346px;
        top: 24px;
        .el-dropdown-link {
          display: inline-block;
          width: 120px;
          height: 36px;
          cursor: pointer;
          font-size: 16px;
          color: #000;
          background-color: #fff;
          line-height: 36px;
          padding-left: 24px;
          border: solid 1px rgb(209, 204, 204);
          i {
            position: absolute;
            top: 16px;
            right: 8px;
          }
        }
        .el-input {
          width: 590px;
          height: 38px;
          border: solid 1px rgb(209, 204, 204);
        }
        .el-button {
          vertical-align: top;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
    .body-system {
      width: 1363px;
      height: 256px;
      background-color: #fff;
      margin: 60px 86.5px;
      .system-title {
        font-size: 18px;
        font-family: "微软雅黑";
        height: 78px;
        span {
          display: inline-block;
          margin: 24px;
        }
      }
      .system-br {
        height: 2px;
        background-color: #f6f8f9;
      }
      .system-content {
        padding-top: 25px;
        margin-left: 20px;
        background: #fff;
        margin-top: 2px;
        padding-bottom: 52px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      .system-box {
        display: inline-block;
        cursor: pointer;
        width: 250px;
        .system-card {
          height: 60px;
          width: 225px;
          padding-top: 18px;
          padding-bottom: 8px;
          margin-bottom: 15px;
          margin-left: 23px;
          padding-left: 15px;
        }
        .box-logo {
          height: 54px;
          width: 54px;
          display: inline-block;
          background-color: #05aaf8;
          border-radius: 34px;
          vertical-align: middle;
          color: white;
          font-size: 34px;
          text-align: center;
          line-height: 51px;
          margin-right: 10px;
        }
        .box-content {
          display: inline-block;
          vertical-align: middle;
          width: 160px;
          .box-title {
            font-size: 16px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .box-web {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            color: #969696;
            margin-top: 6px;
          }
        }
      }
    }
  }
  .next-login-footer {
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
    top: 500px;
  }
}
</style>