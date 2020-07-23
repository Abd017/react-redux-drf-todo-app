import React from 'react';
import './App.css';
import Todos from './components/Todos.js';
import AddTodo from './components/addTodo.js';
import Header from './components/Header.js';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <div className="container">
            <div id="task-container">
                <Header />
                <AddTodo />
                <Todos />
            </div>
        </div>
    </Provider>
  );
}

export default App;
