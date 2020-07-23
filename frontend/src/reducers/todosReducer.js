import {GET_TODOS, ADD_TODO, DELETE_TODOS, UPDATE_TODOS, UPDATE_ACTIVE, START_EDIT} from "../actions/types";

const initialState = {
    todoList:[],
    activeItem:{
      title:''
    },
    editing:false,
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todoList: action.payload,
                activeItem: {
                    title: ''
                }
            };
        case ADD_TODO:
            let newTodo = [action.payload, ...state.todoList];

            return {
                ...state,
                activeItem: {
                    title: ''
                },
                todoList: newTodo
            }
        case DELETE_TODOS:
            console.log(action)
            return{
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload),
                activeItem: {
                    title: ''
                },
            }
        case UPDATE_ACTIVE:
            return {
                ...state,
                activeItem : {
                    ...state.activeItem,
                    title: action.payload
                }
            };
        case UPDATE_TODOS:
            console.log(action.payload)
            let newTodoList = state.todoList.map((todo) => {
                return todo.id !== action.payload.id ? todo : action.payload
            });

            return {
                ...state,
                todoList: newTodoList,
                activeItem: {
                    title: ''
                },
                editing: false
            }
        case START_EDIT:
            return {
                ...state,
                activeItem : action.payload,
                editing: true
            }
        default:
            return state
    }
};

export default todosReducer;