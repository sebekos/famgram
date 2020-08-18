import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { getViewGallery } from "../../redux/actions/gallery";
import PhotoItem from "./PhotoItem";
import styled from "styled-components";

const Container = styled.div`
    margin: 5rem auto 0;
    width: max-content;
`;

const PhotoContainer = styled.div`
    margin: auto;
`;

const Map = ({ photos }) => {
    return (
        <PhotoContainer>
            {photos.map((item) => {
                const { link_thumb } = item;
                return <PhotoItem img={link_thumb} />;
            })}
        </PhotoContainer>
    );
};

const AddEditTags = ({ getViewGallery, match, loading, viewGallery }) => {
    useLayoutEffect(() => {
        getViewGallery(match.params.id);
    }, [getViewGallery, match.params.id]);
    return (
        <Container>
            {loading && <p>loading...</p>}
            {!loading && viewGallery && <Map photos={viewGallery.photos} />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    viewGallery: state.gallery.viewGallery,
    loading: state.gallery.loading
});

const mapDispatchToProps = {
    getViewGallery
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTags);
