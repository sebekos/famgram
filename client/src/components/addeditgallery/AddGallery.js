import React, { useState } from "react";
import { TextareaAutosize, TextField, Card, Button } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
    padding: 1rem;
`;

const StyledCard = styled(Card)`
    margin: auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
`;

const AddRow1 = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    & > div:first-child {
        margin-right: 0.5rem;
    }
`;

const AddRow2 = styled.div`
    margin: 0rem 0;
`;

const AddRow3 = styled.div`
    margin: 0.5rem 0 0rem;
`;

const AddGallery = () => {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        birth_date: ""
    });

    const { title, text, birth_date } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container>
            <StyledCard>
                <AddRow1>
                    <TextField
                        autoComplete="off"
                        onChange={onChange}
                        label="Title"
                        variant="filled"
                        value={title}
                        name="title"
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${title.length}/${42}`}
                    />
                    <TextField
                        name="birth_date"
                        variant="filled"
                        id="date"
                        label="Date"
                        type="date"
                        onChange={onChange}
                        value={birth_date}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </AddRow1>
                <AddRow2>
                    <TextareaAutosize
                        autoComplete="off"
                        placeholder="Description"
                        name="text"
                        onChange={onChange}
                        value={text}
                        type="text"
                        rowsMin={3}
                        maxLength={500}
                    />
                </AddRow2>
                <AddRow3>
                    <Button variant="contained" color="primary">
                        Add
                    </Button>
                </AddRow3>
            </StyledCard>
        </Container>
    );
};

export default AddGallery;
