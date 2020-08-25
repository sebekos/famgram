import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/person";
import { getPersonPhotos } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";

import Recent from "./Recent";
import PersonPhotos from "./PersonPhotos";
import PhotoViewer from "../viewgallery/PhotoViewer";

const Container = styled.div`
    margin-top: 7rem;
`;

const SelectContainer = styled.div`
    width: 500px;
    margin: 0 auto 3rem;
`;

const Search = ({ getPeople, people, person_photos, loading, getPersonPhotos }) => {
    useLayoutEffect(() => {
        getPeople();
    }, [getPeople]);
    const [age, setAge] = useState("Recent galleries");
    const handleChange = (event) => {
        setAge(event.target.value);
        getPersonPhotos(event.target.value);
        console.log(event.target.value);
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
            {loading && <p>Loading</p>}
            {age === "Recent galleries" && !loading && <Recent />}
            {age !== "Recent galleries" && !loading && person_photos && person_photos.length > 0 && <PhotoViewer photos={person_photos} />}
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
