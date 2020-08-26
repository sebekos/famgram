import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Spinner = () => {
    return (
        <CircularContainer>
            <CircularProgress />
        </CircularContainer>
    );
};

export default Spinner;
