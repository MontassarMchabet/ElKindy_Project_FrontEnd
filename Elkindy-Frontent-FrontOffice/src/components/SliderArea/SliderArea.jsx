import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";
import SliderAreaItem from "./SliderAreaItem";

const SliderArea = () => {
  const slick_settings = {
    autoplay: false,
    autoplaySpeed: 10000,
    dots: true,
    fade: true,
    arrows: false,
    responsive: [{ breakpoint: 767, settings: { dots: false, arrows: false } }],
  };

  return (
    <section className="slider-area">
      <div className="slider-active">
        <SlickSlider settings={slick_settings}>
          <SliderAreaItem />
          <SliderAreaItem />
          <SliderAreaItem />
        </SlickSlider>
      </div>

      <div className="slider-shape-wrap">
        <img src="/img/slider/slider_shape01.png" alt="" />
        <img src="/img/slider/slider_shape02.png" alt="" />
        <img src="/img/slider/slider_shape03.png" alt="" />
        <img src="/img/slider/slider_shape04.png" alt="" />
        <img src="/img/slider/slider_shape05.png" alt="" />
        <img src="/img/slider/slider_shape06.png" alt="" />
      </div>
    </section>
  );
};

export default SliderArea;
