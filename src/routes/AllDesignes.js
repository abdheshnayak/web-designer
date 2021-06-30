import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllDesignes() {
  const [design_links, setdesign_links] = useState([]);
  useEffect(() => {
    axios({
      url: "https://api.anayak.com.np/design/get-all/",
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

            <a href={"https://wd.anayak.com.np/view/" + item.id}>
              https://wd.anayak.com.np/view/{item.id}
            </a>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AllDesignes;
