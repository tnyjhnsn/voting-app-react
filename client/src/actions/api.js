import axios from 'axios'

const api = () => {
  return axios.create({
    // baseURL: '/api'
    // baseURL: 'http://localhost:3005/api',
    baseURL: 'http://www.tosp.net.au:3005/api',
  })
}

export default api
