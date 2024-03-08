import React from "react";
import ProjectAreaThreeItem from "./ProjectAreaThreeItem";

const ProjectAreaThree = () => {
  return (
    <section className="project-area-three">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xl-10">
            <div className="section-title title-style-two mb-90">
              <span className="sub-title">Our Events</span>
              <h2 className="title">Recent Events</h2>
            </div>
          </div>
        </div>

        <div className="project-nav-wrap">
          <div className="row">
            <div className="col-xl-2">
              <div className="project-tab-wrap">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="website-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#website"
                      type="button"
                      role="tab"
                      aria-controls="website"
                      aria-selected="true"
                    >
                      House of Sports
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="design-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#design"
                      type="button"
                      role="tab"
                      aria-controls="design"
                      aria-selected="false"
                    >
                      City of Sciences
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-10">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="website"
                  role="tabpanel"
                  aria-labelledby="website-tab"
                >
                  <ProjectAreaThreeItem />
                </div>

                <div
                  className="tab-pane fade"
                  id="design"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                >
                  <ProjectAreaThreeItem />
                </div>

                <div
                  className="tab-pane fade"
                  id="app"
                  role="tabpanel"
                  aria-labelledby="app-tab"
                >
                  <ProjectAreaThreeItem />
                </div>

                <div
                  className="tab-pane fade"
                  id="branding"
                  role="tabpanel"
                  aria-labelledby="branding-tab"
                >
                  <ProjectAreaThreeItem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-shape-wrap-two">
        <img src="/img/images/h3_project_shape.png" alt="" />
      </div>
    </section>
  );
};

export default ProjectAreaThree;
