import React, {Component} from 'react';
import './App.css';

import MainPage from "./components/mainPage"
import EditPage from "./components/editPage"

import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {

  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path = "/" component = {MainPage} />
            <Route path = "/edit/:id" component = {EditPage} />
          </div>
        </Router>
    );
  }  
}

export default App;
