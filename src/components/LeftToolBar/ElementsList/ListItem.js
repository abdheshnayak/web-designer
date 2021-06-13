import React, { useContext } from "react";
import { GlobPreference } from "../../../App";
import { insertElement } from "../../../utils/common";

function ListItem(props) {
  const context = useContext(GlobPreference);
  const pushElement = () => {
    if (!context.hashmap.active_id) return;
    insertElement(context.hashmap.active_id, props.children[1].props.children);
    context.setrefresh(!context.refresh);
  };
  return (
    <div className="element" onClick={pushElement}>
      {props.children}
    </div>
  );
}

export default ListItem;
