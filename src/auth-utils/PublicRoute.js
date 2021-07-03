import React from "react";
import { Redirect, Route } from "react-router";
import { getToken } from "./commons";

function PublicRoute(props) {
  return (
    <Route>
      {!getToken() ? props.children : <Redirect to="/admin/dashboard" />}
    </Route>
  );
}

export default PublicRoute;
