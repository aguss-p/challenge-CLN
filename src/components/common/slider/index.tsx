import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import React, {
  FunctionComponent,
  useRef,
  useState,
  Children,
  useEffect,
} from "react";
import { Stepper } from "../stepper";

export const FullScreenSliderDesktop: FunctionComponent<{
  className?: string;
  hideArrows?: boolean;
  children: any;
  tolerance?: number;
}> = ({ children, hideArrows = false, tolerance = 0.4 }) => {
  const ref = useRef<any>(null);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [clickScroll, setClickScroll] = useState<number>(0);
  const childrenCount = Children.count(children);
  const updateScroll = () => {
    if (ref && ref.current) {
      (ref.current as any).scrollLeft = clickScroll * slideWidth;
    }
  };

  useEffect(() => {
    if (ref.current) {
      setSlideWidth(ref.current.offsetWidth);
    }
  }, []);

  const handleCurrentWidth = () => {
    if (ref.current) {
      setCurrentWidth(ref.current.scrollLeft);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (ref && ref.current && ref.current && currentWidth % slideWidth != 0) {
        (ref.current as any).scrollLeft = activeStep * slideWidth;
      }
    }, 900);

    return () => {
      clearInterval(timer);
    };
  }, [currentWidth]);

  useEffect(() => {
    if (currentWidth > slideWidth * tolerance + activeStep * slideWidth) {
      setActiveStep(activeStep + 1);
    } else if (
      currentWidth <
      slideWidth * tolerance + activeStep * slideWidth - slideWidth
    ) {
      setActiveStep(activeStep - 1);
    }
  }, [currentWidth]);

  useEffect(() => {
    updateScroll();
  }, [clickScroll]);

  const handleScroll = (mode: "right" | "left") => {
    if (mode === "right") {
      setClickScroll(clickScroll + 1);
    } else {
      setClickScroll(clickScroll - 1);
    }
  };

  return (
    <section className="relative w-[calc(100vw-17px)]">
      {currentWidth >= slideWidth && !hideArrows ? (
        <button
          className={`hidden sm:flex cursor-pointer justify-center items-center left-[30px] absolute m-auto top-0 bottom-0 z-10 w-[40px] h-[40px] rounded-full bg-gray-800 opacity-70 hover:opacity-100`}
          onClick={() => handleScroll("left")}
        >
          <LeftArrow stroke="white" />
        </button>
      ) : null}
      <main
        ref={ref}
        className={
          "flex flex-1 desktop:gap-0 bg-[#043346] overflow-x-scroll snap-x snap-mandatory no-scrollbar scroll-smooth"
        }
        onScroll={handleCurrentWidth}
      >
        {children}
      </main>
      <div className="absolute w-[100%] bottom-3">
        <Stepper steps={childrenCount} activeStep={activeStep} />
      </div>
      {hideArrows ||
      childrenCount === 1 ||
      currentWidth >= slideWidth * (childrenCount - 1) ? null : (
        <button
          className={`hidden sm:flex justify-center cursor-pointer items-center right-[30px] absolute m-auto top-0 bottom-0 z-10 w-[40px] h-[40px] rounded-full shadow-[0_12px_12px_-6px_rgba(0,0,0,0.16)] bg-gray-800 opacity-70 hover:opacity-100`}
          onClick={() => handleScroll("right")}
        >
          <RightArrow stroke="white" />
        </button>
      )}
    </section>
  );
};
