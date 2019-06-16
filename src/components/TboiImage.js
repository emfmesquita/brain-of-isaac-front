import React from "react";
import { SimpleImg } from 'react-simple-img';

export default (props) => {
    return <SimpleImg {...props} placeholder={false} draggable="false"/>;
}