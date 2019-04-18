import router from '@/router';
import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config';
import { getStorage } from './storage';


export const request = axios.create({
  baseURL: '/api',
  timeout: 15000
})

request.interceptors.request.use((cfg) => {
  cfg.headers.Token = getStorage('Token') || ''
  return cfg
})

request.interceptors.response.use((res) => {
  if (res.data.code === '202') {
    router.push('/')
    return
  }
  // 为避免使用axios[method]返回值类型丢失,so不直接返回res.data
  return res as any
}, (err) => {
  if (config.isDev) {
    err.response
      ? message.error('错误码：' + err.response.status)
      : message.error('请求超时...')
  }
  return Promise.reject(err)
})


export const Api = <T>(config: AxiosRequestConfig) => request(config).then(({ data }) => data as T)

