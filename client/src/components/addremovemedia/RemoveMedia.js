import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getViewGallery } from "../../redux/actions/gallery";

const Container = styled.div`
    margin-top: 5rem;
`;

const RemoveMedia = ({ match, getViewGallery }) => {
    useLayoutEffect(() => {
        getViewGallery(match.params.id);
    }, [getViewGallery, match]);
    return <Container>Remove photos</Container>;
};

const mapDispatchToProps = {
    getViewGallery
};

export default connect(null, mapDispatchToProps)(RemoveMedia);
