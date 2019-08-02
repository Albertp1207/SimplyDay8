const express = require("express");
const app = express();
const path = require('path');
const indexPath = path.join(__dirname,"../public/index.html");
const api = require("./api")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/firstDB",{ useNewUrlParser: true })
    .then(() => {
        console.log("ok")
    })
    .catch(() => {
        console.log("error")
    })


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
require("./todo.model");
const Todo = mongoose.model("todos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/", (req,res) => {
    res.sendFile(indexPath,{
        dotFiles: "js"
    })
})

app.get("/todo/:id", (req,res) => {
    const id = req.params.id;
    Todo.findOne({_id:id})
        .then(todo => {
            res.send({todo})
        })
        .catch(err => {
            console.log(err)
        }) 
    })

app.get("/todos",(req,res) => {
    Todo.find({})
        .then(todos => {
            res.send({todos})
        })
        .catch(err => {
            console.log(err)
        })
})
app.post("/todos",(req,res) => {
    const {todoText} = req.body
    if(todoText.trim().length > 0) {
        new Todo({text:req.body.todoText}).save()
        // res.redirect("/todos")
        res.status(200).json({status:"ok"})
    } else {
        res.status(422).json({status:"input is empty"});
    }
})
app.put("/todos",(req,res) => {
    const id = req.body.id;
    const newText = req.body.todoText;

    Todo.findOne({_id:id})
        .then(todo => {
            let {text} = todo;
            if(text ===newText) {
                throw {status:401,statusText:"Unauthorized"}
            } else if (newText.trim().length < 1) {
                throw {status:422,statusText:"input is empty"}
            }            
            return {id,newText}
            
        })
        .then(obj => {
            // ***
            Todo.updateOne({_id:obj.id},{$set:{text:obj.newText}})
                .then(()=>{
                    res.status(200).json({status:"ok"});
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        .catch(e => {
            res.status(e.status).json({status:e.statusText})
        })
})

app.delete("/todos",(req,res) => {
    Todo.deleteOne({_id:req.body._id})
        .then(()=> {
            res.status(200).json({status:"ok"});
        })
        .catch(err => {
            console.log(err)
        })
        
})

// for api
app.set("Todo",Todo)
// api
app.use("/api",api)



app.listen(3003);


