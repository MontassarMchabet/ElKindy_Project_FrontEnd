import React from "react";
import ExamItem from "./ExamItem";

const ExamBody = () => {
  const services_area_list = [
    {
      title: "Children",
      desc: " Our school welcomes kids from the age of 5. We introduce them to the world of music and explore the fun and educational aspects of sounds and rhythms with them.",
      url: "/",
      delay_time: 2,
    },
    {
      title: "Adolescents",
      desc: "In adolescence, the capacity to develop one's passion is at its peak. We welcome your teenagers in an environment conducive to their musical growth.",
      url: "/",
      delay_time: 4,
    },
    {
      title: "Adults",
      desc: "You'll experience music differently here. Beyond mere enjoyment, you'll discover a new kind of sharing and learning tailored to your desires.",
      url: "/",
      delay_time: 6,
    },
    {
      title: "Private lessons",
      desc: "Individual Music Lessons provide personalized attention, allowing teachers to focus on the specific needs of each student.",
      url: "/",
      delay_time: 8,
    },
  ];

  return (
    <section className="services-area pt-35 pb-95">
    <div className="container">
      <div className="row justify-content-center">
        <div className="grid-container">
          {services_area_list.map((item, index) => (
            <div key={index} className="grid-item">
              <ExamItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default ExamBody;
