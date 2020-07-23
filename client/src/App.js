import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Loading from "./components/ui/Loading";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import store from "./redux/store/store";
import { loadUser } from "./redux/actions/auth";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

// Routes
import Search from "./components/search/Search";
import AddEditGallery from "./components/addeditgallery/AddEditGallery";
import AddEditPerson from "./components/addeditperson/AddEditPerson";
import EditGallery from "./components/addeditgallery/EditGallery";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    });
    return (
        <Provider store={store}>
            <Loading />
            <Router>
                <Dashboard />
                <ToastContainer hideProgressBar pauseOnHover={false} transition={Slide} />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute exact path="/search" component={Search} />
                    <PrivateRoute exact path="/addeditgallery" component={AddEditGallery} />
                    <PrivateRoute exact path="/addeditperson" component={AddEditPerson} />
                    <PrivateRoute exact path="/EditGallery/:id" component={EditGallery} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
