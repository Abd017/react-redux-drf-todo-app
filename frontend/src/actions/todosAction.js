import axios from "axios";
import {GET_TODOS, UPDATE_TODOS, UPDATE_ACTIVE, DELETE_TODOS, ADD_TODO, START_EDIT} from "./types";

// get todos
export const getTodos = () =>{
    let config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/task-list/',
      headers: {}
    };
    return (dispatch) => {
        axios(config)
            .then(res => {
                dispatch({
                    type: GET_TODOS,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
};

// add new todos
export const addTodo = (todo) => {
    let data = JSON.stringify(todo);
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/task-create/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    return (dispatch) =>{
        axios(config)
            .then(res => {
                dispatch({
                    type: ADD_TODO,
                    payload: res.data
                })
            })
    }
};

//delete todos
export const deleteTodos = (todo) => {
    let config = {
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/task-delete/'+todo.id+'/',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      }
    };
    return (dispatch) => {
        axios(config).then(dispatch({
            type: DELETE_TODOS,
            payload: todo.id
        }))

    }
};

// Update current task
export const updateActive = (value) => {
    return {
        type: UPDATE_ACTIVE,
        payload: value
    }
};

// Update todos status
export const updateTodos = (todo, editing) => {
    console.log(todo)
    if(!editing) {
        todo['completed'] = !todo['completed']
    }
    let data = JSON.stringify(todo);
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/task-update/'+todo.id+"/",
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    return (dispatch) =>{
        axios(config)
            .then(res => {
                dispatch({
                    type: UPDATE_TODOS,
                    payload: res.data
                })
            })
    }
};

// Update current task
export const startEdit = (todo) => {
    return {
        type: START_EDIT,
        payload: todo
    }
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}