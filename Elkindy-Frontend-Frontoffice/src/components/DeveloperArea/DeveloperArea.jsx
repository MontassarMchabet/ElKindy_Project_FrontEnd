import React from "react";
import DeveloperAreaTabs from "./DeveloperAreaTabs";
import DeveloperExperienceArea from "./DeveloperExperienceArea";

const DeveloperArea = () => {
  return (
    <section className="developr-area pb-120">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-9 order-0 order-lg-2">
            <DeveloperExperienceArea />
          </div>

          <div className="col-lg-6">
            <div className="developr-content">
              <div className="section-title title-style-two mb-50">
                <span className="sub-title">I’m a Developer</span>
                <h2 className="title">
                  I Develop Ideas <br />
                  That Help People
                </h2>
              </div>

              {/* tabs */}
              <DeveloperAreaTabs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperArea;
