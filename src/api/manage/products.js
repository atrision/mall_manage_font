import request from '@/utils/request'

// 查询商品管理列表
export function listProducts(query) {
  return request({
    url: '/manage/products/list',
    method: 'get',
    params: query
  })
}

// 查询商品管理详细
export function getProducts(id) {
  return request({
    url: '/manage/products/' + id,
    method: 'get'
  })
}

// 新增商品管理
export function addProducts(data) {
  return request({
    url: '/manage/products',
    method: 'post',
    data: data
  })
}

// 修改商品管理
export function updateProducts(data) {
  return request({
    url: '/manage/products',
    method: 'put',
    data: data
  })
}

// 删除商品管理
export function delProducts(id) {
  return request({
    url: '/manage/products/' + id,
    method: 'delete'
  })
}
