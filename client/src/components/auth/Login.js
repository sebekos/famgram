import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

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

const Login = () => {
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
    };

    return (
        <LoginContainer>
            <FormContainer onSubmit={onSubmit}>
                <TextField
                    name="email"
                    type="text"
                    onChange={onChange}
                    value={email}
                    label="Email"
                    variant="filled"
                />
                <TextField
                    name="password"
                    type="password"
                    onChange={onChange}
                    value={password}
                    label="Password"
                    variant="filled"
                />
                <Button onClick={onSubmit} variant="contained" color="primary">
                    Login
                </Button>
            </FormContainer>
        </LoginContainer>
    );
};

export default Login;