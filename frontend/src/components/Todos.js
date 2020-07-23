import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getTodos, deleteTodos, updateTodos, startEdit} from '../actions/todosAction'

class Todos extends Component {
    componentDidMount(){
        this.props.getTodos()
    }
    deleteTodo = (todo) => {
        this.props.deleteTodos(todo)
    };
    startEditTodo = (todo) => {
        this.props.startEdit(todo);
    };
    strikeUnstrike = (todo) => {
        this.props.updateTodos(todo)
    }
    render() {
        const {todos} = this.props;
        const todoList = todos.length ? (
            todos.map(todo => {
                return (
                    <div key={todo.id} className="task-wrapper flex-wrapper">
                        <div onClick={() => this.strikeUnstrike(todo)} style={{flex:7}}>
                            {todo.completed === false ? (
                                <span>{todo.title}</span>
                              ) : (
                                <strike>{todo.title}</strike>
                              )
                            }
                        </div>

                        <div style={{flex:1}}>
                            <button onClick={() => {this.startEditTodo(todo)}} className="btn btn-sm btn-outline-info">Edit</button>
                        </div>

                        <div style={{flex:1}}>
                            <button onClick={() => {this.deleteTodo(todo)}} className="btn btn-sm btn-outline-dark delete">Delete</button>
                        </div>
                    </div>
                )
            })
        ) : (
            <div>"no task found"</div>
        );

        return (
            <div  id="list-wrapper">
                {todoList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        todos: state.todosReducer.todoList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTodos : () => dispatch(getTodos()),
        deleteTodos: (todo) => { dispatch(deleteTodos(todo)) },
        updateTodos: (todo) => { dispatch(updateTodos(todo, false))},
        startEdit: (todo) => { dispatch(startEdit(todo)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);