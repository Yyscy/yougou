<template>
  <view>
    <van-card v-for="item in goodsList" 
    :key="item.goods_id" 
    :price="item.goods_price | tofixed" 
    :title="item.goods_name" 
    :thumb="item.goods_small_logo || defaultPic"
    :thumb-link="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
    ></van-card>
  </view>
</template>

<script>
  import {
    getSearchGoods
  } from '@/api/goods.js'
  import  toast  from '@/utils/toast.js'
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
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 是否正在请求数据
        isloading: false,
         defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {
      async loadGoods(stopPull) {
          // ** 打开节流阀
          this.isloading = true
         const res = await getSearchGoods(this.queryObj)
            stopPull && stopPull()
           // ** 关闭节流阀
           this.isloading = false
           // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
           this.goodsList = [...this.goodsList, ...res.message.goods]
           this.total = res.message.total
       },
    },
    // 触底的事件
    onReachBottom() {
        // 判断是否还有下一页数据
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return toast('数据加载完毕！')
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return
      
        this.queryObj.pagenum += 1
        this.loadGoods()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj= {
        // 查询关键词
        query: '',
        // 商品分类Id
        cid: '',
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10
      },
      this.total = 0
      this.isloading = false
      this.goodsList = []
    
      // 2. 重新发起请求
      this.loadGoods(() => uni.stopPullDownRefresh())
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.loadGoods()
    }
  }
</script>

<style lang="scss">
</style>
