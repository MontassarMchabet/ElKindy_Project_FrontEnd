import React from "react";
import TeamAreaTwoItem from "./TeamAreaTwoItem";

const TeamAreaThree = () => {
  const team_members = [
    {
      src: "/img/team/inner_team01.jpg",
      url: "/team-details",
      title: "Alena Rosser",
      designation: "CEO Kawasaki Inc.",
    },
    {
      src: "/img/team/inner_team02.jpg",
      url: "/team-details",
      title: "Emerson Saris",
      designation: "CEO Kawasaki Inc.",
    },
    {
      src: "/img/team/inner_team03.jpg",
      url: "/team-details",
      title: "Tiana Dokidis",
      designation: "CEO Kawasaki Inc.",
    },
    {
      src: "/img/team/inner_team04.jpg",
      url: "/team-details",
      title: "Ryan Vetrovs",
      designation: "CEO Kawasaki Inc.",
    },
    {
      src: "/img/team/inner_team05.jpg",
      url: "/team-details",
      title: "Lindsey Schleifer",
      designation: "CEO Kawasaki Inc.",
    },
    {
      src: "/img/team/inner_team06.jpg",
      url: "/team-details",
      title: "Dulce Dokidis",
      designation: "CEO Kawasaki Inc.",
    },
  ];

  return (
    <section className="team-area-two pt-110 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          {team_members.map((x, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-10">
              <TeamAreaTwoItem item={x} className="team-item-hover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamAreaThree;
