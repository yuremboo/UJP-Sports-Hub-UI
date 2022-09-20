import axios from 'axios'
import { dayPhotoActionTypes } from "./photo-day.types"

export const photoOfTheDayRequestStart = () => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_START,
})
export const photoOfTheDayFailureReset = () => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_FAILURE,
})

export const photoOfTheDayRequestSuccess = (data) => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_SUCCESS,
    payload: data,
})


export function getPhotoOfTheDay(photoId) {
    return async (dispatch, getState) => {
        try {
            dispatch(photoOfTheDayRequestStart())
            const photoOfTheDayResponse = await axios.get(`http://localhost:8080/api/v1/image/${photoId}`, {
                headers: { authorization: getState().auth.userObject.jwt }
            })

            dispatch(photoOfTheDayRequestSuccess(photoOfTheDayResponse.data))

        } catch (error) {
            console.log(error)
            dispatch(photoOfTheDayFailureReset())
        }
    }
}

