function WidthHeight({ width_height } = {}) {
  var that = {
    width_height: width_height || {
      width: {},
      height: {},
    },
  };

  that.setProperty = (prop, value, unit) => {
    that.width_height[prop].value = value;
    that.width_height[prop].unit = unit;
  };

  that.analyzedString = (value, unit) => {
    return value + unit;
  };

  that.getProperty = () => {
    var width_height_string = "";

    for (var key in that.width_height) {
      let { value, unit } = that.width_height[key];

      if (!unit) continue;

      if (width_height_string) width_height_string += "\n";

      width_height_string +=
        key + ": " + that.analyzedString(value, unit) + ";";
    }
    return width_height_string;
  };
  return that;
}

function WidthHeightBlock({ id, bdObj, width_height, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="width_height-q block-q" ></div>
        <div class="width_height-width text">
          <span contenteditable="true">1</span>
        </div>
        <div class="width_height-unit" ></div>
        <div class="block-minus">
          <i class="far fa-minus"></i>
        </div>
      `;

  blk.querySelector(".width_height-width>span").innerText = width_height.value;

  blk
    .querySelector(".width_height-width>span")
    .addEventListener("blur", (e) => {
      width_height.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk
    .querySelector(".width_height-width>span")
    .addEventListener("mouseleave", (e) => {
      width_height.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete width_height.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "width_height-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].unit = null;
        break;
      case "width_height-unit":
        console.log(tp, value);
        bdObj[tp].unit = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".width_height-q"),
    items: [
      { name: "width", value: "width" },
      { name: "height", value: "height" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  new DropDown({
    el: blk.querySelector(".width_height-unit"),
    items: [
      { name: "px", value: "px" },
      { name: "%", value: "%" },
      { name: "rem", value: "rem" },
      { name: "em", value: "em" },
      { name: "vh", value: "vh" },
      { name: "vw", value: "vw" },
      { name: "none", value: ";" },
    ],
    selected: width_height.unit,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, width_height);
}

function WidthHeightElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (width_height) => {
    document.getElementById(id).innerHTML = "";

    const bd_l = ["width", "height"];
    if (width_height.width_height)
      bd_l.forEach((bd) => {
        if (width_height.width_height[bd].unit)
          new WidthHeightBlock({
            id: id,
            bdObj: width_height.width_height,
            width_height: width_height.width_height[bd],
            tp: bd,
          });
      });
  };

  return that;
}
