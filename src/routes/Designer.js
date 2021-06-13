import React, { useContext } from "react";
import { GlobPreference } from "../App";
import CssEditor from "../components/CssEditor";
import DesignScreen from "../components/DesignScreen";
import FullCssEditor from "../components/FullCssEditor";
import LeftToolBar from "../components/LeftToolBar";
import RightToolBar from "../components/RightToolBar";

function Designer() {
  //   useEffect(() => {
  //     console.log(getBody());
  //   }, []);

  return (
    <>
      <div className="abort-mobile-device">
        <span>Please Open in Desktop/laptop device for better Experience</span>
      </div>
      <div className="main">
        <div className="main-inner">
          {/* <!-- Navebar(header) start --> */}
          <div className="navbar">
            {/* <!-- menu button --> */}
            <div className="nav-button hide">
              <i className="far fa-bars"></i>
              <span>Menu</span>
            </div>
            {/* <!-- menu button end --> */}

            {/* <!-- Designer Name(brand) --> */}
            <div className="nav-button disabled">Web Designer</div>

            {/* <!-- Code Download button --> */}
            <div
              className="nav-button"
              id="download-button"
              title="download current design"
            >
              <i className="far fa-download"></i>
              <span>Download</span>
            </div>
            {/* <!-- download button end --> */}

            {/* <!-- reset button --> */}
            <div className="nav-button" id="delete-design">
              <i className="far fa-trash"></i>
              <span>Delete Design</span>
            </div>
          </div>
          {/* <!-- navbar end --> */}

          {/* <!-- main body start --> */}
          <div className="body-wrapper">
            <div className="body">
              {/* <!-- left toolbar start --> */}

              <LeftToolBar />

              <DesignScreen />

              {/* <!-- Override Css Block Start--> */}
              <RightToolBar />
            </div>
          </div>

          <CssEditor />
          <FullCssEditor />
        </div>
      </div>
    </>
  );
}

export default Designer;
