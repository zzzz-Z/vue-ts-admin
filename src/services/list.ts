import { Api } from '.';


export const getList = (params = {}) =>
  Api({ url: '/list.json', method: 'get', params })
    .then((res) => ({
      dataSource: res.result,
      totalSize: res.result.length,
      totalPage: 2
    }));



