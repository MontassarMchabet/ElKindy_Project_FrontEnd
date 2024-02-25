import React from "react";
import InnerServiceAreaTwoItem from "./InnerServiceAreaTwoItem";

const InnerServiceAreaTwo = () => {
  const services = [
    {
      src: "/img/icon/inner_two_services_icon01.png",
      url: "/services-details",
      titles: ["User Interaction", "Design"],
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/inner_two_services_icon02.png",
      url: "/services-details",
      titles: ["Production", "Design"],
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/inner_two_services_icon03.png",
      url: "/services-details",
      titles: ["Branding", "Design"],
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/inner_two_services_icon04.png",
      url: "/services-details",
      titles: ["Product", "Design"],
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
  ];

  return (
    <section className="inner-services-area-two pt-110 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="section-title text-center mb-65">
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

        <div className="inner-services-wrap-two">
          <div className="row justify-content-center">
            {services.map((x, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-10">
                <InnerServiceAreaTwoItem item={x} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerServiceAreaTwo;
