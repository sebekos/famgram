import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRecentGalleries } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";
import Item from "./Item";
import PropTypes from "prop-types";
import Spinner from "../universal/Spinner";

const Container = styled.div`
    margin: 2rem auto 0;
    width: max-content;
`;

const MapContainer = styled.div`
    margin: 0rem auto 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        width: max-content;
        margin: auto;
    }
`;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((item) => (
                <Item key={uuid()} data={item} />
            ))}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const EmptyContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
`;

const Empty = () => {
    return <EmptyContainer>No Recent Galleries</EmptyContainer>;
};

const Recent = ({ getRecentGalleries, recentGalleries, loading }) => {
    useLayoutEffect(() => {
        getRecentGalleries();
    }, [getRecentGalleries]);
    return (
        <Container>
            {loading && <Spinner />}
            {!loading && recentGalleries.length > 0 && <Map data={recentGalleries} />}
            {!loading && recentGalleries.length === 0 && <Empty />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    recentGalleries: state.gallery.recentGalleries,
    loading: state.gallery.loading
});

const mapDispatchToProps = {
    getRecentGalleries
};

export default connect(mapStateToProps, mapDispatchToProps)(Recent);
