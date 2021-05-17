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
  //   hashMap.clearHash();
  // var designRoot =
  designRoot = document.createElement("div");

  designRoot.style = " width: 1920px";

  updateDesign(body, designRoot);

  var x = document.getElementById("root");
  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
  iframe.body.appendChild(designRoot);

  // iframe.document.open();
  // iframe.document.write(designRoot);
  // iframe.document.close();
};
