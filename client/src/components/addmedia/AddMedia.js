import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { bulkResize } from "../../utils/photo";
import { toast } from "react-toastify";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Uploader from "./Uploader";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const DescriptionContainer = styled.div`
    margin: auto;
    max-width: 500px;
    text-align: center;
`;
const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
    text-align: left;
    white-space: pre-wrap;
`;

const UploadContainer = styled.div`
    text-align: center;
`;

const Upload = ({ onUpload }) => {
    return (
        <UploadContainer>
            <Button variant="contained" color="primary" onClick={onUpload}>
                Upload
            </Button>
        </UploadContainer>
    );
};

Upload.propTypes = {
    onUpload: PropTypes.func.isRequired
};

const Description = ({ title, text }) => {
    return (
        <DescriptionContainer>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
        </DescriptionContainer>
    );
};

Description.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

const ProgressContainer = styled.div`
    margin-bottom: 3rem;
`;

const Progress = ({ progress }) => {
    return (
        <ProgressContainer>
            <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
    );
};

Progress.propTypes = {
    progress: PropTypes.number.isRequired
};

const GoToGalleryContainer = styled.div`
    margin: 0 auto 3rem;
    width: max-content;
`;

const GoToGallery = ({ galleryid }) => {
    return (
        <GoToGalleryContainer>
            <Link to={`/galeria/${galleryid}`}>
                <Button>Go To Gallery</Button>
            </Link>
        </GoToGalleryContainer>
    );
};

const AddPhotos = ({ match }) => {
    const [progress, setProgress] = useState(0);
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const onDrop = (picture) => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
            setProgress(0);
            setUploadSuccess(false);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async () => {
        setProgress(0.1);
        let res = await bulkResize(pictures);
        let formData = new FormData();
        formData.append("galleryId", match.params.id);
        res.forEach((photo, index) => {
            formData.append(`reg-${index}`, photo.reg);
            formData.append(`thumb-${index}`, photo.thumbnail);
        });
        console.log("res");
        console.log(formData);
        setUploadSuccess(true);
        setProgress(0);
        toast.success("Photos uploaded");
    };

    return (
        <Container>
            <Uploader onDrop={onDrop} pictures={pictures} />
            {progress > 0 && !uploadSuccess && <Progress progress={progress} />}
            {uploadBtn && progress === 0 && !uploadSuccess && <Upload onUpload={onUpload} />}
            {uploadSuccess && <GoToGallery galleryid={match.params.id} />}
        </Container>
    );
};

export default AddPhotos;
