import React from "react";
import Odometer from "react-odometerjs";

const CounterWrapFourItem = ({ amount, suffix, title }) => {
  return (
    <div className="counter-item-four">
      <h2 className="count">
        <span className="odometer" data-count="15">
          <Odometer
            value={amount}
            format="(,ddd).dd"
            duration={1000}
            animation={"count"}
          />
        </span>
        {suffix}
      </h2>

      <p>{title}</p>
    </div>
  );
};

export default CounterWrapFourItem;
