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
  var designRoot = document.createElement("div");

  body.className = body.className || "designRoot";

  designRoot.classList.add(body.className);

  designRoot.style = " width: 1920px";

  var viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width");

  var StylesDom = document.createElement("style");

  StylesDom.innerText = getCssStyles(body);

  updateDesign(body, designRoot);

  hashMap.setDesignDom(body, designRoot);

  var x = document.getElementById("root");
  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
  iframe.head.innerText = null;
  iframe.head.appendChild(viewport);
  iframe.head.appendChild(StylesDom);
  iframe.body.appendChild(designRoot);
};
