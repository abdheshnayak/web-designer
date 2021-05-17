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
<<<<<<< HEAD
  var designRoot = document.createElement("div");

  designRoot.style = " width: 1920px";

  var viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width");

  updateDesign(body, designRoot);

  hashMap.setDesignDom(body, designRoot);

=======
  //   hashMap.clearHash();
  // var designRoot =
  designRoot = document.createElement("div");

  designRoot.style = " width: 1920px";

  updateDesign(body, designRoot);

>>>>>>> a35ae61d4f5162cec8c37100a1afb8c423855317
  var x = document.getElementById("root");
  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
<<<<<<< HEAD
  iframe.head.innerText = null;
  iframe.head.appendChild(viewport);
  iframe.body.appendChild(designRoot);
=======
  iframe.body.appendChild(designRoot);

  // iframe.document.open();
  // iframe.document.write(designRoot);
  // iframe.document.close();
>>>>>>> a35ae61d4f5162cec8c37100a1afb8c423855317
};
