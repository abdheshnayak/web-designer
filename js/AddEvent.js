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

document.getElementById("add-margin-button").addEventListener("click", (e) => {
  var el = hashMap.getVirtualElement(hashMap.activeElement);
  console.log(el[hashMap.styleScreen].margin);
  const bd_l = ["all", "left", "right", "top", "bottom"];
  if (el[hashMap.styleScreen].margin.setMargin) {
    const result = bd_l.filter((item) => {
      if (!el[hashMap.styleScreen].margin.margin[item].unit) {
        return true;
      }
    });
    if (!result[0]) return;

    var bdr = el[hashMap.styleScreen].margin;

    el[hashMap.styleScreen].margin.setMargin(result[0], 1, "px");
  } else {
    el.addStyles({
      styleScreen: hashMap.styleScreen,
      styles: { margin: new Margin() },
    });
    el[hashMap.styleScreen].margin.setMargin("all", 1, "px");
  }
  refreshDomTree();
});

document.getElementById("add-padding-button").addEventListener("click", (e) => {
  var el = hashMap.getVirtualElement(hashMap.activeElement);
  console.log(el[hashMap.styleScreen].padding);
  const bd_l = ["all", "left", "right", "top", "bottom"];
  if (el[hashMap.styleScreen].padding.setPadding) {
    const result = bd_l.filter((item) => {
      if (!el[hashMap.styleScreen].padding.padding[item].unit) {
        return true;
      }
    });
    if (!result[0]) return;

    var bdr = el[hashMap.styleScreen].padding;

    el[hashMap.styleScreen].padding.setPadding(result[0], 1, "px");
  } else {
    el.addStyles({
      styleScreen: hashMap.styleScreen,
      styles: { padding: new Padding() },
    });
    el[hashMap.styleScreen].padding.setPadding("all", 1, "px");
  }
  refreshDomTree();
});
