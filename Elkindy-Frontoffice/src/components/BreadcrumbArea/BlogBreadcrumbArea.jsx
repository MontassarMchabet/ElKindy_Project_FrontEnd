import React from "react";
import { Link } from "react-router-dom";
import { useParallax } from "react-scroll-parallax";

const BlogBreadcrumbArea = () => {
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
              <h2 className="title">Blog</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="breadcrumb-search">
              <form action="#">
                <label htmlFor="serch">
                  <i className="far fa-search"></i>
                </label>
                <input type="text" id="serch" placeholder="Search for..." />
                <button type="submit" className="btn">
                  Search <span></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="breadcrumb-shape-wrap-two">
        <div className="parallax-shape" ref={parallax.ref}>
          <img
            src="/img/images/breadcrumb_shape03.png"
            className="layer"
            data-depth="0.5"
            alt="img"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogBreadcrumbArea;
