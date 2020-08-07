import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setDashTab } from "../../redux/actions/ui";

const PrivateRoute = ({ component: Component, auth: { isAuth, loading }, setDashTab, ...rest }) => {
    let location = useLocation();
    if (!isAuth) {
        setDashTab(location.pathname.substr(1));
        return <Redirect to="/" />;
    }
    return <Route {...rest} render={(props) => (!isAuth && !loading ? <Redirect to="/" /> : <Component {...props} />)} />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    setDashTab
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
