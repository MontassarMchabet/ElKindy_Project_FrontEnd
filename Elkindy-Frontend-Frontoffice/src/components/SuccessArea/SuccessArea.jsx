import React from "react";
import SuccessList from "./SuccessList";

const SuccessArea = () => {
  return (
    <section className="success-area pb-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-0 order-lg-2">
            <div className="success-img">
              <img src="/img/images/success_img.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="success-content">
              <div className="section-title title-style-two mb-30">
                <span className="sub-title">Company Success</span>
                <h2 className="title">
                  A Company’s Success is An Ongoing Stream of Happiness
                </h2>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>

              {/* success list */}
              <SuccessList />
            </div>
          </div>
        </div>
      </div>

      <div className="success-shape-wrap">
        <img src="/img/images/success_shape01.png" alt="" />
        <img src="/img/images/success_shape02.png" alt="" />
      </div>
    </section>
  );
};

export default SuccessArea;
