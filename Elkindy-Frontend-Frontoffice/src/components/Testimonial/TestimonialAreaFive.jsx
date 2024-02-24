import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Iframe from "react-iframe";

const TestimonialAreaFive = () => {
  return (
    <section id="testimonial-five" className="testimonial-area-five pb-120">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-9">
            <div className="testimonial-img">
              <img src="/img/images/testimonial_img.jpg" alt="" />

              <Popup
                trigger={
                  <a
                    href="#testimonial-five"
                    className="play-btn popup-video"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-play"></i>
                  </a>
                }
                position=""
                modal={true}
              >
                <Iframe
                  url="https://www.youtube.com/embed/bixR-KIJKYM"
                  width="100%"
                  height="350px"
                  id=""
                  className=""
                  display="block"
                  position="relative"
                />
              </Popup>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="testimonial-content">
              <div className="section-title title-style-two mb-50">
                <span className="sub-title">Testimonal</span>
                <h2 className="title">
                  Would be Happy to Here What <span>Clients</span>
                  <span>Say’s</span> About Me
                </h2>
              </div>

              <div className="testimonial-item-five">
                <div className="testimonial-info">
                  <div className="thumb">
                    <img src="/img/images/testimonial_avatar01.png" alt="" />
                  </div>

                  <div className="content">
                    <h2 className="title">James Botosh</h2>
                    <p>Product Designer</p>
                  </div>
                </div>

                <div className="testimonial-content-five">
                  <p>
                    “We seek to get involved early in the design phase so that
                    we can manage the project more efficiently, provide
                    effective building solutions”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialAreaFive;
