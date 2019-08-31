<template>
  <li class="layui-nav-item">
    <a ref="list_name" class="arrow_toright" href="javascript:;" @click="switchState"></a>
    <dl v-show="showList" style="margin-bottom:0">
      <dd v-if="list_name=='关注列表'">
        <a ref="sfhook" href="javascript:;" @click="searchFriend" class="black_arrow_toright">搜索好友</a>
      </dd>
      <div v-if="refreshSeaList">
        <aF v-for="(info,index) in seafriends" :key="index" :info="info" :stype="1"></aF>
      </div>
      <aF v-for="(info,index) in friends" :key="index" :info="info" :stype="0"></aF>
    </dl>
  </li>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import aF from "./aFriend";
export default {
  name: "FollowList",
  data() {
    return {
      refreshSeaList: false,
      showList: false,
      friends: [
        {
          imgurl: "../../static/pics/997073.png",
          gender: "M",
          name: "Lukas",
          id: 0
        }
      ],
      seafriends: [
        {
          imgurl: "../../static/pics/997073.png",
          gender: "M",
          name: "Lukas",
          id: 0
        }
      ]
    };
  },
  components: {
    aF
  },
  props: {
    list_name: String
  },
  created() {
    var json = {
      sessionid: getCookie("sessionid")
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl +
          (this.list_name == "关注列表" ? "/user/myfollows/" : "/user/myfans/"),
        JSON.stringify(json)
      )
      .then(res => {
        res = res.data;
        if (res.msg == "true") {
          console.log(res);
          if (this.list_name == "关注列表") {
            this.friends = res.follows;
          } else {
            this.friends = res.fans;
          }
        } else if (res.msg == "expire") {
          layer.msg("会话超时！", {
            icon: 2,
            time: 2000
          });
          // window.location=this_vue.$store.getters.getBaseUrl+"/login";
          window.location = "http://127.0.0.1:8080";
        } else {
          layer.msg("请求失败！", {
            icon: 2,
            time: 2000
          });
        }
      });
  },
  mounted(){
    $(this.$refs.list_name).text(this.list_name);
  },
  methods: {
    refreshSeaFriendList: function() {
      // 移除组件
      this.refreshSeaList = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refreshSeaList = true;
      });
    },
    searchFriend: function() {
      if ($(this.$refs.sfhook).hasClass("black_arrow_todown")) {
        $(this.$refs.sfhook).removeClass("black-arrow_todown");
        $(this.$refs.sfhook).addClass("black_arrow_toright");
        this.refreshSeaList = false;
        return;
      } else {
        var this_vue = this;
        layer.open({
          id: 1,
          type: 1,
          title: "搜索好友",
          skin: "layui-layer-rim",
          area: ["450px", "auto"],

          content:
            '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
            '<div class="col-sm-12">' +
            '<div class="input-group">' +
            '<span class="input-group-addon">搜索用户：</span>' +
            '<input id="searchclue" class="form-control" placeholder="请输入相关信息（用户名，姓名，邮箱等）">' +
            "</div>" +
            "</div>" +
            "</div>",
          btn: ["搜索", "取消"],
          btn1: function(index, layero) {
            var json = {
              key: $("#searchclue").val()
            };
            this_vue.$http
              .post(
                this_vue.$store.getters.getBaseUrl + "/user/searchuser/",
                JSON.stringify(json)
              )
              .then(res => {
                res = res.data;
                if (res.msg == "true") {
                  if (res.users.length == 0) {
                    layer.msg("用户不存在！", {
                      icon: 2,
                      time: 2000
                    });
                    return;
                  }
                  layer.msg("搜索成功！", {
                    icon: 1,
                    time: 2000
                  });
                  this_vue.seafriends = res.users;
                  this_vue.refreshSeaFriendList();
                  $(this_vue.$refs.sfhook).removeClass("black_arrow_toright");
                  $(this_vue.$refs.sfhook).addClass("black_arrow_todown");
                } else {
                  layer.msg("搜索失败！", {
                    icon: 2,
                    time: 2000
                  });
                }
              });
            layer.close(index);
          },
          btn2: function(index, layero) {
            layer.close(index);
          }
        });
      }
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
layui.use(["form", "layedit", "laydate"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
});
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
.black_arrow_toright::before {
  content: "▸";
  float: left;
  margin-right: 10px;
}
.black_arrow_todown::before {
  content: "▾";
  float: left;
  margin-right: 10px;
}
</style>