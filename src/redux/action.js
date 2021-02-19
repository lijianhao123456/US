export const TOGGLE_COLLAPSE = 'toggleCollapse'
export const GET_MY_INFO = 'getMyInfo'
export const INIT_COLLAPSE = 'initCollapse'

export const toggleCollapse = data => ({ type: TOGGLE_COLLAPSE, data })
export const getMyInfo = data => ({ type: GET_MY_INFO, data })
export const initCollapse = data => ({ type: INIT_COLLAPSE, data })
