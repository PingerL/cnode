/* eslint-disable prettier/prettier */
<template>
  <div class="header">
    <div class="container">
      <router-link :to="{ name: 'root' }">
        <img src="../assets/cnodejs_light.svg" alt="" />
      </router-link>
      <ul class="nav clearfix" @mouseover="overHandle" @mouseout="outHandle">
        <router-link :to="{ name: 'root' }">
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
  methods: {
    overHandle(e) {
      e.target.style.color = "#fff";
    },
    outHandle(e) {
      e.target.style.color = "#ccc";
    }
  }
};
</script>
<style scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
li {
  list-style: none;
}
.header {
  height: 50px;
  width: 100%;
  background-color: #333;
  margin-bottom: 20px;
}
.header .container {
  width: 1137px;
  margin: 0 auto;
}
.header .container img {
  width: 120px;
  float: left;
  margin-top: 11px;
}
.container .nav {
  float: right;
}
.container .nav li {
  color: #ccc;
  float: left; /* 元素浮动后会转化成为 block 元素  */
  font-size: 14px;
  line-height: 50px;
  padding: 0 15px;
  cursor: pointer;
}
</style>
