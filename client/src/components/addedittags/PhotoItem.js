import React, { useState } from "react";
import PersonItem from "./PersonItem";

const PhotoItem = ({ img }) => {
    return (
        <div>
            <div>
                <img src={img} alt="..." />
            </div>
            <div>
                <PersonItem />
            </div>
        </div>
    );
};

export default PhotoItem;
