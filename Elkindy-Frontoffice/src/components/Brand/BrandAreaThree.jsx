import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";

const BrandAreaThree = () => {
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
    <section className="brand-area-two pt-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center mb-80">
              <span className="sub-title">Our Partners</span>
              <h2 className="title">People Who Trust Us</h2>
            </div>
          </div>
        </div>

        <div className="row brand-active">
          <SlickSlider settings={slick_settings}>
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <div key={x} className="col-12">
                <div className="brand-item-two">
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

export default BrandAreaThree;
