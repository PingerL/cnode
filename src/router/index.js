import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../components/PostList.vue";
import Article from "../components/Article.vue";
import User from "../components/User.vue";
import SlideBar from "../components/SlideBar";

Vue.use(VueRouter);

const routes = [
  {
    name: "root",
    path: "/",
    components: {
      //指向的组件
      main: PostList
    }
  },
  {
    name: "post_content",
    path: "/topic/:id&author=:name", //接收 router-link 传递进来的params参数
    components: {
      //指向的组件
      main: Article,
      slidebar: SlideBar
    }
  },
  {
    name: "post_User",
    path: "/user/:loginname ", //接收 router-link 传递进来的params参数
    components: {
      //指向的组件
      main: User
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
