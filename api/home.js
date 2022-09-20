import fly from '../utils/request.js'
// console.log(fly.get('/home/swiperdata'))
export function getBanners () {
	return fly.get('/home/swiperdata')
}