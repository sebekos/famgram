import React, { useEffect } from "react";
import { connect } from "react-redux";
import { userGalleries } from "../../redux/actions/gallery";

const EditGallery = () => {
    useEffect(() => {
        userGalleries();
    }, []);
    return <div>Edit Gallery 123</div>;
};

const mapDispatchToProps = {
    userGalleries
};

export default connect(null, mapDispatchToProps)(EditGallery);
