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
              <span class="span-info">通过 GitHub 登录</span>
            </a>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="inner ads">
          <a
            href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc_540_130&amp;utm_campaign=huodong&amp;utm_content=gift&amp;ytag=cnodejs"
            target="_blank"
            class="banner sponsor_outlink"
            data-label="ucloud-banner"
          >
            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" />
          </a>
          <div class="sep10"></div>
          <a
            href="https://www.qiniu.com/events/cdn-package?code=cnode"
            target="_blank"
            class="banner sponsor_outlink"
            data-label="qiniu-sidebar"
          >
            <img src="//static.cnodejs.org/FufeQ8S-sz6aKH5bvPXzVXvQG2Z-" />
          </a>
          <div class="sep10"></div>
          <a
            href="https://www.aliyun.com/product/nodejs?ref=cnode"
            target="_blank"
            class="banner sponsor_outlink"
            data-label="alinode"
          >
            <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" />
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
                <img
                  src="//static2.cnodejs.org/public/images/ruby-china-20150529.png"
                />
              </a>
            </li>
            <div class="sep10"></div>
            <li>
              <a href="http://golangtc.com/" target="_blank">
                <img
                  src="//static2.cnodejs.org/public/images/golangtc-logo.png"
                />
              </a>
            </li>
            <div class="sep10"></div>
            <li>
              <a href="http://phphub.org/" target="_blank">
                <img
                  src="//static2.cnodejs.org/public/images/phphub-logo.png"
                />
              </a>
            </li>
            <div class="sep10"></div>
            <li>
              <a href="https://testerhome.com/" target="_blank">
                <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK" />
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
          <img
            width="200"
            src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU"
          />
          <br />
          <a
            href="https://github.com/soliury/noder-react-native"
            target="_blank"
            >客户端源码地址</a
          >
        </div>
      </div>
    </div>
    <div class="content">
      <div class="load-container" v-if="isLoading">
        <div class="boxLoading"></div>
      </div>

      <ul class="topic_list">
        <li class="header clearfix" v-if="!isLoading">
          <a href="#" @click="changeTab" class="active">全部</a>
          <a href="#" @click="changeTab">精华</a>
          <a href="#" @click="changeTab">分享</a>
          <a href="#" @click="changeTab">问答</a>
          <a href="#" @click="changeTab">招聘</a>
          <a href="#" @click="changeTab">客户端测试</a>
        </li>
        <li v-for="post in posts" :key="post.id">
          <router-link
            :to="{
              name: 'post_User',
              params: { loginname: post.author.loginname }
            }"
            class="a-img"
          >
            <img :src="post.author.avatar_url" alt />
          </router-link>
          <span style="width:50px; display:inline-block">
            <span style="font-size:14px;color:#9e78c0">{{ post.reply_count }}</span>
            <span style="font-size:10px;color:#b4b4b4">/{{ post.visit_count }}</span>
          </span>
          <!--帖子的分类-->
          <span
            :class="[
              {
                put_good: post.good == true,
                put_top: post.top == true,
                'topiclist-tab': post.good != true && post.top != true
              }
            ]"
          >
            <span>{{ post | tabFormatter }}</span>
          </span>

          <!-- 标题 -->
          <router-link
            :to="{
              name: 'post_content',
              params: { id: post.id, name: post.author.loginname }
            }"
            class="title"
            >{{ post.title }}</router-link
          >
          <span class="last_time">{{ post.last_reply_at | formatDate }}</span>
        </li>
        <!-- 分页 -->
        <li v-if="!isLoading">
          <Pagination @handleList="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Pagination from "./Pagination";
import $ from "jquery";
export default {
  components: { Pagination },
  data() {
    return {
      isLoading: false,
      posts: {},
      postpage: 1,
      tab: "all",
    };
  },

  methods: {
  
    getData() {
      this.$http
        .get(" https://cnodejs.org/api/v1/topics", {
          params: { page: this.postpage, limit: 20, tab: this.tab }
        })
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
          window.scrollTo(0,0) 
          console.log(res.data.data);
          res.data.data.forEach(data => {
            
            let keys = Object.keys(data)
            let values = Object.values(data)
            console.log(keys,values)
          });
        })
        .catch(err => {
          return err
        });
    },
    renderList(value) {
      // console.log(value, "value");
      this.postpage = value;
      this.getData()
    },
    changeStyle(aim) {
      // console.log($(aim));
      // console.log($(aim).siblings());
      $(aim)
        .siblings()
        .removeClass("active");
      $(aim).addClass("active");
    },
    changeTab(e) {
      // console.log("changetab");
      // console.log(e.target.innerText);
      let aim = e.target;
      switch (e.target.innerText) {
        case "全部":
          this.tab = "all";
          this.getData();
          this.changeStyle(aim); // 改变选中的菜单的样式
          break;
        case "精华":
          this.tab = "good";
          this.getData();
          this.changeStyle(aim);
          break;
        case "分享":
          this.tab = "share";
          this.getData();
          this.changeStyle(aim);
          break;
        case "问答":
          this.tab = "ask";
          this.getData();
          this.changeStyle(aim);
          break;
        case "招聘":
          this.tab = "job";
          this.getData();
          this.changeStyle(aim);
          break;
        case "客户端测试":
          this.tab = "dev";
          this.getData();
          this.changeStyle(aim);
          break;
      }
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
img {
  vertical-align: middle;
}
a {
  text-decoration: none;
  color: #333;
}
a:hover {
  color: #888;
  text-decoration: underline;
}
.sidebar {
  width: 290px;
  font-size: 14px;
  float: right;
  margin-bottom: 20px;
  /* outline: 1px solid red; */
  margin-right: 60px;
}
.sidebar p {
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
  text-align: center;
}
.span-info {
  display: inline-block;
  float: none;
  padding: 3px 10px;
  border: none;
  margin: 0;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
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
.content .header {
  padding: 0 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  height: 53px;
}
.content .header a {
  color: #80bd01;
  margin: 0 10px;
}
.content .header a.active {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.topic_list li {
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

.a-img {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.topic_list li img {
  width: 100%;
}
.put_good,
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
}
.last_time {
  font-size: 11px;
  position: absolute;
  right: 10px;
  text-align: right;
  width: 50px;
}

/* loading 动画 */
.load-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.boxLoading {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.boxLoading:before {
  content: "";
  width: 50px;
  height: 5px;
  background: #000;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow 0.5s linear infinite;
}
.boxLoading:after {
  content: "";
  width: 50px;
  height: 50px;
  background: #00adb5;
  animation: animate 0.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
</style>
