import React,{Component} from "react";
import { Link,Redirect } from "react-router-dom";

import {deleteTodo} from "../../utils/fetches"
class Todo extends Component{
    state = {
        redirectToMain: false
    }
    deleteTodo = () => {
        deleteTodo(this.props.todo._id)        
            .then(res=>{
                if(res.status === 200) {
                    this.setState({
                        redirectToMain:true
                    })
                }
            })
    }

    render() {
        const { text,_id } = this.props.todo;
        
        // for updating
        if(this.state.redirectToMain) {
            return (
                <Redirect to="/"/>
            )
        }
        return (            
            <li>
                <label>{text}</label>
                <Link to = {`/edit/${_id}`}>
                    <button>edit</button>
                </Link>
                <button onClick = {this.deleteTodo}>delete</button>
            </li>
        )
    }
}

export default Todo