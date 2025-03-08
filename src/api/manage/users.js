import request from '@/utils/request'

// 查询用户管理列表
export function listUsers(query) {
  return request({
    url: '/manage/users/list',
    method: 'get',
    params: query
  })
}

// 查询用户管理详细
export function getUsers(id) {
  return request({
    url: '/manage/users/' + id,
    method: 'get'
  })
}

// 新增用户管理
export function addUsers(data) {
  return request({
    url: '/manage/users',
    method: 'post',
    data: data
  })
}

// 修改用户管理
export function updateUsers(data) {
  return request({
    url: '/manage/users',
    method: 'put',
    data: data
  })
}

// 删除用户管理
export function delUsers(id) {
  return request({
    url: '/manage/users/' + id,
    method: 'delete'
  })
}
