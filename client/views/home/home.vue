<template>
  <div id="home">
    <Header></Header>
    <Swiper class="swiper"></Swiper>
    <Body></Body>
    <Link></Link>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./ChildComponents/header";
import Swiper from "../../components/swiper";
import Body from "./ChildComponents/body";
import Link from "./ChildComponents/link";
import Footer from "./ChildComponents/footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Swiper,
    Body,
    Link,
    Footer
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#home {
  background: url("../../assets/img/home-body-bgc.jpg") repeat-x;
}
</style>