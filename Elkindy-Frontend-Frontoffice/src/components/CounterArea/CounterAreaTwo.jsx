import React from "react";
import { Link } from "react-router-dom";
import CounterAreaTwoItem from "./CounterAreaTwoItem";

const CounterAreaTwo = () => {
  const counter_items = [
    {
      src: "/img/icon/counter_icon01.png",
      title: "Offices",
      suffix: "",
    },
    {
      src: "/img/icon/counter_icon02.png",
      title: "Workers",
      suffix: "",
    },
    {
      src: "/img/icon/counter_icon03.png",
      title: "Customers",
      suffix: "K",
    },
    {
      src: "/img/icon/counter_icon04.png",
      title: "Projects",
      suffix: "+",
    },
  ];

  return (
    <section className="counter-area-two pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-0 order-lg-2">
            <div className="counter-item-wrap-two">
              <ul className="list-wrap">
                {counter_items.map((x, index) => (
                  <li key={index}>
                    <CounterAreaTwoItem item={x} amount={1 + index} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="counter-content">
              <div className="section-title title-style-two mb-20">
                <span className="sub-title">Our Success</span>
                <h2 className="title">
                  Over 200+ Happy clients & Still Counting.
                </h2>
              </div>
              <p className="info">
                We're here for our clients service for a good quality music classes and instruments exchange
                and good music books to help you learn.
              </p>
              <Link to="/about-us" className="btn">
                Learn More <span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterAreaTwo;
