import React from "react";
import { Link } from "react-router-dom";

const ExamSectors = () => {
  const sectors = [
    {
      url: "/exam-details",
      tag: "Sector",
      reading_time: "5 Min",
      title: "Sample Exam 1",
    },
    {
      url: "/exam-details",
      tag: "Our Team",
      reading_time: "5 Min",
      title: "Sample Exam 2",
    },
    {
      url: "/exam-details",
      tag: "Solution",
      reading_time: "5 Min",
      title: "Sample Exam 3",
    },
  ];

  return (
    <div className="exam-section">
      <div className="exam-container">
        {sectors.map((x, index) => (
          <div key={index} className="exam-item">
            <div className="content">
              <div className="exam-meta">
                <ul className="list-wrap">
                  <li className="tag">
                    <Link to="/exams">{x.tag}</Link>
                  </li>
                  <li>
                    <i className="fal fa-clock" />
                    {x.reading_time}
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <Link to={x.url}>{x.title}</Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSectors;
