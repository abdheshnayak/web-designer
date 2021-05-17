function HashItem({ element, treeDomElement }) {
  var that = {
    element: element,
    treeDomElement: treeDomElement,
    designDom: null,
  };
  that.setDesign = (designDom) => {
    that.designDom = designDom;
  };
  return that;
}
function Hash() {
  var that = {
    hash: [],
    activeElement: null,
  };
  that.clearActive = () => {
    that.hash.forEach((el) => {
      if (that.activeElement == el.treeDomElement) {
        el.element.active = true;
      } else {
        el.element.active = false;
      }
    });
  };
  that.clearHash = () => {
    // console.log("called");
    that.clearActive();
    that.hash = [];
  };
  that.addItem = (element, DomElement) => {
    that.hash.push(
      new HashItem({ element: element, treeDomElement: DomElement })
    );
  };
  that.getDomElement = (element) => {};
  that.getVirtualElement = (element) => {
    var result = that.hash.filter((item, index) => {
      if (item.treeDomElement == element) {
        return true;
      }
    });
    if (result.length > 0) {
      return result[0].element;
    } else return null;
  };

  that.getVirtualElementFromDesign = (element) => {
    var result = that.hash.filter((item, index) => {
      if (item.designDom == element) {
        return true;
      }
    });
    if (result.length > 0) {
      return result[0].element;
    } else return null;
  };

  that.setDesignDom = (element, designDom) => {
    that.hash.forEach((item, index) => {
      if (item.element == element) {
        // console.log("matched");
        that.hash[index].setDesign(designDom);
        return;
      }
    }, that);
  };
  that.getDesignElement = (element) => {
    var result = that.hash.filter((item, index) => {
      if (item.treeDomElement == element) {
        return true;
      }
    });
    if (result.length > 0) {
      return result[0].designDom;
    } else return null;
  };
  return that;
}
