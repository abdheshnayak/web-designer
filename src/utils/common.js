import DomObject from "../objects/DomObject";
import Hash from "./Hash";
import { array_move, getItemIndex, getParent } from "./methods";

export const getBody = (from_local) => {
  if (!from_local && window.body) return window.body;

  var savedObject = localStorage.getItem("savedDesign") || null;

  if (savedObject) {
    savedObject = JSON.parse(savedObject);
    window.body = new DomObject(savedObject);
  } else {
    window.body = new DomObject();
  }

  return window.body;
};

export const setBody = (body) => {
  localStorage.setItem("savedDesign", JSON.stringify(body));
};

export const getElementIcon = (element) => {
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
    case "input":
    case "textarea":
      return "fa-terminal";
    default:
      return "fa-question-square";
  }
};

export const moveUpDown = (element, upOrDown) => {
  var parent = getParent(window.body, element);

  if (parent) {
    var index = getItemIndex(parent, element);
    if (upOrDown) {
      if (index <= 0) return;
      parent.childrens = array_move(parent.childrens, index, index - 1);
    } else {
      if (index >= parent.childrens.length - 1) return;
      parent.childrens = array_move(parent.childrens, index, index + 1);
    }
    setBody(window.body);
    getBody(true);
  }
};

export const getCssStyles = (elementOuter, string = "", styleScreen) => {
  var stl = elementOuter.getStyles({ styleScreen: styleScreen });
  if (stl.trim()) {
    var tempString = "." + elementOuter.className + "{" + stl + "}";
  } else tempString = "";

  elementOuter.childrens.forEach((element) => {
    tempString += getCssStyles(element, string, styleScreen);
  });
  return tempString;
};

export const updateDesign = (para, designRoot, sethashmap) => {
  para.childrens.forEach((element) => {
    var elementDom = document.createElement(element.element);
    if (element.className) {
      elementDom.classList.add(element.className);
    }
    if (!element.text) {
      element.text = "hello";
    }

    elementDom.innerText = element.text || "";

    // element.attributes.getAttributes().forEach((attr) => {
    //   elementDom.setAttribute(attr.attribute, attr.value);
    // });

    elementDom.addEventListener("click", (e) => {
      getIdByDesign(e.target);
      sethashmap((s) => {
        return { ...s, active_id: getIdByDesign(e.target) };
      });
    });

    // elementDom.addEventListener("mouseover", (e) => {
    //   getIdByDesign(e.target);
    //   sethashmap((s) => {
    //     return { ...s, overlay_id: getIdByDesign(e.target) };
    //   });
    // });

    designRoot.appendChild(elementDom);

    setDesignElement(element._id, elementDom);

    // console.log(elementDom);
    // window.hashMap.setDesignDom(element, elementDom);

    updateDesign(element, elementDom, sethashmap);
  });
};

export const deleteElement = (element) => {
  var parent = getParent(window.body, element);

  if (parent) {
    parent.childrens.splice(getItemIndex(parent, element), 1);
    setBody(window.body);
    getBody(true);
  }
};

export const insertElement = (id, tag) => {
  var element = getVirtualElement(id);

  var child = new DomObject();
  child.setElement(tag);

  element.addChildren(child);

  setBody(window.body);
  getBody(true);
};

var designHash = {};
var virtualHash = {};

export const setDesignElement = (id, element) => {
  designHash[id] = element;
};

export const getDesign = (id) => {
  return designHash[id];
};

export const setVirtualElement = (id, element) => {
  virtualHash[id] = element;
};

export const getVirtualElement = (id) => {
  return virtualHash[id];
};

export const getIdByVirtualElement = (element) => {
  var keyList = Object.keys(virtualHash);
  for (var i = 0; i < keyList.length; i++) {
    if (virtualHash[keyList[i]] == element) {
      return keyList[i];
    }
  }
};

export const getIdByDesign = (element) => {
  var keyList = Object.keys(designHash);
  for (var i = 0; i < keyList.length; i++) {
    if (designHash[keyList[i]] == element) {
      return keyList[i];
    }
  }
};
export const getOffset = (el) => {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
};
