<template>
  <div id="app">
    <Header></Header>
    <router-view name="slidebar"></router-view>
    <router-view name="main" class="main"></router-view>
    <div id="nav"></div>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header";
export default {
  components: { Header }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #e1e1e1;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.markdown-text img {
  display: inline-block;
  max-width: 82% !important;
}
</style>
