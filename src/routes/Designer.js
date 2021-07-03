import React, { useContext, useState } from "react";
import { GlobPreference } from "../App";
import CssEditor from "../components/CssEditor";
import DesignScreen from "../components/DesignScreen";
import FullCssEditor from "../components/FullCssEditor";
import LeftToolBar from "../components/LeftToolBar";
import RightToolBar from "../components/RightToolBar";
import {
  getBody,
  getCssStyles,
  getDesignServerId,
  getJsonString,
  saveDesignServerId,
} from "../utils/common";

import beautify from "beautify";

import AceEditor from "react-ace";
import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import HtmlEditor from "../components/HtmlEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { apiBase } from "../config/config";

function Designer() {
  //   useEffect(() => {
  //     console.log(getBody());
  //   }, []);

  const [is_output_window_open, setis_output_window_open] = useState(false);
  const [ouput_code, setouput_code] = useState("");

  const context = useContext(GlobPreference);
  const { sethashmap, hashmap } = context;
  const [menu_active, setmenu_active] = useState(false);

  const saveToServer = () => {
    axios({
      url: apiBase + "/design/save",
      method: "post",
      data: { design: getJsonString(), id: getDesignServerId() },
    })
      .then((res) => {
        // console.log(res.data);
        if (!getDesignServerId()) {
          saveDesignServerId(res.data.id);
        }

        window.open("/view/" + res.data.id, "_blank");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        console.log(err);
      });
  };

  const row_resizer = (e) => {
    var rt = document.getElementById("root");

    if (e.clientY == 0) return;

    sethashmap((s) => {
      return {
        ...s,
        editor_height: rt.clientHeight - e.clientY,
      };
    });
  };

  return (
    <>
      <div className="abort-mobile-device">
        <span>Please Open in Desktop/laptop device for better Experience</span>
      </div>
      {is_output_window_open && (
        <div
          className="output-wrapper"
          onClick={(e) => {
            if (e.target.classList.contains("output-wrapper")) {
              setis_output_window_open(false);
            }
          }}
        >
          <div className="window-title">
            <i
              className="fas fa-window-close"
              onClick={(e) => setis_output_window_open(false)}
            ></i>
          </div>
          <AceEditor
            fontSize="1.25rem"
            mode="html"
            theme="monokai"
            name="output-ace"
            editorProps={{ $blockScrolling: true }}
            //   enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            value={ouput_code}
            enableSnippets={true}
            readOnly={true}
          />
          <div className="window-bottom"></div>
        </div>
      )}

      <div className="main">
        <div className="main-inner">
          {/* <!-- Navebar(header) start --> */}
          <div className="navbar">
            {/* <!-- menu button --> */}
            <div
              className={"nav-button" + (menu_active ? " active" : "")}
              onClick={(e) => {
                if (
                  e.target.classList.contains("nav-button") ||
                  e.target.parentElement.classList.contains("nav-button")
                )
                  setmenu_active(!menu_active);
              }}
            >
              <i
                className={"far " + (!menu_active ? " fa-bars" : " fa-times")}
              ></i>
              <span>Menu</span>
              <div className={"menu-item" + (menu_active ? "" : " hide")}>
                {/* code button */}
                <div
                  className="menu-item-button"
                  onClick={(e) => {
                    var mydom = document.createElement("html");
                    // mydom.innerHTML = "";

                    var x = document.getElementById("designRoot");

                    var iframe = x.contentWindow || x.contentDocument;
                    if (iframe.document) iframe = iframe.document;

                    mydom.appendChild(iframe.head.cloneNode(true));
                    mydom.appendChild(iframe.body.cloneNode(true));

                    setouput_code(
                      beautify(
                        beautify("<!DOCTYPE html>" + mydom.outerHTML, {
                          format: "css",
                        }),
                        { format: "html" }
                      )
                    );

                    setis_output_window_open(true);

                    setmenu_active(!menu_active);
                  }}
                >
                  <i className="fad fa-code"></i>
                  <span>Code</span>
                </div>

                {/* <!-- Designer Name(brand) --> */}
                <div
                  className="menu-item-button"
                  onClick={(e) => {
                    saveToServer();
                    setmenu_active(!menu_active);
                  }}
                >
                  <i className="far fa-share-alt"></i>
                  <span> Share Link</span>{" "}
                </div>

                <div
                  className="menu-item-button"
                  onClick={(e) => {
                    window.open(apiBase + "/all-designs", "_blank");
                  }}
                >
                  <i className="far fa-ballot"></i>
                  <span>All Designs</span>
                </div>

                <hr />
                {/* Delete Design */}
                <div
                  className="menu-item-button"
                  onClick={(e) => {
                    setmenu_active(!menu_active);
                    localStorage.clear();
                    getBody(true);

                    window.location.pathname = "/";
                  }}
                >
                  <i className="far fa-trash"></i>
                  <span>Delete Design</span>
                </div>
              </div>
            </div>
            {/* <!-- menu button end --> */}

            <div className="nav-button">
              {context.is_saving == 0 ? (
                <>
                  <i className="far fa-check-circle"></i>
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <i className="far fa-sync anim-rotate"></i>
                  <span>Saving</span>
                </>
              )}
            </div>

            <div className="nav-button disabled">Web Designer</div>
          </div>
          {/* <!-- navbar end --> */}

          {/* <!-- main body start --> */}
          <div className="body-wrapper">
            <div className="body">
              {/* <!-- left toolbar start --> */}

              {!hashmap.is_tree_editor_on && <LeftToolBar />}

              <DesignScreen />

              {/* <!-- Override Css Block Start--> */}
              {hashmap.active_id && !hashmap.is_properties_editor_on && (
                <RightToolBar />
              )}
              {hashmap.is_css_editor_to_right && (
                <>
                  <CssEditor />
                  <FullCssEditor />
                  <HtmlEditor />
                </>
              )}
            </div>
          </div>
          {!hashmap.is_css_editor_to_right && (
            <>
              <div
                draggable="true"
                className="row-resizer"
                onDrag={row_resizer}
              />

              <CssEditor />
              <FullCssEditor />
              <HtmlEditor />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Designer;
