import React from "react";
import { connect } from "react-redux";

const AddMedia = ({ tab }) => {
    if (tab !== 3) return null;
    return <div>AddMedia</div>;
};

const mapStateToProps = (state) => ({
    tab: state.ui.tab
});

export default connect(mapStateToProps)(AddMedia);
