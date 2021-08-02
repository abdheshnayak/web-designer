import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBase } from "../config/config";
import ItemView from "./ItemView";

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
    <div>
      <div className="all-design-app-bar">
        <h2>All Designs</h2>
      </div>
      <div className="iframes-holder">
        {design_links.map((item, index) => {
          return <ItemView id={item.id} index={index} />;
        })}
      </div>
    </div>
  );
}

export default AllDesignes;
