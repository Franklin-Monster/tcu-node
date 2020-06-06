<template>
  <div id="connect-manage">
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
    <div class="connect-title">连接管理</div>
    <el-col :span="12">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        active-text-color="#000000"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <span slot="title">登录日志</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">连接日志</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">堡垒机日志</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">连接凭证</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">密钥管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="content-box">
      <div class="login-record" v-show="boxType=='1'">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" ref="link">
            {{command}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:236px;">
            <el-dropdown-item command="请选择" style="color:#ccc">请选择</el-dropdown-item>
            <el-dropdown-item command="成功">成功</el-dropdown-item>
            <el-dropdown-item command="失败">失败</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="ip-input">
          <el-input v-model="ipInput" placeholder="请输入IP"></el-input>
        </div>
        <div class="ip-button" @click="searchClick">
          <el-button>搜索</el-button>
        </div>
        <div class="ip-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#F2F2F2',color:'#666666'}"
            :row-style="{height:'28px'}"
            :cell-style="{padding:'8px'}"
          >
            <el-table-column prop="ip" label="IP" width="200"></el-table-column>
            <el-table-column prop="time" label="时间" width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="150"></el-table-column>
            <el-table-column prop="detail" label="详情" width="445"></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout=" prev,pager,next,jumper,total,sizes"
              :total="currentTotal"
              :background="true"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="connect-record" v-show="boxType=='2'">
        <div class="connect-explain">连接日志个人通过自定义访问框连接的服务器的日志记录，由管理员分配的堡垒机日志请在堡垒机日志中查询</div>
        <el-dropdown @command="handleConnectCommand" style="width:251px;">
          <span class="el-dropdown-link" ref="link">
            {{connectCommand}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:251px;">
            <el-dropdown-item command="请选择协议" style="color:#ccc">请选择协议</el-dropdown-item>
            <el-dropdown-item command="SSH">SSH</el-dropdown-item>
            <el-dropdown-item command="TELNET">TELNET</el-dropdown-item>
            <el-dropdown-item command="RDP">RDP</el-dropdown-item>
            <el-dropdown-item command="VNC">VNC</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="connect-input1">
          <el-input v-model="connectAdressInput" placeholder="请输入地址"></el-input>
        </div>
        <div class="connect-input2">
          <el-input v-model="connectSourceInput" placeholder="请输入资源名"></el-input>
        </div>
        <div class="connect-button">
          <el-button>搜索</el-button>
        </div>
        <div class="connect-table">
          <el-table
            :data="connectTableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#F2F2F2',color:'#666666'}"
            :row-style="{height:'28px'}"
            :cell-style="{padding:'8px'}"
          >
            <el-table-column prop="source-name" label="资源名称" width="200"></el-table-column>
            <el-table-column prop="agreement" label="协议" width="200"></el-table-column>
            <el-table-column prop="adress" label="地址" width="200"></el-table-column>
            <el-table-column prop="start-time" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="end-time" label="结束时间" width="200"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="fort-machine-record" v-show="boxType=='3'">
        <div class="fort-explain">堡垒机日志是管理员分配的堡垒机的日志记录，个人通过自定义访问框连接的服务器请在个人连接日志中查询</div>
        <el-dropdown @command="handlefortCommand" style="width:251px;">
          <span class="el-dropdown-link" ref="link">
            {{connectCommand}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:251px;">
            <el-dropdown-item command="请选择协议" style="color:#ccc">请选择协议</el-dropdown-item>
            <el-dropdown-item command="SSH">SSH</el-dropdown-item>
            <el-dropdown-item command="TELNET">TELNET</el-dropdown-item>
            <el-dropdown-item command="RDP">RDP</el-dropdown-item>
            <el-dropdown-item command="VNC">VNC</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="fort-input1">
          <el-input v-model="fortAdressInput" placeholder="请输入地址"></el-input>
        </div>
        <div class="fort-input2">
          <el-input v-model="fortSourceInput" placeholder="请输入资源名"></el-input>
        </div>
        <div class="fort-button">
          <el-button>搜索</el-button>
        </div>
        <div class="fort-table">
          <el-table
            :data="fortTableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#F2F2F2',color:'#666666'}"
            :row-style="{height:'28px'}"
            :cell-style="{padding:'8px'}"
          >
            <el-table-column prop="source-name" label="资源名称" width="200"></el-table-column>
            <el-table-column prop="agreement" label="协议" width="200"></el-table-column>
            <el-table-column prop="adress" label="地址" width="200"></el-table-column>
            <el-table-column prop="start-time" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="end-time" label="结束时间" width="200"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="connect-proof" v-show="boxType=='4'">
        <el-dropdown @command="handleProofCommand" style="width:251px;">
          <span class="el-dropdown-link" ref="link">
            {{proofCommand}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:251px;">
            <el-dropdown-item command="请选择协议" style="color:#ccc">请选择协议</el-dropdown-item>
            <el-dropdown-item command="SSH">SSH</el-dropdown-item>
            <el-dropdown-item command="TELNET">TELNET</el-dropdown-item>
            <el-dropdown-item command="RDP">RDP</el-dropdown-item>
            <el-dropdown-item command="VNC">VNC</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="proof-input1">
          <el-input v-model="proofAdressInput" placeholder="请输入地址"></el-input>
        </div>
        <div class="proof-input2">
          <el-input v-model="proofSourceInput" placeholder="用户名"></el-input>
        </div>
        <div class="proof-button">
          <el-button>搜索</el-button>
        </div>
        <div class="proof-table">
          <el-table
            :data="proofTableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#F2F2F2',color:'#666666'}"
            :row-style="{height:'28px'}"
            :cell-style="{padding:'8px'}"
          >
            <el-table-column prop="agreement" label="协议" width="80"></el-table-column>
            <el-table-column prop="adress" label="地址" width="200"></el-table-column>
            <el-table-column prop="port" label="端口" width="80"></el-table-column>
            <el-table-column prop="user-name" label="用户名" width="120"></el-table-column>
            <el-table-column prop="cipher" label="密钥" width="140"></el-table-column>
            <el-table-column prop="time" label="时间" width="180"></el-table-column>
            <el-table-column prop="operate" label="操作" width="192"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="cipher-manage" v-show="boxType=='5'">
        <div class="cipher-title">
          添加一个SSH密钥
          <span>在您添加密钥之前，您需要生成一个密钥或使用现有的密钥</span>
        </div>
        <div class="cipher-input1">
          密钥
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="cipherInput1"></el-input>
        </div>
        <div class="cipher-input2">
          密码(如有)
          <el-input v-model="cipherInput2" placeholder></el-input>
        </div>
        <div class="cipher-input3">
          标题
          <el-input v-model="cipherInput3" placeholder></el-input>
        </div>
        <div class="cipher-button">
          <el-button type="primary">确定</el-button>
        </div>
        <div class="cipher-footer">您的SSH密钥</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      input: "",
      command: "请选择",
      ipTableData: [],
      currentPage: 1,
      pageSize: 10,
      currentTotal: null,
      tableData: [],
      ipInput: "",
      boxType: "1",
      connectCommand: "请选择协议",
      connectAdressInput: "",
      connectSourceInput: "",
      connectTableData: null,
      fortCommand: "请选择协议",
      fortAdressInput: "",
      fortSourceInput: "",
      fortTableData: null,
      proofCommand: "请选择协议",
      proofAdressInput: "",
      proofSourceInput: "",
      proofTableData: null,
      cipherInput1: "",
      cipherInput2: "",
      cipherInput3: "",
      sessionCode: ""
    };
  },
  created() {
    this.dealSession();
    this.getTableData();
  },
  methods: {
    // header method
    dropDown() {
      this.flag = true;
    },
    unDropDown() {
      this.flag = false;
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
    // el-menu method
    handleSelect(key) {
      this.boxType = key;
    },
    // login-record method
    getTableData() {
      this.$axios({
        url: "login/next/connect-manage",
        methods: "get",
        params: { number: this.sessionCode }
      })
        .then(res => {
          this.ipTableData = res.data.table;
          this.currentTotal = Object.keys(this.ipTableData).length;
          this.resetTableData();
        })
        .catch(() => this.catchError());
    },
    searchClick() {
      this.resetTableData();
      if (this.command == "失败") {
        this.judgeTableData("登录成功");
      }
      if (this.command == "成功") {
        this.judgeTableData("登录失败");
      }
      if (this.ipInput.replace(/\s+/g, "") != "") {
        this.judgeTableData(this.ipInput, "!=");
      }
      this.currentTotal = this.tableData.length;
    },
    handleCommand(command) {
      this.command = command;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.resetTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.resetTableData();
    },
    resetTableData() {
      this.tableData = this.ipTableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    judgeTableData(searchWord, sign = "==") {
      switch (sign) {
        case "==":
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].type == searchWord) {
              this.tableData.splice(i, 1);
            }
          }
          break;
        case "!=":
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].ip != searchWord) {
              this.tableData.splice(i, 1);
            }
          }
      }
    },
    // connect-record method
    handleConnectCommand(command) {
      this.connectCommand = command;
    },
    //fort-machine-record method
    handlefortCommand(command) {
      this.fortCommand = command;
    },
    //connect-proof-record method
    handleProofCommand(command) {
      this.fortCommand = command;
    }
  },
  watch: {
    command: function() {
      if (this.command == "请选择") {
        this.$refs.link.style.color = "#ccc";
      } else {
        this.$refs.link.style.color = "#000";
      }
    }
  }
};
</script>

<style lang="scss">
#connect-manage {
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
        // display: none;
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
  .connect-title {
    width: 1260px;
    height: 41px;
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: 0 24px;
    position: relative;
    top: 60px;
    left: 100px;
    line-height: 41px;
    border: 1px solid #dcdfe6;
    border-bottom: none;
  }
  .el-col {
    margin: 60px 100px;
    margin-right: 24px;
    width: 240px;
    background-color: #f6f8f9;
    height: 145px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    .el-menu-item {
      background-color: #f6f8f9;
      border-left: 1px solid #dcdfe6;
    }
    .el-menu-item:hover:not(.is-active) {
      background-color: rgba(0, 0, 0, 0.7);
      color: #ffffff;
      border-left: 6px solid #009688;
      transition: border 0.3s ease-in-out 0.1s;
    }
    .is-active {
      background-color: #ffffff;
    }
    ul {
      margin: 24px 0;
      background-color: #f6f8f9;
    }
  }
  .content-box {
    width: 1070px;
    height: 680px;
    background-color: #fff;
    position: relative;
    top: 60px;
    left: 339px;
    border: 1px solid #dcdfe6;
    border-left: none;
    .login-record {
      .el-dropdown {
        position: absolute;
        top: 50px;
        left: 20px;
        width: 236px;
        height: 36px;
        background-color: #fff;
        font-size: 16px;
        line-height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: inline-block;
        i {
          margin-left: 150px;
          vertical-align: middle;
        }
      }
      .ip-input {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 50px;
        left: 266px;
      }
      .ip-button {
        position: absolute;
        top: 50px;
        left: 482px;
        button {
          background-color: #009688;
          width: 64px;
          height: 38px;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
      .ip-table {
        position: absolute;
        top: 100px;
        left: 20px;
      }
      .el-dropdown {
        position: absolute;
        top: 50px;
        left: 20px;
        width: 236px;
        height: 36px;
        background-color: #fff;
        font-size: 16px;
        line-height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: inline-block;
        i {
          margin-left: 150px;
          vertical-align: middle;
        }
      }
      .ip-input {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 50px;
        left: 266px;
      }
      .ip-button {
        position: absolute;
        top: 50px;
        left: 482px;
        button {
          background-color: #009688;
          width: 64px;
          height: 38px;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
      .ip-table {
        position: absolute;
        top: 100px;
        left: 20px;
      }
    }
    .connect-record {
      .connect-explain {
        width: 1000px;
        height: 21px;
        position: absolute;
        top: 50px;
        left: 20px;
        font-size: 16px;
      }
      .el-dropdown {
        position: absolute;
        top: 80px;
        left: 20px;
        width: 236px;
        height: 36px;
        background-color: #fff;
        font-size: 16px;
        line-height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: inline-block;
        i {
          margin-left: 150px;
          vertical-align: middle;
        }
      }
      .connect-input1 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 80px;
        left: 282px;
      }
      .connect-input2 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 80px;
        left: 498px;
      }
      .connect-button {
        position: absolute;
        top: 81px;
        left: 715px;
        button {
          background-color: #009688;
          width: 64px;
          height: 38px;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
      .connect-table {
        position: absolute;
        left: 20px;
        top: 128px;
      }
    }
    .fort-machine-record {
      .fort-explain {
        width: 1000px;
        height: 21px;
        position: absolute;
        top: 50px;
        left: 20px;
        font-size: 16px;
      }
      .el-dropdown {
        position: absolute;
        top: 80px;
        left: 20px;
        width: 236px;
        height: 36px;
        background-color: #fff;
        font-size: 16px;
        line-height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: inline-block;
        i {
          margin-left: 150px;
          vertical-align: middle;
        }
      }
      .fort-input1 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 80px;
        left: 282px;
      }
      .fort-input2 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 80px;
        left: 498px;
      }
      .fort-button {
        position: absolute;
        top: 81px;
        left: 715px;
        button {
          background-color: #009688;
          width: 64px;
          height: 38px;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
      .fort-table {
        position: absolute;
        left: 20px;
        top: 128px;
      }
    }
    .connect-proof {
      .el-dropdown {
        position: absolute;
        top: 70px;
        left: 20px;
        width: 236px;
        height: 36px;
        background-color: #fff;
        font-size: 16px;
        line-height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: inline-block;
        i {
          margin-left: 150px;
          vertical-align: middle;
        }
      }
      .proof-input1 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 70px;
        left: 282px;
      }
      .proof-input2 {
        display: inline-block;
        width: 206px;
        height: 46px;
        position: absolute;
        top: 70px;
        left: 498px;
      }
      .proof-button {
        position: absolute;
        top: 71px;
        left: 715px;
        button {
          background-color: #009688;
          width: 64px;
          height: 38px;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
      .proof-table {
        position: absolute;
        left: 20px;
        top: 118px;
      }
    }
    .cipher-manage {
      .cipher-title {
        width: 1000px;
        height: 24px;
        font-size: 19px;
        font-weight: 400;
        position: absolute;
        top: 50px;
        left: 50px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eed;
        span {
          display: inline-block;
          margin-left: 16px;
          font-size: 14px;
          color: #1b9ef3;
        }
      }
      .cipher-input1 {
        position: absolute;
        top: 100px;
        left: 80px;
        textarea {
          width: 490px;
          height: 100px;
          margin-left: 50px;
          margin-top: -28px;
        }
      }
      .cipher-input2 {
        position: absolute;
        top: 212px;
        left: 39px;
        .el-input {
          margin-left: 91px;
          position: relative;
          top: -28px;
          .el-input__inner {
            width: 890px;
            height: 38px;
          }
        }
      }
      .cipher-input3 {
        position: absolute;
        top: 262px;
        left: 80px;
        .el-input {
          margin-left: 50px;
          position: relative;
          top: -28px;
          .el-input__inner {
            width: 890px;
            height: 38px;
          }
        }
      }
      .cipher-button {
        position: absolute;
        top: 300px;
        left: 950px;
        .el-button {
          width: 64px;
          height: 38px;
          padding: 12px 0;
        }
      }
      .cipher-footer {
        position: absolute;
        top: 400px;
        left: 50px;
        width: 1000px;
        font-size: 19px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eed;
      }
    }
  }
  .el-pagination__total {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>