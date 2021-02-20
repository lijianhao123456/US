import { GET_TOPIC_DETAIL, TOGGLE_LOVE, REPLY, CLEAR_REPLY, CLEAR_TOPIC } from "./action"

const initState = {
    topicDetail: {},
    replyInfo: {}
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case GET_TOPIC_DETAIL:
            newState.topicDetail = data
            return newState
        case TOGGLE_LOVE:
            newState.topicDetail.love = !preState.topicDetail.love
            newState.topicDetail.love_count = preState.topicDetail.love ? newState.topicDetail.love_count + 1 : newState.topicDetail.love_count - 1
            return newState
        case REPLY:
            newState.replyInfo = data
            return newState
        case CLEAR_REPLY:
            newState.replyInfo = {}
            return newState
        case CLEAR_TOPIC:
            newState = initState
            return newState
        default:
            return preState
    }
}