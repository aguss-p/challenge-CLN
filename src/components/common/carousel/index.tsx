import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import React, {
  FunctionComponent,
  useRef,
  useState,
  Children,
  useEffect,
} from "react";

export const Carousel: FunctionComponent<{
  children: any;
  totalPages: number;
  currentPage?: number;
  customLeftAction?: Function;
  customRightAction?: Function;
  setFetchBy?: Function;
}> = ({
  children,
  totalPages,
  currentPage = 1,
  customLeftAction = () => null,
  customRightAction = () => null,
  setFetchBy = (value: number) => null,
}) => {
  const ref = useRef<any>(null);
  const [page, setPage] = useState<number>(currentPage);
  const childrenCount = Children.count(children);
  const [containerAdjustWidthStl, setContainerAdjustWidthStl] = useState("");
  let maxSlides = 0;
  const skeletonArray = [];

  useEffect(() => {
    maxSlides = Math.trunc(((ref.current.offsetWidth ?? 0) + 12) / (200 + 12));
    setFetchBy(maxSlides);
  }, []);
  useEffect(() => {
    const space =
      Math.trunc(((ref.current.offsetWidth ?? 0) + 12) / (200 + 12)) >
      childrenCount * (200 + 12) - 12
        ? 0
        : (200 + 12) *
            Math.trunc(((ref.current.offsetWidth ?? 0) + 12) / (200 + 12)) -
          12;
    setContainerAdjustWidthStl(
      space == 0 ? "w-[100%-72]" : `w-[${space}px] max-w-[${space}px]`
    );
  }, []);

  const handleScroll = (mode: "right" | "left") => {
    if (mode === "right") {
      setPage(page + 1);
      customRightAction();
    } else {
      setPage(page - 1);
      customLeftAction();
    }
  };

  return (
    <section className="min-h-[205px] overflow-hidden w-full flex items-center justify-between h-auto">
      {page > 1 ? (
        <button
          className={`flex cursor-pointer justify-center items-center z-10 min-w-[40px] w-[40px] h-[40px] rounded-full shadow-[0_12px_12px_-6px_rgba(0,0,0,0.16)] opacity-70 hover:opacity-100`}
          onClick={() => handleScroll("left")}
        >
          <LeftArrow stroke="black" />
        </button>
      ) : (
        <div className="min-w-[40px] w-[40px] h-[40px]"></div>
      )}
      {childrenCount > 0 && (
        <main
          ref={ref}
          className={`flex justify-between mx-4 ${containerAdjustWidthStl}
        gap-3 overflow-x-scroll snap-x snap-mandatory no-scrollbar scroll-smooth overflow-hidden`}
        >
          {children}
        </main>
      )}
      {childrenCount === 0 && (
        <div className="px-2 py-1 rounded-2xl bg-blue-500 flex justify-center items-center">
          <p className="text-white">No se encontraron coincidencias.</p>
        </div>
      )}
      {/* falta agregar logica de cuando es la ultima página */}
      {page < totalPages && childrenCount > 0 ? (
        <button
          className={`flex justify-center cursor-pointer items-center z-10 min-w-[40px] w-[40px] h-[40px] rounded-full shadow-[0_12px_12px_-6px_rgba(0,0,0,0.16)] opacity-70 hover:opacity-100`}
          onClick={() => handleScroll("right")}
        >
          <RightArrow stroke="black" />
        </button>
      ) : (
        <div className="min-w-[40px] w-[40px] h-[40px]"></div>
      )}
    </section>
  );
};
