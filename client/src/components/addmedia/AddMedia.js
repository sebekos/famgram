import React from "react";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

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

const AddMedia = () => {
    const onChange = (imageList) => {
        console.log(imageList);
    };
    const onError = (errors, files) => {
        console.log(errors, files);
    };
    return (
        <Container>
            <ImageUploading
                onChange={onChange}
                maxNumber={maxNumber}
                multiple
                maxFileSize={maxMbFileSize}
                acceptType={["jpg", "gif", "png"]}
                onError={onError}
            >
                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                    <div>
                        <button onClick={onImageUpload}>Add images</button>
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                        <ImagesContainer>
                            {imageList.map((image) => (
                                <div key={image.key}>
                                    <ImagePreview src={image.dataURL} alt="img" />
                                    <button onClick={image.onRemove}>X</button>
                                </div>
                            ))}
                        </ImagesContainer>
                    </div>
                )}
            </ImageUploading>
        </Container>
    );
};

export default AddMedia;
