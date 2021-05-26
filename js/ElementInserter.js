function generateClassName(length) {
  var result = [];
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

const handleToolbarElementClick = (e) => {
  var element;
  if (e.target.tagName == "I" || e.target.tagName == "SPAN") {
    element = e.target.parentElement;
  } else if (e.target.classList.contains("element")) {
    element = e.target;
  }
  var tag = element.querySelector("span").innerText;

  var virtElement = hashMap.getVirtualElement(hashMap.activeElement);

  var child = new DomObject({});
  // child.addStyles({
  //   styleScreen: hashMap.styleScreen,
  //   styles: { newLogic: new Styles() },
  // });

  let randClass = generateClassName(8);

  child.init({ element: tag.toLowerCase(), className: randClass });

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
