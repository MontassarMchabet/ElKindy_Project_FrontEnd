import React from "react";
import ConsultationAreaForm from "./ConsultationAreaForm";

const ConsultationArea = () => {
  return (
    <section className="consultation-area pt-120 pb-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="consultation-content">
              <div className="section-title mb-25">
                <img src="/img/icon/consultation_icon01.png" alt="" />
                <span className="sub-title">95% Accuracy</span>
                <h2 className="title">
                  Verified Best Conservatory in Tunisia
                </h2>
              </div>
              <p>
              </p>
              <div className="consultation-list">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/consultation_icon02.png" alt="" />
                      <span>12x</span>
                    </div>
                    <div className="content">
                      <h6 className="title">Faster Order Processing</h6>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/consultation_icon03.png" alt="" />
                      <span>95%</span>
                    </div>
                    <div className="content">
                      <h6 className="title">Musical Courses Accuracy</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <ConsultationAreaForm />
          </div>
        </div>
      </div>

      <div className="consultation-shape-wrap">
        <img
          src="/img/images/consultation_shape01.png"
          alt=""
          className="shape-one ribbonRotate"
        />
        <img
          src="/img/images/consultation_shape02.png"
          alt=""
          className="shape-two float-bob-x"
        />
      </div>
    </section>
  );
};

export default ConsultationArea;
