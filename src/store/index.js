import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象
    userid : null,
    username : null,    // the unique username
    userimgurl : null, 
    userIdentity : null,
    token : false,
    baseUrl : "http://172.16.67.134:8000",
    resumes : null,
};
const getters = {   //实时监听state值的变化(最新状态)
    getId() {  //承载变化的showFooter的值
        return state.userid
    },
    getName() {  //承载变化的changebleNum的值
        return state.username
    },
    getImgUrl() {
        return state.userimgurl
    },
    getIdentity() {
        return state.userIdentity
    },
    getBaseUrl(){
        return state.baseUrl
    },
    getToken(){
        return state.token
    },
    getResumes(){
        return state.resumes
    },
};
const mutations = {
    setId(state, userid) { //同上，这里面的参数除了state之外还传了需要增加的值sum
        state.uesrid = userid;
    },
    setName(state, username){
        state.username = username
    },
    setImgUrl(state, userimgurl){
        state.userimgurl = userimgurl
    },
    setIdentity(state, userIdentity){
        state.userIdentity = userIdentity
    },
    setToken(state, token){
        state.token = token
    },
    setResumes(state, resumes){
        state.resumes = resumes
    }
};
const actions = {
    asetId(context,userid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('setId',userid);
    },
    asetName(context,username) {  //同上注释
        context.commit('setName',username);
    },
    asetImgUrl(context, userimgurl) {   //同上注释，num为要变化的形参
        context.commit('setImgUrl', userimgurl)
    },
    asetIdentity(context, userIdentity) {   //同上注释，num为要变化的形参
        context.commit('setIdentity', userIdentity)
    },
    asetToken(context, token){
        context.commit('setToken', token)
    },
    asetResumes(context, resumes){
        context.commit('setResumes', resumes)
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;