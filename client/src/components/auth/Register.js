import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";

const LoginContainer = styled.div`
    width: max-content;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    & > div {
        margin: 0 0 1rem 0;
    }
`;

const Register = ({ login, isAuth, tab }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    // if (isAuth) {
    //     return <Redirect to={`/${tab}`} />;
    // }

    return (
        <LoginContainer>
            <FormContainer onSubmit={onSubmit}>
                <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
                    Login
                </Button>
            </FormContainer>
        </LoginContainer>
    );
};

Register.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    tab: state.ui.tab
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
