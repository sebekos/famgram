import React from "react";
import { connect } from "react-redux";

const Search = ({ tab }) => {
    if (tab !== 0) return null;
    return <div>Search</div>;
};

const mapStateToProps = (state) => ({
    tab: state.ui.tab
});

export default connect(mapStateToProps)(Search);
