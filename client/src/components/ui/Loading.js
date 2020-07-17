import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const LoadingContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const Loading = ({ loading }) => {
    if (!loading) return null;
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
};

const mapStateToProps = (state) => ({
    loading: state.ui.loading
});

export default connect(mapStateToProps)(Loading);
