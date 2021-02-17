import { createStore, applyMiddleware, combineReducers } from 'redux'
import Community from '../container/Community/reducer'
import Topic from '../container/Topic/reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const allReducers = combineReducers({
    Community,
    Topic,
})

export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))