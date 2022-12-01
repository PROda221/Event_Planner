import appActions from '../constants/action-types/app.actionTypes'
import commonActions from '../constants/action-types/common'
import * as appApi from '../api/app.api'

export const personData = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: appActions.PERSON_DATA,
  promise: () => appApi.personDataApi(),
})

export const albumData = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: appActions.ALBUM_DATA,
  promise: () => appApi.albumDataApi(),
})

export const albumsCount = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: appActions.ALBUM_COUNT,
  promise: () => appApi.albumCountApi(data),
})

export const getPhotos = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: appActions.GET_PHOTOS,
  promise: () => appApi.getPhotosApi(data),
})
