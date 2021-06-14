import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobPreference } from "../App";
import AceEditor from "react-ace";

import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import {
  getBody,
  getCssStyles,
  getVirtualElement,
  setBody,
} from "../utils/common";
import beautify from "beautify";

function HtmlEditor() {
  const context = useContext(GlobPreference);
  const { hashmap, sethashmap } = context;

  const [html_code, sethtml_code] = useState("");

  const onChange = (newValue) => {
    if (!hashmap.active_id) {
      console.log(hashmap.active_id);

      sethtml_code(" ");
      console.log(html_code);
      return true;
    }

    var lines = newValue.trim().split("\n");

    lines.splice(0, 1);

    lines.splice(lines.length - 1, lines.length);

    var newtext = lines.join("\n");

    var screen_dict = {
      desktop: "styles",
      mobile: "mobileStyles",
      tablet: "tabletStyles",
    };

    var id = hashmap.active_id;

    var element = getVirtualElement(id);

    if (!element) return;

    element[screen_dict[hashmap.screen_class]].cssOverride = newtext;

    setBody(getBody());

    sethtml_code(newtext);

    sethashmap((s) => {
      return { ...s, refresh: !hashmap.refresh };
    });
  };

  const editor_ref = useRef();

  useEffect(() => {
    var x = document.getElementById("designRoot");

    var iframe = x.contentWindow || x.contentDocument;
    if (iframe.document) iframe = iframe.document;

    var fakeBody = iframe.body.cloneNode(true);

    sethtml_code(
      beautify(fakeBody.outerHTML, {
        format: "html",
      })
    );
  }, [hashmap["screen_class"], hashmap.is_css_editor_on, hashmap.refresh]);

  const [read_mode, setread_mode] = useState(false);

  const onCursorChange = (e) => {
    if (e.cursor.row == 0) {
      setread_mode(true);
    } else {
      setread_mode(false);
    }
    // console.log(e.cursor.row);
  };

  return (
    <>
      {hashmap.is_css_editor_on === "html" && (
        <AceEditor
          className={
            "css-editor-bottom" +
            (hashmap.is_css_editor_to_right ? " right" : "")
          }
          style={{ borderTop: "0.15rem solid #18a0fb" }}
          ref={editor_ref}
          width="100%"
          fontSize="1.25rem"
          mode="html"
          theme="monokai"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          //   enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          value={html_code}
          enableSnippets={true}
          readOnly={true}
          onCursorChange={onCursorChange}
        />
      )}
    </>
  );
}

export default HtmlEditor;
