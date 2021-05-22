function BorderBlock({ id, bdObj, border, tp }) {
  const blk = document.createElement("div");
  blk.classList.add("border-block");
  blk.innerHTML = `<div class="border-q" ></div>
  <div class="border-width">
    <span contenteditable="true">1</span>
  </div>
  <div class="border-unit" ></div>
  <div class="border-type" ></div>
  <div class="border-color">
    <span
    class="border-color"
      contenteditable="true"
      style="display: flex; flex-wrap: nowrap"
    >
      black
    </span>
  </div>
  <div class="border-minus">
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

  blk.querySelector(".border-minus").addEventListener("click", (e) => {
    delete border.unit;
    refreshDomTree();
  });

  var that = this;

  that.handleDropwond = ({ id, value }) => {
    // bdObj[value] =
    console.log(id, value);
    switch (id.classList[0]) {
      case "border-q":
        bdObj[value].width = bdObj[tp].width;
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

function DropDown({ el, items, selected, triggerFunc } = {}) {
  var that = this;

  that.items = items;
  that.selected = selected;
  that.hidden = false;
  that.Container = el;
  that.Container.innerHTML = "";

  that.showingString = document.createElement("span");
  that.showingString.innerText = items[0].name;
  that.showingString.classList.add("show-text-lkjd");

  that.Container.addEventListener(
    "click",
    (e) => {
      if (that.hidden) {
        that.hidden = false;
      } else {
        that.addOptions();
      }
    },
    that
  );

  that.DropDownOuter = document.createElement("div");
  that.DropDownOuter.classList.add("custom-dropdown");

  that.getValueName = (value) => {
    var result = that.items.filter((item) => {
      if (item.value == value) return item;
    });
    if (result.length > 0) {
      return result[0].name;
    } else {
      return items[0].name;
    }
  };

  that.Container.appendChild(that.showingString);

  that.addOptions = () => {
    that.DropDownOuter.innerHTML = "";
    that.items.forEach((element) => {
      var dropdownItemOuter = document.createElement("div");
      dropdownItemOuter.setAttribute("value", element.value);

      // console.log(selected, element.value);
      if (that.selected == element.value) {
        dropdownItemOuter.classList.add("active");
      }

      var IconOuer = document.createElement("div");

      var checkIcon = document.createElement("i");
      checkIcon.classList.add("far", "fa-check");

      IconOuer.appendChild(checkIcon);
      dropdownItemOuter.appendChild(IconOuer);

      var dropDownIconText = document.createElement("span");
      dropDownIconText.innerText = element.name;

      dropdownItemOuter.addEventListener("click", (e) => {
        that.selected = dropdownItemOuter.getAttribute("value");
        that.showingString.innerText = that.getValueName(
          dropdownItemOuter.getAttribute("value")
        );
        // that.updateHiddenStatus();
        triggerFunc({
          id: that.Container,
          value: dropdownItemOuter.getAttribute("value"),
        });

        that.hidden = true;
        that.Container.removeChild(that.DropDownOuter);
      });

      dropdownItemOuter.appendChild(dropDownIconText);
      that.DropDownOuter.appendChild(dropdownItemOuter);
    });
    that.Container.appendChild(that.DropDownOuter);
  };

  that.showingString.innerText = that.getValueName(that.selected);

  // that.addOptions();
  //   <span>left</span>
  //   <div class="border-q-dropdown hide">
  //     <div>
  //       <div>
  //         <i class="far fa-check"></i>
  //       </div>
  //       <span>all</span>
  //     </div>
  //     </div>
}
