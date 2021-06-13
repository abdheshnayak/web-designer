import React from "react";
import { getBody } from "../../../utils/common";
import ListItem from "./ListItem";

function ElementsList() {
  return (
    <div className="elements-list-block">
      {/* <!-- div elemement --> */}
      <ListItem>
        <i className="far fa-rectangle-landscape"></i>
        <span>div</span>
      </ListItem>

      {/* <!-- span element --> */}
      <ListItem>
        <i className="far fa-text"></i>
        <span>span</span>
      </ListItem>

      {/* <!-- p element --> */}
      <ListItem>
        <i className="far fa-text"></i>
        <span>p</span>
      </ListItem>

      {/* <!-- a element --> */}
      <ListItem>
        <i className="far fa-link"></i>
        <span>a</span>
      </ListItem>

      {/* <!-- img element --> */}
      <ListItem>
        <i className="far fa-image"></i>
        <span>img</span>
      </ListItem>

      {/* <!-- img element --> */}
      <ListItem>
        <i className="far fa-image"></i>
        <span>header</span>
      </ListItem>

      {/* <!-- b element --> */}
      <ListItem>
        <i className="far fa-bold"></i>
        <span>b</span>
      </ListItem>

      {/* <!-- i element --> */}
      <ListItem>
        <i className="far fa-italic"> </i>
        <span>i</span>
      </ListItem>

      {/* <!-- br element --> */}
      <ListItem>
        <i style={{ fontWeight: "bold" }}>&lt;br/&gt;</i>
        <span style={{ display: "none" }}>br</span>
      </ListItem>

      {/* <!-- hr element --> */}
      <ListItem>
        <i style={{ fontWeight: "bold" }}>&lt;hr/&gt;</i>
        <span style={{ display: "none" }}>hr</span>
      </ListItem>

      {/* <!-- input element--> */}
      <ListItem>
        <i className="far fa-terminal"> </i>
        <span>input</span>
      </ListItem>

      {/* <!-- input element--> */}
      <ListItem>
        <i></i>
        <span>textarea</span>
      </ListItem>
    </div>
  );
}

export default ElementsList;
