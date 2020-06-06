<template>
  <div id="home-link">
    <div class="home-link-content">
      <div class="left">
        <horseRaceLamp></horseRaceLamp>
      </div>
      <div class="middle">
        <div class="middle-title">常用链接&nbsp;>></div>
        <div class="middle-word">
          <li>
            <a @click="vpnClick">教务系统</a>
          </li>
          <li>
            <a>校园VPN</a>
          </li>
          <li>
            <a>教学平台</a>
          </li>
          <li>
            <a>校一卡通</a>
          </li>
        </div>
        <div class="middle-img">
          <li>
            <img src="../../../assets/img/home-link-middle-img1.jpg" alt />
          </li>
          <li>
            <img src="../../../assets/img/home-link-middle-img2.jpg" alt />
          </li>
          <li>
            <img src="../../../assets/img/home-link-middle-img3.jpg" alt />
          </li>
        </div>
      </div>
      <div class="right">
        <div class="right-title">专题网站&nbsp;>></div>
        <imgHorseRaceLamp></imgHorseRaceLamp>
      </div>
    </div>
  </div>
</template>

<script>
import horseRaceLamp from "../../../components/horseRaceLamp";
import imgHorseRaceLamp from "../../../components/imgHorseRaceLamp";
export default {
  data() {
    return {};
  },
  components: {
    horseRaceLamp,
    imgHorseRaceLamp
  },
  methods: {
    vpnClick() {
      this.$router.push({ url: "/vpn", name: "vpn" });
    }
  }
};
</script>

<style lang="scss" scoped>
#home-link {
  clear: both;
  width: 1008px;
  height: auto;
  margin: 0 264px;
  padding: 0;
  margin-top: 12px;
  .left {
    width: 496px;
    height: 140px;
    overflow: hidden;
    float: left;
  }
  .middle {
    width: 180px;
    height: 140px;
    // background-color: blue;
    float: left;
    margin-left: 20px;
    li {
      list-style: none;
      margin: 5px 6px;
    }
    .middle-title {
      color: #1d2088;
      font-weight: bold;
      font-size: 13px;
    }
    .middle-word {
      font-family: "微软雅黑";
      font-size: 12px;
      line-height: 150%;
      display: inline-block;
      position: relative;
      bottom: 8px;
      a:hover {
        cursor: pointer;
      }
    }
    .middle-img {
      display: inline-block;
      img {
        width: 100px;
        height: 24px;
      }
    }
  }
  .right {
    width: 272px;
    height: 140px;
    float: left;
    overflow: hidden;
    .right-title {
      color: #1d2088;
      font-weight: bold;
      font-size: 13px;
    }
  }
}
</style>