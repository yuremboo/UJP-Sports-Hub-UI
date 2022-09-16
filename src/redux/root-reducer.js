import {combineReducers} from "redux";
import {authReducer} from "./auth/auth.reducer";
import {breakdownArticlesReducer} from './article-breakdown/breakdown.reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    breakdown: breakdownArticlesReducer,
})


export default rootReducer