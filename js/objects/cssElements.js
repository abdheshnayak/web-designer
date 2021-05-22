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
