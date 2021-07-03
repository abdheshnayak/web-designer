import React from "react";
import ReactDom from "react-dom";
import "./Spinner.scss";
var count = 0;
function Spinner() {
  return <div id="spinner-cont"></div>;
}
const setSpinner = (display) => {
  if (display) ++count;
  else --count;

  ReactDom.render(
    <>
      {display || count !== 0 ? (
        <div>
          <div className="lds-ring-splash"></div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>,
    document.getElementById("spinner-cont")
  );
};

export { setSpinner };
export default Spinner;
