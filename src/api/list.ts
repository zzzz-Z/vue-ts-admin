
import { Api } from '@/utils/request';

interface Response<T= any> {
  token: string
  message: string
  result?: T
  code: number
}


export const getList = async (params = {}) => {
  return Api<Response>({ url: '/list.json', method: 'get', params })
    .then((res) => ({
      dataSource: res.result,
      totalSize: res.result.length,
      totalPage: 2
    }))

}


