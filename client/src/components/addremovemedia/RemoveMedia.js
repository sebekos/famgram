import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getViewGallery, removeMedia, saveMedia } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

const ButtonContainer = styled.div`
    margin: 0 auto 0.5rem;
    width: max-content;
    & > button:first-child {
        margin-right: 0.5rem;
    }
`;

const RemoveMedia = ({ match, getViewGallery, viewGallery, removeMedia, saveMedia, loading }) => {
    useLayoutEffect(() => {
        getViewGallery(match.params.id);
    }, [getViewGallery, match]);

    const history = useHistory();

    const onRemove = (e) => {
        removeMedia(e.target.getAttribute("value"));
    };

    const onSave = () => {
        const media_array = viewGallery.photos.map((item) => item.id);
        saveMedia(media_array, match.params.id);
    };

    const onBack = () => {
        history.push("/addeditgallery");
    };

    return (
        <Container>
            <ButtonContainer>
                <Button variant="contained" onClick={onSave}>
                    Save
                </Button>
                <Button variant="contained" color="primary" onClick={onBack}>
                    Back
                </Button>
            </ButtonContainer>
            {loading && <p>Loading...</p>}
            <ImagesContainer>
                {viewGallery &&
                    viewGallery.photos &&
                    viewGallery.photos.map((image) => (
                        <ImageContainer key={uuid()}>
                            <RemoveButton value={image.id} onClick={onRemove}>
                                X
                            </RemoveButton>
                            <ImagePreview src={image.link_main} alt="img" />
                        </ImageContainer>
                    ))}
            </ImagesContainer>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    viewGallery: state.gallery.viewGallery,
    loading: state.gallery.loading
});

const mapDispatchToProps = {
    getViewGallery,
    removeMedia,
    saveMedia
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveMedia);
