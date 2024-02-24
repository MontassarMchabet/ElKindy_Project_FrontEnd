import React from "react";
import DeveloperExperienceArea from "./DeveloperExperienceArea";

const DeveloperAreaTwo = () => {
  return (
    <section className="developr-area-two pb-120">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-9 order-0 order-lg-2">
            <DeveloperExperienceArea />
          </div>

          <div className="col-lg-6">
            <div className="developr-content-two">
              <div className="section-title title-style-two mb-20">
                <span className="sub-title">What We Do</span>
                <h2 className="title">
                  We design and develop web and mobile applications for our
                  clients worldwide
                </h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                scelerisque nibh dolores consectetuer,
              </p>

              <div className="developr-social">
                <ul className="list-wrap">
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-vimeo-v"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperAreaTwo;
