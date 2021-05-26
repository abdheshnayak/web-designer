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
}
