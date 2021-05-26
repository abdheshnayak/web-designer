document.getElementById("add-border-button").addEventListener("click", (e) => {
  var el = hashMap.getVirtualElement(hashMap.activeElement);
  console.log(el[hashMap.styleScreen].border);
  const bd_l = ["all", "left", "right", "top", "bottom"];
  if (el[hashMap.styleScreen].border.setBorder) {
    const result = bd_l.filter((item) => {
      if (!el[hashMap.styleScreen].border.border[item].unit) {
        return true;
      }
    });
    if (!result[0]) return;

    var bdr = el[hashMap.styleScreen].border;
    console.log(bdr);
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
  console.log("hello");
  document.getElementById(item.id).addEventListener("click", (e) => {
    var el = hashMap.getVirtualElement(hashMap.activeElement);
    console.log(el[hashMap.styleScreen]);

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
  },
  {
    id: "add-margin-button",
    property_name: "margin",
    bd_l: ["all", "left", "right", "top", "bottom"],
  },
  {
    id: "add-padding-button",
    property_name: "padding",
    bd_l: ["all", "left", "right", "top", "bottom"],
  },
  {
    id: "add-width&height-button",
    property_name: "width_height",
    bd_l: ["width", "height"],
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
          [property_name]: new CssProperty({
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
  console.log("hello");
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
