import { GET_TOPIC_LIST, GET_TOP_TOPIC, GET_LABELS, CHANGE_LABEL } from "./action"

const initState = {
    topicList: {
        page_num: 1,
        page_size: 10,
        rows: [1, 1, 1],
        total: 1,
        total_page: 1
    },
    topTopic: [{ user: { username: "" } }],
    labels: [],
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    let newState = { ...preState }
    switch (type) {
        case GET_TOPIC_LIST:
            newState.topicList = data
            console.log(newState);
            return newState
        case GET_TOP_TOPIC:
            newState.topTopic = data
            console.log(newState);
            return newState
        case GET_LABELS:
            newState.labels = [{ label_id: 0, label_name: "全部", img_name: "quanbu" }, ...data]
            console.log(newState);
            return newState
        default:
            return preState
    }
}