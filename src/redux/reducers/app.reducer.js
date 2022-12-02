import appActions from '../constants/action-types/app.actionTypes'
import authActions from '../constants/action-types/auth.actionTypes'
import persistWraper from './persistWraper'
import _ from 'lodash'
import { Platform } from 'react-native'

const initialState = {
  searchLoading: false,
  searchSuccess: null,
  searchFail: false,
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.SEARCH.START:
      return {
        ...state,
        searchLoading: true,
        searchSuccess: null,
        searchFail: false,
      }
    case appActions.SEARCH.SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchSuccess: action.payload,
      }
    case appActions.SEARCH.FAIL:
      return {
        ...state,
        searchFail: action && action.errors,
        searchLoading: false,
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
