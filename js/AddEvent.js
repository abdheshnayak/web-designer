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
