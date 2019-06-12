import axios from 'axios'
import { getCookie,signOut } from 'utils/auth'

axios.defaults.withCredentials = false

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  if (getCookie('token')) {
    config.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g, '')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    signOut()
    // window.location.pathname = '/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})


export const AuthResource = (method, id, data, api='auth') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const PublicResource = (method, url, params = {}) => axios[method](url, params)

