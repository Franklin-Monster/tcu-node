<template>
  <div id="horse-race-lamp">
    <div class="race-item" @mouseover="overItem" @mouseout="outItem">
      <div class="race-img" v-for="(item,index) in imgArr" :key="index">
        <img :src="item.src" alt ref="img" />
      </div>
      <div class="race-title" v-for="item in raceData" :key="item.title" ref="title">{{item.title}}</div>
      <div class="race-content" v-for="item in raceData" :key="item.content" ref="content">
        <div class="block"></div>
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
import raceData from "../static/race.json";
export default {
  data() {
    return {
      imgArr: [
        { index: 1, src: require("../assets/img/home-link-race1.jpg") },
        { index: 2, src: require("../assets/img/home-link-race2.jpg") },
        { index: 3, src: require("../assets/img/home-link-race3.jpg") }
      ],
      imgRight: 0,
      wordRight: -174,
      img1Right: 0,
      word1Right: -174,
      raceData,
      timer: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.startRace();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    startRace() {
      this.timer = setInterval(this.itemChanged, 24);
      // this.$once("hook:beforeDestroy",()=>{
      //   clearInterval(this.timer)
      // })
    },
    pauseRace() {
      clearInterval(this.timer);
    },
    itemChanged() {
      if (this.$refs.img) {
        this.$refs.img[0].style.right = this.img1Right + "px";
        this.$refs.title[0].style.right = this.word1Right + "px";
        this.$refs.content[0].style.right = this.word1Right + "px";
        for (let i = 1; i < this.imgArr.length; i++) {
          this.$refs.img[i].style.right = this.imgRight + "px";
          this.$refs.title[i].style.right = this.wordRight + "px";
          this.$refs.content[i].style.right = this.wordRight + "px";
        }
        if (this.imgRight == 1000) {
          this.img1Right = -500;
          this.word1Right = -674;
        }
        this.img1Right += 1;
        this.word1Right += 1;

        if (this.imgRight < 1500) {
          this.imgRight += 1;
          this.wordRight += 1;
        } else {
          this.imgRight = 0;
          this.wordRight = -174;
        }
      }
    },
    overItem() {
      this.pauseRace();
    },

    outItem() {
      this.startRace();
    }
  },
  watch: {
    imgRight: function pauseItemChanged() {
      if (this.imgRight == 0 || this.imgRight == 500 || this.imgRight == 1000) {
        this.pauseRace();
        setTimeout(() => {
          this.startRace();
        }, 2000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#horse-race-lamp {
  .race-item:hover {
    cursor: pointer;
  }
  .race-item {
    width: 1500px;
    height: 110px;

    .race-img {
      display: inline-block;
      img {
        width: 170px;
        height: 108px;
        position: relative;
        margin-right: 328px;
      }
    }

    .race-title {
      width: 260px;
      font-size: 14px;
      padding-bottom: 8px;
      font-weight: bold;
      display: inline-block;
      position: relative;
      color: #0000ee;
      bottom: 112px;
      right: -174px;
      margin-right: 234px;
    }

    .race-content {
      font-size: 12px;
      line-height: 18px;
      width: 320px;
      height: 100px;
      display: inline-block;
      position: relative;
      bottom: 116px;
      right: -174px;
      margin-right: 178px;
    }
  }
}
</style>