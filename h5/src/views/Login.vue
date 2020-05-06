<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt srcset />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="zc" @click="zc">没有账号？注册</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      //{用户名: "收到", 密码: "sdf"}
      this.$http
        .get("/api/login", {
          params: { values }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            // 提示
            Toast.success(res.data.msg);
            // 本地存储状态
            localStorage.setItem("uid", true);
            //本地存储状态 用户名
            localStorage.setItem("uname", res.data.name);
            // 存vuex 
            this.$store.commit("updata",res.data.name)
            // 延时跳转
            setTimeout(() => {
              this.$router.push("/Home/Sj");
            }, 500);
          } else {
            // 登录失败
            Toast.fail(res.data.msg);
            this.username = "";
            this.password = "";
          }
        });
    },
    zc(){
      this.$router.push('/Register');
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.logo {
  padding: 50px 0 60px 0;
  text-align: center;
}
.van-cell {
  font-size: 20px;
}

</style>