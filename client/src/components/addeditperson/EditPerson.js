import React, { useState, useLayoutEffect } from "react";
import { TextField, Card, Button } from "@material-ui/core";
import { getPerson, editPerson } from "../../redux/actions/person";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0.5rem;
    margin-top: 5rem;
`;

const StyledCard = styled(Card)`
    margin: auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
`;

const AddRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    & > div {
        margin-right: 0.5rem;
    }
    &>div: last-child {
        margin-right: 0rem;
    }
`;

const AddRow4 = styled.div`
    margin: 0.5rem 0 0rem;
    & > button {
        margin-right: 0.5rem;
    }
`;

const EditPerson = ({ editPerson, match, getPerson, person, loading }) => {
    const [formData, setFormData] = useState({
        id: "",
        first_name: "",
        middle_name: "",
        last_name: ""
    });

    useLayoutEffect(() => {
        const param_id = parseInt(match.params.id, 10);
        if (person === null || parseInt(person.id, 10) !== param_id) {
            getPerson(param_id);
        } else {
            setFormData({
                person_id: person.id,
                first_name: person.first_name,
                middle_name: person.middle_name,
                last_name: person.last_name
            });
        }
    }, [getPerson, match.params.id, person]);

    const history = useHistory();

    const { first_name, middle_name, last_name } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editPerson(formData);
    };

    const onBack = () => {
        history.push("/addeditperson");
    };

    return (
        <Container>
            <StyledCard>
                <AddRow>
                    <TextField
                        name="first_name"
                        onChange={onChange}
                        label="First name"
                        variant="filled"
                        value={first_name}
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${first_name.length}/${42}`}
                    />
                    <TextField
                        name="middle_name"
                        onChange={onChange}
                        label="Middle name"
                        variant="filled"
                        value={middle_name}
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${middle_name.length}/${42}`}
                    />
                    <TextField
                        name="last_name"
                        onChange={onChange}
                        label="Last name"
                        variant="filled"
                        value={last_name}
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${last_name.length}/${42}`}
                    />
                </AddRow>
                <AddRow4>
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={onBack} variant="contained">
                        Back
                    </Button>
                </AddRow4>
            </StyledCard>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    person: state.person.person,
    loading: state.person.loading
});

const mapDispatchToProps = {
    editPerson,
    getPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
