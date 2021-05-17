function DomObject() {
  var that = {
    name: "",
    id: "",
    className: "",
    element: "",
    attributes: {
      title: "",
      data: "",
    },
    childrens: [],
    styles: {},
    mobileStyle: {},
    tablet: {},
    active: false,
    collapsed: true,
  };

  that.setCollapsed = (collapsed) => {
    that.collapsed = collapsed;
  };
  that.setActive = (active) => {
    that.active = active;
  };
  that.init = ({ name, element }) => {
    that.name = name || null;
    that.element = element;
  };

  that.setTreeDom = (element) => {
    that.treeDom = element;
  };

  that.setElement = (element) => {
    that.element = element;
  };
  that.setName = (name) => {
    that.name = name;
  };
  that.setId = (id) => {
    that.id = id;
  };
  that.setClass = (className) => {
    that.className = className;
  };
  that.setAttributes = (attributes) => {
    that.attributes = attributes;
  };
  that.addAttributes = (attributes) => {
    that.attributes = {
      ...that.attributes,
      ...attributes,
    };
  };
  that.removeAttribute = (attribute) => {
    delete that.attributes[attribute];
  };
  that.setChildrens = (childrens) => {
    that.childrens = childrens;
  };
  that.addChildren = (children) => {
    that.childrens.push(children);
  };
  that.addChildrens = (childrens) => {
    childrens.forEach((children) => {
      that.childrens.push(children);
    });
  };
  that.addStyles = that.changeStyles = (styles) => {
    that.styles = {
      ...that.styles,
      ...styles,
    };
  };

  that.styles.getWidth = () => {
    if (that.styles.width) return that.styles.width.getWidth();
    else return "width: auto;";
  };
  that.styles.getHeight = () => {
    if (that.styles.height) return that.styles.height.getHeight();
    else return "Height: auto;";
  };

  return that;
}
