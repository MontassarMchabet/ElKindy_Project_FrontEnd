import React from "react";
import InnerServicesAreaItem from "./InnerServicesAreaItem";

const InnerServicesArea = () => {
  const inner_services = [
    {
      src: "/img/icon/inner_services_icon01.png",
      url: "/services-details",
      title: "Piano",
      desc: "It is a keyboard instrument.",
    },
    {
      src: "/img/icon/inner_services_icon02.png",
      url: "/services-details",
      title: "Guitar",
      desc: "It is a string instrument played by plucking.",
    },
    {
      src: "/img/icon/inner_services_icon03.png",
      url: "/services-details",
      title: "Vocalization",
      desc: "The act of exercising one's voice.",
    },
    {
      src: "/img/icon/inner_services_icon04.png",
      url: "/services-details",
      title: "Drums",
      desc: "It is a percussion instrument.",
    },
    {
      src: "/img/icon/inner_services_icon05.png",
      url: "/services-details",
      title: "Violin",
      desc: "It is a bowed string instrument.",
    },
    {
      src: "/img/icon/inner_services_icon06.png",
      url: "/services-details",
      title: "Cello",
      desc: "It is a bowed string instrument.",
    },
    {
      src: "/img/icon/inner_services_icon06.png",
      url: "/services-details",
      title: "Double Bass",
      desc: "It is a large string instrument.",
    },
    {
      src: "/img/icon/inner_services_icon07.png",
      url: "/services-details",
      title: "Saxophone",
      desc: "It is a wind instrument belonging to the woodwind family.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Oud",
      desc: "It is a string instrument played by plucking.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Synthesizer",
      desc: "It is an electronic musical instrument.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Qanun",
      desc: "LIt is a string instrument played by plucking.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Trumpet",
      desc: "It is a brass wind instrument.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Viola",
      desc: "It is a bowed string instrument.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Clarinet",
      desc: "It is a woodwind instrument.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Cajon",
      desc: "It is a percussion instrument.",
    },
    {
      src: "/img/icon/inner_services_icon08.png",
      url: "/services-details",
      title: "Darbuka",
      desc: "It is a percussion instrument.",
    },
  ];

  return (
    <section className="inner-services-area pt-110 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title title-style-two text-center mb-60">
              <span className="sub-title">For All Desires</span>
              <h2 className="title">Music Instruments</h2>
            </div>
          </div>
        </div>

        <div className="inner-services-item-wrap">
          <div className="row justify-content-center">
            {inner_services.map((x, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                <InnerServicesAreaItem item={x} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerServicesArea;
