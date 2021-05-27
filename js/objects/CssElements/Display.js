function Display({ display } = {}) {
  var that = {
    display: display || null,
  };

  that.setProperty = (value) => {
    that.display = value;
  };

  that.getProperty = () => {
    var displayString = "";
    if (that.display) {
      displayString = "display: " + that.display + ";";
    }
    return displayString;
  };
  return that;
}

function DisplayBlock({ id, display, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="block-q" >Display</div>
      <div class="display-value" ></div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    console.log("hello");
    display.display = null;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    console.log(id, value);
    switch (id.classList[0]) {
      case "display-value":
        console.log(display);
        display.display = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".display-value"),
    items: [
      { name: "block", value: "block" },
      { name: "inline", value: "inline" },
      { name: "inline-block", value: "inline-block" },
      { name: "flex", value: "flex" },
      { name: "grid", value: "grid" },
      { name: "table", value: "table" },
    ],
    selected: display.display,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
}

function DisplayElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (display) => {
    document.getElementById(id).innerHTML = "";

    if (display.display)
      new DisplayBlock({
        id: id,
        display: display,
      });
  };

  return that;
}
