import { isDev } from '../config/index';
import { getStorage } from '@/utils/storage';
import router from '@/router';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { AxiosRequestConfig } from 'axios';


export const instance = axios.create({
  baseURL: '/api',
  timeout: 15000
});

instance.interceptors.request.use((cfg) => {
  cfg.headers.Token = getStorage('Token') || '';
  return cfg;
});

instance.interceptors.response.use((res) => {
  if (res.data.code === '202') {
    router.push('/');
    return;
  }
  return res as any;
}, (err) => {
  if (isDev) {
    err.response
      ? message.error('错误码：' + err.response.status)
      : message.error('请求超时...');
  }
  return Promise.reject(err);
});



interface Response<T = any> {
  token: string;
  message: string;
  result?: T;
  code: number;
}

export const Api = <T = any>(config: AxiosRequestConfig) => {
  return instance(config).then(({ data }) => data as Response<T>);
};
