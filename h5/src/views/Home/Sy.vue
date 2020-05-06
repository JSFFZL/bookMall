<template>
  <div id="Sy">
    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">

      <van-swipe-item v-for="(item,i) in listImg" :key="i">
        <img v-lazy="item.img"  />
      </van-swipe-item>

    </van-swipe>-->
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in listImg" :key="index">
          <img v-lazy="image.img" class="list-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 书籍列表 -->
    <div class="car">
      <van-card
        v-for="(item,i) in listBook"
        :key="i"
        currency="作者："
        :price="item.author"
        :desc="item.desc"
        :title="item.name"
        :thumb="item.img"
        @click="book(item.id)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
  data() {
    return {
      listImg: [],
      listBook: []
    };
  },
  created() {
    //   轮播图
    this.$http.get("/api/listImg").then(res => {
      // console.log(res);
      this.listImg = res.data;
    });
    // 书籍列表
    this.$http.get("/api/listBook").then(res => {
      // console.log(res);
      this.listBook = res.data;
    });
  },
  methods: {
    book(id) {
      // console.log(id);
      this.$router.push({ name: "About", params: { id } });
    }
  }
};
</script>


<style lang="scss" scoped>
.van-swipe {
  height: 150px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.list-img {
  width: 100%;
}
.van-swipe-item {
  font-size: 0 !important;
  background-color: #fff !important;
  line-height: 0 !important;
}

.van-card__title {
  line-height: 30px !important;
  font-size: 16px;
  font-weight: bold;
}
</style>