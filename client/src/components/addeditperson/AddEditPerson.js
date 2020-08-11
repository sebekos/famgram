import React from "react";
import styled from "styled-components";
import AddPerson from "./AddPerson";
import AllPeople from "./AllPeople";

const Container = styled.div`
    margin: 5rem auto 0;
`;

const AddEditPerson = () => {
    return (
        <Container>
            <AddPerson />
            <AllPeople />
        </Container>
    );
};

export default AddEditPerson;
