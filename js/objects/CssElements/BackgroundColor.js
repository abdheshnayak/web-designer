function BackgrundColor({ background_color } = {}) {
  var that = {
    background_color: background_color || null,
  };

  that.setProperty = (value) => {
    that.background_color = value;
  };

  that.getProperty = () => {
    var background_colorString = "";
    if (that.background_color) {
      background_colorString =
        "background-color: " + that.background_color + ";";
    }
    return background_colorString;
  };
  return that;
}

function BackgrundColorBlock({ id, background_color, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="block-q" >BackgrundColor</div>
        <div class="background_color-value text">
          <span contenteditable="true">red</span>
        </div>
      <div class="block-minus">
        <i class="far fa-minus"></i>
      </div>
    `;

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    console.log("hello");
    background_color.background_color = null;
    refreshDomTree();
  });

  blk.querySelector(".background_color-value>span").innerText =
    background_color.background_color;

  blk
    .querySelector(".background_color-value>span")
    .addEventListener("blur", (e) => {
      background_color.background_color = e.target.innerText.trim();
      refreshDomTree();
    });

  blk
    .querySelector(".background_color-value>span")
    .addEventListener("mouseleave", (e) => {
      background_color.background_color = e.target.innerText.trim();
      refreshDomTree();
    });

  document.getElementById(id).appendChild(blk);
  // console.log(id, background_color);
}

function BackgrundColorElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (background_color) => {
    document.getElementById(id).innerHTML = "";

    if (background_color.background_color != null)
      new BackgrundColorBlock({
        id: id,
        background_color: background_color,
      });
  };

  return that;
}
