import React from "react";
import { connect } from "react-redux";

const AddEditPerson = ({ tab }) => {
    if (tab !== 2) return null;
    return <div>Person</div>;
};

const mapStateToProps = (state) => ({
    tab: state.ui.tab
});

export default connect(mapStateToProps)(AddEditPerson);
