import React, { useState } from "react";
import { Switch, Button } from "@material-ui/core";

const PersonItem = ({ photo_id, person_key, first_name, last_name }) => {
    const [checked, setChecked] = useState(false);
    const onCheck = () => {
        setChecked(!checked);
    };
    return (
        <div>
            <div>
                {first_name} {last_name}
            </div>
            <div>
                <Switch checked={checked} onChange={onCheck} inputProps={{ "aria-label": "secondary checkbox" }} />
            </div>
        </div>
    );
};

export default PersonItem;
