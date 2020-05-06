<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt srcset />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="sex"
        name="sex"
        label="性别"
        placeholder="性别"
        :rules="[{ required: true, message: '请填写性别' }]"
      />
      <van-field
        v-model="age"
        name="age"
        label="年龄"
        placeholder="年龄"
        :rules="[{ required: true, message: '请填写年龄' }]"
      />
      <van-field
        v-model="adress"
        name="adress"
        label="来自"
        placeholder="来自"
        :rules="[{ required: true, message: '请填写地址' }]"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">去注册 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      name: "",
      pwd: "",
      sex:"",
      age:"",
      adress:"",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      //{用户名: "收到", 密码: "sdf"}
      this.$http
        .post("/api/add", values)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            // 提示
            Toast.success(res.data.msg);
            // 延时跳转
            setTimeout(() => {
              this.$router.push("/Login");
            }, 1500);
          } else {
            // 注册失败
            Toast.fail(res.data.msg);
            this.name = "";
          }
        });
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