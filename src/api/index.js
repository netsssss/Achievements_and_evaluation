'use strict';

import axios from 'axios'
import { baseURL } from './config'

axios.interceptors.request.use(function (config) {
  //显示loading
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  return Promise.reject(error)
})

function errorState(res) {
  // 隐藏loading
  if (res && (res.status == 200 || res.status == 304 || res.status == 400)) {
    return res
  } else {
  }
}

function successState(res) {
  // 隐藏loading
  if (res.data.code == '1') {
    return res
  }
}

function apiAxios(method, url, params) {
  let httpDefault = {
    method: method,
    baseURL: baseURL,
    url: url,

    params: method == 'GET' || method == 'DELETE' ? params : null,
    data: method == 'POST' || method == 'PUT' ? JSON.stringify(params) : null,
    timeout: 10000
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then((res) => {
        successState(res)
        resolve(res)
      }).catch((res) => {
        errorState(res)
        reject(res)
      })
  })
}

const getAxios = (url, params) => apiAxios('GET', url, params)
const postAxios = (url, params) => apiAxios('POST', url, params)
const putAxios = (url, params) => apiAxios('PUT', url, params)
const deleteAxios = (url, params) => apiAxios('DELETE', url, params)

export default { getAxios, postAxios, putAxios, deleteAxios }