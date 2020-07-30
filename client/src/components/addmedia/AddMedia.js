import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 5rem;
`;

const AddMedia = () => {
    return <Container>AddMedia</Container>;
};

const mapStateToProps = (state) => ({
    tab: state.ui.tab
});

export default connect(mapStateToProps)(AddMedia);
