import fly from '../utils/request.js'
// console.log(fly.get('/home/swiperdata'))

// 获取轮播图接口
export function getBanners() {
  return fly.get('/home/swiperdata')
}

// 获取分类数据
export const getCatitems = () => {
  return fly.get('/home/catitems')
}

// 获取内容数据
export const getFloorList = () => {
  return fly.get('/home/floordata')
}
