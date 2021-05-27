var body;
const hashMap = Hash();

const init = () => {
  hashMap.styleScreen = "styles";
  var savedObject = localStorage.getItem("savedDesign") || null;
  hashMap.editingType = localStorage.getItem("editingType") || "css";

  if (savedObject) {
    savedObject = JSON.parse(savedObject);
    body = new DomObject(savedObject);
  } else {
    body = new DomObject();
  }
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
  hashMap.activeElement = null;

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

const findElementWithName = (element, name) => {};

const isNameReserved = (name) => {};

String.prototype.isAlphaNumeric = function () {
  var regExp = /^[A-Za-z]+$/;
  return this.match(regExp);
};
