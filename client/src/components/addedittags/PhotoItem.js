import React from "react";
import PersonItem from "./PersonItem";
import styled from "styled-components";
import { uuid } from "uuidv4";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const PhotoItem = ({ img, people }) => {
    return (
        <Container>
            <div>
                <img src={img} alt="..." />
            </div>
            <div>
                {people.map((item) => (
                    <PersonItem key={uuid()} person={item} />
                ))}
            </div>
        </Container>
    );
};

export default PhotoItem;
