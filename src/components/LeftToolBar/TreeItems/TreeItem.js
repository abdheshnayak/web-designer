import React, { useContext, useEffect, useState } from "react";
import { getElementIcon, setVirtualElement } from "../../../utils/common";
import TreeItems from ".";
import { GlobPreference } from "../../../App";

function TreeItem(props) {
  const { item } = props;

  const [collapsed, setcollapsed] = useState(false);

  const glob_context = useContext(GlobPreference);

  useEffect(() => {
    setVirtualElement(item._id, item);
  }, [item]);

  return (
    <div
      className={
        "element" +
        (glob_context.hashmap.active_id === item._id ? " active" : "") +
        (glob_context.hashmap.tree_hover_id === item._id ? " hover" : "")
      }
    >
      <div
        className="name"
        onClick={(e) => {
          glob_context.sethashmap((s) => {
            return {
              ...s,
              active_id: item._id,
            };
          });
        }}
        onMouseEnter={(e) => {
          glob_context.sethashmap((s) => {
            return { ...s, overlay_id: item._id };
          });
          //   console.log(item);
        }}
      >
        <i
          className={
            "fas " +
            (item.childrens.length === 0
              ? "fa-genderless"
              : collapsed
              ? "fa-caret-right"
              : "fa-caret-down")
          }
          onClick={(e) => setcollapsed(!collapsed)}
        ></i>
        <i className={"far " + getElementIcon(item.element)}></i>
        <span>{item.name || item.element}</span>
      </div>
      {!collapsed && <TreeItems childrens={item.childrens} />}
    </div>
  );
}

export default TreeItem;
