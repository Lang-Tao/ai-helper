import axios from 'axios';
import qs from 'qs';  // 用于将对象序列化为 x-www-form-urlencoded 格式

// 创建 Axios 实例
const service = axios.create({
  baseURL: 'http://192.168.97.109:8081/api',  // 后端服务的基础地址
  timeout: 3000  // 请求超时时间93
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 设置 x-www-form-urlencoded 的 Content-Type
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    // 如果请求数据存在，并且是以 JSON 格式传递，则将其转换为 x-www-form-urlencoded
    if (config.method === 'post' || config.method === 'put') {
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  error => {
    // 请求错误时，返回错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 返回响应数据
    return response.data;
  },
  error => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default service;
