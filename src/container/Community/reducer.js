import { GET_TOPIC_LIST, GET_TOP_TOPIC, GET_LABELS, CHANGE_LABEL, GET_BIRTH, GET_RANK } from "./action"

const initState = {
    topicList: {},
    topTopic: [{ user: { username: "" } }],
    labels: [],
    currentLabel: 0,
    birth: [],
    rank: []
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case GET_TOPIC_LIST:
            newState.topicList = data
            return newState
        case GET_TOP_TOPIC:
            newState.topTopic = data
            return newState
        case GET_LABELS:
            newState.labels = [{ label_id: 0, label_name: "全部", img_name: "quanbu" }, ...data]
            return newState
        case CHANGE_LABEL:
            newState.currentLabel = data
            return newState
        case GET_BIRTH:
            newState.birth = data
            console.log(newState);
            return newState
        case GET_RANK:
            newState.rank = data
            return newState
        default:
            return preState
    }
}