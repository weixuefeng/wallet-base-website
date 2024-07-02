/*
 * @Author:
 * @Date: 2024-01-09 12:43:54
 * @LastEditors:
 * @LastEditTime: 2024-01-15 14:39:17
 */
import axios, { Axios } from 'axios'
import { API_BASE_URL } from '../constants/setting'
let client = refreshClient()

function refreshClient(): Axios {
  return axios.create({
    timeout: 15000,
  })
}

function _get(url: string) {
  return new Promise(function (resolve, reject) {
    client
      .get(`${API_BASE_URL}/${url}`)
      .then(response => {
        if (response.status === 200) {
          let res = response.data
          if (res.code == '0') {
            resolve(res.data)
          } else {
            console.error(res.msg)
          }
        } else {
          reject(response.statusText)
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

function _post(url: string, params: object) {
  return new Promise(function (resolve, reject) {
    client
      .post(`${API_BASE_URL}/${url}`, params)
      .then(response => {
        if (response.status === 200) {
          let res = response.data
          if (res.error_code == 1) {
            resolve(res.result)
          } else {
            resolve(res.error_message)
            console.error(res.error_message)
          }
        } else {
          reject(response.statusText)
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

let httpInstance: Http = null

class Http {
  static getInstance() {
    if (httpInstance === undefined || httpInstance == null) {
      httpInstance = new Http()
    }
    return httpInstance
  }

  requestLogin(address: string) {
    var params = {
      address: address,
    }
    return _post(`user/login/`, params)
  }
}
const http = new Http()
export default http
