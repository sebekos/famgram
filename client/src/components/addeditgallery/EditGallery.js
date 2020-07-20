import React, { useEffect } from "react";
import { connect } from "react-redux";
import { userGalleries } from "../../redux/actions/gallery";
import { Card, Button } from "@material-ui/core";
import { uuid } from "uuidv4";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
    width: max-content;
`;

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const MyGalleries = ({ mygalleries }) => {
    return (
        <div>
            {mygalleries.map((item) => {
                const { title, text, is_public } = item;
                return (
                    <StyledCard key={uuid()}>
                        <div>{title}</div>
                        <div>{text}</div>
                        <div>{is_public}</div>
                        <div>
                            <Button variant="contained" color="secondary">
                                Add
                            </Button>
                        </div>
                    </StyledCard>
                );
            })}
        </div>
    );
};

const EmptyGallery = () => {
    return <div>Empty</div>;
};

const EditGallery = ({ userGalleries, mygalleries }) => {
    useEffect(() => {
        userGalleries();
    }, [userGalleries]);
    return <Container>{mygalleries.length > 0 ? <MyGalleries mygalleries={mygalleries} /> : <EmptyGallery />}</Container>;
};

const mapStateToProps = (state) => ({
    mygalleries: state.gallery.mygalleries
});

const mapDispatchToProps = {
    userGalleries
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGallery);
