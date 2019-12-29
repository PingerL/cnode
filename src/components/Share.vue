<template>
  <div class="postlist">
    <div class="sidebar">
      <div class="panel">
        <div class="inner">
          <p>CNode：Node.js专业中文社区</p>
          <div>
            您可以
            <a href="/signin">登录</a>
            或
            <a href="/signup">注册</a>
            , 也可以
            <a href="/auth/github">
              <span class="span-info">
                通过 GitHub 登录
              </span>
            </a>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="inner ads">
          <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc_540_130&amp;utm_campaign=huodong&amp;utm_content=gift&amp;ytag=cnodejs" target="_blank" class="banner sponsor_outlink" data-label="ucloud-banner">
            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS">
          </a>
          <div class="sep10"></div>
          <a href="https://www.qiniu.com/events/cdn-package?code=cnode" target="_blank" class="banner sponsor_outlink" data-label="qiniu-sidebar">
            <img src="//static.cnodejs.org/FufeQ8S-sz6aKH5bvPXzVXvQG2Z-">
          </a>
          <div class="sep10"></div>
          <a href="https://www.aliyun.com/product/nodejs?ref=cnode" target="_blank" class="banner sponsor_outlink" data-label="alinode">
            <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_">
          </a>
      </div>
    </div>
    <div class="panel">
    <div class="header">
      <span class="col_fade">友情社区</span>
    </div>
    <div class="inner">
      <ol class="friendship-community">
        <li>
          <a href="https://ruby-china.org/" target="_blank">
            <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png">
          </a>
        </li>
        <div class="sep10"></div>
        <li>
          <a href="http://golangtc.com/" target="_blank">
            <img src="//static2.cnodejs.org/public/images/golangtc-logo.png">
          </a>
        </li>
        <div class="sep10"></div>
        <li>
          <a href="http://phphub.org/" target="_blank">
            <img src="//static2.cnodejs.org/public/images/phphub-logo.png">
          </a>
        </li>
        <div class="sep10"></div>
        <li>
          <a href="https://testerhome.com/" target="_blank">
            <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK">
          </a>
        </li>
      </ol>
    </div>
  </div>
  <div class="panel">
    <div class="header">
      <span class="col_fade">客户端二维码</span>
    </div>
    <div class="inner cnode-app-download">
      <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU">
      <br>
      <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
    </div>
  </div>
  </div>
    <div class="content">
      <div class="header clearfix">
        <router-link to="/">全部</router-link>
        <router-link to="/good">精华</router-link>
        <router-link to="/share" class="active">分享</router-link>
        <router-link to="/ask">问答</router-link>
        <router-link to="/job">招聘</router-link>
        <!-- <a href="#">精华</a> -->
        <!-- <a href="#">分享</a>
        <a href="#">问答</a>
        <a href="#">招聘</a> -->
        <a href="#">客户端测试</a>
      </div>
      <ul class="topic_list">
        <li v-for="post in posts" :key="post.id" v-show="post.tab === 'share'">
          <router-link :to="{name:'post_User',params:{loginname:post.author.loginname}}">
            <img :src="post.author.avatar_url" alt="">
          </router-link>
        <!--帖子的分类-->
          <span>
            <span>
              {{post | tabFormatter}}
            </span>
          </span>
          <span >{{post.reply_count}}</span><span>/{{post.visit_count}}</span>
          <!-- 标题 -->
          <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}" class="title">
            {{post.title}}
          </router-link>
          <span  class="last_time">{{post.last_reply_at | formatDate}}</span>
        </li>
        <!-- 分页 -->
        <li>
          <Pagination @handleList="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Pagination from './Pagination'
export default {
  components:{Pagination},
  data(){
    return{
      posts:{},
      postpage:1
    }
  },
  methods:{
    getData(){
      this.$http.get(' https://cnodejs.org/api/v1/topics',{params:{page:this.postpage,limit:20}})
      .then(res=>{
        this.posts = res.data.data
        console.log(res.data.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    renderList(value){
          this.postpage = value;
          this.getData();
        }
  },
  beforeMount(){
    this.getData()
  }

}
</script>
<style scoped>
*{
  box-sizing: border-box;
}
.clearfix::after{
    content: '';
    display: block;
    clear: both
  }
 img {
   vertical-align: middle;
 }
 a {
  text-decoration: none;
  color: #333;
  }
a:hover{
  color: #888;
  text-decoration: underline
  }
.sidebar {
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
    /* outline: 1px solid red; */
    margin-right: 60px;
}
.sidebar p{
  margin: 0 0 10px;
}
.sidebar .panel {
  width: 290px;
  /* height: 116px; */
  margin-bottom: 13px;
  background-color: white;
  line-height: 2em;
}
.inner {
  padding: 10px;
}
.sidebar img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
}
.sep10 {
    height: 10px;
}
.friendship-community img {
    width: 150px;
}
.col_fade {
  padding: 10px;
}
.cnode-app-download {
  text-align: center
}
.span-info {
    display: inline-block;
    float: none;
    padding: 3px 10px;
    border: none;
    margin: 0;
    font-size: 14px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    letter-spacing: 2px;
    box-shadow: none;
    border-radius: 3px;
    line-height: 2em;
    vertical-align: middle;
    color: #fff;
    background-color: #5bc0de;
}
.content {
  margin: 0 60px;
  margin-right: 365px;
}
.content .header{
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  height: 40px;
}
.content .header a{
  color:#80bd01;
  margin: 0 10px;
}
.content .header a.active{
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.topic_list li{
  max-width: 979px;
  padding: 0 10px;
  padding-right: 100px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
} 

.topic_list li img{
  width: 30px;
}
.put_good {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin: 10px;
  }
  .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin: 10px;
    display: none;
  }
  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin: 10px;
    display: none;
  }
  .last_time {
    font-size: 11px;
    position: absolute;
    right: 10px;
    text-align: right;
    width: 50px;
  }

</style>
