import {breakdownActionTypes} from "./breakdown.types"

const INITIAL_STATE = {
    isLoading: false,
    firstArticlesPayload: [],
    secondArticlesPayload: [],
}

export const breakdownArticlesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case breakdownActionTypes.GET_BREAKDOWN_ARTICLES_START:
            return {
                ...state,
                isLoading: true,
            }
        case breakdownActionTypes.GET_BREAKDOWN_ARTICLES_SUCCESS:
            const {firstArticlesPayload, secondArticlesPayload} = action.payload
            return {
                ...state,
                isLoading: false,
                firstArticlesPayload,
                secondArticlesPayload,
            }
        case breakdownActionTypes.GET_BREAKDOWN_ARTICLES_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}