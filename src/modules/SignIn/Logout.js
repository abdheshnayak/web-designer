import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    sessionStorage.clear();
    window.location.pathname = "/";
  }, []);
  return (
    <h1 style={{ margin: "3rem", textAlign: "center" }}>Logging Out...</h1>
  );
}

export default Logout;
