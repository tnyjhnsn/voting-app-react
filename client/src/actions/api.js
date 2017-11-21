import axios from 'axios'

const api = () => {
  return axios.create({
    // baseURL: 'http://localhost:3005/'
    // baseURL: 'http://www.tosp.net.au:3005/'
  })
}

export default api
