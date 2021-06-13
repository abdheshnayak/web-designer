import React from "react";

function RightToolBar() {
  return (
    <div className="right-toolbar toolbar">
      <div className="toolbar-block" id="right-toolbar-block">
        <div className="tool-container-outer">
          <div className="css-editor-button-wrapper">
            <span className="css-editor-button active" id="css-edit-button">
              Css Editor
            </span>
          </div>
        </div>

        <div className="tool-container-outer" id="code-editor-block">
          <div className="css-info">This will override current css</div>
          <div className="css-editor-textarea-outer">
            <div id="css-editor-textarea" className="css-editor-textarea"></div>
          </div>
        </div>
        {/* <!-- Override Css Block end--> */}

        {/* <!-- Elements Properties Start --> */}
        <div className="tool-container-outer">
          <span className="title">Element Properties</span>
          <div className="tool-container">
            <div className="row item-2">
              <span>name</span>
              <input id="name-field" type="text" placeholder="abc" />
            </div>
            <div className="row item-2">
              <span>class</span>
              <input type="text" id="class-field" placeholder="abc-class" />
            </div>
            <div className="row item-2">
              <span>id</span>
              <input type="text" id="id-field" placeholder="abc-element" />
            </div>
          </div>
        </div>
        {/* <!-- Elements Properties end --> */}

        {/* <!-- INNER TEXT Contents Start --> */}
        <div className="tool-container-outer">
          <span className="title">HTML</span>
          <div className="tool-container">
            <div className="row item-2">
              <span>Text</span>
              <input type="text" id="html-text-field" placeholder="auto" />
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

        {/* <!-- Width & Height start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Width & Height</span>
            <i className="far fa-plus" id="add-width&height-button"></i>
          </div>

          <div className="tool-container" id="WH-block"></div>
        </div>
        {/* <!-- Width & Height End --> */}

        {/* <!-- Absolute Value start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Absolute Values</span>
            <i className="far fa-plus" id="add-absolute_value-button"></i>
          </div>

          <div className="tool-container" id="absolute_value-block"></div>
        </div>
        {/* <!-- Absolute Value End --> */}

        {/* <!-- Margin start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Margin</span>
            <i className="far fa-plus" id="add-margin-button"></i>
          </div>

          <div className="tool-container" id="margin-block"></div>
        </div>
        {/* <!-- Margin End --> */}

        {/* <!-- Padding start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Padding</span>
            <i className="far fa-plus" id="add-padding-button"></i>
          </div>

          <div className="tool-container" id="padding-block"></div>
        </div>
        {/* <!-- Padding End --> */}

        {/* <!-- display start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Display</span>
            <i className="far fa-plus" id="add-display-button"></i>
          </div>

          <div className="tool-container" id="display-block"></div>
        </div>
        {/* <!-- display End --> */}

        {/* <!-- Position start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Position</span>
            <i className="far fa-plus" id="add-position-button"></i>
          </div>

          <div className="tool-container" id="position-block"></div>
        </div>
        {/* <!-- position End --> */}

        {/* <!-- Color start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Color</span>
            <i className="far fa-plus" id="add-color-button"></i>
          </div>

          <div className="tool-container" id="color-block"></div>
        </div>
        {/* <!-- Color End --> */}

        {/* <!-- Background-Color start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">Background Color</span>
            <i className="far fa-plus" id="add-background_color-button"></i>
          </div>

          <div className="tool-container" id="backgound_color-block"></div>
        </div>
        {/* <!-- Background-Color End --> */}

        {/* <!-- Border start --> */}
        <div className="tool-container-outer">
          <div className="title-cont">
            <span className="title">border</span>
            <i className="far fa-plus" id="add-border-button"></i>
          </div>

          <div className="tool-container" id="border-block"></div>
        </div>
        {/* <!-- Border End --> */}
      </div>
    </div>
  );
}

export default RightToolBar;
