import React from "react";
import { connect } from "react-redux";
import AddGallery from "./AddGallery";
import EditGallery from "./EditGallery";

const AddEditGallery = ({ tab }) => {
    if (tab !== 1) return null;
    return (
        <div>
            <AddGallery />
            <EditGallery />
        </div>
    );
};

const mapStateToProps = (state) => ({
    tab: state.ui.tab
});

export default connect(mapStateToProps)(AddEditGallery);
