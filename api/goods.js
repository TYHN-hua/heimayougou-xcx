import fly from '../utils/request.js'

// 获取商品列表数据
export const getSearchGoods = (data) => {
  return fly.get('/goods/search', data)
}
