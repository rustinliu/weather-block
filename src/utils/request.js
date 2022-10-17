import axios from 'axios'
const request = axios.create({
  timeout: 3000,
  method: 'get'
})

export default request
