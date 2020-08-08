import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getViewGallery } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";

const Container = styled.div`
    width: max-content;
    margin: 5rem auto 0;
`;

const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: max-content;
    margin: auto;
`;

const ImagePreview = styled.img`
    max-width: 200px;
`;

const RemoveButton = styled.button`
    position: absolute;
`;

const ImageContainer = styled.div`
    position: relative;
    margin: 0.5rem;
`;

const RemoveMedia = ({ match, getViewGallery, viewGallery }) => {
    useLayoutEffect(() => {
        getViewGallery(match.params.id);
    }, [getViewGallery, match]);
    const onRemove = () => {
        console.log("on Remove");
    };
    return (
        <Container>
            <ImagesContainer>
                {viewGallery &&
                    viewGallery.photos &&
                    viewGallery.photos.map((image) => (
                        <ImageContainer key={uuid()}>
                            <RemoveButton onClick={onRemove}>X</RemoveButton>
                            <ImagePreview src={image.link_main} alt="img" />
                        </ImageContainer>
                    ))}
            </ImagesContainer>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    viewGallery: state.gallery.viewGallery
});

const mapDispatchToProps = {
    getViewGallery
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveMedia);
