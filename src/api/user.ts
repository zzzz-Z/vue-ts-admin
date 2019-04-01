import request from '@/utils/request';

export interface LoginRes {
  token: string
  menus?: Array<{}>
  code: string
  msg: string
}


export const login = async (params: {}) => {
  const { data } = await request.get('/login', { params })
  return data as LoginRes
}

