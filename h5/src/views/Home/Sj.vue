<template>
  <div id="Sj">
    <!-- 书架 -->
    <div class="name">
      <p>书友：{{this.$store.state.name}}</p>
      <p></p>
      <p @click="out">退出</p>
    </div>
    <h2>已加入书架的书籍</h2>
    
    <van-card
      v-for="(item,i) in dataList"
      :key="i"
      :price="item.author"
      :desc="item.desc"
      :title="item.name"
      :thumb="item.img"
      @click-thumb="look(i)"
    >
      <template #footer>
        <van-button @click="del(item.name)">删除</van-button>
      </template>
    </van-card>

    <div v-show="this.userList.length == 0"> <h1>没有收藏的书籍 </h1></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { Dialog } from 'vant';
Vue.use(Toast);
Vue.use(Dialog);

export default {
  data() {
    return {
      userList: [],
      bookName:localStorage.getItem("uname")
    };
  },
  methods: {
    out() {
      Dialog.confirm({
        // title: "标题",
        message: "确认退出当前用户？"
      })
        .then(() => {
          localStorage.removeItem("uid");
          localStorage.removeItem("uname");
          this.$router.push("/Home");
        })
        .catch(() => {
          // on cancel
        });
    },
    del(name) {
      this.$http
        .get("/api/userDel", {
          params: { name:name,uname:localStorage.getItem("uname")}
        })
        .then(res => {
          console.log(this);
          this.getList(localStorage.getItem("uname"))
          Toast.success(res.data.msg);

        });
    },

    getList(user){
      this.$http
      .get("/api/userList", {
        params: { user }
      })
      .then(res => {
        this.userList = res.data;
      });
    },

    look(id) {
      this.$router.push({ name: "details", params: { id } });
    }
  },
  computed: {
    dataList() {
      return this.userList
    }
  },
  created() {
    let user = localStorage.getItem("uname");
    this.getList(user)
  }
};
</script>

<style lang="scss" scoped>
h1{
  width: 100%;
  margin: 50px 0;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.name {
  display: flex;
  p {
    flex: 1;
    padding: 10px;
    font-size: 20px;
  }
  p:last-child {
    text-align: right;
  }
}
.van-card__footer {
  position: absolute;
  right: 0;
  top: 72px;
  color: red;
  z-index: 99;
}
.van-card {
  padding: 18px 10px;
  border-bottom: solid #ccc 1px;
}
</style>