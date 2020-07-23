import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getTodos, addTodo, updateActive, updateTodos} from '../actions/todosAction'

class AddTodo extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.activeItem.title.length > 0) {
            if(this.props.editing){
                this.props.updateTodos(this.props.activeItem, this.props.editing);
            }
            else {
                this.props.addTodo(this.props.activeItem);
            }
        }

    };
    handleChange = (e) => {
        let value = e.target.value;
        this.props.updateActive(value)
    };
    render() {
        const {activeItem} = this.props;
        return (
            <div  id="form-wrapper">
                <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange} className="form-control" id="title" value={activeItem.title} type="text" name="title" placeholder="Add task.." />
                         </div>

                        <div style={{flex: 1}} className="mx-sm-2">
                            <input id="submit" className="btn btn-warning mb-2 " type="submit" name="Add" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        activeItem: state.todosReducer.activeItem,
        editing: state.todosReducer.editing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTodos: () => dispatch(getTodos()),
        addTodo: (task) => { dispatch(addTodo(task)) },
        updateTodos: (todo, editing) => { dispatch(updateTodos(todo, editing))},
        updateActive: (value) => { dispatch(updateActive(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);