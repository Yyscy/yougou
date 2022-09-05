import fly from '../utils/request.js'
// console.log(fly.get('/home/swiperdata'))
export function getBanners () {
	return fly.get('/home/swiperdata')
};

/**
 * 获取分类数据
 * */
export const getNavList = () => {
	return fly.get('/home/catitems')
}

/**
 * 获取楼层数据
 * */
export const getFloorList = () => {
	return fly.get('/home/floordata')
}