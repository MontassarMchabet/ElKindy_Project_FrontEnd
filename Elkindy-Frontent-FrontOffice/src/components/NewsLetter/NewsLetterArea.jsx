import React from "react";

const NewsLetterArea = () => {
  return (
    <section className="newsletter-area pt-110 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center mb-80">
              <span className="sub-title">Get update</span>
              <h2 className="title">
                Get latest updates <br />
                about El Kindy
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="newsletter-form">
              <form action="#">
                <input type="email" placeholder="Enter your email address" />
                <button type="submit" className="btn">
                  Subscribe <span></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter-shape-wrap">
        <img
          src="/img/images/newsletter_bg_shape.png"
          alt=""
          className="bg-shape"
        />
        <img
          src="/img/images/newsletter_shape01.png"
          alt=""
          className="shape-one"
        />
        <img
          src="/img/images/newsletter_shape02.png"
          alt=""
          className="shape-two"
        />
        <img
          src="/img/images/newsletter_shape03.png"
          alt=""
          className="shape-three"
        />
        <img
          src="/img/images/newsletter_shape04.png"
          alt=""
          className="shape-four"
        />
        <img
          src="/img/images/newsletter_shape05.png"
          alt=""
          className="shape-five"
        />
        <img
          src="/img/images/newsletter_shape06.png"
          alt=""
          className="shape-six"
        />
      </div>
    </section>
  );
};

export default NewsLetterArea;
