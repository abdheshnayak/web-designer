// body
function init(para, resutlElement) {
  para.childrens.forEach((element) => {
    resutlElement += init(element, element.name);
  });
  return resutlElement;
}

var string = init(body, "");
// console.log("end", string);

// sfsd
// sdfsd
// sdfsf
// body

function init2(para, resutlElement) {
  para.childrens.forEach((element) => {
    // console.log(resutlElement);

    var el = document.createElement(element.element);
    // console.log(el);

    // console.log(init2(element, el));

    resutlElement.appendChild(init2(element, el));

    // console.log(resutlElement);
  });
  return resutlElement;
}
var bodyobj = document.createElement("div");
// console.log(typeof bodyobj);
var domobj = init2(body, bodyobj);
