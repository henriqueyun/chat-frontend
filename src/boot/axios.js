import { boot } from 'quasar/wrappers'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: 'http://127.0.0.1:3001' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance
})

export { axios }
