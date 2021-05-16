function updateDesign(para, designRoot) {
  para.childrens.forEach((element) => {
    var elementDom = document.createElement(element.element);
    if (element.className) {
      elementDom.classList.add(element.className);
    }
    elementDom.style = "width:5rem;" + "height:5rem;";

    designRoot.appendChild(elementDom);

    hashMap.setDesignDom(element, elementDom);

    updateDesign(element, elementDom);
  });
}

const refreshDesign = () => {
  //   hashMap.clearHash();
  var designRoot = document.getElementById("root");
  designRoot.innerHTML = "";
  updateDesign(body, designRoot);
};
