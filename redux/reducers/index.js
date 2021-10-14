import { combineReducers } from "redux"
import {user} from './users'


//create reducers
const Reducers = combineReducers({
    userState: user
})

export default Reducers