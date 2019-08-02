const addTodo = (text) => {
    const body = {
        todoText: text
    }
    return fetch("http://localhost:3003/todos",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify(body),
    })
}

const deleteTodo = _id => {
    return fetch("http://localhost:3003/todos",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:"DELETE",
        body:JSON.stringify({_id}),
    })
}

const getTodos = () => {
    return fetch("http://localhost:3003/todos")
}

const getTodo = (id) => {
    return fetch("http://localhost:3003/todo/"+id)
}

const changeTodo = (id,text) => {
    const body = {
        todoText: text,
        id
    }
    return fetch("http://localhost:3003/todos",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:"PUT",
        body:JSON.stringify(body),
    })
}

export{ addTodo, deleteTodo, getTodos, changeTodo, getTodo }