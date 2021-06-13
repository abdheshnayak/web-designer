export const getItemIndex = (list, child_id) => {
  for (var i = 0; i < list.childrens.length; i++) {
    if (list.childrens[i]._id === child_id) {
      return i;
    }
  }
  return -1;
};

export const getParent = (parent, searchElement) => {
  if (parent.childrens.length > 0) {
    if (getItemIndex(parent, searchElement) != -1) {
      return parent;
    }
    for (var i in parent.childrens) {
      var result = getParent(parent.childrens[i], searchElement);
      if (result) return result;
    }
  }
};

export const array_move = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};
