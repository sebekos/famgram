import React from "react";
import styled from "styled-components";
import { uuid } from "uuidv4";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: max-content;
    margin: 3rem auto;
`;

const ImgContainer = styled.div``;

const EmptyContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
`;

const Empty = () => {
    return <EmptyContainer>No Recent Galleries</EmptyContainer>;
};

const PersonPhotos = ({ person_photos }) => {
    console.log(person_photos);
    return (
        <Container>
            {person_photos.length === 0 && <Empty />}
            {person_photos.length > 0 &&
                person_photos.map((item) => (
                    <ImgContainer key={uuid()}>
                        <img src={item.link_thumb} alt="..." />
                    </ImgContainer>
                ))}
        </Container>
    );
};

export default PersonPhotos;
