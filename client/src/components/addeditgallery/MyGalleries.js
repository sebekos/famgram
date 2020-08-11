import React, { useEffect } from "react";
import { connect } from "react-redux";
import { userGalleries } from "../../redux/actions/gallery";
import { Card } from "@material-ui/core";
import { uuid } from "uuidv4";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import MonochromePhotosIcon from "@material-ui/icons/MonochromePhotos";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
    max-width: 700px;
`;

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 2fr 3fr 1fr 2fr;
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

const public_keys = {
    0: "Private",
    1: "Public"
};

const Galleries = ({ mygalleries, onNav, onGallery }) => {
    return (
        <div>
            {mygalleries.map((item) => {
                const { id, title, text, is_public } = item;
                return (
                    <StyledCard key={uuid()}>
                        <div onClick={() => onGallery(id)}>{title}</div>
                        <div onClick={() => onGallery(id)}>{text}</div>
                        <div style={{ fontWeight: "bold" }}>{public_keys[is_public]}</div>
                        <ButtonsContainer>
                            <IconButton size="small">
                                <LocalOfferIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => onNav("addmedia", id)} size="small">
                                <AddAPhotoIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => onNav("removemedia", id)} size="small">
                                <MonochromePhotosIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => onNav("editgallery", id)} size="small">
                                <EditIcon fontSize="large" />
                            </IconButton>
                        </ButtonsContainer>
                    </StyledCard>
                );
            })}
        </div>
    );
};

const EmptyGallery = () => {
    return <div>Empty</div>;
};

const MyGalleries = ({ userGalleries, mygalleries, mygalleriesfetch }) => {
    useEffect(() => {
        if (mygalleriesfetch) userGalleries();
    }, [userGalleries, mygalleriesfetch]);

    const history = useHistory();

    const onNav = (link, id) => {
        history.push(`/${link}/${id}`);
    };

    const onGallery = (id) => {
        history.push(`/viewgallery/${id}`);
    };

    return (
        <Container>
            {mygalleries.length > 0 ? <Galleries mygalleries={mygalleries} onNav={onNav} onGallery={onGallery} /> : <EmptyGallery />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    mygalleries: state.gallery.mygalleries,
    mygalleriesfetch: state.gallery.mygalleriesfetch
});

const mapDispatchToProps = {
    userGalleries
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGalleries);
