const handleToolbarElementClick = (e) => {
  var element;
  if (e.target.tagName == "I" || e.target.tagName == "SPAN") {
    element = e.target.parentElement;
  } else if (e.target.classList.contains("element")) {
    element = e.target;
  }
  var tag = element.querySelector("span").innerText;

  var virtElement = hashMap.getVirtualElement(hashMap.activeElement);

  var child = new DomObject();
  child.init({ element: tag.toLowerCase() });

  virtElement.addChildrens([child]);
  virtElement.setCollapsed(false);
  refreshDomTree();
};
const addEventToElementInserter = () => {
  var elements = document.querySelectorAll(".elements-list-block .element");
  elements.forEach((element) => {
    element.addEventListener("click", handleToolbarElementClick);
    // console.log(element);
  });
};
addEventToElementInserter();
