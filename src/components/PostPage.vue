<template>
  <div id="ppg" class="layui-container" style="height:100%;width:100%">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend @click="refresh">Refresh</legend>
    </fieldset>
    <div v-if="postsRefresh">
      <aP v-for="(post,index) in posts" :key="index" :post="post"></aP>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import aP from "./aPost";
export default {
  data() {
    return {
      postsRefresh: true,
      // posts: [
      //   {
      //     pics_url: [
      //       "../../static/pics/137685.jpg",
      //       "../../static/pics/953900.jpg",
      //       "../../static/pics/997073.png"
      //     ],
      //     img_url: "../../static/pics/137685.jpg",
      //     name_lab: "Luuukas",
      //     time_lab: "2019-08-29",
      //     title: "表扬一下自己",
      //     content: "我真的好棒棒啊！",
      //     comments: [
      //       {
      //         from: "Jack1",
      //         to: "Luuukas",
      //         content: "I agree with you!"
      //       }
      //     ],
      //     owner: "Luuukas1"
      //   }
      // ]
      posts : []
    };
  },
  components: {
    aP
  },
  // created() {
  //   var json = {
  //     sessionid: getCookie("sessionid")
  //   };
  //   this.$http
  //     .post(
  //       this.$store.getters.getBaseUrl + "/friendcircle/getallpost/",
  //       JSON.stringify(json)
  //     )
  //     .then(res => {
  //       res = res.data;
  //       if (res.msg == "true") {
  //         // this.posts= res.allpost;
  //         console.log(this.posts);
  //         // this.refreshResumeList();
  //       } else {
  //         layer.msg("获取动态失败！", {
  //           icon: 2,
  //           time: 2000
  //         });
  //       }
  //     });
  // },
  mounted() {
    var json = {
      sessionid: getCookie("sessionid")
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl + "/friendcircle/getallpost/",
        JSON.stringify(json)
      )
      .then(res => {
        res = res.data;
        if (res.msg == "true") {
          this.posts = res.allpost;
          this.refreshPosts();
        } else {
          layer.msg("获取动态失败！", {
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
    refreshPosts: function() {
      // 移除组件
      this.postsRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.postsRefresh = true;
      });
    }
  }
};
</script>

<style scoped>
</style>