import React from "react";
import { Link } from "react-router-dom";

const BannerOne = () => {
  return (
    <section className="banner-area banner-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-img wow fadeInLeft" data-wow-delay=".4s">
              <img style={{ width: '900px' }} src="/img/banner/ytest.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-content">
              <span className="sub-title wow fadeInUp" data-wow-delay=".2s">
                Amazing <strong>Starts</strong> Here
              </span>
              <h2 className="title wow fadeInUp" data-wow-delay=".4s">
                Explore the World of Music and Arts
              </h2>
              <Link
                to="/contact"
                className="btn wow fadeInUp"
                data-wow-delay=".6s"
              >
                Contact Us <span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-shape-wrap">
        <img src="/img/banner/banner_shape01.png" alt="" />
        <img
          src="/img/banner/banner_shape02.png"
          alt=""
          className="animationFramesOne"
        />
        <img
          src="/img/banner/banner_shape03.png"
          alt=""
          className="contactSwimmer"
        />
        <img src="/img/banner/banner_shape04.png" alt="" className="rotateme" />
        <img
          src="/img/banner/banner_shape05.png"
          alt=""
          className="animation1"
        />
        <img
          src="/img/banner/banner_shape06.png"
          alt=""
          className="ribbonRotate"
        />
        <img
          src="/img/banner/banner_shape07.png"
          alt=""
          className="float-bob-x"
        />
      </div>
    </section>
  );
};

export default BannerOne;
