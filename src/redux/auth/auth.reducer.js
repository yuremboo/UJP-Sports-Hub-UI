import { AuthActionTypes } from './auth.types'

const INITIAL_STATE = {
  isLoading: false,
  userObject: getUserFromLocalStorage(),
  userLocation: "",
  errorMessage: undefined,
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_AUTH_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      }
    case AuthActionTypes.USER_AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userObject: action.payload,
        errorMessage: null,
      }
    case AuthActionTypes.USER_AUTH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      }
    case AuthActionTypes.USER_AUTH_LOGOUT:
      return {
        ...state,
        userObject: null,
      }
    case AuthActionTypes.USER_AUTH_FAILURE_RESET:
      return {
        ...state,
        errorMessage: null,
      }
      case AuthActionTypes.USER_GET_LOCATION_START:
        return {
          ...state,
          isLoading: true,
        }
      case AuthActionTypes.USER_GET_LOCATION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          userLocation: action.payload
        }
      case AuthActionTypes.USER_GET_LOCATION_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
    default:
      return state
  }
}

function getUserFromLocalStorage () {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user):null
}
