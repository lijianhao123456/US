import { TOGGLE_COLLAPSE } from "./action"

const initState = {
    collapsed: false,
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case TOGGLE_COLLAPSE:
            newState.collapsed = !preState.collapsed
            return newState
        default:
            return preState
    }
}