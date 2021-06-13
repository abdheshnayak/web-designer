import React, { useContext, useEffect, useState } from "react";
import { GlobPreference } from "../App";
import { getCssStyles, updateDesign } from "../utils/common";

function DesignScreen() {
  const context = useContext(GlobPreference);
  const [zoomValue, setzoomValue] = useState(100);

  useEffect(() => {
    window.body.className = window.body.className || "designRoot";
    var viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    viewport.setAttribute("content", "width=device-width");

    var StylesDom = document.createElement("style");

    StylesDom.innerText = getCssStyles(window.body, "", "styles");

    StylesDom.innerText +=
      "@media screen and (max-width: 1025px) {" +
      getCssStyles(window.body, "", "tabletStyles") +
      "}";

    StylesDom.innerText +=
      "@media screen and (max-width: 415px) {" +
      getCssStyles(window.body, "", "mobileStyles") +
      "}";

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
    updateDesign(window.body, iframe.body, context.sethashmap);
    iframe.body.classList.add(window.body.className);
  }, [context.refresh]);

  //   hashMap.setDesignDom(body, iframe.body);

  return (
    <div className="design-container">
      {/* <!-- Screen Sizes Buttons Bar Start --> */}
      <div className="screen-size-bar">
        <div className="screen-size-bar-inner">
          {[
            { screen: "desktop", label: "desktop(1920×1080)" },
            { screen: "tablet", label: "tablet(1024×1366)" },
            { screen: "mobile", label: "mobile(414×736)" },
          ].map((item, index) => {
            return (
              <span
                className={
                  context.hashmap.screen_class === item.screen ? "active" : ""
                }
                onClick={(e) => {
                  context.sethashmap((s) => {
                    return {
                      ...s,
                      screen_class: item.screen,
                    };
                  });
                }}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
      {/* <!-- Screen Sizes Buttons Bar End --> */}

      <div className="design-wrapper cursor-screen">
        <div
          className={"design-outer " + context.hashmap.screen_class}
          style={{ transform: "scale(" + (zoomValue / 100).toFixed(2) + ")" }}
        >
          {/* <!-- overlay that show elements on design screen --> */}
          <div id="overlay" style={{}}>
            <span></span>
          </div>

          {/* <!-- iframe that shows live-design --> */}
          <iframe
            className="design-inner"
            src=""
            id="designRoot"
            frameBorder="0"
            title="design"
          ></iframe>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="zoom-bar">
          <i
            className="fas fa-plus"
            id="zoom-plus"
            onClick={(e) => {
              setzoomValue(zoomValue + 10);
            }}
          ></i>
          <i
            className="fas fa-minus"
            id="zoom-minus"
            onClick={(e) => {
              setzoomValue(zoomValue - 10);
            }}
          ></i>
          <div>
            <span id="zoom-status">{zoomValue}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignScreen;
