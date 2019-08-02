import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import {getTodo, changeTodo } from '../../utils/fetches';

class EditPage extends Component {
    state = {
        inputValue: "",
        redirectToMain: false,
        isLoading: true,
        error: null,
        todo:null
    }
    getTodo = () => {
        this.setState({
            isLoading:true
        })
        const { match: { params } } = this.props;

        getTodo(params.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    todo: data.todo,
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

    editTodo = (e) => {
        e.preventDefault();
        const {_id} = this.state.todo
        const {inputValue} = this.state
        changeTodo(_id,inputValue)        
            .then((res)=>{
                if(res.status === 200) {
                    this.setState({
                        redirectToMain: true
                    })
                } else {
                    this.setState({
                        error: "error"
                    })
                }
            })
    }
    componentDidMount() {
        this.getTodo();
    }
    onChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const {error,isLoading} = this.state;        
        if(this.state.redirectToMain) {
            return (
                <Redirect to ="/" />
            )
        }
        if(isLoading) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div>
                <form>
                    <input onChange = {this.onChange} defaultValue = {this.state.todo.text} type = "text" />
                    <input onClick = {this.editTodo} type = "submit" />
                </form>
                {error ? <div>Error</div>:null}
            </div>            
        )
    }
}


export default EditPage