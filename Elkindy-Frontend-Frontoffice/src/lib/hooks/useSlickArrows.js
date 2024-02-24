import { useRef } from "react";

export const useSlickArrows = () => {
  const customeSlider = useRef();

  const toNext = () => customeSlider.current.slickNext();
  const toPrev = () => customeSlider.current.slickPrev();

  return {
    sliderRef: customeSlider,
    toNext,
    toPrev,
  };
};
