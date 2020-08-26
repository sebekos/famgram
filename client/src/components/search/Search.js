import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/person";
import { getPersonPhotos } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";

import Recent from "./Recent";
import PhotoViewer from "../viewgallery/PhotoViewer";
import Spinner from "../universal/Spinner";

const Container = styled.div`
    margin-top: 7rem;
`;

const SelectContainer = styled.div`
    width: 500px;
    margin: 0 auto 3rem;
`;

const Search = ({ getPeople, people, person_photos, person_loading, gallery_loading, getPersonPhotos }) => {
    useLayoutEffect(() => {
        getPeople();
    }, [getPeople]);
    const [age, setAge] = useState("Recent galleries");
    const handleChange = (event) => {
        setAge(event.target.value);
        getPersonPhotos(event.target.value);
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
                        {!person_loading && people
                            ? people.map((item) => (
                                  <MenuItem key={uuid()} value={item.id}>
                                      {item.first_name} {item.last_name}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                </FormControl>
            </SelectContainer>
            {person_loading || (gallery_loading && <Spinner />)}
            {age === "Recent galleries" && !person_loading && <Recent />}
            {age !== "Recent galleries" && !person_loading && person_photos && <PhotoViewer photos={person_photos} />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    person_photos: state.gallery.person_photos,
    people: state.person.people,
    person_loading: state.person.loading,
    gallery_loading: state.gallery.loading
});

const mapDispatchToProps = { getPeople, getPersonPhotos };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
