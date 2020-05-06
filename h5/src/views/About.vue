<template>
  <div class="about">
    <div style="height:20px"></div>
    <van-card
      :desc="listData.desc"
      :title="listData.name"
      :thumb="listData.img"
      currency="作者："
      :price="listData.author"
    ></van-card>

    <div class="btn">
      <van-button
        :disabled="off"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="add(listData)"
      >加入书架</van-button>
      <van-button type="info" @click="look(listData.name)">立即阅读</van-button>
    </div>

    <!-- <van-rate v-model="value" /> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      value: 3,
      off: false,
      listData: {}
    };
  },
  methods: {
    look(t) {
      console.log("00");
      this.$router.push({ name: "details", params: { t } });
    },
    add(item) {
      this.off = true;
      delete item.id;
      item.user = localStorage.getItem("uname");
      this.$http
        .post("/api/userAdd", {
          item
        })
        .then(res => {
          if (res.data.code == 0) {
            Toast.success(res.data.msg);
          } else {
            Toast.fail(res.data.msg);
          }
        });
    }
  },
  created() {
    let uid = this.$route.params.id;

    this.$http
      .get("/api/listOne", {
        params: { uid }
      })
      .then(res => {
        this.listData = res.data;

        this.$http
          .get("/api/dis", {
            params: {
              user: localStorage.getItem("uname"),
              uname: this.listData.name
            }
          })
          .then(res => {
            if(res.data.code == 0){
              this.off = true;
            }else{
              this.off = false;
            }
            
          }).catch((err)=>{
            console.log(err);
            
          });
      });
  }
};
</script>

<style lang="scss" scoped>
.van-card__content {
  margin: 10px 0 !important;
}
.van-card__title {
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 8px;
}
.btn {
  display: flex;
  justify-content: space-around;
  .van-button {
    width: 150px;
  }
}
</style>