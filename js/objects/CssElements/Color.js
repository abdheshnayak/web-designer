function Color({ color } = {}) {
  var that = {
    color: color || null,
  };

  that.setProperty = (value) => {
    that.color = value;
  };

  that.getProperty = () => {
    var colorString = "";
    if (that.color) {
      colorString = "color: " + that.color + ";";
    }
    return colorString;
  };
  return that;
}

function ColorBlock({ id, color, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="block-q" >Color</div>
        <div class="color-value text">
          <span contenteditable="true">red</span>
        </div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    console.log("hello");
    color.color = null;
    refreshDomTree();
  });

  blk.querySelector(".color-value>span").innerText = color.color;

  blk.querySelector(".color-value>span").addEventListener("blur", (e) => {
    color.color = e.target.innerText.trim();
    refreshDomTree();
  });

  blk.querySelector(".color-value>span").addEventListener("mouseleave", (e) => {
    color.color = e.target.innerText.trim();
    refreshDomTree();
  });

  document.getElementById(id).appendChild(blk);
  // console.log(id, color);
}

function ColorElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (color) => {
    document.getElementById(id).innerHTML = "";

    if (color.color != null)
      new ColorBlock({
        id: id,
        color: color,
      });
  };

  return that;
}
