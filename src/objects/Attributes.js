function Attributes({ attributes } = {}) {
  var that = {
    attributes: attributes || {
      src: {},
      href: {},
      title: {},
      type: {},
    },
  };
  that.setAttributes = (prop, value) => {
    console.log(that.attributes, that.attributes[prop]);
    that.attributes[prop].value = value;
  };

  that.getAttributes = () => {
    var attributesList = [];

    for (var key in that.attributes) {
      if (that.attributes[key].value)
        attributesList.push({
          attribute: key,
          value: that.attributes[key].value,
        });
    }
    return attributesList;
  };
  return that;
}

function AttributesBlock({ id, bdObj, attributes, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("dynamic-block");
  blk.innerHTML = `<div class="attributes-q block-q" ></div>
    <div class="attributes-value text">
      <span contenteditable="true">1</span>
    </div>
    <div class="block-minus">
      <i class="far fa-minus"></i>
    </div>
  `;

  blk.querySelector(".attributes-value>span").innerText = attributes.value;

  blk.querySelector(".attributes-value>span").addEventListener("blur", (e) => {
    attributes.value = e.target.innerText.trim();
    refreshDomTree();
  });

  blk
    .querySelector(".attributes-value>span")
    .addEventListener("mouseleave", (e) => {
      attributes.value = e.target.innerText.trim();
      refreshDomTree();
    });

  blk.querySelector(".block-minus").addEventListener("click", (e) => {
    delete attributes.value;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    switch (id.classList[0]) {
      case "attributes-q":
        if (tp == value) break;
        bdObj[value] = { ...bdObj[tp] };
        bdObj[tp].value = null;
        break;
    }
    refreshDomTree();
  };

  new DropDown({
    el: blk.querySelector(".attributes-q"),
    items: [
      { name: "title", value: "title" },
      { name: "src", value: "src" },
      { name: "href", value: "href" },
      { name: "type", value: "type" },
    ],
    selected: tp,
    triggerFunc: that.handleDropwond,
  });

  document.getElementById(id).appendChild(blk);
}

function AttributesElement({ id }) {
  var that = this;
  that.id = id;

  that.updateElements = (attributes) => {
    document.getElementById(id).innerHTML = "";

    const bd_l = ["title", "src", "href", "type"];
    if (attributes.attributes)
      bd_l.forEach((bd) => {
        if (attributes.attributes[bd].value != (null || undefined))
          new AttributesBlock({
            id: id,
            bdObj: attributes.attributes,
            attributes: attributes.attributes[bd],
            tp: bd,
          });
      });
  };

  return that;
}
