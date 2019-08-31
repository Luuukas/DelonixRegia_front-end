<template>
<!--<body style='background-image: url(../assets/LoginBackGround.jpg);'>-->
  <div id="main-menu" class="container" style="text-align: center;">
    <div id="login-menu">
      <h1 id="title">{{ title }}</h1>
      <h3 id="small">{{ small }}</h3>
      <form class="form-inline" role="form" action>
        <div class="input-group" id="rusername">
          <input type="text" class="contorl" v-model="username" placeholder="用户名">
        </div>
        <br>
        <div class="input-group" id="rpassword">
          <input type="password" class="contorl" v-model="password" placeholder="密码">
        </div>
        <br>
        <div class="input-group" id="repassword">
          <input
            type="password"
            class="contorl"
            v-model="rpassword"
            v-on:keyup="this.validate"
            placeholder="确认密码"
          >
        </div>
        <br>
        <div class="input-group" id="rEmail">
          <input type="text" class="contorl" id="Email" v-model="email" placeholder="邮箱">
        </div>
        <br>
        <div class="input-group" id="rpass">
          <span class="input-group-btn">
            <div id="register" class="btn-group" role="group" aria-label="...">
              <button
                id="B-two"
                class="btn btn-lg"
                type="button"
                style="color:white;background-color:cornflowerblue;font-size:17px;padding-right:20px;padding-left:20px;"
                @click="this.postData"
              >
                <span>注册</span>
              </button>
            </div>
          </span>
        </div>
      </form>
      <div style="margin-top:5px;">
        <p>
          已有账号？
          <router-link :to="{path:'/'}" replace>登陆</router-link>
        </p>
      </div>
      <span id="add"></span>
    </div>
    <div id="rchange">
      <form role="form">
        <div class="form group" style="margin-top:3px;">
          <select id="identityChoice">
            <option value="在校学生">在校学生</option>
            <option value="毕业学生">毕业学生</option>
            <option value="企业">企业</option>
          </select>
          <input type="submit" value="切换">
        </div>
      </form>
    </div>
  </div>
<!--</body>-->
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      title: "凤凰花开",
      count: "",
      show: true,
      timer: null,
      small: "Phoenix Nirvana",
      password: "",
      rpassword: "",
      username: "",
      email: ""
    };
  },
  methods: {
    getcode: function() {
      const TIME_COUNT = 60;
      alert("验证信息已发到邮箱");
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    validate: function() {
      var pw1 = this.password;
      var pw2 = this.rpassword;
      if (pw1 == pw2) {
        document.getElementById("add").innerHTML =
          "<font color='green'>两次密码相同</font>";
      } else {
        document.getElementById("add").innerHTML =
          "<font color='red'>两次密码不相同</font>";
      }
    },
    postData: function() {
      var identity;
      if($("#identityChoice").val()=="在校学生"){
        identity = 2;
      }else if($("#identityChoice").val()=="毕业学生"){
        identity = 1;
      }else{
        identity = 3;
      }
      if (
        this.username != "" &&
        this.password != "" &&
        this.rpassword != "" &&
        this.email != ""
      ) {
        var json = {
          username: this.username,
          password: this.password,
          email: this.email,
          identity: identity
        };

        $.ajax({
          type: "POST",
          url: this.$store.getters.getBaseUrl+"/user/register/",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(json),
          dataType: "json",
          success: function(res) {
              if(res.msg=="true"){
                alert("注册成功，请去邮箱激活账号!")
              }else{
                switch(res.msg){
                  case 'f_ualready': alert("用户名已存在！");break;
                  case 'f_ealready': alert("邮箱已被注册！");break;
                  default: alert("激活邮件发送失败，请重新注册！");
                }
              }
          },
          error: function(message) {
            $("#request-process-patent").html("提交数据失败！");
          }
        });
      }else{
        alert("注册信息未填写完整！");
      }
    }
  }
};
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
#rEmail {
  margin-top: 20px;
}
#rEmail span {
  cursor: pointer;
}
#rpassword {
  margin-top: 20px;
}
#repassword {
  margin-top: 20px;
}
#rpass {
  margin-top: 5px;
}
#register button {
  height: 30px;
  padding: 0;
  outline: none;
}
#B-two span {
  /*滑块*/
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
#rchange select {
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  width: 50%;
  height: 30px;
  margin-top: 3px;
}
#rchange input {
  background-color: white;
  border: 1px solid;
  border-color: #ccc;
  border-radius: 3px;
}
.contorl {
  width: 100%;
  height: 30px;
  border: 1px solid;
  border-color: #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
#Email {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0px;
  border-top-left-radius: 4px;
}
</style>