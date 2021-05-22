function Margin({ margin } = {}) {
  var that = {};
}
function Border({ border } = {}) {
  var that = {
    border: border || {
      left: {},
      right: {},
      top: {},
      bottom: {},
      all: {},
    },
  };
  that.setBorder = (prop, width, unit, style, color) => {
    that.border[prop].width = width;
    that.border[prop].unit = unit;
    that.border[prop].style = style;
    that.border[prop].color = color;
  };
  that.getBorderObject = () => {
    return that.border;
  };
  that.getBorderString = () => {
    var borderString = "";

    if (that.border.all.unit) {
      let { width, unit, style, color } = that.border.all;
      borderString =
        "border: " + width + unit + " " + style + " " + color + ";";
    }

    for (var key in that.border) {
      if (key == "all") continue;

      let { width, unit, style, color } = that.border[key];

      if (!unit) continue;

      if (borderString) borderString += "\n";

      borderString +=
        "border-" + key + ": " + width + unit + " " + style + " " + color + ";";
    }
    return borderString;
  };
  return that;
}

function Width({ value, unit } = {}) {
  var that = {
    unit: unit || "px",
    value: value || "auto",
  };
  that.setWidth = (value, unit) => {
    that.unit = unit;
    that.value = value;
  };
  that.getWidth = () => {
    if (String(that.value).isAlphaNumeric())
      return "width: " + that.value + ";";
    return "width: " + that.value + that.unit + ";";
  };
  return that;
}

function Height({ value, unit } = {}) {
  var that = {
    unit: unit || "px",
    value: value || "auto",
  };
  that.setHeight = (value, unit) => {
    that.unit = unit;
    that.value = value;
  };
  that.getHeight = () => {
    if (String(that.value).isAlphaNumeric())
      return "height: " + that.value + ";";
    return "height: " + that.value + that.unit + ";";
  };
  return that;
}

String.prototype.isAlphaNumeric = function () {
  var regExp = /^[A-Za-z]+$/;
  return this.match(regExp);
};
