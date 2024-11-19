import request from '@/utils/request' 
import request_urlencoded from '@/utils/request_urlencoded' 

// 验证登录信息
export function login(data) {
  return request_urlencoded({
    url: '/user/login', 
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  });
}

// 注册
export function register(data) {
  return request_urlencoded({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get',
  });
}

// 更新用户基本信息
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data:data,
    headers:{
      Authorization: localStorage.getItem('token')
    }
  });
}

// 更新用户头像
export function updateAvatar(avatarUrl) {
  return request({
    url: '/user/updateAvatar',
    method: 'patch',
    params: { avatarUrl },
    headers:{
      Authorization: localStorage.getItem('token')
    }
  });
}

// 更新用户密码
export function updatePassword(data) {
  return request({
    url: '/user/updatePwd',
    method: 'patch',
    data,
  });
}


