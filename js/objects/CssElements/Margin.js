function Margin({ margin } = {}) {
  var that = {
    margin: margin || {
      left: {},
      right: {},
      top: {},
      bottom: {},
      all: {},
    },
  };

  that.setProperty = (prop, value, unit) => {
    that.margin[prop].value = value;
    that.margin[prop].unit = unit;
  };

  that.analyzedString = (value, unit) => {
    if (String(value).isAlphaNumeric()) return value;
    else return value + unit;
  };

  that.getProperty = () => {
    var marginString = "";
    if (that.margin.all.unit) {
      var { value, unit } = that.margin.all;
      marginString = "margin: " + that.analyzedString(value, unit) + ";";
    }

    for (var key in that.margin) {
      if (key == "all") continue;

      let { value, unit } = that.margin[key];

      if (!unit) continue;

      if (marginString) marginString += "\n";

      marginString +=
        "margin-" + key + ": " + that.analyzedString(value, unit) + ";";
    }
    return marginString;
  };
  return that;
}

function MarginBlock({ id, bdObj, margin, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="margin-q block-q" ></div>
      <div class="margin-width text">
        <span contenteditable="true">1</span>
      </div>
      <div class="margin-unit" ></div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".margin-width>span").innerText = margin.value;

  blk.querySelector(".margin-width>span").addEventListener("blur", (e) => {
    margin.value = e.target.innerText.trim();
    refreshDomTree();
  });

  blk
    .querySelector(".margin-width>span")
    .addEventListener("mouseleave", (e) => {
      margin.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete margin.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "margin-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].unit = null;
        break;
      case "margin-unit":
        console.log(tp, value);
        bdObj[tp].unit = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".margin-q"),
    items: [
      { name: "margin", value: "all" },
      { name: "left", value: "left" },
      { name: "right", value: "right" },
      { name: "top", value: "top" },
      { name: "bottom", value: "bottom" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".margin-unit"),
    items: [
      { name: "px", value: "px" },
      { name: "%", value: "%" },
      { name: "rem", value: "rem" },
      { name: "em", value: "em" },
      { name: "vh", value: "vg" },
      { name: "vw", value: "vw" },
      { name: "auto", value: " auto" },
    ],
    selected: margin.unit,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, margin);
}

function MarginElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (margin) => {
    document.getElementById(id).innerHTML = "";

    const bd_l = ["all", "left", "right", "top", "bottom"];
    if (margin.margin)
      bd_l.forEach((bd) => {
        if (margin.margin[bd].unit)
          new MarginBlock({
            id: id,
            bdObj: margin.margin,
            margin: margin.margin[bd],
            tp: bd,
          });
      });
  };

  return that;
}
