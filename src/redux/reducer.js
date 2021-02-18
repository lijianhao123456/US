import { TOGGLE_COLLAPSE, GET_MY_INFO } from "./action"

const initState = {
    collapsed: false,
    myInfo: {}
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case TOGGLE_COLLAPSE:
            newState.collapsed = !preState.collapsed
            return newState
        case GET_MY_INFO:
            newState.myInfo = data
            console.log(newState);
            return newState
        default:
            return preState
    }
}