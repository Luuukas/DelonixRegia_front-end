<template>
  <div class="layui-form-item" style="text-align:center;width:100%">
    <div class="layui-upload-drag" id="pick_resume" style="width:-moz-available">
      <i class="layui-icon" style></i>
      <p>点击上传，或将文件拖拽到此处</p>
    </div>
    <button type="button" class="layui-btn" id="upload_resume">开始上传</button>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
export default {
  props: {
      resume_name : String
  },
  mounted() {
    var this_vue = this;
    layui.use("upload", function() {
      var upload = layui.upload;
      //拖拽上传
      upload.render({
        elem: "#pick_resume",
        auto: false,
        bindAction: "#upload_resume",
        url: this_vue.$store.getters.getBaseUrl + "/user/uploadresume/",
        data: {
          // name: $(this_vue.$refs.resume_name).val(),
          sessionid: getCookie("sessionid"),
          name: this_vue.resume_name
        },
        field: "resume",
        done: function(res) {
          layer.msg("上传成功！", {
            icon: 1,
            time: 2000
          });
          this_vue.$parent.$parent.refreshResu();
          this_vue.$parent.$parent.resetNewResume();
        },
        error: function() {
          layer.msg("上传失败！", {
            icon: 2,
            time: 2000
          });
          this_vue.$parent.$parent.resetNewResume();
        }
      });
    });
  }
};
</script>

<style scoped>
</style>