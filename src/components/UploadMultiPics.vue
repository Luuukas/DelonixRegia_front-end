<template>
  <div class="layui-upload">
    <button type="button" class="layui-btn" id="pick_files">选择文件</button>
    <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
      预览：
      <div class="layui-upload-list" id="preview_box" style="overflow:hidden"></div>
    </blockquote>
    <button type="button" class="layui-btn" id="post_datas" style="display:none">开始上传</button>
  </div>
</template>

<script>
import { constants } from "fs";
export default {
  name: "UploadMultiPics",
  data() {
    return {
    };
  },
  mounted() {
    var previewImg = this.previewImg;
    var this_vue = this;
    layui.use("upload", function() {
      var upload = layui.upload;
      var img_urls = [];
      var uploadMultiPics = upload.render({
        elem: "#pick_files",
        url: "https://sm.ms/api/upload", // 应该要用this.post_url，但是在mounted里，post_url只是加载时的初始值
        auto: false,
        multiple: true,
        bindAction: "#post_datas",
        field: "smfile",
        choose: function(obj) {
          var files = (this.files = obj.pushFile()); //将每次选择的文件追加到文件队列
          obj.preview(function(index, file, result) {
            var apdiv = $(
              '\
            <div id="upload-' +
                index +
                'align="center" style="height: 125px;width: 125px;overflow:hidden;float:left;padding:5px">\
                <img src="' +
                result +
                '" alt="' +
                file.name +
                '" class="layui-upload-img" style="height: 100px;max-width: auto">\
                <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" style="height:20px;width:130px">删除</button>\
            <div>'
            );
            // 放大预览
            apdiv.find("img").on("click", previewImg);
            // 删除
            apdiv.find(".demo-delete").on("click", function() {
              delete files[index]; //删除对应的文件
              apdiv.remove();
              uploadMultiPics.config.elem.next()[0].value = ""; //清空 input file 值，以免删除后出现同名文件不可选
            });
            $("#preview_box").append(apdiv);
          });
        },
        before: function(obj) {
          //预读本地文件示例，不支持ie8
        },
        done: function(obj) {
          if (obj.success == true) {
            img_urls.push(obj.data.url);
          }
        },
        allDone: function(obj) {
          //上传完毕
          if (obj.aborted > 0 || obj.total > img_urls.length) {
            layer.msg(
              "a图片上传失败！<br>清检查图片数量是否过多，或图片过大。",
              {
                icon: 2,
                time: 20000, //20s后自动关闭
                btn: ["好的"]
              }
            );
          }else{
              this_vue.$parent.hasPicPost(img_urls);
          }
          this_vue.$parent.resetNewPost();
        },
        error: function() {
          layer.msg("b图片上传失败！<br>清检查图片数量是否过多，或图片过大。", {
            icon: 2,
            time: 20000, //20s后自动关闭
            btn: ["好的"]
          });
          this_vue.$parent.resetNewPost();
        }
      });
    });
  },
  methods: {
    onUpload: function(text_field, post_url) {
      console.log($("#preview_box").children().length);
      if ($("#preview_box").children().length == 0) {
        this.$parent.hasPicPost([]);
      } else {
        document.getElementById("post_datas").click();
      }
    },
    previewImg: function(event) {
      console.log("IMG");
      var config = event.currentTarget;
      if (!config.src || config.src == "") {
        layer.msg("没有发现图片！");
        return;
      }
      var default_config = { title: "图片预览" };
      var img = new Image();
      img.onload = function() {
        //避免图片还未加载完成无法获取到图片的大小。
        //避免图片太大，导致弹出展示超出了网页显示访问，所以图片大于浏览器时下窗口可视区域时，进行等比例缩小。
        var max_height = $(window).height() - 100;
        var max_width = $(window).width();
        //rate1，rate2，rate3 三个比例中取最小的。
        var rate1 = max_height / img.height;
        var rate2 = max_width / img.width;
        var rate3 = 1;
        var rate = Math.min(rate1, rate2, rate3);
        //等比例缩放
        default_config.height = img.height * rate; //获取图片高度
        default_config.width = img.width * rate; //获取图片宽度

        $.extend(default_config, config);
        var imgHtml =
          "<img src='" +
          default_config.src +
          "' width='" +
          default_config.width +
          "px' height='" +
          default_config.height +
          "px'/>";
        //弹出层
        layer.open({
          type: 1,
          shade: 0.8,
          offset: "auto",
          area: [
            default_config.width + "px",
            default_config.height + 50 + "px"
          ], ////宽，高
          shadeClose: true,
          scrollbar: false,
          title: default_config.title, //不显示标题
          content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
          cancel: function() {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
          }
        });
      };
      img.src = config.src;
    }
  }
};
</script>

<style scoped>
</style>