import {
    TODO_TO_TOP,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
    DELETE_FINISHED_ITEM,
    FINISHED_TO_TOP,
    TO_FINISHED,
    TO_TODOS,
    CLEAR
} from './constant';

export const addTodo = data => ({ type: ADD_TODO_ITEM, data })
export const deleteTodo = data => ({ type: DELETE_TODO_ITEM, data })
export const deleteFinished = data => ({ type: DELETE_FINISHED_ITEM, data })
export const todoToTop = data => ({ type: TODO_TO_TOP, data })
export const finishedToTop = data => ({ type: FINISHED_TO_TOP, data })
export const update = (id, done) => {
    if (done === true) {
        return { type: TO_FINISHED, data: id }
    } else {
        return { type: TO_TODOS, data: id }
    }
}
export const clear = (data) => ({ type: CLEAR, data })
