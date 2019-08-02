import React from 'react';
import Todo from "./todoRow";

const todoList = ({todos}) => {
    return (
        <ul>
            {todos.map((todo,i) => <Todo key = {i} todo = {todo} />)}
        </ul>
    )
}

export default todoList;