import React, { useContext, useEffect, useState } from "react";
import { getElementIcon, setVirtualElement } from "../../../utils/common";
import TreeItems from ".";
import { GlobPreference } from "../../../App";

function TreeItem(props) {
  const { item } = props;
  const [is_collapsed, set_is_collapsed] = useState(false);

  const glob_context = useContext(GlobPreference);
  useEffect(() => {
    setVirtualElement(item._id, item);
  }, [item]);

  return (
    <div
      className={
        "element" +
        (glob_context.hashmap.active_id === item._id ? " active" : "")
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
              : is_collapsed
              ? "fa-caret-right"
              : "fa-caret-down")
          }
          onClick={(e) => {
            set_is_collapsed(!is_collapsed);
          }}
        ></i>
        <i className={"far " + getElementIcon(item.element)}></i>
        <span>{item.name || item.element}</span>
      </div>

      <div className={"elements " + (is_collapsed ? "hide" : "")}>
        <TreeItems childrens={item.childrens} />
      </div>
    </div>
  );
}

export default TreeItem;
