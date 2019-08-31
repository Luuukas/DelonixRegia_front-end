<template>
  <div>
    <form class="layui-form">
      <div class="layui-form-item">
        <div class="group" style="position:relative">
          <input
            type="text"
            name="title"
            lay-verify="title"
            autocomplete="off"
            placeholder="请为简历命名（不得为空）"
            v-model="file_name"
          />
          <label for="name">简历名称</label>
          <i @click="switchState">✔</i>
        </div>
      </div>
      <UaR v-if="has_name" :resume_name="file_name"></UaR>
    </form>
  </div>
</template>

<script>
import UaR from './UploadaResume'
export default {
  components:{
    UaR
  },
  data(){
    return{
      file_name : "",
      has_name : false
    }
  },
  methods: {
    switchState: function(){
      if(this.file_name==""){
        layer.msg("文件名不得为空！", {
            icon: 2,
            time: 2000
          });
      }else{
        // 移除组件
      this.has_name = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.has_name = true;
      });
      }
    },
    // refreshResu: function(){
    //   this.$parent.refreshResu();
    // },
    // resetNewResume: function(){
    //   this.$parent.resetNewResume();
    // }
  },
  watch: {
    file_name(val){
      if(this.file_name==""){
        this.has_name = false;
      }
    }
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}
form {
  border: 1px solid grey;
  padding: 50px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.41), 0 0 1px 20px rgba(0, 0, 0, 0.08);
}
input {
  width: 90%;
  padding: 20px;
  margin: 20px 0;
  border: 2px solid black;
  transition: all 0.1s;
  font-size: 20px;
}
.group {
  position: relative;
}
input + label {
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 20px;
  transition: all 0.1s;
  opacity: 1;
  background: white;
  border: 2px solid;
  border-width: 0 2px 0 2px;
  padding: 0 5px;
  transform: translateY(calc(50% + 5px));
}
input:focus {
  outline: 0;
  border-color: #ffc600;
}
input:focus + label {
  border-color: #ffc600;
}
input:placeholder-shown + label {
  opacity: 0;
  transform: translateY(100%);
}
</style>