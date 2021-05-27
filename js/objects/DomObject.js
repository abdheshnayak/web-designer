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
    attributes: attributes || {},
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

  // margin
  if (that.attributes.attributes) {
    that.attributes = new Attributes({
      attributes: that.attributes.attributes,
    });
  } else {
    that.attributes = new Attributes();
  }

  [{ styles }, { mobileStyles }, { tabletStyles }].forEach((style) => {
    var key = Object.keys(style)[0];

    // Border
    if (that[key].border) {
      that[key].border = new Border({
        border: style[key].border.border,
      });
    } else {
      that[key].border = new Border();
    }

    [
      { objClass: Display, property: "display" },
      { objClass: Position, property: "position" },
      { objClass: BackgrundColor, property: "background_color" },
      { objClass: Color, property: "color" },
    ].forEach((item) => {
      if (that[key][item.property]) {
        that[key][item.property] = new item.objClass({
          [item.property]: style[key][item.property][item.property],
        });
      } else {
        that[key][item.property] = new item.objClass();
      }
    });

    // width & height

    if (that[key].width_height) {
      that[key].width_height = new WidthHeight({
        width_height: style[key].width_height.width_height,
      });
    } else {
      that[key].width_height = new WidthHeight();
    }

    // margin
    if (that[key].margin) {
      that[key].margin = new Margin({
        margin: style[key].margin.margin,
      });
    } else {
      that[key].margin = new Margin();
    }

    // Padding
    if (that[key].padding) {
      that[key].padding = new Padding({
        padding: style[key].padding.padding,
      });
    } else {
      that[key].padding = new Padding();
    }

    // Absolute Value
    if (that[key].absolute_value) {
      that[key].absolute_value = new AbsoluteValue({
        absolute_value: style[key].absolute_value.absolute_value,
      });
    } else {
      that[key].absolute_value = new AbsoluteValue();
    }

    //width & height
  });

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
    // console.log(styleScreen);
    var styleString = "";

    [
      "border",
      "position",
      "color",
      "background_color",
      "display",
      "margin",
      "padding",
      "width_height",
      "absolute_value",
    ].forEach((property_name) => {
      if (that[styleScreen][property_name]) {
        styleString += that[styleScreen][property_name].getProperty();
      }
    });

    styleString += that[styleScreen].cssOverride || "";

    return styleString;
  };

  return that;
}
