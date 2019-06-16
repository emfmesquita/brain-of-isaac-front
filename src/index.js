import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import transformationActions from "brain-of-isaac-commons/actions/transformationActions";
import TransformationsPage from "./components/TransformationsPage";
import C from "brain-of-isaac-commons/constants/transformationConstants";

const title = "The Brain of Isaac";

const twitch = window.Twitch.ext;

let token = "";
let tuid = "";

const store = createStore(rootReducer);

twitch.rig.log("start");

twitch.onAuthorized(function(auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  twitch.listen("broadcast", (target, contentType, message) => {
    const transformations = JSON.parse(message).tr;
    if(!transformations) return;

    C.order.forEach((name, idx) => {
      const actionBuilder = transformationActions.updateTransformation[name];
      const transformation = transformations[idx];
      const action = actionBuilder(...transformation);
      store.dispatch(action);
    });
  });

  twitch.rig.log("auth");
});

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: "100%" }}>
      <TransformationsPage/>
    </div>
  </Provider>,
  document.getElementById("app")
);
