import { combineReducers } from "redux";
import transformationReducers from "brain-of-isaac-commons/reducers/transformationReducers";

export default combineReducers({
    transformations: transformationReducers
});
