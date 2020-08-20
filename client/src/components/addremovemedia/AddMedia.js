import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "@material-ui/core";
import { bulkResize } from "../../utils/photo";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";

const maxNumber = 25;
const maxMbFileSize = 100 * 1024 * 1024; // 100Mb

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
    max-height: 150px;
`;

const ButtonsContainer = styled.div`
    width: max-content;
    margin: 1rem auto;
    & > button {
        margin-right: 0.5rem;
    }
    & > button:last-child {
        margin-right: 0rem;
    }
`;

const UploadButtonContainer = styled.div`
    width: max-content;
    margin: auto;
`;

const RemoveButton = styled.button`
    position: absolute;
`;

const ImageContainer = styled.div`
    position: relative;
    margin: 0.5rem;
`;

const ProgressContainer = styled.div`
    margin: 1rem auto;
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
    margin: 1rem auto 3rem;
    width: max-content;
    & > a {
        text-decoration: none;
    }
`;

const GoToGallery = ({ gallery_id }) => {
    return (
        <GoToGalleryContainer>
            <Link to={`/viewgallery/${gallery_id}`}>
                <Button variant="contained">Go To Gallery</Button>
            </Link>
        </GoToGalleryContainer>
    );
};

const Errors = styled.div`
    width: max-content;
    margin: auto;
`;

const AddMedia = ({ match }) => {
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const onChange = (imageList) => {
        setImages(imageList);
        setProgress(0);
        setUploadSuccess(false);
    };

    const onError = (errors, files) => {
        console.log(errors, files);
    };

    const onUpload = async () => {
        setProgress(0.1);
        const filesList = images.map((item) => item.file);
        let res = await bulkResize(filesList);
        let formData = new FormData();
        formData.append("gallery_id", match.params.id);
        res.forEach((photo, index) => {
            formData.append(`reg-${index}`, photo.reg);
            formData.append(`thumb-${index}`, photo.thumbnail);
        });
        await axios
            .post(`/api/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    setProgress((loaded / total) * 100);
                }
            })
            .then(() => {
                setUploadSuccess(true);
                setProgress(0);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <ImageUploading
                onChange={onChange}
                maxNumber={maxNumber}
                multiple
                maxFileSize={maxMbFileSize}
                acceptType={[]}
                onError={onError}
                onUpload={onUpload}
            >
                {({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
                    <div>
                        <Errors>
                            {errors.maxNumber && <span>Number of selected images exceeds 25</span>}
                            {errors.acceptType && <span>Your selected file type is not allow</span>}
                            {errors.maxFileSize && <span>Selected file size exceed 100Mb</span>}
                            {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                        </Errors>
                        <ButtonsContainer>
                            <Button onClick={onImageUpload} variant="contained">
                                Add images
                            </Button>
                            <Button onClick={onImageRemoveAll} variant="contained">
                                Remove all images
                            </Button>
                            <Link to="/addeditgallery" style={{ textDecoration: "none" }}>
                                <Button variant="contained" color="primary">
                                    Back
                                </Button>
                            </Link>
                        </ButtonsContainer>
                        <ImagesContainer>
                            {imageList.map((image) => (
                                <ImageContainer key={image.key}>
                                    <RemoveButton onClick={image.onRemove}>X</RemoveButton>
                                    <ImagePreview src={image.dataURL} alt="img" />
                                </ImageContainer>
                            ))}
                        </ImagesContainer>
                        {imageList.length > 0 && (
                            <UploadButtonContainer>
                                <Button variant="contained" onClick={onUpload}>
                                    Upload
                                </Button>
                            </UploadButtonContainer>
                        )}
                    </div>
                )}
            </ImageUploading>
            {progress > 0 && !uploadSuccess && <Progress progress={progress} />}
            {uploadSuccess && <GoToGallery gallery_id={match.params.id} />}
        </Container>
    );
};

export default AddMedia;
