<template>
  <div class="layui-container" style="width:100%" v-if="notDel">
    <fieldset class="layui-elem-field layui-field-title" style="margin: 5px;"></fieldset>
    <div class="layui-row">
      <div class="layui-col-xs1">
        <div style="background-color:red;height:100%">
          <label ref="from" @click="changeParentTo"></label>
        </div>
      </div>
      <div class="layui-col-xs1">
        <div style="background-color:red;height:100%">
          @
          <label ref="to"></label>:
        </div>
      </div>
      <div class="layui-col-xs9">
        <div style="background-color:blue;height:100%">
          <p ref="content"></p>
        </div>
      </div>
      <div class="layui-col-xs1">
        <label style="margin-left:25px" v-if="ismine" @click="deleteComment">ㄨ</label>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
export default {
  data() {
    return {
      ismine: false,
      notDel: true
    };
  },
  props: {
    comment: Object
  },
  name: "aComment",
  mounted() {
    this.fillaComment(this.comment);
  },
  methods: {
    fillaComment: function(comment) {
      this.ismine = false;
      $(this.$refs.from).text(comment.from);
      $(this.$refs.to).text(comment.to);
      $(this.$refs.content).text(comment.content);
      this.ismine = this.comment.fromusername == getCookie("username");
    },
    changeParentTo: function(event) {
      event.stopPropagation(); // 阻止点击事件冒泡
      var dom = event.target;
      this.$parent.newComment(this.comment.from, this.comment.fromusername);
    },
    deleteComment: function(event) {
      event.stopPropagation(); // 阻止点击事件冒泡
      var json = {
        sessionid: getCookie("sessionid"),
        commentid: this.comment.commentid
      };

      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/friendcircle/deletecomment/",
          JSON.stringify(json)
          // {headers:{'SESSIONID':getCookie('sessionid')}},{emulateJSON: true}
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("删除评论成功！", {
                  icon: 1,
                  time: 2000
            });
            this.notDel = false;
          } else {
            layer.msg("删除评论失败！", {
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
</style>