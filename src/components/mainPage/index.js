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
        if(this.state.isLoading) {
            return (
                <div>Loading ...</div>
            )
        } else if(this.state.error) {
            console.log(this.state.error)
            return <div>ERror</div>
        }
        return (
            <div>
                <form>
                    <input onChange = {this.onChange} type = "text" />
                    <input onClick = {this.addTodo} type = "submit" />
                </form>
                <TodoList todos = {this.state.todos}/>
            </div>
        )
    }
    
}


export default mainPaige