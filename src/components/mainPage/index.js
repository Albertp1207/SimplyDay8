import React, {Component} from 'react';
import TodoList from "./todoList"
import {getTodos,addTodo} from "../../utils/fetches";

import {context} from "../../App";

class mainPaige extends Component {
    state = {
        todos:[],
        error: null,
        isLoading: false,
        inputValue: ""
    }
    getTodos = () => {
        this.setState({
            isLoading:true
        })
        getTodos()
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    todos: data.todos,
                    isLoading:false
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    isLoading:false
                })   
            })
    }

    addTodo = (e) => {
        e.preventDefault();
        addTodo(this.state.inputValue)             
            .then((res)=>{
                if(res.status === 200) {
                    this.setState({
                        inputValue: ""
                    })      
                    this.getTodos()             
                } else {
                    console.error("change text")
                }
            })
        
    }

    onChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }
    componentDidMount() {
        this.getTodos();
    }
    render() {
        const {isLoading, error} = this.state;
        if(isLoading) {
            return (
                <div>Loading ...</div>
            )
        }
        return (
            <div>
                <form>
                    <input onChange = {this.onChange} type = "text" />
                    <input onClick = {this.addTodo} type = "submit" />
                </form>
                {error ? <div>error</div> : <TodoList todos = {this.state.todos} />}
            </div>
        )
    }
    
}


export default mainPaige