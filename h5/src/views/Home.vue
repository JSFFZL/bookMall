<template>
  <div class="home">
    <!-- <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>-->
    <div class="nav">
      <div class="header">
        <div class="logo">
          <router-link to="/Home/Sy">
            <img src="@/assets/img/logo.png" alt />
          </router-link>
        </div>
        <div >
          <!-- <span v-show="off != '' ">
            {{this.$store.getters.getname}}
          </span> -->
          <!-- <van-icon name="search" size="30" /> -->
        </div>
      </div>
    </div>

    <div class="tab">
      <router-link to="/Home/Sy" tag="span">首页</router-link>
      <!-- <router-link to="/Home/Fl" tag="span">分类</router-link>
      <router-link to="/Home/Ph" tag="span">排行</router-link> -->
      <router-link to="/Home/Sj" tag="span">书架</router-link>
    </div>

    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <!-- home-end -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      // off:""
    }
  },
  methods: {},
  // watch:{
  //   off:function(){
  //     return this.off = this.$store.state.name
  //   }
  // }
  // computed:{
  //   off(){
  //     return this.$store.state.name
  //   }
  // }
  // components: {
  //   HelloWorld
  // }
};
</script>


<style lang="scss" scoped>
.nav {
  padding: 10px;
  // box-shadow: 0 6px 12px #b5252c;
  border-bottom: solid 1px #999;
  // background: linear-gradient(to right, rgb(252, 14, 80), rgb(233, 115, 96));
}
.header {
  width: 100%;
  height: 30px;
  display: flex;
}
.header .logo {
  text-align: left;
  a {
    background: #fff;
  }
}
.header div {
  flex: 1;
  align-content: space-between;
  text-align: right;
}
.header img {
  width: 80%;
}
p {
  font-size: 20px;
}

.tab {
  position: static;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #333;
  span {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
}

//vant 样式

.router-link-exact-active {
  background: #666;
}
</style>
