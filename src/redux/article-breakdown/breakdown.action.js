import axios from 'axios'
import { breakdownActionTypes } from "./breakdown.types"

export const breakdownRequestStart = () => ({
    type: breakdownActionTypes.GET_BREAKDOWN_ARTICLES_START,
})
export const breakdownFailureReset = () => ({
    type: breakdownActionTypes.GET_BREAKDOWN_ARTICLES_FAILURE,
})

export const breakdownRequestSuccess = (data) => ({
    type: breakdownActionTypes.GET_BREAKDOWN_ARTICLES_SUCCESS,
    payload: data,
})


export function getBreakdownArticles(firstCategoryId, secondCategoryId) {
    return async (dispatch, getState) => {
        try {
            dispatch(breakdownRequestStart())
            const firstArticlesResponse = await axios.get(`http://localhost:8080/api/v1/articles/newest/${firstCategoryId}`, {
            })
            const firstArticlesPayload = cutArticles(firstArticlesResponse.data);

            const secondArticlesResponse = await axios.get(`http://localhost:8080/api/v1/articles/newest/${secondCategoryId}`, {
            })
            const secondArticlesPayload = cutArticles(secondArticlesResponse.data);

            dispatch(breakdownRequestSuccess({ firstArticlesPayload, secondArticlesPayload }))

        } catch (error) {
            console.log(error)
            dispatch(breakdownFailureReset())
        }
    }
}

function cutArticles(articles) {
    return articles.map(article => {
        const { id, picture, title, shortText, category } = article
        return {
            id,
            picture,
            title,
            shortText,
            category: category.name
        }
    })
}