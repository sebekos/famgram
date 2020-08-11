import { combineReducers } from "redux";
import auth from "./auth";
import ui from "./ui";
import gallery from "./gallery";
import person from "./person";

export default combineReducers({
    auth,
    ui,
    gallery,
    person
});
