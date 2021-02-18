export const GET_TOPIC_LIST = 'getTopicList'
export const GET_TOP_TOPIC = 'getTopTopic'
export const GET_LABELS = 'getLabels'
export const CHANGE_LABEL = 'changeLabel'
export const GET_BIRTH = 'getBirth'
export const GET_RANK = 'getRank'


export const getTopicList = data => ({ type: GET_TOPIC_LIST, data })
export const getTopTopic = data => ({ type: GET_TOP_TOPIC, data })
export const getLabels = data => ({ type: GET_LABELS, data })
export const changeLabel = data => ({ type: CHANGE_LABEL, data })
export const getBirth = data => ({ type: GET_BIRTH, data })
export const getRank = data => ({ type: GET_RANK, data })
