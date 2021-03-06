import React, { useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import FamgramPng from "../../img/famgram.png";
import Spinner from "../universal/Spinner";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Redirect, Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

const LoginContainer = styled.div`
    width: max-content;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
    width: max-content;
    margin: 0 auto 2rem;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    & > div {
        margin: 0 0 1rem 0;
    }
`;

const Login = ({ login, isAuth, tab, loading }) => {
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
        return <Redirect to={`/${tab}`} />;
    }

    return (
        <LoginContainer>
            {loading && <Spinner />}
            <ImageContainer>
                <img src={FamgramPng} alt="famgram" />
            </ImageContainer>
            <FormContainer onSubmit={onSubmit}>
                <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
                    Login
                </Button>
                <Link to="/register" style={{ textDecoration: "none" }}>
                    <Typography component="div">
                        <Box fontSize="fontSize" m={1}>
                            Don't have an account? Register
                        </Box>
                    </Typography>
                </Link>
            </FormContainer>
        </LoginContainer>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    tab: state.ui.tab,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
