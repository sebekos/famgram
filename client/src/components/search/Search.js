import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

import Recent from "./Recent";

const Container = styled.div`
    margin-top: 7rem;
`;

const Form = styled.form`
    margin: auto;
    max-width: 500px;
    height: 100%;
    display: flex;
    & > div {
        width: 100%;
    }
`;

const Search = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => setSearch(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(search);
    };
    return (
        <Container>
            <Form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField onChange={onChange} label="Name" variant="filled" value={search} />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Search
                </Button>
            </Form>
            <Recent />
        </Container>
    );
};

export default Search;
