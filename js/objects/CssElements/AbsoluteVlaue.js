function AbsoluteValue({ absolute_value } = {}) {
  var that = {
    absolute_value: absolute_value || {
      left: {},
      right: {},
      top: {},
      bottom: {},
      all: {},
    },
  };

  that.setProperty = (prop, value, unit) => {
    that.absolute_value[prop].value = value;
    that.absolute_value[prop].unit = unit;
  };

  that.analyzedString = (value, unit) => {
    if (String(value).isAlphaNumeric()) return value;
    else return value + unit;
  };

  that.getProperty = () => {
    var absolute_valueString = "";

    for (var key in that.absolute_value) {
      let { value, unit } = that.absolute_value[key];

      if (!unit) continue;

      if (absolute_valueString) absolute_valueString += "\n";

      absolute_valueString +=
        "absolute_value-" + key + ": " + that.analyzedString(value, unit) + ";";
    }
    return absolute_valueString;
  };
  return that;
}

function AbsoluteValueBlock({ id, bdObj, absolute_value, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="absolute_value-q block-q" ></div>
      <div class="absolute_value-width text">
        <span contenteditable="true">1</span>
      </div>
      <div class="absolute_value-unit" ></div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".absolute_value-width>span").innerText =
    absolute_value.value;

  blk
    .querySelector(".absolute_value-width>span")
    .addEventListener("blur", (e) => {
      absolute_value.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk
    .querySelector(".absolute_value-width>span")
    .addEventListener("mouseleave", (e) => {
      absolute_value.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete absolute_value.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "absolute_value-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].unit = null;
        break;
      case "absolute_value-unit":
        console.log(tp, value);
        bdObj[tp].unit = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".absolute_value-q"),
    items: [
      { name: "absolute_value", value: "all" },
      { name: "left", value: "left" },
      { name: "right", value: "right" },
      { name: "top", value: "top" },
      { name: "bottom", value: "bottom" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".absolute_value-unit"),
    items: [
      { name: "px", value: "px" },
      { name: "%", value: "%" },
      { name: "rem", value: "rem" },
      { name: "em", value: "em" },
      { name: "vh", value: "vg" },
      { name: "vw", value: "vw" },
      { name: "auto", value: " auto" },
    ],
    selected: absolute_value.unit,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, absolute_value);
}

function AbsoluteValueElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (absolute_value) => {
    document.getElementById(id).innerHTML = "";

    const bd_l = ["left", "right", "top", "bottom"];
    if (absolute_value.absolute_value)
      bd_l.forEach((bd) => {
        if (absolute_value.absolute_value[bd].unit)
          new AbsoluteValueBlock({
            id: id,
            bdObj: absolute_value.absolute_value,
            absolute_value: absolute_value.absolute_value[bd],
            tp: bd,
          });
      });
  };

  return that;
}
