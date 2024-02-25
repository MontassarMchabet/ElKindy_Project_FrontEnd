import React from "react";

const ServicesDetailsArea = () => {
  return (
    <div className="services-details-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="services-details-img text-center">
              <img src="/img/images/services_details_img.png" alt="" />
            </div>

            <div className="services-details-content text-center">
              <p>
                Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                scelerisque nibh dolores consectetuer, nulla aptent est pede.
                Scelerisque euismod varius mi, congue eget sed vestibulum,
                ornare cras sed nec.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="services-details-shape">
        <img src="/img/images/services_details_shape.png" alt="" />
      </div>
    </div>
  );
};

export default ServicesDetailsArea;
