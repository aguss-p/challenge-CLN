import { FunctionComponent } from "react";

// Utils

type Props = {
  steps: number;
  activeStep: number;
  className?: string;
};

export const Stepper: FunctionComponent<Props> = ({
  steps,
  className,
  activeStep,
}) => {
  return (
    <div className="min-w-[100px] flex justify-center gap-[6px]">
      {Array(steps)
        .fill({})
        .map((obj, i) => (
          <div
            key={i}
            className={`bg-blue-500 ${
              (activeStep >= steps ? steps - 1 : activeStep) == i
                ? " w-[30%]"
                : " w-[8px]"
            } rounded-full h-[8px] transition-width duration-1000 ease-in-out transform-origin-center max-w-[40px]`}
          />
        ))}
    </div>
  );
};
