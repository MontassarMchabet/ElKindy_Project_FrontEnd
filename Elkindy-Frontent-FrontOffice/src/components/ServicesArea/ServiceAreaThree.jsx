import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";
import ServiceAreaThreeItem from "./ServiceAreaThreeItem";

const ServiceAreaThree = () => {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon01.png",
      url: "/services-details",
    },
    {
      title: "Website Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon02.png",
      url: "/services-details",
    },
    {
      title: "Branding",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon03.png",
      url: "/services-details",
    },
    {
      title: "UI/UX Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon01.png",
      url: "/services-details",
    },
    {
      title: "Website Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon02.png",
      url: "/services-details",
    },
    {
      title: "Branding",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon03.png",
      url: "/services-details",
    },
    {
      title: "UI/UX Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon01.png",
      url: "/services-details",
    },
    {
      title: "Website Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon02.png",
      url: "/services-details",
    },
    {
      title: "Branding",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      src: "/img/icon/h3_services_icon03.png",
      url: "/services-details",
    },
  ];

  const slick_settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="services-area-three">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <div className="section-title title-style-two text-center mb-45">
              <span className="sub-title">What We Do</span>
              <h2 className="title">
                We Make <span>Designs</span> <br />
                that Lead and Inpire.
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>
            </div>
          </div>
        </div>

        <div className="services-item-wrap">
          <div className="row services-active services-active-three">
            <SlickSlider settings={slick_settings}>
              {services.map((x, index) => (
                <div key={index} className="col-lg-4">
                  <ServiceAreaThreeItem item={x} />
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      </div>

      <div className="services-shape">
        <img src="/img/images/h3_services_shape.png" alt="" />
      </div>
    </section>
  );
};

export default ServiceAreaThree;
