import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRecentGalleries } from "../../redux/actions/gallery";
import { uuid } from "uuidv4";
import Item from "./Item";
import PropTypes from "prop-types";

const Container = styled.div`
    margin: 2rem auto 0;
    width: max-content;
`;

const MapContainer = styled.div`
    margin: 0rem auto 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
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

const Recent = ({ getRecentGalleries, recentGalleries, loading }) => {
    useLayoutEffect(() => {
        getRecentGalleries();
    }, [getRecentGalleries]);
    return (
        <Container>
            {loading && <p>Loading...</p>}
            {!loading && recentGalleries.length > 0 && <Map data={recentGalleries} />}
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
