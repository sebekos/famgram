import React from "react";
import styled from "styled-components";
import AddPerson from "./AddPerson";
import EditPerson from "./EditPerson";

const Container = styled.div`
    margin: 5rem auto 0;
`;

const AddEditPerson = () => {
    return (
        <Container>
            <AddPerson />
            <EditPerson />
        </Container>
    );
};

export default AddEditPerson;
