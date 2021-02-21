import { TOGGLE_COLLAPSE, GET_MY_INFO, INIT_COLLAPSE, LOGIN, LOGOUT } from "./action"

const initState = {
    collapsed: false,
    myInfo: {},
    token: ""
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case INIT_COLLAPSE:
            newState.collapsed = data
            return newState
        case TOGGLE_COLLAPSE:
            newState.collapsed = !preState.collapsed
            return newState
        case GET_MY_INFO:
            newState.myInfo = data
            return newState
        case LOGIN:
            newState.token = data
            console.log(newState);
            return newState
        case LOGOUT:
            newState.token = initState.token
            console.log(newState);
            return newState
        default:
            return preState
    }
}