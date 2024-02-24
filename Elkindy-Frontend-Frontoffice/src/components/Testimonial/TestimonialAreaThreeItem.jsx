import React from "react";

const TestimonialAreaThreeItem = (props) => {
  return (
    <div className="swiper-slide">
      <div className="testimonial-item-three">
        <div className="testimonial-thumb-three">
          <img src={`/img/images/testimonial_avatar0${props.id}.png`} alt="" />
        </div>

        <div className="testimonial-content-three">
          <h4 className="title">James Botosh</h4>

          <span>Product Designer</span>

          <p>
            “We seek to get involved early in the design phase so that we can
            manage the project more efficiently, provide effective building
            solutions”
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAreaThreeItem;
