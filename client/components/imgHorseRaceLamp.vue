<template>
  <div id="img-horse-race-lamp">
    <div class="img-wrapper">
      <div class="block1" ref="block1">
        <img src="../assets/img/home-link-right1.png" alt />
        <img src="../assets/img/home-link-right2.jpg" alt />
        <img src="../assets/img/home-link-right3.png" alt />
        <img src="../assets/img/home-link-right4.jpg" alt />
      </div>
      <div class="block2" ref="block2">
        <img src="../assets/img/home-link-right5.jpg" alt />
        <img src="../assets/img/home-link-right6.jpg" alt />
        <img src="../assets/img/home-link-right4.jpg" alt />
        <img src="../assets/img/home-link-right1.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      block1Right: 0,
      block2Right: 0,
      timer: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.startBlockChanged();
    }, 2000);
  },
  beforeDestroy() {
      clearInterval(this.timer);
  },
  methods: {
    blockChanged() {
    if(this.$refs.block1){
        this.$refs.block1.style.right = this.block1Right + "px";
      this.$refs.block2.style.right = this.block2Right + "px";
      this.block1Right += 1;
      this.block2Right += 1;
      if (this.block1Right > 272) {
        this.block1Right = -262;
      }
      if (this.block2Right > 532) {
        this.block2Right = 0;
      }
    }
    },
    startBlockChanged() {
      this.timer = setInterval(this.blockChanged, 2);
      // this.$once("hook:beforeDestroy", () => {
      //   clearInterval(this.timer);
      // });
    }
  },
  watch: {
    block1Right: function pauseBlock() {
      if (this.block1Right == -262 || this.block1Right == 0) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.startBlockChanged();
        }, 2400);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#img-horse-race-lamp {
  .img-wrapper {
    width: 1000px;
    height: 100px;
    .block1,
    .block2 {
      display: inline-block;
      width: 262px;
      height: 80px;
      margin: 5px;
      position: relative;
    }
    img {
      width: 131px;
      height: 40px;
    }
  }
}
</style>