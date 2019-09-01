<template>
  <div id="hpg" class="layui-container" style="height:100%;width:100%">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend @click="refresh">Refresh</legend>
    </fieldset>
    <div v-if="hiresRefresh">
      <aH v-for="(info,index) in infos" :key="index" :info="info"></aH>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import aH from "./aHire";
export default {
  data() {
    return {
      hiresRefresh: true,
      // infos: [
      //   {
      //     img_url: "../../static/pics/137685.jpg",
      //     name_lab: "苏州博济园电子有限公司",
      //     time_lab: "2019-08-29",
      //     title: "急聘普工技工仓管，包吃住，工作轻",
      //     salary_lo: "5500",
      //     salary_hi: "9500",
      //     edu_require: "不限",
      //     exp_require: "不限",
      //     want_num: "不限",
      //     description: "职位描述",
      //     place: "高新区泰山路2号（博济科技园）",
      //     detail_url: "https://www.baidu.com"
      //   }
      // ]
      infos : []
    };
  },
  components: {
    aH
  },
  mounted() {
    var json = {
      sessionid: getCookie("sessionid")
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl + "/recruit/getpost/",
        JSON.stringify(json)
      )
      .then(res => {
        res = res.data;
        if (res.msg == "true") {
          this.infos = res.allposts;
          this.refreshHires();
        } else {
          layer.msg("获取招聘失败！", {
            icon: 2,
            time: 2000
          });
        }
      });
  },
  methods: {
    refresh: function() {
      this.$parent.refreshSubPage();
    },
    refreshHires: function() {
      // 移除组件
      this.hiresRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.hiresRefresh = true;
      });
    }
  }
};
</script>

<style scoped>
</style>