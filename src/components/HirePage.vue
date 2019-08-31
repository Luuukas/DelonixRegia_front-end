<template>
  <div id="hpg" class="layui-container" style="height:100%;width:100%">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend @click="refresh">Refresh</legend>
    </fieldset>
    <aH v-for="(info,index) in infos" :key="index" :info="info"></aH>
  </div>
</template>

<script>
import aH from "./aHire";
export default {
  data() {
    return {
      infos: [
        {
          img_url: "../../static/pics/137685.jpg",
          name_lab: "苏州博济园电子有限公司",
          time_lab: "2019-08-29",
          title: "急聘普工技工仓管，包吃住，工作轻",
          salary_lo: "5500",
          salary_hi: "9500",
          edu_require: "不限",
          exp_require: "不限",
          want_num: "不限",
          descripe: "职位描述",
          place: "高新区泰山路2号（博济科技园）",
          detail_url: "https://www.baidu.com"
        },
        {
          img_url: "../../static/pics/137685.jpg",
          name_lab: "苏州博济园电子有限公司",
          time_lab: "2019-08-29",
          title: "急聘普工技工仓管，包吃住，工作轻",
          salary_lo: "5500",
          salary_hi: "9500",
          edu_require: "不限",
          exp_require: "不限",
          want_num: "不限",
          descripe: "职位描述",
          place: "高新区泰山路2号（博济科技园）",
          detail_url: "https://www.baidu.com"
        },
        {
          img_url: "../../static/pics/137685.jpg",
          name_lab: "苏州博济园电子有限公司",
          time_lab: "2019-08-29",
          title: "急聘普工技工仓管，包吃住，工作轻",
          salary_lo: "5500",
          salary_hi: "9500",
          edu_require: "不限",
          exp_require: "不限",
          want_num: "不限",
          descripe: "职位描述",
          place: "高新区泰山路2号（博济科技园）",
          detail_url: "https://www.baidu.com"
        }
      ]
    };
  },
  components: {
    aH
  },
  created:function() {
    layui.use("element", function() {
  var element = layui.element;
  element.init()
});
layui.use(["form", "layedit", "laydate"], function() {
  var form = layui.form,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
});
  },
  methods: {
    refresh: function() {
      this.$parent.refreshSubPage();
    }
  }
};
</script>

<style scoped>
</style>