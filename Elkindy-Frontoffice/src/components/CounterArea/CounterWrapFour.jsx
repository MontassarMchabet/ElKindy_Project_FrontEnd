import React from "react";
import CounterWrapFourItem from "./CounterWrapFourItem";

const CounterWrapFour = () => {
  return (
    <div className="counter-item-wrap-four">
      <ul className="list-wrap">
        <li>
          <CounterWrapFourItem
            amount={15}
            suffix="K+"
            title={
              <>
                Entries in <span>Accunting</span>
              </>
            }
          />
        </li>

        <li>
          <CounterWrapFourItem
            amount={120}
            suffix="+"
            title={
              <>
                International <span>Programs</span>
              </>
            }
          />
        </li>

        <li>
          <CounterWrapFourItem
            amount={46}
            suffix="+"
            title={
              <>
                Countries in<span>The World</span>
              </>
            }
          />
        </li>
        <li>
          <CounterWrapFourItem
            amount={17}
            suffix="+"
            title={
              <>
                Awards <span>Programs</span>
              </>
            }
          />
        </li>
      </ul>
    </div>
  );
};

export default CounterWrapFour;
