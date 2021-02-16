import {
    DELETE_TODO_ITEM, 
    TODO_TO_TOP, 
    ADD_TODO_ITEM, 
    DELETE_FINISHED_ITEM,
    FINISHED_TO_TOP, 
    TO_FINISHED, 
    TO_TODOS, 
    CLEAR
} from './constant'

const initState = {
    todos: [
        { id: '001', name: '吃饭' },
        { id: '002', name: '睡觉' },
        { id: '003', name: '学vue' },
        { id: '004', name: '学react' }
    ],
    finished: [
        { id: '005', name: '下载git' },
        { id: '006', name: '下载npm' },
        { id: '007', name: '下载yarn' },
        { id: '008', name: '下载node' }
    ]
}

export default function reducer(preState = initState, action) {
    const { type, data } = action
    const { todos, finished } = preState
    let newState = preState
    let newTodos, newFinished
    switch (type) {
        case ADD_TODO_ITEM:
            newState.todos = [...todos, data]
            return newState
        case DELETE_TODO_ITEM:
            newState.todos = todos.filter((todoObj) => {
                return todoObj.id !== data
            })
            return newState
        case DELETE_FINISHED_ITEM:
            newState.finished = finished.filter((item) => {
                return item.id !== data
            })
            return newState
        case TODO_TO_TOP:
            // let newTodos = todos.filter((item) => {
            //     return item.id !== data
            // })
            // const todoObj = todos.filter((item) => {
            //     return item.id === data
            // })
            newTodos = [...todos.filter((item) => {
                return item.id === data
            }), ...todos.filter((item) => {
                return item.id !== data
            })]
            newState.todos = newTodos
            return newState
        case FINISHED_TO_TOP:
            // let newFinished = finished.filter((item) => {
            //     return item.id !== data
            // })
            // const finishedObj = finished.filter((item) => {
            //     return item.id === data
            // })
            newFinished = [...finished.filter((item) => {
                return item.id === data
            }), ...finished.filter((item) => {
                return item.id !== data
            })]
            newState.finished = newFinished
            return newState
        case TO_FINISHED:
            newState.todos = todos.filter((item) => {
                return item.id !== data
            })
            newState.finished.push(todos.find(item => item.id === data))
            return newState
        case TO_TODOS:
            newState.finished = finished.filter((item) => {
                return item.id !== data
            })
            newState.todos.push(finished.find(item => item.id === data))
            return newState
        case CLEAR:
            return { todos: [], finished: [] }
        default:
            return preState
    }
}