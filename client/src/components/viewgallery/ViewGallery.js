import React, { useLayoutEffect } from "react";
import PhotoViewer from "./PhotoViewer";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getViewGallery } from "../../redux/actions/gallery";

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto 2rem;
    padding: 6rem 0 0;
    min-height: 100vh;
`;

const InfoContainer = styled.div`
    max-width: 400px;
    margin: 2rem;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
    padding: 1rem 0;
`;

const DateText = styled.div`
    font-size: 0.7rem;
`;

const Info = ({ title, text, createdAt }) => {
    return (
        <InfoContainer>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
            <DateText>{timeFormat(createdAt)}</DateText>
        </InfoContainer>
    );
};

Info.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
};

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
};

const ViewGallery = ({ match, getViewGallery, viewGallery, loading }) => {
    useLayoutEffect(() => {
        getViewGallery(match.params.id);
    }, [getViewGallery, match]);
    return (
        <Container>
            {loading && <Loading />}
            {!loading && viewGallery && <Info title={viewGallery.title} text={viewGallery.text} createdAt={viewGallery.createdAt} />}
            {!loading && viewGallery && viewGallery.photos.length > 0 && <PhotoViewer photos={viewGallery.photos} />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    loading: state.gallery.loading,
    viewGallery: state.gallery.viewGallery
});

const mapDispatchToProps = {
    getViewGallery
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGallery);
