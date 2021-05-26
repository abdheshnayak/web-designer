// tree elements click handler event
const treeElementClick = (e) => {
  // console.log("clicked");
  var tempElement = e.target.parentElement;

  if (tempElement.classList.contains("element")) {
    hashMap.activeElement = tempElement;
  } else if (tempElement.parentElement.classList.contains("element")) {
    hashMap.activeElement = tempElement.parentElement;
  }

  if (e.target.classList.contains("collapser")) {
    hashMap.getVirtualElement(hashMap.activeElement).collapsed =
      !hashMap.getVirtualElement(hashMap.activeElement).collapsed;
  }

  hashMap.getVirtualElement(hashMap.activeElement).active = true;

  hashMap.activeElement.classList.add("active");

  refreshDomTree();
  updateRightToolBar();
};

// getElementIcon
const getElementIcon = (element) => {
  switch (element) {
    case "a":
      return "fa-link";
    case "img":
      return "fa-image";
    case "div":
      return "fa-rectangle-landscape";
    case "p":
      return "fa-text";
    case "span":
      return "fa-text";
    default:
      return "fa-question-square";
  }
};

// get x axis and y axis position of element
function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

const reestOverlay = () => {
  var overlay = document.getElementById("overlay");
  var overlayInner = overlay.querySelector("span");

  var designElement = hashMap.getDesignElement(hashMap.activeElement);
  var allStyles = window.getComputedStyle(designElement);

  overlayInner.style.width = designElement.offsetWidth;
  overlayInner.style.height = designElement.offsetHeight;

  if (designElement.tagName == "BODY") {
    overlay.style.left = getOffset(designElement).left;
    overlay.style.top = getOffset(designElement).top;
  } else {
    overlay.style.left =
      getOffset(designElement).left - parseInt(allStyles.marginLeft);
    overlay.style.top =
      getOffset(designElement).top - parseInt(allStyles.marginTop);
  }

  overlay.style.paddingLeft = allStyles.marginLeft;
  overlay.style.paddingTop = allStyles.marginTop;
  overlay.style.paddingRight = allStyles.marginRight;
  overlay.style.paddingBottom = allStyles.marginBottom;
};

// on hove effect on tree element
const treeElementHover = (e) => {
  var tempElement = e.target.parentElement;

  var result;
  if (tempElement.classList.contains("element")) {
    result = tempElement;
  } else if (tempElement.parentElement.classList.contains("element")) {
    result = tempElement.parentElement;
  }

  var overlay = document.getElementById("overlay");
  var overlayInner = overlay.querySelector("span");

  var designElement = hashMap.getDesignElement(result);
  var allStyles = window.getComputedStyle(designElement);

  // console.log(getOffset(designElement).left);

  overlayInner.style.width = designElement.offsetWidth;
  overlayInner.style.height = designElement.offsetHeight;
  // console.log(overlay.tagName);
  if (designElement.tagName == "BODY") {
    overlay.style.left = getOffset(designElement).left;
    overlay.style.top = getOffset(designElement).top;
  } else {
    overlay.style.left =
      getOffset(designElement).left - parseInt(allStyles.marginLeft);
    overlay.style.top =
      getOffset(designElement).top - parseInt(allStyles.marginTop);
  }

  // console.log(allStyles.marginLeft);

  // console.log(designElement.style);

  var border = " solid " + "red";

  overlay.style.paddingLeft = allStyles.marginLeft;
  overlay.style.paddingTop = allStyles.marginTop;
  overlay.style.paddingRight = allStyles.marginRight;
  overlay.style.paddingBottom = allStyles.marginBottom;

  //   console.log(x, y);
  //   console.log(designElement);
};

// tree Element onleave overlay control
const treeElementLeave = (e) => {
  var overlay = document.getElementById("overlay");
  overlay.style.padding = 0;
  var overlayInner = overlay.querySelector("span");
  overlayInner.style.height = 0;
  overlayInner.style.width = 0;
};

// It returns name element of tree and also add events on it
function getElementName(name, element) {
  var nameOuter = document.createElement("div");
  nameOuter.classList.add("name");
  var caretDown = document.createElement("i");
  if (element.collapsed) {
    caretDown.classList.add("fas", "fa-caret-right", "collapser");
  } else {
    caretDown.classList.add("fas", "fa-caret-down", "collapser");
  }
  var elementIcon = document.createElement("i");
  elementIcon.classList.add("far", getElementIcon(element.element));
  var nameSpan = document.createElement("span");
  nameSpan.innerText = name || element.element;

  if (element.childrens.length <= 0) {
    caretDown.classList.add("fa-genderless");
    caretDown.classList.remove("fa-caret-down", "fa-caret-right", "collapser");
  }
  nameOuter.appendChild(caretDown);
  nameOuter.appendChild(elementIcon);
  nameOuter.appendChild(nameSpan);

  nameOuter.addEventListener("click", treeElementClick);
  nameOuter.addEventListener("mouseover", treeElementHover);
  nameOuter.addEventListener("mouseleave", treeElementLeave);

  return nameOuter;
}

// recursive function to generate dom tree to show on left toolbar
function updateTree(para, tree) {
  var TreeElements = tree.querySelector(".elements");

  para.childrens.forEach((element) => {
    var elementDom = document.createElement("div");
    elementDom.classList.add("element");
    //
    if (element.active) {
      elementDom.classList.add("active");
      hashMap.activeElement = elementDom;
    }
    var elementName = getElementName(element.name, element);
    var ElementsObject = document.createElement("div");
    ElementsObject.classList.add("elements");
    if (element.collapsed) {
      ElementsObject.classList.add("hide");
    }

    elementDom.appendChild(elementName);
    elementDom.appendChild(ElementsObject);

    hashMap.addItem(element, elementDom);
    // console.log(hashMap);
    TreeElements.appendChild(elementDom);

    updateTree(element, elementDom);
  });
}

// this is to refresh the dom tree again and again(like when any changes makes)
const refreshDomTree = () => {
  hashMap.clearHash();
  var Tree = document.getElementById("body-tree");

  Tree.querySelector(".name").addEventListener("click", treeElementClick);
  Tree.querySelector(".name").addEventListener("mouseover", treeElementHover);
  Tree.querySelector(".name").addEventListener("mouseleave", treeElementLeave);
  hashMap.addItem(body, Tree);

  Tree.querySelector(".elements").innerHTML = null;

  updateTree(body, Tree);

  refreshDesign();
  updateRightToolBar();

  if (!body.active) {
    Tree.classList.remove("active");
  }
  localStorage.setItem("savedDesign", JSON.stringify(body));
};
