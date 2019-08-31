<template>
  <div id="ppg" class="layui-container" style="height:100%;width:100%">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend @click="refresh">Refresh</legend>
    </fieldset>
    <aP v-for="(post,index) in posts" :key="index" :post="post"></aP>
  </div>
</template>

<script>
import aP from "./aPost";
export default {
  data() {
    return {
      posts: [
        {
          pics_url: [
            "../../static/pics/137685.jpg",
            "../../static/pics/953900.jpg",
            "../../static/pics/997073.png"
          ],
          img_url: "../../static/pics/137685.jpg",
          name_lab: "Luuukas",
          time_lab: "2019-08-29",
          title: "表扬一下自己",
          content: "我真的好棒棒啊！",
          comments: [
            {
              from: "Jack1",
              to: "Luuukas",
              content: "I agree with you!"
            },
            {
              from: "Jack2",
              to: "Luuukas",
              content: "I agree with you!"
            },
            {
              from: "Jack3",
              to: "Luuukas",
              content: "I agree with you!"
            }
          ],
          owner: "Luuukas1"
        },
        {
          pics_url: [
            "../../static/pics/137685.jpg",
            "../../static/pics/953900.jpg",
            "../../static/pics/997073.png"
          ],
          img_url: "../../static/pics/137685.jpg",
          name_lab: "Luuukas",
          time_lab: "2019-08-29",
          title: "表扬一下自己",
          content: "我真的好棒棒啊！",
          comments: [],
          owner: "Luuukas2"
        },
        {
          pics_url: [
            "../../static/pics/137685.jpg",
            "../../static/pics/953900.jpg",
            "../../static/pics/997073.png"
          ],
          img_url: "../../static/pics/137685.jpg",
          name_lab: "Luuukas",
          time_lab: "2019-08-29",
          title: "表扬一下自己",
          content: "我真的好棒棒啊！",
          comments: [],
          owner: "Luuukas3"
        }
      ]
    };
  },
  components: {
    aP
  },
  methods: {
    refresh: function() {
      this.$parent.refreshSubPage();
    },
    retrievePassWord: function(){
      
    }
  }
};
</script>

<style scoped>
</style>