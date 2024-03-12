import React from "react";

import InnerEventArea2 from "./InnerEventArea2";

import { Link } from "react-router-dom";

const InnerEventArea = () => {



  return (
    <section className="inner-projcet-area-two pb-35">
      <div >
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="section-title title-style-two ">
              <span className="sub-title">Our Events</span>
              <h4 className="title">
                Latest Events
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fulid p-0">
        <div className="inner-projcet-wrap" >
          <InnerEventArea2/>
          <div className="read-more-btn text-center mt-30">
            <Link to="/events" className="btn">
              Read More <span></span>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default InnerEventArea;
