import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import PrivateRoute from "./components/routes/PrivateRoute";
import store from "./redux/store/store";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

// Routes
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Search from "./components/search/Search";
import AddEditGallery from "./components/addeditgallery/AddEditGallery";
import AddEditPerson from "./components/addeditperson/AddEditPerson";
import EditGallery from "./components/addeditgallery/EditGallery";
import AddMedia from "./components/addremovemedia/AddMedia";
import RemoveMedia from "./components/addremovemedia/RemoveMedia";
import ViewGallery from "./components/viewgallery/ViewGallery";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    });
    return (
        <Provider store={store}>
            <Router>
                <Dashboard />
                <ToastContainer hideProgressBar pauseOnHover={false} transition={Slide} />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/search" component={Search} />
                    <PrivateRoute exact path="/addeditgallery" component={AddEditGallery} />
                    <PrivateRoute exact path="/addeditperson" component={AddEditPerson} />
                    <PrivateRoute exact path="/editgallery/:id" component={EditGallery} />
                    <PrivateRoute exact path="/addmedia/:id" component={AddMedia} />
                    <PrivateRoute exact path="/removemedia/:id" component={RemoveMedia} />
                    <PrivateRoute exact path="/viewgallery/:id" component={ViewGallery} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
