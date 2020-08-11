import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/person";
import { Card } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { uuid } from "uuidv4";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 0.5rem;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const People = ({ people, onEdit }) => {
    return people.map((item) => {
        const { id, first_name, middle_name, last_name } = item;
        const nameMap = [first_name, middle_name, last_name].filter((item) => item !== "").join(" ");
        return (
            <StyledCard key={uuid()}>
                <div>{nameMap}</div>
                <ButtonsContainer>
                    <IconButton onClick={() => onEdit(id)} size="small">
                        <EditIcon fontSize="large" />
                    </IconButton>
                </ButtonsContainer>
            </StyledCard>
        );
    });
};

const EditPerson = ({ getPeople, loading, people }) => {
    useLayoutEffect(() => {
        getPeople();
    }, [getPeople]);

    const history = useHistory();

    const onEdit = (id) => {
        history.push(`/editperson/${id}`);
    };

    return (
        <div>
            {loading && <p>loading...</p>}
            {!loading && people && <People people={people} onEdit={onEdit} />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    people: state.person.people,
    loading: state.person.loading
});

const mapDispatchToProps = {
    getPeople
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
