import axios from 'axios'
const request = axios.create({
  timeout: 3000,
  method: 'get'
})
request.interceptors.request.use(function (config) {
  config.params = { ...config.params, key: '607e1e2275584d88b018b89410b3f0d0', lang: 'en' }
  return config
})
export default request
