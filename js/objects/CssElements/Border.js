function Border({ border } = {}) {
  var that = {
    border: border || {
      left: {},
      right: {},
      top: {},
      bottom: {},
      all: {},
    },
  };
  that.setBorder = (prop, width, unit, style, color) => {
    that.border[prop].width = width;
    that.border[prop].unit = unit;
    that.border[prop].style = style;
    that.border[prop].color = color;
  };
  that.getBorderObject = () => {
    return that.border;
  };
  that.getBorderString = () => {
    var borderString = "";

    if (that.border.all.unit) {
      let { width, unit, style, color } = that.border.all;
      borderString =
        "border: " + width + unit + " " + style + " " + color + ";";
    }

    for (var key in that.border) {
      if (key == "all") continue;

      let { width, unit, style, color } = that.border[key];

      if (!unit) continue;

      if (borderString) borderString += "\n";

      borderString +=
        "border-" + key + ": " + width + unit + " " + style + " " + color + ";";
    }
    return borderString;
  };
  return that;
}

function BorderBlock({ id, bdObj, border, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="border-q block-q" ></div>
    <div class="border-width text">
      <span contenteditable="true">1</span>
    </div>
    <div class="border-unit" ></div>
    <div class="border-type" ></div>
    <div class="border-color text">
      <span
      class="border-color"
        contenteditable="true"
        style="display: flex; flex-wrap: nowrap"
      >
        black
      </span>
    </div>
    <div class="block-minus">
      <i class="far fa-minus"></i>
    </div>
  `;

  blk.querySelector(".border-color>span").innerText = border.color;
  blk.querySelector(".border-width>span").innerText = border.width;

  blk.querySelector(".border-width>span").addEventListener("blur", (e) => {
    border.width = e.target.innerText.trim();
    refreshDomTree();
  });

  blk
    .querySelector(".border-width>span")
    .addEventListener("mouseleave", (e) => {
      border.width = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".border-color>span").addEventListener("blur", (e) => {
    border.color = e.target.innerText.trim();
    refreshDomTree();
  });

  blk
    .querySelector(".border-color>span")
    .addEventListener("mouseleave", (e) => {
      border.color = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete border.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "border-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].unit = null;
        break;
      case "border-unit":
        console.log(tp, value);
        bdObj[tp].unit = value;
        break;
      case "border-type":
        bdObj[tp].style = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".border-q"),
    items: [
      { name: "border", value: "all" },
      { name: "left", value: "left" },
      { name: "right", value: "right" },
      { name: "top", value: "top" },
      { name: "bottom", value: "bottom" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".border-unit"),
    items: [
      { name: "px", value: "px" },
      { name: "%", value: "%" },
      { name: "rem", value: "rem" },
      { name: "em", value: "em" },
      { name: "vh", value: "vg" },
      { name: "vw", value: "vw" },
    ],
    selected: border.unit,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".border-type"),
    items: [
      { name: "solid", value: "solid" },
      { name: "dotted", value: "dotted" },
      { name: "dashed", value: "dashed" },
      { name: "double", value: "double" },
      { name: "groove", value: "groove" },
      { name: "ridge", value: "ridge" },
      { name: "inset", value: "inset" },
      { name: "outset", value: "outset" },
      { name: "hidden", value: "hidden" },
    ],
    selected: border.style,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, border);
}

function BorderElement({ id, borderStyle }) {
  var that = this;
  that.id = id;

  that.updateElements = (border, styleScreen) => {
    document.getElementById(id).innerHTML = "";

    const bd_l = ["all", "left", "right", "top", "bottom"];
    if (border.border)
      bd_l.forEach((bd) => {
        if (border.border[bd].unit)
          new BorderBlock({
            id: id,
            bdObj: border.border,
            border: border.border[bd],
            tp: bd,
          });
      });
  };

  return that;
}
