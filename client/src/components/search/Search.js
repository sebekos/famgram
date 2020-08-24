import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/person";
import { getPersonPhotos } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";

import Recent from "./Recent";

const Container = styled.div`
    margin-top: 7rem;
`;

const SelectContainer = styled.div`
    width: 500px;
    margin: auto;
`;

const Search = ({ getPeople, people, person_photos, loading, getPersonPhotos }) => {
    useLayoutEffect(() => {
        getPeople();
    }, [getPeople]);
    const [age, setAge] = useState("Recent galleries");
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Container>
            <SelectContainer>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-outlined-label">Person or galleries</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange}
                        label="Select person or gallery"
                    >
                        <MenuItem value="Recent galleries">Recent galleries</MenuItem>
                        {!loading && people
                            ? people.map((item) => (
                                  <MenuItem key={uuid()} value={item.id}>
                                      {item.first_name} {item.last_name}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                </FormControl>
            </SelectContainer>

            {age === "Recent galleries" && <Recent />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    person_photos: state.gallery.person_photos,
    people: state.person.people,
    loading: state.person.loading
});

const mapDispatchToProps = { getPeople, getPersonPhotos };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
