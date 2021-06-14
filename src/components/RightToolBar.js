import React, { useContext, useEffect, useState } from "react";
import { GlobPreference } from "../App";
import { getBody, getVirtualElement, setBody } from "../utils/common";

function RightToolBar() {
  const context = useContext(GlobPreference);
  const { hashmap, sethashmap } = context;

  const [fields_text, setfields_text] = useState({
    html_text: "",
    name_field: "",
    class_field: "",
    id_field: "",
  });

  useEffect(() => {
    if (!hashmap.active_id) return;

    var element = getVirtualElement(hashmap.active_id);

    setfields_text((s) => {
      return {
        ...s,
        html_text: element.text || "",
        name_field: element.name || "",
        class_field: element.class_name || "",
        id_field: element.id || "",
      };
    });
  }, [hashmap.active_id]);

  const onTextFieldChange = (e) => {
    if (!hashmap.active_id) return;

    var { name, value } = e.target;

    if (name !== "html_text") value = value.replaceAll(" ", "-");

    var element = getVirtualElement(hashmap.active_id);

    switch (name) {
      case "html_text":
        element.text = value;
        break;
      case "name_field":
        element.name = value;
        break;
      case "class_field":
        element.class_name = value;
        break;
      case "id_field":
        element.id = value;
        break;
    }

    setBody(getBody());

    // getBody(true);

    sethashmap((s) => {
      return { ...s, refresh: !hashmap.refresh };
    });

    setfields_text((s) => {
      return { ...s, [name]: value };
    });
  };

  return (
    <div className="right-toolbar toolbar">
      <div className="toolbar-block" id="right-toolbar-block">
        {/* <!-- Elements Properties Start --> */}
        <div className="tool-container-outer">
          <span className="title">Element Properties</span>
          <div className="tool-container">
            <div className="row item-2">
              <span>name</span>
              <input
                name="name_field"
                type="text"
                placeholder="abc"
                value={fields_text.name_field}
                onChange={onTextFieldChange}
              />
            </div>
            <div className="row item-2">
              <span>class</span>
              <input
                type="text"
                name="class_field"
                placeholder="class-name"
                value={fields_text.class_field}
                onChange={onTextFieldChange}
              />
            </div>
            <div className="row item-2">
              <span>id</span>
              <input
                type="text"
                name="id_field"
                value={fields_text.id_field}
                onChange={onTextFieldChange}
                placeholder="abc-element"
              />
            </div>
          </div>
        </div>
        {/* <!-- Elements Properties end --> */}

        {/* <!-- INNER TEXT Contents Start --> */}
        <div className="tool-container-outer">
          <span className="title">HTML</span>
          <div className="tool-container">
            <div className="row item-2">
              <textarea
                name="html_text"
                cols="30"
                rows="10"
                placeholder="HTML text"
                value={fields_text.html_text}
                onChange={onTextFieldChange}
              ></textarea>
            </div>
          </div>
        </div>
        {/* <!-- INNER TEXT Contents End --> */}

        {/* <!-- HTML Attributes start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Attributes</span>
            <i className="far fa-plus" id="add-attributes-button"></i>
          </div>

          <div className="tool-container" id="attributes-block"></div>
        </div>
        {/* <!-- Width & Height End --> */}
      </div>
    </div>
  );
}

export default RightToolBar;
