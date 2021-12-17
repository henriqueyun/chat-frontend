import { boot } from 'quasar/wrappers'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance
})

export { axios }
