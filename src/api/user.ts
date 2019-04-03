import { Api } from '@/utils/request';

interface Response<T= any> {
  token: string
  message: string
  result?: T
  code: number
}


export const login = async (params: {}) =>
  await Api<Response>({
    url: '/user.json',
    method: 'get',
    params
  })
