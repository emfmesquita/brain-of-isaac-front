import { combineReducers } from "redux";
import transformationReducers from "brain-of-isaac-commons/reducers/transformationReducers";
import visibilityReducers from "./visibilityReducers";

export default combineReducers({
    transformations: transformationReducers,
    visibility: visibilityReducers
});
