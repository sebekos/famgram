import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Loading from "./components/ui/Loading";

import store from "./redux/store/store";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <Loading />
            <Router>
                <ToastContainer hideProgressBar pauseOnHover={false} transition={Slide} />
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
