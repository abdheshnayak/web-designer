import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBase } from "../config/config";

function AllDesignes() {
  const [design_links, setdesign_links] = useState([]);
  useEffect(() => {
    axios({
      url: apiBase + "/design/get-all/",
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setdesign_links(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Designs</h2>
      {design_links.map((item, index) => {
        return (
          <div style={{ margin: ".5rem" }}>
            <span>{index + 1}. </span>

            <a href={apiBase + "/view/" + item.id} target="_blank">
              {apiBase}/view/{item.id}
            </a>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AllDesignes;
