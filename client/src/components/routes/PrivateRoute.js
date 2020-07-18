import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest} render={(props) => (!isAuth ? <Redirect to="/" /> : <Component {...props} />)} />
);

PrivateRoute.propTypes = {
    isAuth: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);
