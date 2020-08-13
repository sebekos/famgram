import React from "react";
import { connect } from "react-redux";
import { getViewGallery } from "../../redux/actions/gallery";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 5rem auto 0;
`;

const AddEditTags = () => {
    return <Container>Add Edit Tags</Container>;
};

const mapDispatchToProps = {
    getViewGallery
};

export default connect(null, mapDispatchToProps)(AddEditTags);
