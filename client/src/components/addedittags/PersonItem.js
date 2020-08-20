import React from "react";
import { Switch } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { addTag, removeTag } from "../../redux/actions/gallery";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
`;

const NameContainer = styled.div``;

const PersonItem = ({ person, addTag, removeTag, gallery_id, photo_id, isChecked }) => {
    const onCheck = () => {
        if (isChecked) {
            removeTag({
                gallery_id,
                person_id: person.id,
                photo_id
            });
        } else {
            addTag({
                gallery_id,
                person_id: person.id,
                photo_id
            });
        }
    };
    const { first_name, last_name } = person;
    return (
        <Container>
            <NameContainer>
                {first_name} {last_name}
            </NameContainer>
            <Switch checked={isChecked} onChange={onCheck} inputProps={{ "aria-label": "secondary checkbox" }} />
        </Container>
    );
};

const mapStateToProps = (state) => ({
    tag: state.gallery.tags_photos
});

const mapDispatchToProps = {
    addTag,
    removeTag
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonItem);
