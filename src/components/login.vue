<template>
  <div id="main-menu" class="container" style="text-align: center;">
    <div id="login-menu">
      <h1 id="title">{{ title }}</h1>
      <h3 id="small">{{ small }}</h3>
      <form class="form-inline" action>
        <div class="input-group" id="username">
          <div class="input-group-addon" style="background-color:white;">
            <span class="glyphicon glyphicon-envelope" style="font-size:18px;" aria-hidden="true"></span>
          </div>
          <input
            type="text"
            class="form-control"
            name="username"
            v-model="username"
            placeholder="用户名"
          />
        </div>
        <br />
        <div class="input-group" id="password">
          <div class="input-group-addon" style="background-color:white;">
            <span aria-hidden="true">
              <img src="../assets/password.jpg" style="width:18px;height:17.6px;" />
            </span>
          </div>
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="password"
            placeholder="密码"
          />
        </div>
        <br />
        <div class="input-group" id="pass">
          <span class="input-group-addon" style="background-color:white;font-size:17px;">
            <input type="checkbox" class="checkbox" style="cursor:pointer" />自动登陆
          </span>
          <span class="input-group-btn">
            <div id="login" class="btn-group" role="group" aria-label="...">
              <button
                id="B-two"
                type="button"
                @click="this.postInfo"
                class="btn btn-lg"
                style="color:white;background-color:cornflowerblue;font-size:17px;padding-right:20px;padding-left:20px;"
              >
                <span>登陆</span>
              </button>
            </div>
          </span>
        </div>
      </form>
      <div style="margin-top:10px;">
        <p>
          没有账号？
          <router-link :to="{path:'/register'}" replace>注册</router-link>
        </p>
        <p>
          忘记密码？
          <a href="javascript:;" @click="retrievePW">找回</a>
        </p>
      </div>
    </div>
    <!-- <div id="change">
      <form role="form">
        <div class="form group" style="margin-top:3px;">
          <select>
            <option value="在校学生">在校学生</option>
            <option value="毕业学生">毕业学生</option>
            <option value="企业">企业</option>
          </select>
          <input type="submit" value="切换">
        </div>
      </form>
    </div>-->
  </div>
</template>
<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";

export default {
  name: "login",
  data() {
    return {
      title: "凤凰花开",
      small: "Phoenix Nirvana",
      username: "",
      password: ""
    };
  },
  methods: {
    postInfo: function() {
      if (this.username != "" && this.password != "") {
        var json = {
          username: this.username,
          password: this.password
        };

        this.$http.post(
          this.$store.getters.getBaseUrl+"/user/login/",
          JSON.stringify(json),
          // {headers:{'SESSIONID':getCookie('sessionid')}},{emulateJSON: true}
        ).then((res)=>{
          res = res.data
          if(res.msg=="true"){
                setCookie("sessionid",res.sessionid,1000 * 60 * 60)   //return this
                setCookie("identity",res.identity,1000 * 60 * 60)   //return this
                console.log(getCookie('sessionid'));
                this.$store.dispatch("asetIdentity", res.identity);
                this.$store.dispatch("asetToken", true);
                this.$router.push({name:'MainPage'})
              }else{
                alert(res.msg);
              }
        })
      } else {
        alert("登录信息未填写完整！");
      }
    },
    retrievePW: function(){
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "找回密码",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">注册邮箱：</span>' +
          '<input id="rpw_email" class="form-control" placeholder="请输入注册时所用邮箱">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["确定", "取消"],
        btn1: function(index, layero) {
          console.log("aaaa");
          var json = {
            "email" : $("#rpw_email").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/user/findpas/",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.data;
              if (res.msg == "true") {
                layer.msg("邮件发送成功！", {
                  icon: 1,
                  time: 2000
                });
              } else {
                layer.msg("找回请求失败！", {
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
@import "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css";
#login-menu {
  border-radius: 10px;
  border: 0.5px;
  margin: 0 auto;
  height: 410px;
  background-color: rgba(255, 255, 255);
}
#main-menu {
  border-radius: 10px;
  border: 0.5px;
  margin: 0 auto;
  width: 30%;
  height: 470px;
  background-color: rgba(255, 255, 255, 0.829);
  margin-top: 100px;
}
#title {
  padding-top: 20px;
  color: cornflowerblue;
  font-size: 60px;
}
#small {
  color: cornflowerblue;
}
#username {
  margin-top: 40px;
}
#username span {
  padding: 0;
}
#password {
  margin-top: 40px;
}
#pass {
  margin-top: 30px;
}
#login button {
  height: 30px;
  padding: 0;
  outline: none;
}
#B-two span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
#B-two span:after {
  content: ">>";
  position: absolute;
  opacity: 0;
  top: 0px;
  right: -200px;
  transition: 0.5s;
  border: none;
}
#B-two:hover span {
  padding-right: 25px;
}
#B-two:hover span:after {
  opacity: 1;
  right: 0;
}
#button pass {
  top: 0px;
}
#B-one:hover {
  background-color: inherit;
}
/* #change select {
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  width: 50%;
  height: 30px;
  margin-top: 3px;
}
#change input {
  background-color: white;
  border: 1px solid;
  border-color: #ccc;
  border-radius: 3px;
} */
</style>
