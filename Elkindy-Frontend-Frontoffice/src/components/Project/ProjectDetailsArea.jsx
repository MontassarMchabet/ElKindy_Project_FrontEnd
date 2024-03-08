import React from "react";
import CounterWrapFour from "../CounterArea/CounterWrapFour";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Iframe from "react-iframe";

const ProjectDetailsArea = () => {
  return (
    <section className="project-details-area pt-40 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-inner">
              <div className="section-title title-style-two text-center mb-60">
                <span className="sub-title">Video</span>
                <h2 className="title">End of Year Party</h2>
              </div>
              <div className="project-details-img">
                <iframe width="800" height="500" src="https://www.youtube.com/embed/8HMUQungv8k" frameborder="0" allowfullscreen></iframe>
              </div>
              <div className="project-details-content">
                <h2 className="title"></h2>
                <p>
                </p>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-12">
                  {/* counter wrap four */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="project-shape-wrap">
        <img src="/img/images/services_details_shape.png" alt="" />
      </div>
    </section>

  );
};

export default ProjectDetailsArea;
