import React from "react";
import { Link } from "react-router-dom";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/core";

import { Swiper, SwiperSlide } from "swiper/react";

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ProjectAreaThreeItem = () => {
  const swiper_settings = {
    spaceBetween: 20,
    slidesPerView: 1.2,
    loop: true,
    autoplay: false,
    breakpoints: {
      500: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2.4,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2.7,
        spaceBetween: 20,
      },
      1500: {
        slidesPerView: 2.8,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className="swiper-container project-active-three">
      <div className="swiper-wrapper">
        <Swiper {...swiper_settings}>
          {[1, 2, 3, 4].map((x) => (
            <SwiperSlide key={x}>
              <div className="swiper-slide">
                <div className="project-item-three">
                  <div className="project-content-three">
                    <h2 className="title">
                      <Link to="/project-details">Hosting Website Design</Link>
                    </h2>
                    <p>
                      At Collax we specialize in designing, building,
                      shipping...
                    </p>
                  </div>
                  <div className="project-thumb-three">
                    <Link to="/project-details">
                      <img
                        src={`/img/project/h3_project_img0${x}.jpg`}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="project-details-btn">
                    <Link to="/project-details">View Case Studies</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProjectAreaThreeItem;
