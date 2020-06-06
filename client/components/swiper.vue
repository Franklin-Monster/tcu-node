<template>
  <div id="Swiper">
    <div class="swiper-img">
      <div class="img">
        <img :src="imgData[0]" alt ref="img" />
      </div>
      <div class="swiper-index">
        <li
          class="index"
          :class="{'active':index==1}"
          @mouseover="img1Over"
          @mouseout="mouseOutMethod"
          ref="index1"
        >1</li>
        <li
          class="index"
          :class="{'active':index==2}"
          @mouseover="img2Over"
          @mouseout="mouseOutMethod"
          ref="index2"
        >2</li>
        <li
          class="index"
          :class="{'active':index==3}"
          @mouseover="img3Over"
          @mouseout="mouseOutMethod"
          ref="index3"
        >3</li>
        <li
          class="index"
          :class="{'active':index==4}"
          @mouseover="img4Over"
          @mouseout="mouseOutMethod"
          ref="index4"
        >4</li>
        <li
          class="index"
          :class="{'active':index==5}"
          @mouseover="img5Over"
          @mouseout="mouseOutMethod"
          ref="index5"
        >5</li>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from "../assets/img/swiper1.jpg";
import img2 from "../assets/img/swiper2.jpg";
import img3 from "../assets/img/swiper3.jpg";
import img4 from "../assets/img/swiper4.jpg";
import img5 from "../assets/img/swiper5.jpg";
export default {
  data() {
    return {
      imgData: [img1, img2, img3, img4, img5],
      index: 0,
      timer: null
    };
  },
  mounted() {
    this.ChangeImg(), this.timerChangeImg();
  },
  methods: {
    mouseOutMethod() {
      this.timer = setInterval(this.ChangeImg, 2000);
    },
    img1Over() {
      this.$refs.img.src = img1;
      this.index = 1;
      clearInterval(this.timer);
    },
    img2Over() {
      this.$refs.img.src = img2;
      this.index = 2;
      clearInterval(this.timer);
    },
    img3Over() {
      this.$refs.img.src = img3;
      this.index = 3;
      clearInterval(this.timer);
    },
    img4Over() {
      this.$refs.img.src = img4;
      this.index = 4;
      clearInterval(this.timer);
    },
    img5Over() {
      this.$refs.img.src = img5;
      this.index = 5;
      clearInterval(this.timer);
    },
    ChangeImg() {
      if (this.index <= this.imgData.length - 1) {
        this.$refs.img.src = this.imgData[this.index];
        this.index++;
      } else {
        this.index = 0;
        return this.ChangeImg();
      }
    },
    timerChangeImg() {
      this.timer = setInterval(this.ChangeImg, 2000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.timer);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#Swiper {
  text-align: center;
  .swiper-img {
    position: relative;
    .img {
      img {
        width: 1000px;
        height: 320px;
      }
    }
  }
  .swiper-index {
    position: absolute;
    top: 90%;
    left: 77%;
    .index {
      width: 12px;
      height: 12px;
      font-size: 9.6px;
      background-color: #f0f0f0;
      display: inline-block;
      margin: 2px;
    }
  }
}
.active {
  background-color: #e9967a !important;
  color: red;
  cursor: pointer;
}
</style>