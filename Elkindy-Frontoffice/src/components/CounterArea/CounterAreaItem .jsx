import React from "react";
import Odometer from "react-odometerjs";

const CounterAreaItem = ({ amount, info }) => {
  return (
    <div className="counter-item">
      <span className="count odometer" data-count="535">
        <Odometer
          value={amount}
          format="(,ddd).dd"
          duration={1000}
          animation={"count"}
        />
      </span>
      <p>
        {info[0]} <span>{info[1]}</span>
      </p>
    </div>
  );
};

export default CounterAreaItem;
