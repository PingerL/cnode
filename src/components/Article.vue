<template>
  <div class="article">
    <div class="load-container" v-if="isLoading">
      <div class="boxLoading">123</div>
    </div>
    <div class="topic-title" >
      <p>{{list.title}}</p>
      <ul class="clearfix">
        <li>• 发布于{{list.create_at | formatDate}}前</li>
        <li>• 作者{{list.author.loginname}}</li>
        <li>• {{list.visit_count}}浏览</li>
        <li>• 来自{{list.author.loginname}}</li>
      </ul>
    </div>
    <div class="content">
      <div v-html="content"></div>
    </div>
    <div class="replies" v-if="list.replies.length > 0">
      <p>{{list.replies.length}}回复</p>
      <ul>
        <li v-for="(replay,index) in list.replies" :key="replay.index">
          <router-link :to="{name:'post_User',params:{loginname:replay.author.loginname}}">
            <img :src="replay.author.avatar_url" alt />
            <span>{{replay.author.loginname}}</span>
          </router-link>
          <span>{{index+1}}楼</span>
          <div v-html="replay.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: {},
      content: "",
      isLoading: false
    };
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false;
          this.list = res.data.data;
          this.content = this.list.content.replace(
            'class="markdown-text"',
            'class="markdown-body"'
          );
          // console.log(this.content)
          console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>
<style>
@import url("../assets/markdown-github.css");
.article {
  margin: 0 60px;
  background-color: #fff;
  /* outline: 1px solid red; */
  padding: 10px;
  margin-right: 370px;
}
.topic-title p {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
}
.topic-title {
  padding: 10px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.article ul {
  display: inline-block;
}
.topic-title li {
  list-style: none;
  color: #838383;
  font-size: 12px;
  float: left;
  padding: 0 8px;
}
.article .content {
  padding: 10px;
}
.replies li {
  margin-top: 10px;
  font-size: 14px;
  line-height: 2;
  margin-right: 370px;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
}
.replies img {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.markdown-text img {
  display: inline-block;
  width: 92% !important;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
a {
  color: #0088cc;
}
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
