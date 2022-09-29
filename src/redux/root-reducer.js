import {combineReducers} from "redux";
import {authReducer} from "./auth/auth.reducer";
import {breakdownArticlesReducer} from './article-breakdown/breakdown.reducer'
import {photoOfTheDayReducer} from "./photo-of-the-day/photo-day.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    breakdown: breakdownArticlesReducer,
    photoOfTheDay: photoOfTheDayReducer
})


export default rootReducer