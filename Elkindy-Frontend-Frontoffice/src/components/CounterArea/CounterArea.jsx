import React from "react";
import CounterAreaItem from "./CounterAreaItem ";

const CounterArea = () => {
  return (
    <div className="counter-area">
      <div className="container">
        <div className="counter-item-wrap">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <CounterAreaItem amount={3} info={["Project", "Completed"]} />
            </div>

            <div className="col-lg-3 col-sm-6">
              <CounterAreaItem amount={4} info={["Our Happy", "Clients"]} />
            </div>

            <div className="col-lg-3 col-sm-6">
              <CounterAreaItem amount={5} info={["Cup of", "Coffee for Me"]} />
            </div>

            <div className="col-lg-3 col-sm-6">
              <CounterAreaItem amount={6} info={["Clients Work", "With Me"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterArea;
