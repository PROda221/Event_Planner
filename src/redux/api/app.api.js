import {
  personEndpoint,
  albumEndpoint,
  photosEndpoint,
} from '../constants/endpoint-constants'
import apiService from './axios-service'

export const personDataApi = () => {
  return apiService.get(`${personEndpoint}`)
}

export const albumDataApi = () => {
  return apiService.get(`${albumEndpoint}`)
}

export const albumCountApi = data => {
  let queryParams = ''
  if (data) {
    queryParams = `?userId=${data}`
  }
  return apiService.get(`${albumEndpoint}${queryParams}`)
}

export const getPhotosApi = data => {
  let queryParams = ''
  if (data) {
    queryParams = `?albumId=${data}`
  }
  return apiService.get(`${photosEndpoint}${queryParams}`)
}
