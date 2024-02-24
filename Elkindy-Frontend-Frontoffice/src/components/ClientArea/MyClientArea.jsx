import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";

const MyClientArea = () => {
  const slick_settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="client-area pt-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="section-title title-style-two text-center mb-55">
              <span className="sub-title">My Clients</span>
              <h2 className="title">I Work With Over 175+ Happy Client</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>
            </div>
          </div>
        </div>

        <div className="row brand-active">
          <SlickSlider settings={slick_settings}>
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <div key={x} className="col-12">
                <div className="brand-item">
                  <img src={`/img/brand/h3_brand_img0${x}.png`} alt="" />
                </div>
              </div>
            ))}
          </SlickSlider>
        </div>
      </div>
    </section>
  );
};

export default MyClientArea;
