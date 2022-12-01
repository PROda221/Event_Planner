import appActions from '../constants/action-types/app.actionTypes'
import authActions from '../constants/action-types/auth.actionTypes'
import persistWraper from './persistWraper'
import _ from 'lodash'
import { Platform } from 'react-native'

const initialState = {
  personDataLoading: false,
  personDataSuccess: null,
  personDataFail: false,

  albumDataLoading: false,
  albumDataSuccess: null,
  albumDataFail: false,

  albumCountLoading: false,
  albumCountSuccess: null,
  albumCountFail: false,

  getPhotosLoading: false,
  getPhotosSuccess: null,
  getPhotosFail: false,
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.PERSON_DATA.START:
      return {
        ...state,
        personDataLoading: true,
        personDataSuccess: null,
        personDataFail: false,
      }
    case appActions.PERSON_DATA.SUCCESS:
      return {
        ...state,
        personDataLoading: false,
        personDataSuccess: action.payload,
      }
    case appActions.PERSON_DATA.FAIL:
      return {
        ...state,
        personDataFail: action && action.errors,
        personDataLoading: false,
      }

    case appActions.ALBUM_DATA.START:
      return {
        ...state,
        albumDataLoading: true,
        albumDataSuccess: null,
        albumDataFail: false,
      }
    case appActions.ALBUM_DATA.SUCCESS:
      return {
        ...state,
        albumDataLoading: false,
        albumDataSuccess: action.payload,
      }
    case appActions.ALBUM_DATA.FAIL:
      return {
        ...state,
        albumDataFail: action && action.errors,
        albumDataLoading: false,
      }

    case appActions.ALBUM_COUNT.START:
      return {
        ...state,
        albumCountLoading: true,
        albumCountSuccess: null,
        albumCountFail: false,
      }
    case appActions.ALBUM_COUNT.SUCCESS:
      return {
        ...state,
        albumCountLoading: false,
        albumCountSuccess: action.payload,
      }
    case appActions.ALBUM_COUNT.FAIL:
      return {
        ...state,
        albumCountFail: action && action.errors,
        albumCountLoading: false,
      }

    case appActions.GET_PHOTOS.START:
      return {
        ...state,
        getPhotosLoading: true,
        getPhotosSuccess: null,
        getPhotosFail: false,
      }
    case appActions.GET_PHOTOS.SUCCESS:
      return {
        ...state,
        getPhotosLoading: false,
        getPhotosSuccess: action.payload,
      }
    case appActions.GET_PHOTOS.FAIL:
      return {
        ...state,
        getPhotosFail: action && action.errors,
        getPhotosLoading: false,
      }

    default:
      return state
  }
}

const blackList = _.without(
  Object.keys(initialState),
  // Persist all the keys listed below
  'presentSideMenuOptions',
  'presentSideMenuSubOptions',
  'userInfoSuccess',
  'getAllowedLanguagesSuccess',
)

export default persistWraper(AppReducer, blackList, 'App')
