import React, { useState } from "react";
import { Switch } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    text-align: center;
`;

const PersonItem = ({ person }) => {
    const [checked, setChecked] = useState(false);
    const onCheck = () => {
        setChecked(!checked);
    };
    const { first_name, last_name } = person;
    return (
        <Container>
            <div>
                {first_name} {last_name}
            </div>
            <div>
                <Switch checked={checked} onChange={onCheck} inputProps={{ "aria-label": "secondary checkbox" }} />
            </div>
        </Container>
    );
};

export default PersonItem;
