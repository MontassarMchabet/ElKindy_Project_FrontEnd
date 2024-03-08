import React from "react";
import { Link } from "react-router-dom";
import { useParallax } from "react-scroll-parallax";

const ExamArea = () => {
  const parallax = useParallax({
    translateY: [-32, 32],
    translateX: [-32, 32],
    rootMargin: 0,
  });

  return (
    <section className="breadcrumb-area breadcrumb-area-three parallax pt-175 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2 className="title">Exams</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Exams
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ExamArea;
