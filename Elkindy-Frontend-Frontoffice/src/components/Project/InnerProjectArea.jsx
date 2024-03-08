import React from "react";
import InnerProjectAreaItem from "./InnerProjectAreaItem";
import SlickSlider from "../SlickSlider/SlickSlider";
import { useSlickArrows } from "../../lib/hooks/useSlickArrows";
import cn from "classnames";

const InnerProjectArea = () => {
  const inner_projects = [
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project01.jpg",
      src2: "/img/project/inner_two_project02.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project04.jpg",
      src2: "/img/project/inner_two_project03.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project05.jpg",
      src2: "/img/project/inner_two_project06.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project08.jpg",
      src2: "/img/project/inner_two_project07.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project09.jpg",
      src2: "/img/project/inner_two_project10.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      url: "/project-details",
      src1: "/img/project/inner_two_project08.jpg",
      src2: "/img/project/inner_two_project07.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
  ];

  const slick_settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "295px",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "180px",
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  const { sliderRef, toNext, toPrev } = useSlickArrows();

  return (
    <section className="inner-projcet-area-two pt-140 pb-125">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="section-title title-style-two mb-70">
              <span className="sub-title">My Latest Project</span>
              <h2 className="title">
                Our Best Professional <br />
                UI/UX Design
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="inner-project-nav">
              <button type="button" className="slick-arrow" onClick={toPrev}>
                <i className="fal fa-long-arrow-left" />
              </button>
              <button type="button" className="slick-arrow" onClick={toNext}>
                <i className="fal fa-long-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fulid p-0">
        <div className="inner-projcet-wrap-two">
          <div className="row g-0 inner-project-active">
            <SlickSlider settings={slick_settings} ref={sliderRef}>
              {inner_projects.map((x, index) => (
                <div
                  key={index}
                  className={cn(
                    "col-lg-4 inner-two",
                    index % 2 === 0 ? "inner-two-even" : "inner-two-odd"
                  )}
                >
                  <InnerProjectAreaItem item={x} />
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerProjectArea;
