import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paypal from "./Paypal";

const PricingArea = () => {
  const [checkout, setCheckout] = useState(false);
  const [selectedPlanValue, setSelectedPlanValue] = useState(null);

  const handleSelectPlan = (planValue) => {
    setSelectedPlanValue(planValue);
    setCheckout(true);
  };

  return (
    <section className="pricing-area pb-90" style={{ backgroundColor: "#292930" }}>
      <div className="container" style={{ backgroundColor: "#292930" }}>

        {checkout ? (
          <Paypal planValue={selectedPlanValue} />
        ) : (
          <>
            <div className="row justify-content-center" style={{ overflow: 'hidden' }}>
              <div className="col-lg-10">
                <div className="section-title title-style-two text-center white-title mb-50">
                  <br />
                  <br />
                  <br />
                  <h2 className="title">Subscribe to EL Kindy</h2>
                  <p>
                  </p>
                </div>
              </div>
            </div>

            <div className="pricing-item-wrap">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane show active"
                  id="month"
                  role="tabpanel"
                  aria-labelledby="month-tab"
                >
                  <div className="row g-0 align-items-center justify-content-center">
                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon01.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">Monthly</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>TND</span>50<strong>/mo</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Priority access to all events with reserved seating.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Special discounts and offers.
                            </li>
                            <li>
                              <i className="far fa-check"></i> Personalized scheduling assistance and reminders, along with priority support for any planning-related queries.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Full access to exam resources, personalized study plans, and direct support from tutors for exam preparation.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(50)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item active">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon02.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">Yearly</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>TND</span>600<strong>/yr</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Priority access to all events with reserved seating.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Special discounts and offers.
                            </li>
                            <li>
                              <i className="far fa-check"></i> Personalized scheduling assistance and reminders, along with priority support for any planning-related queries.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Full access to exam resources, personalized study plans, and direct support from tutors for exam preparation.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(600)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon03.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">6 Months</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>TND</span>300<strong>/mo</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Priority access to all events with reserved seating.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Special discounts and offers.
                            </li>
                            <li>
                              <i className="far fa-check"></i> Personalized scheduling assistance and reminders, along with priority support for any planning-related queries.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Full access to exam resources, personalized study plans, and direct support from tutors for exam preparation.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(300)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div
                  className="tab-pane"
                  id="year"
                  role="tabpanel"
                  aria-labelledby="year-tab"
                >
                  <div className="row g-0 align-items-center justify-content-center">
                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon01.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">Basic</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>$</span> 249<strong>/yr</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Access to view and participate in upcoming events hosted by the conservatory.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Access to view and participate in upcoming events.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Access to basic planning tools for managing schedules, assignments, and deadlines.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Ability to access past exam papers, study materials, and participate in mock exams.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(249)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item active">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon02.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">Standard</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>$</span>329<strong>/yr</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Full access to all events, including premium events and workshops.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Full access to the shop with a larger discount on purchases for subscribers.
                            </li>
                            <li>
                              <i className="far fa-check"></i> Access to advanced planning tools for managing schedules, assignments, and deadlines effectively.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Ability to access past exam papers, study materials, and participate in mock exams.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(329)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="pricing-item">
                        <div className="pricing-icon">
                          <img src="/img/icon/pricing_icon03.png" alt="" />
                        </div>
                        <div className="pricing-top">
                          <h2 className="title">Premium</h2>
                        </div>
                        <div className="pricing-price">
                          <h2 className="price">
                            <span>$</span>389<strong>/yr</strong>
                          </h2>
                        </div>
                        <div className="pricing-list">
                          <h4 className="title">Everything in Starter</h4>
                          <ul className="list-wrap">
                            <li>
                              <i className="far fa-check"></i>Priority access to all events with reserved seating.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Special discounts and offers.
                            </li>
                            <li>
                              <i className="far fa-check"></i> Personalized scheduling assistance and reminders, along with priority support for any planning-related queries.
                            </li>
                            <li>
                              <i className="far fa-check"></i>Full access to exam resources, personalized study plans, and direct support from tutors for exam preparation.
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-btn">
                          <button onClick={() => handleSelectPlan(389)} className="btn">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PricingArea;
