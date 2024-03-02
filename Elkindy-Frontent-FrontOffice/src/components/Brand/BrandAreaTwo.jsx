import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";
import cn from "classnames";

const BrandAreaTwo = ({ className }) => {
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
    <div className={cn("brand-area ", className)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <span className="title">We are Already Build Solution for...</span>
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
    </div>
  );
};

export default BrandAreaTwo;
