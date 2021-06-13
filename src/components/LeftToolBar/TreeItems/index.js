import React, { useState } from "react";
import TreeItem from "./TreeItem";

function TreeItems(props) {
  const { childrens } = props;

  return (
    <>
      <div className="elements">
        {childrens.map((item, index) => {
          return (
            <>
              <TreeItem item={item} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default TreeItems;
