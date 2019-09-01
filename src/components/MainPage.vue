<template>
  <div class="layui-layout layui-layout-admin">
    <!-- 发布新帖子 弹窗内容开始 -->
    <div id="newPost_background" class="back">
      <div class="newPost">
        <div id="newPost_close">
          <span id="newPost_close-button">×</span>
          <h2>详细内容</h2>
        </div>
        <div style="height:625px">
          <PF v-if="newPost_hackReset"></PF>
        </div>
        <!-- <h3 id="newPost_foot">底部内容</h3> -->
      </div>
    </div>
    <!-- 弹窗内容结束 -->

    <!-- 添加新简历 弹窗内容开始 -->
    <div id="newResume_background" class="back">
      <div class="newResume" style="border-radius:2%;box-shadow:4px 4px 10px #4d4242">
        <div id="newResume_close" style="background:#4E5465;text-align:center">
          <span id="newResume_close-button">×</span>
          <h2 style="color:#fff;">详细内容</h2>
        </div>
        <div>
          <RF v-if="newResume_hackReset"></RF>
        </div>
      </div>
    </div>
    <!-- 弹窗内容结束 -->

    <div class="layui-header">
      <div class="layui-logo">Shantou University</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <!-- <ul class="layui-nav layui-layout-left">
      <li class="layui-nav-item"><a href="">控制台</a></li>
      <li class="layui-nav-item"><a href="">商品管理</a></li>
      <li class="layui-nav-item"><a href="">用户</a></li>
      <li class="layui-nav-item">
        <a href="javascript:;">其它系统</a>
        <dl class="layui-nav-child">
          <dd><a href="">邮件管理</a></dd>
          <dd><a href="">消息管理</a></dd>
          <dd><a href="">授权管理</a></dd>
        </dl>
      </li>
      </ul>-->
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img ref="user_imgurl" alt="HEAD" class="layui-nav-img" />
            <label ref="user_name">...</label>
          </a>
          <dl class="layui-nav-child">
            <dd>
              <router-link to="EditProfile">基本资料</router-link>
            </dd>
            <dd>
              <a @click="changePW" href="javascript:;">修改密码</a>
            </dd>
          </dl>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;" @click="logout">退了</a>
        </li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree" lay-filter="test">
          <li class="layui-nav-item">
            <a href>校园动态</a>
          </li>
          <li class="layui-nav-item">
            <router-link to="/PostPage">
              好友动态
              <label style="float:right" @click="newPost">✚</label>
            </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/HirePage">招聘市场</router-link>
          </li>
          <RL v-if="resuRefresh"></RL>
          <FL :list_name="follow_list" v-if="follRefresh"></FL>
          <FL :list_name="followed_list" v-if="foedRefresh"></FL>
        </ul>
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <div style="padding: 15px;height:96%" v-if="subpRefresh">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>

    <div class="layui-footer">
      <!-- 底部固定区域 -->
      © layui.com - 底部固定区域
    </div>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import PF from "./PostForm";
import FL from "./FollowList";
import RL from "./ResumeList";
import RF from "./ResumeForm";
export default {
  name: "HelloWorld",
  components: {
    PF,
    FL,
    RL,
    RF
  },
  data() {
    return {
      newPost_hackReset: true,
      newResume_hackReset: true,
      follow_list: "关注列表",
      followed_list: "被关注列表",
      subpRefresh: true,
      resuRefresh: true,
      follRefresh: true,
      foedRefresh: true,
      showHeadAddition: false
    };
  },
  mounted() {
    var newPost_div = document.getElementById("newPost_background");
    var newPost_close = document.getElementById("newPost_close-button");

    newPost_close.onclick = function close() {
      newPost_div.style.display = "none";
    };

    window.onclick = function close(e) {
      if (e.target == newPost_div) {
        newPost_div.style.display = "none";
      }
    };

    var newResume_div = document.getElementById("newResume_background");
    var newResume_close = document.getElementById("newResume_close-button");

    newResume_close.onclick = function close() {
      newResume_div.style.display = "none";
    };

    window.onclick = function close(e) {
      if (e.target == newResume_div) {
        newResume_div.style.display = "none";
      }
    };
    var json = {
      sessionid: getCookie("sessionid"),
      identity: getCookie("identity")
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl + "/user/get_profile/",
        JSON.stringify(json)
      )
      .then(res => {
        res = res.data;
        if (res.msg == "true") {
          this.$store.dispatch("asetId", res.user_id);
          this.$store.dispatch("asetImgUrl", res.imgurl);
          this.$store.dispatch("asetIdentity", res.identity);
          $(this.$refs.user_imgurl).attr("src", res.imgurl);
          $(this.$refs.user_name).text(res.name);
          layer.msg("欢迎回来 " + res.name, {
            icon: 1,
            time: 2000
          });
        } else {
          layer.msg("登陆超时，请重新登陆！", {
            icon: 2,
            time: 2000
          });
          // window.location=this_vue.$store.getters.getBaseUrl+"/login";
          window.location = "http://127.0.0.1:8080";
        }
      });
  },
  updated() {
    layui.use("element", function() {
      var element = layui.element;
    });
  },
  methods: {
    newPost: function() {
      var newPost_div = document.getElementById("newPost_background");
      newPost_div.style.display = "block";
    },
    newResume: function() {
      var newResume_div = document.getElementById("newResume_background");
      newResume_div.style.display = "block";
    },
    resetNewPost: function() {
      // 移除组件
      this.newPost_hackReset = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.newPost_hackReset = true;
      });
    },
    resetNewResume: function() {
      // 移除组件
      this.newResume_hackReset = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.newResume_hackReset = true;
      });
    },
    refreshSubPage: function() {
      // 移除组件
      this.subpRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.subpRefresh = true;
      });
    },
    refreshResu: function() {
      console.log("You got it!");
      // 移除组件
      this.resuRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.resuRefresh = true;
      });
    },
    refreshFoll: function() {
      // 移除组件
      this.follRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.follRefresh = true;
      });
    },
    refreshFoed: function() {
      // 移除组件
      this.foedRefresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.foedRefresh = true;
      });
    },
    changePW: function() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "修改密码",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">用户名：</span>' +
          '<input id="logname" class="form-control" placeholder="请输入该账号登陆时用的用户名">' +
          "</div>" +
          "</div>" +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">旧密码：</span>' +
          '<input id="opw" type="password" class="form-control" placeholder="请输入正在使用的密码">' +
          "</div>" +
          "</div>" +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">新密码：</span>' +
          '<input id="npw" type="password" class="form-control" placeholder="请输入想要换成的密码">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["确定", "取消"],
        btn1: function(index, layero) {
          console.log("aaaa");
          var json = {
            username: $("#logname").val(),
            oldpassword: $("#opw").val(),
            newpassword: $("#npw").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/user/changepas/",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.data;
              if (res.msg == "true") {
                layer.msg("密码修改成功！", {
                  icon: 1,
                  time: 2000
                });
              } else {
                layer.msg("密码修改失败！", {
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
    logout: function() {
      var json = {
        sessionid: getCookie("sessionid")
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/user/logout/",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("登出成功！", {
              icon: 1,
              time: 2000
            });
            this.$store.dispatch("asetToken", false);
            // window.location=this_vue.$store.getters.getBaseUrl+"/login";
            window.location = "http://127.0.0.1:8080";
          } else {
            layer.msg("登出失败！", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
layui.use("element", function() {
  var element = layui.element;
});
layui.use(["form", "layedit", "laydate"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
});
</script>

<style scoped>
@import "../../static/layui/css/layui.css";
#newPost_background,
#newResume_background {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  text-align: 1.5;
  z-index: 1000;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.newPost {
  background: #eeeeee;
  width: 56%;
  margin: 4% auto;
  overflow: auto;
}
.newResume {
  background: #eeeeee;
  width: 26%;
  margin: 6% auto;
  overflow: auto;
}

#newPost_close,
#newResume_close {
  padding: 5px;
  background: #ff6a6a;
}

#newPost_close-button,
#newResume_close-button {
  float: right;
  font-size: 30px;
}

/* #newPost_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>