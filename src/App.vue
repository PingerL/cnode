<template>
  <div id="app">
    <Header></Header>
    <router-view name="slidebar"></router-view>
    <router-view name="main" class="main"></router-view>
    <!-- <Article></Article> -->
    
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header'
// import PostList from './components/PostList'
// import Article from './components/Article'
export default {
  components:{Header}  
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #e1e1e1
}
li {
  list-style: none
}
a {
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
/* .main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
} */
.markdown-text img {
  display: inline-block;
  max-width: 82% !important;
  }
</style>
