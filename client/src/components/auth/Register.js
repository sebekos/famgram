import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../redux/actions/auth";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";

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

const Register = ({ register, isAuth, tab, isRegister }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        register_key: ""
    });

    const { email, password, password2, register_key } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) return toast.error("Passwords do not match");
        register(formData);
    };

    if (isAuth) {
        return <Redirect to={`/${tab}`} />;
    }

    if (isRegister) {
        return <Redirect to={`/`} />;
    }

    return (
        <LoginContainer>
            <FormContainer onSubmit={onSubmit}>
                <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                <TextField
                    name="password2"
                    type="password"
                    onChange={onChange}
                    value={password2}
                    label="Confirm Password"
                    variant="filled"
                />
                <TextField
                    name="register_key"
                    type="password"
                    onChange={onChange}
                    value={register_key}
                    label="Register Key"
                    variant="filled"
                />
                <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
                    Register
                </Button>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography component="div">
                        <Box fontSize="fontSize" m={1}>
                            Have an account? Login
                        </Box>
                    </Typography>
                </Link>
            </FormContainer>
        </LoginContainer>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.number.isRequired,
    tab: PropTypes.string,
    isRegister: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isRegister: state.auth.isRegister,
    tab: state.ui.tab
});

const mapDispatchToProps = {
    register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
