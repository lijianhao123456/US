export const GET_TOPIC_DETAIL = "getTopicDetail"
export const TOGGLE_LOVE = "toggleLove"
export const REPLY = "reply"
export const CLEAR_REPLY = "clearReply"

export const getTopicDetail = data => ({ type: GET_TOPIC_DETAIL, data })
export const toggleLove = data => ({ type: TOGGLE_LOVE, data })
export const reply = data => ({ type: REPLY, data })
export const clearReply = data => ({ type: CLEAR_REPLY, data })