<template>
  <div class="layui-container">
    <div class="layui-row">
      <div class="layui-col-xs1" style="height:70px">
        <div style="background-color:red;height:100%">
          <img ref="img_url" alt="fail" style="height:70px;width:70px" />
        </div>
      </div>
      <div class="layui-col-xs10" style="height:70px">
        <div style="background-color:blue;height:50%">
          <label ref="name_lab"></label>
        </div>
        <div style="background-color:yellow;height:50%">
          <label ref="time_lab"></label>
        </div>
      </div>
      <div class="layui-col-xs1" style="height:70px">
        <div style="background-color:red;height:100%" @click="sendResume">
          <label>投简历</label>
        </div>
      </div>
    </div>
    <div class="layui-row" style="height:70px">
      <div style="background-color:grey;height:100%">
        <h1 ref="title"></h1>
      </div>
    </div>

    <div class="layui-row">
      <form class="layui-form" style="margin:20px">
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">薪资范围</label>
            <div class="layui-input-inline" style="width: 100px;">
              <input
                ref="salary_lo"
                type="text"
                name="price_min"
                placeholder="￥"
                autocomplete="off"
                class="layui-input"
                readonly
              />
            </div>
            <div class="layui-form-mid">-</div>
            <div class="layui-input-inline" style="width: 100px;">
              <input
                ref="salary_hi"
                type="text"
                name="price_max"
                placeholder="￥"
                autocomplete="off"
                class="layui-input"
                readonly
              />
            </div>
            <div class="layui-form-mid">/月</div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">学历要求</label>
          <div class="layui-input-block">
            <input
              ref="edu_require"
              type="text"
              name="title"
              lay-verify="title"
              autocomplete="off"
              placeholder="默认为空标题"
              class="layui-input"
              readonly
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">工作经验</label>
          <div class="layui-input-block">
            <input
              ref="exp_require"
              type="text"
              name="title"
              lay-verify="title"
              autocomplete="off"
              placeholder="默认为空标题"
              class="layui-input"
              readonly
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">招聘人数</label>
          <div class="layui-input-block">
            <input
              ref="want_num"
              type="text"
              name="title"
              lay-verify="title"
              autocomplete="off"
              placeholder="默认为空标题"
              class="layui-input"
              readonly
            />
          </div>
        </div>
      </form>
    </div>

    <div>
      <div class="layui-colla-item">
        <h2 class="layui-colla-title arrow_toright">职位描述</h2>
        <div class="layui-colla-content">
          <p ref="descripe"></p>
        </div>
      </div>
      <div class="layui-colla-item">
        <h2 class="layui-colla-title arrow_toright">工作地点</h2>
        <div class="layui-colla-content">
          <p ref="place"></p>
        </div>
      </div>
    </div>
    <div class="layui-row">
      <div class="layui-colla-item">
        <h2 class="layui-colla-title">
          <a ref="detail_url" href>公司详情</a>
        </h2>
      </div>
    </div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;"></fieldset>
  </div>
</template>

<script>
import { getCookie } from "../util/util.js"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
layui.use("element", function() {
  var element = layui.element;
  element.init();
});
layui.use(["form", "layedit", "laydate", "layer"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
});
export default {
  props: {
    info: Object
  },
  mounted() {
    this.fillaHire(this.info);
    $(".layui-colla-item").on("click", this.switchState);
  },
  beforeCreated() {
    this.fillaHire(this.info);
  },
  methods: {
    fillaHire: function(info) {
      $(this.$refs.img_url).attr("src", info.img_url);
      $(this.$refs.name_lab).text(info.name_lab);
      $(this.$refs.time_lab).text(info.time_lab);
      $(this.$refs.title).text(info.title);
      $(this.$refs.salary_lo).val(info.salary_lo);
      $(this.$refs.salary_hi).val(info.salary_hi);
      $(this.$refs.edu_require).val(info.edu_require);
      $(this.$refs.exp_require).val(info.exp_require);
      $(this.$refs.want_num).val(info.want_num);
      $(this.$refs.descripe).text(info.descripe);
      $(this.$refs.place).text(info.place);
      $(this.$refs.detail_url).attr("href", info.detail_url);
    },
    sendResume: function() {
      var str_content =
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">选择简历：</label>' +
        '<div class="layui-input-block">' +
        '<select id="selectaResume" name="selectaResume" lay-filter="aihao">';
      for (var idx = 0; idx < this.$store.getters.getResumes.length; idx++) {
        str_content +=
          '<option value="' +
          idx +
          '">' +
          this.$store.getters.getResumes[idx].name +
          "</option>";
      }
      str_content += "</select>" + "</div>" + "</div>";
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "选择简历",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content: str_content,
        btn: ["确定", "取消"],
        btn1: function(index, layero) {
          var json = {
            sessionid: getCookie("sessionid"),
            url:
              this_vue.$store.getters.getResumes[$("#selectaResume").val()].url,
            name:
              this_vue.$store.getters.getResumes[$("#selectaResume").val()]
                .name,
            text: this_vue.$store.getters.getName + "给你发了份简历！",
            headline: "查收简历",
            // cid: this_vue.info.cid
            cid : 2
          };

          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/user/sendresume/",
              JSON.stringify(json)
              // {headers:{'SESSIONID':getCookie('sessionid')}},{emulateJSON: true}
            )
            .then(res => {
              res = res.data;
              if (res.msg == "true") {
                layer.msg("发送成功！", {
                  icon: 1,
                  time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
              } else {
                layer.msg("发送失败！", {
                  icon: 2,
                  time: 2000 //2秒关闭（如果不配置，默认是3秒）
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
</style>