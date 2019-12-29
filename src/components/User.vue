<template>
  <div class="user">
    <div class="sidebar"></div>
    <div class="header padd10">
      <router-link :to="{name:'root'}">
        主页
      </router-link>
    </div>
    <div class="uerinfo padd10">
      <div class="clearfix">
        <img :src="user.avatar_url" alt="">
        <span class="username">{{user.loginname}}</span>
      </div>
      <ul class="detail">
        <li>{{user.score}}积分</li>
        <li>{{user.score}}个收藏话题</li>
      </ul>
    </div>
    <div class="recent-topic ">
      <p class="padd10">最近创建的话题</p>
      <ul>
        <li v-for="topic in user.recent_topics" :key="topic.index">
          <img :src="user.avatar_url" alt="" >
          <router-link :to="{name:'post_content',params:{id:topic.id}}">
            {{topic.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent-topic ">
      <p class="padd10">最近回复的话题</p>
      <ul>
        <li v-for="topic in user.recent_replies" :key="topic.index">
          <img :src="user.avatar_url" alt="" >
          <router-link :to="{name:'post_content',params:{id:topic.id}}">
            {{topic.title}}
          </router-link>
        </li>
      </ul>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      user:{}
    }
  },
  methods:{
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
      .then(res=>{
        this.user = res.data.data
        console.log(res.data.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.getData()
  }
}
</script>
<style scoped>
.clearfix::after{
  content: '';
  display: block;
  clear: both
}
.padd10{
  padding: 10px
}
.user{
    margin: 0 auto;
    width: 1137px;
    background-color: #fff;
    outline: 1px solid red;
  }
  .header {
    line-height: 40px;
    font-size: 14px;
  }
  .uerinfo {
    outline: 1px solid black;
    color: #778087;
    padding: 10px;
  }
  .uerinfo img{
    float: left;
    width: 40px;
  }
  .recent-topic{
    height: 332px;
    overflow: hidden;
  }
  .recent-topic p {
    background-color: #f6f6f6;
  }
  .recent-topic li,.recent-topic p {
    line-height: 51px;
    border-top: 1px solid #f0f0f0;
    
  }
  .recent-topic img {
    float: left;
    width: 30px;
    padding: 7px 10px;
  }
</style>