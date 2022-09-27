import { dayPhotoActionTypes } from "./photo-day.types"

const INITIAL_STATE = {
  isLoading: false,
  photoOfTheDay: null
}

export const photoOfTheDayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_START:
      return {
        ...state,
        isLoading: true,
      }
    case dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photoOfTheDay: action.payload,
      }
    case dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}