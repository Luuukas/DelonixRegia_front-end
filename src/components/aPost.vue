<template>
  <div class="layui-container">
    <div class="layui-row">
      <div class="layui-col-xs1" style="height:70px">
        <div style="background-color:red;height:100%">
          <img ref="img_url" alt="fail" style="height:70px;width:70px" />
        </div>
      </div>
      <div class="layui-col-xs11" style="height:70px">
        <div style="background-color:blue;height:50%">
          <label ref="name_lab"></label>
        </div>
        <div style="background-color:yellow;height:50%">
          <label ref="time_lab"></label>
        </div>
      </div>
    </div>
    <div class="layui-row" style="height:70px">
      <div style="background-color:grey;height:100%">
        <h1 ref="title"></h1>
      </div>
    </div>
    <div>
      <div class="layui-colla-item">
        <h2 class="layui-colla-title arrow_toright">内容</h2>
        <div class="layui-colla-content">
          <p ref="content"></p>
        </div>
      </div>
      <div class="layui-colla-item">
        <h2 class="layui-colla-title arrow_toright">图片</h2>
        <div class="layui-colla-content">
          <PMPs ref="pmps"></PMPs>
        </div>
      </div>
      <div class="layui-colla-item">
        <h2 class="layui-colla-title arrow_toright">
          评论
          <label style="float:right;margin-right:10px" @click="defaultNewComment">✚</label>
          <label style="float:right;margin-right:10px" @click="onlyRefreshComs">↺</label>
        </h2>
        <div class="layui-colla-content" v-if="comsRefresh">
          <aCom v-for="(comment,index) in post.comments" :key="index" :comment="comment"></aCom>
        </div>
      </div>
    </div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;"></fieldset>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import aCom from "./aComment";
import PMPs from "./PreviewMultiPics";
export default {
  data() {
    return {
      owner: this.post.owner,
      comsRefresh: true
    };
  },
  props: {
    post: Object
  },
  components: {
    aCom,
    PMPs
  },
  mounted() {
    this.fillaPost(this.post);
    $(".layui-colla-item").on("click", this.switchState);
  },
  methods: {
    fillaPost: function(post) {
      this.$refs.pmps.preview(post.pics_url);
      $(this.$refs.img_url).attr("src", post.img_url);
      $(this.$refs.name_lab).text(post.name_lab);
      $(this.$refs.time_lab).text(post.time_lab);
      $(this.$refs.title).text(post.title);
      $(this.$refs.content).text(post.content);
    },
    defaultNewComment: function(event) {
      event.stopPropagation(); // 阻止点击事件冒泡
      this.newComment(this.post.name_lab, this.owner);
    },
    newComment: function(to,tousername) {
      let this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "发表评论",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          "<label>@" +
          to +
          "</label>" +
          "</div>" +
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<textarea placeholder="请输入内容" id="comment_content"></textarea>' +
          "</div>",
        btn: ["发送", "取消"],
        btn1: function(index, layero) {
          var json = {
            sessionid: getCookie("sessionid"),
            postid: this_vue.post.post_id,
            poster_name: tousername,
            content: $("#comment_content").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl +
                "/friendcircle/uploadcomment/",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.data;
              if (res.msg == "true") {
                this.onlyRefreshComs();
                layer.close(index);
                layer.msg("发布评论成功！", {
                  icon: 1,
                  time: 2000
                });
              } else {
                layer.msg("发布评论失败！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    switchState: function(event) {
      var dom = event.currentTarget;
      var swi = $(dom).find(".layui-colla-content")[0];
      var h2t = $(dom).find(".layui-colla-title")[0];
      if ($(swi).css("display") == "none") {
        $(swi).css("display", "block");
        $(h2t).removeClass("arrow_toright");
        $(h2t).addClass("arrow_todown");
      } else {
        $(swi).css("display", "none");
        $(h2t).removeClass("arrow_todown");
        $(h2t).addClass("arrow_toright");
      }
    },
    refreshComs: function() {
      // 移除组件
      this.comsRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.comsRefresh = true;
      });
    },
    onlyRefreshComs: function() {
      var json = {
        sessionid: getCookie("sessionid"),
        postid: this.post.post_id
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/friendcircle/getpostcomments/",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("刷新评论成功！", {
              icon: 1,
              time: 2000
            });
            this.post.comments = res.comments;
            this.refreshComs();
          } else {
            layer.msg("刷新评论失败！", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
</script>

<style scoped>
@import "../../static/layui/css/layui.css";
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
.layui-colla-content {
  padding-top: 0;
  padding-bottom: 0;
}
</style>