function DomObject({
  name,
  id,
  className,
  element,
  attributes,
  childrens,
  styles,
  mobileStyle,
  tablet,
  active,
  collapsed,
  text,
} = {}) {
  var that = {
    name: name || "",
    id: id || "",
    className: className || "",
    element: element || "",
    attributes: attributes || {
      title: "",
      data: "",
    },
    childrens: [],
    styles: styles || {},
    mobileStyle: mobileStyle || {},
    tablet: tablet || {},
    active: active || false,
    collapsed: collapsed || true,
    text: text || null,
  };

  if (childrens)
    childrens.forEach((element) => {
      that.childrens.push(new DomObject(element));
    });

  if (that.styles.width) {
    that.styles.width = new Width({ value: styles.width.value });
    // console.log(styles);
  }
  if (that.styles.height) {
    that.styles.height = new Height({ value: styles.height.value });
  }
  // that.parse();
  // if(childrens.length)

  that.setCollapsed = (collapsed) => {
    that.collapsed = collapsed;
  };
  that.setActive = (active) => {
    that.active = active;
  };
  that.init = ({ name, element, className } = {}) => {
    that.className = className || that.className;
    that.name = name || that.name;
    that.element = element || that.element;
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

  that.getName = () => {
    return that.name;
  };

  that.styles.getWidth = () => {
    if (that.styles.width) return that.styles.width.getWidth();
    else return "width: auto;";
  };
  that.styles.getHeight = () => {
    if (that.styles.height) return that.styles.height.getHeight();
    else return "Height: auto;";
  };

  that.getStyles = () => {
    var styleString = "";

    // width
    if (that.styles.width) {
      styleString += that.styles.getWidth();
    }
    if (that.styles.height) {
      styleString += that.styles.getHeight();
    }
    if (that.styles.position) {
      styleString += "position:" + that.styles.position + ";";
    }
    if (that.styles.color) {
      styleString += "color:" + that.styles.color + ";";
    }
    if (that.styles.display) {
      styleString += "display:" + that.styles.display + ";";
    }

    if (that.styles["background-color"]) {
      styleString +=
        "background-color:" + that.styles["background-color"] + ";";
    }

    return styleString;
  };

  return that;
}
