<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="item in bannersList" :key="item.id">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goDetail(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in catitems" :key="index" @click="goTab(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in FloorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image class="left-img" :src="item.product_list[0].image_src"
              :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0"
              :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getBanners,
    getCatitems,
    getFloorList
  } from '@/api/home.js'
  export default {
    data() {
      return {
        bannersList: [],
        catitems: [],
        FloorList: []
      }
    },
    methods: {
      // 加载轮播图数据
      async getBanners() {
        const res = await getBanners()
        // console.log('res', res)
        this.bannersList = res.message
      },
      // 加载导航列表数据
      async getCatitems() {
        const res = await getCatitems()
        // console.log('res', res)
        this.catitems = res.message
      },
      onLoad() {
        this.getBanners()
        this.getCatitems()
        this.getFloorList()
      },
      // 轮播图跳转
      goDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + id
        })
      },
      // 跳转分类区域
      goTab(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取内容数据
      async getFloorList() {
        const res = await getFloorList()
        console.log('res', res)
        res.message.forEach(item => {
          item.product_list.forEach(val => {
            val.url = '/subpkg/goods-list/goods-list?' + val.navigator_url.split('?')[1]
          })
        })
        this.FloorList = res.message
        // console.log('this.FloorList', this.FloorList)
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

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
