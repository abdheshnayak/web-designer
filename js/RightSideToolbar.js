const updateRightToolBar = () => {
  var element = hashMap.getVirtualElement(hashMap.activeElement);

  //   console.log(element);

  if (!element) {
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
  }
  //   console.log(e);
};

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
  ];
  const optionsFields = [
    "width-unit",
    "height-unit",
    "position-selector",
    "display-selector",
  ];
  const elementActions = ["delete-item", "move-up", "move-down"];

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
};
rightSideToolbar();
