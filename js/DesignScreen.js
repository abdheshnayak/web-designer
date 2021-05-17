function updateDesign(para, designRoot) {
  para.childrens.forEach((element) => {
    var elementDom = document.createElement(element.element);
    if (element.className) {
      elementDom.classList.add(element.className);
    }
    elementDom.style = element.getStyles();
    elementDom.innerText = element.text || "";

    designRoot.appendChild(elementDom);

    hashMap.setDesignDom(element, elementDom);

    updateDesign(element, elementDom);
  });
}

const refreshDesign = () => {
  var designRoot = document.createElement("div");

  designRoot.style = " width: 1920px";

  var viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width");

  updateDesign(body, designRoot);

  hashMap.setDesignDom(body, designRoot);

  var x = document.getElementById("root");
  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
  iframe.head.innerText = null;
  iframe.head.appendChild(viewport);
  iframe.body.appendChild(designRoot);
};
