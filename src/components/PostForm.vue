<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend>编辑新帖子</legend>
    </fieldset>

    <form class="layui-form" action>
      <div class="layui-form-item">
        <label class="layui-form-label">标题</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            lay-verify="title"
            autocomplete="off"
            placeholder="默认为空标题"
            class="layui-input"
            v-model="title"
          />
        </div>
      </div>
      <!-- <div class="layui-form-item">
        <label class="layui-form-label">公开位置</label>
        <div class="layui-input-block">
          <input
            type="checkbox"
            name="close"
            lay-skin="switch"
            lay-text="ON|OFF"
            v-model="sharePosition"
          />
        </div>
      </div> -->
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">编辑文本</label>
        <div class="layui-input-block">
          <textarea placeholder="请输入内容" name="text" class="layui-textarea" v-model="text"></textarea>
        </div>
      </div>
      <!-- <div class="layui-form-item layui-form-text">
                  <label class="layui-form-label">编辑器</label>
                  <div class="layui-input-block">
                    <textarea class="layui-textarea layui-hide" name="content" lay-verify="content" id="LAY_demo_editor"></textarea>
                  </div>
      </div>-->
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">附加图片</label>
        <div class="layui-input-block">
          <UMPs ref="umps"></UMPs>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" @click="onPost">立即提交</button>
          <button
            id="noPicSubmit"
            class="layui-btn"
            lay-submit
            lay-filter="demo1"
            style="display:none"
          >无图提交</button>
          <button type="button" class="layui-btn layui-btn-primary" @click="resetNewPost">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
import UMPs from "./UploadMultiPics";
import { constants } from "fs";
export default {
  components: {
    UMPs
  },
  data() {
    return {
      title: "",
      sharePosition: "on",
      text: ""
    };
  },
  methods: {
    onPost: function() {
      // 尝试以有图的形式上传，若UMPs检测无图则不做上传，返回该组件用form表单提交
      this.$refs.umps.onUpload(
        JSON.stringify({
          title: this.title,
          sharePosition: this.sharePosition,
          text: this.text
        }),
        "https://sm.ms/api/upload"
      );
    },
    noPicPost: function() {
      // 无图时返回用form表单提交
      document.getElementById("noPicSubmit").click();
    },
    hasPicPost: function(img_urls) {
      console.log(img_urls);
      var json = {
        "sessionid": getCookie("sessionid"),
        "title": this.title,
        "content": this.text,
        // "shareOrNot": this.sharePosition,
        "imgurls": img_urls
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/friendcircle/uploadpost/",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.data;
          if (res.msg == "true") {
            layer.msg("发布成功！", {
              icon: 1,
              time: 2000
            });
          } else {
            layer.msg("发布失败！", {
              icon: 2,
              time: 2000
            });
          }
        });
    },
    resetNewPost: function() {
      this.$parent.resetNewPost();
    }
  }
};
layui.use(["form", "layedit", "laydate"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;

  //创建一个编辑器
  //   var editIndex = layedit.build("LAY_demo_editor");

  //监听提交
  form.on("submit(demo1)", function(data) {
    layer.alert(JSON.stringify(data.field), {
      title: "最终的提交信息"
    });
    return false;
  });
});
</script>

<style scoped>
</style>