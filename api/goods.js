import fly from '../utils/request.js'

export const getSearchGoods = data => {
   return fly.get('/goods/search', data)
}