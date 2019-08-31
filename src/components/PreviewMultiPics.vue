<template>
  <div>
    <div class="layui-upload-list" ref="preview_box" style="overflow:hidden"></div>
  </div>
</template>

<script>
export default {
  name: "PreviewMultiPics",
  methods: {
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
    },
    preview: function(pics_urls) {
      for (var i = 0; i < pics_urls.length; i++) {
        var apdiv = $(
          '\
            <div align="center" style="height: 125px;width: 125px;overflow:hidden;float:left;padding:5px">\
                <img src="' +
            pics_urls[i] +
            '" alt="分享图片" class="layui-upload-img" style="height: 125px;max-width: auto">\
            <div>'
        );
        // 放大预览
        apdiv.find("img").on("click", this.previewImg);
        $(this.$refs.preview_box).append(apdiv);
      }
    }
  }
};
</script>

<style scoped>
</style>