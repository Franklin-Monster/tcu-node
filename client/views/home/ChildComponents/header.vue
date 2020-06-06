<template>
  <div id="home-header">
    <img class="logo-img" src="../../../assets/img/logo.jpg" alt />
    <img class="logo-word" src="../../../assets/img/logo_word.jpg" alt />
    <div class="split-line"></div>
    <div class="more">
      <div class="english">English</div>
      <div class="telephone">手机版</div>
    </div>
    <div class="email">
      <div class="email-img">
        <img src="../../../assets/img/EMAIL.jpg" alt />
      </div>
      <div class="email-word">校长信箱</div>
    </div>
    <div class="header-nav">
      <tr>
        <td>
          <span>首页</span>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overNav" @mouseleave="outNav">
            <span>学校概况</span>
            <div class="li" ref="school" @mouseenter="overNav" @mouseleave="outNav">
              <li>学校简介</li>
              <li>现任领导</li>
              <li>大学章程</li>
              <li>校标校训</li>
              <li>校园风光</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overOrgan" @mouseleave="outOrgan">
            <span>机构设置</span>
            <div class="li" ref="organ" @mouseenter="overOrgan" @mouseleave="outOrgan">
              <li>教学单位</li>
              <li>职能部门</li>
              <li>群众组织</li>
              <li>直属机构</li>
              <li>研发机构</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overCourse" @mouseleave="outCourse">
            <span>学科建设</span>
            <div class="li" ref="course" @mouseenter="overCourse" @mouseleave="outCourse">
              <li>概况</li>
              <li>学位授权学科</li>
              <li>重点学科</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <span>公开招聘</span>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overEducate" @mouseleave="outEducate">
            <span>教育教学</span>
            <div class="li" ref="educate" @mouseenter="overEducate" @mouseleave="outEducate">
              <li>本科教育</li>
              <li>研究生教育</li>
              <li>继续教育</li>
              <li>留学生教育</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overScience" @mouseleave="outScience">
            <span>科学研究</span>
            <div class="li" ref="science" @mouseenter="overScience" @mouseleave="outScience">
              <li>概况</li>
              <li>科研机构</li>
              <li>城建学报</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overEnroll" @mouseleave="outEnroll">
            <span>招生就业</span>
            <div class="li" ref="enroll" @mouseenter="overEnroll" @mouseleave="outEnroll">
              <li>招生工作</li>
              <li>就业工作</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overCooperate" @mouseleave="outCooperate">
            <span>合作交流</span>
            <div class="li" ref="cooperate" @mouseenter="overCooperate" @mouseleave="outCooperate">
              <li>国际交流处</li>
              <li>国际教育学院</li>
            </div>
          </div>
        </td>
        <img src="../../../assets/img/dhbj.jpg" alt />
        <td>
          <div class="school" @mouseover="overService" @mouseleave="outService">
            <span>服务指南</span>
            <div
              class="li service"
              ref="service"
              @mouseenter="overService"
              @mouseleave="outService"
            >
              <li>交通方位</li>
              <li>校园地图</li>
              <li>城建校历</li>
              <li>电话查询</li>
            </div>
          </div>
        </td>
      </tr>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    overNav() {
      this.$refs.school.style.display = "block";
    },
    outNav() {
      this.$refs.school.style.display = "none";
    },
    overOrgan() {
      this.$refs.organ.style.display = "block";
    },
    outOrgan() {
      this.$refs.organ.style.display = "none";
    },
    overCourse() {
      this.$refs.course.style.display = "block";
    },
    outCourse() {
      this.$refs.course.style.display = "none";
    },
    overEducate() {
      this.$refs.educate.style.display = "block";
    },
    outEducate() {
      this.$refs.educate.style.display = "none";
    },
    overScience() {
      this.$refs.science.style.display = "block";
    },
    outScience() {
      this.$refs.science.style.display = "none";
    },
    overEnroll() {
      this.$refs.enroll.style.display = "block";
    },
    outEnroll() {
      this.$refs.enroll.style.display = "none";
    },
    overCooperate() {
      this.$refs.cooperate.style.display = "block";
    },
    outCooperate() {
      this.$refs.cooperate.style.display = "none";
    },
    overService() {
      this.$refs.service.style.display = "block";
    },
    outService() {
      this.$refs.service.style.display = "none";
    }
  }
};
</script>

<style lang="scss" scoped>
#home-header {
  padding: 0;
  margin: 0;
  background-color: #003c7b;
  width: 1536px;
  height: 140px;
  text-align: center;
  position: relative;
  overflow: visible !important;

  .logo-img {
    width: 344px;
    height: 96px;
    position: relative;
    right: 95px;
  }

  .logo-word {
    width: 450px;
    height: 96px;
  }

  .more {
    width: 100%;
    font-size: 12px;
    font-family: "微软雅黑";
    color: #ffffff;
    padding-top: 5px;
    position: absolute;
    top: 6%;
    left: 28%;
  }

  .email {
    position: absolute;
    top: 54%;
    left: 76%;

    .email-img {
      display: inline-block;
      img {
        width: 21px;
        height: 21px;
      }
    }

    .email-word {
      display: inline-block;
      font-size: 12px;
      color: #ffffff;
      font-family: "微软雅黑";
    }
  }

  .split-line {
    background-color: #7495b9;
    height: 2px;
    width: 1000px;
    margin: 0 auto;
  }

  .header-nav {
    font-size: 14px;
    color: #ffffff;
    font-weight: bold;
    font-family: "宋体";
    letter-spacing: 1px;
    width: 100%;
    height: 25px;
    position: absolute;
    left: 18%;
    span:hover {
      cursor: pointer;
      color: red;
    }

    .li {
      position: absolute;
      display: none;
      z-index: 999;
      li:hover {
        cursor: pointer;
        color: red;
      }
      li {
        width: 100px;
        height: 28px;
        font-weight: bold;
        background-color: #23568d;
        padding: 0 5px;
        display: inline-block;
        border-top-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-style: solid;
        border-right-color: rgb(12, 11, 11, 0.5);
        margin-bottom: -5px;
      }
    }

    td {
      display: inline-block;
      padding: 0 15px;
      line-height: 30px;
      padding-bottom: 5px;
      vertical-align: top;
    }

    img {
      margin-top: 5px;
    }

    .service {
      margin-left: -380px;
    }
  }
}
</style>