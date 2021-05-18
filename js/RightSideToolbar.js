const updateRightToolBar = () => {
  var element = hashMap.getVirtualElement(hashMap.activeElement);

  //   console.log(element);

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
  document.getElementById("position-selector").value = element.styles.position;
  document.getElementById("display-selector").value = element.styles.display;
  document.getElementById("color-field").value = element.styles.color || null;
  document.getElementById("margin-field").value = element.styles.margin || null;
  document.getElementById("padding-field").value =
    element.styles.padding || null;

  document.getElementById("background-color-field").value =
    element.styles["background-color"] || null;

  document.getElementById("html-text-field").value = element.text || null;

  if (element.styles.width) {
    document.getElementById("width-field").value = element.styles.width.value;
    document.getElementById("width-unit").value = element.styles.width.unit;
  } else {
    document.getElementById("width-field").value = null;
    document.getElementById("width-unit").value = null;
  }
  if (element.styles.height) {
    document.getElementById("height-field").value = element.styles.height.value;
    document.getElementById("height-unit").value = element.styles.height.unit;
  } else {
    document.getElementById("height-field").value = null;
    document.getElementById("height-unit").value = null;
  }
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
    case "width-field":
      if (!element.styles.width) {
        element.addStyles({ width: new Width() });
      }
      element.styles.width.value = e.target.value.trim();
      break;
    case "height-field":
      if (!element.styles.height) {
        element.addStyles({ height: new Height() });
      }
      element.styles.height.value = e.target.value.trim();
      break;
    case "color-field":
      element.styles.color = e.target.value.trim();
      break;
    case "background-color-field":
      element.styles["background-color"] = e.target.value.trim();
      break;
    case "html-text-field":
      element.text = e.target.value;
      break;
    case "margin-field":
      element.styles.margin = e.target.value.trim();
      break;
    case "padding-field":
      element.styles.padding = e.target.value.trim();
      break;
    case "width-unit":
      if (!element.styles.width) {
        element.addStyles({ width: new Width() });
      }
      element.styles.width.unit = e.target.value;
      break;
    case "height-unit":
      if (!element.styles.height) {
        element.addStyles({ height: new Width() });
      }
      element.styles.height.unit = e.target.value;
      break;
    case "position-selector":
      element.styles.position = e.target.value;
      break;
    case "display-selector":
      element.styles.display = e.target.value;
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

      document.getElementById("zoom-status").innerText =
        Math.floor(zoomValue * 100) + "%";

      break;
    case "desktop-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("desktop");
      e.target.classList.add("active");
      break;
    case "tablet-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("tablet");
      e.target.classList.add("active");
      break;
    case "mobile-screen":
      resetSelectedScreenSize();
      document.querySelector(".design-outer").classList.add("mobile");
      e.target.classList.add("active");
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
    "width-field",
    "height-field",
    "color-field",
    "background-color-field",
    "html-text-field",
    "margin-field",
    "padding-field",
  ];
  const optionsFields = [
    "width-unit",
    "height-unit",
    "position-selector",
    "display-selector",
  ];
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
    var filename = "hello.html";
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
