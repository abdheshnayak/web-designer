import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getBody,
  getCssStyles,
  JsonStringToBody,
  updateDesign,
} from "../utils/common";

function BrowseFullPage(props) {
  useEffect(async () => {
    var design = await axios({
      url: "https://api.anayak.com.np/design/" + props.match.params.id,
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

    StylesDom.innerText = style_string.replaceAll("\n", " ");

    var x = document.getElementById("designRoot");

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
    <iframe
      id="designRoot"
      frameborder="0"
      style={{ width: "100vw", height: "100vh" }}
    ></iframe>
  );
}

export default BrowseFullPage;
