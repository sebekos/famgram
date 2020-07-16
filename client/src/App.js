import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import store from "./redux/store/store";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <ToastContainer hideProgressBar pauseOnHover={false} />
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
