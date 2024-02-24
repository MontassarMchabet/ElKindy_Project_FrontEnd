import React from "react";

const TestimonialAreaTwoItem = (props) => {
  return (
    <div className="testimonial-item-two">
      <div className="testimonial-content-two">
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>

        <p>{props.item.desc}</p>
      </div>

      <div className="testimonial-info-two">
        <div className="thumb">
          <img src={props.item.src} alt="" />
        </div>
        <div className="content">
          <h5 className="title">{props.item.title}</h5>
          <span>{props.item.designation}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAreaTwoItem;
