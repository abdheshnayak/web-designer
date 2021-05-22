function Padding({ padding } = {}) {
  var that = {
    padding: padding || {
      left: {},
      right: {},
      top: {},
      bottom: {},
      all: {},
    },
  };

  that.setPadding = (prop, value, unit) => {
    that.padding[prop].value = value;
    that.padding[prop].unit = unit;
  };

  that.analyzedString = (value, unit) => {
    if (String(value).isAlphaNumeric()) return value;
    else return value + unit;
  };

  that.getPaddingString = () => {
    var paddingString = "";
    if (that.padding.all.unit) {
      var { value, unit } = that.padding.all;
      paddingString = "padding: " + that.analyzedString(value, unit) + ";";
    }

    for (var key in that.padding) {
      if (key == "all") continue;

      let { value, unit } = that.padding[key];

      if (!unit) continue;

      if (paddingString) paddingString += "\n";

      paddingString +=
        "padding-" + key + ": " + that.analyzedString(value, unit) + ";";
    }
    return paddingString;
  };
  return that;
}

function PaddingBlock({ id, bdObj, padding, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="padding-q block-q" ></div>
      <div class="padding-width text">
        <span contenteditable="true">1</span>
      </div>
      <div class="padding-unit" ></div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".padding-width>span").innerText = padding.value;

  blk.querySelector(".padding-width>span").addEventListener("blur", (e) => {
    padding.value = e.target.innerText.trim();
    refreshDomTree();
  });

  blk
    .querySelector(".padding-width>span")
    .addEventListener("mouseleave", (e) => {
      padding.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete padding.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "padding-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].unit = null;
        break;
      case "padding-unit":
        console.log(tp, value);
        bdObj[tp].unit = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".padding-q"),
    items: [
      { name: "padding", value: "all" },
      { name: "left", value: "left" },
      { name: "right", value: "right" },
      { name: "top", value: "top" },
      { name: "bottom", value: "bottom" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".padding-unit"),
    items: [
      { name: "px", value: "px" },
      { name: "%", value: "%" },
      { name: "rem", value: "rem" },
      { name: "em", value: "em" },
      { name: "vh", value: "vg" },
      { name: "vw", value: "vw" },
      { name: " auto", value: "auto" },
    ],
    selected: padding.unit,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, padding);
}

function PaddingElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (padding) => {
    document.getElementById(id).innerHTML = "";
    console.log(padding);

    const bd_l = ["all", "left", "right", "top", "bottom"];
    if (padding.padding)
      bd_l.forEach((bd) => {
        if (padding.padding[bd].unit)
          new PaddingBlock({
            id: id,
            bdObj: padding.padding,
            padding: padding.padding[bd],
            tp: bd,
          });
      });
  };

  return that;
}
