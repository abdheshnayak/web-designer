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
    // console.log(style);
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

    ["margin", "padding", "width_height", "absolute_value"].forEach(
      (property_name) => {
        if (that[key][property_name]) {
          that[key][property_name] = new CssProperty({
            property_name: property_name,
            property: style[key][property_name][property_name],
          });
        } else {
          that[key][property_name] = new CssProperty({
            property_name: property_name,
          });
        }
      }
    );
    //width & height
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

    return styleString;
  };

  return that;
}
