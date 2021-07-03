import React from "react";
import { Redirect, Route } from "react-router";
import { getToken, isAccess } from "./commons";

function PrivateRoute(props) {
  return (
    <Route>
      {getToken() ? (
        isAccess() ? (
          <Redirect to="/super-admin/" />
        ) : (
          props.children
        )
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
}

export default PrivateRoute;
