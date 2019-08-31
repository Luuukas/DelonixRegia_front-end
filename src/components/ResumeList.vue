<template>
  <li class="layui-nav-item">
    <a class = "arrow_toright" href="javascript:;" @click="switchState">个人简历</a>
    <dl v-show="showList" style="margin-bottom:0">
      <dd @click="newResume">
        <a href="javascript:;">添加简历</a>
      </dd>
      <div>
        <aR v-for="(info,index) in resus" :key="index" :info="info"></aR>
      </div>
    </dl>
  </li>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import aR from "./aResume";
export default {
  name: "ResumeList",
  data() {
    return {
      showList: false,
      resus: [
        {
          url: "https://www.baidu.com",
          name: "百度"
        }
      ]
    };
  },
  components: {
    aR
  },
  created() {
    var json = {
      sessionid: getCookie("sessionid")
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl + "/user/showgraresume/",
        JSON.stringify(json)
      )
      .then(res => {
        res = res.data;
        if (res.msg == "true") {
          this.$store.dispatch("asetResumes", res.resumes);
          this.resus = res.resumes;
          // this.refreshResumeList();
        } else {
          layer.msg("获取简历失败！", {
            icon: 2,
            time: 2000
          });
        }
      });
  },
  mounted() {},
  methods: {
    newResume: function() {
      this.$parent.newResume();
    },
    switchState: function(event) {
      var at = event.currentTarget;
      if (this.showList) {
        this.showList = false;
        $(at).removeClass("arrow_todown");
        $(at).addClass("arrow_toright");
      } else {
        this.showList = true;
        $(at).removeClass("arrow_toright");
        $(at).addClass("arrow_todown");
      }
    }
  }
};
</script>

<style scoped>
.arrow_toright::before {
  content: "▷";
  float: left;
  margin-right: 10px;
}
.arrow_todown::before {
  content: "▽";
  float: left;
  margin-right: 10px;
}
</style>