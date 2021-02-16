export const GET_TOPIC_LIST = 'getTopicList'
export const GET_TOP_TOPIC = 'getTopTopic'
export const GET_LABELS = 'getLabels'


export const getTopicList = data => ({ type: GET_TOPIC_LIST, data })
export const getTopTopic = data => ({ type: GET_TOP_TOPIC, data })
export const getLabels = data => ({ type: GET_LABELS, data })
