<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>
      <view>
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
          <swiper-item v-for="(item, i) in banners" :key="i">
            <view class="swiper-item">
              <!-- 动态绑定图片的 src 属性 -->
              <image  @click="goDetail(item.goods_id)"  :src="item.image_src"></image>
            </view>
          </swiper-item>
        </swiper>
    </view>
      
      <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navs" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
  <!-- 楼层图片区域 -->
  <view class="floor-img-box"  v-for="(item, i) in floors" :key="i">
   <!-- 左侧大图片的盒子 -->
     <navigator class="left-img-box" :url="item.product_list[0].url">
       <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
     </navigator>
     <!-- 右侧 4 个小图片的盒子 -->
     <view class="right-img-box">
       <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
         <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
       </navigator>
     </view>
</view>
  </view>
</template>

<script>
import {
		getBanners,
		getNavList,
    getFloorList
	} from '@/api/home.js'
	export default {
		data() {
			return {
				banners: [],
				navs: [],
        floors: []
			};
		},
		methods: {
			async loadBanners() {
				const res = await getBanners()
				this.banners = res.message
			},
      // 加载导航列表数据
      async loadNavList() {
      	const res = await getNavList()
      	this.navs = res.message
      },
      // 楼层数据
      async getFloorList() {
      			  const res = await getFloorList()
               if (res.meta.status !== 200) return uni.$showMsg()
              
                // 通过双层 forEach 循环，处理 URL 地址
                res.message.forEach(floor => {
                  floor.product_list.forEach(prod => {
                    prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
                  })
                })
              
                this.floors = res.message
      			},
      // 跳转商品详情
      goDetail (id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
		},
		onLoad() {
			this.loadBanners()
			this.loadNavList()
      this.getFloorList()
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
  .nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.topSearch {
  width: 750rpx;
  height: 70px;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .search_btn {
    width: 400rpx;
    height: 30px;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>