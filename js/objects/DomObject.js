function DomObject({
  name,
  id,
  className,
  element,
  attributes,
  childrens,
  styles,
  mobileStyles,
  tabletStyles,
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
    mobileStyles: mobileStyles || {},
    tabletStyles: tabletStyles || {},
    active: active || false,
    collapsed: collapsed || true,
    text: text || null,
  };

  if (childrens)
    childrens.forEach((element) => {
      that.childrens.push(new DomObject(element));
    });

  [{ styles }, { mobileStyles }, { tabletStyles }].forEach((style) => {
    console.log(style);
    var key = Object.keys(style)[0];
    if (that[key].width) {
      that[key].width = new Width({
        value: style[key].width.value,
        unit: style[key].width.unit,
      });
      // console.log(styles);
    }
    if (that[key].height) {
      that[key].height = new Height({
        value: style[key].height.value,
        unit: style[key].height.unit,
      });
    }
  });

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
  that.addStyles = that.changeStyles = ({ styleScreen, styles }) => {
    that[styleScreen] = {
      ...that[styleScreen],
      ...styles,
    };
  };

  that.getName = () => {
    return that.name;
  };

  that.getStyles = ({ styleScreen = "styles" } = {}) => {
    console.log(styleScreen);
    var styleString = "";

    // width
    if (that[styleScreen].width) {
      console.log(that[styleScreen].width);
      styleString += that[styleScreen].width.getWidth();
    }
    if (that[styleScreen].height) {
      styleString += that[styleScreen].height.getHeight();
    }
    if (that[styleScreen].position) {
      styleString += "position:" + that[styleScreen].position + ";";
    }
    if (that[styleScreen].color) {
      styleString += "color:" + that[styleScreen].color + ";";
    }
    if (that[styleScreen].display) {
      styleString += "display:" + that[styleScreen].display + ";";
    }

    if (that[styleScreen]["background-color"]) {
      styleString +=
        "background-color:" + that[styleScreen]["background-color"] + ";";
    }
    if (that[styleScreen].margin) {
      styleString += "margin:" + that[styleScreen].margin + ";";
    }
    if (that[styleScreen].padding) {
      styleString += "padding:" + that[styleScreen].padding + ";";
    }

    return styleString;
  };

  return that;
}
