import request from '@utils/request'

export function fetchList(query) {
  return request({
    url: '/api/public/currencies/',
    method: 'get',
  })
}

