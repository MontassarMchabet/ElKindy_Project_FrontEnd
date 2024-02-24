import React from "react";
import { scrollToTop } from "../../lib/helpers";

const ScrollTop = () => {
  return (
    <button
      className="scroll-top scroll-to-target"
      // datatarget="html"
      onClick={scrollToTop}
    >
      <i className="fas fa-angle-up"></i>
    </button>
  );
};

export default ScrollTop;
