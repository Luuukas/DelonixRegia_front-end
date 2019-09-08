# delonixregia

> A Vue.js project

## 技术栈

``` bash
前端用Vue.js框架
用到Vuex存储一些全局变量
用到vue-resource进行网络请求
同时有用到JQuery进行部分Dom操作

后端用Django框架

登陆注册组件UI库用boostrap（历史遗留问题）
主页面及其他组件UI库用layui
```

## 需注意的问题
```bash
1. Vue.js与layui存在莫名其妙的冲突，部分layui效果如折叠面板需要手动刷新页面才能有效，为解决这个问题，部分效果是用其他代码在layui的基础上实现的，不是用layui的原生方式。
2. 由于有boostrap这个历史遗留问题，需要妥善处理layui与boostrap之间的冲突，限定好各自所定义类的作用范围。
3. 如果要将某些信息进行浏览器上的缓存的话，该项目所用Vuex的方式存储的信息在页面手动刷新时会跟着刷新，应该要用getCookie，setCookie的方式存储。
4. 在使用layui的一些函数时，需要注意this并非是调用该组件，如果需要调用该组件，需要在函数外定义变量this_vue = this，用this_vue来指向该组件
```

## 文件结构

总的文件结构是由vue-cli生成的，主要介绍个别几个重要的目录。

```bash
./DelonixRegia_front-end/src/components    ——    该目录下为各种自定义的组件

* aComment.vue    ——    一条评论
* aFriend.vue    ——    一个好友
* aHire.vue    ——    一条招聘信息
* aPost.vue    ——    一个帖子
* aResume.vue    ——    一份简历
* EditProfile.vue    ——    修改个人信息页面
* FollowList.vue    ——    所关注的人的列表
* HirePage.vue    ——    展示所有招聘信息的页面
* login.vue    ——    登陆界面
* MainPage.vue    ——    整个主页面
* PostForm.vue    ——    编辑一条待发布的帖子
* PostPage.vue    ——    展示所有招聘信息的页面
* PreviewMultiPics.vue    ——    专门用于预览多张图片的组件
* register.vue    ——    用于注册的组件
* ResumeForm.vue    ——    用于编辑一份待上传简历的组件
* ResumeList.vue    ——    一个展示所有简历的列表（类似好友列表那种）
* UploadaResume.vue    ——    ResumeForm组件中实现拖动上传文件的组件
* UploadMultiPics.vue    ——    PostForm组件中实现多张图片上传至图床再把获得的url发送给服务器的组件
* ViewProfile.vue    ——    查看个人信息的页面
* ViewResume.vue    ——    在线预览简历的页面
```

```
./DelonixRegia_front-end/src/store    ——    该目录下仅有index.js，用Vuex实现全局变量的存储。将需要以全局形式存储的变量模仿其他变量那样定义相应的函数即可。该文件作为模块在./DelonixRegia_front-end/src/main.js中注册后可在整个项目中使用。

使用例子：
存储：this.$store.dispatch("asetIdentity", res.identity);
使用：this.$store.getters.identity
```

```
./DelonixRegia_front-end/src/util    ——    该目录下仅有util.js，里面有三个函数分别用于设置、获取和删除cookie（可用于存储需要缓存的信息）。

使用例子：
在需要使用的vue文件中
import { getCookie } from "../util/util.js";
import { setCookie } from "../util/util.js";
import { delCookie } from "../util/util.js";
存储：setCookie("sessionid",res.sessionid,1000 * 60 * 60)
获取：getCookie('sessionid')
```

## 运行
```
安装好Node.js环境后
cd到DelonixRegia_front-end目录下

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

或许需要手动安装vuex，qs，vue-resource等依赖
```