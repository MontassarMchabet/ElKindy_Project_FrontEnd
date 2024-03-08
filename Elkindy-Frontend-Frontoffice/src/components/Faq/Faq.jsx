import React from "react";

const Faq = () => {
  return (
    <section className="faq-area pt-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="faq-img">
              <img src="/img/images/faq_img.png" alt="" />
              <img src="/img/images/faq_img02.png" alt="" />
            </div>
            <div className="faq-content">
              <div className="section-title title-style-two mb-20">
                <h2 className="title">
                  All Your Questions <br />
                  Are Here
                </h2>
              </div>
              <h3 className="title-two">& Knock Me Directly to Know More</h3>
              <p>
                Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                scelerisque nibh dolores consectetuer,
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="accordion faq-wrap" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    What's the difference between Pro and Free?
                  </button>
                </h2>

                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                      tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                      scelerisque nibh dolores consectetuer,
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    What's the difference between Pro and Free?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                      tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                      scelerisque nibh dolores consectetuer,
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    What's the difference between Pro and Free?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                      tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                      scelerisque nibh dolores consectetuer,
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    What's the difference between Pro and Free?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                      tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                      scelerisque nibh dolores consectetuer,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-shape-wrap">
        <img src="/img/images/faq_shape.png" alt="" />
      </div>
    </section>
  );
};

export default Faq;
