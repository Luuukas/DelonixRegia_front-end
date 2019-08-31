<template>
  <div class="layui-container" style="width:100%">
      <fieldset class="layui-elem-field layui-field-title" style="margin: 5px;"></fieldset>
    <div class="layui-row">
      <div class="layui-col-xs1">
        <div style="background-color:red;height:100%">
            <label ref="from" @click="changeParentTo"></label>
        </div>
      </div>
      <div class="layui-col-xs1">
        <div style="background-color:red;height:100%">
            @<label ref="to"></label>:
        </div>
      </div>
      <div class="layui-col-xs10">
        <div style="background-color:blue;height:100%">
            <p ref="content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        comment:Object
    },
    name: "aComment",
    mounted(){
        this.fillaComment(this.comment);
    },
    methods:{
        fillaComment: function(comment){
            $(this.$refs.from).text(comment.from);
            $(this.$refs.to).text(comment.to);
            $(this.$refs.content).text(comment.content);
        },
        changeParentTo: function(event){
            var dom = event.target;
            this.$parent.newComment($(dom).text());
        }
    }
};
</script>

<style scoped>
</style>