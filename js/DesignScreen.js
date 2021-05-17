// const clickHandle = (e) => {
//   console.log(e.target.innerText);
//   element = hashMap.getVirtualElementFromDesign(e.target);
//   element.text = e.target.nodeValue;
// };

// const hoverHandler = (e) => {
//   if (e.target.tagName == "DIV") return;
//   e.target.setAttribute("contenteditable", "true");
// };

// const mouseLeaveHandler = (e) => {
//   e.target.setAttribute("contenteditable", "false");
// };

// .design-outer {
//   zoom: 0.75;
//   -moz-transform: scale(0.5);
//   -moz-transform-origin: 0 0;
//   -o-transform: scale(0.5);
//   -o-transform-origin: 0 0;
//   -webkit-transform: scale(0.5);
//   -webkit-transform-origin: 0 0;
// }

var zoomValue = 1;
const wheelScrollHandler = (e) => {
  // console.log(e);
  var smooth = 0.05;
  console.log(zoomValue);
  if (e.ctrlKey) {
    if (e.deltaY < 0) {
      zoomValue += smooth;
    } else {
      zoomValue -= smooth;
    }
    if (zoomValue <= 0) {
      zoomValue = 0.2;
    }

    document.querySelector(".design-outer").style =
      "-moz-transform: scale(" +
      zoomValue +
      ");-o-transform: scale(" +
      zoomValue +
      ");-webkit-transform: scale(" +
      zoomValue +
      ");";
    e.preventDefault();
    return false;
  }
};
window.addEventListener("wheel", wheelScrollHandler, { passive: false });
document.addEventListener("wheel", wheelScrollHandler, { passive: false });

const getCssStyles = (elementOuter, string = "") => {
  var tempString =
    "." + elementOuter.className + "{" + elementOuter.getStyles() + "}";

  elementOuter.childrens.forEach((element) => {
    tempString += getCssStyles(element, string);
  });
  return tempString;
};

function updateDesign(para, designRoot) {
  para.childrens.forEach((element) => {
    var elementDom = document.createElement(element.element);
    if (element.className) {
      elementDom.classList.add(element.className);
    }
    // elementDom.style = element.getStyles();
    elementDom.innerText = element.text || "";
    // elementDom.setAttribute("contenteditable", "true");

    // elementDom.addEventListener("mouseover", hoverHandler);
    // elementDom.addEventListener("input", clickHandle);
    // elementDom.addEventListener("mouseleave", mouseLeaveHandler);

    designRoot.appendChild(elementDom);

    hashMap.setDesignDom(element, elementDom);

    updateDesign(element, elementDom);
  });
}

const refreshDesign = () => {
  body.className = body.className || "designRoot";
  var viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width");

  var StylesDom = document.createElement("style");

  StylesDom.innerText = getCssStyles(body);

  var x = document.getElementById("root");
  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
  iframe.head.innerText = null;
  iframe.head.appendChild(viewport);
  iframe.head.appendChild(StylesDom);
  updateDesign(body, iframe.body);
  iframe.body.classList.add(body.className);
  iframe.addEventListener("wheel", wheelScrollHandler, { passive: false });

  // iframe.body.style = "width: 1920px";
  hashMap.setDesignDom(body, iframe.body);

  // iframe.body.appendChild(designRoot);
};
