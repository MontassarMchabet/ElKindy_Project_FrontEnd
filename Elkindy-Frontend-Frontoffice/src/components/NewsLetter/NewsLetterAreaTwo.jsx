import React from "react";

const NewsLetterAreaTwo = () => {
  return (
    <section className="newsletter-area-two">
      <div className="container">
        <div className="newsletter-wrap">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              <div className="section-title title-style-two white-title text-center mb-30">
                <span className="sub-title">Get update</span>
                <h2 className="title">Get latest updates and deals</h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-8">
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

          <div className="newsletter-shape-wrap-two">
            <img src="/img/images/h3_newsletter_shape01.png" alt="" />
            <img src="/img/images/h3_newsletter_shape02.png" alt="" />
            <img src="/img/images/h3_newsletter_shape03.png" alt="" />
            <img src="/img/images/h3_newsletter_shape04.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterAreaTwo;
