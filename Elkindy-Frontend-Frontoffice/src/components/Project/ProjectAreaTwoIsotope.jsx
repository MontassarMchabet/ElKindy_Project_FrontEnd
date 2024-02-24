import React, { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import ProjectAreaTwoItem from "./ProjectAreaTwoItem";
import cn from "classnames";

// component built with isotope-layout, for more fluid layout
const ProjectAreaTwoIsotope = () => {
  const project_items = [
    {
      url: "/project-details",
      src: "/img/project/h2_project_img01.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-three cat-two",
    },
    {
      url: "/project-details",
      src: "/img/project/h2_project_img02.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-four cat-five",
    },
    {
      url: "/project-details",
      src: "/img/project/h2_project_img03.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-two cat-one",
    },
    {
      url: "/project-details",
      src: "/img/project/h2_project_img04.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-four cat-five",
    },
    {
      url: "/project-details",
      src: "/img/project/h2_project_img05.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-one cat-five",
    },
    {
      url: "/project-details",
      src: "/img/project/h2_project_img06.jpg",
      title: "Motion Design",
      desc: "Lorem Ipsum is simply",
      className: "cat-two cat-five",
    },
  ];

  const filters = [
    {
      filter: "*",
      label: "View All",
    },
    {
      filter: "cat-one",
      label: "App",
    },
    {
      filter: "cat-two",
      label: "Website",
    },
    {
      filter: "cat-three",
      label: "Landing Page",
    },
    {
      filter: "cat-four",
      label: "Branding-app",
    },
    {
      filter: "cat-five",
      label: "Product Design",
    },
  ];

  const [isotope, setIsotope] = useState(null);
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsotope(
        new Isotope(".project-active-two", {
          itemSelector: ".grid-item",
          percentPosition: true,
          originTop: true,
          masonry: {
            columnWidth: ".grid-sizer",
          },
        })
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isotope) {
      !filterKey || filterKey === "*"
        ? isotope.arrange({ filter: `*` })
        : isotope.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey]);

  return (
    <section className="project-area-two pt-110 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="section-title title-style-two white-title mb-60 text-center">
              <span className="sub-title">Portfolio</span>
              <h2 className="title">You Will Like These Design Made by Me</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </p>
            </div>
          </div>
        </div>

        <div className="project-item-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="project-menu-nav">
                {filters.map((x, index) => (
                  <button
                    key={index}
                    className={x.filter === filterKey ? "active" : ""}
                    data-filter={x.filter}
                    onClick={() => setFilterKey(x.filter)}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row project-active-two">
            {project_items.map((x, index) => (
              <div
                key={index}
                className={cn(
                  "col-lg-4 col-md-6 grid-item grid-sizer",
                  x.className
                )}
              >
                <ProjectAreaTwoItem item={x} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="project-shape">
        <img src="/img/project/h2_project_shape.png" alt="" />
      </div>
    </section>
  );
};

export default ProjectAreaTwoIsotope;
