<template>
  <view class="goods-list">
    <block v-for="item in goodsList" :key="item.goods_id">
      <my-goods :goods="item" :url="`/subpkg/goods-detail/goods-detail?goods_id=${item.goods_id}`"></my-goods>
    </block>
  </view>
</template>

<script>
  import {
    getSearchGoods
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodsList: [],
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading: false,
        total: 0
      }
    },
    methods: {
      async getSearchGoods(cb) {
        try {
          this.isLoading = true
          const res = await getSearchGoods(this.queryObj)
          console.log('getSearchGoods', res)
          this.goodsList = [...this.goodsList, ...res.message.goods]
          this.total = res.message.total
        } finally {
          this.isLoading = false
          // 只要数据请求完毕，就立即按需调用 cb 回调函数
          cb && cb()
        }
      },
      onLoad(options) {
        this.queryObj.query = options.query || ''
        this.getSearchGoods()
      },
      onReachBottom() {
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
          return toast('没有更多数据了~', 'none', 3000)
        }
        if (this.isLoading) return
        this.queryObj.pagenum++
        this.getSearchGoods()
      },
      onPullDownRefresh() {
        this.queryObj = {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        }
        this.isLoading = false
        this.goodsList = []
        this.total = 0
        this.getSearchGoods(() => {
          uni.stopPullDownRefresh()
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
