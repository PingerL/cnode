<template>
  <div class="header">
    <div class="container">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
      <ul class="nav clearfix">
        <router-link :to="{name:'root'}">
          <li>首页</li>
        </router-link>
        <li>新手入门</li>
        <li>API</li>
        <li>关于</li>
        <li>注册</li>
        <li>登录</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.clearfix::after{
  content: '';
  display: block;
  clear: both
}
li {
  list-style: none;
}
.header{
  height: 50px;
  width: 100%;
  background-color: #333;
  margin-bottom: 20px;
}
.header .container{
  width: 1137px;
  margin: 0 auto;
}
.header .container img{
  width: 120px;
  float: left;
  margin-top: 11px;
}
.container .nav {
  float: right;
}
.container .nav li{
  color: #ccc;
  float: left;/* 元素浮动后会转化成为 block 元素  */
  font-size: 12px;
  line-height: 50px;
  padding: 0 15px;
  cursor: pointer;
}
</style>