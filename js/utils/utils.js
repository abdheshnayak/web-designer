// *************************************************

const init = () => {
  body.init({ name: "body", element: "div" });

  // console.log(body.styles.height.getHeight());
  // console.log(body.styles.border.getBorderString());
  // console.log(body);

  // sdfsdfsdf

  const img = new DomObject();
  img.init({ name: "image", element: "img" });

  const a = new DomObject();
  a.init({ name: "ancor", element: "a" });
  a.addChildrens([img]);
  a.setActive(true);

  const p = new DomObject();
  p.init({ name: "para", element: "p" });

  const span = new DomObject();
  span.init({ name: "span", element: "span" });

  const span2 = new DomObject();
  span2.init({ name: "span2", element: "span" });

  span.addChildrens([span2]);

  p.addChildrens([span]);
  p.text = "hello";

  body.addChildrens([a, p]);
};

const getParent = (parent, searchElement) => {
  if (parent.childrens.length > 0) {
    if (parent.childrens.indexOf(searchElement) != -1) {
      return parent;
    } else {
      for (var i in parent.childrens) {
        var result = getParent(parent.childrens[i], searchElement);
        if (result) return result;
      }
    }
  }
};

const deleteElement = (element) => {
  var parent = getParent(body, element);

  if (parent) {
    parent.childrens.splice(parent.childrens.indexOf(element), 1);
  }
  refreshDomTree();
};

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

const moveUpDown = (element, upOrDown) => {
  var parent = getParent(body, element);

  if (parent) {
    var index = parent.childrens.indexOf(element);
    if (upOrDown) {
      if (index <= 0) return;
      parent.childrens = array_move(parent.childrens, index, index - 1);
    } else {
      if (index >= parent.childrens.length - 1) return;
      parent.childrens = array_move(parent.childrens, index, index + 1);
    }
    refreshDomTree();
  }
};
