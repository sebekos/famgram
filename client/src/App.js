import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login"
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const App = () => {
    return (
        <Router>
            <ToastContainer hideProgressBar pauseOnHover={false} />
            <Switch>
                <Route exact path="/" component={Login} />
            </Switch>
        </Router>
    )
}

export default App
