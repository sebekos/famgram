import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { getGalleryTags } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";
import PhotoItem from "./PhotoItem";
import styled from "styled-components";

const Container = styled.div`
    margin: 5rem auto 1rem;
    width: max-content;
`;

const PhotoContainer = styled.div`
    margin: auto;
    width: max-content;
`;

const Map = ({ photos, people, tags, gallery_id }) => {
    return (
        <PhotoContainer>
            {photos.map((item) => {
                const { link_thumb, id } = item;
                const tagged_people = tags.filter((cur_tag) => cur_tag.photo_id === id);
                return (
                    <PhotoItem key={uuid()} img={link_thumb} people={people} gallery_id={gallery_id} photo_id={id} tags={tagged_people} />
                );
            })}
        </PhotoContainer>
    );
};

const AddEditTags = ({ getGalleryTags, match, loading, tags_photos, tags_people, tags }) => {
    useLayoutEffect(() => {
        getGalleryTags(match.params.id);
    }, [getGalleryTags, match.params.id]);
    return (
        <Container>
            {loading && <p>loading...</p>}
            {!loading && tags_photos && <Map photos={tags_photos} people={tags_people} tags={tags} gallery_id={match.params.id} />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    tags_photos: state.gallery.tags_photos,
    tags_people: state.gallery.tags_people,
    tags: state.gallery.tags,
    loading: state.gallery.loading
});

const mapDispatchToProps = {
    getGalleryTags
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTags);
