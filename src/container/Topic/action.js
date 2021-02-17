export const GET_TOPIC_DETAIL ="getTopicDetail"
export const TOGGLE_LOVE ="toggleLove"

export const getTopicDetail = data => ({ type: GET_TOPIC_DETAIL, data })
export const toggleLove = data => ({ type: TOGGLE_LOVE, data })