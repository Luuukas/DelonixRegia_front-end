<template>
  <dd v-if="showme">
    <a @click="routerTo">
      {{this.info.name}}
      <label style="float:right;margin-right:20px" @click="delResume">x</label>
    </a>
  </dd>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
export default {
  data() {
    return {
      showme: true
    };
  },
  props: {
    info: Object
  },
  methods: {
    routerTo() {
      this.$router.push({
        path: "ViewResume",
        query: {
          resumeUrl: this.info.url
        }
      });
    },
    delResume: function(event) {
      event.stopPropagation(); // 阻止点击事件冒泡
      var json = {
        sessionid: getCookie("sessionid"),
        url: this.info.url
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/user/deleteresume/",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("删除成功！", {
              icon: 1,
              time: 2000
            });
            this.showme = false;
          } else {
            layer.msg("删除失败！", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
layui.use(["form", "layedit", "laydate"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
});
</script>

<style scoped>
@import "../../static/layui/css/layui.css";
</style>