<template>
  <div class="article">
    <div class="topic-title">
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
    <div class="replies">
      <p>{{list.replies.length}}回复</p>
      <ul>
        <li v-for="(replay,index) in list.replies" :key="replay.index">
          <router-link :to="{name:'post_User',params:{loginname:replay.author.loginname}}">
            <img :src="replay.author.avatar_url" alt="">
            <span>{{replay.author.loginname}} </span>
          </router-link>
          <span> {{index+1}}楼</span>
          <div v-html="replay.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:{},
      content:''
    }
  },
  methods:{
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then(res=>{
        this.list = res.data.data
        this.content = this.list.content.replace('class="markdown-text"','class="markdown-body"')
        // console.log(this.content)
        console.log(this.list)
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
<style>
@import url('../assets/markdown-github.css');
.article{
    margin: 0 60px;
    background-color: #fff;
    /* outline: 1px solid red; */
    padding: 10px;
    margin-right: 370px
  }
.topic-title p{
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
}
.topic-title{
  padding: 10px;
}
.clearfix::after{
    content: '';
    display: block;
    clear: both
  }
  .article ul {
    display: inline-block
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
.replies img{
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


</style>