function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const createProperties = (element) => {
  hashMap.BorderElement = new BorderElement({
    id: "border-block",
  });

  hashMap.MarginElement = new MarginElement({
    id: "margin-block",
  });

  hashMap.PaddingElement = new PaddingElement({
    id: "padding-block",
  });

  hashMap.WidthHeightElement = new WidthHeightElement({
    id: "WH-block",
  });

  hashMap.DisplayElement = new DisplayElement({
    id: "display-block",
  });

  hashMap.PositionElement = new PositionElement({
    id: "position-block",
  });

  hashMap.ColorElement = new ColorElement({
    id: "color-block",
  });
  hashMap.BackgrundColorElement = new BackgrundColorElement({
    id: "backgound_color-block",
  });

  hashMap.AbsoluteValueElement = new AbsoluteValueElement({
    id: "absolute_value-block",
  });
};

const updateRightToolBar = () => {
  reestOverlay();

  var element = hashMap.getVirtualElement(hashMap.activeElement);
  if (!hashMap.activeElement) {
    element = body;
  }

  if (!hashMap.firstLoad) {
    hashMap.firstLoad = true;
    createProperties(element);
  }

  [
    { key: "AbsoluteValueElement", property: "absolute_value" },
    { key: "BorderElement", property: "border" },
    { key: "MarginElement", property: "margin" },
    { key: "PaddingElement", property: "padding" },
    { key: "WidthHeightElement", property: "width_height" },
    { key: "DisplayElement", property: "display" },
    { key: "PositionElement", property: "position" },
    { key: "BackgrundColorElement", property: "background_color" },
    { key: "ColorElement", property: "color" },
  ].forEach((item) => {
    hashMap[item.key].updateElements(
      element[hashMap.styleScreen][item.property]
    );
  });

  if (!element || (element && element.name == "body")) {
    document.getElementById("right-toolbar-block").classList.add("hide");
    document.getElementById("dom-tree-element-action").classList.add("hide");
    return;
  } else {
    document.getElementById("dom-tree-element-action").classList.remove("hide");
    document.getElementById("right-toolbar-block").classList.remove("hide");
  }

  document.getElementById("name-field").value = element.name;
  document.getElementById("class-field").value = element.className;
  document.getElementById("id-field").value = element.id;

  document.getElementById("html-text-field").value = element.text || null;
};

const inputFieldsHandler = (e) => {
  var element = hashMap.getVirtualElement(hashMap.activeElement);
  switch (e.target.id) {
    case "name-field":
      element.name = e.target.value;
      break;
    case "class-field":
      element.className = e.target.value;
      break;
    case "id-field":
      element.id = e.target.value;
      break;

    case "html-text-field":
      element.text = e.target.value;
      break;

    default:
      console.log("input field unhandled");
  }
  refreshDomTree();
};

const resetSelectedScreenSize = () => {
  document.querySelector(".design-outer").classList.remove("desktop");
  document.querySelector(".design-outer").classList.remove("tablet");
  document.querySelector(".design-outer").classList.remove("mobile");

  var screenButtons = document.querySelectorAll(
    ".screen-size-bar-inner .active"
  );

  screenButtons.forEach((button) => {
    button.classList.remove("active");
  });
};

const buttonClickHandler = (e) => {
  var element = hashMap.getVirtualElement(hashMap.activeElement);

  switch (e.target.id) {
    case "delete-item":
      deleteElement(element);
      break;
    case "move-up":
      moveUpDown(element, true);
      break;
    case "move-down":
      moveUpDown(element, false);
      break;
    case "zoom-plus":
      zoomValue += 10;
      document.querySelector(".design-outer").style =
        "-moz-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");-o-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");-webkit-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");";
      document.getElementById("zoom-status").innerText = zoomValue + "%";

      break;
    case "zoom-minus":
      zoomValue -= 10;
      if (zoomValue < 10) {
        zoomValue = 10;
      }

      document.querySelector(".design-outer").style =
        "-moz-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");-o-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");-webkit-transform: scale(" +
        (zoomValue / 100).toFixed(2) +
        ");";

      document.getElementById("zoom-status").innerText = zoomValue + "%";

      break;
    case "desktop-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("desktop");
      e.target.classList.add("active");
      hashMap.styleScreen = "styles";
      refreshDomTree();

      break;
    case "tablet-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("tablet");
      e.target.classList.add("active");
      hashMap.styleScreen = "tabletStyles";
      refreshDomTree();

      break;
    case "mobile-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("mobile");
      e.target.classList.add("active");
      hashMap.styleScreen = "mobileStyles";
      refreshDomTree();
      break;
  }
  //   console.log(e);
};

var temp;

const rightSideToolbar = () => {
  const inputFields = [
    "name-field",
    "class-field",
    "id-field",

    "html-text-field",
  ];
  const optionsFields = [];
  const elementActions = [
    "delete-item",
    "move-up",
    "move-down",
    "zoom-plus",
    "zoom-minus",
    "mobile-screen",
    "desktop-screen",
    "tablet-screen",
  ];

  elementActions.forEach((element) => {
    document
      .getElementById(element)
      .addEventListener("click", buttonClickHandler);
  });

  inputFields.forEach((element) => {
    document
      .getElementById(element)
      .addEventListener("input", inputFieldsHandler);
  });

  optionsFields.forEach((element) => {
    document
      .getElementById(element)
      .addEventListener("change", inputFieldsHandler);
  });
  document.getElementById("download-button").addEventListener("click", (e) => {
    var x = document.getElementById("root");
    var iframe = x.contentWindow || x.contentDocument;
    if (iframe.document) iframe = iframe.document;
    console.log(iframe);

    var fileContents = iframe.firstChild.outerHTML;
    var filename = "wysiwyg-design.html";
    var filetype = "text/plain";

    var a = document.createElement("a");
    dataURI = "data:" + filetype + ";base64," + btoa(fileContents);
    a.href = dataURI;
    a["download"] = filename;
    var e = document.createEvent("MouseEvents");
    // Use of deprecated function to satisfy TypeScript.
    e.initMouseEvent(
      "click",
      true,
      false,
      document.defaultView,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
    // a.removeNode();
  });
};
rightSideToolbar();
