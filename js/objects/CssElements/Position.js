function Position({ position } = {}) {
  var that = {
    position: position || null,
  };

  that.setProperty = (value) => {
    that.position = value;
  };

  that.getProperty = () => {
    var positionString = "";
    if (that.position) {
      positionString = "position: " + that.position + ";";
    }
    return positionString;
  };
  return that;
}

function PositionBlock({ id, bdObj, position, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="block-q" >Position</div>
      <div class="position-value" ></div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    position.position = null;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    console.log(id, value);
    switch (id.classList[0]) {
      case "position-value":
        console.log(position);
        position.position = value;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".position-value"),
    items: [
      { name: "absolute", value: "absolute" },
      { name: "relative", value: "relative" },
      { name: "fixed", value: "fixed" },
      { name: "static", value: "static" },
    ],
    selected: position.position,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, position);
}

function PositionElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (position) => {
    document.getElementById(id).innerHTML = "";

    if (position.position)
      new PositionBlock({
        id: id,
        position: position,
      });
  };

  return that;
}
