import axios from 'axios'
import moment from 'moment'

import { getAsyncStorage } from '../../utils/asyncStorage'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
axios.defaults.timeout = 15000

axios.interceptors.response.use(
  function (response) {
    // console.log("interceptor response", response);
    return response
  },
  function (error) {
    //  console.log("interceptor response error", error.response.data);
    return Promise.reject(error)
  },
)

axios.interceptors.request.use(
  function (response) {
    // console.log("interceptor request", response);
    return response
  },
  function (error) {
    //  console.log("interceptor request error", error.response.data);
    return Promise.reject(error)
  },
)

const AxiosService = function async() {
  let Authorization = null

  async function addHeaders(userConfig) {
    const { params, headers, timeout, ...restConfigs } = userConfig
    let globalHeaders = {
      'current-timestamp': moment().valueOf(),
    }

    const traceId = await getAsyncStorage('traceId')
    const authToken = await getAsyncStorage('authToken')
    if (Authorization || authToken) {
      globalHeaders.Authorization = `bearer ${Authorization || authToken}`
    }

    if (traceId) {
      globalHeaders['X-Correlation-ID'] = traceId
    }

    const { filter, ...restParams } = params || {}

    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
      },
      timeout,
    }
  }

  function getAuthorizationToken() {
    return Authorization
  }

  function setAuthorizationToken(token) {
    Authorization = token
  }

  function resetAuthorizationToken() {
    Authorization = null
  }

  async function get(endPoint, userConfig = {}) {
    const headers = await addHeaders(userConfig)
    return axios.get(endPoint, headers)
  }

  async function put(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig)
    return axios.put(endPoint, params, headers)
  }

  async function post(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig)
    console.log('endp', `${Config.BASE_URL}${endPoint}`)

    return axios.post(endPoint, params, headers)
  }

  return {
    setAuthorizationToken,
    getAuthorizationToken,
    resetAuthorizationToken,
    get,
    post,
    put,
  }
}

export default AxiosService()
