import router from '@/router';
import Axios from 'axios'
import { message } from 'ant-design-vue'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import config from '@/config';
import { getStorage } from './storage';


const request = Axios.create({
  baseURL: config.baseUrl,
  timeout: 15000
})

request.interceptors.request.use((cfg) => {
  cfg.headers['Authentication-Token'] = getStorage('Token') || ''
  return cfg
})
/**
 * do something after Response
 */
request.interceptors.response.use((res) => {
  if (res.data.code === '202') {
    router.push('/')
    return
  }
  // 为避免使用axios[method]返回值类型丢失,故不直接返回res.data
  return res as any
}, (err) => {
  if (!config.isProd) {
    err.response
      ? message.error('错误码：' + err.response.status)
      : message.error('请求超时...')
  }
  return Promise.reject(err)
})

export const exportFile = (url: string, params?: {}) =>
  Axios({ url, params, method: 'get', responseType: 'blob' }).then((res) => {
    const name = res.headers['content-disposition']
    const fileName = name.substring(name.indexOf('=') + 1, name.length)
    const blob = new Blob([res.data])
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  })


export default request

