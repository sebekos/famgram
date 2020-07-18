import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";

const LoginContainer = styled.div`
    width: max-content;
    position: fixed;
    top: 45%;
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

const Login = ({ login, isAuth }) => {
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

    if (isAuth) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <LoginContainer>
            <FormContainer onSubmit={onSubmit}>
                <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                <Button onClick={onSubmit} variant="contained" color="primary">
                    Login
                </Button>
            </FormContainer>
        </LoginContainer>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
