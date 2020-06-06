<template>
  <div id="vpn">
    <div class="vpn-header">
      <img src="../../assets/img/vpn-logo.png" alt />
    </div>
    <div class="vpn-title">您要访问的网址由于安全和相关政策的要求已经被限制在天津城建大学校内网络访问</div>
    <div class="vpn-word">您可以通过登录天津城建大学WebVPN系统继续访问此网站</div>
    <div class="vpn-button" @click="WebvpnClick">登录WebVPN</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    WebvpnClick() {
      this.$router.push({ url: "/login/teacher", name: "teacherlogin" });
    }
  }
};
</script>

<style lang="scss" scoped>
#vpn {
  .vpn-header {
    width: 100%;
    height: 160px;
    background: -webkit-gradient(
      linear,
      0% 0%,
      0% 100%,
      from(#025494),
      to(#b6d7ee)
    );
    img {
      width: 285px;
      height: 65px;
      position: relative;
      top: 40px;
      left: 292px;
    }
  }

  .vpn-title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-family: "微软雅黑";
    color: #487b92;
    margin-top: 58px;
  }

  .vpn-word {
    text-align: center;
    font-size: 16px;
    font-family: "微软雅黑";
    margin-top: 24px;
  }

  .vpn-button {
    width: 110px;
    height: 28px;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    box-shadow: 1px 1px #888888;
    margin: 24px auto;
    border-width: 2px;
    border-style: outset;
    border-color: buttonface;
    border-radius: 10px;
  }
}
</style>