<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="item in bannersList" :key="item.id">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goDetail(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getBanners
  } from '@/api/home.js'
  export default {
    data() {
      return {
        bannersList: []
      }
    },
    methods: {
      async getBanners() {
        const res = await getBanners()
        console.log('res', res)
        this.bannersList = res.message
      },
      onLoad() {
        this.getBanners()
      },
      goDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
</style>
