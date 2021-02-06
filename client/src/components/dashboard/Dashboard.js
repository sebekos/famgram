import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setDashTab } from "../../redux/actions/ui";
import { logout } from "../../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PropTypes from "prop-types";

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

const Dashboard = ({ isAuth, setDashTab, logout }) => {
    const history = useHistory();

    const classes = useStyles();

    const handleTabChange = (e) => {
        const route = e.currentTarget.getAttribute("route");
        setDashTab(route);
        history.push(`/${route}`);
    };

    const onLogout = () => logout();

    if (isAuth === 0) {
        // history.push("/");
        return null;
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={handleTabChange} route="search">
                        <span style={{ cursor: "pointer" }}>fam-gram</span>
                    </Typography>
                    <IconButton onClick={handleTabChange} route="search" color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleTabChange} route="addeditgallery" color="inherit">
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleTabChange} route="addeditperson" color="inherit">
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
