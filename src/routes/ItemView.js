import axios from "axios";
import React, { useEffect, useState } from "react";
import { createRef } from "react";

import { apiBase } from "../config/config";
import {
  getBody,
  getCssStyles,
  JsonStringToBody,
  updateDesign,
} from "../utils/common";

function ItemView(props) {
  const ref = createRef();

  useEffect(async () => {
    var design = await axios({
      url: apiBase + "/design/" + props.id,
    });

    var body = JsonStringToBody(design.data.design);
    body.class_name = body.class_name || "designRoot";

    var viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    viewport.setAttribute("content", "width=device-width");

    var StylesDom = document.createElement("style");

    var style_string = "";

    style_string = getCssStyles(body, "", "styles");

    style_string +=
      "@media screen and (max-width: 1025px) {" +
      getCssStyles(body, "", "tabletStyles") +
      "}";

    style_string +=
      "@media screen and (max-width: 415px) {" +
      getCssStyles(body, "", "mobileStyles") +
      "}";

    StylesDom.innerText = style_string.replace(/\n/g, " ");

    var x = ref.current;

    //   x.contentWindow.addEventListener("wheel", wheelScrollHandler, {
    //     passive: false,
    //   });
    //   x.contentDocument.addEventListener("wheel", wheelScrollHandler, {
    //     passive: false,
    //   });

    var iframe = x.contentWindow || x.contentDocument;
    if (iframe.document) iframe = iframe.document;

    iframe.body.innerText = null;
    iframe.head.innerText = null;
    iframe.head.appendChild(viewport);
    iframe.head.appendChild(StylesDom);
    updateDesign(body, iframe.body, () => {});
    iframe.body.classList = "";
    iframe.body.classList.add(body.class_name);
  }, []);

  return (
    <div
      className="ifram-container"
      onClick={() => {
        window.open("/view/" + props.id, "_blank");
      }}
    >
      <div className="open-overlay" title="open in new tab">
        <i className="fad fa-external-link"></i>
      </div>
      <iframe
        ref={ref}
        frameborder="0"
        style={{
          width: "1024px",
          height: "780px",
        }}
      />
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          fontWeight: "bold",
          color: "#777",
          textTransform: "uppercase",
          gap: "0.25rem",
        }}
      >
        <span>{props.index + 1}.</span>
        <span>{props.id}</span>
      </div>
    </div>
  );
}

export default ItemView;
