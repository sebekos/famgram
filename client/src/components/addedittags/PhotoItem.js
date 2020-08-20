import React from "react";
import PersonItem from "./PersonItem";
import styled from "styled-components";
import { uuid } from "uuidv4";
import { Card } from "@material-ui/core";

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;

const ImageContainer = styled.div`
    height: 300px;
    width: 400px;
`;

const Image = styled.img`
    width: 400px;
    height: 300px;
    object-fit: cover;
    border: 1px solid grey;
`;

const PeopleContainer = styled.div``;

const PhotoItem = ({ img, people, gallery_id, photo_id, tags }) => {
    const tags_array = tags.map((item) => item.person_id);
    return (
        <StyledCard>
            <ImageContainer>
                <Image src={img} alt="..." />
            </ImageContainer>
            <PeopleContainer>
                {people.map((item) => (
                    <PersonItem
                        key={uuid()}
                        person={item}
                        gallery_id={gallery_id}
                        photo_id={photo_id}
                        isChecked={tags_array.includes(item.id)}
                    />
                ))}
            </PeopleContainer>
        </StyledCard>
    );
};

export default PhotoItem;
