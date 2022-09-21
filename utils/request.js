import Fly from 'flyio/dist/npm/wx'
import toast from '@/utils/toast.js'
const fly = new Fly()

fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1' //添加请求拦截器

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    console.log()
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
    console.log(err)
    toast.err('网络错误了')
  }
)

export default fly
