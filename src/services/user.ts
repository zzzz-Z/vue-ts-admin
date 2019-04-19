import { Api } from '.';

export const login = (params: {}) =>
  Api({
    url: '/user.json',
    method: 'get',
    params
  });
