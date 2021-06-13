import { Ace } from "ace-builds";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobPreference } from "../App";
import AceEditor from "react-ace";

import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { getBody, getVirtualElement, setBody } from "../utils/common";

function CssEditor() {
  const context = useContext(GlobPreference);
  const {
    is_css_editor_on,
    set_is_css_editor_on,
    hashmap,
    setrefresh,
    refresh,
  } = context;

  const [css_code, setcss_code] = useState("");
  const [class_name, setclass_name] = useState("");

  const onChange = (newValue) => {
    if (!context.hashmap.active_id) {
      console.log(context.hashmap.active_id);

      setcss_code(" ");
      console.log(css_code);
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

    element[screen_dict[context.hashmap.screen_class]].cssOverride = newtext;

    setBody(getBody());

    setcss_code(newtext);

    setrefresh(!refresh);
  };

  const editor_ref = useRef();

  useEffect(() => {
    var screen_dict = {
      desktop: "styles",
      mobile: "mobileStyles",
      tablet: "tabletStyles",
    };

    var id = hashmap.active_id;

    var element = getVirtualElement(id);

    if (!element) return;

    setclass_name(element.className);

    element[screen_dict[context.hashmap.screen_class]].cssOverride =
      element[screen_dict[context.hashmap.screen_class]].cssOverride || "";

    setBody(getBody());

    getBody(true);

    // console.log(element[screen_dict[context.hashmap.screen_class]].cssOverride);

    setcss_code(element[screen_dict[context.hashmap.screen_class]].cssOverride);
  }, [context.hashmap["active_id"], context.hashmap["screen_class"]]);

  const [read_mode, setread_mode] = useState(false);

  const onCursorChange = (e) => {
    if (e.cursor.row == 0) {
      setread_mode(true);
    } else {
      setread_mode(false);
    }
    console.log(e.cursor.row);
  };

  return (
    <>
      {is_css_editor_on === "single" && (
        <AceEditor
          className="css-editor-bottom"
          style={{ borderTop: "0.15rem solid #18a0fb" }}
          ref={editor_ref}
          width="100%"
          fontSize="1.25rem"
          mode="css"
          theme="monokai"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          //   enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          value={"." + class_name + "{\n" + css_code + "\n}"}
          enableSnippets={true}
          readOnly={!context.hashmap.active_id || read_mode}
          onCursorChange={onCursorChange}
        />
      )}
    </>
  );
}

export default CssEditor;
