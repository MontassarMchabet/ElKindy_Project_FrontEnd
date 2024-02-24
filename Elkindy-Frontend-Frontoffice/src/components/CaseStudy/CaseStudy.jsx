import React from "react";
import CaseStudyItem from "./CaseStudyItem";
import { Link } from "react-router-dom";

const CaseStudy = () => {
  const studies = [
    {
      colClassName: "col-lg-4 col-md-6",
      src: "/img/project/inner_project01.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-4 col-md-6",
      src: "/img/project/inner_project02.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-4 col-md-6",
      src: "/img/project/inner_project03.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-8 col-md-6",
      src: "/img/project/inner_project04.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-4 col-md-6",
      src: "/img/project/inner_project05.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-6 col-md-6",
      src: "/img/project/inner_project06.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
    {
      colClassName: "col-lg-6 col-md-6",
      src: "/img/project/inner_project07.jpg",
      url: "/project-details",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
    },
  ];

  return (
    <section className="inner-project-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center mb-65">
              <h2 className="title">Case Studies</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>
            </div>
          </div>
        </div>

        <div className="inner-project-item-wrap">
          <div className="row justify-content-center">
            {studies.map((x, index) => (
              <CaseStudyItem key={index} item={x} />
            ))}
          </div>

          <div className="more-btn text-center mt-45">
            <Link to="/about-me" className="btn">
              Load More <span></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
