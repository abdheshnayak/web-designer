const propertyIndex = {
  width_height: {
    value: { width: {}, height: {} },
    prefix: null,
  },
  margin: {
    value: {
      all: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
    },
    prefix: "margin",
  },
  padding: {
    value: {
      all: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
    },
    prefix: "padding",
  },
  absolute_value: {
    value: {
      left: {},
      right: {},
      top: {},
      bottom: {},
    },
    prefix: null,
  },
};

function CssProperty({ property_name, property } = {}) {
  var that = {
    [property_name]: property || propertyIndex[property_name].value,
  };

  that.setProperty = (prop, value, unit) => {
    that[property_name][prop].value = value;
    that[property_name][prop].unit = unit;
  };

  that.analyzedString = (value, unit) => {
    return value + unit;
  };

  that.getProperty = () => {
    var property_string = "";

    if (propertyIndex[property_name].prefix) {
      if (that[property_name].all.unit) {
        var { value, unit } = that[property_name].all;
        property_string +=
          propertyIndex[property_name].prefix +
          ": " +
          that.analyzedString(value, unit) +
          ";";
      }
    }

    for (var key in that[property_name]) {
      if (propertyIndex[property_name].prefix) {
        if (key == "all") continue;
      }

      let { value, unit } = that[property_name][key];

      if (!unit) continue;

      if (property_string) property_string += "\n";

      // console.log(property_string, property_name);

      if (propertyIndex[property_name].prefix) {
        property_string +=
          propertyIndex[property_name].prefix +
          "-" +
          key +
          ": " +
          that.analyzedString(value, unit) +
          ";";
      } else {
        property_string += key + ": " + that.analyzedString(value, unit) + ";";
      }
    }
    // console.log(property_string);
    return property_string;
  };

  return that;
}
