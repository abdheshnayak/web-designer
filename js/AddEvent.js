document.getElementById("add-border-button").addEventListener("click", (e) => {
  var el = hashMap.getVirtualElement(hashMap.activeElement);

  const bd_l = ["all", "left", "right", "top", "bottom"];
  if (el[hashMap.styleScreen].border.setBorder) {
    const result = bd_l.filter((item) => {
      if (!el[hashMap.styleScreen].border.border[item].unit) {
        return true;
      }
    });
    if (!result[0]) return;

    el[hashMap.styleScreen].border.setBorder(
      result[0],
      1,
      "px",
      "solid",
      "red"
    );
  } else {
    el.addStyles({
      styleScreen: hashMap.styleScreen,
      styles: { border: new Border() },
    });
    el[hashMap.styleScreen].border.setBorder("all", 1, "px", "solid", "red");
  }
  refreshDomTree();
});

document
  .getElementById("add-attributes-button")
  .addEventListener("click", (e) => {
    var el = hashMap.getVirtualElement(hashMap.activeElement);

    const bd_l = ["title", "src", "href", "type"];
    if (el.attributes.setAttributes) {
      const result = bd_l.filter((item) => {
        console.log(el.attributes.attributes[item].value);
        if (el.attributes.attributes[item].value == (undefined || null)) {
          return true;
        }
      });

      if (!result[0]) return;

      el.attributes.setAttributes(result[0], "");
    } else {
      el.attributes = new Attributes();
      el.attributes.setAttributes("title", "");
    }
    refreshDomTree();
  });

[
  {
    id: "add-background_color-button",
    objClass: BackgrundColor,
    defVal: "red",
    property: "background_color",
  },
  {
    id: "add-color-button",
    objClass: Color,
    defVal: "black",
    property: "color",
  },
  {
    id: "add-display-button",
    objClass: Display,
    defVal: "block",
    property: "display",
  },
  {
    id: "add-position-button",
    objClass: Position,
    defVal: "relative",
    property: "position",
  },
].forEach((item) => {
  document.getElementById(item.id).addEventListener("click", (e) => {
    var el = hashMap.getVirtualElement(hashMap.activeElement);

    if (el[hashMap.styleScreen][item.property][item.objClass]) {
      if (el[hashMap.styleScreen][item.property][item.property]) return;
      el[hashMap.styleScreen][item.property].setProperty("block");
    } else {
      el.addStyles({
        styleScreen: hashMap.styleScreen,
        styles: { [item.property]: new item.objClass() },
      });
      el[hashMap.styleScreen][item.property].setProperty(item.defVal);
    }
    refreshDomTree();
  });
});

[
  {
    id: "add-absolute_value-button",
    property_name: "absolute_value",
    bd_l: ["left", "right", "top", "bottom"],
    objClass: AbsoluteValue,
  },
  {
    id: "add-margin-button",
    property_name: "margin",
    bd_l: ["all", "left", "right", "top", "bottom"],
    objClass: Margin,
  },
  {
    id: "add-padding-button",
    property_name: "padding",
    bd_l: ["all", "left", "right", "top", "bottom"],
    objClass: Padding,
  },
  {
    id: "add-width&height-button",
    property_name: "width_height",
    bd_l: ["width", "height"],
    objClass: WidthHeight,
  },
].forEach((item) => {
  document.getElementById(item.id).addEventListener("click", (e) => {
    const property_name = item.property_name;
    var el = hashMap.getVirtualElement(hashMap.activeElement);

    const bd_l = item.bd_l;
    if (el[hashMap.styleScreen][property_name].setProperty) {
      const result = bd_l.filter((item) => {
        if (!el[hashMap.styleScreen][property_name][property_name][item].unit) {
          return true;
        }
      });
      if (!result[0]) return;

      var bdr = el[hashMap.styleScreen][property_name];

      el[hashMap.styleScreen][property_name].setProperty(result[0], 1, "px");
    } else {
      el.addStyles({
        styleScreen: hashMap.styleScreen,
        styles: {
          [property_name]: new item.objClass({
            [property_name]: property_name,
          }),
        },
      });
      el[hashMap.styleScreen][property_name].setProperty(bd_l[0], 1, "px");
    }
    refreshDomTree();
  });
});

document.getElementById("css-edit-button").addEventListener("click", (e) => {
  if (hashMap.editingType == "css") {
    localStorage.setItem("editingType", "notcss");
    hashMap.editingType = localStorage.getItem("editingType") || "css";
  } else {
    localStorage.setItem("editingType", "css");
    hashMap.editingType = localStorage.getItem("editingType") || "css";
  }
  refreshDomTree();
});

document
  .getElementById("css-editor-textarea")
  .addEventListener("input", (e) => {
    var element = hashMap.getVirtualElement(hashMap.activeElement);

    element[hashMap.styleScreen].cssOverride = e.target.value;

    refreshDomTree();
  });

document.getElementById("delete-design").addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});
