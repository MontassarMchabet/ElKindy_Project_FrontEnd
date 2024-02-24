import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";
import TeamAreaTwoItem from "./TeamAreaTwoItem";

const TeamAreaTwo = () => {
  const team_members = [
    {
      src: "/img/team/lotfi.jpg",
      title: "Lotfi Erraies",
      designation: "Founder",
    },
    {
      src: "/img/team/amin.jpg",
      title: "Amin Ben Taher",
      designation: "General Supervisor",
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
    <section className="team-area-two pt-110 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <div className="section-title title-style-two text-center mb-70">
              <h2 className="title">Meet The Staff</h2>
              <p>
              </p>
            </div>
          </div>
        </div>

        <div className="row team-active">
          <SlickSlider settings={slick_settings}>
            {team_members.map((x, index) => (
              <div key={index} className="col-lg-4">
                <TeamAreaTwoItem item={x} />
              </div>
            ))}
          </SlickSlider>
        </div>
      </div>
    </section>
  );
};

export default TeamAreaTwo;
