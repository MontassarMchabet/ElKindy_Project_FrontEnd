import React from "react";
import { Link } from "react-router-dom";

const BannerTwo = () => {
  return (
    <section className="banner-area-two">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-5">
            <div className="banner-img-two">
              <img src="/img/banner/h2_banner_img.png" alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="banner-content-two">
              <span className="sub-title">Hi, I am John William</span>
              <h2 className="title">
                Professional Product <span>Designer</span> Based in USA
              </h2>
              <div className="banner-content-bottom">
                <Link to="/contact" className="btn">
                  Contact Us <span></span>
                </Link>
                
                <ul className="list-wrap">
                  <li>
                    <a href="#">
                      <img src="/img/icon/banner_icon01.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/icon/banner_icon02.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/icon/banner_icon03.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/icon/banner_icon04.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-shape-wrap-two">
        <img
          src="/img/banner/h2_banner_shape01.png"
          alt=""
          className="rotateme"
        />
        <img
          src="/img/banner/h2_banner_shape02.png"
          alt=""
          className="ribbonRotate"
        />
        <img
          src="/img/banner/h2_banner_shape03.png"
          alt=""
          className="ribbonRotate"
        />
        <img src="/img/banner/h2_banner_shape04.png" alt="" />
      </div>
    </section>
  );
};

export default BannerTwo;
