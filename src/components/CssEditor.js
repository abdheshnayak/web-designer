import { Ace } from "ace-builds";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobPreference } from "../App";
import AceEditor from "react-ace";

import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { CssHighlightRules } from "ace-builds/src-noconflict/mode-css";
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

  var classname = "hello";

  const [css_code, setcss_code] = useState("");

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

    console.log(element.getStyles());

    element[screen_dict[context.hashmap.screen_class]].cssOverride = newtext;

    setBody(getBody());

    setcss_code(newtext);

    setrefresh(!refresh);
  };

  const editor_ref = useRef();

  //   useEffect(() => {
  //     var editor = editor_ref.current.editor;
  //   }, [editor_ref]);

  useEffect(() => {
    var screen_dict = {
      desktop: "styles",
      mobile: "mobileStyles",
      tablet: "tabletStyles",
    };

    var id = hashmap.active_id;

    var element = getVirtualElement(id);

    if (!element) return;

    element[screen_dict[context.hashmap.screen_class]].cssOverride =
      element[screen_dict[context.hashmap.screen_class]].cssOverride || "";

    setBody(getBody());

    getBody(true);

    console.log(element[screen_dict[context.hashmap.screen_class]].cssOverride);

    setcss_code(element[screen_dict[context.hashmap.screen_class]].cssOverride);
  }, [context.hashmap["active_id"]]);

  return (
    <AceEditor
      ref={editor_ref}
      className={is_css_editor_on ? "" : "hide"}
      height="20rem"
      width="100%"
      fontSize="1.25rem"
      mode="css"
      theme="monokai"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      //   enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      value={"." + classname + "{\n" + css_code + "\n}"}
      enableSnippets={true}
      readOnly={!context.hashmap.active_id}
    />
  );
}

export default CssEditor;
