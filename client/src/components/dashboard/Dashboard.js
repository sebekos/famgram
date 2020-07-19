import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setDashTab } from "../../redux/actions/ui";
import { logout } from "../../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PropTypes from "prop-types";
import styled from "styled-components";

import Search from "../search/Search";
import AddEditGallery from "../addeditgallery/AddEditGallery";
import AddEditPerson from "../addeditperson/AddEditPerson";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const MainToolBar = ({ setDashTab, logout }) => {
    const classes = useStyles();
    const handleTabChange = (e) => setDashTab(parseInt(e.currentTarget.getAttribute("tabindex"), 10));
    const onLogout = () => logout();
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Famgram
                    </Typography>
                    <IconButton onClick={handleTabChange} tabIndex={0} color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleTabChange} tabIndex={1} color="inherit">
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleTabChange} tabIndex={2} color="inherit">
                        <PersonAddIcon />
                    </IconButton>
                    <Button onClick={onLogout} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

MainToolBar.propTypes = {
    setDashTab: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

const RouteContainer = styled.div`
    margin-top: 5rem;
`;

const Dashboard = ({ isAuth, setDashTab, logout }) => {
    if (isAuth === 0) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <MainToolBar setDashTab={setDashTab} logout={logout} />
            <RouteContainer>
                <Search />
                <AddEditGallery />
                <AddEditPerson />
            </RouteContainer>
        </>
    );
};

Dashboard.propTypes = {
    isAuth: PropTypes.number,
    setDashTab: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
    setDashTab,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
