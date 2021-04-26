import axios from 'axios'
import router from '@/router/index'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 9999,
})
let activeAxios = 0
let timer

export default service
