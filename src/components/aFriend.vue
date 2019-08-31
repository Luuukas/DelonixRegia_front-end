<template>
  <dd class="box" v-if="removeThisFriend">
    <img ref="img_url" alt="HEAD" style="height:38px;width:38px;margin:1px" />
    <i ref="gender_icon" class="layui-icon">.</i>
    <router-link to="ViewProfile">
      <a href="javascript:;" ref="name" style="width:75px">...</a>
    </router-link>
    <label style="margin-right:10px" v-if="stype==1" @click="following">☆</label>
    <label style="margin-right:10px" v-if="stype==0">ㄨ</label>
  </dd>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
export default {
  data() {
    return {
      removeThisFriend: true
    };
  },
  props: {
    info: Object,
    stype: Number
  },
  mounted() {
    this.fillaFriend(this.info);
  },
  methods: {
    fillaFriend: function(info) {
      $(this.$refs.img_url).attr("src", info.imgurl);
      if (info.gender == "F") {
        $(this.$refs.gender_icon).text("F");
      } else {
        $(this.$refs.gender_icon).text("M");
      }
      $(this.$refs.name).text(info.name);
    },
    following: function() {
      var json = {
        sessionid: getCookie("sessionid"),
        fid: this.info.id,
        text: this.$store.getters.getName + "关注了你！",
        headline: "关注"
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/user/follow/",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("关注成功！", {
              icon: 1,
              time: 2000
            });
            this.removeThisFriend = false;
          } else if(res.msg=="false"){
            layer.msg("关注失败！", {
              icon: 2,
              time: 2000
            });
          }else{
            layer.msg("会话超时！", {
              icon: 2,
              time: 2000
            });
            // window.location=this_vue.$store.getters.getBaseUrl+"/login";
            window.location = "http://127.0.0.1:8080";
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
.box {
  display: flex;
  justify-content: space-around;
}
</style>