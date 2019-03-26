import request from '@/utils/request';

export interface LoginRes {
  token: string
  menus?: Array<{}>
  code: string
  msg: string
}


export function login(payload: {}) {
  return request.get<LoginRes>('/home/login', { params: { ...payload, qt: 1 } })
    .then(({ data }) => data);
}

