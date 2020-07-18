import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ isAuth }) => {
    if (!isAuth) {
        return <Redirect to="/" />;
    }
    return <div>Main Dash</div>;
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Dashboard);
