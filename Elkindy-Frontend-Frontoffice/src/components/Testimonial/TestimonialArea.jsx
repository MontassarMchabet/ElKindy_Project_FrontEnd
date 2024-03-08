import React from "react";
import SlickSlider from "../SlickSlider/SlickSlider";
import TestimonialAreaItem from "./TestimonialAreaItem";
import $ from "jquery";
import { doAnimations } from "../../lib/helpers";
import cn from "classnames";

const TestimonialArea = () => {
  const slick_settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: function (currentSlide, nextSlide) {
      var $animatingElements = $(
        '.single-slider[data-slick-index="' + nextSlide + '"]'
      ).find("[data-animation]");
      doAnimations($animatingElements);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const slider_items = [
    {
      title: "Aziz Zgolli",
      designation: "Client",
      desc: `The instructors at ElKindy are incredibly knowledgeable and supportive. I've learned so much about music theory and technique, and my skills have improved immensely since I started taking courses here. “`,
      src: 1,
    },
    {
      title: "Shayma Ettayeb",
      designation: "Client",
      desc: `I've been searching for a music school that offers high-quality courses, and I'm so glad I found ElKindy. The curriculum is well-designed, and the instructors are passionate about what they do. I highly recommend it to anyone looking to pursue their musical passions. “`,
      src: 2,
    },
    {
      title: "Montassar Mchabet",
      designation: "Client",
      desc: `Enrolling in courses at ElKindy was one of the best decisions I've made for my musical development. The personalized attention I receive from the instructors has helped me overcome challenges and grow as a musician. I feel more confident in my abilities thanks to their guidance. “`,
      src: 3,
    },
    {
      title: "Ahmed Mtalah",
      designation: "Client",
      desc: `The online courses offered by ElKindy are top-notch. Even though I'm not able to attend in person, I still feel fully engaged and supported by the instructors. The virtual learning environment is interactive and easy to navigate, making it convenient for me to pursue my musical goals from anywhere. “`,
      src: 1,
    },
    {
      title: "Nour Ben Aissa",
      designation: "Client",
      desc: `I've attended other music schools in the past, but none compare to ElKindy. The faculty here truly cares about their students' success and goes above and beyond to provide valuable feedback and encouragement. I'm grateful for the positive impact they've had on my musical journey. “`,
      src: 4,
    },
    {
      title: "Amir Lengliz",
      designation: "Client",
      desc: `As a beginner musician, I was initially intimidated by the prospect of taking music courses, but the welcoming atmosphere at ElKindy immediately put me at ease. The instructors are patient and supportive, and I've made significant progress in a short amount of time. I couldn't be happier with my experience here. “`,
      src: 1,
    },
    {
      title: "Mouez Lemjid",
      designation: "Client",
      desc: `The courses at ElKindy strike the perfect balance between theory and practical application. I appreciate that I'm not only learning about music but also getting hands-on experience that prepares me for real-world performance opportunities. It's a comprehensive approach that has helped me grow as a well-rounded musician. “`,
      src: 3,
    },
  ];

  return (
    <section className="testimonial-area pt-110 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center mb-60">
              <span className="sub-title">Testimonials</span>
              <h2 className="title">What Our Customer Say About Us</h2>
            </div>
          </div>
        </div>

        <div className="testimonial-item-wrap">
          <div className="row testimonial-active">
            <SlickSlider settings={slick_settings}>
              {slider_items.map((x, index) => (
                <div
                  key={index}
                  className={cn(
                    "col-lg-3",
                    index % 2 === 0 && "testimonial-item-wrap-item-even"
                  )}
                >
                  <TestimonialAreaItem item={x} />
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialArea;
