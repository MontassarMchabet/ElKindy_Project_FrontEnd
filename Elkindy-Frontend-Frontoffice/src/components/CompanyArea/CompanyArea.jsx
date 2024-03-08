import React from "react";
import { useParallax } from "react-scroll-parallax";

const CompanyArea = () => {
  const parallax = useParallax({
    translateX: [-24, 24],
    rootMargin: 0,
  });

  return (
    <section className="company-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="section-title white-title text-center mb-65">
              <span className="sub-title">Our Company</span>
              <h2 className="title">
                We Create Creative Designs For Every Web Page
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="company-img">
              <img src="/img/images/company_img01.png" alt="" />
              <img
                src="/img/images/company_img02.png"
                alt=""
                data-parallax='{"x" : 120 }'
                ref={parallax.ref}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="company-content">
              <h2 className="title">All Your Questions Are Here</h2>
              <div className="company-list">
                <ul className="list-wrap">
                  <li>
                    <img src="/img/icon/check_icon.png" alt="" />
                    Seo quotes to inspire your campaign
                  </li>
                  <li>
                    <img src="/img/icon/check_icon.png" alt="" />
                    Much easier to double your business
                  </li>
                  <li>
                    <img src="/img/icon/check_icon.png" alt="" />
                    Free page speed insights tool to find out exactly
                  </li>
                  <li>
                    <img src="/img/icon/check_icon.png" alt="" />
                    Seo quotes to inspire your campaign
                  </li>
                </ul>
              </div>
              <a href="about-me.html" className="btn">
                Discover More <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="company-shape-wrap">
        <img src="/img/images/company_shape.png" alt="" />
      </div>
    </section>
  );
};

export default CompanyArea;
